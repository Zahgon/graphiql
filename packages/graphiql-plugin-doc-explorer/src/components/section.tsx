import type { FC, ReactNode } from 'react';
import {
  ArgumentIcon,
  DeprecatedArgumentIcon,
  DeprecatedEnumValueIcon,
  DeprecatedFieldIcon,
  DirectiveIcon,
  EnumValueIcon,
  FieldIcon,
  ImplementsIcon,
  RootTypeIcon,
  TypeIcon,
} from '@graphiql/react';
import './section.css';

type ExplorerSectionProps = {
  children: ReactNode;
  /**
   * The title of the section, which will also determine the icon rendered next
   * to the headline.
   */
  title:
    | 'Root Types'
    | 'Fields'
    | 'Deprecated Fields'
    | 'Type'
    | 'Arguments'
    | 'Deprecated Arguments'
    | 'Implements'
    | 'Implementations'
    | 'Possible Types'
    | 'Enum Values'
    | 'Deprecated Enum Values'
    | 'Directives'
    | 'All Schema Types';
};

export const ExplorerSection: FC<ExplorerSectionProps> = ({
  title,
  children,
}) => {
    throw new Error("STUB");
};

const TYPE_TO_ICON: Record<ExplorerSectionProps['title'], FC> = {
  Arguments: ArgumentIcon,
  'Deprecated Arguments': DeprecatedArgumentIcon,
  'Deprecated Enum Values': DeprecatedEnumValueIcon,
  'Deprecated Fields': DeprecatedFieldIcon,
  Directives: DirectiveIcon,
  'Enum Values': EnumValueIcon,
  Fields: FieldIcon,
  Implements: ImplementsIcon,
  Implementations: TypeIcon,
  'Possible Types': TypeIcon,
  'Root Types': RootTypeIcon,
  Type: TypeIcon,
  'All Schema Types': TypeIcon,
};
