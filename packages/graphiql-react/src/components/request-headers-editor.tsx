import { FC, useEffect, useRef } from 'react';
import { useGraphiQL, useGraphiQLActions } from './provider';
import type { EditorProps } from '../types';
import { URI_NAME, KEY_BINDINGS, STORAGE_KEY } from '../constants';
import {
  getOrCreateModel,
  createEditor,
  onEditorContainerKeyDown,
} from '../utility/create-editor';
import { useChangeHandler, pick, cleanupDisposables, cn } from '../utility';
import { useMonaco } from '../stores';

interface RequestHeadersEditorProps extends EditorProps {
  /**
   * Invoked when the contents of the request headers editor change.
   * @param value - The new contents of the editor.
   */
  onEdit?(value: string): void;
}

export const RequestHeadersEditor: FC<RequestHeadersEditorProps> = ({
  onEdit,
  ...props
}) => {
    throw new Error("STUB");
};
