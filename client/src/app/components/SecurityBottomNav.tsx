"use client";

import React from 'react';
import Link from 'next/link';
import { 
  Home, 
  QrCode, 
  MapPin, 
  FileText, 
  User,
  AlertTriangle
} from 'lucide-react';

interface SecurityBottomNavProps {
  currentPage?: string;
  darkMode?: boolean;
}

/**
 * Security bottom navigation component
 * High-contrast design for outdoor readability
 * Optional dark mode support
 */
export default function SecurityBottomNav({ currentPage = 'dashboard', darkMode = false }: SecurityBottomNavProps) {
  const navigationItems = [
    { name: 'Dashboard', href: '/security/dashboard', icon: Home },
    { name: 'Verify', href: '/security/verify', icon: QrCode },
    { name: 'Monitor', href: '/security/monitor', icon: MapPin },
    { name: 'Reports', href: '/security/reports', icon: FileText },
    { name: 'Profile', href: '/security/profile', icon: User },
    { name: 'Alerts', href: '/security/alerts', icon: AlertTriangle },
  ];

  const navClasses = darkMode 
    ? 'bg-gray-800 text-white border-gray-700' 
    : 'bg-white text-gray-800 border-gray-200';

  const itemClasses = (isActive: boolean) => {
    const base = 'flex flex-col items-center gap-1 p-2 rounded-lg transition-colors min-w-0 flex-1';
    if (darkMode) {
      return `${base} ${isActive ? 'text-blue-400 bg-gray-700' : 'text-gray-300 hover:text-blue-400 hover:bg-gray-700'}`;
    }
    return `${base} ${isActive ? 'text-blue-600 bg-blue-50' : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'}`;
  };

  return (
    <nav className={`fixed bottom-0 left-0 right-0 shadow-t border-t z-50 ${navClasses}`}>
      <div className="flex justify-around items-center py-2">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.href.split('/')[2];
          
          return (
            <Link
              key={item.name}
              href={item.href}
              className={itemClasses(isActive)}
            >
              <Icon className="w-8 h-8" />
              <span className="text-xs font-bold truncate">{item.name}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
