import type { Metadata } from "next";
import "./globals.css";
import "@/styles/portfolio.css";
import {
  geist,
  geistMono,
  spaceGrotesk,
  jetBrainsMono,
  bricolage,
  ibmPlexSans,
  ibmPlexMono,
  instrumentSerif,
} from "@/components/fonts";

import { Toaster } from "sonner";
import {
  AlertTriangle,
  CheckCircle,
  Info,
  Loader2,
  XCircle,
} from "lucide-react";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL?.startsWith("http")
      ? process.env.NEXT_PUBLIC_SITE_URL
      : "http://localhost:3000",
  ),
  title: {
    default: "Mahfuz Ahmed Zisan — Software Developer",
    template: "%s — Mahfuz Ahmed Zisan",
  },
  description:
    "Software developer building modern web apps with Laravel, React, and Next.js. Available for hire and freelance projects.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const fontVariables = [
    geist.variable,
    geistMono.variable,
    spaceGrotesk.variable,
    jetBrainsMono.variable,
    bricolage.variable,
    ibmPlexSans.variable,
    ibmPlexMono.variable,
    instrumentSerif.variable,
  ].join(" ");
  return (
    <html lang="en" className={`${fontVariables} h-full antialiased`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col">
        <Toaster
          position="bottom-right"
          richColors
          closeButton
          expand={true}
          duration={3000}
          icons={{
            success: <CheckCircle className="h-4 w-4" />,
            error: <XCircle className="h-4 w-4" />,
            warning: <AlertTriangle className="h-4 w-4" />,
            info: <Info className="h-4 w-4" />,
            loading: <Loader2 className="h-4 w-4" />,
          }}
        />
        {children}
      </body>
    </html>
  );
}
