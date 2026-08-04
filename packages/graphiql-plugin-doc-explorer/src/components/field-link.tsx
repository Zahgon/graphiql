import type { FC } from 'react';
import { DocExplorerFieldDef, useDocExplorerActions } from '../context';
import './field-link.css';

type FieldLinkProps = {
  /**
   * The field or argument that should be linked to.
   */
  field: DocExplorerFieldDef;
};

export const FieldLink: FC<FieldLinkProps> = ({ field }) => {
    throw new Error("STUB");
};
