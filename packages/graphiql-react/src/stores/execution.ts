import {
  Fetcher,
  fillLeafs,
  formatError,
  formatResult,
  GetDefaultFieldNamesFn,
  isAsyncIterable,
  isObservable,
  Unsubscribable,
} from '@graphiql/toolkit';
import { ExecutionResult, GraphQLError, print } from 'graphql';
import { getFragmentDependenciesForAST } from 'graphql-language-service';
import setValue from 'set-value';
import getValue from 'get-value';

import type { StateCreator } from 'zustand';
import { tryParseJSONC, Range } from '../utility';
import type { SlicesWithActions, MonacoEditor } from '../types';

export interface ExecutionSlice {
  /**
   * If there is currently a GraphQL request in-flight. For multipart
   * requests like subscriptions, this will be `true` while fetching the
   * first partial response and `false` while fetching subsequent batches.
   * @default false
   */
  isFetching: boolean;

  /**
   * Represents an active GraphQL subscription.
   *
   * For multipart operations such as subscriptions, this
   * will hold an `Unsubscribable` object while the request is in-flight. It
   * remains non-null until the operation completes or is manually unsubscribed.
   *
   * @remarks Use `subscription?.unsubscribe()` to cancel the request.
   * @default null
   */
  subscription: Unsubscribable | null;

  /**
   * The operation name that will be sent with all GraphQL requests.
   * @default null
   */
  overrideOperationName: string | null;

  /**
   * A function to determine which field leafs are automatically added when
   * trying to execute a query with missing selection sets. It will be called
   * with the `GraphQLType` for which fields need to be added.
   */
  getDefaultFieldNames?: GetDefaultFieldNamesFn;

  /**
   * @default 0
   */
  queryId: number;

  /**
   * A function which accepts GraphQL HTTP parameters and returns a `Promise`,
   * `Observable` or `AsyncIterable` that returns the GraphQL response in
   * parsed JSON format.
   *
   * We suggest using the `createGraphiQLFetcher` utility from `@graphiql/toolkit`
   * to create these fetcher functions.
   *
   * @see {@link https://graphiql-test.netlify.app/typedoc/modules/graphiql_toolkit.html#creategraphiqlfetcher-2|`createGraphiQLFetcher`}
   */
  fetcher: Fetcher;
}

export interface ExecutionActions {
  /**
   * Start a GraphQL request based on the current editor contents.
   */
  run(): void;

  /**
   * Stop the GraphQL request that is currently in-flight.
   */
  stop(): void;
}

export interface ExecutionProps extends Pick<
  ExecutionSlice,
  'getDefaultFieldNames' | 'fetcher'
> {
  /**
   * This prop sets the operation name that is passed with a GraphQL request.
   */
  operationName?: string;
}

type CreateExecutionSlice = (
  initial: Pick<
    ExecutionSlice,
    'overrideOperationName' | 'getDefaultFieldNames' | 'fetcher'
  >,
) => StateCreator<
  SlicesWithActions,
  [],
  [],
  ExecutionSlice & {
    actions: ExecutionActions;
  }
>;

export const createExecutionSlice: CreateExecutionSlice =
  initial => (set, get) => {
      throw new Error("STUB");
  };

interface IncrementalResult {
  data?: Record<string, unknown> | null;
  errors?: ReadonlyArray<GraphQLError>;
  extensions?: Record<string, unknown>;
  hasNext?: boolean;
  path?: ReadonlyArray<string | number>;
  incremental?: ReadonlyArray<IncrementalResult>;
  label?: string;
  items?: ReadonlyArray<Record<string, unknown>> | null;
  pending?: ReadonlyArray<{ id: string; path: ReadonlyArray<string | number> }>;
  completed?: ReadonlyArray<{
    id: string;
    errors?: ReadonlyArray<GraphQLError>;
  }>;
  id?: string;
  subPath?: ReadonlyArray<string | number>;
}

const pathsMap = new WeakMap<
  ExecutionResult,
  Map<string, ReadonlyArray<string | number>>
>();

/**
 * @param executionResult - The complete execution result object which will be
 * mutated by merging the contents of the incremental result.
 * @param incrementalResult - The incremental result that will be merged into the
 * complete execution result.
 */
function mergeIncrementalResult(
  executionResult: IncrementalResult,
  incrementalResult: IncrementalResult,
): void {
  let path: ReadonlyArray<string | number> | undefined = [
    'data',
    ...(incrementalResult.path ?? []),
  ];

  for (const result of [executionResult, incrementalResult]) {
    if (result.pending) {
      let paths = pathsMap.get(executionResult);
      if (paths === undefined) {
        paths = new Map();
        pathsMap.set(executionResult, paths);
      }

      for (const { id, path: pendingPath } of result.pending) {
        paths.set(id, ['data', ...pendingPath]);
      }
    }
  }

  const { items, data, id } = incrementalResult;
  if (items) {
    if (id) {
      path = pathsMap.get(executionResult)?.get(id);
      if (path === undefined) {
        throw new Error('Invalid incremental delivery format.');
      }

      const list = getValue(executionResult, path.join('.'));
      list.push(...items);
    } else {
      path = ['data', ...(incrementalResult.path ?? [])];
      for (const item of items) {
        setValue(executionResult, path.join('.'), item);
        // Increment the last path segment (the array index) to merge the next item at the next index
        // @ts-expect-error -- (path[path.length - 1] as number)++ breaks react compiler
        path[path.length - 1]++;
      }
    }
  }
  if (data) {
    if (id) {
      path = pathsMap.get(executionResult)?.get(id);
      if (path === undefined) {
        throw new Error('Invalid incremental delivery format.');
      }
      const { subPath } = incrementalResult;
      if (subPath !== undefined) {
        path = [...path, ...subPath];
      }
    }
    setValue(executionResult, path.join('.'), data, {
      merge: true,
    });
  }

  if (incrementalResult.errors) {
    executionResult.errors ||= [];
    (executionResult.errors as GraphQLError[]).push(
      ...incrementalResult.errors,
    );
  }

  if (incrementalResult.extensions) {
    setValue(executionResult, 'extensions', incrementalResult.extensions, {
      merge: true,
    });
  }

  if (incrementalResult.incremental) {
    for (const incrementalSubResult of incrementalResult.incremental) {
      mergeIncrementalResult(executionResult, incrementalSubResult);
    }
  }

  if (incrementalResult.completed) {
    // Remove tracking and add additional errors
    for (const { id: completedId, errors } of incrementalResult.completed) {
      pathsMap.get(executionResult)?.delete(completedId);
      if (errors) {
        executionResult.errors ||= [];
        (executionResult.errors as GraphQLError[]).push(...errors);
      }
    }
  }
}
