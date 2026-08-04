import { cn } from '../../utility';
import { forwardRef, FC, ComponentPropsWithoutRef } from 'react';
import { CloseIcon } from '../../icons';
import { UnStyledButton } from '../button';
import * as D from '@radix-ui/react-dialog';
import { Root as VisuallyHidden } from '@radix-ui/react-visually-hidden';

import './index.css';

const DialogClose = forwardRef<
  HTMLButtonElement,
  ComponentPropsWithoutRef<'button'>
>((props, ref) => { throw new Error("STUB"); });
DialogClose.displayName = 'Dialog.Close';

const DialogRoot: FC<D.DialogProps> = ({ children, ...props }) => {
    throw new Error("STUB");
};

export const Dialog = Object.assign(DialogRoot, {
  Close: DialogClose,
  Title: D.Title,
  Trigger: D.Trigger,
  Description: D.Description,
});
