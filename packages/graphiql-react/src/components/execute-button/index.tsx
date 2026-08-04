import type { FC } from 'react';
import { useGraphiQL, useGraphiQLActions } from '../provider';
import { PlayIcon, StopIcon } from '../../icons';
import { DropdownMenu } from '../dropdown-menu';
import { Tooltip } from '../tooltip';
import { KEY_MAP, formatShortcutForOS } from '../../constants';
import { pick } from '../../utility';
import './index.css';

export const ExecuteButton: FC = () => {
    throw new Error("STUB");
};
