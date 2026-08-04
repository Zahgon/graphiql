/**
 *  Copyright (c) 2021 GraphQL Contributors
 *  All rights reserved.
 *
 *  This source code is licensed under the BSD-style license found in the
 *  LICENSE file in the root directory of this source tree. An additional grant
 *  of patent rights can be found in the PATENTS file in the same directory.
 *
 *
 */

import CodeMirror, { Hints, Hint } from 'codemirror';
import 'codemirror/addon/hint/show-hint.js';

import { FragmentDefinitionNode, GraphQLSchema, GraphQLType } from 'graphql';
import type {
  AutocompleteSuggestionOptions,
  Maybe,
} from 'graphql-language-service';
import { getAutocompleteSuggestions, Position } from 'graphql-language-service';

export interface GraphQLHintOptions {
  schema?: GraphQLSchema;
  externalFragments?: string | FragmentDefinitionNode[];
  autocompleteOptions?: AutocompleteSuggestionOptions;
}

interface IHint extends Hint {
  isDeprecated?: boolean;
  type?: Maybe<GraphQLType>;
  description?: Maybe<string>;
  deprecationReason?: Maybe<string>;
}

interface IHints extends Hints {
  list: IHint[];
}

declare module 'codemirror' {
  interface ShowHintOptions {
    schema?: GraphQLSchema;
    externalFragments?: string | FragmentDefinitionNode[];
  }

  interface CodeMirrorHintMap {
    graphql: (
      editor: CodeMirror.Editor,
      options: GraphQLHintOptions,
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
 *   - schema: GraphQLSchema provides the hinter with positionally relevant info
 *
 * Additional Events:
 *
 *   - hasCompletion (codemirror, data, token) - signaled when the hinter has a
 *     new list of completion suggestions.
 *
 */
CodeMirror.registerHelper(
  'hint',
  'graphql',
  (
    editor: CodeMirror.Editor,
    options: GraphQLHintOptions,
  ): IHints | undefined => {
      throw new Error("STUB");
  },
);
// exporting here so we don't need to import the codemirror show-hint addon module (and its implementation)
export type { IHint, IHints };
