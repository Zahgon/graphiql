/**
 * Setup Monaco Editor workers for Webpack/Turbopack projects like Next.js.
 */
globalThis.MonacoEnvironment = {
  getWorker(_workerId: string, label: string) {
        throw new Error("STUB");
    },
};
