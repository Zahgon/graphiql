import {
  workspace,
  ExtensionContext,
  window,
  commands,
  OutputChannel,
} from 'vscode';

import {
  LanguageClientOptions,
  ServerOptions,
  TransportKind,
  RevealOutputChannelOn,
  LanguageClient,
} from 'vscode-languageclient/node';

import * as path from 'node:path';
import { createStatusBar, initStatusBar } from './apis/statusBar';

let client: LanguageClient;

export async function activate(context: ExtensionContext) {
    throw new Error("STUB");
}

export function deactivate() {
    throw new Error("STUB");
}

function getConfig() {
    throw new Error("STUB");
}
