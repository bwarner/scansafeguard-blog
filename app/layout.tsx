import type { Metadata } from "next";
import cn from "clsx";
import Link from "next/link";
import Image from "next/image";
import { staatliches, jost } from "./fonts";
import { PostHogProvider } from "@/components/PostHogProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "ScanSafeguard Blog",
    template: "%s | ScanSafeguard",
  },
  description:
    "Security insights, vulnerability research, and network defense strategies. Defend your network, one scan at a time.",
  metadataBase: new URL("https://blog.scansafeguard.com"),
};

function Header() {
  return (
    <header className="border-b border-[#443E3E]/10">
      <div className="mx-auto max-w-5xl px-6 py-4">
        <nav className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="ScanSafeguard"
              width={40}
              height={40}
              className="h-10 w-auto"
            />
            <span
              className="text-xl tracking-wide text-[#443E3E]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              SCANSAFEGUARD
            </span>
          </Link>
          <div className="flex items-center gap-6">
            <Link
              href="/posts"
              className="text-[#5E574B] hover:text-[#F5B141] transition-colors font-medium"
            >
              Blog
            </Link>
            <a
              href="https://www.scansafeguard.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-[#F5B141] text-[#302D26] rounded-lg hover:bg-[#FFD18A] transition-colors font-medium"
            >
              Get Started
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="bg-[#302D26] text-[#FCFCFC] py-12 mt-auto">
      <div className="mx-auto max-w-5xl px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <Image
              src="/logo-symbol.png"
              alt="ScanSafeguard"
              width={40}
              height={40}
              className="h-10 w-auto"
            />
            <span
              className="text-lg tracking-wide"
              style={{ fontFamily: "var(--font-display)" }}
            >
              SCANSAFEGUARD
            </span>
          </div>
          <p className="text-[#FFD18A] text-sm">
            Defend your network, one scan at a time.
          </p>
          <p className="text-[#5E574B] text-sm">
            &copy; {new Date().getFullYear()} ScanSafeguard. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          staatliches.variable,
          jost.variable,
          "min-h-screen",
          "flex",
          "flex-col",
        )}
      >
        <PostHogProvider>
          <Header />
          {children}
          <Footer />
        </PostHogProvider>
      </body>
    </html>
  );
}
