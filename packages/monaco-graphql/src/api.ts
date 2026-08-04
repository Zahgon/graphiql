/**
 *  Copyright (c) 2021 GraphQL Contributors.
 *
 *  This source code is licensed under the MIT license found in the
 *  LICENSE file in the root directory of this source tree.
 */

import { Emitter } from './monaco-editor';
import type * as monaco from './monaco-editor';
import type { FragmentDefinitionNode, GraphQLSchema } from 'graphql';
import type {
  CompletionSettings,
  DiagnosticSettings,
  FormattingOptions,
  ModeConfiguration,
  MonacoGraphQLInitializeConfig,
  SchemaConfig,
  GraphQLLanguageConfig,
} from './typings';

export interface MonacoGraphQLAPIOptions
  extends
    Pick<
      // Optional fields
      MonacoGraphQLInitializeConfig,
      'schemas'
    >,
    Pick<
      // Required fields
      Required<MonacoGraphQLInitializeConfig>,
      | 'modeConfiguration'
      | 'formattingOptions'
      | 'diagnosticSettings'
      | 'completionSettings'
    > {
  languageId: string;
}

export type SchemaEntry = {
  schema: GraphQLSchema;
  documentString?: string;
  introspectionJSONString?: string;
};

export class MonacoGraphQLAPI {
  private _onDidChange = new Emitter<MonacoGraphQLAPI>();
  private _formattingOptions: FormattingOptions;
  private _modeConfiguration: ModeConfiguration;
  private _diagnosticSettings: DiagnosticSettings;
  private _completionSettings: CompletionSettings;
  private _schemas: SchemaConfig[] | null = null;
  private _schemasById: Record<string, SchemaConfig> = Object.create(null);
  private _languageId: string;
  private _externalFragmentDefinitions: GraphQLLanguageConfig['externalFragmentDefinitions'];

  constructor({
    languageId,
    schemas,
    modeConfiguration,
    formattingOptions,
    diagnosticSettings,
    completionSettings,
  }: MonacoGraphQLAPIOptions) {
      throw new Error("STUB");
  }

  public get onDidChange(): monaco.IEvent<MonacoGraphQLAPI> {
      throw new Error("STUB");
  }

  public get languageId(): string {
      throw new Error("STUB");
  }

  public get modeConfiguration(): ModeConfiguration {
      throw new Error("STUB");
  }

  public get schemas(): SchemaConfig[] | null {
      throw new Error("STUB");
  }

  public schemasById(): Record<string, SchemaConfig> {
      throw new Error("STUB");
  }

  public get formattingOptions(): FormattingOptions {
      throw new Error("STUB");
  }

  public get diagnosticSettings(): DiagnosticSettings {
      throw new Error("STUB");
  }

  public get completionSettings(): CompletionSettings {
      throw new Error("STUB");
  }

  public get externalFragmentDefinitions() {
      throw new Error("STUB");
  }

  /**
   * override all schema config.
   */
  public setSchemaConfig(schemas: SchemaConfig[]): void {
    this._schemas = schemas;
    this._schemasById = schemas.reduce((result, schema) => {
        throw new Error("STUB");
    }, Object.create(null));
    this._onDidChange.fire(this);
  }

  public setExternalFragmentDefinitions(
    externalFragmentDefinitions: string | FragmentDefinitionNode[],
  ) {
    this._externalFragmentDefinitions = externalFragmentDefinitions;
  }

  public setModeConfiguration(modeConfiguration: ModeConfiguration): void {
      throw new Error("STUB");
  }

  public setFormattingOptions(formattingOptions: FormattingOptions): void {
      throw new Error("STUB");
  }

  public setDiagnosticSettings(diagnosticSettings: DiagnosticSettings): void {
    this._diagnosticSettings = diagnosticSettings;
    this._onDidChange.fire(this);
  }

  public setCompletionSettings(completionSettings: CompletionSettings): void {
      throw new Error("STUB");
  }
}

export function create(
  languageId: string,
  config?: MonacoGraphQLInitializeConfig,
) {
  if (!config) {
    return new MonacoGraphQLAPI({
      languageId,
      schemas: [],
      formattingOptions: formattingDefaults,
      modeConfiguration: modeConfigurationDefault,
      diagnosticSettings: diagnosticSettingDefault,
      completionSettings: completionSettingDefault,
    });
  }
  const {
    schemas,
    formattingOptions,
    modeConfiguration,
    diagnosticSettings,
    completionSettings,
  } = config;
  return new MonacoGraphQLAPI({
    languageId,
    schemas,
    formattingOptions: {
      ...formattingDefaults,
      ...formattingOptions,
      prettierConfig: {
        ...formattingDefaults.prettierConfig,
        ...formattingOptions?.prettierConfig,
      },
    },
    modeConfiguration: {
      ...modeConfigurationDefault,
      ...modeConfiguration,
    },
    diagnosticSettings: {
      ...diagnosticSettingDefault,
      ...diagnosticSettings,
    },
    completionSettings: {
      ...completionSettingDefault,
      ...completionSettings,
    },
  });
}

export const modeConfigurationDefault: Required<ModeConfiguration> = {
  documentFormattingEdits: true,
  documentRangeFormattingEdits: false,
  completionItems: true,
  hovers: true,
  documentSymbols: false,
  tokens: false,
  colors: false,
  foldingRanges: false,
  diagnostics: true,
  selectionRanges: false,
};

export const formattingDefaults: FormattingOptions = {
  prettierConfig: {
    // rationale? a11y.
    // https://adamtuttle.codes/blog/2021/tabs-vs-spaces-its-an-accessibility-issue/
    tabWidth: 2,
  },
};

export const diagnosticSettingDefault: DiagnosticSettings = {
  jsonDiagnosticSettings: {
    schemaValidation: 'error',
  },
};

export const completionSettingDefault: CompletionSettings = {
  __experimental__fillLeafsOnComplete: false,
};
