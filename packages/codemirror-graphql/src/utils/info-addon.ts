/**
 *  Copyright (c) 2021 GraphQL Contributors
 *  All rights reserved.
 *
 *  This source code is licensed under the BSD-style license found in the
 *  LICENSE file in the root directory of this source tree. An additional grant
 *  of patent rights can be found in the PATENTS file in the same directory.
 */

import CodeMirror from 'codemirror';
import { GraphQLInfoOptions } from '../info';

// CodeMirror's option system accepts the option value as the declared shape,
// a boolean to enable/disable with defaults, or a function used as the render
// helper. The handler below handles all three cases, so the parameter types
// are widened accordingly.
type GraphQLInfoOptionValue = GraphQLInfoOptions | boolean | (() => string);

CodeMirror.defineOption(
  'info',
  false,
  (
    cm: CodeMirror.Editor,
    options: GraphQLInfoOptionValue,
    old?: GraphQLInfoOptionValue,
  ) => {
      throw new Error("STUB");
  },
);

function createState(options: GraphQLInfoOptionValue) {
  return {
    options:
      options instanceof Function
        ? { render: options }
        : options === true
          ? {}
          : options,
  };
}

function getHoverTime(cm: CodeMirror.Editor) {
    throw new Error("STUB");
}

function onMouseOver(cm: CodeMirror.Editor, e: MouseEvent) {
    throw new Error("STUB");
}

function onMouseHover(cm: CodeMirror.Editor, box: DOMRect) {
    throw new Error("STUB");
}

function showPopup(cm: CodeMirror.Editor, box: DOMRect, info: HTMLDivElement) {
    throw new Error("STUB");
}
