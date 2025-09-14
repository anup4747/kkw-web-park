"use client";

import React, { useState, useMemo } from 'react';
import AdminSidebar from '../../components/AdminSidebar';
import AdminTopBar from '../../components/AdminTopBar';
import Card from '../../components/Card';
import { Users, Search, User, Phone, Mail, Building, Car, Eye, Plus } from 'lucide-react';
import Link from 'next/link';

// Mock data for faculty members
const mockFacultyMembers = [
  {
    id: 'f1',
    fullName: 'Dr. Sarah Johnson',
    email: 'sarah.johnson@college.edu',
    phoneNumber: '+1 (555) 123-4567',
    facultyId: 'FAC-2024-001',
    profilePhoto: null,
    department: 'Computer Science',
    vehicleDetails: {
      licensePlate: 'ABC-1234',
      vehicleModel: 'Honda Civic',
      vehicleColor: 'White',
      vehicleYear: '2020',
    },
    status: 'active',
    joinDate: '2024-01-15',
    lastBooking: '2024-12-15',
    totalBookings: 45,
  },
  {
    id: 'f2',
    fullName: 'Prof. Michael Chen',
    email: 'michael.chen@college.edu',
    phoneNumber: '+1 (555) 234-5678',
    facultyId: 'FAC-2024-002',
    profilePhoto: null,
    department: 'Information Technology',
    vehicleDetails: {
      licensePlate: 'XYZ-5678',
      vehicleModel: 'Toyota Camry',
      vehicleColor: 'Black',
      vehicleYear: '2019',
    },
    status: 'active',
    joinDate: '2024-02-01',
    lastBooking: '2024-12-14',
    totalBookings: 38,
  },
  {
    id: 'f3',
    fullName: 'Dr. Emily Rodriguez',
    email: 'emily.rodriguez@college.edu',
    phoneNumber: '+1 (555) 345-6789',
    facultyId: 'FAC-2024-003',
    profilePhoto: null,
    department: 'Electronics & Communication',
    vehicleDetails: {
      licensePlate: 'DEF-9012',
      vehicleModel: 'Nissan Altima',
      vehicleColor: 'Silver',
      vehicleYear: '2021',
    },
    status: 'active',
    joinDate: '2024-01-20',
    lastBooking: '2024-12-13',
    totalBookings: 52,
  },
  {
    id: 'f4',
    fullName: 'Prof. David Wilson',
    email: 'david.wilson@college.edu',
    phoneNumber: '+1 (555) 456-7890',
    facultyId: 'FAC-2024-004',
    profilePhoto: null,
    department: 'Mechanical Engineering',
    vehicleDetails: {
      licensePlate: 'GHI-3456',
      vehicleModel: 'Ford Focus',
      vehicleColor: 'Blue',
      vehicleYear: '2018',
    },
    status: 'inactive',
    joinDate: '2024-03-01',
    lastBooking: '2024-11-20',
    totalBookings: 12,
  },
  {
    id: 'f5',
    fullName: 'Dr. Lisa Thompson',
    email: 'lisa.thompson@college.edu',
    phoneNumber: '+1 (555) 567-8901',
    facultyId: 'FAC-2024-005',
    profilePhoto: null,
    department: 'Business Administration',
    vehicleDetails: {
      licensePlate: 'JKL-7890',
      vehicleModel: 'Hyundai Elantra',
      vehicleColor: 'Red',
      vehicleYear: '2022',
    },
    status: 'active',
    joinDate: '2024-01-10',
    lastBooking: '2024-12-15',
    totalBookings: 67,
  },
  {
    id: 'f6',
    fullName: 'Prof. James Anderson',
    email: 'james.anderson@college.edu',
    phoneNumber: '+1 (555) 678-9012',
    facultyId: 'FAC-2024-006',
    profilePhoto: null,
    department: 'Mathematics',
    vehicleDetails: {
      licensePlate: 'MNO-2468',
      vehicleModel: 'Chevrolet Malibu',
      vehicleColor: 'Gray',
      vehicleYear: '2020',
    },
    status: 'active',
    joinDate: '2024-02-15',
    lastBooking: '2024-12-12',
    totalBookings: 29,
  },
  {
    id: 'f7',
    fullName: 'Dr. Maria Garcia',
    email: 'maria.garcia@college.edu',
    phoneNumber: '+1 (555) 789-0123',
    facultyId: 'FAC-2024-007',
    profilePhoto: null,
    department: 'Physics',
    vehicleDetails: {
      licensePlate: 'PQR-1357',
      vehicleModel: 'Volkswagen Jetta',
      vehicleColor: 'White',
      vehicleYear: '2021',
    },
    status: 'active',
    joinDate: '2024-01-25',
    lastBooking: '2024-12-14',
    totalBookings: 41,
  },
  {
    id: 'f8',
    fullName: 'Prof. Robert Kim',
    email: 'robert.kim@college.edu',
    phoneNumber: '+1 (555) 890-1234',
    facultyId: 'FAC-2024-008',
    profilePhoto: null,
    department: 'Civil Engineering',
    vehicleDetails: {
      licensePlate: 'STU-9753',
      vehicleModel: 'Mazda CX-5',
      vehicleColor: 'Black',
      vehicleYear: '2019',
    },
    status: 'active',
    joinDate: '2024-03-10',
    lastBooking: '2024-12-11',
    totalBookings: 33,
  },
];

/**
 * Faculty Members Management Page
 * Lists all faculty members with search functionality
 * Clicking on a faculty member shows their detailed information
 */
export default function FacultyMembersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');
  const [departmentFilter, setDepartmentFilter] = useState<string>('all');

  const departments = ['all', ...Array.from(new Set(mockFacultyMembers.map(f => f.department)))];

  const filteredFaculty = useMemo(() => {
    return mockFacultyMembers.filter(faculty => {
      const matchesSearch = 
        faculty.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faculty.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faculty.facultyId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faculty.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faculty.vehicleDetails.licensePlate.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || faculty.status === statusFilter;
      const matchesDepartment = departmentFilter === 'all' || faculty.department === departmentFilter;
      
      return matchesSearch && matchesStatus && matchesDepartment;
    });
  }, [searchTerm, statusFilter, departmentFilter]);

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

  const getDepartmentColor = (department: string) => {
    const colors = {
      'Computer Science': 'bg-blue-100 text-blue-800',
      'Information Technology': 'bg-purple-100 text-purple-800',
      'Electronics & Communication': 'bg-green-100 text-green-800',
      'Mechanical Engineering': 'bg-orange-100 text-orange-800',
      'Business Administration': 'bg-pink-100 text-pink-800',
      'Mathematics': 'bg-indigo-100 text-indigo-800',
      'Physics': 'bg-yellow-100 text-yellow-800',
      'Civil Engineering': 'bg-teal-100 text-teal-800',
    };
    return colors[department as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminSidebar currentPage="faculty" />
      
      <div className="lg:ml-64">
        <AdminTopBar title="Faculty Members" />
        
        <main className="p-6">
          <div className="max-w-7xl mx-auto">
            {/* Header Section */}
            <div className="mb-8">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">Faculty Members</h1>
                  <p className="text-gray-600 mt-1">Manage faculty members and their parking information</p>
                </div>
                <Link href="/admin/adduser/faculty">
                  <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    <Plus className="w-4 h-4" />
                    Add Faculty Member
                  </button>
                </Link>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Faculty</p>
                    <p className="text-2xl font-bold text-blue-600">{mockFacultyMembers.length}</p>
                  </div>
                  <Users className="w-8 h-8 text-blue-600" />
                </div>
              </Card>
              <Card className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Active Faculty</p>
                    <p className="text-2xl font-bold text-green-600">
                      {mockFacultyMembers.filter(f => f.status === 'active').length}
                    </p>
                  </div>
                  <User className="w-8 h-8 text-green-600" />
                </div>
              </Card>
              <Card className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Departments</p>
                    <p className="text-2xl font-bold text-purple-600">
                      {new Set(mockFacultyMembers.map(f => f.department)).size}
                    </p>
                  </div>
                  <Building className="w-8 h-8 text-purple-600" />
                </div>
              </Card>
              <Card className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Bookings</p>
                    <p className="text-2xl font-bold text-orange-600">
                      {mockFacultyMembers.reduce((sum, f) => sum + f.totalBookings, 0)}
                    </p>
                  </div>
                  <Car className="w-8 h-8 text-orange-600" />
                </div>
              </Card>
            </div>

            {/* Search and Filter Section */}
            <Card className="p-6 mb-6">
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Search by name, email, faculty ID, department, or license plate..."
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
                <div className="sm:w-48">
                  <select
                    value={departmentFilter}
                    onChange={(e) => setDepartmentFilter(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="all">All Departments</option>
                    {departments.slice(1).map((dept) => (
                      <option key={dept} value={dept}>{dept}</option>
                    ))}
                  </select>
                </div>
              </div>
            </Card>

            {/* Faculty Members List */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredFaculty.map((faculty) => (
                <Link key={faculty.id} href={`/admin/faculty/${faculty.id}`}>
                  <Card hover className="p-6 cursor-pointer">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                          <Users className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{faculty.fullName}</h3>
                          <p className="text-sm text-gray-600">{faculty.facultyId}</p>
                        </div>
                      </div>
                      {getStatusBadge(faculty.status)}
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Mail className="w-4 h-4" />
                        <span className="truncate">{faculty.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Phone className="w-4 h-4" />
                        <span>{faculty.phoneNumber}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Building className="w-4 h-4" />
                        <span className="truncate">{faculty.department}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Car className="w-4 h-4" />
                        <span className="truncate">{faculty.vehicleDetails.licensePlate} - {faculty.vehicleDetails.vehicleModel}</span>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getDepartmentColor(faculty.department)}`}>
                            {faculty.department}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 text-blue-600 text-sm font-medium">
                          <Eye className="w-4 h-4" />
                          View Details
                        </div>
                      </div>
                      <div className="mt-2 text-xs text-gray-500">
                        {faculty.totalBookings} bookings • Last: {new Date(faculty.lastBooking).toLocaleDateString()}
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>

            {filteredFaculty.length === 0 && (
              <Card className="p-12 text-center">
                <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No faculty members found</h3>
                <p className="text-gray-600 mb-6">
                  {searchTerm || statusFilter !== 'all' || departmentFilter !== 'all'
                    ? 'Try adjusting your search criteria or filters.'
                    : 'Get started by adding your first faculty member.'
                  }
                </p>
                {!searchTerm && statusFilter === 'all' && departmentFilter === 'all' && (
                  <Link href="/admin/adduser/faculty">
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                      Add Faculty Member
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
