import { getSelectedOperationName } from '@graphiql/toolkit';
import type { DocumentNode } from 'graphql';
import {
  getOperationFacts,
  getContextAtPosition,
} from 'graphql-language-service';
import { FC, useEffect, useRef } from 'react';
import { useMonaco } from '../stores';
import { useGraphiQL, useGraphiQLActions } from './provider';
import {
  getOrCreateModel,
  createEditor,
  onEditorContainerKeyDown,
} from '../utility/create-editor';
import { debounce, pick, cleanupDisposables, cn, Uri, Range } from '../utility';
import type { MonacoEditor, EditorProps, SchemaReference } from '../types';
import {
  KEY_BINDINGS,
  URI_NAME,
  STORAGE_KEY,
  MONACO_GRAPHQL_DIAGNOSTIC_SETTINGS,
} from '../constants';
import type * as monaco from 'monaco-editor';
import { toGraphQLPosition } from 'monaco-graphql/esm/utils.js';

interface OperationEditorProps extends EditorProps {
  /**
   * Invoked when a reference to the GraphQL schema (type or field) is clicked
   * as part of the editor or one of its tooltips.
   * @param reference - The reference that has been clicked.
   */
  onClickReference?(reference: SchemaReference): void;

  /**
   * Invoked when the contents of the operation editor change.
   * @param value - The new contents of the editor.
   * @param documentAST - The editor contents parsed into a GraphQL document.
   */
  onEdit?(value: string, documentAST?: DocumentNode): void;
}

export const OperationEditor: FC<OperationEditorProps> = ({
  onClickReference,
  onEdit,
  ...props
}) => {
    throw new Error("STUB");
};
