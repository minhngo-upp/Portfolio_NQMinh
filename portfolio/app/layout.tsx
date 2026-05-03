import type { Metadata } from "next";
import "@/styles/globals.css";
import ClinicalCursor from "@/components/ClinicalCursor";

export const metadata: Metadata = {
  title: "Ngô Quang Minh | Product Owner Portfolio",
  description: "Building AI-powered digital products end-to-end",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <ClinicalCursor />
        {children}
      </body>
    </html>
  );
}
