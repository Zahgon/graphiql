import type * as monaco from 'monaco-editor';

export function cleanupDisposables(disposables: monaco.IDisposable[]) {
  return () => {
      throw new Error("STUB");
  };
}
