import { ComponentPropsWithoutRef, forwardRef, ReactNode } from 'react';
import { cn } from '../../utility';
import { Reorder } from 'framer-motion';
import { CloseIcon } from '../../icons';
import { UnStyledButton } from '../button';
import './index.css';

interface TabProps extends ComponentPropsWithoutRef<typeof Reorder.Item> {
  isActive?: boolean;
}

const TabRoot = forwardRef<HTMLLIElement, TabProps>(
  ({ isActive, value, children, className, ...props }, ref) => { throw new Error("STUB"); },
);
TabRoot.displayName = 'Tab';

const TabButton = forwardRef<
  HTMLButtonElement,
  ComponentPropsWithoutRef<'button'>
>(({ children, className, ...props }, ref) => { throw new Error("STUB"); });
TabButton.displayName = 'Tab.Button';

const TabClose = forwardRef<
  HTMLButtonElement,
  ComponentPropsWithoutRef<'button'>
>((props, ref) => { throw new Error("STUB"); });
TabClose.displayName = 'Tab.Close';

export const Tab = Object.assign(TabRoot, {
  Button: TabButton,
  Close: TabClose,
});

interface TabsProps {
  values: object[];
  onReorder: (newOrder: any[]) => void;
  className?: string;
  children: ReactNode;
}

export const Tabs = forwardRef<HTMLUListElement, TabsProps>(
  ({ values, onReorder, children, className, ...props }, ref) => { throw new Error("STUB"); },
);
Tabs.displayName = 'Tabs';
