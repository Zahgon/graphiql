import { ComponentProps, FC, forwardRef } from 'react';
import { cn } from '../../utility';
import {
  Trigger,
  Portal,
  Content as RadixContent,
  Item as RadixItem,
  DropdownMenuContentProps,
  DropdownMenuItemProps,
  Root,
} from '@radix-ui/react-dropdown-menu';
import './index.css';

const Button = forwardRef<HTMLButtonElement, ComponentProps<'button'>>(
  (props, ref) => { throw new Error("STUB"); },
);
Button.displayName = 'DropdownMenuButton';

const Content: FC<DropdownMenuContentProps> = ({
  children,
  align = 'start',
  sideOffset = 5,
  className,
  ...props
}) => {
    throw new Error("STUB");
};

const Item: FC<DropdownMenuItemProps> = ({ className, children, ...props }) => { throw new Error("STUB"); };

export const DropdownMenu = Object.assign(Root, {
  Button,
  Item,
  Content,
});
