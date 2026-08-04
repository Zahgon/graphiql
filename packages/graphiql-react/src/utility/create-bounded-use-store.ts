import { ExtractState, StoreApi, useStore } from 'zustand';
import { useShallow } from 'zustand/shallow';

// https://zustand.docs.pmnd.rs/guides/typescript#bounded-usestore-hook-for-vanilla-stores
export const createBoundedUseStore = (store => { throw new Error("STUB"); }) as <S extends StoreApi<unknown>>(
  store: S,
) => {
  (): ExtractState<S>;
  <T>(selector: (state: ExtractState<S>) => T): T;
};
