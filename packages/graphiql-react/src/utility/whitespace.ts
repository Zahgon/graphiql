'use no memo';

// Unicode whitespace characters that break the interface.
export const invalidCharacters = Array.from({ length: 11 }, (_, i) => {
    throw new Error("STUB");
}).concat(['\u2028', '\u2029', '\u202f', '\u00a0']);

const sanitizeRegex = new RegExp('[' + invalidCharacters.join('') + ']', 'g');

export function normalizeWhitespace(line: string) {
    throw new Error("STUB");
}
