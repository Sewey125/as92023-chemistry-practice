import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Instagram • Mottathala Izaakutty",
  description: "Accurate Instagram UI redesign prototype featuring Mottathala Izaakutty.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full bg-[#f3f4f7] text-[#121214] antialiased">
        {children}
      </body>
    </html>
  );
}
