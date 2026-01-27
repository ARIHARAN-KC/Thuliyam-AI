"use client";

import { Construction, Clock, Sparkles, AudioWaveform, Video, FileText, ImageIcon, Zap, Target, Rocket } from "lucide-react";
import Navbar from "@/components/Navbar";

export default function ComingSoon() {
  return (
    <>
      <Navbar />
      
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@900&family=Space+Mono:wght@400;700&family=Crimson+Pro:wght@300;600&display=swap');
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }

        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }
        
        @keyframes ticker {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        @keyframes fadeSlideUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes scaleReveal {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        @keyframes borderDraw {
          from {
            clip-path: inset(0 100% 0 0);
          }
          to {
            clip-path: inset(0 0 0 0);
          }
        }
        
        @keyframes pulseGlow {
          0%, 100% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.6;
          }
        }

        .coming-soon-page {
          min-height: 100vh;
          background: 
            radial-gradient(ellipse at 50% 10%, rgba(16, 18, 40, 0.8) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 80%, rgba(255, 119, 198, 0.05) 0%, transparent 50%),
            linear-gradient(180deg, #0A0B1E 0%, #1A1B3E 50%, #0A0B1E 100%);
          position: relative;
          overflow: hidden;
          font-family: 'Inter', sans-serif;
          padding-top: 6rem;
        }

        .coming-soon-page::before {
          content: '';
          position: absolute;
          inset: 0;
          background: 
            url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23000' fill-opacity='0.03' fill-rule='evenodd'/%3E%3C/svg%3E");
          opacity: 0.3;
          animation: shimmer 20s linear infinite;
          pointer-events: none;
        }
        
        .editorial-hero {
          font-family: 'Playfair Display', serif;
          font-weight: 900;
          letter-spacing: -0.04em;
          line-height: 0.9;
        }
        
        .mono-text {
          font-family: 'Space Mono', monospace;
          letter-spacing: 0.05em;
        }
        
        .serif-body {
          font-family: 'Crimson Pro', serif;
          font-weight: 300;
          letter-spacing: 0.01em;
          line-height: 1.7;
        }
        
        .ticker-wrap {
          overflow: hidden;
          white-space: nowrap;
          border-top: 1px solid rgba(0, 245, 160, 0.3);
          border-bottom: 1px solid rgba(0, 245, 160, 0.3);
          background: rgba(16, 18, 40, 0.7);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
        }
        
        .ticker {
          display: inline-block;
          animation: ticker 30s linear infinite;
        }
        
        .brutalist-border {
          background: rgba(16, 18, 40, 0.7);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-radius: 16px;
          border: 1px solid rgba(255, 255, 255, 0.15);
          box-shadow: 
            0 10px 40px rgba(0, 0, 0, 0.2),
            0 0 0 1px rgba(255, 255, 255, 0.1);
          transition: all 0.4s ease;
          position: relative;
          overflow: hidden;
        }

        .brutalist-border::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, 
            rgba(0, 245, 160, 0.05) 0%, 
            transparent 50%, 
            rgba(255, 119, 198, 0.05) 100%);
          opacity: 0;
          transition: opacity 0.4s ease;
        }

        .brutalist-border:hover::before {
          opacity: 1;
        }

        .brutalist-border:hover {
          transform: translateY(-5px);
          border-color: rgba(0, 245, 160, 0.3);
          box-shadow: 
            0 20px 60px rgba(0, 245, 160, 0.2),
            0 0 0 1px rgba(0, 245, 160, 0.2);
        }
        
        .feature-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2px;
          background: linear-gradient(135deg, 
            rgba(0, 245, 160, 0.1) 0%, 
            rgba(120, 119, 198, 0.1) 100%);
          border-radius: 24px;
          overflow: hidden;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        }
        
        @media (min-width: 768px) {
          .feature-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        
        @media (min-width: 1024px) {
          .feature-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }
        
        .feature-cell {
          background: rgba(16, 18, 40, 0.7);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          padding: 3rem 2rem;
          position: relative;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          border: 1px solid rgba(255, 255, 255, 0.05);
        }
        
        .feature-cell:hover {
          background: rgba(26, 27, 62, 0.7);
          transform: translateY(-5px);
          border-color: rgba(0, 245, 160, 0.3);
        }
        
        .feature-cell::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: linear-gradient(90deg, #00F5A0, #7877C6);
          opacity: 0;
          transition: opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .feature-cell:hover::after {
          opacity: 1;
        }
        
        .stagger-1 { animation-delay: 0.1s; }
        .stagger-2 { animation-delay: 0.2s; }
        .stagger-3 { animation-delay: 0.3s; }
        .stagger-4 { animation-delay: 0.4s; }
        .stagger-5 { animation-delay: 0.5s; }
        .stagger-6 { animation-delay: 0.6s; }
        
        .fade-up {
          animation: fadeSlideUp 0.8s ease-out forwards;
          opacity: 0;
        }
        
        .scale-reveal {
          animation: scaleReveal 0.6s ease-out forwards;
          opacity: 0;
        }
        
        .status-bar {
          height: 4px;
          background: linear-gradient(90deg, 
            #00F5A0 0%, 
            #7877C6 33%, 
            #FF77C6 66%, 
            #00F5A0 100%);
          background-size: 200% 100%;
          animation: shimmer 3s linear infinite;
        }
        
        .editorial-number {
          font-family: 'Playfair Display', serif;
          font-weight: 900;
          font-size: 8rem;
          line-height: 1;
          background: linear-gradient(135deg, #00F5A0 0%, #7877C6 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-shadow: 0 10px 30px rgba(0, 245, 160, 0.2);
        }
        
        @media (max-width: 768px) {
          .editorial-number {
            font-size: 4rem;
          }
          
          .coming-soon-page {
            padding-top: 4rem;
          }
        }

        .glow-text {
          text-shadow: 0 0 20px rgba(0, 245, 160, 0.5);
        }

        .gradient-text {
          background: linear-gradient(135deg, #00F5A0 0%, #7877C6 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .section-glow {
          position: absolute;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle, rgba(0, 245, 160, 0.15) 0%, transparent 70%);
          filter: blur(60px);
          opacity: 0.3;
          z-index: -1;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
      `}</style>
      
      <main className="coming-soon-page">
        <div className="section-glow"></div>
        
        {/* Status Bar */}
        <div className="status-bar"></div>
        
        {/* Running Ticker */}
        <div className="ticker-wrap py-4">
          <div className="ticker">
            <span className="mono-text gradient-text text-sm font-bold px-8">
              LAUNCHING SOON • AI-POWERED ANALYSIS • NEXT GENERATION TECHNOLOGY • 
              LAUNCHING SOON • AI-POWERED ANALYSIS • NEXT GENERATION TECHNOLOGY • 
              LAUNCHING SOON • AI-POWERED ANALYSIS • NEXT GENERATION TECHNOLOGY • 
            </span>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-16 md:py-24 relative z-10">
          {/* Hero Section - Editorial Magazine Style */}
          <div className="mb-24 fade-up">
            <div className="grid md:grid-cols-12 gap-8 items-end mb-16">
              <div className="md:col-span-8">
                <div className="mono-text text-[#7877C6] text-xs font-bold mb-4 tracking-widest">
                  ISSUE 001 / WINTER 2026
                </div>
                <h1 className="editorial-hero text-white text-6xl md:text-8xl lg:text-9xl mb-6">
                  Something
                  <br />
                  <span className="gradient-text glow-text">Epic</span>
                  <br />
                  Is Coming
                </h1>
              </div>
              <div className="md:col-span-4">
                <div className="brutalist-border p-8">
                  <div className="editorial-number">73</div>
                  <div className="mono-text text-[#00F5A0] text-xs font-bold mt-2">
                    PERCENT COMPLETE
                  </div>
                </div>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-12 border-t-2 border-[rgba(0,245,160,0.3)] pt-12">
              <div>
                <p className="serif-body text-gray-300 text-xl md:text-2xl mb-6">
                  We're engineering the future of AI-powered content analysis. 
                  A revolutionary platform built on next-generation technology, 
                  designed to transform how you interact with digital media.
                </p>
              </div>
              <div className="flex flex-col justify-between">
                <div className="mono-text text-xs text-gray-500 space-y-2">
                  <div className="flex justify-between border-b border-gray-800 pb-2">
                    <span>STATUS</span>
                    <span className="text-[#00F5A0]">DEVELOPMENT</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-800 pb-2">
                    <span>PROGRESS</span>
                    <span className="text-[#7877C6]">85%</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-800 pb-2">
                    <span>ETA</span>
                    <span className="text-[#FF77C6]">VERY SOON</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Features - Brutalist Grid */}
          <div className="mb-24">
            <div className="mb-12 fade-up stagger-2">
              <div className="mono-text text-[#00F5A0] text-xs font-bold mb-4 tracking-widest">
                FEATURE SHOWCASE
              </div>
              <h2 className="editorial-hero text-white text-5xl md:text-6xl mb-4">
                Unleash the Power
              </h2>
              <p className="serif-body text-gray-400 text-lg max-w-2xl">
                Revolutionary capabilities designed to transform your workflow with artificial intelligence
              </p>
            </div>

            <div className="feature-grid scale-reveal stagger-3">
              {/* Audio Analysis */}
              <div className="feature-cell group">
                <div className="mb-6">
                  <AudioWaveform size={48} className="text-[#00F5A0] mb-4" strokeWidth={1.5} />
                  <div className="mono-text text-[#00F5A0] text-xs font-bold mb-3 tracking-widest">
                    01 / AUDIO
                  </div>
                  <h3 className="editorial-hero text-white text-3xl mb-4">
                    Audio Intelligence
                  </h3>
                  <p className="serif-body text-gray-400 text-base">
                    Advanced speech-to-text transcription with real-time sentiment analysis 
                    and intelligent keyword extraction powered by cutting-edge AI models.
                  </p>
                </div>
              </div>

              {/* Video Analysis */}
              <div className="feature-cell group">
                <div className="mb-6">
                  <Video size={48} className="text-[#7877C6] mb-4" strokeWidth={1.5} />
                  <div className="mono-text text-[#7877C6] text-xs font-bold mb-3 tracking-widest">
                    02 / VIDEO
                  </div>
                  <h3 className="editorial-hero text-white text-3xl mb-4">
                    Video Vision
                  </h3>
                  <p className="serif-body text-gray-400 text-base">
                    Intelligent scene detection with advanced object recognition and 
                    sophisticated motion tracking using computer vision AI.
                  </p>
                </div>
              </div>

              {/* Text Analysis */}
              <div className="feature-cell group">
                <div className="mb-6">
                  <FileText size={48} className="text-[#FF77C6] mb-4" strokeWidth={1.5} />
                  <div className="mono-text text-[#FF77C6] text-xs font-bold mb-3 tracking-widest">
                    03 / TEXT
                  </div>
                  <h3 className="editorial-hero text-white text-3xl mb-4">
                    Text Mastery
                  </h3>
                  <p className="serif-body text-gray-400 text-base">
                    Powerful summarization with multi-language translation and deep 
                    entity recognition using natural language processing.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Launch Statement */}
          <div className="border-t-2 border-b-2 border-[rgba(0,245,160,0.3)] py-16 fade-up stagger-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="mono-text text-[#00F5A0] text-xs font-bold mb-6 tracking-widest">
                  LAUNCH COUNTDOWN
                </div>
                <h3 className="editorial-hero text-white text-5xl md:text-6xl mb-6">
                  The wait is
                  <br />
                  <span className="gradient-text">almost over</span>
                </h3>
                <p className="serif-body text-gray-300 text-xl">
                  Be among the first to experience the future of AI-powered 
                  content analysis. The revolution begins soon.
                </p>
              </div>
              
              <div className="space-y-6">
                <div className="brutalist-border p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="mono-text text-xs text-gray-500">PERFORMANCE</span>
                  </div>
                  <div className="mono-text text-white font-bold">Lightning Fast Processing</div>
                </div>
                
                <div className="brutalist-border p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="mono-text text-xs text-gray-500">TECHNOLOGY</span>
                  </div>
                  <div className="mono-text text-white font-bold">AI-Powered Intelligence</div>
                </div>
                
                <div className="brutalist-border p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="mono-text text-xs text-gray-500">ACCURACY</span>
                  </div>
                  <div className="mono-text text-white font-bold">Precision Results</div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Info */}
          <div className="mt-16 pt-16 border-t border-gray-800">
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <div className="mono-text text-[#00F5A0] text-xs font-bold mb-3 tracking-widest">
                  STATUS
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-[#00F5A0] rounded-full animate-pulse"></div>
                  <span className="serif-body text-gray-400">In Development</span>
                </div>
              </div>
              
              <div>
                <div className="mono-text text-[#7877C6] text-xs font-bold mb-3 tracking-widest">
                  PROGRESS
                </div>
                <div className="serif-body text-gray-400">73% Complete</div>
              </div>
              
              <div>
                <div className="mono-text text-[#FF77C6] text-xs font-bold mb-3 tracking-widest">
                  LAUNCH
                </div>
                <div className="serif-body text-gray-400">Very Soon</div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}