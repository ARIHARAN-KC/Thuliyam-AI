import Link from "next/link";
import { Zap, Target, Lock, Brain } from "lucide-react";

export default function Hero() {
  return (
    <>
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }

        @keyframes pulse-glow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }

        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }

        .hero {
          min-height: 100vh;
          background: 
            radial-gradient(ellipse at 20% 20%, rgba(120, 119, 198, 0.15) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 80%, rgba(255, 119, 198, 0.1) 0%, transparent 50%),
            linear-gradient(135deg, #0A0B1E 0%, #1A1B3E 50%, #0A0B1E 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 4rem 2rem;
          position: relative;
          overflow: hidden;
          font-family: 'Inter', sans-serif;
        }

        .hero::before {
          content: '';
          position: absolute;
          inset: 0;
          background: 
            url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23000' fill-opacity='0.03' fill-rule='evenodd'/%3E%3C/svg%3E");
          opacity: 0.3;
          animation: shimmer 20s linear infinite;
          pointer-events: none;
        }

        .hero-content {
          max-width: 1200px;
          width: 100%;
          text-align: center;
          position: relative;
          z-index: 2;
          padding: 3rem;
        }

        .hero-glow {
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

        .hero-title-container {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 1.5rem;
          margin-bottom: 2rem;
          position: relative;
        }

        .hero-title-icon {
          color: #00F5A0;
          filter: drop-shadow(0 0 15px rgba(0, 245, 160, 0.5));
          animation: pulse-glow 2s ease-in-out infinite;
        }

        h1 {
          font-size: 4rem;
          font-weight: 800;
          background: linear-gradient(135deg, #00F5A0 0%, #7877C6 50%, #FF77C6 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          letter-spacing: -0.5px;
          margin: 0;
          text-shadow: 0 10px 30px rgba(0, 245, 160, 0.2);
          line-height: 1.1;
        }

        .hero-subtitle {
          font-size: 1.3rem;
          color: rgba(255, 255, 255, 0.7);
          max-width: 800px;
          margin: 0 auto 3rem;
          line-height: 1.6;
          font-weight: 400;
          padding: 0 1rem;
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
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

        .hero-actions {
          display: flex;
          gap: 1.5rem;
          justify-content: center;
          margin: 3rem 0 4rem;
        }

        /* Oval Button Styles */
        .oval-btn {
          position: relative;
          padding: 1.2rem 3rem;
          background: linear-gradient(135deg, #00F5A0 0%, #7877C6 100%);
          color: white;
          font-weight: 600;
          font-size: 1.1rem;
          border: none;
          border-radius: 50px; /* Oval shape */
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.8rem;
          text-decoration: none;
          overflow: hidden;
          min-width: 220px;
          box-shadow: 0 10px 25px rgba(0, 245, 160, 0.2);
        }

        .oval-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, #FF77C6 0%, #7877C6 100%);
          opacity: 0;
          transition: opacity 0.3s ease;
          z-index: 1;
          border-radius: 50px;
        }

        .oval-btn:hover::before {
          opacity: 1;
        }

        .oval-btn span {
          position: relative;
          z-index: 2;
        }

        .oval-btn:hover {
          transform: translateY(-3px);
          box-shadow: 
            0 20px 40px rgba(0, 245, 160, 0.3),
            0 0 0 1px rgba(255, 255, 255, 0.1);
        }

        .oval-btn:active {
          transform: translateY(-1px);
          box-shadow: 
            0 15px 30px rgba(0, 245, 160, 0.2),
            0 0 0 1px rgba(255, 255, 255, 0.1);
        }

        .btn-secondary {
          padding: 1.2rem 2.5rem;
          background: rgba(255, 255, 255, 0.05);
          color: rgba(255, 255, 255, 0.9);
          font-weight: 600;
          font-size: 1.1rem;
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 0.8rem;
          text-decoration: none;
          min-width: 180px;
          justify-content: center;
        }

        .btn-secondary:hover {
          background: rgba(255, 255, 255, 0.08);
          color: white;
          border-color: rgba(255, 255, 255, 0.2);
          transform: translateY(-3px);
        }

        .hero-disclaimer {
          margin-top: 3rem;
          padding: 1.5rem;
          background: rgba(255, 71, 87, 0.1);
          border: 1px solid rgba(255, 107, 157, 0.3);
          border-radius: 16px;
          color: rgba(255, 255, 255, 0.7);
          font-size: 0.95rem;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
          line-height: 1.6;
          backdrop-filter: blur(10px);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
        }

        .disclaimer-icon {
          color: #FF6B9D;
          flex-shrink: 0;
        }

        .stats-container {
          display: flex;
          justify-content: center;
          gap: 3rem;
          margin: 4rem 0;
          flex-wrap: wrap;
        }

        .stat-item {
          text-align: center;
          padding: 2rem;
          background: rgba(255, 255, 255, 0.03);
          border-radius: 20px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          min-width: 200px;
          transition: all 0.3s ease;
        }

        .stat-item:hover {
          background: rgba(255, 255, 255, 0.05);
          transform: translateY(-5px);
          border-color: rgba(0, 245, 160, 0.3);
        }

        .stat-value {
          font-size: 3rem;
          font-weight: 800;
          background: linear-gradient(135deg, #00F5A0, #7877C6);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 0.5rem;
        }

        .stat-label {
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.6);
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        @media (max-width: 1024px) {
          h1 {
            font-size: 3.2rem;
          }
          
          .hero-content {
            padding: 2rem;
          }
          
          .features-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 1.5rem;
          }
        }

        @media (max-width: 768px) {
          .hero {
            padding: 2rem 1rem;
          }
          
          h1 {
            font-size: 2.5rem;
          }
          
          .hero-subtitle {
            font-size: 1.1rem;
            padding: 0;
          }
          
          .hero-title-container {
            flex-direction: column;
            gap: 1rem;
          }
          
          .features-grid {
            grid-template-columns: 1fr;
            gap: 1rem;
          }
          
          .hero-actions {
            flex-direction: column;
            align-items: center;
          }
          
          .oval-btn,
          .btn-secondary {
            width: 100%;
            max-width: 300px;
            justify-content: center;
          }
          
          .stats-container {
            gap: 1rem;
          }
          
          .stat-item {
            min-width: 150px;
            padding: 1.5rem;
          }
          
          .stat-value {
            font-size: 2.2rem;
          }
        }

        @media (max-width: 480px) {
          h1 {
            font-size: 2rem;
          }
          
          .oval-btn,
          .btn-secondary {
            padding: 1rem 1.5rem;
            font-size: 1rem;
          }
          
          .stat-item {
            min-width: 120px;
            padding: 1rem;
          }
          
          .stat-value {
            font-size: 1.8rem;
          }
        }
      `}</style>

      <section className="hero">
        <div className="hero-glow"></div>

        <div className="hero-content">
          <div className="hero-title-container">
            <h1>
              AI-Powered Authenticity Detection
            </h1>
          </div>

          <p className="hero-subtitle">
            Thuliyam AI helps identify AI-generated and manipulated contents using
            advanced machine learning models. Results are probabilistic and
            designed to assist human decision-making.
          </p>

          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <Brain size={28} />
              </div>
              <h3 className="feature-title">Advanced AI Models</h3>
              <p className="feature-desc">
                State-of-the-art neural networks trained on millions of images
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <Target size={28} />
              </div>
              <h3 className="feature-title">High Accuracy</h3>
              <p className="feature-desc">
                93.7% detection rate for synthetic images
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <Zap size={28} />
              </div>
              <h3 className="feature-title">Real-Time Analysis</h3>
              <p className="feature-desc">
                Get results in seconds with our optimized processing
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <Lock size={28} />
              </div>
              <h3 className="feature-title">Secure & Private</h3>
              <p className="feature-desc">
                End-to-end encryption with no data storage
              </p>
            </div>
          </div>

          <div className="stats-container">
            <div className="stat-item">
              <div className="stat-value">93.7%</div>
              <div className="stat-label">Accuracy Rate</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">19K+</div>
              <div className="stat-label">Images Analyzed</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">24/7</div>
              <div className="stat-label">Real-time Monitoring</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">&lt;3s</div>
              <div className="stat-label">Avg. Response Time</div>
            </div>
          </div>

          <div className="hero-actions">
            <Link href="/upload" className="oval-btn">
              <span>Analyze Image</span>
            </Link>

            <Link href="/about" className="btn-secondary">
              <span>Learn More</span>
            </Link>
          </div>

          <p className="hero-disclaimer">
            <AlertCircle className="disclaimer-icon" size={20} />
            Results may occasionally be incorrect. Always verify with additional evidence.
          </p>
        </div>
      </section>
    </>
  );
}

// AlertCircle icon component
const AlertCircle = ({ size = 24, className = "" }) => (
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
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
);