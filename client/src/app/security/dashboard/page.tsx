"use client";

import React, { useState } from 'react';
import SecurityHeader from '../../components/SecurityHeader';
import SecurityBottomNav from '../../components/SecurityBottomNav';
import Card from '../../components/Card';
import Button from '../../components/Button';
import StatusBadge from '../../components/StatusBadge';
import ParkingMap, { ParkingSlot } from '../../components/ParkingMap';
import { 
  MapPin, 
  Users, 
  AlertTriangle, 
  CheckCircle,
  Clock,
  Eye,
  QrCode
} from 'lucide-react';

/**
 * Security Dashboard page
 * High-contrast design for outdoor readability
 * Mobile-first with large touch targets
 */
export default function SecurityDashboard() {
  const [darkMode, setDarkMode] = useState(false);

  // Mock data for demonstration
  const zoneStats = [
    { zone: 'Zone A', total: 50, occupied: 35, free: 15, alerts: 2 },
    { zone: 'Zone B', total: 40, occupied: 28, free: 12, alerts: 0 },
    { zone: 'Zone C', total: 30, occupied: 25, free: 5, alerts: 1 },
  ];

  const recentAlerts = [
    { id: 1, type: 'unauthorized', message: 'Unauthorized vehicle in Zone A', time: '2 min ago', priority: 'high' },
    { id: 2, type: 'maintenance', message: 'Slot A15 needs maintenance', time: '15 min ago', priority: 'medium' },
    { id: 3, type: 'booking', message: 'New booking for Slot B8', time: '1 hour ago', priority: 'low' },
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
    { id: 'B5', status: 'occupied', position: { x: 150, y: 130 }, zone: 'B' },
  ];

  const getAlertColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const containerClasses = darkMode 
    ? 'min-h-screen bg-gray-900 text-white pb-20' 
    : 'min-h-screen bg-gray-50 text-gray-800 pb-20';

  const cardClasses = darkMode 
    ? 'bg-gray-800 border-gray-700' 
    : 'bg-white border-gray-200';

  return (
    <div className={containerClasses}>
      <SecurityHeader 
        title="Security Dashboard" 
        subtitle="Monitor parking zones and respond to alerts"
        darkMode={darkMode}
        onToggleDarkMode={toggleDarkMode}
      />
      
      <main className="p-4 space-y-6">
        {/* Zone Statistics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {zoneStats.map((zone, index) => (
            <Card key={index} className={`p-6 ${cardClasses}`}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold">{zone.zone}</h3>
                {zone.alerts > 0 && (
                  <div className="flex items-center gap-1 text-red-600">
                    <AlertTriangle className="w-4 h-4" />
                    <span className="text-sm font-bold">{zone.alerts}</span>
                  </div>
                )}
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm opacity-80">Total Slots</span>
                  <span className="font-bold">{zone.total}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm opacity-80">Occupied</span>
                  <span className="font-bold text-red-500">{zone.occupied}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm opacity-80">Free</span>
                  <span className="font-bold text-green-500">{zone.free}</span>
                </div>
              </div>
              
              <div className="mt-4">
                <div className="w-full bg-gray-300 rounded-full h-2">
                  <div 
                    className="bg-gray-600 h-2 rounded-full" 
                    style={{ width: `${(zone.occupied / zone.total) * 100}%` }}
                  ></div>
                </div>
                <p className="text-xs mt-1 opacity-80">
                  {Math.round((zone.occupied / zone.total) * 100)}% Occupied
                </p>
              </div>
            </Card>
          ))}
        </div>

        {/* Parking Map */}
        <Card className={`p-4 ${cardClasses}`}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold">Live Parking Map</h3>
            <Button variant="secondary" size="sm">
              <Eye className="w-4 h-4 mr-2" />
              Full View
            </Button>
          </div>
          <ParkingMap 
            slots={parkingSlots} 
            className="w-full h-64"
            onSlotClick={(slotId) => console.log('Clicked slot:', slotId)}
          />
        </Card>

        {/* Recent Alerts */}
        <Card className={`p-4 ${cardClasses}`}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold">Recent Alerts</h3>
            <Button variant="danger" size="sm">
              View All
            </Button>
          </div>
          <div className="space-y-3">
            {recentAlerts.map((alert) => (
              <div key={alert.id} className={`p-3 rounded-lg border ${getAlertColor(alert.priority)}`}>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="font-bold text-sm">{alert.message}</p>
                    <p className="text-xs opacity-80 mt-1">{alert.time}</p>
                  </div>
                  <StatusBadge status={alert.priority === 'high' ? 'rejected' : alert.priority === 'medium' ? 'pending' : 'approved'} />
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          <Button variant="success" className="py-4 text-lg font-bold">
            <QrCode className="w-6 h-6 mr-2" />
            Scan QR Code
          </Button>
          <Button variant="secondary" className="py-4 text-lg font-bold">
            <MapPin className="w-6 h-6 mr-2" />
            Monitor Slots
          </Button>
        </div>

        {/* Emergency Alert */}
        <Card className={`p-4 bg-red-50 border-red-200 ${darkMode ? 'bg-red-900 border-red-700' : ''}`}>
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-6 h-6 text-red-600" />
            <div>
              <h4 className="font-bold text-red-800">Emergency Alert</h4>
              <p className="text-sm text-red-700">
                Unauthorized vehicle detected in Zone A. Immediate attention required.
              </p>
            </div>
          </div>
          <div className="mt-3 flex gap-2">
            <Button variant="danger" size="sm" className="flex-1">
              Respond Now
            </Button>
            <Button variant="secondary" size="sm" className="flex-1">
              Mark Resolved
            </Button>
          </div>
        </Card>

        {/* Shift Information */}
        <Card className={`p-4 ${cardClasses}`}>
          <h3 className="text-lg font-bold mb-4">Current Shift</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm opacity-80">Shift Time</p>
              <p className="font-bold">06:00 AM - 02:00 PM</p>
            </div>
            <div>
              <p className="text-sm opacity-80">Time Remaining</p>
              <p className="font-bold text-green-600">3h 45m</p>
            </div>
          </div>
          <div className="mt-4">
            <Button variant="success" className="w-full py-3">
              <Clock className="w-5 h-5 mr-2" />
              Log Activity
            </Button>
          </div>
        </Card>
      </main>

      <SecurityBottomNav currentPage="dashboard" darkMode={darkMode} />
    </div>
  );
}
