import { Staatliches, Jost } from "next/font/google";

// Brand fonts from ScanSafeguard style guide
export const staatliches = Staatliches({
  weight: "400",
  variable: "--font-staatliches",
  subsets: ["latin"],
});

export const jost = Jost({
  weight: ["400", "500", "600", "700"],
  variable: "--font-jost",
  subsets: ["latin"],
});
