/**
 *  Copyright (c) 2021 GraphQL Contributors
 *  All rights reserved.
 *
 *  This source code is licensed under the BSD-style license found in the
 *  LICENSE file in the root directory of this source tree. An additional grant
 *  of patent rights can be found in the PATENTS file in the same directory.
 */

import CodeMirror, { Hints } from 'codemirror';
import {
  getNullableType,
  getNamedType,
  GraphQLEnumType,
  GraphQLInputObjectType,
  GraphQLList,
  GraphQLBoolean,
  GraphQLInputType,
  GraphQLInputFieldMap,
} from 'graphql';
import type { State, Maybe } from 'graphql-language-service';
import { IHints } from '../hint';

import forEachState from '../utils/forEachState';
import hintList from '../utils/hintList';

export type VariableToType = Record<string, GraphQLInputType>;
interface GraphQLVariableHintOptions {
  variableToType: VariableToType;
}

declare module 'codemirror' {
  interface ShowHintOptions {
    variableToType?: VariableToType;
  }

  interface CodeMirrorHintMap {
    'graphql-variables': (
      editor: CodeMirror.Editor,
      options: GraphQLVariableHintOptions,
    ) => IHints | undefined;
  }
}

/**
 * Registers a "hint" helper for CodeMirror.
 *
 * Using CodeMirror's "hint" addon: https://codemirror.net/demo/complete.html
 * Given an editor, this helper will take the token at the cursor and return a
 * list of suggested tokens.
 *
 * Options:
 *
 *   - variableToType: { [variable: string]: GraphQLInputType }
 *
 * Additional Events:
 *
 *   - hasCompletion (codemirror, data, token) - signaled when the hinter has a
 *     new list of completion suggestions.
 *
 */
CodeMirror.registerHelper(
  'hint',
  'graphql-variables',
  (
    editor: CodeMirror.Editor,
    options: GraphQLVariableHintOptions,
  ): Hints | undefined => {
      throw new Error("STUB");
  },
);

function getVariablesHint(
  cur: CodeMirror.Position,
  token: CodeMirror.Token,
  options: GraphQLVariableHintOptions,
) {
  // If currently parsing an invalid state, attempt to hint to the prior state.
  const state =
    token.state.kind === 'Invalid' ? token.state.prevState : token.state;

  const { kind, step } = state;
  // Variables can only be an object literal.
  if (kind === 'Document' && step === 0) {
    return hintList(cur, token, [{ text: '{' }]);
  }

  const { variableToType } = options;
  if (!variableToType) {
    return;
  }

  const typeInfo = getTypeInfo(variableToType, token.state);

  // Top level should typeahead possible variables.
  if (kind === 'Document' || (kind === 'Variable' && step === 0)) {
    const variableNames = Object.keys(variableToType);
    return hintList(
      cur,
      token,
      variableNames.map(name => { throw new Error("STUB"); }),
    );
  }

  // Input Object fields
  if (
    (kind === 'ObjectValue' || (kind === 'ObjectField' && step === 0)) &&
    typeInfo.fields
  ) {
    const inputFields = Object.keys(typeInfo.fields).map(
      fieldName => { throw new Error("STUB"); },
    );
    return hintList(
      cur,
      token,
      inputFields.map(field => { throw new Error("STUB"); }),
    );
  }

  // Input values.
  if (
    kind === 'StringValue' ||
    kind === 'NumberValue' ||
    kind === 'BooleanValue' ||
    kind === 'NullValue' ||
    (kind === 'ListValue' && step === 1) ||
    (kind === 'ObjectField' && step === 2) ||
    (kind === 'Variable' && step === 2)
  ) {
    const namedInputType = typeInfo.type
      ? getNamedType(typeInfo.type)
      : undefined;
    if (namedInputType instanceof GraphQLInputObjectType) {
      return hintList(cur, token, [{ text: '{' }]);
    }
    if (namedInputType instanceof GraphQLEnumType) {
      const values = namedInputType.getValues();
      // const values = Object.keys(valueMap).map(name => valueMap[name]); // TODO: Previously added
      return hintList(
        cur,
        token,
        values.map(value => { throw new Error("STUB"); }),
      );
    }
    if (namedInputType === GraphQLBoolean) {
      return hintList(cur, token, [
        { text: 'true', type: GraphQLBoolean, description: 'Not false.' }, // TODO: type and description don't seem to be used. Added them as optional anyway.
        { text: 'false', type: GraphQLBoolean, description: 'Not true.' },
      ]);
    }
  }
}

interface VariableTypeInfo {
  type?: Maybe<GraphQLInputType>;
  fields?: Maybe<GraphQLInputFieldMap>;
}

// Utility for collecting rich type information given any token's state
// from the graphql-variables-mode parser.
function getTypeInfo(
  variableToType: Record<string, GraphQLInputType>,
  tokenState: State,
) {
  const info: VariableTypeInfo = {
    type: null,
    fields: null,
  };

  forEachState(tokenState, state => {
      throw new Error("STUB");
  });

  return info;
}
