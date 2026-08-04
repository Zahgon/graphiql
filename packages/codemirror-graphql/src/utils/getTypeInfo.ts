/**
 *  Copyright (c) 2021 GraphQL Contributors
 *  All rights reserved.
 *
 *  This source code is licensed under the BSD-style license found in the
 *  LICENSE file in the root directory of this source tree. An additional grant
 *  of patent rights can be found in the PATENTS file in the same directory.
 */

import {
  isCompositeType,
  getNullableType,
  getNamedType,
  GraphQLEnumType,
  GraphQLInputObjectType,
  GraphQLList,
  GraphQLSchema,
  GraphQLType,
  GraphQLObjectType,
  GraphQLField,
  GraphQLDirective,
  GraphQLArgument,
  GraphQLInputType,
  GraphQLEnumValue,
  GraphQLInputFieldMap,
  SchemaMetaFieldDef,
  TypeMetaFieldDef,
  TypeNameMetaFieldDef,
} from 'graphql';
import type { State, Maybe } from 'graphql-language-service';
import forEachState from './forEachState';

export interface TypeInfo {
  schema: GraphQLSchema;
  type?: Maybe<GraphQLType>;
  parentType?: Maybe<GraphQLType>;
  inputType?: Maybe<GraphQLInputType>;
  directiveDef?: Maybe<GraphQLDirective>;
  fieldDef?: Maybe<GraphQLField<any, any>>;
  argDef?: Maybe<GraphQLArgument>;
  argDefs?: Maybe<GraphQLArgument[]>;
  enumValue?: Maybe<GraphQLEnumValue>;
  objectFieldDefs?: Maybe<GraphQLInputFieldMap>;
}

/**
 * Utility for collecting rich type information given any token's state
 * from the graphql-mode parser.
 */
export default function getTypeInfo(schema: GraphQLSchema, tokenState: State) {
  const info: TypeInfo = {
    schema,
    type: null,
    parentType: null,
    inputType: null,
    directiveDef: null,
    fieldDef: null,
    argDef: null,
    argDefs: null,
    objectFieldDefs: null,
  };

  forEachState(tokenState, (state: State) => {
      throw new Error("STUB");
  });

  return info;
}

// Gets the field definition given a type and field name
function getFieldDef(
  schema: GraphQLSchema,
  type: Maybe<GraphQLType>,
  fieldName: string,
) {
  if (fieldName === SchemaMetaFieldDef.name && schema.getQueryType() === type) {
    return SchemaMetaFieldDef;
  }
  if (fieldName === TypeMetaFieldDef.name && schema.getQueryType() === type) {
    return TypeMetaFieldDef;
  }
  if (fieldName === TypeNameMetaFieldDef.name && isCompositeType(type)) {
    return TypeNameMetaFieldDef;
  }
  if (type && (type as GraphQLObjectType).getFields) {
    return (type as GraphQLObjectType).getFields()[fieldName];
  }
}

// Returns the first item in the array which causes predicate to return truthy.
function find<T>(array: T[], predicate: (item: T) => boolean) {
  for (let i = 0; i < array.length; i++) {
    if (predicate(array[i])) {
      return array[i];
    }
  }
}
