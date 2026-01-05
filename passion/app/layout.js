import "./globals.css";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Budget Tracker",
  description: "Track spending, set goals, and stay on budget.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <div className="min-h-screen bg-background text-foreground font-sans">
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
                <span className="text-sm font-semibold tracking-tight">Budget Tracker</span>
              </Link>

              <nav className="hidden flex-1 items-center justify-center gap-8 text-sm text-foreground/70 sm:flex">
                <Link className="hover:text-foreground" href="/">
                  Home
                </Link>
                <Link className="hover:text-foreground" href="/about">
                  About
                </Link>
                <Link className="hover:text-foreground" href="/features">
                  Features
                </Link>
                <Link className="hover:text-foreground" href="/product">
                  Product
                </Link>
                <Link className="hover:text-foreground" href="/why-us">
                  Why Us
                </Link>
                <Link className="hover:text-foreground" href="/dashboard">
                  Dashboard
                </Link>
              </nav>

              <Link
                href="/dashboard"
                className="ml-auto inline-flex h-10 items-center justify-center rounded-full bg-blue-600 px-5 text-sm font-medium text-white hover:opacity-95"
              >
                Get Started
              </Link>
            </div>
          </header>

          {children}
        </div>
      </body>
    </html>
  );
}
