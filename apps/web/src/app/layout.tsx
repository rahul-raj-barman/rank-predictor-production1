import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.sikshalabh.com"),
  title: {
    default: "Sikshalabh Exam Rank Predictor",
    template: "%s | Sikshalabh",
  },
  description:
    "Fast WebAssembly-powered exam rank prediction utilities for Indian competitive exams.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0f766e",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-IN">
      <body>{children}</body>
    </html>
  );
}
