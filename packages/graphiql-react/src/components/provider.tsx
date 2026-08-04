/* eslint sort-keys: "error" */
import type { FC, ReactNode, RefObject } from 'react';
import {
  createContext,
  useContext,
  useRef,
  useEffect,
  useId,
  useState,
} from 'react';
import { create, useStore, UseBoundStore, StoreApi } from 'zustand';
import { useShallow } from 'zustand/shallow';
import { StorageAPI } from '@graphiql/toolkit';
import { createEditorSlice, type EditorProps } from '../stores/editor';
import {
  createExecutionSlice,
  createPluginSlice,
  createSchemaSlice,
  createThemeSlice,
  createStorageSlice,
  ExecutionProps,
  PluginProps,
  SchemaProps,
  ThemeProps,
  StorageProps,
  useMonaco,
} from '../stores';
import type { SlicesWithActions } from '../types';
import { useDidUpdate } from '../utility';
import {
  FragmentDefinitionNode,
  IntrospectionQuery,
  buildClientSchema,
  parse,
  visit,
  isSchema,
  validateSchema,
} from 'graphql';
import {
  DEFAULT_PRETTIFY_QUERY,
  DEFAULT_QUERY,
  MONACO_THEME_NAME,
  STORAGE_KEY,
} from '../constants';
import { getDefaultTabState } from '../utility/tabs';

function isIntrospectionData(value: unknown): value is IntrospectionQuery {
  return typeof value === 'object' && value !== null && '__schema' in value;
}

interface GraphiQLProviderProps
  extends
    EditorProps,
    ExecutionProps,
    PluginProps,
    SchemaProps,
    ThemeProps,
    StorageProps {
  children: ReactNode;
}

type GraphiQLStore = UseBoundStore<StoreApi<SlicesWithActions>>;

const GraphiQLContext = createContext<RefObject<GraphiQLStore> | null>(null);

export const GraphiQLProvider: FC<GraphiQLProviderProps> = props => {
    throw new Error("STUB");
};

const InnerGraphiQLProvider: FC<GraphiQLProviderProps> = ({
  defaultHeaders,
  defaultQuery = DEFAULT_QUERY,
  defaultTabs,
  externalFragments,
  onEditOperationName,
  onTabChange,
  shouldPersistHeaders = false,
  onCopyQuery,
  onPrettifyQuery = DEFAULT_PRETTIFY_QUERY,

  customScalarSchemas,
  dangerouslyAssumeSchemaIsValid = false,
  fetcher,
  inputValueDeprecation = false,
  introspectionQueryName = 'IntrospectionQuery',
  onSchemaChange,
  schema,
  schemaDescription = false,

  getDefaultFieldNames,
  operationName = null,

  onTogglePluginVisibility,
  plugins = [],
  referencePlugin,
  visiblePlugin,
  children,

  defaultTheme = null,
  editorTheme = MONACO_THEME_NAME,

  storage: $storage,

  ...props
}) => {
    throw new Error("STUB");
};

export function useGraphiQL<T>(selector: (state: SlicesWithActions) => T): T {
  const store = useContext(GraphiQLContext);
  if (!store) {
    throw new Error(
      `"useGraphiQL" hook must be used within a <GraphiQLProvider> component.
It looks like you are trying to use the hook outside the GraphiQL provider tree.`,
    );
  }
  return useStore(store.current, useShallow(selector));
}

/**
 * Actions are functions used to update values in your store. They are static and never change.
 * @see https://tkdodo.eu/blog/working-with-zustand#separate-actions-from-state
 */
export const useGraphiQLActions = () => useGraphiQL(state => { throw new Error("STUB"); });

function getExternalFragments(
  externalFragments: GraphiQLProviderProps['externalFragments'],
) {
  const map = new Map<string, FragmentDefinitionNode>();
  if (externalFragments) {
    if (Array.isArray(externalFragments)) {
      for (const fragment of externalFragments) {
        map.set(fragment.name.value, fragment);
      }
    } else if (typeof externalFragments === 'string') {
      visit(parse(externalFragments), {
        FragmentDefinition(fragment) {
              throw new Error("STUB");
          },
      });
    } else {
      throw new TypeError(
        'The `externalFragments` prop must either be a string that contains the fragment definitions in SDL or a list of `FragmentDefinitionNode` objects.',
      );
    }
  }
  return map;
}
