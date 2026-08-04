import { FC, Fragment } from 'react';
import { formatShortcutForOS, KEY_MAP } from '@graphiql/react';

const SHORT_KEYS = Object.entries({
  'Execute query': formatShortcutForOS(KEY_MAP.runQuery.key),
  'Open the Command Palette (you must have focus in the editor)': 'F1',
  'Prettify editors': KEY_MAP.prettify.key,
  'Copy query': KEY_MAP.copyQuery.key,
  'Re-fetch schema using introspection': KEY_MAP.refetchSchema.key,
  'Search in documentation': formatShortcutForOS(KEY_MAP.searchInDocs.key),
  'Search in editor': formatShortcutForOS(KEY_MAP.searchInEditor.key),
  'Merge fragments definitions into operation definition':
    KEY_MAP.mergeFragments.key,
});

export const ShortKeys: FC = () => {
    throw new Error("STUB");
};
