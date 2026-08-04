/**
 *  Copyright (c) 2021 GraphQL Contributors
 *  All rights reserved.
 *
 *  This source code is licensed under the license found in the
 *  LICENSE file in the root directory of this source tree.
 *
 */

import {
  ASTNode,
  DocumentNode,
  DefinitionNode,
  isTypeDefinitionNode,
  GraphQLSchema,
  Kind,
  extendSchema,
  parse,
  visit,
} from 'graphql';
import type {
  CachedContent,
  GraphQLFileMetadata,
  GraphQLFileInfo,
  FragmentInfo,
  ObjectTypeInfo,
  Uri,
} from 'graphql-language-service';

import * as fs from 'node:fs';
import { readFile } from 'node:fs/promises';
import nullthrows from 'nullthrows';

import {
  loadConfig,
  GraphQLConfig,
  GraphQLProjectConfig,
  GraphQLExtensionDeclaration,
} from 'graphql-config';

import type { UnnormalizedTypeDefPointer } from '@graphql-tools/load';

import { parseDocument } from './parseDocument';
import stringToHash from './stringToHash';
import { glob } from 'glob';
import { LoadConfigOptions } from './types';
import { URI } from 'vscode-uri';
import {
  CodeFileLoader,
  CodeFileLoaderConfig,
} from '@graphql-tools/code-file-loader';
import {
  DEFAULT_SUPPORTED_EXTENSIONS,
  DEFAULT_SUPPORTED_GRAPHQL_EXTENSIONS,
} from './constants';
import { NoopLogger, Logger } from './Logger';
import { LRUCache } from 'lru-cache';
// import { is } from '@babel/types';

const codeLoaderConfig: CodeFileLoaderConfig = {
  noSilentErrors: false,
  pluckConfig: {
    skipIndent: true,
  },
};

const LanguageServiceExtension: GraphQLExtensionDeclaration = api => {
    throw new Error("STUB");
};

// Maximum files to read when processing GraphQL files.
const MAX_READS = 200;

export type OnSchemaChange = (project: GraphQLProjectConfig) => void;

export async function getGraphQLCache({
  parser,
  logger,
  loadConfigOptions,
  config,
  onSchemaChange,
  schemaCacheTTL,
}: {
  parser: typeof parseDocument;
  logger: Logger | NoopLogger;
  loadConfigOptions: LoadConfigOptions;
  config?: GraphQLConfig;
  onSchemaChange?: OnSchemaChange;
  schemaCacheTTL?: number;
}): Promise<GraphQLCache> {
  const graphQLConfig =
    config ||
    (await loadConfig({
      ...loadConfigOptions,
      extensions: [
        ...(loadConfigOptions?.extensions ?? []),
        LanguageServiceExtension,
      ],
    }));
  return new GraphQLCache({
    configDir: loadConfigOptions.rootDir!,
    config: graphQLConfig!,
    parser,
    logger,
    onSchemaChange,
    schemaCacheTTL:
      schemaCacheTTL ??
      // @ts-expect-error TODO: add types for extension configs
      config?.extensions?.get('languageService')?.schemaCacheTTL,
  });
}

export class GraphQLCache {
  _configDir: Uri;
  _graphQLFileListCache: Map<Uri, Map<string, GraphQLFileInfo>>;
  _graphQLConfig: GraphQLConfig;
  _schemaMap: LRUCache<Uri, GraphQLSchema>;
  _typeExtensionMap: Map<Uri, number>;
  _fragmentDefinitionsCache: Map<Uri, Map<string, FragmentInfo>>;
  _typeDefinitionsCache: Map<Uri, Map<string, ObjectTypeInfo>>;
  _parser: typeof parseDocument;
  _logger: Logger | NoopLogger;
  _onSchemaChange?: OnSchemaChange;
  _schemaCacheTTL?: number;

  constructor({
    configDir,
    config,
    parser,
    logger,
    onSchemaChange,
    schemaCacheTTL,
  }: {
    configDir: Uri;
    config: GraphQLConfig;
    parser: typeof parseDocument;
    logger: Logger | NoopLogger;
    onSchemaChange?: OnSchemaChange;
    schemaCacheTTL?: number;
  }) {
    this._configDir = configDir;
    this._graphQLConfig = config;
    this._graphQLFileListCache = new Map();
    this._schemaMap = new LRUCache({
      max: 20,
      ttl: schemaCacheTTL ?? 1000 * 30,
      ttlAutopurge: true,
      updateAgeOnGet: false,
    });
    this._fragmentDefinitionsCache = new Map();
    this._typeDefinitionsCache = new Map();
    this._typeExtensionMap = new Map();
    this._parser = parser;
    this._logger = logger;
    this._onSchemaChange = onSchemaChange;
  }

  getGraphQLConfig = (): GraphQLConfig => { throw new Error("STUB"); };

  getProjectForFile = (uri: string): GraphQLProjectConfig | void => {
      throw new Error("STUB");
  };

  getFragmentDependencies = async (
    query: string,
    fragmentDefinitions?: Map<string, FragmentInfo> | null,
  ): Promise<FragmentInfo[]> => {
    // If there isn't context for fragment references,
    // return an empty array.
    if (!fragmentDefinitions) {
      return [];
    }
    // If the query cannot be parsed, validations cannot happen yet.
    // Return an empty array.
    let parsedQuery;
    try {
      parsedQuery = parse(query);
    } catch {
      return [];
    }
    return this.getFragmentDependenciesForAST(parsedQuery, fragmentDefinitions);
  };

  getFragmentDependenciesForAST = async (
    parsedQuery: ASTNode,
    fragmentDefinitions: Map<string, FragmentInfo>,
  ): Promise<FragmentInfo[]> => {
    if (!fragmentDefinitions) {
      return [];
    }

    const existingFrags = new Map();
    const referencedFragNames = new Set<string>();

    visit(parsedQuery, {
      FragmentDefinition(node) {
            throw new Error("STUB");
        },
      FragmentSpread(node) {
          throw new Error("STUB");
      },
    });

    const asts = new Set<FragmentInfo>();
    for (const name of referencedFragNames) {
      if (!existingFrags.has(name) && fragmentDefinitions.has(name)) {
        asts.add(nullthrows(fragmentDefinitions.get(name)));
      }
    }

    const referencedFragments: FragmentInfo[] = [];

    for (const ast of asts) {
      visit(ast.definition, {
        FragmentSpread(node) {
              throw new Error("STUB");
          },
      });
      if (!existingFrags.has(ast.definition.name.value)) {
        referencedFragments.push(ast);
      }
    }

    return referencedFragments;
  };

  _cacheKeyForProject = ({ dirpath, name }: GraphQLProjectConfig): string => {
      throw new Error("STUB");
  };

  getFragmentDefinitions = async (
    projectConfig: GraphQLProjectConfig,
  ): Promise<Map<string, FragmentInfo>> => {
    // This function may be called from other classes.
    // If then, check the cache first.
    const rootDir = projectConfig.dirpath;
    const cacheKey = this._cacheKeyForProject(projectConfig);
    if (this._fragmentDefinitionsCache.has(cacheKey)) {
      return this._fragmentDefinitionsCache.get(cacheKey) || new Map();
    }

    const list = await this._readFilesFromInputDirs(rootDir, projectConfig);

    const { fragmentDefinitions, graphQLFileMap } =
      await this.readAllGraphQLFiles(list);

    this._fragmentDefinitionsCache.set(cacheKey, fragmentDefinitions);
    this._graphQLFileListCache.set(cacheKey, graphQLFileMap);

    return fragmentDefinitions;
  };

  getObjectTypeDependenciesForAST = async (
    parsedQuery: ASTNode,
    objectTypeDefinitions: Map<string, ObjectTypeInfo>,
  ): Promise<Array<ObjectTypeInfo>> => {
      throw new Error("STUB");
  };

  getObjectTypeDefinitions = async (
    projectConfig: GraphQLProjectConfig,
  ): Promise<Map<string, ObjectTypeInfo>> => {
      throw new Error("STUB");
  };

  _readFilesFromInputDirs = (
    rootDir: string,
    projectConfig: GraphQLProjectConfig,
  ): Promise<Array<GraphQLFileMetadata>> => {
      throw new Error("STUB");
  };

  _getSchemaAndDocumentFilePatterns = (projectConfig: GraphQLProjectConfig) => {
      throw new Error("STUB");
  };

  async updateFragmentDefinition(
    projectCacheKey: Uri,
    filePath: Uri,
    contents: Array<CachedContent>,
  ): Promise<void> {
    const cache = this._fragmentDefinitionsCache.get(projectCacheKey);
    const asts = contents.map(({ query }) => {
        throw new Error("STUB");
    });
    if (cache) {
      // first go through the fragment list to delete the ones from this file
      for (const [key, value] of cache.entries()) {
        if (value.filePath === filePath) {
          cache.delete(key);
        }
      }
      this._setFragmentCache(asts, cache, filePath);
    } else {
      const newFragmentCache = this._setFragmentCache(
        asts,
        new Map(),
        filePath,
      );
      this._fragmentDefinitionsCache.set(projectCacheKey, newFragmentCache);
    }
  }
  _setFragmentCache(
    asts: { ast: DocumentNode | null; query: string }[],
    fragmentCache: Map<string, FragmentInfo>,
    filePath: string | undefined,
  ) {
    for (const { ast, query } of asts) {
      if (!ast) {
        continue;
      }
      for (const definition of ast.definitions) {
        if (definition.kind === Kind.FRAGMENT_DEFINITION) {
          fragmentCache.set(definition.name.value, {
            filePath,
            content: query,
            definition,
          });
        }
      }
    }
    return fragmentCache;
  }

  async updateObjectTypeDefinition(
    projectCacheKey: Uri,
    filePath: Uri,
    contents: Array<CachedContent>,
  ): Promise<void> {
    const cache = this._typeDefinitionsCache.get(projectCacheKey);
    const asts = contents.map(({ query }) => {
        throw new Error("STUB");
    });
    if (cache) {
      // first go through the types list to delete the ones from this file
      for (const [key, value] of cache.entries()) {
        if (value.filePath === filePath) {
          cache.delete(key);
        }
      }
      this._setDefinitionCache(asts, cache, filePath);
    } else {
      const newTypeCache = this._setDefinitionCache(asts, new Map(), filePath);
      this._typeDefinitionsCache.set(projectCacheKey, newTypeCache);
    }
  }
  _setDefinitionCache(
    asts: { ast: DocumentNode | null; query: string }[],
    typeCache: Map<string, ObjectTypeInfo>,
    filePath: string | undefined,
  ) {
    for (const { ast, query } of asts) {
      if (!ast) {
        continue;
      }
      for (const definition of ast.definitions) {
        if (isTypeDefinitionNode(definition)) {
          typeCache.set(definition.name.value, {
            filePath,
            content: query,
            definition,
          });
        }
      }
    }
    return typeCache;
  }

  _extendSchema(
    schema: GraphQLSchema,
    schemaPath: string | null,
    schemaCacheKey: string | null,
  ): GraphQLSchema {
      throw new Error("STUB");
  }

  getSchema = async (
    appName?: string,
    queryHasExtensions?: boolean | null,
  ): Promise<GraphQLSchema | null> => {
    const projectConfig = this._graphQLConfig.getProject(appName);

    if (!projectConfig) {
      return null;
    }

    const schemaPath = projectConfig.schema as string;
    const schemaKey = this._getSchemaCacheKeyForProject(projectConfig);

    let schemaCacheKey = null;
    let schema = null;

    if (schemaPath && schemaKey) {
      schemaCacheKey = schemaKey as string;

      // Maybe use cache
      if (this._schemaMap.has(schemaCacheKey)) {
        schema = this._schemaMap.get(schemaCacheKey);
        if (schema) {
          return queryHasExtensions
            ? this._extendSchema(schema, schemaPath, schemaCacheKey)
            : schema;
        }
      }

      // Read from disk
      schema = await projectConfig.getSchema();
    }

    const customDirectives = projectConfig?.extensions?.customDirectives;
    if (customDirectives && schema) {
      const directivesSDL = customDirectives.join('\n\n');
      schema = extendSchema(schema, parse(directivesSDL));
    }

    if (!schema) {
      return null;
    }

    if (this._graphQLFileListCache.has(this._configDir)) {
      schema = this._extendSchema(schema, schemaPath, schemaCacheKey);
    }

    if (schemaCacheKey) {
      this._schemaMap.set(schemaCacheKey, schema);
      if (this._onSchemaChange) {
        this._onSchemaChange(projectConfig);
      }
    }
    return schema;
  };

  invalidateSchemaCacheForProject(projectConfig: GraphQLProjectConfig) {
    const schemaKey = this._getSchemaCacheKeyForProject(
      projectConfig,
    ) as string;
    if (schemaKey) {
      this._schemaMap.delete(schemaKey);
    }
  }

  _getSchemaCacheKeyForProject(
    projectConfig: GraphQLProjectConfig,
  ): UnnormalizedTypeDefPointer {
    return projectConfig.schema;
  }

  _getProjectName(projectConfig: GraphQLProjectConfig) {
      throw new Error("STUB");
  }

  /**
   * Given a list of GraphQL file metadata, read all files collected from watchman
   * and create fragmentDefinitions and GraphQL files cache.
   */
  readAllGraphQLFiles = async (
    list: Array<GraphQLFileMetadata>,
  ): Promise<{
    objectTypeDefinitions: Map<string, ObjectTypeInfo>;
    fragmentDefinitions: Map<string, FragmentInfo>;
    graphQLFileMap: Map<string, GraphQLFileInfo>;
  }> => {
      throw new Error("STUB");
  };

  /**
   * Takes an array of GraphQL File information and batch-processes into a
   * map of fragmentDefinitions and GraphQL file cache.
   */
  processGraphQLFiles = (
    responses: Array<GraphQLFileInfo>,
  ): {
    objectTypeDefinitions: Map<string, ObjectTypeInfo>;
    fragmentDefinitions: Map<string, FragmentInfo>;
    graphQLFileMap: Map<string, GraphQLFileInfo>;
  } => {
      throw new Error("STUB");
  };

  /**
   * Returns a Promise to read a GraphQL file and return a GraphQL metadata
   * including a parsed AST.
   */
  promiseToReadGraphQLFile = async (
    filePath: Uri,
  ): Promise<GraphQLFileInfo> => {
      throw new Error("STUB");
  };
}
