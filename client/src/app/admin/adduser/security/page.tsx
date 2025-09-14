"use client";

import React from 'react';
import AdminSidebar from '../../../components/AdminSidebar';
import AdminTopBar from '../../../components/AdminTopBar';
import SecurityForm from '../components/SecurityForm';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

/**
 * Security Guard Registration Page
 * Dedicated page for creating security guard accounts
 */
export default function SecurityRegistrationPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <AdminSidebar currentPage="adduser" />
      
      <div className="lg:ml-64">
        <AdminTopBar title="Add Security Guard" />
        
        <main className="p-6">
          <div className="max-w-4xl mx-auto">
            <div className="mb-6">
              <Link 
                href="/admin/adduser"
                className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                Back to User Management
              </Link>
            </div>

            <SecurityForm />
          </div>
        </main>
      </div>
    </div>
  );
}
