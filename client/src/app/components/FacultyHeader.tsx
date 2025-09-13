"use client";

import React from 'react';
import { Bell, Search, User } from 'lucide-react';

interface FacultyHeaderProps {
  title: string;
  subtitle?: string;
  onSearch?: (query: string) => void;
}

/**
 * Faculty header component
 * Clean header with search and notifications
 * Mobile-first design with responsive web layout
 */
export default function FacultyHeader({ title, subtitle, onSearch }: FacultyHeaderProps) {
  return (
    <header className="bg-blue-600 text-white">
      <div className="px-4 py-4">
        {/* Mobile layout */}
        <div className="md:hidden">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-xl font-bold">{title}</h1>
              {subtitle && <p className="text-sm text-blue-100">{subtitle}</p>}
            </div>
            <div className="flex items-center gap-3">
              <button className="p-2 text-blue-100 hover:text-white hover:bg-blue-700 rounded-md transition-colors">
                <Bell className="w-5 h-5" />
              </button>
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <User className="w-4 h-4" />
              </div>
            </div>
          </div>
          
          {/* Mobile search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-blue-300" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 bg-blue-500 text-white placeholder-blue-300 border border-blue-400 rounded-md focus:ring-2 focus:ring-blue-300 focus:border-transparent"
              onChange={(e) => onSearch?.(e.target.value)}
            />
          </div>
        </div>

        {/* Desktop layout */}
        <div className="hidden md:block">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">{title}</h1>
              {subtitle && <p className="text-blue-100">{subtitle}</p>}
            </div>
            
            <div className="flex items-center gap-4">
              {/* Desktop search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-blue-300" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 bg-blue-500 text-white placeholder-blue-300 border border-blue-400 rounded-md focus:ring-2 focus:ring-blue-300 focus:border-transparent w-64"
                  onChange={(e) => onSearch?.(e.target.value)}
                />
              </div>
              
              <button className="p-2 text-blue-100 hover:text-white hover:bg-blue-700 rounded-md transition-colors">
                <Bell className="w-5 h-5" />
              </button>
              
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-medium">Dr. Faculty Name</p>
                  <p className="text-xs text-blue-100">faculty@college.edu</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
