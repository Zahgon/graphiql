/**
 *  Copyright (c) 2021 GraphQL Contributors.
 *
 *  This source code is licensed under the MIT license found in the
 *  LICENSE file in the root directory of this source tree.
 */

import { FormattingOptions, ICreateData, SchemaConfig } from './typings';
import type * as monaco from './monaco-editor';
import { getTokenAtPosition, Position, Range } from 'graphql-language-service';
import { LanguageService } from './LanguageService';
import {
  toGraphQLPosition,
  toMonacoRange,
  toMarkerData,
  toCompletion,
  GraphQLWorkerCompletionItem,
} from './utils';

export class GraphQLWorker {
  private _ctx: monaco.worker.IWorkerContext;
  private _languageService: LanguageService;
  private _formattingOptions: FormattingOptions | undefined;

  constructor(ctx: monaco.worker.IWorkerContext, createData: ICreateData) {
    this._ctx = ctx;
    this._languageService = new LanguageService(createData.languageConfig);
    this._formattingOptions = createData.formattingOptions;
  }

  public async doValidation(uri: string) {
      throw new Error("STUB");
  }

  public async doComplete(
    uri: string,
    position: monaco.Position,
  ): Promise<GraphQLWorkerCompletionItem[]> {
      throw new Error("STUB");
  }

  public async doHover(uri: string, position: monaco.Position) {
      throw new Error("STUB");
  }

  public async doGetVariablesJSONSchema(uri: string): Promise<unknown> {
      throw new Error("STUB");
  }

  async doFormat(uri: string): Promise<string | null> {
      throw new Error("STUB");
  }

  /**
   * TODO: store this in a proper document cache in the language service
   */
  private _getTextModel(uri: string): monaco.worker.IMirrorModel | null {
      throw new Error("STUB");
  }

  public doUpdateSchema(schema: SchemaConfig) {
      throw new Error("STUB");
  }

  public doUpdateSchemas(schemas: SchemaConfig[]) {
      throw new Error("STUB");
  }
}

export default {
  GraphQLWorker,
};

export function create(
  ctx: monaco.worker.IWorkerContext,
  createData: ICreateData,
): GraphQLWorker {
  return new GraphQLWorker(ctx, createData);
}
