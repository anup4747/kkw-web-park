"use client";

import { useState } from "react";
import { Eye, EyeOff, BookOpen, ArrowRight, Shield, Users, Car } from "lucide-react";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [focusedField, setFocusedField] = useState("");

  const handleSubmit = async () => {
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      alert("Access granted to college portal! (demo)");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col lg:flex-row">
      {/* Left Side - Hero Section */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 flex flex-col justify-center px-12 text-white">
          <div className="mb-8">
            <div className="flex items-center mb-6">
              <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                <Car className="w-8 h-8" />
              </div>
              <span className="ml-4 text-2xl font-bold">KKW Parking</span>
            </div>
            <h1 className="text-5xl font-bold leading-tight mb-6">
              Security Parking
              <br />
              <span className="text-emerald-200">Management</span>
              <br />
              System
            </h1>
            <p className="text-xl text-emerald-100 mb-8 leading-relaxed">
              Secure access for authorized personnel to monitor and manage campus parking operations.
            </p>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center text-emerald-100">
              <Shield className="w-5 h-5 mr-3 text-emerald-300" />
              <span>Secure & encrypted access</span>
            </div>
            <div className="flex items-center text-emerald-100">
              <Users className="w-5 h-5 mr-3 text-emerald-300" />
              <span>Real-time security monitoring</span>
            </div>
          </div>
        </div>
        
        {/* Decorative circles */}
        <div className="absolute top-20 right-20 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-32 w-48 h-48 bg-emerald-300/20 rounded-full blur-2xl"></div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-white">
        <div className="w-full max-w-md">
          {/* Mobile Header */}
          <div className="lg:hidden mb-8 text-center">
            <div className="inline-flex items-center mb-4">
              <div className="p-2 bg-emerald-100 rounded-lg">
                <Car className="w-6 h-6 text-emerald-600" />
              </div>
              <span className="ml-3 text-xl font-bold text-slate-800">KKW Parking</span>
            </div>
          </div>

          <div className="mb-6 md:mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-2">Welcome Back!</h2>
            <p className="text-slate-600 text-sm sm:text-base">Sign in to access security dashboard</p>
          </div>

          <div className="space-y-6">
            {/* Email Input */}
            <div className="space-y-2">
              <label 
                htmlFor="email" 
                className="block text-sm font-semibold text-slate-700"
              >
                Staff Email
              </label>
              <div className="relative">
                <input
                  id="email"
                  type="email"
                  required
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => setFocusedField("")}
                  className={`w-full px-4 py-4 border-2 rounded-xl transition-all duration-300 ${
                    focusedField === "email" 
                      ? "border-emerald-500 shadow-lg shadow-emerald-500/20 bg-emerald-50/50" 
                      : "border-slate-200 hover:border-slate-300"
                  } focus:outline-none placeholder-slate-400`}
                  placeholder="staff@kkwcollege.edu"
                />
                <div className={`absolute right-4 top-1/2 transform -translate-y-1/2 transition-all duration-300 ${
                  focusedField === "email" ? "text-emerald-500" : "text-slate-400"
                }`}>
                  <div className="w-2 h-2 bg-current rounded-full"></div>
                </div>
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <label 
                htmlFor="password" 
                className="block text-sm font-semibold text-slate-700"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  onFocus={() => setFocusedField("password")}
                  onBlur={() => setFocusedField("")}
                  className={`w-full px-4 py-4 border-2 rounded-xl transition-all duration-300 ${
                    focusedField === "password" 
                      ? "border-emerald-500 shadow-lg shadow-emerald-500/20 bg-emerald-50/50" 
                      : "border-slate-200 hover:border-slate-300"
                  } focus:outline-none placeholder-slate-400 pr-12`}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Options */}
            <div className="flex items-center justify-between">
              <label className="flex items-center cursor-pointer group">
                <input
                  type="checkbox"
                  className="sr-only"
                />
                <div className="w-5 h-5 border-2 border-slate-300 rounded group-hover:border-emerald-500 transition-colors flex items-center justify-center">
                  <div className="w-2 h-2 bg-emerald-500 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
                <span className="ml-3 text-sm text-slate-600">Keep me signed in</span>
              </label>
              
              <button className="text-sm text-emerald-600 hover:text-emerald-700 font-medium transition-colors">
                Forgot Password?
              </button>
            </div>

            {/* Login Button */}
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center group"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-3"></div>
                  Signing you in...
                </>
              ) : (
                <>
                  Access Security Dashboard
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>

            {/* Divider */}
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-4 text-slate-500">New staff member?</span>
              </div>
            </div>

            {/* Sign Up */}
            <button className="w-full border-2 border-slate-200 hover:border-emerald-300 text-slate-700 hover:text-emerald-700 font-semibold py-4 px-6 rounded-xl transition-all duration-300 hover:bg-emerald-50">
              Request Access
            </button>
          </div>

          {/* Footer */}
          <div className="mt-8 text-center text-xs text-slate-500">
            <p>© 2025 KKW College Parking System • Privacy Policy • Terms of Service</p>
          </div>
        </div>
      </div>
    </div>
  );
}
