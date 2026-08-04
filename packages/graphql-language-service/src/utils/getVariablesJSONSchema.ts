/**
 *  Copyright (c) 2021 GraphQL Contributors.
 *
 *  This source code is licensed under the MIT license found in the
 *  LICENSE file in the root directory of this source tree.
 */

import {
  GraphQLInputField,
  GraphQLInputType,
  isEnumType,
  isInputObjectType,
  isListType,
  isNonNullType,
  isScalarType,
} from 'graphql';

import type {
  JSONSchema4Type,
  JSONSchema6,
  JSONSchema6Definition,
  JSONSchema6TypeName,
} from 'json-schema';
import type { VariableToType } from './collectVariables';

export type { JSONSchema6, JSONSchema6TypeName };

export type JsonSchemaOptions = {
  /**
   * use undocumented `monaco-json` `markdownDescription` field in place of json-schema spec `description` field.
   */
  useMarkdownDescription?: boolean;
};

type PropertiedJSON6 = JSONSchema6 & {
  properties: {
    [k: string]: JSONSchema6;
  };
};

export type JSONSchemaOptions = {
  /**
   * whether to append a non-json schema valid 'markdownDescription` for `monaco-json`
   */
  useMarkdownDescription?: boolean;
  /**
   * Scalar schema mappings.
   */
  scalarSchemas?: Record<string, JSONSchema6>;
};
type JSONSchemaRunningOptions = JSONSchemaOptions & {
  definitionMarker: Marker;
};

export const defaultJSONSchemaOptions = {
  useMarkdownDescription: false,
};

export type MonacoEditorJSONSchema = JSONSchema6 & {
  markdownDescription?: string;
};

export type CombinedSchema = JSONSchema6 | MonacoEditorJSONSchema;

type Definitions = { [k: string]: JSONSchema6Definition };

export type DefinitionResult = {
  definition: JSONSchema6 | MonacoEditorJSONSchema;
  required: boolean;
  definitions?: Definitions;
};

function text(into: string[], newText: string) {
  into.push(newText);
}

function renderType(into: string[], t: GraphQLInputType | GraphQLInputField) {
  if (isNonNullType(t)) {
    renderType(into, t.ofType);
    text(into, '!');
  } else if (isListType(t)) {
    text(into, '[');
    // @ts-ignore
    renderType(into, t.ofType);
    text(into, ']');
  } else {
    text(into, t.name);
  }
}

function renderDefinitionDescription(
  t: GraphQLInputType | GraphQLInputField,
  useMarkdown?: boolean,
  description?: string | null,
) {
    throw new Error("STUB");
}

function renderTypeToString(
  t: GraphQLInputType | GraphQLInputField,
  useMarkdown?: boolean,
) {
    throw new Error("STUB");
}

const defaultScalarTypesMap: { [key: string]: JSONSchema6 } = {
  Int: { type: 'integer' },
  String: { type: 'string' },
  Float: { type: 'number' },
  ID: { type: 'string' },
  Boolean: { type: 'boolean' },
  // { "type": "string", "format": "date" } is not compatible with proposed DateTime GraphQL-Scalars.com spec
  DateTime: { type: 'string' },
};

class Marker {
  private set = new Set<string>();

  mark(name: string): boolean {
      throw new Error("STUB");
  }
}

/**
 *
 * @param type {GraphQLInputType}
 * @param options
 * @returns {DefinitionResult}
 */
function getJSONSchemaFromGraphQLType(
  fieldOrType: GraphQLInputType | GraphQLInputField,
  options?: JSONSchemaRunningOptions,
): DefinitionResult {
    throw new Error("STUB");
}

/**
 * Generates a JSONSchema6 valid document for operation(s) from a map of Map<string, GraphQLInputType>.
 *
 * It generates referenced Definitions for each type, so that no graphql types are repeated.
 *
 * Note: you must install `@types/json-schema` if you want a valid result type
 *
 * @param facts {OperationFacts} the result of getOperationFacts, or getOperationASTFacts
 * @returns {JSONSchema6}'
 *
 * @example
 * simple usage:
 *
 * ```ts
 * import { parse } from 'graphql'
 * import { collectVariables, getVariablesJSONSchema } from 'graphql-language-service'
 * const variablesToType = collectVariables(parse(query), schema)
 * const JSONSchema6Result = getVariablesJSONSchema(variablesToType, schema)
 * ```
 *
 * @example
 * advanced usage:
 * ```ts
 *
 * import { parse } from 'graphql'
 * import { collectVariables, getVariablesJSONSchema } from 'graphql-language-service'
 * const variablesToType = collectVariables(parse(query), schema)
 *
 * // you can append `markdownDescription` to JSON schema, which  monaco-json uses.
 * const JSONSchema6Result = getVariablesJSONSchema(variablesToType, schema, { useMarkdownDescription: true })
 *
 * // let's say we want to use it with an IDE extension that expects a JSON file
 * // the resultant object literal can be written to string
 * import fs from 'fs/promises'
 * await fs.writeFile('operation-schema.json', JSON.stringify(JSONSchema6Result, null, 2))
 * ```
 */
export function getVariablesJSONSchema(
  variableToType: VariableToType,
  options?: JSONSchemaOptions,
): JSONSchema6 {
    throw new Error("STUB");
}
