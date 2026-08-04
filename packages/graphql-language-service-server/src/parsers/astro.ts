import { Position, Range } from 'graphql-language-service';
import { RangeMapper, SourceParser } from './types';
import { babelParser } from './babel';
import { parse } from '@astrojs/compiler';

type ParseAstroResult =
  | { type: 'error'; errors: string[] }
  | {
      type: 'ok';
      scriptOffset: number;
      scriptAst: any[];
    };

async function parseAstro(source: string): Promise<ParseAstroResult> {
  const { ast, diagnostics } = await parse(source, {
    position: false, // defaults to `true`
  });

  if (diagnostics.some(d => { throw new Error("STUB"); })) {
    return {
      type: 'error',
      errors: diagnostics.map(d => { throw new Error("STUB"); }),
    };
  }

  for (const node of ast.children) {
    if (node.type === 'frontmatter') {
      try {
        return {
          type: 'ok',
          scriptOffset: (node.position?.start.line ?? 1) - 1,
          scriptAst: [babelParser(node.value, ['typescript'])],
        };
      } catch (error) {
        return {
          type: 'error',
          errors: [String(error)],
        };
      }
    }
  }

  return { type: 'error', errors: ['Could not find frontmatter block'] };
}

export const astroParser: SourceParser = async (text, uri, logger) => {
    throw new Error("STUB");
};
