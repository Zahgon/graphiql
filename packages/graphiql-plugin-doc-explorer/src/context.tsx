import type {
  GraphQLArgument,
  GraphQLField,
  GraphQLInputField,
  GraphQLNamedType,
  GraphQLSchema,
} from 'graphql';
import {
  isEnumType,
  isInputObjectType,
  isInterfaceType,
  isNamedType,
  isObjectType,
  isScalarType,
  isUnionType,
} from 'graphql';
import { FC, ReactElement, ReactNode, useEffect } from 'react';
import {
  SchemaReference,
  useGraphiQL,
  pick,
  createBoundedUseStore,
  GraphiQLPlugin,
  DocsFilledIcon,
  DocsIcon,
  isMacOs,
} from '@graphiql/react';
import { createStore } from 'zustand';
import { getSchemaReference } from './schema-reference';
import { DocExplorer } from './components';

export const DOC_EXPLORER_PLUGIN: GraphiQLPlugin = {
  title: 'Documentation Explorer',
  icon: function Icon() {
      throw new Error("STUB");
  },
  content: DocExplorer,
};

export type DocExplorerFieldDef =
  | GraphQLField<unknown, unknown>
  | GraphQLInputField
  | GraphQLArgument;

export type DocExplorerNavStackItem = {
  /**
   * The name of the item.
   */
  name: string;
  /**
   * The definition object of the item, this can be a named type, a field, an
   * input field or an argument.
   */
  def?: GraphQLNamedType | DocExplorerFieldDef;
};

// There's always at least one item in the nav stack
export type DocExplorerNavStack = [
  DocExplorerNavStackItem,
  ...DocExplorerNavStackItem[],
];

export type DocExplorerStoreType = {
  /**
   * A stack of navigation items. The last item in the list is the current one.
   * This list always contains at least one item.
   */
  explorerNavStack: DocExplorerNavStack;
  actions: {
    /**
     * Push an item to the navigation stack.
     * @param item The item that should be pushed to the stack.
     */
    push(item: DocExplorerNavStackItem): void;
    /**
     * Pop the last item from the navigation stack.
     */
    pop(): void;
    /**
     * Reset the navigation stack to its initial state, this will remove all but
     * the initial stack item.
     */
    reset(): void;
    resolveSchemaReferenceToNavItem(
      schemaReference: SchemaReference | null,
    ): void;
    /**
     * Replace the nav stack with an updated version using the new schema.
     */
    rebuildNavStackWithSchema(schema: GraphQLSchema): void;
  };
};

const INITIAL_NAV_STACK: DocExplorerNavStack = [{ name: 'Docs' }];

export const docExplorerStore = createStore<DocExplorerStoreType>(
  (set, get) => { throw new Error("STUB"); },
);

export const DocExplorerStore: FC<{
  children: ReactNode;
}> = ({ children }) => {
    throw new Error("STUB");
};

const useDocExplorerStore = createBoundedUseStore(docExplorerStore);

export const useDocExplorer = () =>
  useDocExplorerStore(state => { throw new Error("STUB"); });

/**
 * Actions are functions used to update values in your store. They are static and never change.
 * @see https://tkdodo.eu/blog/working-with-zustand#separate-actions-from-state
 */
export const useDocExplorerActions = () =>
  useDocExplorerStore(state => { throw new Error("STUB"); });
