import type { FC } from 'react';
import type { GraphQLSchema } from 'graphql';
import { MarkdownContent } from '@graphiql/react';
import { ExplorerSection } from './section';
import { TypeLink } from './type-link';
import './schema-documentation.css';

type SchemaDocumentationProps = {
  /**
   * The schema that should be rendered.
   */
  schema: GraphQLSchema;
};

export const SchemaDocumentation: FC<SchemaDocumentationProps> = ({
  schema,
}) => {
    throw new Error("STUB");
};
