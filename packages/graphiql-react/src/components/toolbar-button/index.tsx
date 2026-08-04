import {
  forwardRef,
  MouseEventHandler,
  useState,
  ComponentPropsWithoutRef,
} from 'react';
import { cn } from '../../utility';
import { Tooltip } from '../tooltip';
import { UnStyledButton } from '../button';
import './index.css';

interface ToolbarButtonProps extends ComponentPropsWithoutRef<'button'> {
  label: string;
}

export const ToolbarButton = forwardRef<HTMLButtonElement, ToolbarButtonProps>(
  ({ label, onClick, ...props }, ref) => {
        throw new Error("STUB");
    },
);
ToolbarButton.displayName = 'ToolbarButton';
