// src/app/layout.tsx
import "./globals.css";
import React from "react";

export const metadata = {
  title: "Job Listings",
  description: "A job board app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
