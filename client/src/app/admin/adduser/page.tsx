"use client";

import React from 'react';
import AdminSidebar from '../../components/AdminSidebar';
import AdminTopBar from '../../components/AdminTopBar';
import Card from '../../components/Card';
import { Shield, Users, UserPlus } from 'lucide-react';
import Link from 'next/link';

/**
 * Admin Add User page
 * Role selection page for creating security guard or faculty member accounts
 * Redirects to specific form pages based on user selection
 */
export default function AddUserPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <AdminSidebar currentPage="adduser" />
      
      <div className="lg:ml-64">
        <AdminTopBar title="Add New User" />
        
        <main className="p-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                <UserPlus className="w-8 h-8 text-blue-600" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Add New User</h1>
              <p className="text-lg text-gray-600">Select the type of user account you want to create</p>
            </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Security Guard Option */}
                <Link href="/admin/adduser/security">
                  <Card hover className="p-8 cursor-pointer group">
                    <div className="text-center">
                      <div className="inline-flex items-center justify-center w-20 h-20 bg-red-100 rounded-full mb-6 group-hover:bg-red-200 transition-colors">
                        <Shield className="w-10 h-10 text-red-600" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">Security Guard</h3>
                      <p className="text-gray-600 mb-6 leading-relaxed">
                        Create an account for security personnel who will monitor parking areas, 
                        verify bookings, and manage on-site operations.
                      </p>
                      <div className="space-y-2 text-sm text-gray-500 text-left">
                        <p>• Full Name & Contact Information</p>
                        <p>• Employee ID & Badge Number</p>
                        <p>• Shift Schedule & Assigned Zones</p>
                        <p>• Security Certifications</p>
                        <p>• Profile Photo for Recognition</p>
                      </div>
                      <div className="mt-6">
                        <button className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
                          Create Security Account
                        </button>
                      </div>
                    </div>
                  </Card>
                </Link>

                {/* Faculty Member Option */}
                <Link href="/admin/adduser/faculty">
                  <Card hover className="p-8 cursor-pointer group">
                    <div className="text-center">
                      <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 rounded-full mb-6 group-hover:bg-blue-200 transition-colors">
                        <Users className="w-10 h-10 text-blue-600" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">Faculty Member</h3>
                      <p className="text-gray-600 mb-6 leading-relaxed">
                        Create an account for faculty members who will book parking spaces 
                        and manage their vehicle information.
                      </p>
                      <div className="space-y-2 text-sm text-gray-500 text-left">
                        <p>• Full Name & Contact Information</p>
                        <p>• Faculty ID & Department</p>
                        <p>• Vehicle Details & License Plate</p>
                        <p>• Profile Photo (Optional)</p>
                        <p>• Booking Preferences</p>
                      </div>
                      <div className="mt-6">
                        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
                          Create Faculty Account
                        </button>
                      </div>
                    </div>
                  </Card>
                </Link>
              </div>

              {/* Quick Stats */}
              <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="p-6 text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">20</div>
                  <div className="text-gray-600">Active Security Guards</div>
                </Card>
                <Card className="p-6 text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">180</div>
                  <div className="text-gray-600">Registered Faculty</div>
                </Card>
                <Card className="p-6 text-center">
                  <div className="text-3xl font-bold text-purple-600 mb-2">200</div>
                  <div className="text-gray-600">Total Users</div>
                </Card>
              </div>
            </div>
        </main>
      </div>
    </div>
  );
}
