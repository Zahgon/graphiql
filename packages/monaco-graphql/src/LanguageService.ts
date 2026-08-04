/**
 *  Copyright (c) 2021 GraphQL Contributors.
 *
 *  This source code is licensed under the MIT license found in the
 *  LICENSE file in the root directory of this source tree.
 */
import {
  parse,
  GraphQLSchema,
  ParseOptions,
  ValidationRule,
  FragmentDefinitionNode,
  visit,
  DocumentNode,
  Source,
} from 'graphql';
import picomatch from 'picomatch-browser';
import type {
  AutocompleteSuggestionOptions,
  IPosition,
} from 'graphql-language-service';
import {
  getAutocompleteSuggestions,
  getDiagnostics,
  getHoverInformation,
  HoverConfig,
  getVariablesJSONSchema,
  getOperationASTFacts,
  JSONSchemaOptions,
} from 'graphql-language-service';
import { defaultSchemaLoader } from './schemaLoader';
import { SchemaConfig, SchemaLoader, GraphQLLanguageConfig } from './typings';

type SchemaCacheItem = Omit<SchemaConfig, 'schema'> & { schema: GraphQLSchema };

type SchemaCache = Map<string, SchemaCacheItem>;
const schemaCache: SchemaCache = new Map();

/**
 * Currently only used by the `monaco-graphql` worker
 */
export class LanguageService {
  private _parser: typeof parse = parse;
  private _schemas: SchemaConfig[] = [];
  private _schemaCache: SchemaCache = schemaCache;
  private _schemaLoader: SchemaLoader = defaultSchemaLoader;
  private _parseOptions?: ParseOptions;
  private _customValidationRules?: ValidationRule[];
  private _externalFragmentDefinitionNodes: FragmentDefinitionNode[] | null =
    null;
  private _externalFragmentDefinitionsString: string | null = null;
  private _completionSettings: AutocompleteSuggestionOptions;
  constructor({
    parser,
    schemas,
    parseOptions,
    externalFragmentDefinitions,
    customValidationRules,
    fillLeafsOnComplete,
    completionSettings,
  }: GraphQLLanguageConfig) {
      throw new Error("STUB");
  }

  private _cacheSchemas() {
      throw new Error("STUB");
  }

  private _cacheSchema(schemaConfig: SchemaConfig) {
      throw new Error("STUB");
  }

  /**
   * Provide a model uri path, and see if a schema config has a `fileMatch` to match it
   * @param uri {string}
   * @returns {SchemaCacheItem | undefined}
   */
  public getSchemaForFile(uri: string): SchemaCacheItem | undefined {
      throw new Error("STUB");
  }

  public getExternalFragmentDefinitions(): FragmentDefinitionNode[] {
      throw new Error("STUB");
  }

  /**
   * Override `schemas` config entirely.
   */
  public async updateSchemas(schemas: SchemaConfig[]): Promise<void> {
      throw new Error("STUB");
  }

  /**
   * Overwrite an existing schema config by Uri string.
   */
  public updateSchema(schema: SchemaConfig): void {
      throw new Error("STUB");
  }

  /**
   * Add a schema to the config.
   */
  public addSchema(schema: SchemaConfig): void {
      throw new Error("STUB");
  }
  /**
   * Uses the configured parser
   * @param text {string | Source}
   * @param options {ParseOptions}
   * @returns {DocumentNode}
   */
  public parse(text: string | Source, options?: ParseOptions): DocumentNode {
    return this._parser(text, options || this._parseOptions);
  }
  /**
   * get completion for the given uri and matching schema
   * @param uri
   * @param documentText
   * @param position
   * @returns
   */
  public getCompletion = (
    uri: string,
    documentText: string,
    position: IPosition,
  ) => {
      throw new Error("STUB");
  };
  /**
   * get diagnostics using graphql validation
   */
  public getDiagnostics = (
    uri: string,
    documentText: string,
    customRules?: ValidationRule[],
  ) => {
    const schema = this.getSchemaForFile(uri);
    if (!documentText || documentText.trim().length < 2 || !schema?.schema) {
      return [];
    }
    return getDiagnostics(
      documentText,
      schema.schema,
      customRules ?? this._customValidationRules,
      false,
      this.getExternalFragmentDefinitions(),
    );
  };

  public getHover = (
    uri: string,
    documentText: string,
    position: IPosition,
    options?: HoverConfig,
  ) => {
      throw new Error("STUB");
  };

  public getVariablesJSONSchema = (
    uri: string,
    documentText: string,
    options?: JSONSchemaOptions,
  ) => {
      throw new Error("STUB");
  };
}
