import { parse, ParserPlugin } from '@babel/parser';
import { BABEL_PLUGINS, PARSER_OPTIONS } from '../constants';
import { SourceParser } from './types';

export const babelParser = (text: string, plugins?: ParserPlugin[]) => {
  const babelPlugins = [...BABEL_PLUGINS];
  if (plugins) {
    babelPlugins.push(...plugins);
  }
  PARSER_OPTIONS.plugins = babelPlugins;
  return parse(text, PARSER_OPTIONS);
};

export const ecmaParser: SourceParser = (text, uri, logger) => {
    throw new Error("STUB");
};

export const tsParser: SourceParser = (text, uri, logger) => {
    throw new Error("STUB");
};
