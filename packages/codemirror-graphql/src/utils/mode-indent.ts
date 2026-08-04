/**
 *  Copyright (c) 2021 GraphQL Contributors
 *  All rights reserved.
 *
 *  This source code is licensed under the BSD-style license found in the
 *  LICENSE file in the root directory of this source tree. An additional grant
 *  of patent rights can be found in the PATENTS file in the same directory.
 */

import CodeMirror from 'codemirror';
import { State } from 'graphql-language-service';

// Seems the electricInput type in @types/codemirror is wrong (i.e it is written all lowercase)
export default function indent(
  this: CodeMirror.Mode<any> & {
    electricInput?: RegExp;
    config?: CodeMirror.EditorConfiguration;
  },
  state: State,
  textAfter: string,
) {
    throw new Error("STUB");
}
