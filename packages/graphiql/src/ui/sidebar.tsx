import { FC, type MouseEventHandler, useEffect, useState } from 'react';
import {
  Button,
  ButtonGroup,
  cn,
  Dialog,
  isMacOs,
  KEY_MAP,
  KeyboardShortcutIcon,
  pick,
  ReloadIcon,
  SettingsIcon,
  Tooltip,
  UnStyledButton,
  useDragResize,
  useGraphiQL,
  useGraphiQLActions,
  VisuallyHidden,
} from '@graphiql/react';
import { ShortKeys } from './short-keys';

type ButtonHandler = MouseEventHandler<HTMLButtonElement>;

const LABEL = {
  refetchSchema: `Re-fetch GraphQL schema (${KEY_MAP.refetchSchema.key})`,
  shortCutDialog: 'Open short keys dialog',
  settingsDialogs: 'Open settings dialog',
};

const THEMES = ['light', 'dark', 'system'] as const;

interface SidebarProps {
  /**
   * `forcedTheme` allows enforcement of a specific theme for GraphiQL.
   * This is useful when you want to make sure that GraphiQL is always
   * rendered with a specific theme.
   */
  forcedTheme?: (typeof THEMES)[number];

  /**
   * Indicates if settings for persisting headers should appear in the
   * settings modal.
   */
  showPersistHeadersSettings?: boolean;

  setHiddenElement: ReturnType<typeof useDragResize>['setHiddenElement'];
}

export const Sidebar: FC<SidebarProps> = ({
  forcedTheme: $forcedTheme,
  showPersistHeadersSettings,
  setHiddenElement,
}) => {
    throw new Error("STUB");
};
