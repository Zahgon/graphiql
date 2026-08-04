import { DocumentNode, visit } from 'graphql';
import { meros } from 'meros/browser';
import type {
  Client,
  ClientOptions,
  ExecutionResult,
  createClient as createClientType,
} from 'graphql-ws';

import {
  isAsyncIterable,
  makeAsyncIterableIteratorFromSink,
} from '@n1ru4l/push-pull-async-iterable-iterator';

import type {
  Fetcher,
  FetcherParams,
  FetcherOpts,
  ExecutionResultPayload,
  CreateFetcherOptions,
} from './types';

const errorHasCode = (err: unknown): err is { code: string } => {
    throw new Error("STUB");
};

/**
 * Returns true if the name matches a subscription in the AST
 *
 * @param document {DocumentNode}
 * @param name the operation name to lookup
 * @returns {boolean}
 */
export const isSubscriptionWithName = (
  document: DocumentNode,
  name?: string,
): boolean => {
    throw new Error("STUB");
};

/**
 * create a simple HTTP/S fetcher using a fetch implementation where
 * multipart is not needed
 *
 * @param options {CreateFetcherOptions}
 * @param httpFetch {typeof fetch}
 * @returns {Fetcher}
 */
export const createSimpleFetcher =
  (options: CreateFetcherOptions, httpFetch: typeof fetch): Fetcher =>
  { throw new Error("STUB"); };

export async function createWebsocketsFetcherFromUrl(
  url: string,
  connectionParams?: ClientOptions['connectionParams'],
): Promise<Fetcher | void> {
    throw new Error("STUB");
}

/**
 * Create ws/s fetcher using provided wsClient implementation
 */
export const createWebsocketsFetcherFromClient =
  (wsClient: Client): Fetcher =>
  { throw new Error("STUB"); };

/**
 * Allow legacy websockets protocol client, but no definitions for it,
 * as the library is deprecated and has security issues
 */
export const createLegacyWebsocketsFetcher =
  (legacyWsClient: { request: (params: FetcherParams) => unknown }): Fetcher =>
  { throw new Error("STUB"); };
/**
 * Create a fetcher with the `IncrementalDelivery` HTTP/S spec for
 * `@stream` and `@defer` support using `fetch-multipart-graphql`
 */
export const createMultipartFetcher = (
  options: CreateFetcherOptions,
  httpFetch: typeof fetch,
): Fetcher =>
  { throw new Error("STUB"); };

/**
 * If `wsClient` or `legacyClient` are provided, then `subscriptionUrl` is overridden.
 */
export async function getWsFetcher(
  options: CreateFetcherOptions,
  fetcherOpts?: FetcherOpts,
): Promise<Fetcher | void> {
    throw new Error("STUB");
}
