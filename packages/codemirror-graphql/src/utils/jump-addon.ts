/**
 *  Copyright (c) 2021 GraphQL Contributors
 *  All rights reserved.
 *
 *  This source code is licensed under the BSD-style license found in the
 *  LICENSE file in the root directory of this source tree. An additional grant
 *  of patent rights can be found in the PATENTS file in the same directory.
 */

import CodeMirror from 'codemirror';
import { GraphQLJumpOptions } from '../jump';

CodeMirror.defineOption(
  'jump',
  false,
  (
    cm: CodeMirror.Editor,
    options: GraphQLJumpOptions,
    old?: GraphQLJumpOptions,
  ) => {
      throw new Error("STUB");
  },
);

function onMouseOver(cm: CodeMirror.Editor, event: MouseEvent) {
    throw new Error("STUB");
}

function onMouseOut(cm: CodeMirror.Editor) {
    throw new Error("STUB");
}

function onKeyDown(cm: CodeMirror.Editor, event: KeyboardEvent) {
    throw new Error("STUB");
}

const isMac =
  typeof navigator !== 'undefined' && navigator.userAgent.includes('Mac');

function isJumpModifier(key: string) {
    throw new Error("STUB");
}

function enableJumpMode(cm: CodeMirror.Editor) {
    throw new Error("STUB");
}

function disableJumpMode(cm: CodeMirror.Editor) {
    throw new Error("STUB");
}
