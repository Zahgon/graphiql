import { buildClientSchema, buildASTSchema } from 'graphql';
import type { SchemaLoader } from './typings';

export const defaultSchemaLoader: SchemaLoader = (schemaConfig, parser) => {
    throw new Error("STUB");
};
