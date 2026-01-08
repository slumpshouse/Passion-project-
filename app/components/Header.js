'use client';
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Header() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      const userData = JSON.parse(currentUser);
      setUser(userData);
      console.log('Header: User loaded', userData); // Debug log
    }

    // Listen for storage changes to update user state when login/logout happens
    const handleStorageChange = () => {
      const updatedUser = localStorage.getItem('currentUser');
      if (updatedUser) {
        const userData = JSON.parse(updatedUser);
        setUser(userData);
        console.log('Header: User updated', userData); // Debug log
      } else {
        setUser(null);
        console.log('Header: User cleared'); // Debug log
      }
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Also listen for custom events
    window.addEventListener('userLogin', handleStorageChange);
    window.addEventListener('userLogout', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('userLogin', handleStorageChange);
      window.removeEventListener('userLogout', handleStorageChange);
    };
  }, []);

  const handleLogout = () => {
    // Clear user data from localStorage
    localStorage.removeItem('currentUser');
    setUser(null);
    
    // Dispatch custom event to update other components
    window.dispatchEvent(new Event('userLogout'));
    
    // Redirect to home page
    router.push('/');
  };

  return (
    <header className="border-b border-foreground/10">
      <div className="mx-auto flex w-full max-w-6xl items-center gap-6 px-6 py-4">
        <Link href="/" className="flex items-center gap-3">
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
          <span className="text-sm font-semibold tracking-tight">BudgetWise</span>
        </Link>

        <nav className="hidden flex-1 items-center justify-center gap-8 text-sm text-foreground/70 sm:flex">
          <Link className="hover:text-foreground" href="/">
            Home
          </Link>
          {user && (
            <Link className="hover:text-foreground" href="/dashboard">
              Dashboard
            </Link>
          )}
          <Link className="hover:text-foreground" href="/about">
            About
          </Link>
          <Link className="hover:text-foreground" href="/features">
            Features
          </Link>
          <Link className="hover:text-foreground" href="/why-us">
            Why Us
          </Link>
          {user && user.role === 'admin' && (
            <Link className="hover:text-foreground" href="/reflection">
              Reflection
            </Link>
          )}
        </nav>

        <div className="ml-auto flex items-center gap-4">
          {user ? (
            <>
              <span className="text-sm text-foreground/70">
                Welcome, {user.name}
              </span>
              <button
                onClick={handleLogout}
                className="inline-flex h-10 items-center justify-center rounded-full bg-red-600 px-5 text-sm font-medium text-white hover:opacity-95"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="inline-flex h-10 items-center justify-center rounded-full bg-blue-600 px-5 text-sm font-medium text-white hover:opacity-95"
            >
              Get Started
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}