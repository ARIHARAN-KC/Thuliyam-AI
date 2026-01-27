import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Shield, Lock, Key, Eye, Server, Users, AlertTriangle, CheckCircle, FileText, Cloud, Cpu, Globe } from "lucide-react";

export default function Security() {
    const securityFeatures = [
        {
            title: "End-to-End Encryption",
            description: "All data is encrypted both in transit (TLS 1.3) and at rest (AES-256) using industry-leading cryptographic standards.",
            icon: <Lock size={24} />,
            color: "from-green-500 to-blue-500",
            compliance: ["GDPR Compliant", "ISO 27001"]
        },
        {
            title: "Zero-Trust Architecture",
            description: "Implementing strict identity verification for every person and device accessing our systems, regardless of location.",
            icon: <Key size={24} />,
            color: "from-purple-500 to-pink-500",
            compliance: ["NIST Framework", "Zero Trust Model"]
        },
        {
            title: "Multi-Factor Authentication",
            description: "Required for all administrative access and available for user accounts to prevent unauthorized access.",
            icon: <Shield size={24} />,
            color: "from-orange-500 to-red-500",
            compliance: ["2FA Required", "Biometric Support"]
        },
        {
            title: "Real-Time Monitoring",
            description: "24/7 security monitoring with AI-powered threat detection and automated response systems.",
            icon: <Eye size={24} />,
            color: "from-blue-500 to-cyan-500",
            compliance: ["SOC 2 Type II", "Continuous Monitoring"]
        }
    ];

    const securityPractices = [
        {
            category: "Data Protection",
            practices: [
                "End-to-end encryption for all data transfers",
                "Automatic data backup with geo-redundancy",
                "Secure data deletion protocols",
                "Regular security audits and penetration testing"
            ],
            icon: <Cloud size={20} />
        },
        {
            category: "Access Control",
            practices: [
                "Role-based access control (RBAC)",
                "Multi-factor authentication enforcement",
                "Session management and timeout policies",
                "Principle of least privilege"
            ],
            icon: <Users size={20} />
        },
        {
            category: "Infrastructure Security",
            practices: [
                "Regular security patches and updates",
                "DDoS protection and mitigation",
                "Intrusion detection and prevention systems",
                "Secure software development lifecycle"
            ],
            icon: <Server size={20} />
        }
    ];

    const complianceStandards = [
        { name: "ISO 27001", description: "Information security management" },
        { name: "SOC 2 Type II", description: "Service organization controls" },
        { name: "GDPR", description: "Data protection and privacy" },
        { name: "CCPA", description: "California consumer privacy" },
        { name: "HIPAA", description: "Healthcare data protection" },
        { name: "PCI DSS", description: "Payment card industry" }
    ];

    const incidentResponse = [
        { step: "Detection", description: "AI-powered anomaly detection and monitoring" },
        { step: "Containment", description: "Automated isolation of affected systems" },
        { step: "Investigation", description: "Forensic analysis and root cause identification" },
        { step: "Resolution", description: "Patching vulnerabilities and restoring services" },
        { step: "Reporting", description: "Transparent communication and post-incident review" }
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

        .security-hero {
          background: 
            radial-gradient(ellipse at 20% 20%, rgba(120, 119, 198, 0.15) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 80%, rgba(255, 119, 198, 0.1) 0%, transparent 50%),
            linear-gradient(135deg, #0A0B1E 0%, #1A1B3E 50%, #0A0B1E 100%);
          position: relative;
          overflow: hidden;
          font-family: 'Inter', sans-serif;
          min-height: 100vh;
        }

        .security-hero::before {
          content: '';
          position: absolute;
          inset: 0;
          background: 
            url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23000' fill-opacity='0.03' fill-rule='evenodd'/%3E%3C/svg%3E");
          opacity: 0.3;
          animation: shimmer 20s linear infinite;
          pointer-events: none;
        }

        .security-content {
          max-width: 1200px;
          margin: 0 auto;
          padding: 6rem 2rem 4rem;
          position: relative;
          z-index: 2;
        }

        .security-header {
          text-align: center;
          margin-bottom: 4rem;
        }

        .security-title-icon {
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

        .security-title {
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

        .security-subtitle {
          font-size: 1.3rem;
          color: rgba(255, 255, 255, 0.7);
          max-width: 600px;
          margin: 0 auto;
          line-height: 1.6;
          font-weight: 400;
        }

        .security-main {
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

        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 2rem;
          margin-bottom: 4rem;
        }

        .feature-card {
          background: rgba(255, 255, 255, 0.03);
          border-radius: 20px;
          padding: 2rem;
          border: 1px solid rgba(255, 255, 255, 0.1);
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
          position: relative;
          overflow: hidden;
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
          background: linear-gradient(135deg, #00F5A0, #7877C6);
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.5rem;
          color: white;
        }

        .feature-title {
          font-size: 1.3rem;
          font-weight: 700;
          color: rgba(255, 255, 255, 0.95);
          margin-bottom: 1rem;
        }

        .feature-description {
          font-size: 0.95rem;
          color: rgba(255, 255, 255, 0.7);
          line-height: 1.6;
          margin-bottom: 1.5rem;
        }

        .feature-compliance {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .compliance-badge {
          padding: 0.25rem 0.75rem;
          background: rgba(0, 245, 160, 0.1);
          border: 1px solid rgba(0, 245, 160, 0.3);
          border-radius: 20px;
          font-size: 0.75rem;
          color: #00F5A0;
          font-weight: 500;
        }

        .practices-section {
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

        .practices-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
        }

        .practice-category {
          background: rgba(255, 255, 255, 0.03);
          border-radius: 16px;
          padding: 1.5rem;
          border: 1px solid rgba(255, 255, 255, 0.05);
        }

        .category-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1rem;
        }

        .category-icon {
          color: #00F5A0;
        }

        .category-title {
          font-size: 1.1rem;
          font-weight: 700;
          color: rgba(255, 255, 255, 0.95);
          margin: 0;
        }

        .practice-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .practice-item {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          padding: 0.75rem 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }

        .practice-item:last-child {
          border-bottom: none;
        }

        .practice-item-icon {
          color: #00F5A0;
          flex-shrink: 0;
          margin-top: 0.2rem;
        }

        .practice-text {
          font-size: 0.95rem;
          color: rgba(255, 255, 255, 0.7);
          line-height: 1.6;
        }

        .compliance-section {
          background: rgba(255, 255, 255, 0.03);
          border-radius: 20px;
          padding: 2.5rem;
          border: 1px solid rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          margin-bottom: 4rem;
        }

        .compliance-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1.5rem;
        }

        .compliance-item {
          background: rgba(255, 255, 255, 0.03);
          border-radius: 12px;
          padding: 1.5rem;
          text-align: center;
          border: 1px solid rgba(255, 255, 255, 0.05);
          transition: all 0.3s ease;
        }

        .compliance-item:hover {
          background: rgba(255, 255, 255, 0.05);
          border-color: rgba(0, 245, 160, 0.2);
          transform: translateY(-3px);
        }

        .compliance-name {
          font-size: 1.1rem;
          font-weight: 700;
          color: rgba(255, 255, 255, 0.95);
          margin-bottom: 0.5rem;
        }

        .compliance-description {
          font-size: 0.85rem;
          color: rgba(255, 255, 255, 0.6);
          line-height: 1.4;
        }

        .incident-section {
          background: rgba(255, 255, 255, 0.03);
          border-radius: 20px;
          padding: 2.5rem;
          border: 1px solid rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          margin-bottom: 4rem;
        }

        .incident-timeline {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: 1.5rem;
          position: relative;
        }

        .incident-timeline::before {
          content: '';
          position: absolute;
          top: 40px;
          left: 0;
          right: 0;
          height: 2px;
          background: linear-gradient(90deg, #00F5A0, #7877C6);
          z-index: 1;
        }

        .incident-step {
          position: relative;
          z-index: 2;
          text-align: center;
        }

        .step-number {
          width: 40px;
          height: 40px;
          background: linear-gradient(135deg, #00F5A0, #7877C6);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1rem;
          color: white;
          font-weight: 700;
          font-size: 1rem;
        }

        .step-title {
          font-size: 1rem;
          font-weight: 700;
          color: rgba(255, 255, 255, 0.95);
          margin-bottom: 0.5rem;
        }

        .step-description {
          font-size: 0.85rem;
          color: rgba(255, 255, 255, 0.7);
          line-height: 1.4;
        }

        .reporting-section {
          background: rgba(255, 255, 255, 0.03);
          border-radius: 20px;
          padding: 2.5rem;
          border: 1px solid rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          text-align: center;
          margin-bottom: 4rem;
        }

        .reporting-alert {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1.5rem;
          background: rgba(255, 107, 157, 0.1);
          border: 1px solid rgba(255, 107, 157, 0.3);
          border-radius: 12px;
          margin: 2rem auto;
          max-width: 600px;
        }

        .alert-icon {
          color: #FF6B9D;
          flex-shrink: 0;
        }

        .alert-text {
          text-align: left;
          font-size: 0.95rem;
          color: rgba(255, 255, 255, 0.8);
          line-height: 1.6;
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
          .security-title {
            font-size: 2.8rem;
          }
          
          .security-content {
            padding: 5rem 1.5rem 3rem;
          }
          
          .features-grid,
          .compliance-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 1.5rem;
          }
          
          .practices-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }
          
          .incident-timeline {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        @media (max-width: 768px) {
          .security-title {
            font-size: 2.2rem;
          }
          
          .security-subtitle {
            font-size: 1.1rem;
          }
          
          .features-grid,
          .compliance-grid {
            grid-template-columns: 1fr;
            gap: 1rem;
          }
          
          .incident-timeline {
            grid-template-columns: repeat(2, 1fr);
          }
          
          .incident-timeline::before {
            display: none;
          }
          
          .practices-section,
          .compliance-section,
          .incident-section,
          .reporting-section {
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
          .security-title {
            font-size: 1.8rem;
          }
          
          .security-content {
            padding: 4rem 1rem 2rem;
          }
          
          .incident-timeline {
            grid-template-columns: 1fr;
          }
          
          .reporting-alert {
            flex-direction: column;
            text-align: center;
            gap: 0.75rem;
          }
          
          .alert-text {
            text-align: center;
          }
        }
      `}</style>

            <div className="security-hero">
                <div className="security-content">
                    <div className="security-header">
                        <div className="security-title-icon">
                            <Shield size={40} />
                        </div>
                        <h1 className="security-title">Security & Data Protection</h1>
                        <p className="security-subtitle">
                            Your security is our top priority. We implement industry-leading measures to protect your data at all times.
                        </p>
                    </div>

                    <div className="security-main">
                        <div className="intro-section">
                            <p className="intro-text">
                                Our platform implements industry-standard measures and advanced security protocols to protect your data
                                and ensure your privacy at all times. We continuously invest in security infrastructure and follow
                                best practices to maintain the highest levels of protection.
                            </p>
                        </div>

                        <div className="features-grid">
                            {securityFeatures.map((feature, index) => (
                                <div key={index} className="feature-card">
                                    <div className="feature-icon">
                                        {feature.icon}
                                    </div>
                                    <h3 className="feature-title">{feature.title}</h3>
                                    <p className="feature-description">{feature.description}</p>
                                    <div className="feature-compliance">
                                        {feature.compliance.map((item, idx) => (
                                            <span key={idx} className="compliance-badge">{item}</span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="practices-section">
                            <h2 className="section-title">
                                <Cpu className="section-icon" size={24} />
                                Security Practices & Protocols
                            </h2>

                            <div className="practices-grid">
                                {securityPractices.map((category, index) => (
                                    <div key={index} className="practice-category">
                                        <div className="category-header">
                                            <div className="category-icon">
                                                {category.icon}
                                            </div>
                                            <h3 className="category-title">{category.category}</h3>
                                        </div>
                                        <ul className="practice-list">
                                            {category.practices.map((practice, idx) => (
                                                <li key={idx} className="practice-item">
                                                    <CheckCircle className="practice-item-icon" size={16} />
                                                    <span className="practice-text">{practice}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="compliance-section">
                            <h2 className="section-title">
                                <Globe className="section-icon" size={24} />
                                Compliance & Standards
                            </h2>
                            <p style={{ color: 'rgba(255, 255, 255, 0.7)', marginBottom: '1.5rem', lineHeight: '1.6' }}>
                                We adhere to global security standards and regulations to ensure the highest level of data protection.
                            </p>

                            <div className="compliance-grid">
                                {complianceStandards.map((standard, index) => (
                                    <div key={index} className="compliance-item">
                                        <div className="compliance-name">{standard.name}</div>
                                        <div className="compliance-description">{standard.description}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="incident-section">
                            <h2 className="section-title">
                                <AlertTriangle className="section-icon" size={24} />
                                Incident Response Framework
                            </h2>
                            <p style={{ color: 'rgba(255, 255, 255, 0.7)', marginBottom: '2rem', lineHeight: '1.6' }}>
                                Our comprehensive incident response plan ensures quick and effective handling of security incidents.
                            </p>

                            <div className="incident-timeline">
                                {incidentResponse.map((step, index) => (
                                    <div key={index} className="incident-step">
                                        <div className="step-number">{index + 1}</div>
                                        <div className="step-title">{step.step}</div>
                                        <div className="step-description">{step.description}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="reporting-section">
                            <h2 className="section-title">
                                <Eye className="section-icon" size={24} />
                                Reporting Security Concerns
                            </h2>
                            <p style={{ color: 'rgba(255, 255, 255, 0.7)', lineHeight: '1.6', marginBottom: '1rem' }}>
                                We take security vulnerabilities seriously and encourage responsible disclosure.
                            </p>

                            <div className="reporting-alert">
                                <div className="alert-icon">
                                    <AlertTriangle size={24} />
                                </div>
                                <div className="alert-text">
                                    <strong>If you discover a security vulnerability or notice any security issues,</strong> please contact
                                    our security team immediately at <strong>security@thuliyamai.com</strong>. We investigate all reports
                                    promptly and take appropriate action.
                                </div>
                            </div>
                        </div>

                        <div className="cta-section">
                            <h2 className="cta-title">Need More Information?</h2>
                            <p className="cta-description">
                                For detailed security documentation, audit reports, or additional security inquiries,
                                please contact our security team.
                            </p>
                            <div className="cta-buttons">
                                <button className="cta-btn">
                                    <FileText size={20} />
                                    Download Security Whitepaper
                                </button>
                                <button className="cta-btn-secondary">
                                    <MessageSquare size={20} />
                                    Contact Security Team
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