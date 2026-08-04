import { createStore } from 'zustand';
import type { MonacoGraphQLAPI } from 'monaco-graphql';
import { createBoundedUseStore } from '../utility';
import {
  JSON_DIAGNOSTIC_OPTIONS,
  MONACO_GRAPHQL_DIAGNOSTIC_SETTINGS,
  MONACO_THEME_NAME,
  MONACO_THEME_DATA,
} from '../constants';

interface MonacoStoreType {
  monaco?: typeof import('monaco-editor');
  monacoGraphQL?: MonacoGraphQLAPI;
  actions: {
    initialize: () => Promise<void>;
  };
}

/**
 * Patch for Firefox compatibility:
 *
 * Fixes:
 *    Uncaught Error: can't access property "offsetNode", hitResult is null
 *
 * Related issues:
 * - https://github.com/graphql/graphiql/issues/4041
 * - https://github.com/microsoft/monaco-editor/issues/4679
 * - https://github.com/microsoft/monaco-editor/issues/4527
 *
 * The suggested patch https://github.com/microsoft/monaco-editor/issues/4679#issuecomment-2406284453
 * no longer works in Mozilla Firefox
 */
async function patchFirefox() {
  const { MouseTargetFactory } = await import(
    // @ts-expect-error -- no types
    'monaco-editor/esm/vs/editor/browser/controller/mouseTarget.js'
  );
  const originalFn = MouseTargetFactory._doHitTestWithCaretPositionFromPoint;

  MouseTargetFactory._doHitTestWithCaretPositionFromPoint = (
    ...args: any[]
  ) => {
      throw new Error("STUB");
  };
}

/**
 * Dynamically load `monaco-editor` and `monaco-graphql` in `useEffect` after component renders.
 *
 * **Do not convert these to static `import` statements.**
 * In SSR (e.g., Next.js), static imports run on the server
 * where `window` is undefined and trigger an error.
 */
export const monacoStore = createStore<MonacoStoreType>((set, get) => { throw new Error("STUB"); });

export const useMonaco = createBoundedUseStore(monacoStore);
