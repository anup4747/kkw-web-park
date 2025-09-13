"use client";

import React from 'react';
import Link from 'next/link';
import { Shield, Users, UserCheck, ArrowRight, Building2, Car, Eye } from 'lucide-react';

export default function RoleSelector() {
  const roles = [
    {
      title: 'Administrator',
      description: 'Manage users, parking slots, and system settings',
      icon: Shield,
      color: 'blue',
      href: '/admin/dashboard',
      features: ['User Management', 'Slot Configuration', 'Reports & Analytics', 'System Settings'],
      userCount: '10 Admins'
    },
    {
      title: 'Faculty Member',
      description: 'Book parking slots and manage your reservations',
      icon: Users,
      color: 'green',
      href: '/faculty/dashboard',
      features: ['Book Slots', 'View History', 'Vehicle Management', 'Profile Settings'],
      userCount: '200 Faculty'
    },
    {
      title: 'Security Guard',
      description: 'Verify bookings and monitor parking areas',
      icon: UserCheck,
      color: 'gray',
      href: '/security/dashboard',
      features: ['QR Verification', 'Slot Monitoring', 'Shift Logging', 'Emergency Alerts'],
      userCount: '20 Security Guards'
    }
  ];

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'blue':
        return {
          bg: 'professional-card border-blue-200 hover:border-blue-300',
          icon: 'text-blue-600',
          button: 'bg-blue-600 hover:bg-blue-700',
          accent: 'text-blue-600',
          badge: 'bg-blue-100 text-blue-800 border-blue-200'
        };
      case 'green':
        return {
          bg: 'professional-card border-green-200 hover:border-green-300',
          icon: 'text-green-600',
          button: 'bg-green-600 hover:bg-green-700',
          accent: 'text-green-600',
          badge: 'bg-green-100 text-green-800 border-green-200'
        };
      case 'gray':
        return {
          bg: 'professional-card border-gray-200 hover:border-gray-300',
          icon: 'text-gray-600',
          button: 'bg-gray-600 hover:bg-gray-700',
          accent: 'text-gray-600',
          badge: 'bg-gray-100 text-gray-800 border-gray-200'
        };
      default:
        return {
          bg: 'professional-card border-gray-200 hover:border-gray-300',
          icon: 'text-gray-600',
          button: 'bg-gray-600 hover:bg-gray-700',
          accent: 'text-gray-600',
          badge: 'bg-gray-100 text-gray-800 border-gray-200'
        };
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 professional-grid">

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4 professional-heading">
            Choose Your Role
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto professional-text">
            Access the parking management system tailored to your specific needs and responsibilities.
          </p>
        </div>

        {/* Role Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {roles.map((role, index) => {
            const Icon = role.icon;
            const colors = getColorClasses(role.color);
            
            return (
              <div 
                key={index} 
                className={`p-8 ${colors.bg} hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group`}
              >
                <div className="text-center mb-6">
                  <div className={`w-16 h-16 ${role.color === 'blue' ? 'bg-gradient-to-r from-blue-500 to-blue-600' : role.color === 'green' ? 'bg-gradient-to-r from-green-500 to-green-600' : 'bg-gradient-to-r from-gray-500 to-gray-600'} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className={`text-2xl font-bold text-gray-800 mb-2 group-hover:${role.color === 'blue' ? 'text-blue-600' : role.color === 'green' ? 'text-green-600' : 'text-gray-600'} transition-colors professional-heading`}>{role.title}</h3>
                  <p className="text-gray-600 mb-4 professional-text">{role.description}</p>
                  <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${colors.badge}`}>
                    {role.userCount}
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="font-semibold text-gray-800 mb-3 professional-heading">Key Features:</h4>
                  <ul className="space-y-2">
                    {role.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-2 text-sm text-gray-600 professional-text">
                        <div className={`w-1.5 h-1.5 rounded-full bg-${role.color}-400`}></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <Link href={role.href}>
                  <button 
                    className={`w-full py-3 text-white ${colors.button} flex items-center justify-center gap-2 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl`}
                  >
                    Access Dashboard
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </Link>
              </div>
            );
          })}
        </div>


      </main>

      {/* Footer */}
      <footer className="professional-card border-t border-gray-200 mt-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center">
            <p className="text-sm text-gray-600">
              © 2024 KKW College Parking Management System. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}