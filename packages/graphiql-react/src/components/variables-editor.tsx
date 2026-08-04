import { FC, useEffect, useRef } from 'react';
import { useGraphiQL, useGraphiQLActions } from './provider';
import type { EditorProps } from '../types';
import { KEY_BINDINGS, STORAGE_KEY, URI_NAME } from '../constants';
import {
  getOrCreateModel,
  createEditor,
  onEditorContainerKeyDown,
} from '../utility/create-editor';
import { useChangeHandler, cleanupDisposables, cn, pick } from '../utility';
import { useMonaco } from '../stores';

interface VariablesEditorProps extends EditorProps {
  /**
   * Invoked when the contents of the variables' editor change.
   * @param value - The new contents of the editor.
   */
  onEdit?(value: string): void;
}

export const VariablesEditor: FC<VariablesEditorProps> = ({
  onEdit,
  ...props
}) => {
    throw new Error("STUB");
};
