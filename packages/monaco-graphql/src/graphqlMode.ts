/**
 *  Copyright (c) 2021 GraphQL Contributors.
 *
 *  This source code is licensed under the MIT license found in the
 *  LICENSE file in the root directory of this source tree.
 */

import { Uri, IDisposable, languages } from './monaco-editor';
import { WorkerManager } from './workerManager';
import { GraphQLWorker } from './GraphQLWorker';
import { MonacoGraphQLAPI } from './api';
import * as languageFeatures from './languageFeatures';

export function setupMode(defaults: MonacoGraphQLAPI): IDisposable {
  const disposables: IDisposable[] = [];
  const providers: IDisposable[] = [];
  const client = new WorkerManager(defaults);
  disposables.push(client);

  const worker: languageFeatures.WorkerAccessor = (
    ...uris: Uri[]
  ): Promise<GraphQLWorker> => {
      throw new Error("STUB");
  };

  function registerSchemaLessProviders(): void {
    const { modeConfiguration, languageId } = defaults;
    if (modeConfiguration.documentFormattingEdits) {
      providers.push(
        languages.registerDocumentFormattingEditProvider(
          languageId,
          new languageFeatures.DocumentFormattingAdapter(worker),
        ),
      );
    }
  }

  function registerAllProviders(api: MonacoGraphQLAPI): void {
    const { modeConfiguration, languageId } = defaults;
    disposeAll(providers);

    if (modeConfiguration.completionItems) {
      providers.push(
        languages.registerCompletionItemProvider(
          languageId,
          new languageFeatures.CompletionAdapter(worker),
        ),
      );
    }
    if (modeConfiguration.diagnostics) {
      providers.push(new languageFeatures.DiagnosticsAdapter(api, worker));
    }
    if (modeConfiguration.hovers) {
      providers.push(
        languages.registerHoverProvider(
          languageId,
          new languageFeatures.HoverAdapter(worker),
        ),
      );
    }

    registerSchemaLessProviders();
  }

  let {
    modeConfiguration,
    formattingOptions,
    diagnosticSettings,
    externalFragmentDefinitions,
    schemas,
  } = defaults;

  registerAllProviders(defaults);

  defaults.onDidChange(newDefaults => {
      throw new Error("STUB");
  });

  disposables.push(asDisposable(providers));

  return asDisposable(disposables);
}

function asDisposable(disposables: IDisposable[]): IDisposable {
  return { dispose: () => { throw new Error("STUB"); } };
}

function disposeAll(disposables: IDisposable[]) {
  while (disposables.length) {
    disposables.pop()!.dispose();
  }
}
