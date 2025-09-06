import { Car, MapPin, Clock, Shield, Users, Phone, Mail, Building } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="bg-gradient-to-br from-slate-50 to-slate-100 min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 text-white py-8 md:py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 md:mb-4">Security & Administration</h1>
          <p className="text-lg sm:text-xl text-emerald-100 max-w-3xl mx-auto px-4">
            Secure parking management system for authorized personnel and campus security operations
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        {/* Security System Overview */}
        <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 lg:p-8 mb-8 md:mb-12">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-emerald-100 rounded-lg">
              <Shield className="w-8 h-8 text-emerald-600" />
            </div>
            <h2 className="text-3xl font-bold text-slate-800">Security System Overview</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <p className="text-slate-600 text-lg leading-relaxed mb-6">
                The KKW College Security Parking Management System is designed exclusively for authorized 
                personnel including security staff, administrators, and faculty members. This secure platform 
                provides real-time monitoring, access control, and management capabilities for campus parking 
                operations and security surveillance.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-emerald-600" />
                  <span className="text-slate-700">Authorized Personnel Only</span>
                </div>
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-emerald-600" />
                  <span className="text-slate-700">Secure Access Control</span>
                </div>
                <div className="flex items-center gap-3">
                  <Car className="w-5 h-5 text-emerald-600" />
                  <span className="text-slate-700">60 Monitored Parking Spots</span>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-slate-800 mb-4">Security Mission</h3>
              <p className="text-slate-600">
                To maintain campus security and safety through advanced parking monitoring, 
                access control, and real-time surveillance while ensuring efficient management 
                of parking resources for authorized personnel.
              </p>
            </div>
          </div>
        </div>

        {/* Security Monitoring System */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Car className="w-8 h-8 text-blue-600" />
            </div>
            <h2 className="text-3xl font-bold text-slate-800">Security Monitoring System</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-slate-50 rounded-lg">
              <MapPin className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-800 mb-2">3 Security Zones</h3>
              <p className="text-slate-600">Main Gate, Faculty Block, and Student Area with 20 monitored spots each</p>
            </div>
            <div className="text-center p-6 bg-slate-50 rounded-lg">
              <Clock className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-800 mb-2">Real-time Surveillance</h3>
              <p className="text-slate-600">Live monitoring and instant security alerts for unauthorized access</p>
            </div>
            <div className="text-center p-6 bg-slate-50 rounded-lg">
              <Shield className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-800 mb-2">Access Control</h3>
              <p className="text-slate-600">Secure authentication for security staff, admins, and authorized faculty</p>
            </div>
          </div>
        </div>

        {/* Security Protocols */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
          <h2 className="text-3xl font-bold text-slate-800 mb-6">Security Protocols & Procedures</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-slate-800 mb-4">Security Guidelines</h3>
              <ul className="space-y-3 text-slate-600">
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Monitor all parking zones for unauthorized vehicles</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Verify parking permits and access credentials</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Report suspicious activities immediately</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Maintain security logs and incident reports</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-slate-800 mb-4">Monitoring Schedule</h3>
              <div className="space-y-3 text-slate-600">
                <div className="flex justify-between">
                  <span>Monday - Friday:</span>
                  <span className="font-medium">24/7 Surveillance</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday:</span>
                  <span className="font-medium">24/7 Surveillance</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday:</span>
                  <span className="font-medium">24/7 Surveillance</span>
                </div>
                <div className="flex justify-between">
                  <span>Emergency:</span>
                  <span className="font-medium">Immediate Response</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Security Contact Information */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-slate-800 mb-6">Security Contact Information</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-slate-800 mb-4">Security Office</h3>
              <div className="flex items-start gap-3 text-slate-600">
                <MapPin className="w-5 h-5 text-emerald-600 mt-1" />
                <div>
                  <p>KKW College Security Office</p>
                  <p>Building A, Ground Floor</p>
                  <p>123 Education Street, Academic City</p>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-slate-800 mb-4">Emergency Contacts</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-slate-600">
                  <Phone className="w-5 h-5 text-emerald-600" />
                  <span>Security Hotline: +1 (555) 911-0000</span>
                </div>
                <div className="flex items-center gap-3 text-slate-600">
                  <Mail className="w-5 h-5 text-emerald-600" />
                  <span>security@kkwcollege.edu</span>
                </div>
                <div className="flex items-center gap-3 text-slate-600">
                  <Shield className="w-5 h-5 text-emerald-600" />
                  <span>admin@kkwcollege.edu</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


