"use client";

import React from 'react';
import { useParams } from 'next/navigation';
import AdminSidebar from '../../../components/AdminSidebar';
import AdminTopBar from '../../../components/AdminTopBar';
import Card from '../../../components/Card';
import { 
  ArrowLeft, 
  Users, 
  User, 
  Mail, 
  Phone, 
  IdCard, 
  Building, 
  Car, 
  Calendar,
  Edit,
  Trash2,
  MapPin,
  Clock
} from 'lucide-react';
import Link from 'next/link';

// Mock data for faculty members (same as in the list page)
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
 * Faculty Member Detail Page
 * Shows comprehensive information about a specific faculty member
 */
export default function FacultyMemberDetailPage() {
  const params = useParams();
  const facultyId = params?.id as string;
  
  const faculty = mockFacultyMembers.find(f => f.id === facultyId);

  if (!faculty) {
    return (
      <div className="min-h-screen bg-gray-50">
        <AdminSidebar currentPage="faculty" />
        <div className="lg:ml-64">
          <AdminTopBar title="Faculty Member Not Found" />
          <main className="p-6">
            <Card className="p-12 text-center">
              <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Faculty Member Not Found</h3>
              <p className="text-gray-600 mb-6">The faculty member you're looking for doesn't exist.</p>
              <Link href="/admin/faculty">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Back to Faculty Members
                </button>
              </Link>
            </Card>
          </main>
        </div>
      </div>
    );
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <span className="px-3 py-1 text-sm font-medium bg-green-100 text-green-800 rounded-full">Active</span>;
      case 'inactive':
        return <span className="px-3 py-1 text-sm font-medium bg-red-100 text-red-800 rounded-full">Inactive</span>;
      default:
        return <span className="px-3 py-1 text-sm font-medium bg-gray-100 text-gray-800 rounded-full">Unknown</span>;
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
        <AdminTopBar title={`Faculty Member - ${faculty.fullName}`} />
        
        <main className="p-6">
          <div className="max-w-6xl mx-auto">
            {/* Back Button */}
            <div className="mb-6">
              <Link 
                href="/admin/faculty"
                className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                Back to Faculty Members
              </Link>
            </div>

            {/* Header Section */}
            <Card className="p-6 mb-6">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                <div className="flex items-center gap-6">
                  <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
                    <Users className="w-10 h-10 text-blue-600" />
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h1 className="text-3xl font-bold text-gray-900">{faculty.fullName}</h1>
                      {getStatusBadge(faculty.status)}
                    </div>
                    <p className="text-lg text-gray-600">{faculty.facultyId}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`px-2 py-1 text-sm font-medium rounded-full ${getDepartmentColor(faculty.department)}`}>
                        {faculty.department}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                    <Edit className="w-4 h-4" />
                    Edit
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 border border-red-300 text-red-700 rounded-lg hover:bg-red-50 transition-colors">
                    <Trash2 className="w-4 h-4" />
                    Deactivate
                  </button>
                </div>
              </div>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Personal Information */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
                  <User className="w-5 h-5 text-blue-600" />
                  Personal Information
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-600">Email</p>
                      <p className="font-medium text-gray-900">{faculty.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-600">Phone</p>
                      <p className="font-medium text-gray-900">{faculty.phoneNumber}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <IdCard className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-600">Faculty ID</p>
                      <p className="font-medium text-gray-900">{faculty.facultyId}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-600">Join Date</p>
                      <p className="font-medium text-gray-900">
                        {new Date(faculty.joinDate).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Department Information */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
                  <Building className="w-5 h-5 text-blue-600" />
                  Department Information
                </h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Department</p>
                    <div className="flex items-center gap-2">
                      <span className={`px-3 py-1 text-sm font-medium rounded-full ${getDepartmentColor(faculty.department)}`}>
                        {faculty.department}
                      </span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-2">Department Head</p>
                    <p className="font-medium text-gray-900">Dr. Department Head</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-2">Office Location</p>
                    <p className="font-medium text-gray-900">Building A, Room 205</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-2">Office Hours</p>
                    <p className="font-medium text-gray-900">Monday - Friday, 9:00 AM - 5:00 PM</p>
                  </div>
                </div>
              </Card>

              {/* Vehicle Information */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
                  <Car className="w-5 h-5 text-blue-600" />
                  Vehicle Information
                </h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">License Plate</p>
                    <p className="font-medium text-gray-900 text-lg">{faculty.vehicleDetails.licensePlate}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Vehicle Model</p>
                    <p className="font-medium text-gray-900">{faculty.vehicleDetails.vehicleModel}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Color</p>
                    <p className="font-medium text-gray-900">{faculty.vehicleDetails.vehicleColor}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Year</p>
                    <p className="font-medium text-gray-900">{faculty.vehicleDetails.vehicleYear}</p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Parking Statistics */}
            <Card className="p-6 mt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Parking Statistics</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <p className="text-2xl font-bold text-blue-600">{faculty.totalBookings}</p>
                  <p className="text-sm text-gray-600">Total Bookings</p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <p className="text-2xl font-bold text-green-600">
                    {Math.round((faculty.totalBookings / 365) * 100)}%
                  </p>
                  <p className="text-sm text-gray-600">Booking Frequency</p>
                </div>
                <div className="text-center p-4 bg-orange-50 rounded-lg">
                  <p className="text-2xl font-bold text-orange-600">
                    {new Date(faculty.lastBooking).toLocaleDateString()}
                  </p>
                  <p className="text-sm text-gray-600">Last Booking</p>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <p className="text-2xl font-bold text-purple-600">4.2</p>
                  <p className="text-sm text-gray-600">Avg. Hours/Booking</p>
                </div>
              </div>
            </Card>

            {/* Recent Activity */}
            <Card className="p-6 mt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Recent Activity</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">Parking booking confirmed</p>
                    <p className="text-sm text-gray-600">Zone A, Spot 15 • {new Date(faculty.lastBooking).toLocaleDateString()}</p>
                  </div>
                  <Clock className="w-4 h-4 text-gray-400" />
                </div>
                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">Vehicle information updated</p>
                    <p className="text-sm text-gray-600">License plate verification completed • 3 days ago</p>
                  </div>
                  <Car className="w-4 h-4 text-gray-400" />
                </div>
                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">Parking session completed</p>
                    <p className="text-sm text-gray-600">Duration: 6 hours 30 minutes • 1 week ago</p>
                  </div>
                  <MapPin className="w-4 h-4 text-gray-400" />
                </div>
              </div>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
