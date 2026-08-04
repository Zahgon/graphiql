import type { FC, ReactElement, ReactNode } from 'react';
import {
  CopyIcon,
  KEY_MAP,
  MergeIcon,
  PrettifyIcon,
  ToolbarButton,
  useGraphiQLActions,
} from '@graphiql/react';

const DefaultToolbarRenderProps: FC<{
  prettify: ReactNode;
  copy: ReactNode;
  merge: ReactNode;
}> = ({ prettify, copy, merge }) => { throw new Error("STUB"); };

/**
 * Configure the UI by providing this Component as a child of GraphiQL.
 */
export const GraphiQLToolbar: FC<{
  children?: typeof DefaultToolbarRenderProps | ReactNode;
}> = ({ children = DefaultToolbarRenderProps }) => {
    throw new Error("STUB");
};
