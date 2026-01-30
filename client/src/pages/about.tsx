import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/seo";
import { Shield, AlertTriangle, Brain, Target, Users, Lock, Globe, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function AboutPage() {
  return (
    <>
      <SEO
        title="About Us - Mission & Technology"
        description="Learn about Thuliyam AI's mission to combat AI-generated misinformation. Discover our advanced deepfake detection technology with 93.7% accuracy, responsible AI practices, and commitment to digital media authenticity."
        url="https://thuliyam-ai.vercel.app/about"
        keywords="about Thuliyam AI, deepfake detection technology, AI misinformation, responsible AI, machine learning accuracy, digital authenticity, computer vision"
        pageType="website"
      />


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

        @keyframes shimmer {
          0% {
            background-position: -1000px 0;
          }
          100% {
            background-position: 1000px 0;
          }
        }

        .about-page {
          min-height: 100vh;
          background: 
            radial-gradient(ellipse at 20% 20%, rgba(120, 119, 198, 0.15) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 80%, rgba(255, 119, 198, 0.1) 0%, transparent 50%),
            linear-gradient(135deg, #0A0B1E 0%, #1A1B3E 50%, #0A0B1E 100%);
          position: relative;
          overflow: hidden;
          font-family: 'Inter', sans-serif;
          color: #ffffff;
        }

        .about-page::before {
          content: '';
          position: absolute;
          inset: 0;
          background: 
            url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23000' fill-opacity='0.03' fill-rule='evenodd'/%3E%3C/svg%3E");
          opacity: 0.3;
          animation: shimmer 20s linear infinite;
          pointer-events: none;
        }

        .hero-section {
          padding: 8rem 2rem 6rem;
          text-align: center;
          position: relative;
          z-index: 2;
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
          gap: 1.5rem;
          margin-bottom: 2rem;
          position: relative;
        }

        .hero-title-icon {
          color: #00F5A0;
          filter: drop-shadow(0 0 15px rgba(0, 245, 160, 0.5));
        }

        .hero-title {
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
          margin: 0 auto 4rem;
          line-height: 1.6;
          font-weight: 400;
          padding: 0 1rem;
        }

        .content-section {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 2rem 6rem;
          position: relative;
          z-index: 2;
        }

        .mission-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 3rem;
          margin-bottom: 6rem;
          animation: fadeIn 0.8s ease-out;
        }

        .mission-card {
          background: rgba(16, 18, 40, 0.7);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-radius: 24px;
          padding: 3rem;
          border: 1px solid rgba(255, 255, 255, 0.15);
          box-shadow: 
            0 20px 60px rgba(0, 0, 0, 0.3),
            0 0 0 1px rgba(255, 255, 255, 0.1);
          transition: all 0.4s ease;
          position: relative;
          overflow: hidden;
        }

        .mission-card::before {
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

        .mission-card:hover::before {
          opacity: 1;
        }

        .mission-card:hover {
          transform: translateY(-10px);
          border-color: rgba(0, 245, 160, 0.3);
          box-shadow: 
            0 30px 80px rgba(0, 245, 160, 0.2),
            0 0 0 1px rgba(0, 245, 160, 0.2);
        }

        .card-icon {
          width: 60px;
          height: 60px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #00F5A0, #7877C6);
          border-radius: 16px;
          margin-bottom: 2rem;
          color: white;
        }

        .card-title {
          font-size: 1.8rem;
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 1.5rem;
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .card-content {
          font-size: 1.1rem;
          color: rgba(255, 255, 255, 0.7);
          line-height: 1.6;
          margin-bottom: 2rem;
        }

        .section-header {
          text-align: center;
          margin-bottom: 4rem;
          position: relative;
        }

        .section-title {
          font-size: 2.5rem;
          font-weight: 800;
          background: linear-gradient(135deg, #00F5A0 0%, #7877C6 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 1rem;
        }

        .section-subtitle {
          font-size: 1.2rem;
          color: rgba(255, 255, 255, 0.6);
          max-width: 700px;
          margin: 0 auto;
        }

        .process-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 2rem;
          margin-bottom: 6rem;
        }

        .process-card {
          background: rgba(16, 18, 40, 0.7);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-radius: 20px;
          padding: 2.5rem;
          border: 1px solid rgba(255, 255, 255, 0.15);
          text-align: center;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .process-card:hover {
          transform: translateY(-5px);
          border-color: rgba(0, 245, 160, 0.3);
        }

        .process-number {
          width: 50px;
          height: 50px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #00F5A0, #7877C6);
          border-radius: 50%;
          font-size: 1.5rem;
          font-weight: 800;
          color: white;
          margin: 0 auto 1.5rem;
        }

        .process-title {
          font-size: 1.4rem;
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 1rem;
        }

        .process-description {
          font-size: 1rem;
          color: rgba(255, 255, 255, 0.6);
          line-height: 1.5;
        }

        .warning-card {
          background: rgba(255, 71, 87, 0.1);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-radius: 24px;
          padding: 3rem;
          border: 1px solid rgba(255, 107, 157, 0.3);
          margin-bottom: 6rem;
          position: relative;
          overflow: hidden;
        }

        .warning-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 2rem;
        }

        .warning-icon {
          color: #FF6B9D;
          filter: drop-shadow(0 0 10px rgba(255, 107, 157, 0.5));
        }

        .warning-title {
          font-size: 2rem;
          font-weight: 700;
          color: #ffffff;
        }

        .warning-content {
          font-size: 1.1rem;
          color: rgba(255, 255, 255, 0.8);
          line-height: 1.6;
          margin-bottom: 2rem;
        }

        .warning-list {
          list-style: none;
          padding: 0;
          margin: 2rem 0;
        }

        .warning-item {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
          margin-bottom: 1rem;
          color: rgba(255, 255, 255, 0.7);
          font-size: 1rem;
        }

        .warning-bullet {
          color: #FF6B9D;
          flex-shrink: 0;
          margin-top: 0.2rem;
        }

        .cta-section {
          text-align: center;
          padding: 4rem 2rem;
          background: rgba(16, 18, 40, 0.5);
          border-radius: 32px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          margin-top: 4rem;
        }

        .cta-title {
          font-size: 2.5rem;
          font-weight: 800;
          background: linear-gradient(135deg, #00F5A0 0%, #7877C6 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 1.5rem;
        }

        .cta-subtitle {
          font-size: 1.2rem;
          color: rgba(255, 255, 255, 0.7);
          max-width: 600px;
          margin: 0 auto 3rem;
        }

        .oval-btn {
          position: relative;
          padding: 1.2rem 3rem;
          background: linear-gradient(135deg, #00F5A0 0%, #7877C6 100%);
          color: white;
          font-weight: 600;
          font-size: 1.1rem;
          border: none;
          border-radius: 50px;
          cursor: pointer;
          transition: all 0.3s ease;
          display: inline-flex;
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

        @media (max-width: 1024px) {
          .hero-title {
            font-size: 3.2rem;
          }
          
          .mission-grid {
            grid-template-columns: 1fr;
          }
          
          .process-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 768px) {
          .hero-section {
            padding: 6rem 1rem 4rem;
          }
          
          .hero-title {
            font-size: 2.5rem;
          }
          
          .hero-subtitle {
            font-size: 1.1rem;
            padding: 0;
          }
          
          .content-section {
            padding: 0 1rem 4rem;
          }
          
          .mission-card {
            padding: 2rem;
          }
          
          .card-title {
            font-size: 1.5rem;
          }
          
          .section-title {
            font-size: 2rem;
          }
          
          .process-grid {
            grid-template-columns: 1fr;
          }
          
          .warning-card {
            padding: 2rem;
          }
          
          .warning-title {
            font-size: 1.8rem;
          }
          
          .cta-title {
            font-size: 2rem;
          }
        }

        @media (max-width: 480px) {
          .hero-title {
            font-size: 2rem;
          }
          
          .oval-btn {
            padding: 1rem 1.5rem;
            font-size: 1rem;
            min-width: auto;
            width: 100%;
            max-width: 300px;
          }
          
          .card-icon {
            width: 50px;
            height: 50px;
            margin-bottom: 1.5rem;
          }
          
          .process-card {
            padding: 2rem 1.5rem;
          }
        }
      `}</style>

      <Navbar />

      <main className="about-page">
        <div className="hero-section">
          <div className="hero-glow"></div>
          <div className="hero-title-container">
            <Image
              src="/logo.svg"
              alt="Thuliyam AI Logo"
              width={50}
              height={50}
              className="logo-image"
              priority
            />
            <h1 className="hero-title">About Thuliyam AI</h1>
          </div>
          <p className="hero-subtitle">
            Building trust in digital media through responsible AI-powered
            deepfake detection using cutting-edge machine learning.
          </p>
        </div>

        <div className="content-section">
          {/* Mission Section */}
          <div className="mission-grid">
            <div className="mission-card">
              <div className="card-icon">
                <Target size={28} />
              </div>
              <h2 className="card-title">Our Mission</h2>
              <p className="card-content">
                Thuliyam AI aims to combat the growing threat of AI-generated
                misinformation by providing fast, accessible, and intelligent
                deepfake detection tools. Our mission is to empower individuals,
                organizations, and platforms to make informed decisions about
                digital content authenticity.
              </p>
              <div className="stat-badge">
                <span className="stat-value">93.7%</span>
                <span className="stat-label">Detection Accuracy</span>
              </div>
            </div>

            <div className="mission-card">
              <div className="card-icon">
                <Brain size={28} />
              </div>
              <h2 className="card-title">Why Thuliyam AI?</h2>
              <p className="card-content">
                With the rise of generative AI, manipulated images and videos
                have become increasingly realistic. Thuliyam AI was built to
                address this challenge using advanced machine learning models
                trained to analyze visual patterns, artifacts, and inconsistencies
                that are often invisible to the human eye.
              </p>
              <div className="stat-badge">
                <span className="stat-value">19K+</span>
                <span className="stat-label">Images Analyzed</span>
              </div>
            </div>
          </div>

          {/* How It Works */}
          <div className="section-header">
            <h2 className="section-title">How Thuliyam AI Works</h2>
            <p className="section-subtitle">
              A sophisticated three-step process powered by advanced AI technology
            </p>
          </div>

          <div className="process-grid">
            <div className="process-card">
              <div className="process-number">1</div>
              <h3 className="process-title">Image Analysis</h3>
              <p className="process-description">
                Uploaded images are processed and normalized to extract
                meaningful visual features and patterns for detailed examination.
              </p>
            </div>

            <div className="process-card">
              <div className="process-number">2</div>
              <h3 className="process-title">AI Model Evaluation</h3>
              <p className="process-description">
                Our trained deep learning models evaluate patterns commonly
                associated with AI-generated or manipulated images using neural networks.
              </p>
            </div>

            <div className="process-card">
              <div className="process-number">3</div>
              <h3 className="process-title">Confidence Score</h3>
              <p className="process-description">
                The system returns a classification along with a detailed
                confidence score to help users interpret the result accurately.
              </p>
            </div>
          </div>

          {/* Accuracy & Limitations */}
          <div className="warning-card">
            <div className="warning-header">
              <AlertTriangle className="warning-icon" size={40} />
              <h2 className="warning-title">Accuracy & Limitations</h2>
            </div>
            <p className="warning-content">
              While Thuliyam AI leverages advanced machine learning techniques,
              no AI system can guarantee 100% accuracy. Here's what you need to know:
            </p>
            <ul className="warning-list">
              <li className="warning-item">
                <ArrowRight className="warning-bullet" size={20} />
                <span>Results are probabilistic and should be interpreted as guidance, not absolute truth.</span>
              </li>
              <li className="warning-item">
                <ArrowRight className="warning-bullet" size={20} />
                <span>New or unseen manipulation techniques may reduce detection accuracy.</span>
              </li>
              <li className="warning-item">
                <ArrowRight className="warning-bullet" size={20} />
                <span>Image quality, compression, and resolution can affect results.</span>
              </li>
              <li className="warning-item">
                <ArrowRight className="warning-bullet" size={20} />
                <span>Real-time processing may have limitations with extremely large files.</span>
              </li>
            </ul>
            <p className="warning-content">
              We strongly recommend using Thuliyam AI as a decision-support
              tool, alongside human judgment and additional verification methods.
            </p>
          </div>

          {/* Responsible AI */}
          <div className="mission-card">
            <div className="card-icon">
              <Shield size={28} />
            </div>
            <h2 className="card-title">Responsible AI Commitment</h2>
            <p className="card-content">
              Thuliyam AI is built with a strong commitment to ethical AI
              practices. We prioritize transparency, user privacy, and fairness.
              Uploaded images are processed securely with end-to-end encryption
              and are never reused for training without explicit consent.
            </p>
            <div className="features-list">
              <div className="feature-item">
                <Lock size={18} />
                <span>End-to-end encryption</span>
              </div>
              <div className="feature-item">
                <Users size={18} />
                <span>No data storage policy</span>
              </div>
              <div className="feature-item">
                <Globe size={18} />
                <span>Global accessibility</span>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="cta-section">
            <h2 className="cta-title">Ready to Verify Authenticity?</h2>
            <p className="cta-subtitle">
              Start analyzing images with our advanced AI detection system
              and make informed decisions about digital content.
            </p>
            <Link href="/upload" className="oval-btn">
              <span>Start Analyzing Images</span>
            </Link>
          </div>
        </div>

        <Footer />
      </main>
    </>
  );
}

// Additional CSS for stats and features
<style jsx>{`
  .stat-badge {
    display: flex;
    align-items: baseline;
    gap: 0.5rem;
    margin-top: 2rem;
    padding-top: 1.5rem;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
  }

  .stat-value {
    font-size: 2rem;
    font-weight: 800;
    background: linear-gradient(135deg, #00F5A0, #7877C6);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .stat-label {
    font-size: 0.9rem;
    color: rgba(255, 255, 255, 0.6);
    font-weight: 500;
  }

  .features-list {
    display: flex;
    flex-wrap: wrap;
    gap: 1.5rem;
    margin-top: 2rem;
  }

  .feature-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: rgba(255, 255, 255, 0.7);
    font-size: 0.95rem;
  }

  .feature-item svg {
    color: #00F5A0;
  }

  @media (max-width: 768px) {
    .features-list {
      flex-direction: column;
      gap: 1rem;
    }
    
    .stat-badge {
      flex-direction: column;
      align-items: flex-start;
      gap: 0.3rem;
    }
  }
`}</style>