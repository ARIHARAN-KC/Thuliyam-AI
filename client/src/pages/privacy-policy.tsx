import Footer from "@/components/Footer";
import InfoPage from "@/components/InfoPage";
import Navbar from "@/components/Navbar";
import { Shield, Lock, Eye, Cookie, Key, Bell } from "lucide-react";

export default function PrivacyPolicy() {
  return (
    <>
      <Navbar />
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-5px); }
        }

        @keyframes pulse-glow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }

        .privacy-hero {
          background: 
            radial-gradient(ellipse at 20% 20%, rgba(120, 119, 198, 0.15) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 80%, rgba(255, 119, 198, 0.1) 0%, transparent 50%),
            linear-gradient(135deg, #0A0B1E 0%, #1A1B3E 50%, #0A0B1E 100%);
          position: relative;
          overflow: hidden;
          font-family: 'Inter', sans-serif;
          min-height: 100vh;
        }

        .privacy-hero::before {
          content: '';
          position: absolute;
          inset: 0;
          background: 
            url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23000' fill-opacity='0.03' fill-rule='evenodd'/%3E%3C/svg%3E");
          opacity: 0.3;
          animation: shimmer 20s linear infinite;
          pointer-events: none;
        }

        .privacy-content {
          max-width: 1200px;
          margin: 0 auto;
          padding: 6rem 2rem 4rem;
          position: relative;
          z-index: 2;
        }

        .privacy-header {
          text-align: center;
          margin-bottom: 4rem;
        }

        .privacy-title-icon {
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

        .privacy-title {
          font-size: 3.5rem;
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

        .privacy-subtitle {
          font-size: 1.3rem;
          color: rgba(255, 255, 255, 0.7);
          max-width: 600px;
          margin: 0 auto;
          line-height: 1.6;
          font-weight: 400;
        }

        .privacy-sections {
          max-width: 900px;
          margin: 0 auto;
          padding: 2rem 0;
        }

        .privacy-section {
          background: rgba(255, 255, 255, 0.03);
          border-radius: 20px;
          padding: 2.5rem;
          margin-bottom: 2rem;
          border: 1px solid rgba(255, 255, 255, 0.1);
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
        }

        .privacy-section:hover {
          background: rgba(255, 255, 255, 0.05);
          border-color: rgba(0, 245, 160, 0.3);
          transform: translateY(-5px);
          box-shadow: 0 20px 40px rgba(0, 245, 160, 0.1);
        }

        .section-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .section-icon {
          width: 50px;
          height: 50px;
          background: linear-gradient(135deg, #00F5A0, #7877C6);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          flex-shrink: 0;
        }

        .section-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: rgba(255, 255, 255, 0.9);
          margin: 0;
        }

        .section-content {
          color: rgba(255, 255, 255, 0.7);
          line-height: 1.8;
        }

        .section-content p {
          margin-bottom: 1rem;
        }

        .info-list {
          list-style: none;
          padding: 0;
          margin: 1.5rem 0;
        }

        .info-list li {
          padding: 0.5rem 0;
          position: relative;
          padding-left: 1.5rem;
          color: rgba(255, 255, 255, 0.7);
        }

        .info-list li:before {
          content: '•';
          color: #00F5A0;
          font-size: 1.5rem;
          position: absolute;
          left: 0;
          top: 0.3rem;
        }

        .highlight {
          background: rgba(0, 245, 160, 0.1);
          border-left: 3px solid #00F5A0;
          padding: 1.5rem;
          border-radius: 8px;
          margin: 1.5rem 0;
          color: rgba(255, 255, 255, 0.9);
        }

        .contact-link {
          color: #00F5A0;
          text-decoration: none;
          font-weight: 600;
          transition: all 0.3s ease;
          border-bottom: 1px solid transparent;
        }

        .contact-link:hover {
          color: #7877C6;
          border-bottom-color: #7877C6;
        }

        .privacy-disclaimer {
          margin-top: 4rem;
          padding: 2rem;
          background: rgba(255, 71, 87, 0.1);
          border: 1px solid rgba(255, 107, 157, 0.3);
          border-radius: 16px;
          color: rgba(255, 255, 255, 0.7);
          font-size: 0.95rem;
          line-height: 1.6;
          backdrop-filter: blur(10px);
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .disclaimer-icon {
          color: #FF6B9D;
          flex-shrink: 0;
        }

        @media (max-width: 1024px) {
          .privacy-title {
            font-size: 2.8rem;
          }
          
          .privacy-content {
            padding: 5rem 1.5rem 3rem;
          }
        }

        @media (max-width: 768px) {
          .privacy-title {
            font-size: 2.2rem;
          }
          
          .privacy-subtitle {
            font-size: 1.1rem;
          }
          
          .privacy-section {
            padding: 1.5rem;
          }
          
          .section-header {
            flex-direction: column;
            text-align: center;
            gap: 0.8rem;
          }
        }

        @media (max-width: 480px) {
          .privacy-title {
            font-size: 1.8rem;
          }
          
          .privacy-content {
            padding: 4rem 1rem 2rem;
          }
          
          .privacy-section {
            padding: 1rem;
          }
        }
      `}</style>

      <div className="privacy-hero">
        <div className="privacy-content">
          <div className="privacy-header">
            <div className="privacy-title-icon">
              <Shield size={40} />
            </div>
            <h1 className="privacy-title">Privacy Policy</h1>
            <p className="privacy-subtitle">
              Your privacy and data security are our top priorities. We're committed to protecting your personal information.
            </p>
          </div>

          <div className="privacy-sections">
            <section className="privacy-section">
              <div className="section-header">
                <div className="section-icon">
                  <Eye size={24} />
                </div>
                <h2 className="section-title">Information We Collect</h2>
              </div>
              <div className="section-content">
                <p>
                  To provide you with a seamless experience, we may collect the following types of information:
                </p>
                <ul className="info-list">
                  <li>
                    <strong>Personal Information:</strong> such as your name, email address, and contact details provided when you register or contact us.
                  </li>
                  <li>
                    <strong>Usage Data:</strong> information about how you interact with our platform, including pages visited, features used, and preferences.
                  </li>
                  <li>
                    <strong>Cookies & Tracking:</strong> small files stored on your device to improve website functionality, remember your preferences, and enhance user experience.
                  </li>
                </ul>
              </div>
            </section>

            <section className="privacy-section">
              <div className="section-header">
                <div className="section-icon">
                  <Bell size={24} />
                </div>
                <h2 className="section-title">How We Use Your Information</h2>
              </div>
              <div className="section-content">
                <p>
                  The information we collect is used for the following purposes:
                </p>
                <ul className="info-list">
                  <li>To provide and maintain our services effectively.</li>
                  <li>To improve and personalize your experience on our platform.</li>
                  <li>To communicate updates, offers, or important information about our services.</li>
                  <li>To ensure security, prevent fraud, and comply with legal obligations.</li>
                </ul>
                <div className="highlight">
                  We <strong>do not sell, trade, or share your personal information</strong> with third parties for marketing purposes. Any sharing is strictly limited to trusted partners who help us operate our services, under strict confidentiality agreements.
                </div>
              </div>
            </section>

            <section className="privacy-section">
              <div className="section-header">
                <div className="section-icon">
                  <Key size={24} />
                </div>
                <h2 className="section-title">Your Privacy Rights</h2>
              </div>
              <div className="section-content">
                <p>
                  You have the right to access, correct, or delete your personal data stored on our platform.
                  You can also manage your cookie preferences at any time.
                  For any privacy-related inquiries, please <a href="/contact-us" className="contact-link">contact us</a>.
                </p>
              </div>
            </section>

            <section className="privacy-section">
              <div className="section-header">
                <div className="section-icon">
                  <Lock size={24} />
                </div>
                <h2 className="section-title">Security Measures</h2>
              </div>
              <div className="section-content">
                <p>
                  We implement industry-standard security practices, including encryption and secure server storage, to protect your data from unauthorized access or disclosure.
                  However, no method of transmission over the internet is 100% secure, so we cannot guarantee absolute security.
                </p>
              </div>
            </section>

            <section className="privacy-section">
              <div className="section-header">
                <div className="section-icon">
                  <Cookie size={24} />
                </div>
                <h2 className="section-title">Changes to This Policy</h2>
              </div>
              <div className="section-content">
                <p>
                  We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements.
                  Any updates will be posted on this page with a revised effective date.
                </p>
              </div>
            </section>
          </div>

          <div className="privacy-disclaimer">
            <AlertCircle className="disclaimer-icon" size={24} />
            <div>
              <strong>Last Updated:</strong> December 27, 2025 • This policy applies to all services provided by our platform. Please review regularly for updates.
            </div>
          </div>
        </div>
      </div>
      <Footer/>
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