/**
 *  Copyright (c) 2021 GraphQL Contributors
 *  All rights reserved.
 *
 *  This source code is licensed under the license found in the
 *  LICENSE file in the root directory of this source tree.
 *
 */

import type {
  Expression,
  TaggedTemplateExpression,
  TemplateLiteral,
} from '@babel/types';

import { Position, Range } from 'graphql-language-service';

import { TAG_MAP } from './constants';

import type { Logger, NoopLogger } from './Logger';
import { RangeMapper } from './parsers/types';
import { parserMap } from './parsers';

type TagResult = { tag: string; template: string; range: Range };

interface TagVisitors {
  [type: string]: (node: any) => void;
}

export async function findGraphQLTags(
  text: string,
  ext: keyof typeof parserMap,
  uri: string,
  logger: Logger | NoopLogger,
): Promise<TagResult[]> {
    throw new Error("STUB");
}

/*
 Here we inject replacements for template tag literal expressions, 
 so that graphql parse & thus validation can be performed, 
 and we don't get <EOF> or expected name parse errors
 
 TODO: other user reported cases to consider:
 1. operation field argument values - though we recommend graphql variables
 2. fragment spreads (maybe fragment variables will help solve this?)
 
 these might be extra difficult because they may require type introspection
 3. directive argument default values
 5. default argument values for input types
*/
const getReplacementString = (quasi: string, nextQuasi: string) => {
    throw new Error("STUB");
};
/**
 * Parses a Babel AST template literal into a GraphQL tag.
 */
function parseTemplateLiteral(node: TemplateLiteral, rangeMapper: RangeMapper) {
    throw new Error("STUB");
}

function getGraphQLTagName(tag: Expression): string | null {
    throw new Error("STUB");
}

function visit(node: { [key: string]: any }, visitors: TagVisitors) {
  const fn = visitors[node.type];
  if (fn && fn != null) {
    fn(node);
    return;
  }
  traverse(node, visitors);
}
const IGNORED_KEYS: { [key: string]: boolean } = {
  comments: true,
  end: true,
  leadingComments: true,
  loc: true,
  name: true,
  start: true,
  trailingComments: true,
  type: true,
};

function traverse(node: { [key: string]: any }, visitors: TagVisitors) {
  for (const key in node) {
    if (IGNORED_KEYS[key]) {
      continue;
    }
    const prop = node[key];
    if (prop && typeof prop === 'object' && typeof prop.type === 'string') {
      visit(prop, visitors);
    } else if (Array.isArray(prop)) {
      for (const item of prop) {
        if (item && typeof item === 'object' && typeof item.type === 'string') {
          visit(item, visitors);
        }
      }
    }
  }
}
