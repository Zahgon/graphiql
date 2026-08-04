import type { FC } from 'react';
import { MarkdownContent } from '@graphiql/react';
import './deprecation-reason.css';

type DeprecationReasonProps = {
  /**
   * The deprecation reason as Markdown string.
   */
  children?: string | null;
  preview?: boolean;
};

export const DeprecationReason: FC<DeprecationReasonProps> = props => {
    throw new Error("STUB");
};
