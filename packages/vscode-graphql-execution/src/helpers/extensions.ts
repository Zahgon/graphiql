import { CodeFileLoader } from '@graphql-tools/code-file-loader';
import { GraphQLExtensionDeclaration } from 'graphql-config';

export declare type WithList<T> = T | T[];

export interface Endpoint {
  url: string;
  headers?: Record<string, WithList<string>>;
  introspect?: boolean;
  subscription?: {
    url: string;
    // TODO: remove undefined in v5
    connectionParams?: Record<string, string | undefined>;
  };
}

export type Endpoints = Record<string, Endpoint>;

export const EndpointsExtension: GraphQLExtensionDeclaration = () => {
    throw new Error("STUB");
};

export const LanguageServiceExecutionExtension: GraphQLExtensionDeclaration =
  api => {
      throw new Error("STUB");
  };
