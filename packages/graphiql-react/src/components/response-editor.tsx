import { formatError } from '@graphiql/toolkit';
import { ComponentType, FC, useEffect, useRef } from 'react';
import { createRoot, Root } from 'react-dom/client';
import { useGraphiQL, useGraphiQLActions } from './provider';
import { ImagePreview } from './image-preview';
import {
  getOrCreateModel,
  createEditor,
  onEditorContainerKeyDown,
} from '../utility/create-editor';
import { pick, cleanupDisposables, cn, Range } from '../utility';
import { KEY_BINDINGS, URI_NAME } from '../constants';
import type { EditorProps } from '../types';
import type * as monaco from 'monaco-editor';
import { useMonaco } from '../stores';

type ResponseTooltipType = ComponentType<{
  /**
   * A position in the editor.
   */
  position: monaco.Position;
  /**
   * Word that has been hovered over.
   */
  word: monaco.editor.IWordAtPosition;
}>;

interface ResponseEditorProps extends EditorProps {
  /**
   * Customize the tooltip when hovering over properties in the response editor.
   */
  responseTooltip?: ResponseTooltipType;
}

export const ResponseEditor: FC<ResponseEditorProps> = ({
  responseTooltip: ResponseTooltip,
  ...props
}) => {
    throw new Error("STUB");
};
