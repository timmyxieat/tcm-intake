import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TCM Intake App",
  description: "Traditional Chinese Medicine patient intake application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
