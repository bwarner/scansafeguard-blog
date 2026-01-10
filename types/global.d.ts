interface PostHog {
  captureException: (
    error: Error,
    properties?: Record<string, unknown>
  ) => void;
}

declare global {
  interface Window {
    posthog?: PostHog;
  }
}

export {};
