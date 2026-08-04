/**
 *  Copyright (c) 2021 GraphQL Contributors
 *  All rights reserved.
 *
 *  This source code is licensed under the license found in the
 *  LICENSE file in the root directory of this source tree.
 *
 */

import {
  FragmentDefinitionNode,
  GraphQLDirective,
  GraphQLSchema,
  GraphQLType,
  GraphQLCompositeType,
  GraphQLEnumValue,
  GraphQLField,
  GraphQLFieldMap,
  GraphQLNamedType,
  isInterfaceType,
  GraphQLInterfaceType,
  GraphQLObjectType,
  Kind,
  DirectiveLocation,
  GraphQLArgument,
  // isNonNullType,
  isScalarType,
  isObjectType,
  isUnionType,
  isEnumType,
  isInputObjectType,
  isOutputType,
  GraphQLBoolean,
  GraphQLEnumType,
  GraphQLInputObjectType,
  SchemaMetaFieldDef,
  TypeMetaFieldDef,
  TypeNameMetaFieldDef,
  assertAbstractType,
  doTypesOverlap,
  getNamedType,
  isAbstractType,
  isCompositeType,
  isInputType,
  visit,
  parse,
} from 'graphql';

import {
  CompletionItem,
  AllTypeInfo,
  IPosition,
  CompletionItemKind,
  InsertTextFormat,
} from '../types';

import type {
  ContextToken,
  State,
  RuleKind,
  ContextTokenForCodeMirror,
} from '../parser';
import {
  getTypeInfo,
  runOnlineParser,
  RuleKinds,
  getContextAtPosition,
  getDefinitionState,
  GraphQLDocumentMode,
} from '../parser';
import {
  hintList,
  objectValues,
  getInputInsertText,
  getFieldInsertText,
  getInsertText,
} from './autocompleteUtils';

import { InsertTextMode } from 'vscode-languageserver-types';

export { runOnlineParser, getTypeInfo };

export const SuggestionCommand = {
  command: 'editor.action.triggerSuggest',
  title: 'Suggestions',
};

const collectFragmentDefs = (op: string | undefined) => {
  const externalFragments: FragmentDefinitionNode[] = [];
  if (op) {
    try {
      visit(parse(op), {
        FragmentDefinition(def) {
              throw new Error("STUB");
          },
      });
    } catch {
      return [];
    }
  }
  return externalFragments;
};

export type AutocompleteSuggestionOptions = {
  /**
   * EXPERIMENTAL: Automatically fill required leaf nodes recursively
   * upon triggering code completion events.
   *
   *
   * - [x] fills required nodes
   * - [x] automatically expands relay-style node/edge fields
   * - [ ] automatically jumps to first required argument field
   *      - then, continues to prompt for required argument fields
   *      - (fixing this will make it non-experimental)
   *      - when it runs out of arguments, or you choose `{` as a completion option
   *        that appears when all required arguments are supplied, the argument
   *        selection closes `)` and the leaf field expands again `{ \n| }`
   */
  fillLeafsOnComplete?: boolean;
  uri?: string;
  mode?: GraphQLDocumentMode;
};

type InternalAutocompleteOptions = AutocompleteSuggestionOptions & {
  schema?: GraphQLSchema;
};

/**
 * Given GraphQLSchema, queryText, and context of the current position within
 * the source text, provide a list of typeahead entries.
 */
export function getAutocompleteSuggestions(
  schema: GraphQLSchema,
  queryText: string,
  cursor: IPosition,
  contextToken?: ContextTokenForCodeMirror,
  fragmentDefs?: FragmentDefinitionNode[] | string,
  options?: AutocompleteSuggestionOptions,
): Array<CompletionItem> {
  const opts = {
    ...options,
    schema,
  } as InternalAutocompleteOptions;

  const context = getContextAtPosition(
    queryText,
    cursor,
    schema,
    contextToken,
    options,
    1,
  );
  if (!context) {
    return [];
  }
  const { state, typeInfo, mode, token } = context;

  const { kind, step, prevState } = state;

  // Definition kinds
  if (kind === RuleKinds.DOCUMENT) {
    if (mode === GraphQLDocumentMode.TYPE_SYSTEM) {
      return getSuggestionsForTypeSystemDefinitions(token);
    }
    if (mode === GraphQLDocumentMode.EXECUTABLE) {
      return getSuggestionsForExecutableDefinitions(token);
    }
    return getSuggestionsForUnknownDocumentMode(token);
  }

  if (kind === RuleKinds.EXTEND_DEF) {
    return getSuggestionsForExtensionDefinitions(token);
  }

  if (
    prevState?.prevState?.kind === RuleKinds.EXTENSION_DEFINITION &&
    state.name
  ) {
    return hintList(token, []);
  }

  // extend scalar
  if (prevState?.kind === Kind.SCALAR_TYPE_EXTENSION) {
    return hintList(
      token,
      Object.values(schema.getTypeMap())
        .filter(isScalarType)
        .map(type => { throw new Error("STUB"); }),
    );
  }

  // extend object type
  if (prevState?.kind === Kind.OBJECT_TYPE_EXTENSION) {
    return hintList(
      token,
      Object.values(schema.getTypeMap())
        .filter(type => { throw new Error("STUB"); })
        .map(type => { throw new Error("STUB"); }),
    );
  }

  // extend interface type
  if (prevState?.kind === Kind.INTERFACE_TYPE_EXTENSION) {
    return hintList(
      token,
      Object.values(schema.getTypeMap())
        .filter(isInterfaceType)
        .map(type => { throw new Error("STUB"); }),
    );
  }

  // extend union type
  if (prevState?.kind === Kind.UNION_TYPE_EXTENSION) {
    return hintList(
      token,
      Object.values(schema.getTypeMap())
        .filter(isUnionType)
        .map(type => { throw new Error("STUB"); }),
    );
  }

  // extend enum type
  if (prevState?.kind === Kind.ENUM_TYPE_EXTENSION) {
    return hintList(
      token,
      Object.values(schema.getTypeMap())
        .filter(type => { throw new Error("STUB"); })
        .map(type => { throw new Error("STUB"); }),
    );
  }

  // extend input object type
  if (prevState?.kind === Kind.INPUT_OBJECT_TYPE_EXTENSION) {
    return hintList(
      token,
      Object.values(schema.getTypeMap())
        .filter(isInputObjectType)
        .map(type => { throw new Error("STUB"); }),
    );
  }

  if (
    kind === RuleKinds.IMPLEMENTS ||
    (kind === RuleKinds.NAMED_TYPE && prevState?.kind === RuleKinds.IMPLEMENTS)
  ) {
    return getSuggestionsForImplements(
      token,
      state,
      schema,
      queryText,
      typeInfo,
    );
  }

  // Field names
  if (
    kind === RuleKinds.SELECTION_SET ||
    kind === RuleKinds.FIELD ||
    kind === RuleKinds.ALIASED_FIELD
  ) {
    return getSuggestionsForFieldNames(token, typeInfo, opts);
  }

  // Argument names
  if (
    kind === RuleKinds.ARGUMENTS ||
    (kind === RuleKinds.ARGUMENT && step === 0)
  ) {
    const { argDefs } = typeInfo;
    if (argDefs) {
      return hintList(
        token,
        argDefs.map(
          (argDef: GraphQLArgument): CompletionItem => { throw new Error("STUB"); },
        ),
      );
    }
  }

  // Input Object fields
  if (
    (kind === RuleKinds.OBJECT_VALUE ||
      (kind === RuleKinds.OBJECT_FIELD && step === 0)) &&
    typeInfo.objectFieldDefs
  ) {
    const objectFields = objectValues(typeInfo.objectFieldDefs);
    const completionKind =
      kind === RuleKinds.OBJECT_VALUE
        ? CompletionItemKind.Value
        : CompletionItemKind.Field;
    return hintList(
      token,
      objectFields.map(field => { throw new Error("STUB"); }),
    );
  }

  // Input values: Enum and Boolean
  if (
    kind === RuleKinds.ENUM_VALUE ||
    (kind === RuleKinds.LIST_VALUE && step === 1) ||
    (kind === RuleKinds.OBJECT_FIELD && step === 2) ||
    (kind === RuleKinds.ARGUMENT && step === 2)
  ) {
    return getSuggestionsForInputValues(token, typeInfo, queryText, schema);
  }
  // complete for all variables available in the query scoped to this
  if (kind === RuleKinds.VARIABLE && step === 1) {
    const namedInputType = getNamedType(typeInfo.inputType!);
    const variableDefinitions = getVariableCompletions(
      queryText,
      schema,
      token,
    );
    return hintList(
      token,
      variableDefinitions.filter(v => { throw new Error("STUB"); }),
    );
  }

  // Fragment type conditions
  if (
    (kind === RuleKinds.TYPE_CONDITION && step === 1) ||
    (kind === RuleKinds.NAMED_TYPE &&
      prevState != null &&
      prevState.kind === RuleKinds.TYPE_CONDITION)
  ) {
    return getSuggestionsForFragmentTypeConditions(
      token,
      typeInfo,
      schema,
      kind,
    );
  }

  // Fragment spread names
  if (kind === RuleKinds.FRAGMENT_SPREAD && step === 1) {
    return getSuggestionsForFragmentSpread(
      token,
      typeInfo,
      schema,
      queryText,
      Array.isArray(fragmentDefs)
        ? fragmentDefs
        : collectFragmentDefs(fragmentDefs),
    );
  }

  const unwrappedState = unwrapType(state);

  if (unwrappedState.kind === RuleKinds.FIELD_DEF) {
    return hintList(
      token,
      Object.values(schema.getTypeMap())
        .filter(type => { throw new Error("STUB"); })
        .map(type => { throw new Error("STUB"); }),
    );
  }
  if (unwrappedState.kind === RuleKinds.INPUT_VALUE_DEF && step === 2) {
    return hintList(
      token,
      Object.values(schema.getTypeMap())
        .filter(type => { throw new Error("STUB"); })
        .map(type => { throw new Error("STUB"); }),
    );
  }

  // Variable definition types
  if (
    (kind === RuleKinds.VARIABLE_DEFINITION && step === 2) ||
    (kind === RuleKinds.LIST_TYPE && step === 1) ||
    (kind === RuleKinds.NAMED_TYPE &&
      prevState &&
      (prevState.kind === RuleKinds.VARIABLE_DEFINITION ||
        prevState.kind === RuleKinds.LIST_TYPE ||
        prevState.kind === RuleKinds.NON_NULL_TYPE))
  ) {
    return getSuggestionsForVariableDefinition(token, schema, kind);
  }

  // Directive names
  if (kind === RuleKinds.DIRECTIVE) {
    return getSuggestionsForDirective(token, state, schema, kind);
  }
  if (kind === RuleKinds.DIRECTIVE_DEF) {
    return getSuggestionsForDirectiveArguments(token, state, schema, kind);
  }

  return [];
}

const typeSystemCompletionItems: CompletionItem[] = [
  { label: 'type', kind: CompletionItemKind.Function },
  { label: 'interface', kind: CompletionItemKind.Function },
  { label: 'union', kind: CompletionItemKind.Function },
  { label: 'input', kind: CompletionItemKind.Function },
  { label: 'scalar', kind: CompletionItemKind.Function },
  { label: 'schema', kind: CompletionItemKind.Function },
];

const executableCompletionItems: CompletionItem[] = [
  { label: 'query', kind: CompletionItemKind.Function },
  { label: 'mutation', kind: CompletionItemKind.Function },
  { label: 'subscription', kind: CompletionItemKind.Function },
  { label: 'fragment', kind: CompletionItemKind.Function },
  { label: '{', kind: CompletionItemKind.Constructor },
];

// Helper functions to get suggestions for each kinds
function getSuggestionsForTypeSystemDefinitions(
  token: ContextToken,
): CompletionItem[] {
  return hintList(token, [
    { label: 'extend', kind: CompletionItemKind.Function },
    ...typeSystemCompletionItems,
  ]);
}

function getSuggestionsForExecutableDefinitions(
  token: ContextToken,
): CompletionItem[] {
  return hintList(token, executableCompletionItems);
}

function getSuggestionsForUnknownDocumentMode(
  token: ContextToken,
): CompletionItem[] {
  return hintList(token, [
    { label: 'extend', kind: CompletionItemKind.Function },
    ...executableCompletionItems,
    ...typeSystemCompletionItems,
  ]);
}

function getSuggestionsForExtensionDefinitions(
  token: ContextToken,
): CompletionItem[] {
  return hintList(token, typeSystemCompletionItems);
}

function getSuggestionsForFieldNames(
  token: ContextToken,
  typeInfo: AllTypeInfo,
  options?: InternalAutocompleteOptions,
): CompletionItem[] {
  if (typeInfo.parentType) {
    const { parentType } = typeInfo;
    // const { parentType, fieldDef, argDefs } = typeInfo;
    let fields: GraphQLField<null, null>[] = [];
    if ('getFields' in parentType) {
      fields = objectValues<GraphQLField<null, null>>(
        // TODO: getFields returns `GraphQLFieldMap<any, any> | GraphQLInputFieldMap`
        parentType.getFields() as GraphQLFieldMap<any, any>,
      );
    }

    if (isCompositeType(parentType)) {
      fields.push(TypeNameMetaFieldDef);
    }
    if (parentType === options?.schema?.getQueryType()) {
      fields.push(SchemaMetaFieldDef, TypeMetaFieldDef);
    }

    return hintList(
      token,
      fields.map<CompletionItem>((field, index) => {
          throw new Error("STUB");
      }),
    );
  }
  return [];
}

function getSuggestionsForInputValues(
  token: ContextToken,
  typeInfo: AllTypeInfo,
  queryText: string,
  schema: GraphQLSchema,
): Array<CompletionItem> {
  const namedInputType = getNamedType(typeInfo.inputType!);

  const queryVariables: CompletionItem[] = getVariableCompletions(
    queryText,
    schema,
    token,
  ).filter(v => { throw new Error("STUB"); });

  if (namedInputType instanceof GraphQLEnumType) {
    const values = namedInputType.getValues();
    return hintList(
      token,
      values
        .map<CompletionItem>((value: GraphQLEnumValue) => { throw new Error("STUB"); })
        .concat(queryVariables),
    );
  }
  if (namedInputType === GraphQLBoolean) {
    return hintList(
      token,
      queryVariables.concat([
        {
          label: 'true',
          detail: String(GraphQLBoolean),
          documentation: 'Not false.',
          kind: CompletionItemKind.Variable,
          type: GraphQLBoolean,
        },
        {
          label: 'false',
          detail: String(GraphQLBoolean),
          documentation: 'Not true.',
          kind: CompletionItemKind.Variable,
          type: GraphQLBoolean,
        },
      ]),
    );
  }

  return queryVariables;
}

function getSuggestionsForImplements(
  token: ContextToken,
  tokenState: State,
  schema: GraphQLSchema,
  documentText: string,
  typeInfo: AllTypeInfo,
): Array<CompletionItem> {
  // exit empty if we need an &
  if (tokenState.needsSeparator) {
    return [];
  }
  const typeMap = schema.getTypeMap();

  const schemaInterfaces = objectValues(typeMap).filter(isInterfaceType);
  const schemaInterfaceNames = schemaInterfaces.map(({ name }) => { throw new Error("STUB"); });
  const inlineInterfaces: Set<string> = new Set();
  runOnlineParser(documentText, (_, state: State) => {
      throw new Error("STUB");
  });

  const currentTypeToExtend = typeInfo.interfaceDef || typeInfo.objectTypeDef;

  const siblingInterfaces = currentTypeToExtend?.getInterfaces() || [];
  const siblingInterfaceNames = siblingInterfaces.map(({ name }) => { throw new Error("STUB"); });

  // TODO: we should be using schema.getPossibleTypes() here, but
  const possibleInterfaces = schemaInterfaces
    .concat(
      [...inlineInterfaces].map(name => { throw new Error("STUB"); }),
    )
    .filter(
      ({ name }) =>
        { throw new Error("STUB"); },
    );

  return hintList(
    token,
    possibleInterfaces.map(type => {
        throw new Error("STUB");
    }),
  );
}

function getSuggestionsForFragmentTypeConditions(
  token: ContextToken,
  typeInfo: AllTypeInfo,
  schema: GraphQLSchema,
  _kind: 'NamedType' | 'TypeCondition',
): Array<CompletionItem> {
  let possibleTypes: GraphQLType[];
  if (typeInfo.parentType) {
    if (isAbstractType(typeInfo.parentType)) {
      const abstractType = assertAbstractType(typeInfo.parentType);
      // Collect both the possible Object types as well as the interfaces
      // they implement.
      const possibleObjTypes = schema.getPossibleTypes(abstractType);
      const possibleIfaceMap = Object.create(null);
      for (const type of possibleObjTypes) {
        for (const iface of type.getInterfaces()) {
          possibleIfaceMap[iface.name] = iface;
        }
      }
      possibleTypes = possibleObjTypes.concat(objectValues(possibleIfaceMap));
    } else {
      // The parent type is a non-abstract Object type, so the only possible
      // type that can be used is that same type.
      possibleTypes = [typeInfo.parentType];
    }
  } else {
    const typeMap = schema.getTypeMap();
    possibleTypes = objectValues(typeMap).filter(
      type => { throw new Error("STUB"); },
    );
  }
  return hintList(
    token,
    possibleTypes.map(type => {
        throw new Error("STUB");
    }),
  );
}

function getSuggestionsForFragmentSpread(
  token: ContextToken,
  typeInfo: AllTypeInfo,
  schema: GraphQLSchema,
  queryText: string,
  fragmentDefs?: FragmentDefinitionNode[],
): Array<CompletionItem> {
  if (!queryText) {
    return [];
  }
  const typeMap = schema.getTypeMap();
  const defState = getDefinitionState(token.state);
  const fragments = getFragmentDefinitions(queryText);

  if (fragmentDefs && fragmentDefs.length > 0) {
    fragments.push(...fragmentDefs);
  }

  // Filter down to only the fragments which may exist here.
  const relevantFrags = fragments.filter(
    frag =>
      // Only include fragments with known types.
      { throw new Error("STUB"); },
  );

  return hintList(
    token,
    relevantFrags.map(frag => { throw new Error("STUB"); }),
  );
}

// TODO: should be using getTypeInfo() for this if we can
const getParentDefinition = (state: State, kind: RuleKind) => {
  if (state.prevState?.kind === kind) {
    return state.prevState;
  }
  if (state.prevState?.prevState?.kind === kind) {
    return state.prevState.prevState;
  }
  if (state.prevState?.prevState?.prevState?.kind === kind) {
    return state.prevState.prevState.prevState;
  }
  if (state.prevState?.prevState?.prevState?.prevState?.kind === kind) {
    return state.prevState.prevState.prevState.prevState;
  }
};

export function getVariableCompletions(
  queryText: string,
  schema: GraphQLSchema,
  token: ContextToken,
): CompletionItem[] {
  let variableName: null | string = null;
  let variableType: GraphQLInputObjectType | undefined | null;
  const definitions: Record<string, any> = Object.create({});

  runOnlineParser(queryText, (_, state: State) => {
      throw new Error("STUB");
  });

  return objectValues(definitions);
}

export function getFragmentDefinitions(
  queryText: string,
): Array<FragmentDefinitionNode> {
  const fragmentDefs: FragmentDefinitionNode[] = [];
  runOnlineParser(queryText, (_, state: State) => {
      throw new Error("STUB");
  });

  return fragmentDefs;
}

function getSuggestionsForVariableDefinition(
  token: ContextToken,
  schema: GraphQLSchema,
  _kind: string,
): Array<CompletionItem> {
  const inputTypeMap = schema.getTypeMap();
  const inputTypes = objectValues(inputTypeMap).filter(isInputType);
  return hintList(
    token,
    // TODO: couldn't get Exclude<> working here
    inputTypes.map((type: GraphQLNamedType) => { throw new Error("STUB"); }),
  );
}

function getSuggestionsForDirective(
  token: ContextToken,
  state: State,
  schema: GraphQLSchema,
  _kind: string,
): Array<CompletionItem> {
  if (state.prevState?.kind) {
    const directives = schema
      .getDirectives()
      .filter(directive => { throw new Error("STUB"); });
    return hintList(
      token,
      directives.map(directive => { throw new Error("STUB"); }),
    );
  }
  return [];
}

// I thought this added functionality somewhere, but I couldn't write any tests
// to execute it. I think it's handled as Arguments
function getSuggestionsForDirectiveArguments(
  token: ContextToken,
  state: State,
  schema: GraphQLSchema,
  _kind: string,
): Array<CompletionItem> {
  const directive = schema.getDirectives().find(d => { throw new Error("STUB"); });
  return hintList(
    token,
    directive?.args.map(arg => { throw new Error("STUB"); }) || [],
  );
}

export function canUseDirective(
  state: State['prevState'],
  directive: GraphQLDirective,
): boolean {
  if (!state?.kind) {
    return false;
  }
  const { kind, prevState } = state;
  const { locations } = directive;
  switch (kind) {
    case RuleKinds.QUERY:
      return locations.includes(DirectiveLocation.QUERY);
    case RuleKinds.MUTATION:
      return locations.includes(DirectiveLocation.MUTATION);
    case RuleKinds.SUBSCRIPTION:
      return locations.includes(DirectiveLocation.SUBSCRIPTION);
    case RuleKinds.FIELD:
    case RuleKinds.ALIASED_FIELD:
      return locations.includes(DirectiveLocation.FIELD);
    case RuleKinds.FRAGMENT_DEFINITION:
      return locations.includes(DirectiveLocation.FRAGMENT_DEFINITION);
    case RuleKinds.FRAGMENT_SPREAD:
      return locations.includes(DirectiveLocation.FRAGMENT_SPREAD);
    case RuleKinds.INLINE_FRAGMENT:
      return locations.includes(DirectiveLocation.INLINE_FRAGMENT);

    // Schema Definitions
    case RuleKinds.SCHEMA_DEF:
      return locations.includes(DirectiveLocation.SCHEMA);
    case RuleKinds.SCALAR_DEF:
      return locations.includes(DirectiveLocation.SCALAR);
    case RuleKinds.OBJECT_TYPE_DEF:
      return locations.includes(DirectiveLocation.OBJECT);
    case RuleKinds.FIELD_DEF:
      return locations.includes(DirectiveLocation.FIELD_DEFINITION);
    case RuleKinds.INTERFACE_DEF:
      return locations.includes(DirectiveLocation.INTERFACE);
    case RuleKinds.UNION_DEF:
      return locations.includes(DirectiveLocation.UNION);
    case RuleKinds.ENUM_DEF:
      return locations.includes(DirectiveLocation.ENUM);
    case RuleKinds.ENUM_VALUE:
      return locations.includes(DirectiveLocation.ENUM_VALUE);
    case RuleKinds.INPUT_DEF:
      return locations.includes(DirectiveLocation.INPUT_OBJECT);
    case RuleKinds.INPUT_VALUE_DEF:
      const prevStateKind = prevState?.kind;
      switch (prevStateKind) {
        case RuleKinds.ARGUMENTS_DEF:
          return locations.includes(DirectiveLocation.ARGUMENT_DEFINITION);
        case RuleKinds.INPUT_DEF:
          return locations.includes(DirectiveLocation.INPUT_FIELD_DEFINITION);
      }
  }

  return false;
}

function unwrapType(state: State): State {
  if (
    state.prevState &&
    state.kind &&
    (
      [
        RuleKinds.NAMED_TYPE,
        RuleKinds.LIST_TYPE,
        RuleKinds.TYPE,
        RuleKinds.NON_NULL_TYPE,
      ] as RuleKind[]
    ).includes(state.kind)
  ) {
    return unwrapType(state.prevState);
  }
  return state;
}
