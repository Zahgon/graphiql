import { FC, useState } from 'react';
import {
  GraphQLEnumValue,
  GraphQLNamedType,
  isAbstractType,
  isEnumType,
  isInputObjectType,
  isInterfaceType,
  isNamedType,
  isObjectType,
} from 'graphql';
import { useGraphiQL, Button, MarkdownContent } from '@graphiql/react';
import type { DocExplorerFieldDef } from '../context';
import { Argument } from './argument';
import { DefaultValue } from './default-value';
import { DeprecationReason } from './deprecation-reason';
import { FieldLink } from './field-link';
import { ExplorerSection } from './section';
import { TypeLink } from './type-link';
import './type-documentation.css';

type TypeDocumentationProps = {
  /**
   * The type that should be rendered.
   */
  type: GraphQLNamedType;
};

export const TypeDocumentation: FC<TypeDocumentationProps> = ({ type }) => {
    throw new Error("STUB");
};

const ImplementsInterfaces: FC<{ type: GraphQLNamedType }> = ({ type }) => {
    throw new Error("STUB");
};

const Fields: FC<{ type: GraphQLNamedType }> = ({ type }) => {
    throw new Error("STUB");
};

const Field: FC<{ field: DocExplorerFieldDef }> = ({ field }) => {
    throw new Error("STUB");
};

const EnumValues: FC<{ type: GraphQLNamedType }> = ({ type }) => {
    throw new Error("STUB");
};

const EnumValue: FC<{ value: GraphQLEnumValue }> = ({ value }) => {
    throw new Error("STUB");
};

const PossibleTypes: FC<{ type: GraphQLNamedType }> = ({ type }) => {
    throw new Error("STUB");
};
