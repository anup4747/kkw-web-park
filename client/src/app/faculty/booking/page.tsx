"use client";

import React, { useState } from 'react';
import FacultyHeader from '../../components/FacultyHeader';
import FacultyBottomNav from '../../components/FacultyBottomNav';
import Card from '../../components/Card';
import Button from '../../components/Button';
import StatusBadge from '../../components/StatusBadge';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Car,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

/**
 * Faculty Booking page
 * Mobile-first booking interface with form and slot selection
 * Clean and user-friendly design
 */
export default function FacultyBooking() {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedSlot, setSelectedSlot] = useState('');

  // Mock data for demonstration
  const availableSlots = [
    { id: 'A1', zone: 'Zone A', status: 'free', distance: '50m' },
    { id: 'A4', zone: 'Zone A', status: 'free', distance: '75m' },
    { id: 'B1', zone: 'Zone B', status: 'free', distance: '100m' },
    { id: 'B3', zone: 'Zone B', status: 'free', distance: '120m' },
    { id: 'C2', zone: 'Zone C', status: 'free', distance: '150m' },
  ];

  const timeSlots = [
    '08:00 AM - 10:00 AM',
    '10:00 AM - 12:00 PM',
    '12:00 PM - 02:00 PM',
    '02:00 PM - 04:00 PM',
    '04:00 PM - 06:00 PM',
  ];

  const handleBooking = () => {
    if (selectedDate && selectedTime && selectedSlot) {
      alert('Booking confirmed! You will receive a QR code shortly.');
    } else {
      alert('Please fill in all required fields.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <FacultyHeader 
        title="Book Parking Slot" 
        subtitle="Select your preferred slot and time"
      />
      
      <main className="p-4 space-y-6">
    

        {/* Available Slots */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Available Slots</h2>
            <StatusBadge status="free" />
          </div>
          
          <div className="space-y-3">
            {availableSlots.map((slot) => (
              <button
                key={slot.id}
                onClick={() => setSelectedSlot(slot.id)}
                className={`w-full p-4 text-left border rounded-lg transition-colors ${
                  selectedSlot === slot.id
                    ? 'border-green-500 bg-green-50 text-green-700'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <Car className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-semibold">Slot {slot.id}</p>
                      <p className="text-sm text-gray-600">{slot.zone}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{slot.distance}</p>
                    <StatusBadge status="free" />
                  </div>
                </div>
              </button>
            ))}
          </div>
        </Card>

        {/* Booking Summary */}
        {selectedDate && selectedTime && selectedSlot && (
          <Card className="p-6 bg-green-50 border-green-200">
            <h3 className="text-lg font-semibold text-green-800 mb-4">Booking Summary</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Date:</span>
                <span className="font-medium">{selectedDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Time:</span>
                <span className="font-medium">{selectedTime}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Slot:</span>
                <span className="font-medium">{selectedSlot}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Duration:</span>
                <span className="font-medium">2 hours</span>
              </div>
              <div className="border-t border-green-200 pt-2 mt-2">
                <div className="flex justify-between font-semibold text-green-800">
                  <span>Total Cost:</span>
                  <span>Free</span>
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button 
            variant="success" 
            className="w-full py-4 text-lg"
            onClick={handleBooking}
            disabled={!selectedDate || !selectedTime || !selectedSlot}
          >
            <CheckCircle className="w-5 h-5 mr-2" />
            Confirm Booking
          </Button>
          
          <Button variant="secondary" className="w-full py-3">
            <Calendar className="w-4 h-4 mr-2" />
            View Calendar
          </Button>
        </div>

        {/* Important Notes */}
        <Card className="p-4 bg-yellow-50 border-yellow-200">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
            <div>
              <h4 className="font-medium text-yellow-800">Important Notes</h4>
              <ul className="text-sm text-yellow-700 mt-1 space-y-1">
                <li>• Bookings can be made up to 7 days in advance</li>
                <li>• You can cancel up to 1 hour before your slot time</li>
                <li>• Show your QR code to security when entering</li>
                <li>• Late arrivals may result in slot cancellation</li>
              </ul>
            </div>
          </div>
        </Card>
      </main>

      <FacultyBottomNav currentPage="booking" />
    </div>
  );
}
