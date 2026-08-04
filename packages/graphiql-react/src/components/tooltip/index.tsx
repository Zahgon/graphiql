import type { FC, ReactNode } from 'react';
import * as T from '@radix-ui/react-tooltip';
import './index.css';

export const TooltipRoot: FC<T.TooltipContentProps & { label: ReactNode }> = ({
  children,
  align = 'start',
  side = 'bottom',
  sideOffset = 5,
  label,
}) => {
    throw new Error("STUB");
};

export const Tooltip = Object.assign(TooltipRoot, {
  Provider: T.Provider,
});
