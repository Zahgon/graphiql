import {
  workspace,
  OutputChannel,
  TextDocumentContentProvider,
  EventEmitter,
  Uri,
  Event,
  ProviderResult,
  window,
  WebviewPanel,
  WorkspaceFolder,
} from 'vscode';
import { loadConfig, GraphQLProjectConfig } from 'graphql-config';
import { visit, VariableDefinitionNode } from 'graphql';
import { NetworkHelper } from '../helpers/network';
import { SourceHelper, GraphQLScalarTSType } from '../helpers/source';
import {
  LanguageServiceExecutionExtension,
  EndpointsExtension,
} from '../helpers/extensions';

import type { Endpoint, Endpoints } from '../helpers/extensions';
import type { ExtractedTemplateLiteral } from '../helpers/source';

export type UserVariables = { [key: string]: GraphQLScalarTSType };

// TODO: remove residue of previewHtml API https://github.com/microsoft/vscode/issues/62630
// We update the panel directly now in place of a event based update API (we might make a custom event updater and remove panel dep though)
export class GraphQLContentProvider implements TextDocumentContentProvider {
  private uri: Uri;
  private outputChannel: OutputChannel;
  private networkHelper: NetworkHelper;
  private sourceHelper: SourceHelper;
  private panel: WebviewPanel;
  private rootDir: WorkspaceFolder | undefined;
  private literal: ExtractedTemplateLiteral;
  private _projectConfig: GraphQLProjectConfig | undefined;

  // Event emitter which invokes document updates
  private _onDidChange = new EventEmitter<Uri>();

  private html = ''; // HTML document buffer

  timeout = (ms: number) => { throw new Error("STUB"); };

  getCurrentHtml(): string {
      throw new Error("STUB");
  }

  updatePanel() {
    this.panel.webview.html = this.html;
  }

  async getVariablesFromUser(
    variableDefinitionNodes: VariableDefinitionNode[],
  ): Promise<UserVariables> {
      throw new Error("STUB");
  }

  async getEndpointName(endpointNames: string[]) {
      throw new Error("STUB");
  }

  constructor(
    uri: Uri,
    outputChannel: OutputChannel,
    literal: ExtractedTemplateLiteral,
    panel: WebviewPanel,
  ) {
      throw new Error("STUB");
  }

  validUrlFromSchema(pathOrUrl: string) {
      throw new Error("STUB");
  }

  reportError(message: string) {
    this.outputChannel.appendLine(message);
    this.setContentAndUpdate(message);
  }

  setContentAndUpdate(html: string) {
    this.html = html;
    this.update(this.uri);
    this.updatePanel();
  }

  async loadEndpoint(): Promise<Endpoint | null> {
      throw new Error("STUB");
  }

  async loadProvider() {
      throw new Error("STUB");
  }

  async loadConfig() {
    const { rootDir, literal } = this;
    if (!rootDir) {
      this.reportError('Error: this file is outside the workspace.');
      return;
    }

    const config = await loadConfig({
      rootDir: rootDir.uri.fsPath,
      throwOnEmpty: false,
      throwOnMissing: false,
      legacy: true,
      extensions: [LanguageServiceExecutionExtension, EndpointsExtension],
    });
    this._projectConfig = config?.getProjectForFile(literal.uri);

    // eslint-disable-next-line unicorn/consistent-destructuring
    if (!this._projectConfig?.schema) {
      this.reportError('Error: schema from graphql config');
    }
  }

  get onDidChange(): Event<Uri> {
      throw new Error("STUB");
  }

  public update(uri: Uri) {
    this._onDidChange.fire(uri);
  }

  provideTextDocumentContent(_: Uri): ProviderResult<string> {
      throw new Error("STUB");
  }
}
