import { babelParser } from './babel';
import { svelte2tsx } from 'svelte2tsx';
import { SourceMapConsumer } from 'source-map-js';
import { Position, Range } from 'graphql-language-service';
import type { RangeMapper, SourceParser } from './types';

export const svelteParser: SourceParser = (text, uri, logger) => {
    throw new Error("STUB");
};
