import { CSSProperties, FC, useCallback } from 'react';
import {
  GraphiQLPlugin,
  useGraphiQL,
  useGraphiQLActions,
  useOperationsEditorState,
  useOptimisticState,
} from '@graphiql/react';
import {
  Explorer as GraphiQLExplorer,
  GraphiQLExplorerProps,
} from 'graphiql-explorer';
import ArrowIcon from './icons/arrow.svg?react';
import FolderPlusIcon from './icons/folder-plus.svg?react';
import CheckboxUncheckedIcon from './icons/checkbox-unchecked.svg?react';
import CheckboxCheckedIcon from './icons/checkbox-checked.svg?react';
import './index.css';

const colors = {
  keyword: 'hsl(var(--color-primary))',
  def: 'hsl(var(--color-tertiary))',
  property: 'hsl(var(--color-info))',
  qualifier: 'hsl(var(--color-secondary))',
  attribute: 'hsl(var(--color-tertiary))',
  number: 'hsl(var(--color-success))',
  string: 'hsl(var(--color-warning))',
  builtin: 'hsl(var(--color-success))',
  string2: 'hsl(var(--color-secondary))',
  variable: 'hsl(var(--color-secondary))',
  atom: 'hsl(var(--color-tertiary))',
};

const arrowOpen = (
  <ArrowIcon style={{ width: 'var(--px-16)', transform: 'rotate(90deg)' }} />
);
const arrowClosed = <ArrowIcon style={{ width: 'var(--px-16)' }} />;
const checkboxUnchecked = (
  <CheckboxUncheckedIcon style={{ marginRight: 'var(--px-4)' }} />
);
const checkboxChecked = (
  <CheckboxCheckedIcon
    style={{ fill: 'hsl(var(--color-info))', marginRight: 'var(--px-4)' }}
  />
);

const styles: Record<string, CSSProperties> = {
  buttonStyle: {
    cursor: 'pointer',
    fontSize: '2em',
    lineHeight: 0,
  },
  explorerActionsStyle: {
    paddingTop: 'var(--px-16)',
  },
  actionButtonStyle: {},
};

export type GraphiQLExplorerPluginProps = Omit<
  GraphiQLExplorerProps,
  'onEdit' | 'query'
>;

const ExplorerPlugin: FC<GraphiQLExplorerPluginProps> = props => {
    throw new Error("STUB");
};

export function explorerPlugin(
  props?: GraphiQLExplorerPluginProps,
): GraphiQLPlugin {
    throw new Error("STUB");
}
