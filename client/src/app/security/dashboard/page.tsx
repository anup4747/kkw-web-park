"use client";

import React, { useState } from 'react';
import SecurityHeader from '../../components/SecurityHeader';
import SecurityBottomNav from '../../components/SecurityBottomNav';
import Card from '../../components/Card';
import Button from '../../components/Button';
import StatusBadge from '../../components/StatusBadge';
import ParkingMap, { ParkingSlot } from '../../components/ParkingMap';
import { 
  MapPin,Building, 
  Users, 
  AlertTriangle, 
  CheckCircle,
  Clock,
  Eye,
  QrCode,
  Car,
  Bus
} from 'lucide-react';

/**
 * Security Dashboard page
 * High-contrast design for outdoor readability
 * Mobile-first with large touch targets
 */
function ParkingGraph({ slots }: { slots: Slot[] }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {slots.map((slot) => {
        const percent = Math.min(100, Math.round((slot.occupied / slot.capacity) * 100));
        const isFull = slot.occupied >= slot.capacity;
        const isAlmostFull = percent >= 80;
        
        return (
          <div key={slot.name} className="professional-card p-6 hover:shadow-lg transition-all duration-300 group">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`p-3 rounded-lg ${isFull ? 'bg-red-100 text-red-600' : isAlmostFull ? 'bg-yellow-100 text-yellow-600' : 'bg-green-100 text-green-600'} group-hover:scale-110 transition-transform duration-300`}>
                  <Car className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 group-hover:text-blue-600 transition-colors">{slot.name}</h3>
                  <p className="text-sm text-gray-600">{slot.location}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors">{slot.occupied}/{slot.capacity}</div>
                <div className="text-sm text-gray-600">vehicles</div>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="h-3 w-full bg-gray-200 rounded-full overflow-hidden">
                <div
                  className={`h-3 rounded-full transition-all duration-500 ${
                    isFull ? 'bg-red-500' : isAlmostFull ? 'bg-yellow-500' : 'bg-green-500'
                  }`}
                  style={{ width: `${percent}%` }}
                />
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">{percent}% occupied</span>
                <div className="flex items-center gap-1">
                  {isFull ? (
                    <>
                      <AlertCircle className="w-4 h-4 text-red-500" />
                      <span className="text-red-600 font-medium">Full</span>
                    </>
                  ) : isAlmostFull ? (
                    <>
                      <AlertCircle className="w-4 h-4 text-yellow-500" />
                      <span className="text-yellow-600 font-medium">Almost Full</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-green-600 font-medium">Available</span>
                    </>
                  )}
                </div>
              </div>

              {/* Guest Slots for Slot A */}
              {slot.guestSlots && (
                <div className="mt-4 pt-3 border-t border-gray-200">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Guest Parking:</span>
                    <span className="font-semibold text-gray-800">
                      {slot.guestOccupied || 0}/{slot.guestSlots}
                    </span>
                  </div>
                  <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden mt-1">
                    <div
                      className="h-2 rounded-full bg-blue-500 transition-all duration-500"
                      style={{ width: `${Math.min(100, Math.round(((slot.guestOccupied || 0) / slot.guestSlots) * 100))}%` }}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function SecurityDashboard() {
  const [darkMode, setDarkMode] = useState(false);

  // Mock data for demonstration
  const [slots, setSlots] = useState<Slot[]>([
    { name: "Slot A", occupied: 5, capacity: 20, location: "Lower Side", guestSlots: 6, guestOccupied: 2 },
    { name: "Slot B", occupied: 3, capacity: 6, location: "Left Side - Faculty" },
    { name: "Slot C", occupied: 12, capacity: 20, location: "Upper Side" },
    { name: "Slot D", occupied: 2, capacity: 4, location: "Right Side - Buses" },
  ]);
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
        <div>
          <ParkingGraph slots={slots} />
        </div>
        

        {/* Parking Map */}
        <Card className={`p-4 ${cardClasses}`}>
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
