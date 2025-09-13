"use client";

import React from 'react';
import FacultyHeader from '../../components/FacultyHeader';
import FacultyBottomNav from '../../components/FacultyBottomNav';
import Card from '../../components/Card';
import Button from '../../components/Button';
import StatusBadge from '../../components/StatusBadge';
import ParkingMap, { ParkingSlot } from '../../components/ParkingMap';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Car,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

/**
 * Faculty Dashboard page
 * Mobile-first design with friendly and clean interface
 * Uses blue/green palette as specified
 */
export default function FacultyDashboard() {
  // Mock data for demonstration
  const currentBooking = {
    id: 'BK001',
    slot: 'A3',
    zone: 'Zone A',
    date: '2024-01-15',
    time: '09:00 AM - 05:00 PM',
    status: 'confirmed'
  };

  const quickStats = [
    { label: 'This Month', value: '12', icon: Calendar, color: 'text-blue-600' },
    { label: 'Total Bookings', value: '45', icon: Clock, color: 'text-green-600' },
    { label: 'Success Rate', value: '98%', icon: CheckCircle, color: 'text-green-600' },
  ];

  const recentBookings = [
    { id: 'BK001', date: '2024-01-15', slot: 'A3', status: 'confirmed' },
    { id: 'BK002', date: '2024-01-14', slot: 'B1', status: 'completed' },
    { id: 'BK003', date: '2024-01-13', slot: 'A1', status: 'cancelled' },
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

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <FacultyHeader 
        title="Welcome Back!" 
        subtitle="Manage your parking bookings easily"
      />
      
      <main className="p-4 space-y-6">
        {/* Current Booking Status */}
        <Card className="p-6 bg-gradient-to-r from-blue-50 to-green-50 border-blue-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Current Booking</h2>
            <StatusBadge status={currentBooking.status} />
          </div>
          
          {currentBooking ? (
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="font-medium text-gray-800">Slot {currentBooking.slot} - {currentBooking.zone}</p>
                  <p className="text-sm text-gray-600">{currentBooking.date} • {currentBooking.time}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="success" size="sm" className="flex-1">
                  View Details
                </Button>
                <Button variant="danger" size="sm" className="flex-1">
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <div className="text-center py-4">
              <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-600 mb-4">No active booking</p>
              <Button variant="success" className="w-full">
                Book Now
              </Button>
            </div>
          )}
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4">
          {quickStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="p-4 text-center">
                <Icon className={`w-6 h-6 ${stat.color} mx-auto mb-2`} />
                <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                <p className="text-xs text-gray-600">{stat.label}</p>
              </Card>
            );
          })}
        </div>

        {/* Parking Map */}
        <Card className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Live Parking Map</h3>
            <Button variant="secondary" size="sm">
              Refresh
            </Button>
          </div>
          <ParkingMap 
            slots={parkingSlots} 
            className="w-full h-48"
            onSlotClick={(slotId) => console.log('Clicked slot:', slotId)}
          />
        </Card>

        {/* Recent Bookings */}
        <Card className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Recent Bookings</h3>
            <Button variant="secondary" size="sm">
              View All
            </Button>
          </div>
          <div className="space-y-3">
            {recentBookings.map((booking) => (
              <div key={booking.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Car className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">Booking {booking.id}</p>
                    <p className="text-sm text-gray-600">{booking.date} • Slot {booking.slot}</p>
                  </div>
                </div>
                <StatusBadge status={booking.status} />
              </div>
            ))}
          </div>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          <Button variant="success" className="py-4 text-lg">
            <Calendar className="w-5 h-5 mr-2" />
            Book Slot
          </Button>
          <Button variant="secondary" className="py-4 text-lg">
            <Clock className="w-5 h-5 mr-2" />
            View History
          </Button>
        </div>

        {/* Notifications */}
        <Card className="p-4 bg-yellow-50 border-yellow-200">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
            <div>
              <h4 className="font-medium text-yellow-800">Parking Reminder</h4>
              <p className="text-sm text-yellow-700">
                Your parking slot A3 expires in 2 hours. Please extend your booking if needed.
              </p>
            </div>
          </div>
        </Card>
      </main>

      <FacultyBottomNav currentPage="dashboard" />
    </div>
  );
}
