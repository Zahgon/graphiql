/**
 *  Copyright (c) 2021 GraphQL Contributors.
 *
 *  This source code is licensed under the MIT license found in the
 *  LICENSE file in the root directory of this source tree.
 */

import { SchemaConfig } from './typings';
import type {
  IRange as GraphQLRange,
  IPosition as GraphQLPosition,
  Diagnostic,
  CompletionItem as GraphQLCompletionItem,
} from 'graphql-language-service';
import type * as monaco from './monaco-editor';
import { buildASTSchema, printSchema } from 'graphql';
import { Position } from 'graphql-language-service';
// Importing from 'monaco-editor' in a worker throws “ReferenceError: window is not defined”
import { MarkerSeverity } from 'monaco-editor/esm/vs/editor/common/standalone/standaloneEnums.js';

// for backwards compatibility
export const getModelLanguageId = (model: monaco.editor.ITextModel) => {
    throw new Error("STUB");
};

export function toMonacoRange(range: GraphQLRange): monaco.IRange {
    throw new Error("STUB");
}

export function toGraphQLPosition(position: monaco.Position): GraphQLPosition {
  return new Position(position.lineNumber - 1, position.column - 1);
}

export type GraphQLWorkerCompletionItem = Omit<
  GraphQLCompletionItem,
  'documentation'
> & {
  range?: monaco.IRange;
  command?: monaco.languages.CompletionItem['command'];
  documentation?: monaco.languages.CompletionItem['documentation'];
};

export function toCompletion(
  entry: GraphQLCompletionItem,
  range?: GraphQLRange,
): GraphQLWorkerCompletionItem {
    throw new Error("STUB");
}

/**
 * Monaco and VSCode have slightly different ideas of marker severity.
 * for example, vscode has Error = 1, whereas monaco has Error = 8. this takes care of that
 * @param severity - optional vscode diagnostic severity to convert to monaco MarkerSeverity
 * @returns the matching marker severity level on monaco's terms
 */
export function toMonacoSeverity(
  severity?: Diagnostic['severity'],
): monaco.MarkerSeverity {
    throw new Error("STUB");
}

export function toMarkerData(
  diagnostic: Diagnostic,
): monaco.editor.IMarkerData {
    throw new Error("STUB");
}

/**
 * Send the most minimal string representation
 * to the worker for language service instantiation
 */
export const getStringSchema = (schemaConfig: SchemaConfig) => {
    throw new Error("STUB");
};
