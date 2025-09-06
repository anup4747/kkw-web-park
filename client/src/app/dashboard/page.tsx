"use client";

import { useState } from "react";
import { Car, Bus, Users, Shield, AlertCircle, CheckCircle, MapPin, Clock, Building } from "lucide-react";

type ParkingSpot = {
    id: string;
    occupied: boolean;
    type: 'car' | 'faculty' | 'bus';
    zone: string;
};

type Slot = {
    name: string;
    occupied: number;
    capacity: number;
    location: string;
    guestSlots?: number;
    guestOccupied?: number;
};

type Bus = {
    id: string;
    route: string;
    status: 'active' | 'maintenance' | 'offline';
    driver: string;
    capacity: number;
    currentPassengers: number;
};

export default function DashboardPage() {
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

    const [buses] = useState<Bus[]>([
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
                                        className={`h-3 rounded-full transition-all duration-500 ${isFull ? 'bg-red-500' : isAlmostFull ? 'bg-yellow-500' : 'bg-emerald-500'
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

    const totalSpots = parkingSpots.length;
    const occupiedSpots = parkingSpots.filter(spot => spot.occupied).length;
    const carSpots = parkingSpots.filter(spot => spot.type === 'car');
    const facultySpots = parkingSpots.filter(spot => spot.type === 'faculty');
    const busSpots = parkingSpots.filter(spot => spot.type === 'bus');

    return (
        <div className="bg-gradient-to-br from-slate-50 to-slate-100 min-h-screen">
            {/* Header */}
            <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 text-white py-8 md:py-16">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="text-center sm:text-left">
                            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">Security Monitoring Dashboard</h1>
                            <p className="text-emerald-100 text-base md:text-lg">Real-time campus parking surveillance</p>
                        </div>
                        <div className="text-center sm:text-right">
                            <div className="text-xl sm:text-2xl font-bold">{occupiedSpots}/{totalSpots}</div>
                            <div className="text-emerald-200 text-sm md:text-base">Spots Occupied</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-8">
                {/* Statistics Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
                    <div className="bg-white rounded-xl shadow-lg p-4 md:p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-slate-600 text-xs md:text-sm">Total Spots</p>
                                <p className="text-xl md:text-3xl font-bold text-slate-800">{totalSpots}</p>
                            </div>
                            <div className="p-2 md:p-3 bg-emerald-100 rounded-lg">
                                <MapPin className="w-4 h-4 md:w-6 md:h-6 text-emerald-600" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-lg p-4 md:p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-slate-600 text-xs md:text-sm">Cars Parked</p>
                                <p className="text-xl md:text-3xl font-bold text-slate-800">{carSpots.filter(s => s.occupied).length}</p>
                            </div>
                            <div className="p-2 md:p-3 bg-blue-100 rounded-lg">
                                <Car className="w-4 h-4 md:w-6 md:h-6 text-blue-600" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-lg p-4 md:p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-slate-600 text-xs md:text-sm">Reserved for Guests</p>
                                <p className="text-xl md:text-3xl font-bold text-slate-800">{facultySpots.filter(s => s.occupied).length}/6</p>
                            </div>
                            <div className="p-2 md:p-3 bg-purple-100 rounded-lg">
                                <Users className="w-4 h-4 md:w-6 md:h-6 text-purple-600" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-lg p-4 md:p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-slate-600 text-xs md:text-sm">Buses Active</p>
                                <p className="text-xl md:text-3xl font-bold text-slate-800">{buses.filter(b => b.status === 'active').length}/4</p>
                            </div>
                            <div className="p-2 md:p-3 bg-orange-100 rounded-lg">
                                <Bus className="w-4 h-4 md:w-6 md:h-6 text-orange-600" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Campus Map */}
                <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="p-3 bg-emerald-100 rounded-lg">
                            <MapPin className="w-8 h-8 text-emerald-600" />
                        </div>
                        <h2 className="text-3xl font-bold text-slate-800">Campus Parking Map</h2>
                    </div>

                    <div className="overflow-x-auto overflow-y-hidden flex items-center">
                        <div className="relative bg-slate-100 rounded-lg min-w-[800px] min-h-[600px] w-full p-16">
                            {/* College Ground Rectangle */}
                            <div className="relative w-full h-96 bg-gradient-to-br from-emerald-50 to-teal-50 border-4 border-emerald-300 rounded-lg mx-auto">

                                {/* College Building in Center */}
                                <div className="absolute inset-4 bg-white border-2 border-slate-300 rounded-lg flex items-center justify-center">
                                    <div className="text-center">
                                        <Building className="w-12 h-12 text-slate-400 mx-auto mb-2" />
                                        <p className="text-slate-600 font-semibold">KKW College Ground</p>
                                    </div>
                                </div>

                                {/* Upper Side - 20 Car Spots */}
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

                                {/* Lower Side - 20 Car Spots */}
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
                                {/* Left Side - 6 Faculty Spots */}
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

                                {/* Right Side - 4 Bus Spots */}
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


                            {/* Legend */}
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
                </div>

                {/* Parking Zone Cards */}
                <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="p-3 bg-emerald-100 rounded-lg">
                            <Car className="w-8 h-8 text-emerald-600" />
                        </div>
                        <h2 className="text-3xl font-bold text-slate-800">Parking Zone Status</h2>
                    </div>

                    <ParkingGraph slots={slots} />

                    {/* Security Controls */}
                    <div className="mt-8 pt-6 border-t border-slate-200">
                        <h3 className="text-xl font-bold text-slate-800 mb-6 text-center">Security Management Controls</h3>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {slots.map((s, idx) => (
                                <div key={s.name} className="space-y-3">
                                    <div className="text-center">
                                        <h4 className="font-semibold text-slate-700">{s.name}</h4>
                                        <p className="text-sm text-slate-500">{s.location}</p>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-3">
                                            <label className="text-sm font-medium text-slate-600">Vehicles:</label>
                                            <input
                                                type="number"
                                                min={0}
                                                max={s.capacity}
                                                value={s.occupied}
                                                onChange={(e) => {
                                                    const value = Math.max(0, Math.min(s.capacity, Number(e.target.value)));
                                                    setSlots((prev) => {
                                                        const next = [...prev];
                                                        next[idx] = { ...next[idx], occupied: value };
                                                        return next;
                                                    });
                                                }}
                                                className="w-16 border-2 border-slate-200 rounded-lg px-2 py-1 text-center focus:border-emerald-500 focus:outline-none text-sm"
                                            />
                                        </div>
                                        {s.guestSlots && (
                                            <div className="flex items-center gap-3">
                                                <label className="text-sm font-medium text-slate-600">Guests:</label>
                                                <input
                                                    type="number"
                                                    min={0}
                                                    max={s.guestSlots}
                                                    value={s.guestOccupied || 0}
                                                    onChange={(e) => {
                                                        const value = Math.max(0, Math.min(s.guestSlots!, Number(e.target.value)));
                                                        setSlots((prev) => {
                                                            const next = [...prev];
                                                            next[idx] = { ...next[idx], guestOccupied: value };
                                                            return next;
                                                        });
                                                    }}
                                                    className="w-16 border-2 border-slate-200 rounded-lg px-2 py-1 text-center focus:border-emerald-500 focus:outline-none text-sm"
                                                />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bus Fleet Management */}
                <div className="bg-white rounded-xl shadow-lg p-8">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="p-3 bg-orange-100 rounded-lg">
                            <Bus className="w-8 h-8 text-orange-600" />
                        </div>
                        <h2 className="text-3xl font-bold text-slate-800">Bus Fleet Management</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {buses.map((bus) => (
                            <div key={bus.id} className="border-2 border-slate-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-lg font-bold text-slate-800">{bus.id}</h3>
                                    <div className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${getBusStatusColor(bus.status)}`}>
                                        {getBusStatusIcon(bus.status)}
                                        {bus.status.charAt(0).toUpperCase() + bus.status.slice(1)}
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <div>
                                        <p className="text-sm text-slate-600">Route</p>
                                        <p className="font-semibold text-slate-800">{bus.route}</p>
                                    </div>

                                    <div>
                                        <p className="text-sm text-slate-600">Driver</p>
                                        <p className="font-semibold text-slate-800">{bus.driver}</p>
                                    </div>

                                    <div>
                                        <p className="text-sm text-slate-600">Passengers</p>
                                        <div className="flex items-center gap-2">
                                            <div className="flex-1 bg-slate-200 rounded-full h-2">
                                                <div
                                                    className="bg-emerald-500 h-2 rounded-full transition-all duration-300"
                                                    style={{ width: `${(bus.currentPassengers / bus.capacity) * 100}%` }}
                                                ></div>
                                            </div>
                                            <span className="text-sm font-semibold text-slate-800">
                                                {bus.currentPassengers}/{bus.capacity}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
