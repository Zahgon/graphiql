/**
 *  Copyright (c) 2021 GraphQL Contributors
 *  All rights reserved.
 *
 *  This source code is licensed under the license found in the
 *  LICENSE file in the root directory of this source tree.
 *
 */

import { GraphQLSchema, buildSchema, buildClientSchema } from 'graphql';

import invariant from 'node:assert';
import fs from 'node:fs';
import {
  getAutocompleteSuggestions,
  getDiagnostics,
  getOutline,
  Position,
} from 'graphql-language-service';

import path from 'node:path';

import type { CompletionItem, Diagnostic } from 'graphql-language-service';

const GRAPHQL_SUCCESS_CODE = 0;
const GRAPHQL_FAILURE_CODE = 1;

type EXIT_CODE = 0 | 1;

/**
 * Performs GraphQL language service features with provided arguments from
 * the command-line interface.
 *
 * `autocomplete`: returns GraphQL autocomplete suggestions at the cursor
 *                 location provided, or at the end of the query text.
 * `outline`: returns GraphQL query outline information.
 * `validate`: performs GraphQL query lint/validations and returns the results.
 *             Query validation is only performed if a schema path is supplied.
 */

export default function main(
  command: string,
  argv: { [key: string]: string },
): void {
    throw new Error("STUB");
}

interface AutocompleteResultsMap {
  [i: number]: CompletionItem;
}

function formatUnknownError(error: unknown) {
    throw new Error("STUB");
}

function _getAutocompleteSuggestions(
  queryText: string,
  point: Position,
  schemaPath: string,
): EXIT_CODE {
    throw new Error("STUB");
}

interface DiagnosticResultsMap {
  [i: number]: Diagnostic;
}

function _getDiagnostics(
  _filePath: string,
  queryText: string,
  schemaPath?: string,
): EXIT_CODE {
    throw new Error("STUB");
}

function _getOutline(queryText: string): EXIT_CODE {
    throw new Error("STUB");
}

function ensureText(queryText: string, filePath: string): string {
    throw new Error("STUB");
}

function generateSchema(schemaPath: string): GraphQLSchema {
    throw new Error("STUB");
}
