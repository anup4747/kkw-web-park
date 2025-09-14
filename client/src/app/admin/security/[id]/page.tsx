"use client";

import React from 'react';
import { useParams } from 'next/navigation';
import AdminSidebar from '../../../components/AdminSidebar';
import AdminTopBar from '../../../components/AdminTopBar';
import Card from '../../../components/Card';
import { 
  ArrowLeft, 
  Shield, 
  User, 
  Mail, 
  Phone, 
  IdCard, 
  MapPin, 
  Clock, 
  Award, 
  Calendar,
  Edit,
  Trash2
} from 'lucide-react';
import Link from 'next/link';

// Mock data for security guards (same as in the list page)
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
 * Security Guard Detail Page
 * Shows comprehensive information about a specific security guard
 */
export default function SecurityGuardDetailPage() {
  const params = useParams();
  const guardId = params?.id as string;
  
  const guard = mockSecurityGuards.find(g => g.id === guardId);

  if (!guard) {
    return (
      <div className="min-h-screen bg-gray-50">
        <AdminSidebar currentPage="security" />
        <div className="lg:ml-64">
          <AdminTopBar title="Security Guard Not Found" />
          <main className="p-6">
            <Card className="p-12 text-center">
              <Shield className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Security Guard Not Found</h3>
              <p className="text-gray-600 mb-6">The security guard you're looking for doesn't exist.</p>
              <Link href="/admin/security">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Back to Security Guards
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

  const getShiftDisplay = (schedule: any) => {
    const days = schedule.workingDays.join(', ');
    return `${schedule.startTime} - ${schedule.endTime}`;
  };

  const isLicenseExpiringSoon = (expiryDate: string) => {
    const expiry = new Date(expiryDate);
    const now = new Date();
    const daysUntilExpiry = Math.ceil((expiry.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    return daysUntilExpiry <= 30 && daysUntilExpiry > 0;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminSidebar currentPage="security" />
      
      <div className="lg:ml-64">
        <AdminTopBar title={`Security Guard - ${guard.fullName}`} />
        
        <main className="p-6">
          <div className="max-w-6xl mx-auto">
            {/* Back Button */}
            <div className="mb-6">
              <Link 
                href="/admin/security"
                className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                Back to Security Guards
              </Link>
            </div>

            {/* Header Section */}
            <Card className="p-6 mb-6">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                <div className="flex items-center gap-6">
                  <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center">
                    <Shield className="w-10 h-10 text-red-600" />
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h1 className="text-3xl font-bold text-gray-900">{guard.fullName}</h1>
                      {getStatusBadge(guard.status)}
                    </div>
                    <p className="text-lg text-gray-600">{guard.employeeId}</p>
                    <p className="text-gray-500">Security Guard</p>
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
                      <p className="font-medium text-gray-900">{guard.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-600">Phone</p>
                      <p className="font-medium text-gray-900">{guard.phoneNumber}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <IdCard className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-600">Employee ID</p>
                      <p className="font-medium text-gray-900">{guard.employeeId}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-600">Join Date</p>
                      <p className="font-medium text-gray-900">
                        {new Date(guard.joinDate).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Work Schedule */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-blue-600" />
                  Work Schedule
                </h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Shift Time</p>
                    <p className="font-medium text-gray-900">{getShiftDisplay(guard.shiftSchedule)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-2">Working Days</p>
                    <div className="flex flex-wrap gap-2">
                      {guard.shiftSchedule.workingDays.map((day) => (
                        <span key={day} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                          {day}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-600">Assigned Zone</p>
                      <p className="font-medium text-gray-900">{guard.assignedZone}</p>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Certifications */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
                  <Award className="w-5 h-5 text-blue-600" />
                  Certifications
                </h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">License Number</p>
                    <p className="font-medium text-gray-900">{guard.certificationDetails.licenseNumber}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Expiry Date</p>
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-gray-900">
                        {new Date(guard.certificationDetails.expiryDate).toLocaleDateString()}
                      </p>
                      {isLicenseExpiringSoon(guard.certificationDetails.expiryDate) && (
                        <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">
                          Expiring Soon
                        </span>
                      )}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-2">Training Completed</p>
                    <div className="space-y-1">
                      {guard.certificationDetails.trainingCompleted.map((training) => (
                        <div key={training} className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className="text-sm text-gray-700">{training}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Additional Information */}
            <Card className="p-6 mt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Additional Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Performance Metrics</h4>
                  <div className="space-y-2 text-sm text-gray-600">
                    <p>• Total Shifts Completed: 156</p>
                    <p>• Incident Reports Filed: 23</p>
                    <p>• Response Time Average: 2.3 minutes</p>
                    <p>• Zone Coverage: 98.5%</p>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Recent Activity</h4>
                  <div className="space-y-2 text-sm text-gray-600">
                    <p>• Last shift: Yesterday, 8:00 AM - 4:00 PM</p>
                    <p>• Last training: Emergency Response (2 weeks ago)</p>
                    <p>• Last incident: Parking violation (3 days ago)</p>
                    <p>• Next scheduled shift: Today, 8:00 AM - 4:00 PM</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
