import { ComponentPropsWithoutRef, forwardRef } from 'react';
import { cn, markdown } from '../../utility';
import './index.css';

interface MarkdownContentProps extends Omit<
  ComponentPropsWithoutRef<'div'>,
  'children'
> {
  children: string;
  onlyShowFirstChild?: boolean;
  type: 'description' | 'deprecation';
}

export const MarkdownContent = forwardRef<HTMLDivElement, MarkdownContentProps>(
  ({ children, onlyShowFirstChild, type, ...props }, ref) => { throw new Error("STUB"); },
);
MarkdownContent.displayName = 'MarkdownContent';
