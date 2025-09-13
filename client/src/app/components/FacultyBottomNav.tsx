"use client";

import React from 'react';
import Link from 'next/link';
import { 
  Home, 
  Calendar, 
  History, 
  Car, 
  User,
  HelpCircle
} from 'lucide-react';

interface FacultyBottomNavProps {
  currentPage?: string;
}

/**
 * Faculty bottom navigation component
 * Mobile-first design with large touch targets
 * Uses blue/green palette as specified
 */
export default function FacultyBottomNav({ currentPage = 'dashboard' }: FacultyBottomNavProps) {
  const navigationItems = [
    { name: 'Home', href: '/faculty/dashboard', icon: Home },
    { name: 'Book', href: '/faculty/booking', icon: Calendar },
    { name: 'History', href: '/faculty/history', icon: History },
    { name: 'Vehicle', href: '/faculty/vehicle', icon: Car },
    { name: 'Profile', href: '/faculty/profile', icon: User },
    { name: 'Help', href: '/faculty/help', icon: HelpCircle },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-t border-t border-gray-200 z-50">
      <div className="flex justify-around items-center py-2">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.href.split('/')[2];
          
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`
                flex flex-col items-center gap-1 p-2 rounded-lg transition-colors min-w-0 flex-1
                ${isActive 
                  ? 'text-blue-600 bg-blue-50' 
                  : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                }
              `}
            >
              <Icon className="w-6 h-6" />
              <span className="text-xs font-medium truncate">{item.name}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
