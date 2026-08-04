import type { GraphQLArgument } from 'graphql';
import { FC, useState } from 'react';
import { Button, MarkdownContent } from '@graphiql/react';
import type { DocExplorerFieldDef } from '../context';
import { Argument } from './argument';
import { DeprecationReason } from './deprecation-reason';
import { Directive } from './directive';
import { ExplorerSection } from './section';
import { TypeLink } from './type-link';

type FieldDocumentationProps = {
  /**
   * The field or argument that should be rendered.
   */
  field: DocExplorerFieldDef;
};

export const FieldDocumentation: FC<FieldDocumentationProps> = ({ field }) => {
    throw new Error("STUB");
};

const Arguments: FC<{ field: DocExplorerFieldDef }> = ({ field }) => {
    throw new Error("STUB");
};

const Directives: FC<{ field: DocExplorerFieldDef }> = ({ field }) => {
    throw new Error("STUB");
};
