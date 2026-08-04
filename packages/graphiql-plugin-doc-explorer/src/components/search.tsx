import {
  GraphQLArgument,
  GraphQLField,
  GraphQLInputField,
  GraphQLNamedType,
  isInputObjectType,
  isInterfaceType,
  isObjectType,
} from 'graphql';
import { FC, useEffect, useRef, useState } from 'react';
import {
  Combobox,
  ComboboxInput,
  ComboboxOptions,
  ComboboxOption,
} from '@headlessui/react';
import {
  formatShortcutForOS,
  useGraphiQL,
  MagnifyingGlassIcon,
  debounce,
  KEY_MAP,
} from '@graphiql/react';
import { useDocExplorer, useDocExplorerActions } from '../context';
import { renderType } from './utils';
import './search.css';

export const Search: FC = () => {
    throw new Error("STUB");
};

type TypeMatch = { type: GraphQLNamedType };

type FieldMatch = {
  type: GraphQLNamedType;
  field: GraphQLField<unknown, unknown> | GraphQLInputField;
  argument?: GraphQLArgument;
};

export function useSearchResults() {
  const explorerNavStack = useDocExplorer();
  const schema = useGraphiQL(state => { throw new Error("STUB"); });

  const navItem = explorerNavStack.at(-1)!;

  return (searchValue: string) => {
      throw new Error("STUB");
  };
}

function isMatch(sourceText: string, searchValue: string): boolean {
  try {
    const escaped = searchValue.replaceAll(/[^_0-9A-Za-z]/g, ch => { throw new Error("STUB"); });
    return new RegExp(escaped, 'i').test(sourceText);
  } catch {
    return sourceText.toLowerCase().includes(searchValue.toLowerCase());
  }
}

const Type: FC<{ type: GraphQLNamedType }> = ({ type }) => {
    throw new Error("STUB");
};

type FieldProps = {
  field: GraphQLField<unknown, unknown> | GraphQLInputField;
  argument?: GraphQLArgument;
};

const Field: FC<FieldProps> = ({ field, argument }) => {
    throw new Error("STUB");
};
