"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: ""
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    
    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Please enter a valid email";
    }
    
    if (!form.password) {
      newErrors.password = "Password is required";
    } else if (form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    
    if (!isLogin) {
      if (!form.name.trim()) {
        newErrors.name = "Name is required";
      }
      
      if (form.password !== form.confirmPassword) {
        newErrors.confirmPassword = "Passwords don't match";
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    
    try {
      // Get existing registered users from localStorage
      const registeredUsers = JSON.parse(localStorage.getItem('registered_users') || '[]');

      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: form.email,
          password: form.password,
          name: form.name,
          registeredUsers: registeredUsers
        }),
      });

      const data = await response.json();

      if (data.success) {
        // If this is a new registration in fallback mode, store user
        if (data.shouldStore) {
          const newUserWithPassword = {
            ...data.user,
            password: form.password
          };
          const updatedUsers = [...registeredUsers, newUserWithPassword];
          localStorage.setItem('registered_users', JSON.stringify(updatedUsers));
        }

        // Store user info in localStorage for session management
        localStorage.setItem('currentUser', JSON.stringify(data.user));
        
        // Note: We do NOT clear transactions/goals on login.
        // Data persists until explicitly deleted by the user.
        
        // Dispatch custom event to update header
        window.dispatchEvent(new Event('userLogin'));
        
        // Force a page refresh to ensure header updates
        window.location.href = "/dashboard";
      } else {
        setErrors({ email: data.error });
        setLoading(false);
      }
    } catch (error) {
      console.error('Authentication error:', error);
      setErrors({ email: "Something went wrong. Please try again." });
      setLoading(false);
    }
  };

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setErrors({});
    setForm({
      email: "",
      password: "",
      confirmPassword: "",
      name: ""
    });
  };

  return (
    <main className="min-h-screen bg-background flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-3 mb-6">
            <span
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white"
              aria-hidden="true"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M8 3h8a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z" />
                <path d="M9 7h6" />
                <path d="M9 11h6" />
                <path d="M9 15h4" />
              </svg>
            </span>
            <span className="text-lg font-semibold tracking-tight">BudgetWise</span>
          </Link>
          
          <h1 className="text-2xl font-semibold tracking-tight">
            {isLogin ? "Welcome back" : "Create your account"}
          </h1>
          <p className="mt-2 text-sm text-foreground/60">
            {isLogin 
              ? "Sign in to access your financial dashboard" 
              : "Start tracking your finances today"
            }
          </p>
        </div>

        {/* Form */}
        <div className="rounded-2xl border border-foreground/10 bg-background p-6 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-foreground/70 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  placeholder="Enter your full name"
                  className={`w-full rounded-md border px-3 py-2 bg-background text-sm ${
                    errors.name ? 'border-rose-500' : 'border-foreground/15'
                  }`}
                />
                {errors.name && (
                  <p className="text-sm text-rose-500 mt-1">{errors.name}</p>
                )}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-foreground/70 mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => handleChange("email", e.target.value)}
                placeholder="Enter your email"
                className={`w-full rounded-md border px-3 py-2 bg-background text-sm ${
                  errors.email ? 'border-rose-500' : 'border-foreground/15'
                }`}
              />
              {errors.email && (
                <p className="text-sm text-rose-500 mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground/70 mb-2">
                Password
              </label>
              <input
                type="password"
                value={form.password}
                onChange={(e) => handleChange("password", e.target.value)}
                placeholder="Enter your password"
                className={`w-full rounded-md border px-3 py-2 bg-background text-sm ${
                  errors.password ? 'border-rose-500' : 'border-foreground/15'
                }`}
              />
              {errors.password && (
                <p className="text-sm text-rose-500 mt-1">{errors.password}</p>
              )}
            </div>

            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-foreground/70 mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  value={form.confirmPassword}
                  onChange={(e) => handleChange("confirmPassword", e.target.value)}
                  placeholder="Confirm your password"
                  className={`w-full rounded-md border px-3 py-2 bg-background text-sm ${
                    errors.confirmPassword ? 'border-rose-500' : 'border-foreground/15'
                  }`}
                />
                {errors.confirmPassword && (
                  <p className="text-sm text-rose-500 mt-1">{errors.confirmPassword}</p>
                )}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full inline-flex h-11 items-center justify-center rounded-xl bg-blue-600 px-6 text-sm font-medium text-white hover:opacity-95 disabled:opacity-60"
            >
              {loading ? "Loading..." : (isLogin ? "Sign In" : "Create Account")}
            </button>
          </form>

          {/* Forgot Password (only show on login) */}
          {isLogin && (
            <div className="text-center mt-4">
              <button className="text-sm text-blue-600 hover:text-blue-700">
                Forgot your password?
              </button>
            </div>
          )}

          {/* Toggle Mode */}
          <div className="border-t border-foreground/10 mt-6 pt-6 text-center">
            <p className="text-sm text-foreground/60">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <button
                type="button"
                onClick={toggleMode}
                className="ml-2 text-blue-600 hover:text-blue-700 font-medium"
              >
                {isLogin ? "Sign up" : "Sign in"}
              </button>
            </p>
          </div>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-6">
          <Link 
            href="/" 
            className="text-sm text-foreground/60 hover:text-foreground"
          >
            ← Back to home
          </Link>
        </div>
      </div>
    </main>
  );
}