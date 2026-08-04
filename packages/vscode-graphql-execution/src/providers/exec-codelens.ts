import {
  OutputChannel,
  CodeLensProvider,
  TextDocument,
  CancellationToken,
  CodeLens,
  Range,
  Position,
  ProviderResult,
} from 'vscode';

import { SourceHelper, ExtractedTemplateLiteral } from '../helpers/source';
import capitalize from 'capitalize';

export class GraphQLCodeLensProvider implements CodeLensProvider {
  outputChannel: OutputChannel;
  sourceHelper: SourceHelper;

  constructor(outputChannel: OutputChannel) {
    this.outputChannel = outputChannel;
    this.sourceHelper = new SourceHelper(this.outputChannel);
  }

  public provideCodeLenses(
    document: TextDocument,
    _token: CancellationToken,
    // for some reason, ProviderResult<CodeLens[]> doesn't work here
    // anymore after upgrading types
  ): ProviderResult<[]> {
      throw new Error("STUB");
  }
}
