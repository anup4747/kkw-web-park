"use client";

import { useState } from "react";
import { Car, MapPin, Clock, Users, AlertCircle, CheckCircle } from "lucide-react";
import { Slot } from "@/types/types";

function ParkingGraph({ slots }: { slots: Slot[] }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {slots.map((slot) => {
        const percent = Math.min(100, Math.round((slot.occupied / slot.capacity) * 100));
        const isFull = slot.occupied >= slot.capacity;
        const isAlmostFull = percent >= 80;
        
        return (
          <div key={slot.name} className="bg-white rounded-xl shadow-lg p-6 border border-slate-200 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${isFull ? 'bg-red-100' : isAlmostFull ? 'bg-yellow-100' : 'bg-emerald-100'}`}>
                  <Car className={`w-5 h-5 ${isFull ? 'text-red-600' : isAlmostFull ? 'text-yellow-600' : 'text-emerald-600'}`} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800">{slot.name}</h3>
                  <p className="text-sm text-slate-500">{slot.location}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-slate-800">{slot.occupied}/{slot.capacity}</div>
                <div className="text-sm text-slate-500">vehicles</div>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="h-3 w-full bg-slate-200 rounded-full overflow-hidden">
                <div
                  className={`h-3 rounded-full transition-all duration-500 ${
                    isFull ? 'bg-red-500' : isAlmostFull ? 'bg-yellow-500' : 'bg-emerald-500'
                  }`}
                  style={{ width: `${percent}%` }}
                />
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-600">{percent}% occupied</span>
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
                      <CheckCircle className="w-4 h-4 text-emerald-500" />
                      <span className="text-emerald-600 font-medium">Available</span>
                    </>
                  )}
                </div>
              </div>

              {/* Guest Slots for Slot A */}
              {slot.guestSlots && (
                <div className="mt-4 pt-3 border-t border-slate-200">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-600">Guest Parking:</span>
                    <span className="font-semibold text-slate-800">
                      {slot.guestOccupied || 0}/{slot.guestSlots}
                    </span>
                  </div>
                  <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden mt-1">
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

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("Security Officer");
  
  const [slots, setSlots] = useState<Slot[]>([
    { name: "Slot A", occupied: 5, capacity: 20, location: "Lower Side", guestSlots: 6, guestOccupied: 2 },
    { name: "Slot B", occupied: 3, capacity: 6, location: "Left Side - Faculty" },
    { name: "Slot C", occupied: 12, capacity: 20, location: "Upper Side" },
    { name: "Slot D", occupied: 2, capacity: 4, location: "Right Side - Buses" },
  ]);

  const totalOccupied = slots.reduce((sum, slot) => sum + slot.occupied, 0);
  const totalCapacity = slots.reduce((sum, slot) => sum + slot.capacity, 0);
  const overallPercent = Math.round((totalOccupied / totalCapacity) * 100);

  return (
    <div className="bg-gradient-to-br from-slate-50 to-slate-100 min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-8 md:mb-12">
            {isLoggedIn ? (
              <>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 md:mb-4">Hi, {userName}!</h1>
                <p className="text-lg sm:text-xl text-emerald-100 max-w-3xl mx-auto px-4">
              Welcome to the Security Parking Management Dashboard. Monitor and manage 
              campus parking operations in real-time.
            </p>
              </>
            ) : (
              <>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 md:mb-4">Security Parking Management</h1>
                <p className="text-lg sm:text-xl text-emerald-100 max-w-3xl mx-auto px-4">
                  Secure parking monitoring and management system for KKW College security personnel, 
                  administrators, and authorized faculty members.
                </p>
              </>
            )}
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 text-center">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 md:p-6">
              <Users className="w-6 h-6 md:w-8 md:h-8 mx-auto mb-2 md:mb-3 text-emerald-200" />
              <div className="text-2xl md:text-3xl font-bold mb-1">{totalCapacity}</div>
              <div className="text-sm md:text-base text-emerald-100">Total Spots</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 md:p-6">
              <Car className="w-6 h-6 md:w-8 md:h-8 mx-auto mb-2 md:mb-3 text-emerald-200" />
              <div className="text-2xl md:text-3xl font-bold mb-1">{totalOccupied}</div>
              <div className="text-sm md:text-base text-emerald-100">Currently Occupied</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 md:p-6 sm:col-span-2 lg:col-span-1">
              <Clock className="w-6 h-6 md:w-8 md:h-8 mx-auto mb-2 md:mb-3 text-emerald-200" />
              <div className="text-2xl md:text-3xl font-bold mb-1">{overallPercent}%</div>
              <div className="text-sm md:text-base text-emerald-100">Overall Occupancy</div>
            </div>
          </div>
        </div>
      </div>

      {/* Parking Overview */}
      <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-3 md:mb-4">Security Monitoring Dashboard</h2>
          <p className="text-slate-600 text-base md:text-lg px-4">Real-time surveillance and management of all parking zones</p>
        </div>
        
        <ParkingGraph slots={slots} />
      </div>
    </div>
  );
}
