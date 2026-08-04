import { describe, it, expectTypeOf } from 'vitest';
import type {
  EditorSlice,
  ExecutionSlice,
  PluginSlice,
  SchemaSlice,
  ThemeSlice,
  StorageSlice,
  //
  EditorActions,
  ExecutionActions,
  PluginActions,
  SchemaActions,
  ThemeActions,
} from './stores';
import type { AllSlices, AllActions } from './types';

describe('Should not have conflicting types', () => {
    throw new Error("STUB");
});
