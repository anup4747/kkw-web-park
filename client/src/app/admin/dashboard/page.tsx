"use client";

import React from 'react';
import { useState } from 'react';
import AdminSidebar from '../../components/AdminSidebar';
import AdminTopBar from '../../components/AdminTopBar';
import Card from '../../components/Card';
import ParkingMap, { ParkingSlot } from '../../components/ParkingMap';
import {
  Users,
  MapPin,
  Shield,
  TrendingUp,
  AlertCircle,
  Clock,
  CheckCircle,
  Bus,
  Car,
  Building,
  MessageSquareWarning,

} from 'lucide-react';
import { Bus_type, Slot, ParkingSpot } from "@/types/types";
import Link from 'next/link';
import Chart from 'react-apexcharts';

function BasicSplineChart() {
  const [chartData] = useState({
    series: [{
      name: 'Sales',
      data: [30, 40, 35, 50, 49, 60, 70, 91, 125],
    }],
    options: {
      chart: {
        id: 'basic-spline',
      },
      title: {
        text: 'Monthly Sales Report',
        align: 'left' as const,
      },
      xaxis: {
        categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999],
      },
      stroke: {
        curve: 'smooth' as const, // This is the key setting for a spline chart
      },
      tooltip: {
        x: {
          format: 'yyyy',
        },
      },
    },
  });

  return (
    <div className="chart-container">
      <Chart
        options={chartData.options}
        series={chartData.series}
        type="line"
        height={350}
      />
    </div>
  );
}
/**
 * Admin Dashboard page
 * Professional and structured layout with clean design
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

  const [parkingSpots, setParkingSpots] = useState<ParkingSpot[]>([
    // Upper side - 20 car spots
    ...Array.from({ length: 20 }, (_, i) => ({
      id: `upper-${i + 1}`,
      occupied: Math.random() > 0.6,
      type: 'car' as const,
      zone: 'Upper Side'
    })),
    // Lower side - 20 car spots
    ...Array.from({ length: 20 }, (_, i) => ({
      id: `lower-${i + 1}`,
      occupied: Math.random() > 0.5,
      type: 'car' as const,
      zone: 'Lower Side'
    })),
    // Left side - 6 faculty spots
    ...Array.from({ length: 6 }, (_, i) => ({
      id: `faculty-${i + 1}`,
      occupied: Math.random() > 0.3,
      type: 'faculty' as const,
      zone: 'Faculty Area'
    })),
    // Right side - 4 bus spots
    ...Array.from({ length: 4 }, (_, i) => ({
      id: `bus-${i + 1}`,
      occupied: Math.random() > 0.4,
      type: 'bus' as const,
      zone: 'Bus Terminal'
    }))
  ]);

  const [slots, setSlots] = useState<Slot[]>([
    { name: "Slot A", occupied: 5, capacity: 20, location: "Lower Side", guestSlots: 6, guestOccupied: 2 },
    { name: "Slot B", occupied: 3, capacity: 6, location: "Left Side - Faculty" },
    { name: "Slot C", occupied: 12, capacity: 20, location: "Upper Side" },
    { name: "Slot D", occupied: 2, capacity: 4, location: "Right Side - Buses" },
  ]);

  const [buses] = useState<Bus_type[]>([
    { id: 'B001', route: 'Route A - Downtown', status: 'active', driver: 'John Smith', capacity: 50, currentPassengers: 32 },
    { id: 'B002', route: 'Route B - Campus Loop', status: 'active', driver: 'Sarah Johnson', capacity: 45, currentPassengers: 28 },
    { id: 'B003', route: 'Route C - Residential', status: 'maintenance', driver: 'Mike Davis', capacity: 40, currentPassengers: 0 },
    { id: 'B004', route: 'Route D - Express', status: 'offline', driver: 'Lisa Wilson', capacity: 35, currentPassengers: 0 }
  ]);

  const toggleSpot = (spotId: string) => {
    setParkingSpots(prev =>
      prev.map(spot =>
        spot.id === spotId ? { ...spot, occupied: !spot.occupied } : spot
      )
    );
  };

  const getSpotColor = (spot: ParkingSpot) => {
    if (spot.type === 'faculty') {
      return spot.occupied ? 'bg-blue-500' : 'bg-blue-200';
    } else if (spot.type === 'bus') {
      return spot.occupied ? 'bg-purple-500' : 'bg-purple-200';
    } else {
      return spot.occupied ? 'bg-red-500' : 'bg-green-200';
    }
  };

  const getSpotIcon = (spot: ParkingSpot) => {
    if (spot.type === 'faculty') {
      return <Users className="w-3 h-3" />;
    } else if (spot.type === 'bus') {
      return <Bus className="w-3 h-3" />;
    } else {
      return <Car className="w-3 h-3" />;
    }
  };

  const getBusStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-100';
      case 'maintenance': return 'text-yellow-600 bg-yellow-100';
      case 'offline': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getBusStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="w-4 h-4" />;
      case 'maintenance': return <AlertCircle className="w-4 h-4" />;
      case 'offline': return <AlertCircle className="w-4 h-4" />;
      default: return <AlertCircle className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
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
                      <p className={`text-sm ${stat.changeType === 'positive' ? 'text-green-600' :
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

          {/* Masonry Layout */}
          <div className="masonry-grid">
            {/* Daily Bookings Chart - Large Card */}
            <Card className="p-6 masonry-item masonry-item-large">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-2 bg-blue-600 rounded-lg shadow-2xl">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-slate-800">Daily Bookings</h2>
              </div>
              <BasicSplineChart />
            </Card>

            {/* Parking Map - Large Card */}
            <Card className="p-6 masonry-item masonry-item-large">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-2 bg-blue-600 rounded-lg shadow-2xl">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-black">Campus Parking Map</h2>
              </div>

              <div className="overflow-x-auto overflow-y-hidden flex items-center scale-[0.95]">
                <div className="relative bg-slate-100 rounded-lg min-w-[800px] min-h-[600px] w-full p-16">
                  <div className="relative w-full h-96 bg-gradient-to-br from-emerald-50 to-teal-50 border-4 border-emerald-300 rounded-lg mx-auto">

                    <div className="absolute inset-4 bg-white border-2 border-slate-300 rounded-lg flex items-center justify-center">
                      <div className="text-center">
                        <Building className="w-12 h-12 text-slate-400 mx-auto mb-2" />
                        <p className="text-slate-600 font-semibold">KKW College Ground</p>
                      </div>
                    </div>

                    <div className="absolute -top-3 left-8 right-8">
                      <div className="flex justify-between gap-1">
                        {Array.from({ length: 20 }, (_, i) => {
                          const spot = parkingSpots.find(s => s.id === `upper-${i + 1}`);
                          return (
                            <button
                              key={`upper-${i + 1}`}
                              onClick={() => toggleSpot(`upper-${i + 1}`)}
                              className={`w-8 h-8 rounded-lg border-2 border-slate-400 flex items-center justify-center text-white text-xs font-bold hover:scale-110 transition-all duration-200 shadow-sm ${getSpotColor(spot!)}`}
                              title={`Upper Side Spot ${i + 1} - ${spot?.occupied ? 'Occupied' : 'Available'}`}
                            >
                              {getSpotIcon(spot!)}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div className="absolute -bottom-3 left-8 right-8">
                      <div className="flex justify-between gap-1">
                        {Array.from({ length: 20 }, (_, i) => {
                          const spot = parkingSpots.find(s => s.id === `lower-${i + 1}`);
                          return (
                            <button
                              key={`lower-${i + 1}`}
                              onClick={() => toggleSpot(`lower-${i + 1}`)}
                              className={`w-8 h-8 rounded-lg border-2 border-slate-400 flex items-center justify-center text-white text-xs font-bold hover:scale-110 transition-all duration-200 shadow-sm ${getSpotColor(spot!)}`}
                              title={`Lower Side Spot ${i + 1} - ${spot?.occupied ? 'Occupied' : 'Available'}`}
                            >
                              {getSpotIcon(spot!)}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                    <div className="absolute -left-3 top-8 bottom-8">
                      <div className="flex flex-col justify-between h-full gap-1">
                        {Array.from({ length: 6 }, (_, i) => {
                          const spot = parkingSpots.find(s => s.id === `faculty-${i + 1}`);
                          return (
                            <button
                              key={`faculty-${i + 1}`}
                              onClick={() => toggleSpot(`faculty-${i + 1}`)}
                              className={`w-8 h-8 rounded-lg border-2 border-slate-400 flex items-center justify-center text-white text-xs font-bold hover:scale-110 transition-all duration-200 shadow-sm ${getSpotColor(spot!)}`}
                              title={`Faculty Spot ${i + 1} - ${spot?.occupied ? 'Occupied' : 'Available'}`}
                            >
                              {getSpotIcon(spot!)}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div className="absolute -right-3 top-8 bottom-8">
                      <div className="flex flex-col justify-between h-full gap-1">
                        {Array.from({ length: 4 }, (_, i) => {
                          const spot = parkingSpots.find(s => s.id === `bus-${i + 1}`);
                          return (
                            <button
                              key={`bus-${i + 1}`}
                              onClick={() => toggleSpot(`bus-${i + 1}`)}
                              className={`w-8 h-8 rounded-lg border-2 border-slate-400 flex items-center justify-center text-white text-xs font-bold hover:scale-110 transition-all duration-200 shadow-sm ${getSpotColor(spot!)}`}
                              title={`Bus Spot ${i + 1} - ${spot?.occupied ? 'Occupied' : 'Available'}`}
                            >
                              {getSpotIcon(spot!)}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div className="absolute -top-14 left-1/2 transform -translate-x-1/2 text-sm font-semibold text-slate-700 bg-white px-3 py-1 rounded-full shadow-sm">
                      Upper Side (20 Cars)
                    </div>
                    <div className="absolute -bottom-14 left-1/2 transform -translate-x-1/2 text-sm font-semibold text-slate-700 bg-white px-3 py-1 rounded-full shadow-sm">
                      Lower Side (20 Cars)
                    </div>
                    <div className="absolute left-6 top-1/2 transform -translate-y-1/2 -translate-x-20 text-sm font-semibold text-slate-700 bg-white px-3 py-1 rounded-full shadow-sm" style={{ writingMode: 'vertical-rl' }}>
                      Faculty (6)
                    </div>
                    <div className="absolute right-6 top-1/2 transform -translate-y-1/2 translate-x-20 text-sm font-semibold text-slate-700 bg-white px-3 py-1 rounded-full shadow-sm" style={{ writingMode: 'vertical-rl' }}>
                      Bus Terminal (4)
                    </div>

                  </div>

                  <div className="mt-16 flex flex-wrap gap-6 justify-center">
                    <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-lg shadow-sm">
                      <div className="w-6 h-6 bg-green-200 rounded-lg border border-slate-400 flex items-center justify-center text-xs font-bold">✓</div>
                      <span className="text-sm text-slate-700 font-medium">Available</span>
                    </div>
                    <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-lg shadow-sm">
                      <div className="w-6 h-6 bg-red-500 rounded-lg border border-slate-400 flex items-center justify-center text-xs font-bold text-white">C</div>
                      <span className="text-sm text-slate-700 font-medium">Cars</span>
                    </div>
                    <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-lg shadow-sm">
                      <div className="w-6 h-6 bg-blue-500 rounded-lg border border-slate-400 flex items-center justify-center text-xs font-bold text-white">F</div>
                      <span className="text-sm text-slate-700 font-medium">Faculty</span>
                    </div>
                    <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-lg shadow-sm">
                      <div className="w-6 h-6 bg-purple-500 rounded-lg border border-slate-400 flex items-center justify-center text-xs font-bold text-white">B</div>
                      <span className="text-sm text-slate-700 font-medium">Buses</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Recent Activities - Medium Card */}
            <Card className="p-6 masonry-item masonry-item-medium">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-2 bg-purple-600 rounded-lg shadow-2xl">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-slate-800">Recent Activities</h2>
              </div>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    {getActivityIcon(activity.type)}
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-800">{activity.action}</p>
                      <p className="text-xs text-gray-600">by {activity.user}</p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 text-sm text-purple-600 hover:text-purple-700 font-medium">
                View All Activities
              </button>
            </Card>

            {/* Bus Status - Medium Card */}
            <Card className="p-6 masonry-item masonry-item-medium">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-2 bg-orange-600 rounded-lg shadow-2xl">
                  <Bus className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-slate-800">Bus Status</h2>
              </div>
              <div className="space-y-4">
                {buses.map((bus) => (
                  <div key={bus.id} className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-gray-800">{bus.id}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getBusStatusColor(bus.status)}`}>
                        {bus.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">{bus.route}</p>
                    <p className="text-xs text-gray-500">Driver: {bus.driver}</p>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-xs text-gray-500">
                        {bus.currentPassengers}/{bus.capacity} passengers
                      </span>
                      {getBusStatusIcon(bus.status)}
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Parking Slots Summary - Small Card */}
            <Card className="p-6 masonry-item masonry-item-small">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-2 bg-green-600 rounded-lg shadow-2xl">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-xl font-bold text-slate-800">Parking Summary</h2>
              </div>
              <div className="space-y-3">
                {slots.map((slot) => (
                  <div key={slot.name} className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-medium text-gray-800">{slot.name}</span>
                      <span className="text-sm text-gray-600">{slot.occupied}/{slot.capacity}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                        style={{ width: `${(slot.occupied / slot.capacity) * 100}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{slot.location}</p>
                  </div>
                ))}
              </div>
            </Card>

            {/* System Alerts - Small Card */}
            <Card className="p-6 masonry-item masonry-item-small">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-2 bg-red-600 rounded-lg shadow-2xl">
                  <AlertCircle className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-xl font-bold text-slate-800">System Alerts</h2>
              </div>
              <div className="space-y-3">
                <div className="p-3 bg-red-50 border-l-4 border-red-400 rounded">
                  <p className="text-sm font-medium text-red-800">High Occupancy</p>
                  <p className="text-xs text-red-600">Upper side parking at 95% capacity</p>
                </div>
                <div className="p-3 bg-yellow-50 border-l-4 border-yellow-400 rounded">
                  <p className="text-sm font-medium text-yellow-800">Maintenance Due</p>
                  <p className="text-xs text-yellow-600">Bus B003 requires service</p>
                </div>
                <div className="p-3 bg-blue-50 border-l-4 border-blue-400 rounded">
                  <p className="text-sm font-medium text-blue-800">System Update</p>
                  <p className="text-xs text-blue-600">Scheduled maintenance tonight</p>
                </div>
              </div>
            </Card>

            {/* Quick Stats - Small Card */}
            <Card className="p-6 masonry-item masonry-item-small">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-2 bg-indigo-600 rounded-lg shadow-2xl">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-xl font-bold text-slate-800">Quick Stats</h2>
              </div>
              <div className="space-y-4">
                <div className="text-center p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
                  <p className="text-2xl font-bold text-indigo-600">78%</p>
                  <p className="text-sm text-gray-600">Overall Occupancy</p>
                </div>
                <div className="text-center p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg">
                  <p className="text-2xl font-bold text-green-600">42</p>
                  <p className="text-sm text-gray-600">Available Spots</p>
                </div>
                <div className="text-center p-3 bg-gradient-to-r from-purple-50 to-violet-50 rounded-lg">
                  <p className="text-2xl font-bold text-purple-600">156</p>
                  <p className="text-sm text-gray-600">Total Bookings Today</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card className="p-6 mt-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Link href="/admin/users">
                <button className="p-4 bg-blue-50 hover:bg-blue-100 rounded-lg text-left transition-colors w-full">
                  <Users className="w-6 h-6 text-blue-600 mb-2" />
                  <p className="font-medium text-gray-800">Manage Users</p>
                  <p className="text-sm text-gray-600">Register faculty or security</p>
                </button>
              </Link>
              <Link href="/admin/complaints">
                <button className="p-4 bg-green-50 hover:bg-green-100 rounded-lg text-left transition-colors w-full">
                  <MessageSquareWarning className="w-6 h-6 text-green-600 mb-2" />
                  <p className="font-medium text-gray-800">View Complaints</p>
                  <p className="text-sm text-gray-600">See the newly added complaints</p>
                </button>
              </Link>
              <Link href="/admin/security">
                <button className="p-4 bg-yellow-50 hover:bg-yellow-100 rounded-lg text-left transition-colors w-full">
                  <Shield className="w-6 h-6 text-yellow-600 mb-2" />
                  <p className="font-medium text-gray-800">Security Reports</p>
                  <p className="text-sm text-gray-600">View security activities</p>
                </button>
              </Link>
              <Link href="/admin/getreport">
                <button className="p-4 bg-purple-50 hover:bg-purple-100 rounded-lg text-left transition-colors w-full">
                  <TrendingUp className="w-6 h-6 text-purple-600 mb-2" />
                  <p className="font-medium text-gray-800">Generate Report</p>
                  <p className="text-sm text-gray-600">Create analytics report</p>
                </button>
              </Link>
            </div>
          </Card>
        </main>
      </div>
    </div>
  );
}