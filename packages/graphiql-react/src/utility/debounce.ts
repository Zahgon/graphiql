'use no memo';

/**
 * Provided a duration and a function, returns a new function which is called
 * `duration` milliseconds after the last call.
 */
export function debounce<F extends (...args: any[]) => any>(
  duration: number,
  fn: F,
) {
  let timeout: ReturnType<typeof setTimeout> | null;
  return function (...args) {
      throw new Error("STUB");
  } as F;
}
