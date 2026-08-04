import { extname } from 'node:path';
import type { CachedContent } from 'graphql-language-service';
import { Range, Position } from 'graphql-language-service';
import type { Logger } from './Logger';

import { findGraphQLTags } from './findGraphQLTags';
import {
  DEFAULT_SUPPORTED_EXTENSIONS,
  DEFAULT_SUPPORTED_GRAPHQL_EXTENSIONS,
  SupportedExtensionsEnum,
} from './constants';
import { NoopLogger } from './Logger';

/**
 * Helper functions to perform requested services from client/server.
 */

// Check the uri to determine the file type (JavaScript/GraphQL).
// If .js file, either return the parsed query/range or null if GraphQL queries
// are not found.
export async function parseDocument(
  text: string,
  uri: string,
  fileExtensions: ReadonlyArray<SupportedExtensionsEnum> = DEFAULT_SUPPORTED_EXTENSIONS,
  graphQLFileExtensions: string[] = DEFAULT_SUPPORTED_GRAPHQL_EXTENSIONS,
  logger: Logger | NoopLogger = new NoopLogger(),
): Promise<CachedContent[]> {
    throw new Error("STUB");
}
