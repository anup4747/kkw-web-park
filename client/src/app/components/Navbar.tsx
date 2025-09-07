"use client";

import { useState } from "react";
import Link from "next/link";
import { Car, MapPin, MessageSquare, Info, LayoutDashboard, Menu, X } from "lucide-react";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="w-full bg-white shadow-sm border-b border-slate-200">
      <nav className="mx-auto max-w-7xl px-4 py-3 md:py-4">
        <div className="flex items-center justify-between">
          <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-2 md:gap-3 font-bold text-slate-800">
            <div className="p-1.5 md:p-2 bg-emerald-100 rounded-lg">
              <Car className="w-5 h-5 md:w-6 md:h-6 text-emerald-600" />
            </div>
            <span className="text-lg md:text-xl">Security Dashboard</span>
          </Link>
          
          <div className="hidden md:flex items-center gap-4 lg:gap-6 text-sm">
            <Link href="/" className="flex items-center gap-2 text-slate-600 hover:text-emerald-600 transition-colors">
              <MapPin className="w-4 h-4" />
              Home
            </Link>
            <Link href="/dashboard" className="flex items-center gap-2 text-slate-600 hover:text-emerald-600 transition-colors">
              <LayoutDashboard className="w-4 h-4" />
              Dashboard
            </Link>
            <Link href="/about" className="flex items-center gap-2 text-slate-600 hover:text-emerald-600 transition-colors">
              <Info className="w-4 h-4" />
              About
            </Link>
            <Link href="/booking/faculties" className="flex items-center gap-2 text-slate-600 hover:text-emerald-600 transition-colors">
              <Info className="w-4 h-4" />
              Parking Booking
            </Link>
            <Link href="/feedback" className="flex items-center gap-2 text-slate-600 hover:text-emerald-600 transition-colors">
              <MessageSquare className="w-4 h-4" />
              Feedback
            </Link>
            <Link href="/login" className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-105">
              Login
            </Link>
          </div>

          <div className="md:hidden flex items-center gap-2">
            <Link href="/login" className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold px-3 py-1.5 rounded-lg text-sm">
              Login
            </Link>
            <button 
              onClick={toggleMobileMenu}
              className="p-2 text-slate-600 hover:text-emerald-600 transition-colors"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pt-4 border-t border-slate-200 animate-in slide-in-from-top-2 duration-200">
            <div className="flex flex-col gap-3 pb-4">
              <Link 
                href="/" 
                className="flex items-center gap-2 text-slate-600 hover:text-emerald-600 transition-colors py-2 px-2 rounded-lg hover:bg-emerald-50"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <MapPin className="w-4 h-4" />
                Home
              </Link>
              <Link 
                href="/dashboard" 
                className="flex items-center gap-2 text-slate-600 hover:text-emerald-600 transition-colors py-2 px-2 rounded-lg hover:bg-emerald-50"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <LayoutDashboard className="w-4 h-4" />
                Dashboard
              </Link>
              <Link 
                href="/about" 
                className="flex items-center gap-2 text-slate-600 hover:text-emerald-600 transition-colors py-2 px-2 rounded-lg hover:bg-emerald-50"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Info className="w-4 h-4" />
                About
              </Link>
              <Link 
                href="/booking/faculties" 
                className="flex items-center gap-2 text-slate-600 hover:text-emerald-600 transition-colors py-2 px-2 rounded-lg hover:bg-emerald-50"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Info className="w-4 h-4" />
                Parking Booking
              </Link>
              <Link 
                href="/feedback" 
                className="flex items-center gap-2 text-slate-600 hover:text-emerald-600 transition-colors py-2 px-2 rounded-lg hover:bg-emerald-50"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <MessageSquare className="w-4 h-4" />
                Feedback
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
