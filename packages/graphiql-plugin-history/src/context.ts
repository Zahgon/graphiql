import { FC, ReactElement, ReactNode, useEffect } from 'react';
import { createStore } from 'zustand';
import {
  HistoryStore as ToolkitHistoryStore,
  QueryStoreItem,
} from '@graphiql/toolkit';
import { useGraphiQL, pick, createBoundedUseStore } from '@graphiql/react';

const historyStore = createStore<HistoryStoreType>((set, get) => { throw new Error("STUB"); });

type HistoryStoreType = {
  // Can be `null` if History plugin saved in `localStorage` as `visiblePlugin`
  historyStorage: ToolkitHistoryStore | null;
  actions: {
    /**
     * Add an operation to the history.
     * @param operation The operation that was executed, consisting of the query,
     * variables, headers, and operation name.
     */
    addToHistory(operation: {
      query?: string;
      variables?: string;
      headers?: string;
      operationName?: string;
    }): void;
    /**
     * Change the custom label of an item from the history.
     * @param args An object containing the label (`undefined` if it should be
     * unset) and properties that identify the history item that the label should
     * be applied to. (This can result in the label being applied to multiple
     * history items.)
     * @param index Index to edit. Without it, will look for the first index matching the
     * operation, which may lead to misleading results if multiple items have the same label
     */
    editLabel(
      args: {
        query?: string;
        variables?: string;
        headers?: string;
        operationName?: string;
        label?: string;
        favorite?: boolean;
      },
      index?: number,
    ): void;
    /**
     * Toggle the favorite state of an item from the history.
     * @param args An object containing the favorite state (`undefined` if it
     * should be unset) and properties that identify the history item that the
     * label should be applied to. (This can result in the label being applied
     * to multiple history items.)
     */
    toggleFavorite(args: {
      query?: string;
      variables?: string;
      headers?: string;
      operationName?: string;
      label?: string;
      favorite?: boolean;
    }): void;
    /**
     * Delete an operation from the history.
     * @param args The operation that was executed, consisting of the query,
     * variables, headers, and operation name.
     * @param clearFavorites This is only if you press the 'clear' button
     */
    deleteFromHistory(args: QueryStoreItem, clearFavorites?: boolean): void;
    /**
     * If you need to know when an item in history is set as active to customize
     * your application.
     */
    setActive(args: QueryStoreItem): void;
  };
};

type HistoryStoreProps = {
  children: ReactNode;
  /**
   * The maximum number of executed operations to store.
   * @default 20
   */
  maxHistoryLength?: number;
};

/**
 * The functions send the entire operation so users can customize their own application and get
 * access to the operation plus any additional props they added for their needs (i.e., build their
 * own functions that may save to a backend instead of localStorage and might need an id property
 * added to the `QueryStoreItem`)
 */
export const HistoryStore: FC<HistoryStoreProps> = ({
  maxHistoryLength = 20,
  children,
}) => {
    throw new Error("STUB");
};

const useHistoryStore = createBoundedUseStore(historyStore);

const EMPTY_ARRAY: QueryStoreItem[] = [];

export const useHistory = () =>
  useHistoryStore(state => { throw new Error("STUB"); });

/**
 * Actions are functions used to update values in your store. They are static and never change.
 * @see https://tkdodo.eu/blog/working-with-zustand#separate-actions-from-state
 */
export const useHistoryActions = () => useHistoryStore(state => { throw new Error("STUB"); });
