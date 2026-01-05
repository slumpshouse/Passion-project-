import "./globals.css";
import { Geist, Geist_Mono } from "next/font/google";
import Header from "./components/Header";

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
          <Header />
          {children}
        </div>
      </body>
    </html>
  );
}
