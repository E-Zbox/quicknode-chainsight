import type { Metadata } from "next";
import React from "react";
// components
import Layout from "./components/Layout";

export const metadata: Metadata = {
  title: "Quicknode ChainSight",
  description:
    "Track Your Transactions Like a Pro: Gain granular insights into your blockchain activity with QuickNode's in-depth transaction tracing and log exploration APIs.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <Layout>{children}</Layout>;
}
