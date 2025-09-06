"use client";

import { useState } from "react";
import { MessageSquare, Send, Bug, Lightbulb, Star, CheckCircle } from "lucide-react";

export default function FeedbackPage() {
  const [feedbackType, setFeedbackType] = useState("general");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 2000);
  };

  if (isSubmitted) {
    return (
      <div className="bg-gradient-to-br from-slate-50 to-slate-100 min-h-screen flex items-center justify-center">
        <div className="max-w-md mx-auto text-center bg-white rounded-xl shadow-lg p-8">
          <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-emerald-600" />
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Thank You!</h2>
          <p className="text-slate-600 mb-6">
            Your feedback has been submitted successfully. We'll review it and get back to you soon.
          </p>
          <button
            onClick={() => setIsSubmitted(false)}
            className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300"
          >
            Submit Another Feedback
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-slate-50 to-slate-100 min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 text-white py-8 md:py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 md:mb-4">Security Feedback & Support</h1>
          <p className="text-lg sm:text-xl text-emerald-100 max-w-3xl mx-auto px-4">
            Report security issues, system bugs, or suggest improvements for the parking management system.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8 md:py-12">
        <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 lg:p-8">
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 bg-emerald-100 rounded-lg">
              <MessageSquare className="w-8 h-8 text-emerald-600" />
            </div>
            <h2 className="text-3xl font-bold text-slate-800">Security System Feedback</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Feedback Type */}
            <div className="space-y-3">
              <label className="block text-lg font-semibold text-slate-700">Feedback Type</label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <button
                  type="button"
                  onClick={() => setFeedbackType("bug")}
                  className={`p-4 rounded-lg border-2 transition-all duration-300 ${
                    feedbackType === "bug"
                      ? "border-red-500 bg-red-50"
                      : "border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <Bug className="w-6 h-6 mx-auto mb-2 text-red-600" />
                  <div className="font-medium text-slate-700">Bug Report</div>
                  <div className="text-sm text-slate-500">Report security issues or system errors</div>
                </button>
                <button
                  type="button"
                  onClick={() => setFeedbackType("feature")}
                  className={`p-4 rounded-lg border-2 transition-all duration-300 ${
                    feedbackType === "feature"
                      ? "border-blue-500 bg-blue-50"
                      : "border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <Lightbulb className="w-6 h-6 mx-auto mb-2 text-blue-600" />
                  <div className="font-medium text-slate-700">Feature Request</div>
                  <div className="text-sm text-slate-500">Suggest security improvements</div>
                </button>
                <button
                  type="button"
                  onClick={() => setFeedbackType("general")}
                  className={`p-4 rounded-lg border-2 transition-all duration-300 ${
                    feedbackType === "general"
                      ? "border-emerald-500 bg-emerald-50"
                      : "border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <Star className="w-6 h-6 mx-auto mb-2 text-emerald-600" />
                  <div className="font-medium text-slate-700">General</div>
                  <div className="text-sm text-slate-500">Other security feedback</div>
                </button>
              </div>
            </div>

            {/* Subject */}
            <div className="space-y-2">
              <label htmlFor="subject" className="block text-lg font-semibold text-slate-700">
                Subject
              </label>
              <input
                id="subject"
                type="text"
                required
                className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-emerald-500 focus:outline-none transition-colors"
                placeholder="Brief description of your feedback"
              />
            </div>

            {/* Details */}
            <div className="space-y-2">
              <label htmlFor="details" className="block text-lg font-semibold text-slate-700">
                Details
              </label>
              <textarea
                id="details"
                rows={6}
                required
                className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-emerald-500 focus:outline-none transition-colors resize-none"
                placeholder="Please provide detailed information about your feedback, including steps to reproduce if reporting a bug, or specific suggestions if requesting a feature."
              />
            </div>

            {/* Contact Info */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="email" className="block text-lg font-semibold text-slate-700">
                  Email (Optional)
                </label>
                <input
                  id="email"
                  type="email"
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-emerald-500 focus:outline-none transition-colors"
                  placeholder="your.email@kkwcollege.edu"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="priority" className="block text-lg font-semibold text-slate-700">
                  Priority
                </label>
                <select
                  id="priority"
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-emerald-500 focus:outline-none transition-colors"
                >
                  <option value="low">Low - General feedback</option>
                  <option value="medium" selected>Medium - Minor issue</option>
                  <option value="high">High - Major issue</option>
                  <option value="urgent">Urgent - Security breach</option>
                </select>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold py-4 px-6 rounded-lg transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center group"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-3"></div>
                    Submitting...
                  </>
                ) : (
                  <>
                    Submit Feedback
                    <Send className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Additional Info */}
          <div className="mt-8 p-6 bg-slate-50 rounded-lg">
            <h3 className="text-lg font-semibold text-slate-800 mb-3">What happens next?</h3>
            <ul className="space-y-2 text-slate-600">
              <li className="flex items-start gap-2">
                <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                <span>We'll review your feedback within 24-48 hours</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                <span>For bug reports, we'll investigate and provide updates</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                <span>Feature requests will be considered for future updates</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                <span>We may contact you for additional information if needed</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}


