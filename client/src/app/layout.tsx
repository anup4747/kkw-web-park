import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { GeistMono } from 'geist/font/mono';
import { GeistSans } from 'geist/font/sans';
import Navbar from "./components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "KKW College Security - Parking Management",
  description: "Secure parking management system for KKW College security and administration",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-slate-50`}> */}
      <body className={`${GeistMono.className} ${GeistSans.className} antialiased bg-slate-50`}>

        {/*<Navbar />*/}
        <main className="min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}
