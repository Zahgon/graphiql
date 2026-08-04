import { useOperationsEditorState, type GraphiQLPlugin } from '@graphiql/react';
import type { FC } from 'react';
import GraphiQLCodeExporter, {
  GraphiQLCodeExporterProps,
} from 'graphiql-code-exporter';
import './index.css';

type GraphiQLCodeExporterPluginProps = Omit<GraphiQLCodeExporterProps, 'query'>;

const GraphiQLCodeExporterPlugin: FC<
  GraphiQLCodeExporterPluginProps
> = props => {
    throw new Error("STUB");
};

export function codeExporterPlugin(
  props: GraphiQLCodeExporterPluginProps,
): GraphiQLPlugin {
    throw new Error("STUB");
}
