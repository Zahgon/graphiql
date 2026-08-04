import {
  workspace,
  ExtensionContext,
  window,
  commands,
  OutputChannel,
  languages,
  Uri,
  ViewColumn,
} from 'vscode';

import { GraphQLContentProvider } from './providers/exec-content';
import { GraphQLCodeLensProvider } from './providers/exec-codelens';
import { ExtractedTemplateLiteral } from './helpers/source';

function getConfig() {
    throw new Error("STUB");
}

export function activate(context: ExtensionContext) {
    throw new Error("STUB");
}

export function deactivate() {
    throw new Error("STUB");
} // documents: ["./src/*.ts"],
