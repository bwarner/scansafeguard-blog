"use client";

import { useEffect } from "react";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);

    // Log to PostHog if available
    if (typeof window !== "undefined" && window.posthog) {
      window.posthog.captureException(error, {
        digest: error.digest,
      });
    }
  }, [error]);

  return (
    <main className="flex flex-1 flex-col items-center justify-center px-4 py-16">
      <div className="text-center max-w-md">
        <div className="mb-6 flex justify-center">
          <div className="rounded-full bg-ssg-cream p-4">
            <AlertTriangle className="h-12 w-12 text-ssg-gold" />
          </div>
        </div>

        <h1 className="font-display text-4xl md:text-5xl text-ssg-brown-dark mb-4">
          Something Went Wrong
        </h1>

        <p className="text-ssg-brown text-lg mb-8">
          We encountered an unexpected error. Please try again, or return to the
          homepage.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => reset()}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-ssg-gold px-6 py-3 font-medium text-ssg-brown-dark transition-colors hover:bg-ssg-gold-light"
          >
            <RefreshCw className="h-5 w-5" />
            Try Again
          </button>

          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-ssg-brown-dark px-6 py-3 font-medium text-ssg-brown-dark transition-colors hover:bg-ssg-cream"
          >
            <Home className="h-5 w-5" />
            Go Home
          </Link>
        </div>

        {error.digest && (
          <p className="mt-8 text-sm text-ssg-brown/60">
            Error ID: {error.digest}
          </p>
        )}
      </div>
    </main>
  );
}
