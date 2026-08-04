/**
 *  Copyright (c) 2021 GraphQL Contributors
 *  All rights reserved.
 *
 *  This source code is licensed under the license found in the
 *  LICENSE file in the root directory of this source tree.
 *
 */

import {
  ValidationRule,
  DocumentNode,
  specifiedRules,
  validate,
  GraphQLError,
  GraphQLSchema,
  NoUnusedFragmentsRule,
  KnownFragmentNamesRule,
  Kind,
  ExecutableDefinitionsRule,
  // specifiedSDLRules:
  LoneSchemaDefinitionRule,
  UniqueOperationTypesRule,
  UniqueTypeNamesRule,
  UniqueEnumValueNamesRule,
  UniqueFieldDefinitionNamesRule,
  UniqueDirectiveNamesRule,
  KnownTypeNamesRule,
  KnownDirectivesRule,
  UniqueDirectivesPerLocationRule,
  PossibleTypeExtensionsRule,
  // KnownArgumentNamesOnDirectivesRule,
  UniqueArgumentNamesRule,
  UniqueInputFieldNamesRule,
  UniqueVariableNamesRule,
  FragmentsOnCompositeTypesRule,
  ProvidedRequiredArgumentsRule,
} from 'graphql';

const specifiedSDLRules = [
  LoneSchemaDefinitionRule,
  UniqueOperationTypesRule,
  UniqueTypeNamesRule,
  UniqueEnumValueNamesRule,
  UniqueFieldDefinitionNamesRule,
  UniqueDirectiveNamesRule,
  KnownTypeNamesRule,
  KnownDirectivesRule,
  UniqueDirectivesPerLocationRule,
  PossibleTypeExtensionsRule,
  // KnownArgumentNamesOnDirectivesRule,
  UniqueArgumentNamesRule,
  UniqueInputFieldNamesRule,
  UniqueVariableNamesRule,
  FragmentsOnCompositeTypesRule,
  ProvidedRequiredArgumentsRule,
];

/**
 * Validate a GraphQL Document optionally with custom validation rules.
 */
export function validateWithCustomRules(
  schema: GraphQLSchema,
  ast: DocumentNode,
  customRules?: Array<ValidationRule> | null,
  isRelayCompatMode?: boolean,
  isSchemaDocument?: boolean,
): Array<GraphQLError> {
  const rules = specifiedRules.filter(rule => {
      throw new Error("STUB");
  });

  if (customRules) {
    Array.prototype.push.apply(rules, customRules);
  }
  if (isSchemaDocument) {
    Array.prototype.push.apply(rules, specifiedSDLRules);
  }
  const errors = validate(schema, ast, rules);
  return errors.filter(error => {
      throw new Error("STUB");
  });
}
