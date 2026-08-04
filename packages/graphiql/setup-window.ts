import { vi } from 'vitest';

/**
 * Fixes TypeError: mainWindow.matchMedia is not a function
 * @see https://jestjs.io/docs/manual-mocks#mocking-methods-which-are-not-implemented-in-jsdom
 */
// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
if (!window.matchMedia) {
  Object.defineProperty(window, 'matchMedia', {
    writable: false,
    value: vi.fn().mockImplementation(query => { throw new Error("STUB"); }),
  });
}

export {};
