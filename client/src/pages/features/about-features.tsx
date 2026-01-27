"use client";

import { useState, useEffect } from "react";
import { AudioWaveform, Video, FileText, Zap, Clock, Target, Users, Rocket, Sparkles, BarChart3 } from "lucide-react";
import Navbar from "@/components/Navbar";

export default function ComingSoon() {
  const [countdown, setCountdown] = useState({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00"
  });

  useEffect(() => {
    // Set launch date to 30 days from now
    const launchDate = new Date();
    launchDate.setDate(launchDate.getDate() + 30);

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = launchDate.getTime() - now;

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setCountdown({
        days: days.toString().padStart(2, '0'),
        hours: hours.toString().padStart(2, '0'),
        minutes: minutes.toString().padStart(2, '0'),
        seconds: seconds.toString().padStart(2, '0')
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const features = [
    {
      icon: <AudioWaveform size={28} />,
      title: "Advanced Audio Analysis",
      description: "Real-time speech recognition with sentiment analysis and speaker identification",
      color: "from-green-500 to-blue-500"
    },
    {
      icon: <Video size={28} />,
      title: "Intelligent Video Processing",
      description: "Object detection, scene analysis, and deepfake detection capabilities",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: <FileText size={28} />,
      title: "Smart Text Analysis",
      description: "Natural language processing with summarization and entity recognition",
      color: "from-orange-500 to-red-500"
    },
    {
      icon: <BarChart3 size={28} />,
      title: "Comprehensive Analytics",
      description: "Detailed insights and reporting with customizable dashboards",
      color: "from-blue-500 to-cyan-500"
    }
  ];

  const progress = [
    { label: "Development", value: 85, color: "#00F5A0" },
    { label: "Testing", value: 70, color: "#7877C6" },
    { label: "Integration", value: 90, color: "#FF77C6" },
    { label: "Documentation", value: 60, color: "#00D4FF" }
  ];

  return (
    <>
    <Navbar/>
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-5px); }
        }

        @keyframes pulse-glow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }

        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .coming-soon-hero {
          background: 
            radial-gradient(ellipse at 20% 20%, rgba(120, 119, 198, 0.15) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 80%, rgba(255, 119, 198, 0.1) 0%, transparent 50%),
            linear-gradient(135deg, #0A0B1E 0%, #1A1B3E 50%, #0A0B1E 100%);
          position: relative;
          overflow: hidden;
          font-family: 'Inter', sans-serif;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 4rem 2rem;
        }

        .coming-soon-hero::before {
          content: '';
          position: absolute;
          inset: 0;
          background: 
            url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23000' fill-opacity='0.03' fill-rule='evenodd'/%3E%3C/svg%3E");
          opacity: 0.3;
          animation: shimmer 20s linear infinite;
          pointer-events: none;
        }

        .coming-soon-content {
          max-width: 1200px;
          width: 100%;
          text-align: center;
          position: relative;
          z-index: 2;
          padding: 3rem;
        }

        .coming-soon-glow {
          position: absolute;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle, rgba(0, 245, 160, 0.2) 0%, transparent 70%);
          filter: blur(80px);
          opacity: 0.4;
          z-index: -1;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }

        .title-icon-container {
          width: 80px;
          height: 80px;
          background: linear-gradient(135deg, #00F5A0, #7877C6);
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 2rem;
          color: white;
          animation: float 3s ease-in-out infinite;
        }

        .coming-soon-title {
          font-size: 4rem;
          font-weight: 800;
          background: linear-gradient(135deg, #00F5A0 0%, #7877C6 50%, #FF77C6 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          letter-spacing: -0.5px;
          margin: 0 0 1rem 0;
          text-shadow: 0 10px 30px rgba(0, 245, 160, 0.2);
          line-height: 1.1;
        }

        .coming-soon-subtitle {
          font-size: 1.3rem;
          color: rgba(255, 255, 255, 0.7);
          max-width: 600px;
          margin: 0 auto 3rem;
          line-height: 1.6;
          font-weight: 400;
        }

        .countdown-container {
          display: flex;
          justify-content: center;
          gap: 2rem;
          margin: 4rem 0;
          flex-wrap: wrap;
        }

        .countdown-item {
          background: rgba(255, 255, 255, 0.03);
          border-radius: 20px;
          padding: 2rem;
          border: 1px solid rgba(255, 255, 255, 0.1);
          min-width: 150px;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
        }

        .countdown-item:hover {
          background: rgba(255, 255, 255, 0.05);
          transform: translateY(-5px);
          border-color: rgba(0, 245, 160, 0.3);
          box-shadow: 0 20px 40px rgba(0, 245, 160, 0.1);
        }

        .countdown-value {
          font-size: 3rem;
          font-weight: 800;
          background: linear-gradient(135deg, #00F5A0, #7877C6);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 0.5rem;
        }

        .countdown-label {
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.6);
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
          margin: 4rem 0;
        }

        .feature-card {
          background: rgba(255, 255, 255, 0.03);
          border-radius: 20px;
          padding: 2rem;
          border: 1px solid rgba(255, 255, 255, 0.1);
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
        }

        .feature-card:hover {
          background: rgba(255, 255, 255, 0.05);
          border-color: rgba(0, 245, 160, 0.3);
          transform: translateY(-5px);
          box-shadow: 0 20px 40px rgba(0, 245, 160, 0.1);
        }

        .feature-icon {
          width: 60px;
          height: 60px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #00F5A0, #7877C6);
          border-radius: 16px;
          margin: 0 auto 1.5rem;
          color: white;
          font-size: 1.8rem;
        }

        .feature-title {
          font-size: 1.2rem;
          font-weight: 700;
          color: rgba(255, 255, 255, 0.9);
          margin-bottom: 0.8rem;
        }

        .feature-desc {
          font-size: 0.95rem;
          color: rgba(255, 255, 255, 0.6);
          line-height: 1.5;
        }

        .progress-container {
          background: rgba(255, 255, 255, 0.03);
          border-radius: 20px;
          padding: 2.5rem;
          border: 1px solid rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          margin: 4rem 0;
        }

        .section-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: rgba(255, 255, 255, 0.9);
          margin-bottom: 2rem;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
        }

        .section-icon {
          color: #00F5A0;
        }

        .progress-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 2rem;
        }

        .progress-item {
          text-align: center;
        }

        .progress-info {
          display: flex;
          justify-content: space-between;
          margin-bottom: 0.5rem;
        }

        .progress-label {
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.7);
          font-weight: 600;
        }

        .progress-percent {
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.9);
          font-weight: 700;
        }

        .progress-bar {
          height: 8px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 4px;
          overflow: hidden;
        }

        .progress-fill {
          height: 100%;
          border-radius: 4px;
          transition: width 1s ease-in-out;
          background: linear-gradient(90deg, #00F5A0, #7877C6);
        }

        .notify-section {
          text-align: center;
          padding: 3rem;
          background: rgba(255, 255, 255, 0.03);
          border-radius: 20px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          margin-top: 4rem;
        }

        .notify-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: rgba(255, 255, 255, 0.9);
          margin-bottom: 1rem;
        }

        .notify-description {
          font-size: 1rem;
          color: rgba(255, 255, 255, 0.7);
          margin-bottom: 2rem;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
          line-height: 1.6;
        }

        .notify-form {
          max-width: 500px;
          margin: 0 auto;
        }

        .form-group {
          display: flex;
          gap: 1rem;
          margin-bottom: 1rem;
        }

        .form-input {
          flex: 1;
          padding: 1rem 1.5rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          color: rgba(255, 255, 255, 0.9);
          font-size: 1rem;
          font-family: 'Inter', sans-serif;
          transition: all 0.3s ease;
        }

        .form-input:focus {
          outline: none;
          border-color: #00F5A0;
          box-shadow: 0 0 0 2px rgba(0, 245, 160, 0.2);
        }

        .form-input::placeholder {
          color: rgba(255, 255, 255, 0.4);
        }

        .submit-btn {
          padding: 1rem 2rem;
          background: linear-gradient(135deg, #00F5A0 0%, #7877C6 100%);
          color: white;
          font-weight: 600;
          font-size: 1rem;
          border: none;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.3s ease;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
        }

        .submit-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(0, 245, 160, 0.3);
        }

        .privacy-note {
          margin-top: 2rem;
          padding: 1.5rem;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          color: rgba(255, 255, 255, 0.6);
          font-size: 0.9rem;
          line-height: 1.6;
          backdrop-filter: blur(10px);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        }

        .privacy-icon {
          color: #7877C6;
          flex-shrink: 0;
        }

        @media (max-width: 1024px) {
          .coming-soon-title {
            font-size: 3.2rem;
          }
          
          .coming-soon-content {
            padding: 2rem;
          }
          
          .features-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 1.5rem;
          }
          
          .countdown-container {
            gap: 1rem;
          }
          
          .countdown-item {
            min-width: 130px;
            padding: 1.5rem;
          }
          
          .countdown-value {
            font-size: 2.5rem;
          }
        }

        @media (max-width: 768px) {
          .coming-soon-hero {
            padding: 2rem 1rem;
          }
          
          .coming-soon-title {
            font-size: 2.5rem;
          }
          
          .coming-soon-subtitle {
            font-size: 1.1rem;
            padding: 0;
          }
          
          .features-grid {
            grid-template-columns: 1fr;
            gap: 1rem;
          }
          
          .countdown-container {
            gap: 0.75rem;
          }
          
          .countdown-item {
            min-width: 100px;
            padding: 1rem;
          }
          
          .countdown-value {
            font-size: 2rem;
          }
          
          .form-group {
            flex-direction: column;
          }
          
          .progress-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }
        }

        @media (max-width: 480px) {
          .coming-soon-title {
            font-size: 2rem;
          }
          
          .countdown-item {
            min-width: 80px;
            padding: 0.75rem;
          }
          
          .countdown-value {
            font-size: 1.8rem;
          }
          
          .feature-card {
            padding: 1.5rem;
          }
        }
      `}</style>

      <section className="coming-soon-hero">
        <div className="coming-soon-glow"></div>

        <div className="coming-soon-content">
          <div className="title-icon-container">
            <Rocket size={40} />
          </div>

          <h1 className="coming-soon-title">
            Coming Soon
          </h1>

          <p className="coming-soon-subtitle">
            We're building something extraordinary! Get ready for the next generation of 
            AI-powered analysis tools. Launching very soon.
          </p>

          <div className="countdown-container">
            <div className="countdown-item">
              <div className="countdown-value">{countdown.days}</div>
              <div className="countdown-label">Days</div>
            </div>
            <div className="countdown-item">
              <div className="countdown-value">{countdown.hours}</div>
              <div className="countdown-label">Hours</div>
            </div>
            <div className="countdown-item">
              <div className="countdown-value">{countdown.minutes}</div>
              <div className="countdown-label">Minutes</div>
            </div>
            <div className="countdown-item">
              <div className="countdown-value">{countdown.seconds}</div>
              <div className="countdown-label">Seconds</div>
            </div>
          </div>

          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon">
                  {feature.icon}
                </div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-desc">{feature.description}</p>
              </div>
            ))}
          </div>

          <div className="progress-container">
            <h2 className="section-title">
              <Target className="section-icon" size={24} />
              Development Progress
            </h2>
            <div className="progress-grid">
              {progress.map((item, index) => (
                <div key={index} className="progress-item">
                  <div className="progress-info">
                    <span className="progress-label">{item.label}</span>
                    <span className="progress-percent">{item.value}%</span>
                  </div>
                  <div className="progress-bar">
                    <div 
                      className="progress-fill" 
                      style={{ 
                        width: `${item.value}%`,
                        background: `linear-gradient(90deg, ${item.color}, ${item.color})`
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="notify-section">
            <h2 className="notify-title">Get Notified First</h2>
            <p className="notify-description">
              Be among the first to know when we launch. Enter your email and we'll notify 
              you as soon as our new AI-powered platform is ready.
            </p>
            
            <div className="notify-form">
              <div className="form-group">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="form-input"
                />
                <button className="submit-btn">
                  <Sparkles size={20} />
                  Notify Me
                </button>
              </div>
            </div>

            <div className="privacy-note">
              <div className="privacy-icon">
                <ShieldIcon size={20} />
              </div>
              <div>
                Your email is safe with us. We'll only use it to send launch notifications. 
                No spam, ever.
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

// Shield icon component
const ShieldIcon = ({ size = 24, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);