"use client";

import React, { useState } from 'react';
import Card from '../../../components/Card';
import { Users, User, Mail, Phone, IdCard, Camera, Building, Car, Save, X } from 'lucide-react';

/**
 * Faculty Member Registration Form
 * Comprehensive form for creating faculty member accounts
 * Includes all required fields for faculty personnel management
 */
export default function FacultyForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    facultyId: '',
    profilePhoto: null as File | null,
    department: '',
    vehicleDetails: {
      licensePlate: '',
      vehicleModel: '',
      vehicleColor: '',
      vehicleYear: '',
    },
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const departments = [
    'Computer Science',
    'Information Technology',
    'Electronics & Communication',
    'Mechanical Engineering',
    'Civil Engineering',
    'Electrical Engineering',
    'Business Administration',
    'Management Studies',
    'Mathematics',
    'Physics',
    'Chemistry',
    'English',
    'Other',
  ];

  const vehicleColors = [
    'White',
    'Black',
    'Silver',
    'Gray',
    'Red',
    'Blue',
    'Green',
    'Yellow',
    'Orange',
    'Brown',
    'Other',
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
    if (!formData.facultyId.trim()) newErrors.facultyId = 'Faculty ID is required';
    if (!formData.department) newErrors.department = 'Department is required';
    if (!formData.vehicleDetails.licensePlate.trim()) newErrors.licensePlate = 'License plate number is required';
    if (!formData.vehicleDetails.vehicleModel.trim()) newErrors.vehicleModel = 'Vehicle model is required';
    if (!formData.vehicleDetails.vehicleColor) newErrors.vehicleColor = 'Vehicle color is required';

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
        facultyId: '',
        profilePhoto: null,
        department: '',
        vehicleDetails: {
          licensePlate: '',
          vehicleModel: '',
          vehicleColor: '',
          vehicleYear: '',
        },
      });
      
      alert('Faculty member account created successfully!');
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
          <div className="p-3 bg-blue-100 rounded-lg">
            <Users className="w-8 h-8 text-blue-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Faculty Member Registration</h2>
            <p className="text-gray-600">Create a new faculty member account with complete details</p>
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
                  placeholder="faculty@college.edu"
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
                Faculty ID *
              </label>
              <div className="relative">
                <IdCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  value={formData.facultyId}
                  onChange={(e) => handleInputChange('facultyId', e.target.value)}
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                    errors.facultyId ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="FAC-2024-001"
                />
              </div>
              {errors.facultyId && <p className="mt-1 text-sm text-red-600">{errors.facultyId}</p>}
            </div>
          </div>

          {/* Profile Photo */}
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Profile Photo (Optional)
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

        {/* Department Information */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
            <Building className="w-5 h-5 text-blue-600" />
            Department Information
          </h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Department *
            </label>
            <select
              value={formData.department}
              onChange={(e) => handleInputChange('department', e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                errors.department ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              <option value="">Select department</option>
              {departments.map((dept) => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
            {errors.department && <p className="mt-1 text-sm text-red-600">{errors.department}</p>}
          </div>
        </Card>

        {/* Vehicle Details */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
            <Car className="w-5 h-5 text-blue-600" />
            Vehicle Details
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                License Plate Number *
              </label>
              <input
                type="text"
                value={formData.vehicleDetails.licensePlate}
                onChange={(e) => handleNestedInputChange('vehicleDetails', 'licensePlate', e.target.value.toUpperCase())}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                  errors.licensePlate ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="ABC-1234"
              />
              {errors.licensePlate && <p className="mt-1 text-sm text-red-600">{errors.licensePlate}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Vehicle Model *
              </label>
              <input
                type="text"
                value={formData.vehicleDetails.vehicleModel}
                onChange={(e) => handleNestedInputChange('vehicleDetails', 'vehicleModel', e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                  errors.vehicleModel ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Honda Civic, Toyota Camry, etc."
              />
              {errors.vehicleModel && <p className="mt-1 text-sm text-red-600">{errors.vehicleModel}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Vehicle Color *
              </label>
              <select
                value={formData.vehicleDetails.vehicleColor}
                onChange={(e) => handleNestedInputChange('vehicleDetails', 'vehicleColor', e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                  errors.vehicleColor ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Select vehicle color</option>
                {vehicleColors.map((color) => (
                  <option key={color} value={color}>{color}</option>
                ))}
              </select>
              {errors.vehicleColor && <p className="mt-1 text-sm text-red-600">{errors.vehicleColor}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Vehicle Year (Optional)
              </label>
              <input
                type="number"
                min="1990"
                max="2024"
                value={formData.vehicleDetails.vehicleYear}
                onChange={(e) => handleNestedInputChange('vehicleDetails', 'vehicleYear', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="2020"
              />
            </div>
          </div>

          {/* Vehicle Information Note */}
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0">
                <Car className="w-5 h-5 text-blue-600 mt-0.5" />
              </div>
              <div>
                <h4 className="text-sm font-medium text-blue-900">Vehicle Information</h4>
                <p className="text-sm text-blue-700 mt-1">
                  This information will be used for parking verification and security purposes. 
                  Please ensure all details are accurate as they will be cross-referenced during parking bookings.
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Booking Preferences */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
            <Users className="w-5 h-5 text-blue-600" />
            Account Information
          </h3>
          
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-2">Account Features</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Book parking spaces up to 7 days in advance</li>
                <li>• Receive booking confirmations via email and SMS</li>
                <li>• View parking history and booking status</li>
                <li>• Access to faculty-only parking zones</li>
                <li>• Real-time parking availability updates</li>
              </ul>
            </div>
            
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <h4 className="font-medium text-green-900 mb-2">Faculty Benefits</h4>
              <ul className="text-sm text-green-700 space-y-1">
                <li>• Priority access to reserved faculty parking spots</li>
                <li>• Extended booking periods during semester</li>
                <li>• Special rates for long-term parking</li>
                <li>• Direct support from parking management</li>
              </ul>
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
              {isSubmitting ? 'Creating Account...' : 'Create Faculty Account'}
            </button>
          </div>
        </Card>
      </form>
    </div>
  );
}
