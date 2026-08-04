/**
 *  Copyright (c) 2021 GraphQL Contributors.
 *
 *  This source code is licensed under the MIT license found in the
 *  LICENSE file in the root directory of this source tree.
 */

import { GraphQLWorker } from './GraphQLWorker';
import type { MonacoGraphQLAPI } from './api';
import type * as monaco from './monaco-editor';
import { Uri, languages } from './monaco-editor';
import { editor } from 'monaco-editor/esm/vs/editor/editor.api';
import { CompletionItemKind as lsCompletionItemKind } from 'graphql-language-service';
import { getModelLanguageId, GraphQLWorkerCompletionItem } from './utils';

export interface WorkerAccessor {
  (...more: Uri[]): monaco.Thenable<GraphQLWorker>;
}

// --- completion ------

export class DiagnosticsAdapter {
  private _disposables: monaco.IDisposable[] = [];
  private _listener: { [uri: string]: monaco.IDisposable } =
    Object.create(null);

  constructor(
    private defaults: MonacoGraphQLAPI,
    private _worker: WorkerAccessor,
  ) {
      throw new Error("STUB");
  }

  public dispose(): void {
    for (const disposable of this._disposables) {
      disposable.dispose();
    }
    this._disposables = [];
  }

  private async _doValidate(
    resource: Uri,
    languageId: string,
    variablesUris?: string[],
  ) {
      throw new Error("STUB");
  }
}

const mKind = languages.CompletionItemKind;

const kindMap: Record<lsCompletionItemKind, languages.CompletionItemKind> = {
  [lsCompletionItemKind.Text]: mKind.Text,
  [lsCompletionItemKind.Method]: mKind.Method,
  [lsCompletionItemKind.Function]: mKind.Function,
  [lsCompletionItemKind.Constructor]: mKind.Constructor,
  [lsCompletionItemKind.Field]: mKind.Field,
  [lsCompletionItemKind.Variable]: mKind.Variable,
  [lsCompletionItemKind.Class]: mKind.Class,
  [lsCompletionItemKind.Interface]: mKind.Interface,
  [lsCompletionItemKind.Module]: mKind.Module,
  [lsCompletionItemKind.Property]: mKind.Property,
  [lsCompletionItemKind.Unit]: mKind.Unit,
  [lsCompletionItemKind.Value]: mKind.Value,
  [lsCompletionItemKind.Enum]: mKind.Enum,
  [lsCompletionItemKind.Keyword]: mKind.Keyword,
  [lsCompletionItemKind.Snippet]: mKind.Snippet,
  [lsCompletionItemKind.Color]: mKind.Color,
  [lsCompletionItemKind.File]: mKind.File,
  [lsCompletionItemKind.Reference]: mKind.Reference,
  [lsCompletionItemKind.Folder]: mKind.Folder,
  [lsCompletionItemKind.EnumMember]: mKind.EnumMember,
  [lsCompletionItemKind.Constant]: mKind.Constant,
  [lsCompletionItemKind.Struct]: mKind.Struct,
  [lsCompletionItemKind.Event]: mKind.Event,
  [lsCompletionItemKind.Operator]: mKind.Operator,
  [lsCompletionItemKind.TypeParameter]: mKind.TypeParameter,
};

export function toCompletionItemKind(
  kind: lsCompletionItemKind,
): languages.CompletionItemKind {
    throw new Error("STUB");
}

export function toCompletion(
  entry: GraphQLWorkerCompletionItem,
): languages.CompletionItem {
    throw new Error("STUB");
}

export class CompletionAdapter implements languages.CompletionItemProvider {
  constructor(private _worker: WorkerAccessor) {
    this._worker = _worker;
  }

  public get triggerCharacters(): string[] {
      throw new Error("STUB");
  }

  async provideCompletionItems(
    model: editor.IReadOnlyModel,
    position: monaco.Position,
    _context: languages.CompletionContext,
    _token: monaco.CancellationToken,
  ): Promise<languages.CompletionList> {
      throw new Error("STUB");
  }
}

export class DocumentFormattingAdapter
  implements languages.DocumentFormattingEditProvider
{
  constructor(private _worker: WorkerAccessor) {
    this._worker = _worker;
  }

  async provideDocumentFormattingEdits(
    document: editor.ITextModel,
    _options: languages.FormattingOptions,
    _token: monaco.CancellationToken,
  ) {
      throw new Error("STUB");
  }
}

export class HoverAdapter implements languages.HoverProvider {
  constructor(private _worker: WorkerAccessor) {}

  async provideHover(
    model: editor.IReadOnlyModel,
    position: monaco.Position,
    _token: monaco.CancellationToken,
  ): Promise<languages.Hover> {
      throw new Error("STUB");
  }

  dispose() {}
}
