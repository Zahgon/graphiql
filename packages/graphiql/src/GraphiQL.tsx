/**
 *  Copyright (c) 2020 GraphQL Contributors.
 *
 *  This source code is licensed under the MIT license found in the
 *  LICENSE file in the root directory of this source tree.
 */
import type {
  MouseEventHandler,
  ReactNode,
  FC,
  ComponentPropsWithoutRef,
} from 'react';
import { useState, Children, useRef, Fragment } from 'react';
import {
  ChevronDownIcon,
  ChevronUpIcon,
  ExecuteButton,
  GraphiQLProvider,
  HeaderEditor,
  PlusIcon,
  QueryEditor,
  ResponseEditor,
  Spinner,
  Tab,
  Tabs,
  Tooltip,
  UnStyledButton,
  useDragResize,
  useGraphiQL,
  pick,
  VariableEditor,
  EditorProps,
  cn,
  useGraphiQLActions,
  useMonaco,
} from '@graphiql/react';
import { HistoryStore, HISTORY_PLUGIN } from '@graphiql/plugin-history';
import {
  DocExplorerStore,
  DOC_EXPLORER_PLUGIN,
} from '@graphiql/plugin-doc-explorer';
import { GraphiQLLogo, GraphiQLToolbar, GraphiQLFooter, Sidebar } from './ui';

/**
 * API docs for this live here:
 *
 * https://graphiql-test.netlify.app/typedoc/modules/graphiql.html#graphiqlprops
 */
export interface GraphiQLProps
  // `children` prop should be optional
  extends
    GraphiQLInterfaceProps,
    Omit<ComponentPropsWithoutRef<typeof GraphiQLProvider>, 'children'>,
    Omit<ComponentPropsWithoutRef<typeof HistoryStore>, 'children'> {}

/**
 * The top-level React component for GraphiQL, intended to encompass the entire
 * browser viewport.
 *
 * @see https://github.com/graphql/graphiql#usage
 */
const GraphiQL_: FC<GraphiQLProps> = ({
  maxHistoryLength,
  plugins = [HISTORY_PLUGIN],
  referencePlugin = DOC_EXPLORER_PLUGIN,
  onEditQuery,
  onEditVariables,
  onEditHeaders,
  responseTooltip,
  defaultEditorToolsVisibility,
  isHeadersEditorEnabled,
  showPersistHeadersSettings,
  forcedTheme,
  confirmCloseTab,
  className,

  children,
  ...props
}) => {
    throw new Error("STUB");
};

type AddSuffix<Obj extends Record<string, any>, Suffix extends string> = {
  [Key in keyof Obj as `${string & Key}${Suffix}`]: Obj[Key];
};

type QueryEditorProps = ComponentPropsWithoutRef<typeof QueryEditor>;
type VariableEditorProps = ComponentPropsWithoutRef<typeof VariableEditor>;
type HeaderEditorProps = ComponentPropsWithoutRef<typeof HeaderEditor>;
type ResponseEditorProps = ComponentPropsWithoutRef<typeof ResponseEditor>;

export interface GraphiQLInterfaceProps
  extends
    EditorProps,
    AddSuffix<Pick<QueryEditorProps, 'onEdit'>, 'Query'>,
    AddSuffix<Pick<VariableEditorProps, 'onEdit'>, 'Variables'>,
    AddSuffix<Pick<HeaderEditorProps, 'onEdit'>, 'Headers'>,
    Pick<ResponseEditorProps, 'responseTooltip'>,
    Pick<
      ComponentPropsWithoutRef<typeof Sidebar>,
      'forcedTheme' | 'showPersistHeadersSettings'
    > {
  children?: ReactNode;
  /**
   * Set the default state for the editor tools.
   * - `false` hides the editor tools
   * - `true` shows the editor tools
   * - `'variables'` specifically shows the variables editor
   * - `'headers'` specifically shows the request headers editor
   * By default, the editor tools are initially shown when at least one of the
   * editors has contents.
   */
  defaultEditorToolsVisibility?: boolean | 'variables' | 'headers';
  /**
   * Toggle if the headers' editor should be shown inside the editor tools.
   * @default true
   */
  isHeadersEditorEnabled?: boolean;
  /**
   * Additional class names which will be appended to the container element.
   */
  className?: string;

  /**
   * When the user clicks a close tab button, this function is invoked with
   * the index of the tab that is about to be closed. It can return a promise
   * that should resolve to `true` (meaning the tab may be closed) or `false`
   * (meaning the tab may not be closed).
   * @param index - The index of the tab that should be closed.
   */
  confirmCloseTab?(index: number): Promise<boolean> | boolean;
}

const TAB_CLASS_PREFIX = 'graphiql-session-tab-';

type ButtonHandler = MouseEventHandler<HTMLButtonElement>;

const LABEL = {
  newTab: 'New tab',
};

export function GraphiQLInterface({
  forcedTheme,
  isHeadersEditorEnabled = true,
  defaultEditorToolsVisibility,
  children: $children,
  confirmCloseTab,
  className,
  onEditQuery,
  onEditVariables,
  onEditHeaders,
  responseTooltip,
  showPersistHeadersSettings,
}: GraphiQLInterfaceProps) {
    throw new Error("STUB");
}

function getChildComponentType(child: ReactNode) {
    throw new Error("STUB");
}

// Export main windows/panes to be used separately if desired.
export const GraphiQL = Object.assign(GraphiQL_, {
  Logo: GraphiQLLogo,
  Toolbar: GraphiQLToolbar,
  Footer: GraphiQLFooter,
});
