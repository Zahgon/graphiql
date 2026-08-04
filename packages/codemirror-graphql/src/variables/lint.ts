/**
 *  Copyright (c) 2021 GraphQL Contributors
 *  All rights reserved.
 *
 *  This source code is licensed under the BSD-style license found in the
 *  LICENSE file in the root directory of this source tree. An additional grant
 *  of patent rights can be found in the PATENTS file in the same directory.
 */

import CodeMirror from 'codemirror';
import {
  GraphQLEnumType,
  GraphQLInputObjectType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLScalarType,
  GraphQLType,
} from 'graphql';

import jsonParse, {
  JSONSyntaxError,
  ParseArrayOutput,
  ParseObjectOutput,
  ParseValueOutput,
} from '../utils/jsonParse';
import { VariableToType } from './hint';

interface GraphQLVariableLintOptions {
  variableToType: VariableToType;
}

/**
 * Registers a "lint" helper for CodeMirror.
 *
 * Using CodeMirror's "lint" addon: https://codemirror.net/demo/lint.html
 * Given the text within an editor, this helper will take that text and return
 * a list of linter issues ensuring that correct variables were provided.
 *
 * Options:
 *
 *   - variableToType: { [variable: string]: GraphQLInputType }
 *
 */
CodeMirror.registerHelper(
  'lint',
  'graphql-variables',
  (
    text: string,
    options: GraphQLVariableLintOptions,
    editor: CodeMirror.Editor,
  ) => {
      throw new Error("STUB");
  },
);

// Given a variableToType object, a source text, and a JSON AST, produces a
// list of CodeMirror annotations for any variable validation errors.
function validateVariables(
  editor: CodeMirror.Editor,
  variableToType: VariableToType,
  variablesAST: ParseObjectOutput,
) {
  const errors: CodeMirror.Annotation[] = [];

  for (const member of variablesAST.members) {
    if (member) {
      const variableName = member.key?.value;
      const type = variableToType[variableName];
      if (type) {
        for (const [node, message] of validateValue(type, member.value)) {
          errors.push(lintError(editor, node, message));
        }
      } else {
        errors.push(
          lintError(
            editor,
            member.key!,
            `Variable "$${variableName}" does not appear in any GraphQL query.`,
          ),
        );
      }
    }
  }

  return errors;
}

// Returns a list of validation errors in the form Array<[Node, String]>.
function validateValue(
  type?: GraphQLType,
  valueAST?: ParseValueOutput,
): any[][] {
  // TODO: Can't figure out the right type.
  if (!type || !valueAST) {
    return [];
  }

  // Validate non-nullable values.
  if (type instanceof GraphQLNonNull) {
    if (valueAST.kind === 'Null') {
      return [[valueAST, `Type "${type}" is non-nullable and cannot be null.`]];
    }
    return validateValue(type.ofType, valueAST);
  }

  if (valueAST.kind === 'Null') {
    return [];
  }

  // Validate lists of values, accepting a non-list as a list of one.
  if (type instanceof GraphQLList) {
    const itemType = type.ofType;
    if (valueAST.kind === 'Array') {
      const values = (valueAST as ParseArrayOutput).values || [];
      return mapCat(values, item => { throw new Error("STUB"); });
    }
    return validateValue(itemType, valueAST);
  }

  // Validate input objects.
  if (type instanceof GraphQLInputObjectType) {
    if (valueAST.kind !== 'Object') {
      return [[valueAST, `Type "${type}" must be an Object.`]];
    }

    // Validate each field in the input object.
    const providedFields = Object.create(null);
    const fieldErrors: any[][] = mapCat(
      (valueAST as ParseObjectOutput).members,
      member => {
          throw new Error("STUB");
      },
    );

    // Look for missing non-nullable fields.
    for (const fieldName of Object.keys(type.getFields())) {
      const field = type.getFields()[fieldName];
      if (
        !providedFields[fieldName] &&
        field.type instanceof GraphQLNonNull &&
        !field.defaultValue
      ) {
        fieldErrors.push([
          valueAST,
          `Object of type "${type}" is missing required field "${fieldName}".`,
        ]);
      }
    }

    return fieldErrors;
  }

  // Validate common scalars.
  if (
    (type.name === 'Boolean' && valueAST.kind !== 'Boolean') ||
    (type.name === 'String' && valueAST.kind !== 'String') ||
    (type.name === 'ID' &&
      valueAST.kind !== 'Number' &&
      valueAST.kind !== 'String') ||
    (type.name === 'Float' && valueAST.kind !== 'Number') ||
    (type.name === 'Int' &&
      // eslint-disable-next-line no-bitwise
      (valueAST.kind !== 'Number' || (valueAST.value | 0) !== valueAST.value))
  ) {
    return [[valueAST, `Expected value of type "${type}".`]];
  }

  // Validate enums and custom scalars.
  if (
    (type instanceof GraphQLEnumType || type instanceof GraphQLScalarType) &&
    ((valueAST.kind !== 'String' &&
      valueAST.kind !== 'Number' &&
      valueAST.kind !== 'Boolean' &&
      valueAST.kind !== 'Null') ||
      isNullish(type.parseValue(valueAST.value)))
  ) {
    return [[valueAST, `Expected value of type "${type}".`]];
  }

  return [];
}

// Give a parent text, an AST node with location, and a message, produces a
// CodeMirror annotation object.
function lintError(
  editor: CodeMirror.Editor,
  node: { start: number; end: number },
  message: string,
): CodeMirror.Annotation & { type: string } {
  return {
    message,
    severity: 'error',
    type: 'validation',
    from: editor.posFromIndex(node.start),
    to: editor.posFromIndex(node.end),
  };
}

function isNullish(value: any): boolean {
  // eslint-disable-next-line no-self-compare
  return value === null || value === undefined || value !== value;
}

function mapCat<T, R>(array: T[], mapper: (item: T) => R[]): R[] {
  return Array.prototype.concat.apply([], array.map(mapper));
}
