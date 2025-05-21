import "~/styles/globals.css";

import { type Metadata } from "next";
import { Urbanist } from "next/font/google";

import { TRPCReactProvider } from "~/trpc/react";

export const metadata: Metadata = {
  title: "Trezma Stack: Free Serverless Next.js Starter for Cloudflare",
  description:
    "Deploy full-stack Next.js 15 apps on Cloudflare for free with Trezma Stack. Serverless starter with TypeScript, Drizzle, tRPC, Better Auth, and Tailwind. Start building now!",
  icons: [{ rel: "icon", url: "/icon.svg" }],
};

const urbanist = Urbanist({
  preload: true,
  display: "swap",
  subsets: ["latin"],
  fallback: ["sans-serif"],
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${urbanist.className}`}>
      <body className="bg-white dark:bg-gray-900">
        <TRPCReactProvider>{children}</TRPCReactProvider>
      </body>
    </html>
  );
}
