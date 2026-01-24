import { Brain, BarChart3, Lock, Users } from "lucide-react";
import Image from "next/image";

export default function Features() {
  return (
    <>
      <style jsx>{`
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

        .features {
          padding: 8rem 2rem;
          background: 
            radial-gradient(ellipse at 50% 0%, rgba(16, 18, 40, 0.9) 0%, transparent 70%),
            linear-gradient(180deg, #0A0B1E 0%, #1A1B3E 30%, #0A0B1E 100%);
          position: relative;
          overflow: hidden;
          font-family: 'Inter', sans-serif;
        }

        .features::before {
          content: '';
          position: absolute;
          inset: 0;
          background: 
            url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23000' fill-opacity='0.03' fill-rule='evenodd'/%3E%3C/svg%3E");
          opacity: 0.3;
          pointer-events: none;
        }

        .section-header {
          text-align: center;
          margin-bottom: 6rem;
          position: relative;
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

        .section-title-container {
          display: inline-flex;
          align-items: center;
          gap: 1.5rem;
          margin-bottom: 1.5rem;
          position: relative;
        }

        .section-title-icon {
          color: #00F5A0;
          filter: drop-shadow(0 0 10px rgba(0, 245, 160, 0.5));
        }

        h2 {
          font-size: 3.5rem;
          font-weight: 800;
          background: linear-gradient(135deg, #00F5A0 0%, #7877C6 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          letter-spacing: -0.5px;
          margin: 0;
          text-shadow: 0 10px 30px rgba(0, 245, 160, 0.2);
        }

        .section-subtitle {
          font-size: 1.3rem;
          color: rgba(255, 255, 255, 0.7);
          max-width: 700px;
          margin: 0 auto;
          line-height: 1.6;
          font-weight: 400;
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 2.5rem;
          max-width: 1200px;
          margin: 0 auto;
          position: relative;
        }

        .feature-card {
          background: rgba(16, 18, 40, 0.7);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-radius: 24px;
          padding: 3rem 2.5rem;
          border: 1px solid rgba(255, 255, 255, 0.15);
          box-shadow: 
            0 20px 60px rgba(0, 0, 0, 0.3),
            0 0 0 1px rgba(255, 255, 255, 0.1);
          transition: all 0.4s ease;
          position: relative;
          overflow: hidden;
          animation: fadeIn 0.6s ease-out;
          animation-fill-mode: both;
        }

        .feature-card:nth-child(1) { animation-delay: 0.1s; }
        .feature-card:nth-child(2) { animation-delay: 0.2s; }
        .feature-card:nth-child(3) { animation-delay: 0.3s; }
        .feature-card:nth-child(4) { animation-delay: 0.4s; }

        .feature-card::before {
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

        .feature-card:hover::before {
          opacity: 1;
        }

        .feature-card:hover {
          transform: translateY(-10px);
          border-color: rgba(0, 245, 160, 0.3);
          box-shadow: 
            0 30px 80px rgba(0, 245, 160, 0.2),
            0 0 0 1px rgba(0, 245, 160, 0.2);
        }

        .feature-icon-wrapper {
          width: 80px;
          height: 80px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #00F5A0, #7877C6);
          border-radius: 20px;
          margin-bottom: 2rem;
          position: relative;
          transition: all 0.4s ease;
        }

        .feature-card:hover .feature-icon-wrapper {
          transform: scale(1.1) rotate(5deg);
        }

        .feature-icon {
          color: #ffffff;
          font-size: 2rem;
        }

        .feature-icon-glow {
          position: absolute;
          inset: -8px;
          background: linear-gradient(135deg, #00F5A0, #7877C6);
          border-radius: 24px;
          opacity: 0.3;
          filter: blur(12px);
          z-index: -1;
        }

        .feature-title {
          font-size: 1.8rem;
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 1.2rem;
          position: relative;
          z-index: 2;
        }

        .feature-description {
          font-size: 1.1rem;
          color: rgba(255, 255, 255, 0.7);
          line-height: 1.6;
          margin-bottom: 2rem;
          position: relative;
          z-index: 2;
        }

        .feature-stats {
          display: flex;
          gap: 1.5rem;
          margin-top: 2rem;
          padding-top: 2rem;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          position: relative;
          z-index: 2;
        }

        .stat {
          text-align: center;
          flex: 1;
        }

        .stat-value {
          font-size: 2rem;
          font-weight: 800;
          background: linear-gradient(135deg, #00F5A0, #7877C6);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 0.3rem;
        }

        .stat-label {
          font-size: 0.8rem;
          color: rgba(255, 255, 255, 0.6);
          text-transform: uppercase;
          letter-spacing: 1px;
          font-weight: 500;
        }

        .feature-highlight {
          position: absolute;
          top: 2rem;
          right: 2rem;
          background: linear-gradient(135deg, #FF77C6, #FF4757);
          color: #ffffff;
          font-size: 0.8rem;
          font-weight: 700;
          padding: 0.4rem 1rem;
          border-radius: 20px;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .tech-stack {
          margin-top: 6rem;
          text-align: center;
        }

        .tech-title {
          font-size: 1.5rem;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.9);
          margin-bottom: 2rem;
        }

        .tech-tags {
          display: flex;
          justify-content: center;
          gap: 1rem;
          flex-wrap: wrap;
          max-width: 800px;
          margin: 0 auto;
        }

        .tech-tag {
          background: rgba(255, 255, 255, 0.05);
          color: rgba(255, 255, 255, 0.7);
          padding: 0.8rem 1.5rem;
          border-radius: 50px;
          font-size: 0.9rem;
          font-weight: 500;
          border: 1px solid rgba(255, 255, 255, 0.1);
          transition: all 0.3s ease;
        }

        .tech-tag:hover {
          background: rgba(0, 245, 160, 0.1);
          color: #ffffff;
          border-color: rgba(0, 245, 160, 0.3);
          transform: translateY(-2px);
        }

        @media (max-width: 1024px) {
          .features {
            padding: 6rem 2rem;
          }
          
          h2 {
            font-size: 3rem;
          }
          
          .features-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 2rem;
          }
          
          .feature-card {
            padding: 2.5rem 2rem;
          }
        }

        @media (max-width: 768px) {
          .features {
            padding: 4rem 1rem;
          }
          
          h2 {
            font-size: 2.5rem;
          }
          
          .section-subtitle {
            font-size: 1.1rem;
            padding: 0 1rem;
          }
          
          .features-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }
          
          .feature-card {
            padding: 2rem 1.5rem;
          }
          
          .feature-icon-wrapper {
            width: 70px;
            height: 70px;
            margin-bottom: 1.5rem;
          }
          
          .feature-title {
            font-size: 1.5rem;
          }
          
          .feature-description {
            font-size: 1rem;
          }
          
          .tech-tags {
            gap: 0.8rem;
          }
          
          .tech-tag {
            padding: 0.6rem 1.2rem;
            font-size: 0.85rem;
          }
        }

        @media (max-width: 480px) {
          h2 {
            font-size: 2rem;
          }
          
          .section-title-container {
            flex-direction: column;
            gap: 1rem;
          }
          
          .feature-stats {
            flex-direction: column;
            gap: 1rem;
          }
          
          .stat-value {
            font-size: 1.8rem;
          }
        }
      `}</style>

      <section className="features">
        <div className="section-glow"></div>

        <div className="section-header">
          <div className="section-title-container">
            <Image
              src="/logo.svg"
              alt="Thuliyam AI Logo"
              width={50}
              height={50}
              className="logo-image"
              priority
            />
            <h2>Why Thuliyam AI</h2>
          </div>
          <p className="section-subtitle">
            Powered by cutting-edge technology and designed for real-world applications,
            our platform delivers unmatched accuracy and reliability
          </p>
        </div>

        <div className="features-grid">
          <div className="feature-card">
            <span className="feature-highlight">Premium</span>
            <div className="feature-icon-wrapper">
              <div className="feature-icon-glow"></div>
              <Brain className="feature-icon" size={36} />
            </div>
            <h3 className="feature-title">Advanced AI Models</h3>
            <p className="feature-description">
              Trained on millions of real and AI-generated images using modern
              vision transformers and deep neural networks for unparalleled accuracy
            </p>
            <div className="feature-stats">
              <div className="stat">
                <div className="stat-value">93.7%</div>
                <div className="stat-label">Accuracy</div>
              </div>
              <div className="stat">
                <div className="stat-value">2.4M+</div>
                <div className="stat-label">Images</div>
              </div>
            </div>
          </div>

          <div className="feature-card">
            <span className="feature-highlight">Secure</span>
            <div className="feature-icon-wrapper">
              <div className="feature-icon-glow"></div>
              <Lock className="feature-icon" size={36} />
            </div>
            <h3 className="feature-title">Fast & Secure</h3>
            <p className="feature-description">
              Images are processed securely with end-to-end encryption and
              are never stored after analysis. Military-grade privacy protection
            </p>
            <div className="feature-stats">
              <div className="stat">
                <div className="stat-value">&lt;3s</div>
                <div className="stat-label">Processing</div>
              </div>
              <div className="stat">
                <div className="stat-value">256-bit</div>
                <div className="stat-label">Encryption</div>
              </div>
            </div>
          </div>

          <div className="feature-card">
            <span className="feature-highlight">Transparent</span>
            <div className="feature-icon-wrapper">
              <div className="feature-icon-glow"></div>
              <BarChart3 className="feature-icon" size={36} />
            </div>
            <h3 className="feature-title">Probability-Based Results</h3>
            <p className="feature-description">
              Confidence scores and detailed analytics help users understand
              uncertainty instead of absolute claims, enabling informed decisions
            </p>
            <div className="feature-stats">
              <div className="stat">
                <div className="stat-value">0.1%</div>
                <div className="stat-label">Margin</div>
              </div>
              <div className="stat">
                <div className="stat-value">12+</div>
                <div className="stat-label">Metrics</div>
              </div>
            </div>
          </div>

          <div className="feature-card">
            <span className="feature-highlight">Enterprise</span>
            <div className="feature-icon-wrapper">
              <div className="feature-icon-glow"></div>
              <Users className="feature-icon" size={36} />
            </div>
            <h3 className="feature-title">Built for Scale</h3>
            <p className="feature-description">
              Designed for media verification, HR screening, digital forensics,
              and enterprise applications with unlimited scalability
            </p>
            <div className="feature-stats">
              <div className="stat">
                <div className="stat-value">99.9%</div>
                <div className="stat-label">Uptime</div>
              </div>
              <div className="stat">
                <div className="stat-value">1M+</div>
                <div className="stat-label">API Calls</div>
              </div>
            </div>
          </div>
        </div>

        <div className="tech-stack">
          <h3 className="tech-title">Powered By</h3>
          <div className="tech-tags">
            <span className="tech-tag">Computer Vision</span>
            <span className="tech-tag">Deep Learning</span>
            <span className="tech-tag">Neural Networks</span>
            <span className="tech-tag">PyTorch</span>
            <span className="tech-tag">TensorFlow</span>
            <span className="tech-tag">Transformers</span>
            {/* <span className="tech-tag">AWS Infrastructure</span> */}
            <span className="tech-tag">Real-time Processing</span>
          </div>
        </div>
      </section>
    </>
  );
}