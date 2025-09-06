"use client";

import { useState } from "react";
import { Car, MapPin, Clock, Users, AlertCircle, CheckCircle } from "lucide-react";

type Slot = {
  name: string;
  occupied: number;
  capacity: number;
  location: string;
};

function ParkingGraph({ slots }: { slots: Slot[] }) {
  return (
    <div className="grid gap-6 sm:grid-cols-3">
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
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function Home() {
  const [slots, setSlots] = useState<Slot[]>([
    { name: "Main Gate", occupied: 5, capacity: 20, location: "Near College Entrance" },
    { name: "Faculty Block", occupied: 12, capacity: 20, location: "Behind Admin Building" },
    { name: "Student Area", occupied: 18, capacity: 20, location: "Near Library" },
  ]);

  const totalOccupied = slots.reduce((sum, slot) => sum + slot.occupied, 0);
  const totalCapacity = slots.reduce((sum, slot) => sum + slot.capacity, 0);
  const overallPercent = Math.round((totalOccupied / totalCapacity) * 100);

  return (
    <div className="bg-gradient-to-br from-slate-50 to-slate-100 min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-4">Security Parking Management</h1>
            <p className="text-xl text-emerald-100 max-w-3xl mx-auto">
              Secure parking monitoring and management system for KKW College security personnel, 
              administrators, and authorized faculty members.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <Users className="w-8 h-8 mx-auto mb-3 text-emerald-200" />
              <div className="text-3xl font-bold mb-1">{totalCapacity}</div>
              <div className="text-emerald-100">Total Spots</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <Car className="w-8 h-8 mx-auto mb-3 text-emerald-200" />
              <div className="text-3xl font-bold mb-1">{totalOccupied}</div>
              <div className="text-emerald-100">Currently Occupied</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <Clock className="w-8 h-8 mx-auto mb-3 text-emerald-200" />
              <div className="text-3xl font-bold mb-1">{overallPercent}%</div>
              <div className="text-emerald-100">Overall Occupancy</div>
            </div>
          </div>
        </div>
      </div>

      {/* Parking Overview */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-800 mb-4">Security Monitoring Dashboard</h2>
          <p className="text-slate-600 text-lg">Real-time surveillance and management of all parking zones</p>
        </div>
        
        <ParkingGraph slots={slots} />

        {/* Security Controls */}
        <div className="mt-12 bg-white rounded-xl shadow-lg p-8">
          <h3 className="text-xl font-bold text-slate-800 mb-6 text-center">Security Management Controls</h3>
          <div className="grid sm:grid-cols-3 gap-6">
            {slots.map((s, idx) => (
              <div key={s.name} className="space-y-3">
                <div className="text-center">
                  <h4 className="font-semibold text-slate-700">{s.name}</h4>
                  <p className="text-sm text-slate-500">{s.location}</p>
                </div>
                <div className="flex items-center gap-3">
                  <label className="text-sm font-medium text-slate-600">Vehicles Present:</label>
                  <input
                    type="number"
                    min={0}
                    max={20}
                    value={s.occupied}
                    onChange={(e) => {
                      const value = Math.max(0, Math.min(20, Number(e.target.value)));
                      setSlots((prev) => {
                        const next = [...prev];
                        next[idx] = { ...next[idx], occupied: value };
                        return next;
                      });
                    }}
                    className="w-20 border-2 border-slate-200 rounded-lg px-3 py-2 text-center focus:border-emerald-500 focus:outline-none"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
