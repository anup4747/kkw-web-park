"use client";

import React, { useState, useMemo } from 'react';
import AdminSidebar from '../../components/AdminSidebar';
import AdminTopBar from '../../components/AdminTopBar';
import Card from '../../components/Card';
import { Shield, Search, User, Phone, Mail, MapPin, Clock, Eye, Plus } from 'lucide-react';
import Link from 'next/link';

// Mock data for security guards
const mockSecurityGuards = [
  {
    id: 's1',
    fullName: 'John Smith',
    email: 'john.smith@college.edu',
    phoneNumber: '+1 (555) 123-4567',
    employeeId: 'SEC-2024-001',
    profilePhoto: null,
    shiftSchedule: {
      startTime: '08:00',
      endTime: '16:00',
      workingDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    },
    assignedZone: 'Main Entrance Zone',
    certificationDetails: {
      licenseNumber: 'SL-2024-001',
      expiryDate: '2025-12-31',
      trainingCompleted: ['Basic Security Training', 'Emergency Response', 'First Aid Certification'],
    },
    status: 'active',
    joinDate: '2024-01-15',
  },
  {
    id: 's2',
    fullName: 'Sarah Johnson',
    email: 'sarah.johnson@college.edu',
    phoneNumber: '+1 (555) 234-5678',
    employeeId: 'SEC-2024-002',
    profilePhoto: null,
    shiftSchedule: {
      startTime: '16:00',
      endTime: '00:00',
      workingDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    },
    assignedZone: 'Faculty Parking Zone',
    certificationDetails: {
      licenseNumber: 'SL-2024-002',
      expiryDate: '2025-11-30',
      trainingCompleted: ['Basic Security Training', 'Crowd Control', 'Surveillance Systems'],
    },
    status: 'active',
    joinDate: '2024-02-01',
  },
  {
    id: 's3',
    fullName: 'Mike Davis',
    email: 'mike.davis@college.edu',
    phoneNumber: '+1 (555) 345-6789',
    employeeId: 'SEC-2024-003',
    profilePhoto: null,
    shiftSchedule: {
      startTime: '00:00',
      endTime: '08:00',
      workingDays: ['Saturday', 'Sunday'],
    },
    assignedZone: 'Student Parking Zone',
    certificationDetails: {
      licenseNumber: 'SL-2024-003',
      expiryDate: '2025-10-15',
      trainingCompleted: ['Basic Security Training', 'Emergency Response', 'Report Writing'],
    },
    status: 'active',
    joinDate: '2024-01-20',
  },
  {
    id: 's4',
    fullName: 'Lisa Wilson',
    email: 'lisa.wilson@college.edu',
    phoneNumber: '+1 (555) 456-7890',
    employeeId: 'SEC-2024-004',
    profilePhoto: null,
    shiftSchedule: {
      startTime: '12:00',
      endTime: '20:00',
      workingDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    },
    assignedZone: 'Visitor Parking Zone',
    certificationDetails: {
      licenseNumber: 'SL-2024-004',
      expiryDate: '2025-09-20',
      trainingCompleted: ['Basic Security Training', 'First Aid Certification', 'Conflict Resolution'],
    },
    status: 'inactive',
    joinDate: '2024-03-01',
  },
  {
    id: 's5',
    fullName: 'Robert Brown',
    email: 'robert.brown@college.edu',
    phoneNumber: '+1 (555) 567-8901',
    employeeId: 'SEC-2024-005',
    profilePhoto: null,
    shiftSchedule: {
      startTime: '06:00',
      endTime: '14:00',
      workingDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    },
    assignedZone: 'Bus Terminal Zone',
    certificationDetails: {
      licenseNumber: 'SL-2024-005',
      expiryDate: '2025-08-10',
      trainingCompleted: ['Basic Security Training', 'Emergency Response', 'Crowd Control', 'Surveillance Systems'],
    },
    status: 'active',
    joinDate: '2024-01-10',
  },
];

/**
 * Security Guards Management Page
 * Lists all security guards with search functionality
 * Clicking on a guard shows their detailed information
 */
export default function SecurityGuardsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');

  const filteredGuards = useMemo(() => {
    return mockSecurityGuards.filter(guard => {
      const matchesSearch = 
        guard.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        guard.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        guard.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        guard.assignedZone.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || guard.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    });
  }, [searchTerm, statusFilter]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">Active</span>;
      case 'inactive':
        return <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full">Inactive</span>;
      default:
        return <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">Unknown</span>;
    }
  };

  const getShiftDisplay = (schedule: any) => {
    const days = schedule.workingDays.join(', ');
    return `${schedule.startTime} - ${schedule.endTime} (${days})`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminSidebar currentPage="security" />
      
      <div className="lg:ml-64">
        <AdminTopBar title="Security Guards" />
        
        <main className="p-6">
          <div className="max-w-7xl mx-auto">
            {/* Header Section */}
            <div className="mb-8">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">Security Guards</h1>
                  <p className="text-gray-600 mt-1">Manage security personnel and their assignments</p>
                </div>
                <Link href="/admin/adduser/security">
                  <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    <Plus className="w-4 h-4" />
                    Add Security Guard
                  </button>
                </Link>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Guards</p>
                    <p className="text-2xl font-bold text-blue-600">{mockSecurityGuards.length}</p>
                  </div>
                  <Shield className="w-8 h-8 text-blue-600" />
                </div>
              </Card>
              <Card className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Active Guards</p>
                    <p className="text-2xl font-bold text-green-600">
                      {mockSecurityGuards.filter(g => g.status === 'active').length}
                    </p>
                  </div>
                  <User className="w-8 h-8 text-green-600" />
                </div>
              </Card>
              <Card className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">On Duty</p>
                    <p className="text-2xl font-bold text-orange-600">
                      {mockSecurityGuards.filter(g => g.status === 'active').length}
                    </p>
                  </div>
                  <Clock className="w-8 h-8 text-orange-600" />
                </div>
              </Card>
              <Card className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Zones Covered</p>
                    <p className="text-2xl font-bold text-purple-600">
                      {new Set(mockSecurityGuards.map(g => g.assignedZone)).size}
                    </p>
                  </div>
                  <MapPin className="w-8 h-8 text-purple-600" />
                </div>
              </Card>
            </div>

            {/* Search and Filter Section */}
            <Card className="p-6 mb-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Search by name, email, employee ID, or zone..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
                <div className="sm:w-48">
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value as 'all' | 'active' | 'inactive')}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="all">All Status</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>
            </Card>

            {/* Security Guards List */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredGuards.map((guard) => (
                <Link key={guard.id} href={`/admin/security/${guard.id}`}>
                  <Card hover className="p-6 cursor-pointer">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                          <Shield className="w-6 h-6 text-red-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{guard.fullName}</h3>
                          <p className="text-sm text-gray-600">{guard.employeeId}</p>
                        </div>
                      </div>
                      {getStatusBadge(guard.status)}
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Mail className="w-4 h-4" />
                        <span className="truncate">{guard.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Phone className="w-4 h-4" />
                        <span>{guard.phoneNumber}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <MapPin className="w-4 h-4" />
                        <span className="truncate">{guard.assignedZone}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Clock className="w-4 h-4" />
                        <span className="truncate">{getShiftDisplay(guard.shiftSchedule)}</span>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">
                          Joined: {new Date(guard.joinDate).toLocaleDateString()}
                        </span>
                        <div className="flex items-center gap-1 text-blue-600 text-sm font-medium">
                          <Eye className="w-4 h-4" />
                          View Details
                        </div>
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>

            {filteredGuards.length === 0 && (
              <Card className="p-12 text-center">
                <Shield className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No security guards found</h3>
                <p className="text-gray-600 mb-6">
                  {searchTerm || statusFilter !== 'all' 
                    ? 'Try adjusting your search criteria or filters.'
                    : 'Get started by adding your first security guard.'
                  }
                </p>
                {!searchTerm && statusFilter === 'all' && (
                  <Link href="/admin/adduser/security">
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                      Add Security Guard
                    </button>
                  </Link>
                )}
              </Card>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
