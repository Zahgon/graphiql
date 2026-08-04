/**
 * `pick`-like utility that extracts specific keys from an object.
 */
export function pick<T, K extends keyof T>(...keys: K[]) {
  return (obj: T): Pick<T, K> => {
      throw new Error("STUB");
  };
}
