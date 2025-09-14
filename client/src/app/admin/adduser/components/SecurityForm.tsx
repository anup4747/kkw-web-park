"use client";

import React, { useState } from 'react';
import Card from '../../../components/Card';
import { Shield, User, Mail, Phone, IdCard, Camera, Clock, MapPin, Award, Save, X } from 'lucide-react';

/**
 * Security Guard Registration Form
 * Comprehensive form for creating security guard accounts
 * Includes all required fields for security personnel management
 */
export default function SecurityForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    employeeId: '',
    profilePhoto: null as File | null,
    shiftSchedule: {
      startTime: '',
      endTime: '',
      workingDays: [] as string[],
    },
    assignedZone: '',
    certificationDetails: {
      licenseNumber: '',
      expiryDate: '',
      trainingCompleted: [] as string[],
    },
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const workingDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const trainingOptions = [
    'Basic Security Training',
    'Emergency Response',
    'First Aid Certification',
    'Crowd Control',
    'Surveillance Systems',
    'Report Writing',
    'Conflict Resolution',
  ];

  const parkingZones = [
    'Main Entrance Zone',
    'Faculty Parking Zone',
    'Student Parking Zone',
    'Visitor Parking Zone',
    'Bus Terminal Zone',
    'Emergency Vehicle Zone',
  ];

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleNestedInputChange = (parentField: string, childField: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [parentField]: {
        ...(prev[parentField as keyof typeof prev] as any),
        [childField]: value
      }
    }));
  };

  const handleArrayChange = (parentField: string, childField: string, value: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      [parentField]: {
        ...(prev[parentField as keyof typeof prev] as any),
        [childField]: checked 
          ? [...(prev[parentField as keyof typeof prev] as any)[childField], value]
          : (prev[parentField as keyof typeof prev] as any)[childField].filter((item: string) => item !== value)
      }
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        profilePhoto: file
      }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.phoneNumber.trim()) newErrors.phoneNumber = 'Phone number is required';
    if (!formData.employeeId.trim()) newErrors.employeeId = 'Employee ID is required';
    if (!formData.shiftSchedule.startTime) newErrors.startTime = 'Shift start time is required';
    if (!formData.shiftSchedule.endTime) newErrors.endTime = 'Shift end time is required';
    if (formData.shiftSchedule.workingDays.length === 0) newErrors.workingDays = 'At least one working day is required';
    if (!formData.assignedZone) newErrors.assignedZone = 'Assigned zone is required';
    if (!formData.certificationDetails.licenseNumber.trim()) newErrors.licenseNumber = 'Security license number is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Reset form
      setFormData({
        fullName: '',
        email: '',
        phoneNumber: '',
        employeeId: '',
        profilePhoto: null,
        shiftSchedule: {
          startTime: '',
          endTime: '',
          workingDays: [],
        },
        assignedZone: '',
        certificationDetails: {
          licenseNumber: '',
          expiryDate: '',
          trainingCompleted: [],
        },
      });
      
      alert('Security guard account created successfully!');
    } catch (error) {
      alert('Error creating account. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="p-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 bg-red-100 rounded-lg">
            <Shield className="w-8 h-8 text-red-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Security Guard Registration</h2>
            <p className="text-gray-600">Create a new security guard account with complete details</p>
          </div>
        </div>
      </Card>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Personal Information */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
            <User className="w-5 h-5 text-blue-600" />
            Personal Information
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name *
              </label>
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) => handleInputChange('fullName', e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                  errors.fullName ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter full name"
              />
              {errors.fullName && <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address *
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="security@college.edu"
                />
              </div>
              {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number *
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="tel"
                  value={formData.phoneNumber}
                  onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                    errors.phoneNumber ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="+1 (555) 123-4567"
                />
              </div>
              {errors.phoneNumber && <p className="mt-1 text-sm text-red-600">{errors.phoneNumber}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Employee ID / Badge Number *
              </label>
              <div className="relative">
                <IdCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  value={formData.employeeId}
                  onChange={(e) => handleInputChange('employeeId', e.target.value)}
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                    errors.employeeId ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="SEC-2024-001"
                />
              </div>
              {errors.employeeId && <p className="mt-1 text-sm text-red-600">{errors.employeeId}</p>}
            </div>
          </div>

          {/* Profile Photo */}
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Profile Photo
            </label>
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
                {formData.profilePhoto ? (
                  <img
                    src={URL.createObjectURL(formData.profilePhoto)}
                    alt="Profile preview"
                    className="w-full h-full object-cover rounded-lg"
                  />
                ) : (
                  <Camera className="w-8 h-8 text-gray-400" />
                )}
              </div>
              <div>
                <input
                  type="file"
                  id="profilePhoto"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <label
                  htmlFor="profilePhoto"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer transition-colors"
                >
                  <Camera className="w-4 h-4" />
                  Choose Photo
                </label>
                <p className="text-sm text-gray-500 mt-1">JPG, PNG up to 5MB</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Work Schedule */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
            <Clock className="w-5 h-5 text-blue-600" />
            Work Schedule
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Shift Start Time *
              </label>
              <input
                type="time"
                value={formData.shiftSchedule.startTime}
                onChange={(e) => handleNestedInputChange('shiftSchedule', 'startTime', e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                  errors.startTime ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.startTime && <p className="mt-1 text-sm text-red-600">{errors.startTime}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Shift End Time *
              </label>
              <input
                type="time"
                value={formData.shiftSchedule.endTime}
                onChange={(e) => handleNestedInputChange('shiftSchedule', 'endTime', e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                  errors.endTime ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.endTime && <p className="mt-1 text-sm text-red-600">{errors.endTime}</p>}
            </div>
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Working Days *
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {workingDays.map((day) => (
                <label key={day} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.shiftSchedule.workingDays.includes(day)}
                    onChange={(e) => handleArrayChange('shiftSchedule', 'workingDays', day, e.target.checked)}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">{day}</span>
                </label>
              ))}
            </div>
            {errors.workingDays && <p className="mt-1 text-sm text-red-600">{errors.workingDays}</p>}
          </div>
        </Card>

        {/* Assignment */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-blue-600" />
            Assignment & Zone
          </h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Assigned Parking Zone *
            </label>
            <select
              value={formData.assignedZone}
              onChange={(e) => handleInputChange('assignedZone', e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                errors.assignedZone ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              <option value="">Select assigned zone</option>
              {parkingZones.map((zone) => (
                <option key={zone} value={zone}>{zone}</option>
              ))}
            </select>
            {errors.assignedZone && <p className="mt-1 text-sm text-red-600">{errors.assignedZone}</p>}
          </div>
        </Card>

        {/* Certifications */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
            <Award className="w-5 h-5 text-blue-600" />
            Certifications & Training
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Security License Number *
              </label>
              <input
                type="text"
                value={formData.certificationDetails.licenseNumber}
                onChange={(e) => handleNestedInputChange('certificationDetails', 'licenseNumber', e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                  errors.licenseNumber ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="SL-2024-001"
              />
              {errors.licenseNumber && <p className="mt-1 text-sm text-red-600">{errors.licenseNumber}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                License Expiry Date
              </label>
              <input
                type="date"
                value={formData.certificationDetails.expiryDate}
                onChange={(e) => handleNestedInputChange('certificationDetails', 'expiryDate', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
            </div>
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Completed Training Programs
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {trainingOptions.map((training) => (
                <label key={training} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.certificationDetails.trainingCompleted.includes(training)}
                    onChange={(e) => handleArrayChange('certificationDetails', 'trainingCompleted', training, e.target.checked)}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">{training}</span>
                </label>
              ))}
            </div>
          </div>
        </Card>

        {/* Form Actions */}
        <Card className="p-6">
          <div className="flex flex-col sm:flex-row gap-4 justify-end">
            <button
              type="button"
              className="flex items-center justify-center gap-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <X className="w-4 h-4" />
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Save className="w-4 h-4" />
              {isSubmitting ? 'Creating Account...' : 'Create Security Account'}
            </button>
          </div>
        </Card>
      </form>
    </div>
  );
}
