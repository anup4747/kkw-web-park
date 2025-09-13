"use client";

import React from 'react';
import AdminSidebar from '../../app/components/admin/AdminSidebar';
import AdminTopBar from '../../app/components/admin/AdminTopBar';
import Card from '../../app/components/shared/Card';
import ParkingMap, { ParkingSlot } from '../../app/components/shared/ParkingMap';
import { 
  Users, 
  MapPin, 
  Shield, 
  TrendingUp, 
  AlertCircle,
  Clock,
  CheckCircle
} from 'lucide-react';

/**
 * Admin Dashboard page
 * Professional grid layout with metrics and parking map
 * Desktop-heavy design with responsive mobile support
 */
export default function AdminDashboard() {
  // Mock data for demonstration
  const stats = [
    { title: 'Total Users', value: '230', icon: Users, change: '+12%', changeType: 'positive' },
    { title: 'Parking Slots', value: '150', icon: MapPin, change: '+5%', changeType: 'positive' },
    { title: 'Security Guards', value: '20', icon: Shield, change: '0%', changeType: 'neutral' },
    { title: 'Occupancy Rate', value: '78%', icon: TrendingUp, change: '+3%', changeType: 'positive' },
  ];

  const recentActivities = [
    { id: 1, action: 'New faculty registration', user: 'Dr. Smith', time: '2 minutes ago', type: 'success' },
    { id: 2, action: 'Parking slot maintenance', user: 'Security Team', time: '15 minutes ago', type: 'warning' },
    { id: 3, action: 'Booking cancellation', user: 'Prof. Johnson', time: '1 hour ago', type: 'info' },
    { id: 4, action: 'System backup completed', user: 'System', time: '2 hours ago', type: 'success' },
  ];

  const parkingSlots: ParkingSlot[] = [
    { id: 'A1', status: 'free', position: { x: 30, y: 30 }, zone: 'A' },
    { id: 'A2', status: 'occupied', position: { x: 60, y: 30 }, zone: 'A' },
    { id: 'A3', status: 'reserved', position: { x: 90, y: 30 }, zone: 'A' },
    { id: 'A4', status: 'free', position: { x: 120, y: 30 }, zone: 'A' },
    { id: 'A5', status: 'occupied', position: { x: 150, y: 30 }, zone: 'A' },
    { id: 'B1', status: 'free', position: { x: 30, y: 130 }, zone: 'B' },
    { id: 'B2', status: 'occupied', position: { x: 60, y: 130 }, zone: 'B' },
    { id: 'B3', status: 'free', position: { x: 90, y: 130 }, zone: 'B' },
    { id: 'B4', status: 'reserved', position: { x: 120, y: 130 }, zone: 'B' },
    { id: 'B5', status: 'free', position: { x: 150, y: 130 }, zone: 'B' },
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'warning':
        return <AlertCircle className="w-4 h-4 text-yellow-500" />;
      case 'info':
        return <Clock className="w-4 h-4 text-blue-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminSidebar currentPage="dashboard" />
      
      <div className="lg:ml-64">
        <AdminTopBar title="Dashboard" />
        
        <main className="p-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card key={index} hover className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                      <p className="text-2xl font-bold text-blue-600">{stat.value}</p>
                      <p className={`text-sm ${
                        stat.changeType === 'positive' ? 'text-green-600' : 
                        stat.changeType === 'negative' ? 'text-red-600' : 'text-gray-600'
                      }`}>
                        {stat.change} from last month
                      </p>
                    </div>
                    <div className="p-3 bg-blue-100 rounded-lg">
                      <Icon className="w-6 h-6 text-blue-600" />
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Parking Map */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Parking Map</h3>
                <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                  View All Slots
                </button>
              </div>
              <ParkingMap 
                slots={parkingSlots} 
                className="w-full h-96"
                onSlotClick={(slotId) => console.log('Clicked slot:', slotId)}
              />
            </Card>

            {/* Recent Activities */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Activities</h3>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    {getActivityIcon(activity.type)}
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-800">{activity.action}</p>
                      <p className="text-xs text-gray-600">by {activity.user}</p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 text-sm text-blue-600 hover:text-blue-700 font-medium">
                View All Activities
              </button>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card className="p-6 mt-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <button className="p-4 bg-blue-50 hover:bg-blue-100 rounded-lg text-left transition-colors">
                <Users className="w-6 h-6 text-blue-600 mb-2" />
                <p className="font-medium text-gray-800">Add New User</p>
                <p className="text-sm text-gray-600">Register faculty or security</p>
              </button>
              <button className="p-4 bg-green-50 hover:bg-green-100 rounded-lg text-left transition-colors">
                <MapPin className="w-6 h-6 text-green-600 mb-2" />
                <p className="font-medium text-gray-800">Manage Slots</p>
                <p className="text-sm text-gray-600">Add or modify parking slots</p>
              </button>
              <button className="p-4 bg-yellow-50 hover:bg-yellow-100 rounded-lg text-left transition-colors">
                <Shield className="w-6 h-6 text-yellow-600 mb-2" />
                <p className="font-medium text-gray-800">Security Reports</p>
                <p className="text-sm text-gray-600">View security activities</p>
              </button>
              <button className="p-4 bg-purple-50 hover:bg-purple-100 rounded-lg text-left transition-colors">
                <TrendingUp className="w-6 h-6 text-purple-600 mb-2" />
                <p className="font-medium text-gray-800">Generate Report</p>
                <p className="text-sm text-gray-600">Create analytics report</p>
              </button>
            </div>
          </Card>
        </main>
      </div>
    </div>
  );
}
