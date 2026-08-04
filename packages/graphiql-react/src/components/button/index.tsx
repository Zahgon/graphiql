import { ComponentPropsWithoutRef, forwardRef } from 'react';
import { cn } from '../../utility';
import './index.css';

type UnStyledButtonProps = ComponentPropsWithoutRef<'button'>;

export const UnStyledButton = forwardRef<
  HTMLButtonElement,
  UnStyledButtonProps
>((props, ref) => { throw new Error("STUB"); });
UnStyledButton.displayName = 'UnStyledButton';

interface ButtonProps extends UnStyledButtonProps {
  state?: 'success' | 'error';
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => { throw new Error("STUB"); },
);
Button.displayName = 'Button';
