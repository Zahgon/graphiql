/**
 * This example commands.ts shows you how to create various custom commands and
 * overwrite existing commands.
 *
 * For more comprehensive examples of custom commands, please read more here:
 * https://on.cypress.io/custom-commands
 */

/// <reference types="cypress" />

interface Op {
  query: string;
  variables?: Record<string, any>;
  variablesString?: string;
  headersString?: string;
  response?: Record<string, any>;
}

declare namespace Cypress {
  type MockResult =
    | { data: any }
    | { data: any; hasNext?: boolean }
    | { error: any[] }
    | { errors: any[] };

  interface Chainable {
    /**
     * Custom command to select a DOM element by `data-cy` attribute.
     * @example cy.dataCy('greeting')
     */
    dataCy(value: string): Chainable<Element>;

    clickExecuteQuery(): Chainable<Element>;

    visitWithOp(op: Op): Chainable<Element>;

    clickPrettify(): Chainable<Element>;

    assertHasValues(op: Op): Chainable<Element>;

    assertQueryResult(expectedResult: MockResult): Chainable<Element>;

    containQueryResult(expectedResult: string): Chainable<Element>;

    assertLinterMarkWithMessage(
      text: string,
      severity: 'error' | 'warning',
      message: string,
      uri?: 'operation.graphql' | 'variables.json',
    ): Chainable<Element>;
  }
}

Cypress.Commands.add('dataCy', value => {
    throw new Error("STUB");
});

Cypress.Commands.add('clickExecuteQuery', () => {
    throw new Error("STUB");
});

Cypress.Commands.add('clickPrettify', () => {
    throw new Error("STUB");
});

Cypress.Commands.add('visitWithOp', ({ query, variables, variablesString }) => {
    throw new Error("STUB");
});

Cypress.Commands.add(
  'assertHasValues',
  ({ query, variables, variablesString, headersString, response }: Op) => {
      throw new Error("STUB");
  },
);

Cypress.Commands.add('assertQueryResult', expectedResult => {
    throw new Error("STUB");
});

// Monaco editor adds non-breaking spaces for all spaces, we need to normalize them
function normalizeMonacoWhitespace(str: string): string {
  return str.replaceAll(' ', ' ');
}

Cypress.Commands.add('containQueryResult', expected => {
    throw new Error("STUB");
});

Cypress.Commands.add(
  'assertLinterMarkWithMessage',
  (text, severity, message, uri = 'operation.graphql') => {
      throw new Error("STUB");
  },
);
