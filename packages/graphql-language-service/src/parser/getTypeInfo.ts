/**
 *  Copyright (c) 2021 GraphQL Contributors
 *  All rights reserved.
 *
 *  This source code is licensed under the license found in the
 *  LICENSE file in the root directory of this source tree.
 *
 */

import {
  GraphQLSchema,
  GraphQLEnumValue,
  GraphQLField,
  GraphQLInterfaceType,
  GraphQLObjectType,
  GraphQLArgument,
  GraphQLEnumType,
  GraphQLInputObjectType,
  GraphQLList,
  getNamedType,
  getNullableType,
  SchemaMetaFieldDef,
  GraphQLType,
  TypeMetaFieldDef,
  TypeNameMetaFieldDef,
  isCompositeType,
} from 'graphql';

import { AllTypeInfo } from '../types';

import { State, RuleKinds } from '.';

// Gets the field definition given a type and field name
export function getFieldDef(
  schema: GraphQLSchema,
  type: GraphQLType,
  fieldName: string,
): GraphQLField<any, any> | null | undefined {
  if (fieldName === SchemaMetaFieldDef.name && schema.getQueryType() === type) {
    return SchemaMetaFieldDef;
  }
  if (fieldName === TypeMetaFieldDef.name && schema.getQueryType() === type) {
    return TypeMetaFieldDef;
  }
  if (fieldName === TypeNameMetaFieldDef.name && isCompositeType(type)) {
    return TypeNameMetaFieldDef;
  }
  if ('getFields' in type) {
    return type.getFields()[fieldName] as any;
  }

  return null;
}

// Utility for iterating through a CodeMirror parse state stack bottom-up.
export function forEachState(
  stack: State,
  fn: (state: State) => AllTypeInfo | null | void,
): void {
  const reverseStateStack = [];
  let state: State | null | undefined = stack;
  while (state?.kind) {
    reverseStateStack.push(state);
    state = state.prevState;
  }
  for (let i = reverseStateStack.length - 1; i >= 0; i--) {
    fn(reverseStateStack[i]);
  }
}

// Utility for returning the state representing the Definition this token state
// is within, if any.
export function getDefinitionState(
  tokenState: State,
): State | null | undefined {
  let definitionState;

  // TODO - couldn't figure this one out
  forEachState(tokenState, (state: State): void => {
      throw new Error("STUB");
  });

  return definitionState;
}

// Utility for collecting rich type information given any token's state
// from the graphql-mode parser.
export function getTypeInfo(
  schema: GraphQLSchema,
  tokenState: State,
): AllTypeInfo {
  let argDef: AllTypeInfo['argDef'];
  let argDefs: AllTypeInfo['argDefs'];
  let directiveDef: AllTypeInfo['directiveDef'];
  let enumValue: AllTypeInfo['enumValue'];
  let fieldDef: AllTypeInfo['fieldDef'];
  let inputType: AllTypeInfo['inputType'];
  let objectTypeDef: AllTypeInfo['objectTypeDef'];
  let objectFieldDefs: AllTypeInfo['objectFieldDefs'];
  let parentType: AllTypeInfo['parentType'];
  let type: AllTypeInfo['type'];
  let interfaceDef: AllTypeInfo['interfaceDef'];
  forEachState(tokenState, state => {
      throw new Error("STUB");
  });

  return {
    argDef,
    argDefs,
    directiveDef,
    enumValue,
    fieldDef,
    inputType,
    objectFieldDefs,
    parentType,
    type,
    interfaceDef,
    objectTypeDef,
  };
}
