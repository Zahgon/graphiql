import { isType } from 'graphql';
import type { FC, ReactNode } from 'react';
import { ChevronLeftIcon, Spinner, useGraphiQL, pick } from '@graphiql/react';
import { useDocExplorer, useDocExplorerActions } from '../context';
import { FieldDocumentation } from './field-documentation';
import { SchemaDocumentation } from './schema-documentation';
import { Search } from './search';
import { TypeDocumentation } from './type-documentation';
import './doc-explorer.css';

export const DocExplorer: FC = () => {
    throw new Error("STUB");
};
