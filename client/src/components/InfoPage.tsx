"use client";

import Navbar from "./Navbar";

interface InfoPageProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

export default function InfoPage({ title, subtitle, children }: InfoPageProps) {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-br from-[#0a0b1e] via-[#101228] to-[#1a1c3a] text-white px-4 pt-20 pb-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-2">{title}</h1>
          {subtitle && <p className="text-gray-300 mb-8">{subtitle}</p>}
          <div className="bg-[#161832]/80 backdrop-blur-md rounded-2xl p-8 shadow-lg border border-[#00F5A0]/20">
            {children}
          </div>
        </div>
      </main>
    </>
  );
}