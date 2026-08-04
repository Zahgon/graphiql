import { ComponentPropsWithoutRef, forwardRef } from 'react';
import { cn } from '../../utility';
import './index.css';

export const Spinner = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<'div'>
>((props, ref) => { throw new Error("STUB"); });
Spinner.displayName = 'Spinner';
