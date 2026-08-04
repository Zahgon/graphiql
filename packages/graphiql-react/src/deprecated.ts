/* eslint-disable @typescript-eslint/no-deprecated */

import { useGraphiQL, useGraphiQLActions } from './components/provider';
import { pick } from './utility';
import type { MonacoEditor } from './types';

/**
 * @deprecated Use `const { prettifyEditors } = useGraphiQLActions()` instead.
 */
export function usePrettifyEditors() {
    throw new Error("STUB");
}

/**
 * @deprecated Use `const { copyQuery } = useGraphiQLActions()` instead.
 */
export function useCopyQuery() {
    throw new Error("STUB");
}

/**
 * @deprecated Use `const { mergeQuery } = useGraphiQLActions()` instead.
 */
export function useMergeQuery() {
    throw new Error("STUB");
}

/**
 * @deprecated Use `useGraphiQLActions` and `useGraphiQL` hooks instead.
 */
export function useEditorContext() {
    throw new Error("STUB");
}

/**
 * @deprecated Use `useGraphiQLActions` and `useGraphiQL` hooks instead.
 */
export function useExecutionContext() {
    throw new Error("STUB");
}

/**
 * @deprecated Use `useGraphiQLActions` and `useGraphiQL` hooks instead.
 */
export function usePluginContext() {
    throw new Error("STUB");
}

/**
 * @deprecated Use `useGraphiQLActions` and `useGraphiQL` hooks instead.
 */
export function useSchemaContext() {
    throw new Error("STUB");
}

/**
 * @deprecated Use `const storage = useGraphiQL(state => state.storage)` instead.
 */
export const useStorage = () => { throw new Error("STUB"); };

/**
 * @deprecated Use `const storage = useGraphiQL(state => state.storage)` instead.
 */
export const useStorageContext = useStorage;

/**
 * @deprecated Use `useGraphiQLActions` and `useGraphiQL` hooks instead.
 */
export function useTheme() {
    throw new Error("STUB");
}

/**
 * @deprecated Use `useGraphiQLActions` and `useGraphiQL` hooks instead.
 */
export const useEditorStore = useEditorContext;

/**
 * @deprecated Use `useGraphiQLActions` and `useGraphiQL` hooks instead.
 */
export const useExecutionStore = useExecutionContext;

/**
 * @deprecated Use `useGraphiQLActions` and `useGraphiQL` hooks instead.
 */
export const usePluginStore = usePluginContext;

/**
 * @deprecated Use `useGraphiQLActions` and `useGraphiQL` hooks instead.
 */
export const useSchemaStore = useSchemaContext;
