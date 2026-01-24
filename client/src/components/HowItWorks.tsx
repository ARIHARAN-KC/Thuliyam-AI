import { CheckCircle, Cpu, Shield } from "lucide-react";
import Image from "next/image";

export default function HowItWorks() {
  return (
    <>
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }

        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }

        .how-it-works {
          padding: 8rem 2rem;
          background: 
            radial-gradient(ellipse at 50% 20%, rgba(16, 18, 40, 0.8) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 80%, rgba(255, 119, 198, 0.05) 0%, transparent 50%),
            linear-gradient(180deg, #0A0B1E 0%, #1A1B3E 50%, #0A0B1E 100%);
          position: relative;
          overflow: hidden;
          font-family: 'Inter', sans-serif;
        }

        .how-it-works::before {
          content: '';
          position: absolute;
          inset: 0;
          background: 
            url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23000' fill-opacity='0.03' fill-rule='evenodd'/%3E%3C/svg%3E");
          opacity: 0.3;
          animation: shimmer 20s linear infinite;
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

        .steps {
          display: flex;
          justify-content: center;
          gap: 4rem;
          max-width: 1200px;
          margin: 0 auto;
          position: relative;
        }

        .steps::before {
          content: '';
          position: absolute;
          top: 120px;
          left: 150px;
          right: 150px;
          height: 2px;
          background: linear-gradient(90deg, 
            transparent 0%, 
            rgba(0, 245, 160, 0.3) 20%,
            rgba(120, 119, 198, 0.3) 50%,
            rgba(0, 245, 160, 0.3) 80%,
            transparent 100%
          );
          z-index: 1;
        }

        .step {
          flex: 1;
          position: relative;
          z-index: 2;
        }

        .step-card {
          background: rgba(16, 18, 40, 0.7);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-radius: 24px;
          padding: 3rem 2rem;
          border: 1px solid rgba(255, 255, 255, 0.15);
          box-shadow: 
            0 20px 60px rgba(0, 0, 0, 0.3),
            0 0 0 1px rgba(255, 255, 255, 0.1);
          transition: all 0.4s ease;
          text-align: center;
          height: 100%;
          position: relative;
          overflow: hidden;
        }

        .step-card::before {
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

        .step-card:hover::before {
          opacity: 1;
        }

        .step-card:hover {
          transform: translateY(-10px);
          border-color: rgba(0, 245, 160, 0.3);
          box-shadow: 
            0 30px 80px rgba(0, 245, 160, 0.2),
            0 0 0 1px rgba(0, 245, 160, 0.2);
        }

        .step-number {
          width: 80px;
          height: 80px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #00F5A0, #7877C6);
          border-radius: 50%;
          font-size: 2rem;
          font-weight: 800;
          color: white;
          margin: 0 auto 2rem;
          position: relative;
          z-index: 2;
          box-shadow: 0 10px 30px rgba(0, 245, 160, 0.3);
        }

        .step-number-glow {
          position: absolute;
          inset: -8px;
          background: linear-gradient(135deg, #00F5A0, #7877C6);
          border-radius: 50%;
          opacity: 0.3;
          filter: blur(12px);
          z-index: 1;
        }

        .step-title {
          font-size: 1.8rem;
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 1rem;
          position: relative;
          z-index: 2;
        }

        .step-description {
          font-size: 1.1rem;
          color: rgba(255, 255, 255, 0.7);
          line-height: 1.6;
          margin-bottom: 2rem;
          position: relative;
          z-index: 2;
        }

        .step-features {
          list-style: none;
          padding: 0;
          margin: 2rem 0 0;
          text-align: left;
          position: relative;
          z-index: 2;
        }

        .step-feature {
          display: flex;
          align-items: center;
          gap: 0.8rem;
          margin-bottom: 0.8rem;
          color: rgba(255, 255, 255, 0.7);
          font-size: 0.95rem;
        }

        .feature-check {
          color: #00F5A0;
          flex-shrink: 0;
        }

        .arrow-connector {
          position: absolute;
          top: 120px;
          left: calc(50% + 150px);
          transform: translateX(-50%);
          color: rgba(0, 245, 160, 0.5);
          width: 40px;
          height: 40px;
          animation: float 3s ease-in-out infinite;
        }

        .technology-stack {
          margin-top: 8rem;
          text-align: center;
        }

        .tech-title {
          font-size: 1.5rem;
          font-weight: 600;
          color: #ffffff;
          margin-bottom: 2rem;
        }

        .tech-logos {
          display: flex;
          justify-content: center;
          gap: 4rem;
          flex-wrap: wrap;
        }

        .tech-logo {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
          transition: all 0.3s ease;
        }

        .tech-logo:hover {
          transform: translateY(-5px);
        }

        .logo-icon {
          width: 80px;
          height: 80px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 20px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .logo-icon::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(0, 245, 160, 0.1), transparent);
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .tech-logo:hover .logo-icon::before {
          opacity: 1;
        }

        .tech-logo:hover .logo-icon {
          background: rgba(0, 245, 160, 0.05);
          border-color: rgba(0, 245, 160, 0.3);
        }

        .svg-icon {
          width: 48px;
          height: 48px;
          filter: brightness(0) invert(1) sepia(1) saturate(5) hue-rotate(130deg);
          transition: all 0.3s ease;
        }

        .tech-logo:hover .svg-icon {
          filter: brightness(0) invert(1) sepia(1) saturate(10) hue-rotate(130deg);
          transform: scale(1.1);
        }

        .logo-label {
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.7);
          font-weight: 500;
          transition: all 0.3s ease;
        }

        .tech-logo:hover .logo-label {
          color: #00F5A0;
        }

        @media (max-width: 1024px) {
          .how-it-works {
            padding: 6rem 2rem;
          }
          
          .steps {
            gap: 2rem;
            flex-wrap: wrap;
          }
          
          .steps::before {
            display: none;
          }
          
          .arrow-connector {
            display: none;
          }
          
          .step {
            flex: 0 0 calc(50% - 1rem);
            margin-bottom: 2rem;
          }
          
          h2 {
            font-size: 3rem;
          }
          
          .tech-logos {
            gap: 3rem;
          }
        }

        @media (max-width: 768px) {
          .how-it-works {
            padding: 4rem 1rem;
          }
          
          .step {
            flex: 0 0 100%;
          }
          
          .step-card {
            padding: 2rem 1.5rem;
          }
          
          h2 {
            font-size: 2.5rem;
          }
          
          .section-subtitle {
            font-size: 1.1rem;
            padding: 0 1rem;
          }
          
          .step-number {
            width: 60px;
            height: 60px;
            font-size: 1.5rem;
          }
          
          .step-title {
            font-size: 1.5rem;
          }
          
          .step-description {
            font-size: 1rem;
          }
          
          .tech-logos {
            gap: 2rem;
          }
          
          .logo-icon {
            width: 70px;
            height: 70px;
          }
          
          .svg-icon {
            width: 42px;
            height: 42px;
          }
        }

        @media (max-width: 640px) {
          .tech-logos {
            gap: 1.5rem;
          }
          
          .logo-icon {
            width: 60px;
            height: 60px;
          }
          
          .svg-icon {
            width: 36px;
            height: 36px;
          }
          
          .logo-label {
            font-size: 0.85rem;
          }
        }

        @media (max-width: 480px) {
          h2 {
            font-size: 2rem;
          }
          
          .section-title-container {
            flex-direction: column;
            gap: 0.8rem;
          }
          
          .technology-stack {
            margin-top: 4rem;
          }
          
          .tech-logos {
            gap: 1rem;
            justify-content: center;
          }
          
          .logo-icon {
            width: 55px;
            height: 55px;
          }
          
          .svg-icon {
            width: 32px;
            height: 32px;
          }
        }

        @media (max-width: 380px) {
          .tech-logos {
            gap: 0.8rem;
          }
          
          .logo-icon {
            width: 50px;
            height: 50px;
          }
          
          .svg-icon {
            width: 28px;
            height: 28px;
          }
          
          .logo-label {
            font-size: 0.8rem;
          }
        }
      `}</style>

      <section className="how-it-works">
        <div className="section-glow"></div>
        
        <div className="section-header">
          <div className="section-title-container">
            <Cpu className="section-title-icon" size={48} />
            <h2>How It Works</h2>
            <Shield className="section-title-icon" size={48} />
          </div>
          <p className="section-subtitle">
            A three-step process powered by cutting-edge AI technology to ensure 
            accurate and reliable deepfake detection
          </p>
        </div>

        <div className="steps">
          <div className="step">
            <div className="step-card">
              <div className="step-number">
                <div className="step-number-glow"></div>
                1
              </div>
              <h3 className="step-title">Upload Image</h3>
              <p className="step-description">
                Select or drag-and-drop any image you want to analyze for authenticity
              </p>
              <ul className="step-features">
                <li className="step-feature">
                  <CheckCircle className="feature-check" size={18} />
                  <span>Supports all major formats</span>
                </li>
                <li className="step-feature">
                  <CheckCircle className="feature-check" size={18} />
                  <span>Secure file processing</span>
                </li>
                <li className="step-feature">
                  <CheckCircle className="feature-check" size={18} />
                  <span>No data storage policy</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="step">
            <div className="step-card">
              <div className="step-number">
                <div className="step-number-glow"></div>
                2
              </div>
              <h3 className="step-title">AI Analysis</h3>
              <p className="step-description">
                Our advanced neural networks analyze patterns and artifacts 
                to detect AI-generated content
              </p>
              <ul className="step-features">
                <li className="step-feature">
                  <CheckCircle className="feature-check" size={18} />
                  <span>Multi-model ensemble</span>
                </li>
                <li className="step-feature">
                  <CheckCircle className="feature-check" size={18} />
                  <span>Real-time processing</span>
                </li>
                <li className="step-feature">
                  <CheckCircle className="feature-check" size={18} />
                  <span>93.7% accuracy rate</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="step">
            <div className="step-card">
              <div className="step-number">
                <div className="step-number-glow"></div>
                3
              </div>
              <h3 className="step-title">View Results</h3>
              <p className="step-description">
                Receive detailed analysis with confidence scores and 
                visual explanations of the detection
              </p>
              <ul className="step-features">
                <li className="step-feature">
                  <CheckCircle className="feature-check" size={18} />
                  <span>Interactive visualizations</span>
                </li>
                <li className="step-feature">
                  <CheckCircle className="feature-check" size={18} />
                  <span>Detailed confidence metrics</span>
                </li>
                <li className="step-feature">
                  <CheckCircle className="feature-check" size={18} />
                  <span>Exportable reports</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="technology-stack">
          <h3 className="tech-title">Powered By Advanced Technology</h3>
          <div className="tech-logos">
            <div className="tech-logo">
              <div className="logo-icon">
                <Image 
                  src="/tools/pytorch.svg"
                  alt="PyTorch"
                  width={48}
                  height={48}
                  className="svg-icon"
                />
              </div>
              <span className="logo-label">PyTorch</span>
            </div>
            
            <div className="tech-logo">
              <div className="logo-icon">
                <Image 
                  src="/tools/tensorflow.svg"
                  alt="TensorFlow"
                  width={48}
                  height={48}
                  className="svg-icon"
                />
              </div>
              <span className="logo-label">TensorFlow</span>
            </div>
            
            <div className="tech-logo">
              <div className="logo-icon">
                <Image 
                  src="/tools/neural_net.svg"
                  alt="Neural Networks"
                  width={48}
                  height={48}
                  className="svg-icon"
                />
              </div>
              <span className="logo-label">Neural Networks</span>
            </div>
            
            <div className="tech-logo">
              <div className="logo-icon">
                <Image 
                  src="/tools/cv.svg"
                  alt="Computer Vision"
                  width={48}
                  height={48}
                  className="svg-icon"
                />
              </div>
              <span className="logo-label">Computer Vision</span>
            </div>
            
            <div className="tech-logo">
              <div className="logo-icon">
                <Image 
                  src="/tools/security.svg"
                  alt="Security"
                  width={48}
                  height={48}
                  className="svg-icon"
                />
              </div>
              <span className="logo-label">Security</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}