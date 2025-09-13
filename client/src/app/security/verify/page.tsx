"use client";

import React, { useState } from 'react';
import SecurityHeader from '../../components/SecurityHeader';
import SecurityBottomNav from '../../components/SecurityBottomNav';
import Card from '../../components/Card';
import Button from '../../components/Button';
import StatusBadge from '../../components/StatusBadge';
import { 
  QrCode, 
  Search, 
  CheckCircle, 
  XCircle,
  Clock,
  User,
  Car,
  MapPin
} from 'lucide-react';

/**
 * Security Verification page
 * QR code scanner and manual verification interface
 * High-contrast design for outdoor use
 */
export default function SecurityVerify() {
  const [darkMode, setDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [verificationResult, setVerificationResult] = useState<any>(null);

  // Mock data for demonstration
  const mockBooking = {
    id: 'BK001',
    facultyName: 'Dr. Sarah Johnson',
    facultyId: 'FAC001',
    vehicleNumber: 'ABC-1234',
    slot: 'A3',
    zone: 'Zone A',
    date: '2024-01-15',
    time: '09:00 AM - 05:00 PM',
    status: 'confirmed',
    qrCode: 'QR123456789'
  };

  const handleQRScan = () => {
    // Simulate QR code scan
    setVerificationResult(mockBooking);
  };

  const handleManualSearch = () => {
    if (searchQuery) {
      // Simulate manual search
      setVerificationResult(mockBooking);
    }
  };

  const handleApprove = () => {
    alert('Booking approved! Vehicle can proceed.');
    setVerificationResult(null);
    setSearchQuery('');
  };

  const handleReject = () => {
    alert('Booking rejected! Please contact administration.');
    setVerificationResult(null);
    setSearchQuery('');
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
        title="Verify Booking" 
        subtitle="Scan QR code or search manually"
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode(!darkMode)}
        onSearch={setSearchQuery}
      />
      
      <main className="p-4 space-y-6">
        {/* QR Code Scanner */}
        <Card className={`p-6 ${cardClasses}`}>
          <h2 className="text-lg font-bold mb-4">QR Code Scanner</h2>
          <div className="text-center">
            <div className="w-full h-48 bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center mb-4">
              <div className="text-center">
                <QrCode className="w-16 h-16 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-500">Position QR code within frame</p>
              </div>
            </div>
            <Button variant="primary" className="w-full py-3" onClick={handleQRScan}>
              <QrCode className="w-5 h-5 mr-2" />
              Scan QR Code
            </Button>
          </div>
        </Card>

        {/* Manual Search */}
        <Card className={`p-6 ${cardClasses}`}>
          <h2 className="text-lg font-bold mb-4">Manual Search</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Search by Booking ID, Faculty ID, or Vehicle Number
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Enter search term..."
                  className="flex-1 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <Button variant="secondary" onClick={handleManualSearch}>
                  <Search className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Verification Result */}
        {verificationResult && (
          <Card className={`p-6 ${cardClasses} border-green-200 bg-green-50`}>
            <div className="flex items-center gap-3 mb-4">
              <CheckCircle className="w-6 h-6 text-green-600" />
              <h2 className="text-lg font-bold text-green-800">Booking Found</h2>
            </div>
            
            <div className="space-y-4">
              {/* Faculty Information */}
              <div className="p-4 bg-white rounded-lg border">
                <div className="flex items-center gap-3 mb-3">
                  <User className="w-5 h-5 text-blue-600" />
                  <h3 className="font-semibold">Faculty Information</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <p className="text-sm text-gray-600">Name</p>
                    <p className="font-medium">{verificationResult.facultyName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Faculty ID</p>
                    <p className="font-medium">{verificationResult.facultyId}</p>
                  </div>
                </div>
              </div>

              {/* Vehicle Information */}
              <div className="p-4 bg-white rounded-lg border">
                <div className="flex items-center gap-3 mb-3">
                  <Car className="w-5 h-5 text-green-600" />
                  <h3 className="font-semibold">Vehicle Information</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <p className="text-sm text-gray-600">Vehicle Number</p>
                    <p className="font-medium">{verificationResult.vehicleNumber}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Booking Status</p>
                    <StatusBadge status={verificationResult.status} />
                  </div>
                </div>
              </div>

              {/* Parking Details */}
              <div className="p-4 bg-white rounded-lg border">
                <div className="flex items-center gap-3 mb-3">
                  <MapPin className="w-5 h-5 text-purple-600" />
                  <h3 className="font-semibold">Parking Details</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <p className="text-sm text-gray-600">Slot</p>
                    <p className="font-medium">{verificationResult.slot}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Zone</p>
                    <p className="font-medium">{verificationResult.zone}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Date</p>
                    <p className="font-medium">{verificationResult.date}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Time</p>
                    <p className="font-medium">{verificationResult.time}</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-3">
                <Button variant="success" className="py-3" onClick={handleApprove}>
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Approve
                </Button>
                <Button variant="danger" className="py-3" onClick={handleReject}>
                  <XCircle className="w-5 h-5 mr-2" />
                  Reject
                </Button>
              </div>
            </div>
          </Card>
        )}

        {/* Recent Verifications */}
        <Card className={`p-6 ${cardClasses}`}>
          <h2 className="text-lg font-bold mb-4">Recent Verifications</h2>
          <div className="space-y-3">
            {[
              { id: 'V001', faculty: 'Dr. Smith', vehicle: 'XYZ-5678', time: '2 min ago', status: 'approved' },
              { id: 'V002', faculty: 'Prof. Brown', vehicle: 'DEF-9012', time: '5 min ago', status: 'rejected' },
              { id: 'V003', faculty: 'Dr. Wilson', vehicle: 'GHI-3456', time: '10 min ago', status: 'approved' },
            ].map((verification) => (
              <div key={verification.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <Car className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium">{verification.faculty}</p>
                    <p className="text-sm text-gray-600">{verification.vehicle}</p>
                  </div>
                </div>
                <div className="text-right">
                  <StatusBadge status={verification.status} />
                  <p className="text-xs text-gray-500 mt-1">{verification.time}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          <Button variant="secondary" className="py-4 text-lg">
            <Clock className="w-5 h-5 mr-2" />
            View Logs
          </Button>
          <Button variant="primary" className="py-4 text-lg">
            <Search className="w-5 h-5 mr-2" />
            Search All
          </Button>
        </div>
      </main>

      <SecurityBottomNav currentPage="verify" darkMode={darkMode} />
    </div>
  );
}
