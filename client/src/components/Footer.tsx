import { Github, Twitter, Linkedin, Mail, Globe, ArrowUp } from "lucide-react";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function Footer() {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

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

        .footer {
          padding: 5rem 2rem 3rem;
          background: 
            radial-gradient(ellipse at 50% 0%, rgba(10, 11, 30, 0.8) 0%, transparent 70%),
            linear-gradient(180deg, rgba(26, 27, 62, 0.5) 0%, #0A0B1E 100%);
          position: relative;
          overflow: hidden;
          font-family: 'Inter', sans-serif;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }

        .footer::before {
          content: '';
          position: absolute;
          inset: 0;
          background: 
            url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23000' fill-opacity='0.03' fill-rule='evenodd'/%3E%3C/svg%3E");
          opacity: 0.3;
          pointer-events: none;
        }

        .footer-container {
          max-width: 1200px;
          margin: 0 auto;
          position: relative;
          z-index: 2;
        }

        .footer-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 4rem;
          margin-bottom: 4rem;
        }

        .footer-brand {
          max-width: 300px;
        }

        .brand-logo {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .logo-icon {
          width: 50px;
          height: 50px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 12px;
          color: #ffffff;
        }

        .brand-name {
          font-size: 1.8rem;
          font-weight: 800;
          color: #ffffff;
        }

        .brand-name span {
          color: #FF77C6;
        }

        .brand-tagline {
          color: rgba(255, 255, 255, 0.7);
          font-size: 1rem;
          line-height: 1.6;
          margin-bottom: 2rem;
        }

        .footer-links {
          display: grid;
          gap: 2rem;
        }

        .links-column h3 {
          font-size: 1.3rem;
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 1.5rem;
          position: relative;
          padding-bottom: 0.8rem;
        }

        .links-column h3::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 40px;
          height: 2px;
          background: linear-gradient(90deg, #00F5A0, #7877C6);
        }

        .links-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .links-list a {
          color: rgba(255, 255, 255, 0.7);
          text-decoration: none;
          font-size: 1rem;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 0.8rem;
        }

        .links-list a:hover {
          color: #ffffff;
          transform: translateX(5px);
        }

        .link-icon {
          width: 20px;
          height: 20px;
          color: #00F5A0;
        }

        .social-links {
          display: flex;
          gap: 1rem;
          margin-top: 1rem;
        }

        .social-link {
          width: 44px;
          height: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 12px;
          color: rgba(255, 255, 255, 0.7);
          transition: all 0.3s ease;
        }

        .social-link:hover {
          background: linear-gradient(135deg, #00F5A0, #7877C6);
          color: #ffffff;
          transform: translateY(-3px);
        }

        .footer-bottom {
          padding-top: 3rem;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2rem;
          text-align: center;
        }

        .copyright {
          color: rgba(255, 255, 255, 0.7);
          font-size: 1rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .footer-note {
          background: rgba(255, 71, 87, 0.1);
          border: 1px solid rgba(255, 107, 157, 0.3);
          border-radius: 16px;
          padding: 1.5rem 2rem;
          color: rgba(255, 255, 255, 0.7);
          font-size: 0.95rem;
          line-height: 1.6;
          max-width: 600px;
          margin: 0 auto;
          backdrop-filter: blur(10px);
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .disclaimer-icon {
          color: #FF6B9D;
          flex-shrink: 0;
        }

        .legal-links {
          display: flex;
          gap: 2rem;
          flex-wrap: wrap;
          justify-content: center;
        }

        .legal-links a {
          color: rgba(255, 255, 255, 0.7);
          text-decoration: none;
          font-size: 0.9rem;
          transition: all 0.3s ease;
        }

        .legal-links a:hover {
          color: #ffffff;
        }

        .made-with {
          display: flex;
          align-items: center;
          gap: 0.8rem;
          color: rgba(255, 255, 255, 0.5);
          font-size: 0.9rem;
          margin-top: 1rem;
        }

        .heart-icon {
          color: #FF4757;
          animation: heartbeat 1.5s ease-in-out infinite;
        }

        @keyframes heartbeat {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }

        .scroll-top {
          position: fixed;
          bottom: 2rem;
          right: 2rem;
          width: 56px;
          height: 56px;
          background: linear-gradient(135deg, #00F5A0, #7877C6);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #ffffff;
          cursor: pointer;
          transition: all 0.3s ease;
          opacity: ${showScrollTop ? '1' : '0'};
          visibility: ${showScrollTop ? 'visible' : 'hidden'};
          transform: translateY(${showScrollTop ? '0' : '10px'});
          z-index: 100;
          box-shadow: 0 10px 30px rgba(0, 245, 160, 0.3);
          border: 2px solid rgba(255, 255, 255, 0.1);
        }

        .scroll-top:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 40px rgba(0, 245, 160, 0.4);
        }

        @media (max-width: 1024px) {
          .footer {
            padding: 4rem 2rem 2rem;
          }
          
          .footer-grid {
            gap: 3rem;
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 768px) {
          .footer {
            padding: 3rem 1rem 2rem;
          }
          
          .footer-grid {
            grid-template-columns: 1fr;
            gap: 2.5rem;
          }
          
          .footer-bottom {
            padding-top: 2rem;
          }
          
          .footer-note {
            padding: 1.2rem 1.5rem;
            flex-direction: column;
            text-align: center;
            gap: 0.8rem;
          }
          
          .legal-links {
            gap: 1.5rem;
          }
          
          .scroll-top {
            bottom: 1.5rem;
            right: 1.5rem;
            width: 50px;
            height: 50px;
          }
        }

        @media (max-width: 480px) {
          .brand-logo {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.8rem;
          }
          
          .links-column h3 {
            font-size: 1.2rem;
          }
          
          .legal-links {
            flex-direction: column;
            gap: 1rem;
          }
          
          .copyright {
            flex-direction: column;
            gap: 0.3rem;
          }
        }
      `}</style>

      <footer className="footer">
        <div className="footer-container">
          <div className="footer-grid">
            {/* Brand Section */}
            <div className="footer-brand">
              <div className="brand-logo">
                <div className="logo-icon">
                  <Image
                    src="/logo.svg"
                    alt="Thuliyam AI Logo"
                    width={50}
                    height={50}
                    className="logo-image"
                    priority
                  />
                </div>
                <div className="brand-name">
                  Thuliyam<span>AI</span>
                </div>
              </div>
              <p className="brand-tagline">
                Advanced AI-powered deepfake detection platform using cutting-edge
                machine learning to ensure digital media authenticity.
              </p>
              <div className="social-links">
                <a href="https://github.com" className="social-link" target="_blank" rel="noopener noreferrer">
                  <Github size={20} />
                </a>
                <a href="https://twitter.com" className="social-link" target="_blank" rel="noopener noreferrer">
                  <Twitter size={20} />
                </a>
                <a href="https://linkedin.com" className="social-link" target="_blank" rel="noopener noreferrer">
                  <Linkedin size={20} />
                </a>
                <a href="mailto:contact@thuliyam.ai" className="social-link">
                  <Mail size={20} />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="links-column">
              <h3>Quick Links</h3>
              <div className="links-list">
                <a href="/">
                  <Globe className="link-icon" size={16} />
                  <span>Home</span>
                </a>
                <a href="/about">
                  <Globe className="link-icon" size={16} />
                  <span>About Us</span>
                </a>
                <a href="/analyze/image">
                  <Globe className="link-icon" size={16} />
                  <span>Image</span>
                </a>
                <a href="/api-docs">
                  <Globe className="link-icon" size={16} />
                  <span>API Documentation</span>
                </a>
                <a href="/pricing">
                  <Globe className="link-icon" size={16} />
                  <span>Pricing</span>
                </a>
              </div>
            </div>

            {/* Resources */}
            <div className="links-column">
              <h3>Resources</h3>
              <div className="links-list">
                <a href="/blog">
                  <Globe className="link-icon" size={16} />
                  <span>Blog</span>
                </a>
                <a href="/docs">
                  <Globe className="link-icon" size={16} />
                  <span>Documentation</span>
                </a>
                <a href="/research">
                  <Globe className="link-icon" size={16} />
                  <span>Research Papers</span>
                </a>
                <a href="/case-studies">
                  <Globe className="link-icon" size={16} />
                  <span>Case Studies</span>
                </a>
                <a href="/support">
                  <Globe className="link-icon" size={16} />
                  <span>Support Center</span>
                </a>
              </div>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="footer-bottom">
            <div className="copyright">
              <Image
                src="/logo.svg"
                alt="Thuliyam AI Logo"
                width={50}
                height={50}
                className="logo-image"
                priority
              />
              <span>© {currentYear} Thuliyam AI. All rights reserved.</span>
            </div>

            <p className="footer-note">
              <AlertTriangle className="disclaimer-icon" size={20} />
              Thuliyam AI provides probabilistic assessments. Results should not be considered definitive proof.
            </p>

            <div className="legal-links">
              <a href="/privacy">Privacy Policy</a>
              <a href="/terms">Terms of Service</a>
              <a href="/cookies">Cookie Policy</a>
              <a href="/security">Security</a>
              <a href="/contact">Contact Us</a>
            </div>

          </div>
        </div>

        {/* Scroll to Top Button */}
        <div className="scroll-top" onClick={scrollToTop}>
          <ArrowUp size={24} />
        </div>
      </footer>
    </>
  );
}

// AlertTriangle icon component
const AlertTriangle = ({ size = 24, className = "" }) => (
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
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
    <line x1="12" y1="9" x2="12" y2="13" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);