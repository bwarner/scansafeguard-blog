import type { Metadata } from "next";
import { ShieldX, LogIn, Home } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "401 - Unauthorized | ScanSafeguard",
  description: "You are not authorized to access this page.",
};

export default function UnauthorizedPage() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center px-4 py-16">
      <div className="text-center max-w-md">
        <div className="mb-6 flex justify-center">
          <div className="rounded-full bg-ssg-cream p-4">
            <ShieldX className="h-12 w-12 text-ssg-gold" />
          </div>
        </div>

        <h1 className="font-display text-6xl md:text-7xl text-ssg-gold mb-2">
          401
        </h1>

        <h2 className="font-display text-2xl md:text-3xl text-ssg-brown-dark mb-4">
          Unauthorized Access
        </h2>

        <p className="text-ssg-brown text-lg mb-8">
          You don&apos;t have permission to access this page. Please sign in or
          contact support if you believe this is an error.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/login"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-ssg-gold px-6 py-3 font-medium text-ssg-brown-dark transition-colors hover:bg-ssg-gold-light"
          >
            <LogIn className="h-5 w-5" />
            Sign In
          </Link>

          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-ssg-brown-dark px-6 py-3 font-medium text-ssg-brown-dark transition-colors hover:bg-ssg-cream"
          >
            <Home className="h-5 w-5" />
            Go Home
          </Link>
        </div>
      </div>
    </main>
  );
}
