"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function ReflectionPage() {
  const [currentUser, setCurrentUser] = useState(null);
  const [reflectionData, setReflectionData] = useState({
    understandProblem: "",
    identifyPlanSolution: "",
    implementSolution: "",
    whatWentWell: "",
    whatDidntGoWell: "",
    whatChangedDuringProject: "",
    whatToBuildNext: ""
  });

  // Make reflection view read-only by default
  const editable = false;

  // Check user role on mount
  useEffect(() => {
    const user = localStorage.getItem('currentUser');
    if (user) {
      const userData = JSON.parse(user);
      setCurrentUser(userData);
      
      // Redirect non-admin users
      if (userData.role !== 'admin') {
        window.location.href = '/dashboard';
        return;
      }
    } else {
      // Redirect non-authenticated users
      window.location.href = '/';
      return;
    }

    // Load saved reflection data
    const savedReflection = localStorage.getItem('admin_reflection');
    if (savedReflection) {
      setReflectionData(JSON.parse(savedReflection));
    }
  }, []);

  // Save reflection data whenever it changes
  useEffect(() => {
    // Only save when editable is enabled (prevents accidental writes)
    if (editable && currentUser?.role === 'admin') {
      localStorage.setItem('admin_reflection', JSON.stringify(reflectionData));
    }
  }, [reflectionData, currentUser]);

  const handleInputChange = (field, value) => {
    setReflectionData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const clearAllData = () => {
    if (confirm('Are you sure you want to clear all reflection data? This cannot be undone.')) {
      setReflectionData({
        understandProblem: "",
        identifyPlanSolution: "",
        implementSolution: "",
        whatWentWell: "",
        whatDidntGoWell: "",
        whatChangedDuringProject: "",
        whatToBuildNext: ""
      });
    }
  };

  const exportData = () => {
    const dataStr = JSON.stringify(reflectionData, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `reflection_${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  if (!currentUser || currentUser.role !== 'admin') {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Access Denied</h1>
          <p className="text-foreground/60 mb-6">Admin access required to view this page.</p>
          <Link href="/dashboard" className="text-blue-600 hover:text-blue-700">
            Return to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-foreground/10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/dashboard" className="text-2xl font-bold text-foreground">
                Budget Tracker
              </Link>
              <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                Admin
              </span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-foreground/60">
                Welcome, {currentUser.name}
              </span>
              <Link
                href="/dashboard"
                className="text-sm text-blue-600 hover:text-blue-700"
              >
                Back to Dashboard
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Project Reflection</h1>
            <p className="text-foreground/60">
              Reflect on the development process and plan for future improvements.
            </p>
          </div>

          {/* Reflection Sections */}
          <div className="space-y-8">
            {/* Required Reflection Sections */}
            <section className="bg-background border border-foreground/10 rounded-2xl p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-foreground mb-4">What went well</h2>
              <textarea
                value={reflectionData.whatWentWell}
                onChange={editable ? (e) => handleInputChange('whatWentWell', e.target.value) : undefined}
                readOnly={!editable}
                placeholder="What went well"
                className="w-full h-28 p-4 border border-foreground/15 rounded-lg bg-background text-foreground placeholder:text-foreground/50 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </section>

            <section className="bg-background border border-foreground/10 rounded-2xl p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-foreground mb-4">What didn’t go well</h2>
              <textarea
                value={reflectionData.whatDidntGoWell}
                onChange={editable ? (e) => handleInputChange('whatDidntGoWell', e.target.value) : undefined}
                readOnly={!editable}
                placeholder="What didn’t go well"
                className="w-full h-28 p-4 border border-foreground/15 rounded-lg bg-background text-foreground placeholder:text-foreground/50 resize-none focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              />
            </section>

            <section className="bg-background border border-foreground/10 rounded-2xl p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-foreground mb-4">What you changed during the project and why</h2>
              <textarea
                value={reflectionData.whatChangedDuringProject}
                onChange={editable ? (e) => handleInputChange('whatChangedDuringProject', e.target.value) : undefined}
                readOnly={!editable}
                placeholder="What you changed during the project and why"
                className="w-full h-28 p-4 border border-foreground/15 rounded-lg bg-background text-foreground placeholder:text-foreground/50 resize-none focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </section>

            <section className="bg-background border border-foreground/10 rounded-2xl p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-foreground mb-4">What you'd build next if you had more time</h2>
              <textarea
                value={reflectionData.whatToBuildNext}
                onChange={editable ? (e) => handleInputChange('whatToBuildNext', e.target.value) : undefined}
                readOnly={!editable}
                placeholder="What you'd build next if you had more time"
                className="w-full h-28 p-4 border border-foreground/15 rounded-lg bg-background text-foreground placeholder:text-foreground/50 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </section>
          </div>

          {/* Auto-save Notice */}
          <div className="mt-8 text-center">
            <p className="text-sm text-foreground/60">
              Your reflection is automatically saved as you type.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}