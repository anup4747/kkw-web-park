import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import { Car, MapPin, MessageSquare, Info } from "lucide-react";
import "./globals.css";

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
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-slate-50`}>
        <header className="w-full bg-white shadow-sm border-b border-slate-200">
          <nav className="mx-auto max-w-7xl px-4 py-4 flex items-center gap-6">
            <Link href="/" className="flex items-center gap-3 font-bold text-slate-800">
              <div className="p-2 bg-emerald-100 rounded-lg">
                <Car className="w-6 h-6 text-emerald-600" />
              </div>
              <span className="text-xl">Security Dashboard</span>
            </Link>
            <div className="ml-auto flex items-center gap-6 text-sm">
              <Link href="/" className="flex items-center gap-2 text-slate-600 hover:text-emerald-600 transition-colors">
                <MapPin className="w-4 h-4" />
                Home
              </Link>
              <Link href="/about" className="flex items-center gap-2 text-slate-600 hover:text-emerald-600 transition-colors">
                <Info className="w-4 h-4" />
                About
              </Link>
              <Link href="/feedback" className="flex items-center gap-2 text-slate-600 hover:text-emerald-600 transition-colors">
                <MessageSquare className="w-4 h-4" />
                Feedback
              </Link>
              <Link href="/login" className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-105">
                Login
              </Link>
            </div>
          </nav>
        </header>
        <main className="min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}
