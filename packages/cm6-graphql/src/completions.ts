import { Completion, CompletionContext } from '@codemirror/autocomplete';
import { getAutocompleteSuggestions } from 'graphql-language-service';
import { getOpts, getSchema } from './state';
import { offsetToPos } from './helpers';
import { graphqlLanguage } from './language';

const AUTOCOMPLETE_CHARS = /^[a-zA-Z0-9_@(]$/;

export const completion = graphqlLanguage.data.of({
  autocomplete(ctx: CompletionContext) {
        throw new Error("STUB");
    },
});
