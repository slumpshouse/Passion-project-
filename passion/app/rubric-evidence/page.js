"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RubricEvidencePage() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = localStorage.getItem('currentUser');
    if (user) {
      const parsedUser = JSON.parse(user);
      setCurrentUser(parsedUser);
      
      // Check if user has admin role
      if (parsedUser.role !== 'admin') {
        router.push('/dashboard');
        return;
      }
    } else {
      router.push('/login');
      return;
    }
    setLoading(false);
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-foreground/60">Loading...</p>
        </div>
      </div>
    );
  }

  if (!currentUser || currentUser.role !== 'admin') {
    return null; // Will redirect
  }
  // Replace evidence structure with CCC items (three core sections)
  const evidenceItems = [
    {
      category: "CCC.1.1: Understand and identify a problem",
      items: [
        {
          title: "Understand & Identify",
          description: "How well can I create a project plan?",
          evidence: "/reflection - CCC.1.1 section",
          status: "Complete",
          file: "app/reflection/page.js"
        }
      ]
    },
    {
      category: "CCC.1.2: Identify and plan a solution",
      items: [
        {
          title: "Plan Solution",
          description: "How well do I follow guidelines to create a high quality product?",
          evidence: "/reflection - CCC.1.2 section",
          status: "Complete",
          file: "app/reflection/page.js"
        }
      ]
    },
    {
      category: "CCC.1.3: Implement a solution",
      items: [
        {
          title: "Implementation",
          description: "How well do I create a product that solves a real-world problem and impacts an authentic audience?",
          evidence: "/reflection - CCC.1.3 section",
          status: "Complete",
          file: "app/reflection/page.js"
        }
      ]
    }
  ];

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-6xl px-6 py-10">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-semibold tracking-tight">Rubric Evidence</h1>
              <p className="text-foreground/60">Project documentation and implementation evidence</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-sm text-foreground/70">
                Logged in as: <span className="font-medium">{currentUser.name}</span>
              </div>
              <Link
                href="/dashboard"
                className="inline-flex h-10 items-center justify-center rounded-xl bg-blue-600 px-4 text-sm font-medium text-white hover:opacity-95"
              >
                Back to Dashboard
              </Link>
            </div>
          </div>

          {/* Summary Stats */}
          <div className="grid gap-6 md:grid-cols-4">
            {evidenceItems.map((category) => (
              <div key={category.category} className="rounded-2xl border border-foreground/10 bg-background p-6 shadow-sm">
                <div className="text-sm text-foreground/70">{category.category}</div>
                <div className="mt-2 text-lg font-semibold tracking-tight">{category.items.length} Items</div>
                <div className="mt-1 text-sm text-emerald-600">
                  {category.items.filter(item => item.status === 'Complete').length} Complete
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Evidence Categories */}
        <div className="space-y-8">
          {evidenceItems.map((category) => (
            <div key={category.category} className="rounded-3xl border border-foreground/10 bg-background p-6 shadow-sm">
              <h2 className="text-xl font-semibold tracking-tight mb-6">{category.category}</h2>
              
              <div className="grid gap-6 lg:grid-cols-2">
                {category.items.map((item, index) => (
                  <div key={index} className="rounded-2xl border border-foreground/10 bg-foreground/2 p-6">
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-base font-semibold tracking-tight">{item.title}</h3>
                      <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${
                        item.status === 'Complete' 
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                          : 'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}>
                        {item.status}
                      </span>
                    </div>
                    
                    <p className="text-sm text-foreground/70 mb-4">{item.description}</p>
                    
                    <div className="space-y-3">
                      <div>
                        <div className="text-xs font-medium text-foreground/60 mb-1">Evidence Location:</div>
                        <div className="text-sm bg-foreground/10 rounded-lg px-3 py-2 font-mono">
                          {item.evidence}
                        </div>
                      </div>
                      
                      <div>
                        <div className="text-xs font-medium text-foreground/60 mb-1">Implementation File:</div>
                        <div className="text-sm bg-blue-50 text-blue-700 rounded-lg px-3 py-2 font-mono">
                          {item.file}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Project Summary */}
        <div className="mt-10 rounded-3xl bg-blue-50 border border-blue-200 p-6 sm:p-10">
          <h2 className="text-xl font-semibold tracking-tight mb-4">Project Summary</h2>
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="rounded-2xl bg-white/60 p-6">
              <h3 className="text-base font-semibold mb-3">Technical Stack</h3>
              <ul className="text-sm text-foreground/70 space-y-1">
                <li>• Next.js 16.1 (React Framework)</li>
                <li>• Tailwind CSS (Styling)</li>
                <li>• OpenAI API (AI Insights)</li>
                <li>• Local Storage (Data Persistence)</li>
                <li>• JavaScript/ES6+ (Logic)</li>
              </ul>
            </div>
            
            <div className="rounded-2xl bg-white/60 p-6">
              <h3 className="text-base font-semibold mb-3">Key Features</h3>
              <ul className="text-sm text-foreground/70 space-y-1">
                <li>• Transaction tracking & categorization</li>
                <li>• Visual spending analytics</li>
                <li>• Savings goal management</li>
                <li>• AI-powered financial insights</li>
                <li>• Role-based access control</li>
              </ul>
            </div>
            
            <div className="rounded-2xl bg-white/60 p-6">
              <h3 className="text-base font-semibold mb-3">Documentation</h3>
              <ul className="text-sm text-foreground/70 space-y-1">
                <li>• Complete solution documentation</li>
                <li>• 6-week development timeline</li>
                <li>• Challenge analysis & mitigation</li>
                <li>• User interaction specifications</li>
                <li>• Technical implementation details</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}