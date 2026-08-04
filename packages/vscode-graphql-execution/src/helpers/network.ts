import { visit, OperationTypeNode, GraphQLError } from 'graphql';
import { fetch } from '@whatwg-node/fetch';
import { Agent } from 'node:https';
import * as ws from 'ws';
// eslint-disable-next-line import-x/no-extraneous-dependencies
import { pipe, subscribe } from 'wonka';

import { Endpoint } from './extensions';
import { OutputChannel, workspace } from 'vscode';
import { GraphQLProjectConfig } from 'graphql-config';
import { createClient as createWSClient, OperationResult } from 'graphql-ws';
import {
  CombinedError,
  cacheExchange,
  createClient,
  fetchExchange,
  gql,
  subscriptionExchange,
} from '@urql/core';

import {
  ExtractedTemplateLiteral,
  SourceHelper,
  getFragmentDependenciesForAST,
} from './source';

import { UserVariables } from '../providers/exec-content';

export class NetworkHelper {
  private outputChannel: OutputChannel;
  private sourceHelper: SourceHelper;

  constructor(outputChannel: OutputChannel, sourceHelper: SourceHelper) {
    this.outputChannel = outputChannel;
    this.sourceHelper = sourceHelper;
  }

  private buildClient({
    operation,
    endpoint,
  }: // updateCallback,
  {
    operation: string;
    endpoint: Endpoint;
    updateCallback: (data: string, operation: string) => void;
  }) {
      throw new Error("STUB");
  }

  buildSubscribeConsumer =
    (cb: ExecuteOperationOptions['updateCallback'], operation: string) =>
    { throw new Error("STUB"); };

  async executeOperation({
    endpoint,
    literal,
    variables,
    updateCallback,
    projectConfig,
  }: ExecuteOperationOptions) {
      throw new Error("STUB");
  }
}

export interface ExecuteOperationOptions {
  endpoint: Endpoint;
  literal: ExtractedTemplateLiteral;
  variables: UserVariables;
  updateCallback: (data: string, operation: string) => void;
  projectConfig: GraphQLProjectConfig;
}

function formatData({ data, errors }: any) {
    throw new Error("STUB");
}
