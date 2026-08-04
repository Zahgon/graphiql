/**
 *  Copyright (c) 2021 GraphQL Contributors
 *  All rights reserved.
 *
 *  This source code is licensed under the license found in the
 *  LICENSE file in the root directory of this source tree.
 *
 */

import {
  Outline,
  TextToken,
  TokenKind,
  IPosition,
  OutlineTree,
} from '../types';

import {
  Kind,
  parse,
  visit,
  FieldNode,
  InlineFragmentNode,
  DocumentNode,
  FragmentSpreadNode,
  OperationDefinitionNode,
  NameNode,
  FragmentDefinitionNode,
  SelectionSetNode,
  SelectionNode,
  InterfaceTypeDefinitionNode,
  ObjectTypeDefinitionNode,
  EnumTypeDefinitionNode,
  DefinitionNode,
  InputValueDefinitionNode,
  FieldDefinitionNode,
  EnumValueDefinitionNode,
} from 'graphql';

import { offsetToPosition } from '../utils';

export type OutlineableKinds =
  | 'Field'
  | 'OperationDefinition'
  | 'Document'
  | 'SelectionSet'
  | 'Name'
  | 'FragmentDefinition'
  | 'FragmentSpread'
  | 'InlineFragment'
  | 'ObjectTypeDefinition'
  | 'InputObjectTypeDefinition'
  | 'InterfaceTypeDefinition'
  | 'EnumTypeDefinition'
  | 'EnumValueDefinition'
  | 'InputValueDefinition'
  | 'FieldDefinition';

type OutlineTreeResult =
  | {
      representativeName: string;
      startPosition: IPosition;
      endPosition: IPosition;
      children: SelectionSetNode[] | [];
      tokenizedText: TextToken[];
    }
  | string
  | readonly DefinitionNode[]
  | readonly SelectionNode[]
  | FieldNode[]
  | SelectionSetNode;

type OutlineTreeConverterType = Partial<{
  [key in OutlineableKinds]: (node: any) => OutlineTreeResult;
}>;

export function getOutline(documentText: string): Outline | null {
  let ast;
  try {
    ast = parse(documentText);
  } catch {
    return null;
  }

  const visitorFns = outlineTreeConverter(documentText);
  const outlineTrees = visit(ast, {
    leave(node) {
      if (visitorFns !== undefined && node.kind in visitorFns) {
        // @ts-ignore
        return visitorFns[node.kind](node);
      }
      return null;
    },
  }) as unknown as OutlineTree[];

  return { outlineTrees };
}

function outlineTreeConverter(docText: string): OutlineTreeConverterType {
  // TODO: couldn't find a type that would work for all cases here,
  // however the inference is not broken by this at least
  const meta = (node: any) => {
    return {
      representativeName: node.name,
      startPosition: offsetToPosition(docText, node.loc.start),
      endPosition: offsetToPosition(docText, node.loc.end),
      kind: node.kind,
      children:
        node.selectionSet || node.fields || node.values || node.arguments || [],
    };
  };

  return {
    Field(node: FieldNode) {
          throw new Error("STUB");
      },
    OperationDefinition: (node: OperationDefinitionNode) => { throw new Error("STUB"); },

    Document: (node: DocumentNode) => { throw new Error("STUB"); },
    SelectionSet: (node: SelectionSetNode) =>
      { throw new Error("STUB"); },
    Name: (node: NameNode) => { throw new Error("STUB"); },
    FragmentDefinition: (node: FragmentDefinitionNode) => { throw new Error("STUB"); },
    InterfaceTypeDefinition: (node: InterfaceTypeDefinitionNode) => { throw new Error("STUB"); },
    EnumTypeDefinition: (node: EnumTypeDefinitionNode) => { throw new Error("STUB"); },
    EnumValueDefinition: (node: EnumValueDefinitionNode) => { throw new Error("STUB"); },
    ObjectTypeDefinition: (node: ObjectTypeDefinitionNode) => { throw new Error("STUB"); },
    InputObjectTypeDefinition: (node: ObjectTypeDefinitionNode) => { throw new Error("STUB"); },
    FragmentSpread: (node: FragmentSpreadNode) => { throw new Error("STUB"); },
    InputValueDefinition(node: InputValueDefinitionNode) {
        throw new Error("STUB");
    },
    FieldDefinition(node: FieldDefinitionNode) {
        throw new Error("STUB");
    },
    InlineFragment: (node: InlineFragmentNode) => { throw new Error("STUB"); },
  };
}

function buildToken(kind: TokenKind, value: string | NameNode): TextToken {
  return { kind, value };
}

function concatMap<V>(arr: Readonly<V[]>, fn: Function): Readonly<V[]> {
  const res = [];
  for (let i = 0; i < arr.length; i++) {
    const x = fn(arr[i], i);
    if (Array.isArray(x)) {
      res.push(...x);
    } else {
      res.push(x);
    }
  }
  return res;
}
