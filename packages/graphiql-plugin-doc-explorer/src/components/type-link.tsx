import type { FC } from 'react';
import type { GraphQLType } from 'graphql';
import { useDocExplorerActions } from '../context';
import { renderType } from './utils';
import './type-link.css';

type TypeLinkProps = {
  /**
   * The type that should be linked to.
   */
  type: GraphQLType;
};

export const TypeLink: FC<TypeLinkProps> = ({ type }) => {
    throw new Error("STUB");
};
