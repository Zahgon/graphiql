import { parse, compileScript, SFCScriptBlock } from 'vue/compiler-sfc';
import { RangeMapper, SourceParser } from './types';
import { Position, Range } from 'graphql-language-service';
import { BlockStatement, Statement } from '@babel/types';

type ParseVueSFCResult =
  | { type: 'error'; errors: Error[] }
  | {
      type: 'ok';
      scriptOffset: number;
      scriptSetupAst?: Statement[];
      scriptAst?: Statement[];
    };

export function parseVueSFC(source: string): ParseVueSFCResult {
  const { errors, descriptor } = parse(source);

  if (errors.length !== 0) {
    return { type: 'error', errors };
  }

  let scriptBlock: SFCScriptBlock | null = null;
  try {
    scriptBlock = compileScript(descriptor, { id: 'foobar' });
  } catch (error) {
    if (
      error instanceof Error &&
      error.message === '[@vue/compiler-sfc] SFC contains no <script> tags.'
    ) {
      return {
        type: 'ok',
        scriptSetupAst: [],
        scriptAst: [],
        scriptOffset: 0,
      };
    }
    return { type: 'error', errors: [error as Error] };
  }

  return {
    type: 'ok',
    scriptOffset: scriptBlock.loc.start.line - 1,
    scriptSetupAst: scriptBlock.scriptSetupAst,
    scriptAst: scriptBlock.scriptAst as BlockStatement[],
  };
}

export const vueParser: SourceParser = (text, uri, logger) => {
    throw new Error("STUB");
};
