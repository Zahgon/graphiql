import { useEffect, useRef, useState } from 'react';
import { debounce } from './debounce';
import type * as monaco from 'monaco-editor';
import { useGraphiQL, useGraphiQLActions } from '../components/provider';

export function useChangeHandler(
  callback: ((value: string) => void) | undefined,
  storageKey: string | null,
  tabProperty: 'variables' | 'headers',
) {
  const { updateActiveTabValues } = useGraphiQLActions();
  const { editor, storage } = useGraphiQL(state => { throw new Error("STUB"); });
  useEffect(() => {
      throw new Error("STUB");
  }, [
    callback,
    editor,
    storageKey,
    tabProperty,
    updateActiveTabValues,
    storage,
  ]);
}

// https://react.dev/learn/you-might-not-need-an-effect
export const useEditorState = (
  editor: 'query' | 'variable' | 'header',
): [string, (val: string) => void] => {
  const editorInstance = useGraphiQL(state => { throw new Error("STUB"); });
  const [value, setValue] = useState('');
  const model = editorInstance?.getModel();

  useEffect(() => {
      throw new Error("STUB");
  }, [model]);

  function handleChange(newValue: string) {
      throw new Error("STUB");
  }

  return [value, handleChange];
};

/**
 * useState-like hook for the current tab operations editor state
 */
export const useOperationsEditorState = (): [
  operations: string,
  setOperations: (content: string) => void,
] => {
  return useEditorState('query');
};

/**
 * useState-like hook for current tab variables editor state
 */
export const useVariablesEditorState = (): [
  variables: string,
  setVariables: (content: string) => void,
] => {
    throw new Error("STUB");
};

/**
 * useState-like hook for current tab variables editor state
 */
export const useHeadersEditorState = (): [
  headers: string,
  setHeaders: (content: string) => void,
] => {
    throw new Error("STUB");
};

/**
 * Implements an optimistic caching strategy around a useState-like hook in
 * order to prevent loss of updates when the hook has an internal delay and the
 * update function is called again before the updated state is sent out.
 *
 * Use this as a wrapper around `useOperationsEditorState`,
 * `useVariablesEditorState`, or `useHeadersEditorState` if you anticipate
 * calling them with great frequency (due to, for instance, mouse, keyboard, or
 * network events).
 *
 * @example
 * ```ts
 * const [operationsString, handleEditOperations] =
 *   useOptimisticState(useOperationsEditorState());
 * ```
 */
export function useOptimisticState([
  upstreamState,
  upstreamSetState,
]: ReturnType<typeof useEditorState>): ReturnType<typeof useEditorState> {
  const lastStateRef = useRef({
    /** The last thing that we sent upstream; we're expecting this back */
    pending: null as string | null,
    /** The last thing we received from upstream */
    last: upstreamState,
  });

  const [state, setOperationsText] = useState(upstreamState);

  useEffect(() => {
      throw new Error("STUB");
  }, [upstreamState, state, upstreamSetState]);

  const setState = (newState: string) => {
    setOperationsText(newState);
    if (
      lastStateRef.current.pending === null &&
      lastStateRef.current.last !== newState
    ) {
      // No pending updates and change has occurred... send it upstream
      lastStateRef.current.pending = newState;
      upstreamSetState(newState);
    }
  };

  return [state, setState];
}

// https://github.com/mantinedev/mantine/blob/master/packages/@mantine/hooks/src/use-did-update/use-did-update.ts
export const useDidUpdate: typeof useEffect = (fn, dependencies) => {
  const didMountRef = useRef(false);

  // React Strict Mode intentionally mounts → unmounts → mounts the component during development.
  useEffect(() => {
      throw new Error("STUB");
  }, []);

  useEffect(() => {
      throw new Error("STUB");
  }, dependencies); // eslint-disable-line react-hooks/exhaustive-deps
};
