/* eslint-disable @next/next/no-head-element */

import { Web3Provider } from "@/components/web3-provider";
import { Metadata } from "next";
import { Suspense } from "react";
import { Toaster } from "sonner";
import "../styles/globals.css";
import "../styles/tailwind.css";

export const metadata: Metadata = {
  // metadataBase: new URL(""),
  title: "",
  description: "",
  openGraph: {
    type: "website",
    title: "Bullas of Berachain",
    description: "OOGA BULLAS",
    images: [
      {
        url: "https://res.cloudinary.com/honeyjar/image/upload/v1714618932/bullas/ogimage.png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <head></head>
      <body>
        <Toaster />
        <Web3Provider>
          <Suspense fallback={<div>Loading...</div>}>
            <div className="mx-auto">{children}</div>
          </Suspense>
        </Web3Provider>
      </body>
    </html>
  );
}
