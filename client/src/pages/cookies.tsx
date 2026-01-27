import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Cookie, Shield, BarChart3, Settings, Target, Lock, CheckCircle, AlertCircle, Download } from "lucide-react";

export default function CookiePolicy() {
    const cookieTypes = [
        {
            name: "Essential Cookies",
            description: "Required for the basic functionality and security of our website. These cookies enable core features such as security, network management, and accessibility.",
            purpose: "Website functionality and security",
            duration: "Session or persistent",
            examples: ["Session management", "Security tokens", "Load balancing"],
            icon: <Shield size={20} />,
            color: "from-green-500 to-blue-500",
            essential: true
        },
        {
            name: "Analytics Cookies",
            description: "Help us understand how visitors interact with our platform by collecting and reporting information anonymously.",
            purpose: "Website analytics and improvement",
            duration: "Up to 2 years",
            examples: ["Page views", "Time on site", "User journeys"],
            icon: <BarChart3 size={20} />,
            color: "from-purple-500 to-pink-500",
            essential: false
        },
        {
            name: "Functional Cookies",
            description: "Remember your preferences and settings to provide a personalized and enhanced browsing experience.",
            purpose: "User preference storage",
            duration: "Up to 1 year",
            examples: ["Language settings", "Theme preferences", "Login state"],
            icon: <Settings size={20} />,
            color: "from-orange-500 to-red-500",
            essential: false
        },
        {
            name: "Advertising Cookies",
            description: "Used to deliver relevant advertisements and measure the effectiveness of our marketing campaigns.",
            purpose: "Advertising and marketing",
            duration: "Up to 1 year",
            examples: ["Ad targeting", "Campaign measurement", "Conversion tracking"],
            icon: <Target size={20} />,
            color: "from-blue-500 to-cyan-500",
            essential: false
        }
    ];

    const browserGuides = [
        {
            browser: "Google Chrome",
            steps: "Settings → Privacy and security → Cookies and other site data"
        },
        {
            browser: "Mozilla Firefox",
            steps: "Options → Privacy & Security → Cookies and Site Data"
        },
        {
            browser: "Safari",
            steps: "Preferences → Privacy → Cookies and website data"
        },
        {
            browser: "Microsoft Edge",
            steps: "Settings → Cookies and site permissions → Cookies and data stored"
        }
    ];

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

        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }

        .cookie-hero {
          background: 
            radial-gradient(ellipse at 20% 20%, rgba(120, 119, 198, 0.15) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 80%, rgba(255, 119, 198, 0.1) 0%, transparent 50%),
            linear-gradient(135deg, #0A0B1E 0%, #1A1B3E 50%, #0A0B1E 100%);
          position: relative;
          overflow: hidden;
          font-family: 'Inter', sans-serif;
          min-height: 100vh;
        }

        .cookie-hero::before {
          content: '';
          position: absolute;
          inset: 0;
          background: 
            url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23000' fill-opacity='0.03' fill-rule='evenodd'/%3E%3C/svg%3E");
          opacity: 0.3;
          animation: shimmer 20s linear infinite;
          pointer-events: none;
        }

        .cookie-content {
          max-width: 1200px;
          margin: 0 auto;
          padding: 6rem 2rem 4rem;
          position: relative;
          z-index: 2;
        }

        .cookie-header {
          text-align: center;
          margin-bottom: 4rem;
        }

        .cookie-title-icon {
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

        .cookie-title {
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

        .cookie-subtitle {
          font-size: 1.3rem;
          color: rgba(255, 255, 255, 0.7);
          max-width: 600px;
          margin: 0 auto;
          line-height: 1.6;
          font-weight: 400;
        }

        .cookie-main {
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem 0;
        }

        .intro-section {
          text-align: center;
          margin-bottom: 3rem;
        }

        .intro-text {
          font-size: 1.1rem;
          color: rgba(255, 255, 255, 0.8);
          max-width: 800px;
          margin: 0 auto 3rem;
          line-height: 1.8;
        }

        .cookie-types-section {
          background: rgba(255, 255, 255, 0.03);
          border-radius: 20px;
          padding: 2.5rem;
          border: 1px solid rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          margin-bottom: 4rem;
        }

        .section-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: rgba(255, 255, 255, 0.95);
          margin-bottom: 1.5rem;
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .section-icon {
          color: #00F5A0;
        }

        .cookie-types-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
          margin-bottom: 2rem;
        }

        .cookie-type-card {
          background: rgba(255, 255, 255, 0.03);
          border-radius: 16px;
          padding: 2rem;
          border: 1px solid rgba(255, 255, 255, 0.1);
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .cookie-type-card:hover {
          background: rgba(255, 255, 255, 0.05);
          border-color: rgba(0, 245, 160, 0.3);
          transform: translateY(-5px);
        }

        .cookie-type-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1rem;
        }

        .cookie-type-icon {
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

        .cookie-type-title {
          font-size: 1.2rem;
          font-weight: 700;
          color: rgba(255, 255, 255, 0.95);
          margin: 0;
          flex-grow: 1;
        }

        .essential-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.25rem 0.75rem;
          background: rgba(0, 245, 160, 0.1);
          border: 1px solid rgba(0, 245, 160, 0.3);
          border-radius: 20px;
          font-size: 0.75rem;
          color: #00F5A0;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .cookie-type-description {
          font-size: 0.95rem;
          color: rgba(255, 255, 255, 0.7);
          line-height: 1.6;
          margin-bottom: 1.5rem;
        }

        .cookie-type-details {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .detail-item {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .detail-label {
          font-size: 0.85rem;
          color: rgba(255, 255, 255, 0.5);
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .detail-value {
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.9);
          font-weight: 500;
        }

        .cookie-examples {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .cookie-example {
          padding: 0.25rem 0.75rem;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 20px;
          font-size: 0.8rem;
          color: rgba(255, 255, 255, 0.6);
        }

        .management-section {
          background: rgba(255, 255, 255, 0.03);
          border-radius: 20px;
          padding: 2.5rem;
          border: 1px solid rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          margin-bottom: 4rem;
        }

        .management-content {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 3rem;
        }

        .management-info {
          flex: 1;
        }

        .management-text {
          font-size: 1rem;
          color: rgba(255, 255, 255, 0.8);
          line-height: 1.8;
          margin-bottom: 2rem;
        }

        .important-note {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
          padding: 1.5rem;
          background: rgba(255, 107, 157, 0.1);
          border: 1px solid rgba(255, 107, 157, 0.3);
          border-radius: 12px;
          margin-top: 2rem;
        }

        .note-icon {
          color: #FF6B9D;
          flex-shrink: 0;
        }

        .note-text {
          font-size: 0.95rem;
          color: rgba(255, 255, 255, 0.8);
          line-height: 1.6;
        }

        .browser-guides {
          flex: 1;
        }

        .browser-list {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .browser-item {
          background: rgba(255, 255, 255, 0.03);
          border-radius: 12px;
          padding: 1.5rem;
          border: 1px solid rgba(255, 255, 255, 0.05);
          transition: all 0.3s ease;
        }

        .browser-item:hover {
          background: rgba(255, 255, 255, 0.05);
          border-color: rgba(0, 245, 160, 0.2);
        }

        .browser-name {
          font-size: 1.1rem;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.95);
          margin-bottom: 0.75rem;
        }

        .browser-steps {
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.7);
          line-height: 1.6;
          font-family: 'Monaco', 'Menlo', 'Consolas', monospace;
        }

        .cookie-consent {
          background: rgba(255, 255, 255, 0.03);
          border-radius: 20px;
          padding: 2rem;
          border: 1px solid rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          margin-bottom: 3rem;
          text-align: center;
        }

        .consent-title {
          font-size: 1.3rem;
          font-weight: 700;
          color: rgba(255, 255, 255, 0.95);
          margin-bottom: 1rem;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
        }

        .consent-icon {
          color: #00F5A0;
        }

        .consent-text {
          font-size: 1rem;
          color: rgba(255, 255, 255, 0.7);
          margin-bottom: 1.5rem;
          line-height: 1.6;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        }

        .consent-toggle {
          display: flex;
          align-items: center;
          gap: 1rem;
          justify-content: center;
          margin-bottom: 1.5rem;
        }

        .toggle-label {
          font-size: 1rem;
          color: rgba(255, 255, 255, 0.9);
          font-weight: 500;
        }

        .toggle-switch {
          position: relative;
          display: inline-block;
          width: 60px;
          height: 30px;
        }

        .toggle-switch input {
          opacity: 0;
          width: 0;
          height: 0;
        }

        .toggle-slider {
          position: absolute;
          cursor: pointer;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(255, 255, 255, 0.1);
          transition: .4s;
          border-radius: 34px;
        }

        .toggle-slider:before {
          position: absolute;
          content: "";
          height: 22px;
          width: 22px;
          left: 4px;
          bottom: 4px;
          background-color: white;
          transition: .4s;
          border-radius: 50%;
        }

        input:checked + .toggle-slider {
          background: linear-gradient(135deg, #00F5A0, #7877C6);
        }

        input:checked + .toggle-slider:before {
          transform: translateX(30px);
        }

        .cta-section {
          text-align: center;
          padding: 3rem;
          background: rgba(255, 255, 255, 0.03);
          border-radius: 20px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          margin-top: 4rem;
        }

        .cta-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: rgba(255, 255, 255, 0.9);
          margin-bottom: 1rem;
        }

        .cta-description {
          font-size: 1rem;
          color: rgba(255, 255, 255, 0.7);
          margin-bottom: 2rem;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
          line-height: 1.6;
        }

        .cta-buttons {
          display: flex;
          gap: 1rem;
          justify-content: center;
          flex-wrap: wrap;
        }

        .cta-btn {
          padding: 0.875rem 1.75rem;
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

        .cta-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(0, 245, 160, 0.3);
        }

        .cta-btn-secondary {
          padding: 0.875rem 1.75rem;
          background: rgba(255, 255, 255, 0.05);
          color: rgba(255, 255, 255, 0.9);
          font-weight: 600;
          font-size: 1rem;
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.3s ease;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
        }

        .cta-btn-secondary:hover {
          background: rgba(255, 255, 255, 0.08);
          color: white;
          border-color: rgba(255, 255, 255, 0.2);
        }

        @media (max-width: 1024px) {
          .cookie-title {
            font-size: 2.8rem;
          }
          
          .cookie-content {
            padding: 5rem 1.5rem 3rem;
          }
          
          .cookie-types-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 1.5rem;
          }
          
          .management-content {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
        }

        @media (max-width: 768px) {
          .cookie-title {
            font-size: 2.2rem;
          }
          
          .cookie-subtitle {
            font-size: 1.1rem;
          }
          
          .cookie-types-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }
          
          .cookie-types-section,
          .management-section,
          .cookie-consent {
            padding: 1.5rem;
          }
          
          .cta-section {
            padding: 2rem 1.5rem;
          }
          
          .cta-buttons {
            flex-direction: column;
            align-items: center;
          }
          
          .cta-btn,
          .cta-btn-secondary {
            width: 100%;
            max-width: 300px;
            justify-content: center;
          }
        }

        @media (max-width: 480px) {
          .cookie-title {
            font-size: 1.8rem;
          }
          
          .cookie-content {
            padding: 4rem 1rem 2rem;
          }
          
          .cookie-type-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 1rem;
          }
          
          .consent-toggle {
            flex-direction: column;
            gap: 0.75rem;
          }
        }
      `}</style>

            <div className="cookie-hero">
                <div className="cookie-content">
                    <div className="cookie-header">
                        <div className="cookie-title-icon">
                            <Cookie size={40} />
                        </div>
                        <h1 className="cookie-title">Cookie Policy</h1>
                        <p className="cookie-subtitle">
                            Learn how we use cookies to enhance your experience, analyze usage, and personalize content.
                        </p>
                    </div>

                    <div className="cookie-main">
                        <div className="intro-section">
                            <p className="intro-text">
                                We use cookies to improve your browsing experience, analyze site traffic, and provide personalized content.
                                Cookies help us understand how you interact with our platform so we can enhance our services and provide you with the best possible experience.
                            </p>
                        </div>

                        <div className="cookie-types-section">
                            <h2 className="section-title">
                                <Shield className="section-icon" size={24} />
                                Types of Cookies We Use
                            </h2>

                            <div className="cookie-types-grid">
                                {cookieTypes.map((cookie, index) => (
                                    <div key={index} className="cookie-type-card">
                                        <div className="cookie-type-header">
                                            <div className="cookie-type-icon">
                                                {cookie.icon}
                                            </div>
                                            <h3 className="cookie-type-title">{cookie.name}</h3>
                                            {cookie.essential && (
                                                <div className="essential-badge">
                                                    <CheckCircle size={12} />
                                                    Essential
                                                </div>
                                            )}
                                        </div>

                                        <p className="cookie-type-description">{cookie.description}</p>

                                        <div className="cookie-type-details">
                                            <div className="detail-item">
                                                <div className="detail-label">Purpose</div>
                                                <div className="detail-value">{cookie.purpose}</div>
                                            </div>
                                            <div className="detail-item">
                                                <div className="detail-label">Duration</div>
                                                <div className="detail-value">{cookie.duration}</div>
                                            </div>
                                        </div>

                                        <div className="cookie-examples">
                                            {cookie.examples.map((example, idx) => (
                                                <span key={idx} className="cookie-example">{example}</span>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="management-section">
                            <h2 className="section-title">
                                <Settings className="section-icon" size={24} />
                                Managing Cookies
                            </h2>

                            <div className="management-content">
                                <div className="management-info">
                                    <p className="management-text">
                                        You can control or disable cookies through your browser settings. Most web browsers allow you to manage
                                        your cookie preferences. You can usually find these settings in the "Options" or "Preferences" menu of your browser.
                                    </p>
                                    <p className="management-text">
                                        Note that disabling certain cookies may affect the functionality and performance of our platform.
                                        Essential cookies cannot be disabled as they are necessary for the website to function properly.
                                    </p>

                                    <div className="important-note">
                                        <div className="note-icon">
                                            <AlertCircle size={20} />
                                        </div>
                                        <p className="note-text">
                                            <strong>Important:</strong> Blocking all cookies may prevent you from accessing certain features of our
                                            website and could impact your user experience.
                                        </p>
                                    </div>
                                </div>

                                <div className="browser-guides">
                                    <h3 style={{ fontSize: '1.2rem', fontWeight: '600', color: 'rgba(255, 255, 255, 0.95)', marginBottom: '1.5rem' }}>
                                        Browser Cookie Settings
                                    </h3>
                                    <div className="browser-list">
                                        {browserGuides.map((guide, index) => (
                                            <div key={index} className="browser-item">
                                                <div className="browser-name">{guide.browser}</div>
                                                <div className="browser-steps">{guide.steps}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="cookie-consent">
                            <h2 className="consent-title">
                                <Lock className="consent-icon" size={24} />
                                Your Cookie Preferences
                            </h2>
                            <p className="consent-text">
                                You can manage your cookie preferences for this website using the toggle below.
                                Your preferences will be remembered for future visits.
                            </p>

                            <div className="consent-toggle">
                                <span className="toggle-label">Accept Non-Essential Cookies</span>
                                <label className="toggle-switch">
                                    <input type="checkbox" defaultChecked />
                                    <span className="toggle-slider"></span>
                                </label>
                            </div>

                            <p style={{ fontSize: '0.9rem', color: 'rgba(255, 255, 255, 0.6)', lineHeight: '1.6' }}>
                                Essential cookies are always enabled as they are required for the website to function properly.
                            </p>
                        </div>

                        <div className="cta-section">
                            <h2 className="cta-title">Need More Information?</h2>
                            <p className="cta-description">
                                If you have any questions about our Cookie Policy or how we use cookies,
                                please don't hesitate to contact our support team for assistance.
                            </p>
                            <div className="cta-buttons">
                                <button className="cta-btn">
                                    <MessageSquare size={20} />
                                    Contact Support Team
                                </button>
                                <button className="cta-btn-secondary">
                                    <Download size={20} />
                                    Download Full Policy
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    );
}

// MessageSquare icon component
const MessageSquare = ({ size = 24, className = "" }) => (
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
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
);