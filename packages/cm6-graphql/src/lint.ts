import { Diagnostic, linter } from '@codemirror/lint';
import { getDiagnostics } from 'graphql-language-service';
import { Position, posToOffset } from './helpers';
import {
  getOpts,
  getSchema,
  optionsStateField,
  schemaStateField,
} from './state';
import { Extension } from '@codemirror/state';
import { validateSchema } from 'graphql';

const SEVERITY = ['error', 'warning', 'info'] as const;

export const lint: Extension = linter(
  view => {
        throw new Error("STUB");
    },
  {
    needsRefresh(vu) {
          throw new Error("STUB");
      },
  },
);
