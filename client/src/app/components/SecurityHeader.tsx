"use client";

import React from 'react';
import { Bell, Search, User, Sun, Moon } from 'lucide-react';

interface SecurityHeaderProps {
  title: string;
  subtitle?: string;
  darkMode?: boolean;
  onToggleDarkMode?: () => void;
  onSearch?: (query: string) => void;
}

/**
 * Security header component
 * High-contrast design for outdoor readability
 * Optional dark mode toggle
 */
export default function SecurityHeader({ 
  title, 
  subtitle, 
  darkMode = false, 
  onToggleDarkMode,
  onSearch 
}: SecurityHeaderProps) {
  const headerClasses = darkMode 
    ? 'bg-gray-800 text-white' 
    : 'bg-blue-600 text-white';

  const searchClasses = darkMode
    ? 'bg-gray-700 text-white placeholder-gray-300 border-gray-600 focus:ring-blue-400'
    : 'bg-blue-500 text-white placeholder-blue-300 border-blue-400 focus:ring-blue-300';

  return (
    <header className={headerClasses}>
      <div className="px-4 py-4">
        {/* Mobile layout */}
        <div className="md:hidden">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-xl font-bold">{title}</h1>
              {subtitle && <p className="text-sm opacity-80">{subtitle}</p>}
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={onToggleDarkMode}
                className="p-2 hover:bg-opacity-20 hover:bg-white rounded-md transition-colors"
                aria-label="Toggle dark mode"
              >
                {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              <button className="p-2 hover:bg-opacity-20 hover:bg-white rounded-md transition-colors">
                <Bell className="w-5 h-5" />
              </button>
              <div className="w-8 h-8 bg-opacity-20 bg-white rounded-full flex items-center justify-center">
                <User className="w-4 h-4" />
              </div>
            </div>
          </div>
          
          {/* Mobile search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 opacity-60" />
            <input
              type="text"
              placeholder="Search..."
              className={`w-full pl-10 pr-4 py-3 border rounded-md focus:ring-2 focus:border-transparent text-lg font-medium ${searchClasses}`}
              onChange={(e) => onSearch?.(e.target.value)}
            />
          </div>
        </div>

        {/* Desktop layout */}
        <div className="hidden md:block">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">{title}</h1>
              {subtitle && <p className="opacity-80">{subtitle}</p>}
            </div>
            
            <div className="flex items-center gap-4">
              {/* Desktop search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 opacity-60" />
                <input
                  type="text"
                  placeholder="Search..."
                  className={`pl-10 pr-4 py-2 border rounded-md focus:ring-2 focus:border-transparent w-64 ${searchClasses}`}
                  onChange={(e) => onSearch?.(e.target.value)}
                />
              </div>
              
              <button 
                onClick={onToggleDarkMode}
                className="p-2 hover:bg-opacity-20 hover:bg-white rounded-md transition-colors"
                aria-label="Toggle dark mode"
              >
                {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              
              <button className="p-2 hover:bg-opacity-20 hover:bg-white rounded-md transition-colors">
                <Bell className="w-5 h-5" />
              </button>
              
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-opacity-20 bg-white rounded-full flex items-center justify-center">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-bold">Security Guard</p>
                  <p className="text-xs opacity-80">guard@college.edu</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
