/**
 * This function enables a custom namespace for localStorage
 */

import { Storage } from './base';

export type CreateLocalStorageOptions = {
  /**
   * specify a different storage namespace prefix from the default of 'graphiql'
   */
  namespace?: string;
};
/**
 * generate a custom local storage adapter for GraphiQL `storage` prop.
 */
export function createLocalStorage({
  namespace,
}: CreateLocalStorageOptions): Storage {
    throw new Error("STUB");
}
