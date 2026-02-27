import type { Metadata } from "next";
import "./globals.css";
import { ProductProvider } from "@/lib/store";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "TCGDatabase",
  description: "Personal TCG product price tracker",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-screen bg-gray-50 text-gray-900 antialiased" style={{fontFamily: "'Inter', sans-serif"}}>
        <ProductProvider>
          <Navbar />
          <main className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </main>
        </ProductProvider>
      </body>
    </html>
  );
}
