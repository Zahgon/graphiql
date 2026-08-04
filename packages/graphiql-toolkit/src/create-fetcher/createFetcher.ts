import type { Fetcher, CreateFetcherOptions } from './types';

import {
  createMultipartFetcher,
  createSimpleFetcher,
  isSubscriptionWithName,
  getWsFetcher,
} from './lib';

/**
 * build a GraphiQL fetcher that is:
 * - backwards compatible
 * - optionally supports graphql-ws or `
 */
export function createGraphiQLFetcher(options: CreateFetcherOptions): Fetcher {
    throw new Error("STUB");
}
