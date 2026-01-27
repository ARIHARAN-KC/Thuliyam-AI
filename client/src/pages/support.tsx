import { useState } from "react";
import { HelpCircle, MessageSquare, Search, FileText, Video, BookOpen, Phone, Mail, Zap, Shield, Users, Award, Download, ChevronDown, Clock, CheckCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function SupportCenter() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

  const faqs = [
    {
      id: 1,
      question: "How do I access and use the API?",
      answer: "You can access our API by creating an account and generating an API key from your dashboard. Navigate to Settings → API Keys to generate your unique key. Use this key in the Authorization header of your requests: `Authorization: Bearer YOUR_API_KEY`. Full documentation with examples is available in our API Reference section.",
      category: "API",
      icon: <Zap size={18} />
    },
    {
      id: 2,
      question: "What are the available pricing plans?",
      answer: "We offer three pricing tiers: Free, Pro, and Enterprise. The Free plan includes 100 API calls per month. Pro plan starts at $29/month with 5,000 API calls. Enterprise plan offers custom solutions with volume discounts. Visit our Pricing page for detailed feature comparisons and upgrade options.",
      category: "Billing",
      icon: <Award size={18} />
    },
    {
      id: 3,
      question: "How do I report an issue or bug?",
      answer: "You can report issues directly through our support portal, or email support@thuliyamai.com. For faster resolution, please include: 1) Screenshots of the error, 2) Exact error messages, 3) Steps to reproduce the issue, and 4) Your browser/OS version. Our team typically responds within 24 hours.",
      category: "Technical",
      icon: <Shield size={18} />
    },
    {
      id: 4,
      question: "Where can I find integration guides and tutorials?",
      answer: "Check our Documentation section for comprehensive guides, or visit our Video Tutorials library for step-by-step visual guides on integration and usage. We provide detailed examples for Python, JavaScript, and other popular programming languages. Start with our 'Getting Started' guide for a smooth onboarding experience.",
      category: "Integration",
      icon: <BookOpen size={18} />
    },
    {
      id: 5,
      question: "Is my data secure and private?",
      answer: "Yes, we use end-to-end encryption and never store sensitive data. All communications are secured with TLS 1.3. We comply with GDPR, CCPA, and other global data protection regulations. Your data is processed in memory and never persisted to disk. For more details, see our Security page.",
      category: "Security",
      icon: <Shield size={18} />
    },
    {
      id: 6,
      question: "How long does it take to get API responses?",
      answer: "Average response time is under 3 seconds for most endpoints. For batch processing, results are typically available within 30-60 seconds depending on volume. We provide real-time status updates for longer-running jobs. Check our Status page for current system performance metrics.",
      category: "Performance",
      icon: <Zap size={18} />
    }
  ];

  const supportChannels = [
    {
      title: "Email Support",
      description: "Get detailed assistance via email with our support team",
      responseTime: "Within 24 hours",
      contact: "support@thuliyamai.com",
      icon: <Mail size={24} />,
      gradient: "from-green-500 to-blue-500"
    },
    {
      title: "Live Chat",
      description: "Instant chat support during business hours",
      responseTime: "Immediate",
      contact: "Available in dashboard",
      icon: <MessageSquare size={24} />,
      gradient: "from-purple-500 to-pink-500"
    },
    {
      title: "Phone Support",
      description: "Speak directly with our technical support team",
      responseTime: "Within 30 minutes",
      contact: "+1 (555) 123-4567",
      icon: <Phone size={24} />,
      gradient: "from-orange-500 to-red-500"
    }
  ];

  const helpResources = [
    {
      title: "Documentation",
      description: "Complete guides and API references",
      icon: <FileText size={20} />,
      link: "/documentation"
    },
    {
      title: "Video Tutorials",
      description: "Step-by-step visual guides",
      icon: <Video size={20} />,
      link: "/tutorials"
    },
    {
      title: "Community Forum",
      description: "Get help from other users",
      icon: <Users size={20} />,
      link: "/community"
    },
    {
      title: "FAQ Library",
      description: "Browse all frequently asked questions",
      icon: <HelpCircle size={20} />,
      link: "/faqs"
    }
  ];

  const categories = ["All", "API", "Billing", "Technical", "Integration", "Security", "Performance"];

  const toggleFAQ = (id: number) => {
    setExpandedFAQ(expandedFAQ === id ? null : id);
  };

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
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .support-hero {
          background: 
            radial-gradient(ellipse at 20% 20%, rgba(120, 119, 198, 0.15) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 80%, rgba(255, 119, 198, 0.1) 0%, transparent 50%),
            linear-gradient(135deg, #0A0B1E 0%, #1A1B3E 50%, #0A0B1E 100%);
          position: relative;
          overflow: hidden;
          font-family: 'Inter', sans-serif;
          min-height: 100vh;
        }

        .support-hero::before {
          content: '';
          position: absolute;
          inset: 0;
          background: 
            url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23000' fill-opacity='0.03' fill-rule='evenodd'/%3E%3C/svg%3E");
          opacity: 0.3;
          animation: shimmer 20s linear infinite;
          pointer-events: none;
        }

        .support-content {
          max-width: 1200px;
          margin: 0 auto;
          padding: 6rem 2rem 4rem;
          position: relative;
          z-index: 2;
        }

        .support-header {
          text-align: center;
          margin-bottom: 4rem;
        }

        .support-title-icon {
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

        .support-title {
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

        .support-subtitle {
          font-size: 1.3rem;
          color: rgba(255, 255, 255, 0.7);
          max-width: 600px;
          margin: 0 auto;
          line-height: 1.6;
          font-weight: 400;
        }

        .support-main {
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem 0;
        }

        .search-section {
          background: rgba(255, 255, 255, 0.03);
          border-radius: 20px;
          padding: 2.5rem;
          border: 1px solid rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          margin-bottom: 3rem;
          animation: fadeIn 0.6s ease;
        }

        .section-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: rgba(255, 255, 255, 0.95);
          margin-bottom: 1rem;
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .section-icon {
          color: #00F5A0;
        }

        .search-input-container {
          position: relative;
          margin-bottom: 1.5rem;
        }

        .search-input {
          width: 100%;
          padding: 1rem 1.5rem 1rem 3rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          color: rgba(255, 255, 255, 0.9);
          font-size: 1rem;
          font-family: 'Inter', sans-serif;
          transition: all 0.3s ease;
        }

        .search-input:focus {
          outline: none;
          border-color: #00F5A0;
          box-shadow: 0 0 0 2px rgba(0, 245, 160, 0.2);
        }

        .search-input::placeholder {
          color: rgba(255, 255, 255, 0.4);
        }

        .search-input-icon {
          position: absolute;
          left: 1rem;
          top: 50%;
          transform: translateY(-50%);
          color: rgba(255, 255, 255, 0.5);
        }

        .quick-links {
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem;
        }

        .quick-link {
          padding: 0.5rem 1rem;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 20px;
          color: rgba(255, 255, 255, 0.7);
          font-size: 0.9rem;
          text-decoration: none;
          transition: all 0.3s ease;
        }

        .quick-link:hover {
          background: rgba(255, 255, 255, 0.05);
          color: #00F5A0;
          border-color: rgba(0, 245, 160, 0.3);
        }

        .support-channels {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
          margin-bottom: 4rem;
          animation: fadeIn 0.6s ease 0.1s forwards;
          opacity: 0;
        }

        .channel-card {
          background: rgba(255, 255, 255, 0.03);
          border-radius: 20px;
          padding: 2rem;
          border: 1px solid rgba(255, 255, 255, 0.1);
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
          text-align: center;
        }

        .channel-card:hover {
          background: rgba(255, 255, 255, 0.05);
          border-color: rgba(0, 245, 160, 0.3);
          transform: translateY(-5px);
          box-shadow: 0 20px 40px rgba(0, 245, 160, 0.1);
        }

        .channel-icon {
          width: 60px;
          height: 60px;
          background: linear-gradient(135deg, #00F5A0, #7877C6);
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1.5rem;
          color: white;
        }

        .channel-title {
          font-size: 1.3rem;
          font-weight: 700;
          color: rgba(255, 255, 255, 0.95);
          margin-bottom: 0.75rem;
        }

        .channel-description {
          font-size: 0.95rem;
          color: rgba(255, 255, 255, 0.7);
          margin-bottom: 1rem;
          line-height: 1.6;
        }

        .channel-contact {
          font-size: 0.9rem;
          color: #00F5A0;
          font-weight: 600;
          margin-bottom: 1rem;
          font-family: 'Monaco', 'Menlo', 'Consolas', monospace;
        }

        .response-time {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.4rem 0.8rem;
          background: rgba(0, 245, 160, 0.1);
          border-radius: 20px;
          font-size: 0.85rem;
          color: #00F5A0;
          font-weight: 500;
        }

        .faq-section {
          background: rgba(255, 255, 255, 0.03);
          border-radius: 20px;
          padding: 2.5rem;
          border: 1px solid rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          margin-bottom: 4rem;
          animation: fadeIn 0.6s ease 0.2s forwards;
          opacity: 0;
        }

        .categories-container {
          display: flex;
          gap: 0.75rem;
          margin-bottom: 2rem;
          flex-wrap: wrap;
        }

        .category-btn {
          padding: 0.5rem 1.25rem;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 50px;
          color: rgba(255, 255, 255, 0.7);
          font-size: 0.9rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .category-btn:hover {
          background: rgba(255, 255, 255, 0.05);
          color: rgba(255, 255, 255, 0.9);
          border-color: rgba(0, 245, 160, 0.3);
        }

        .category-btn.active {
          background: linear-gradient(135deg, #00F5A0, #7877C6);
          color: white;
          border-color: transparent;
        }

        .faq-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .faq-item {
          background: rgba(255, 255, 255, 0.03);
          border-radius: 12px;
          border: 1px solid rgba(255, 255, 255, 0.05);
          overflow: hidden;
          transition: all 0.3s ease;
        }

        .faq-item:hover {
          background: rgba(255, 255, 255, 0.05);
          border-color: rgba(0, 245, 160, 0.2);
        }

        .faq-question {
          padding: 1.5rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
        }

        .faq-question-content {
          display: flex;
          align-items: center;
          gap: 1rem;
          flex-grow: 1;
        }

        .faq-category {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.25rem 0.75rem;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 20px;
          font-size: 0.8rem;
          color: rgba(255, 255, 255, 0.6);
          flex-shrink: 0;
        }

        .faq-question-text {
          font-size: 1rem;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.9);
          flex-grow: 1;
          text-align: left;
        }

        .faq-toggle {
          color: rgba(255, 255, 255, 0.5);
          transition: transform 0.3s ease;
          flex-shrink: 0;
        }

        .faq-toggle.open {
          transform: rotate(180deg);
        }

        .faq-answer {
          padding: 0 1.5rem;
          max-height: 0;
          overflow: hidden;
          transition: all 0.3s ease;
        }

        .faq-answer.open {
          padding: 0 1.5rem 1.5rem 1.5rem;
          max-height: 1000px;
        }

        .faq-answer-content {
          font-size: 0.95rem;
          color: rgba(255, 255, 255, 0.7);
          line-height: 1.6;
          padding-top: 1rem;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
          animation: fadeIn 0.3s ease;
        }

        .help-resources {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1.5rem;
          margin-bottom: 4rem;
          animation: fadeIn 0.6s ease 0.3s forwards;
          opacity: 0;
        }

        .resource-card {
          background: rgba(255, 255, 255, 0.03);
          border-radius: 16px;
          padding: 1.5rem;
          border: 1px solid rgba(255, 255, 255, 0.1);
          transition: all 0.3s ease;
          text-decoration: none;
          color: inherit;
          display: block;
        }

        .resource-card:hover {
          background: rgba(255, 255, 255, 0.05);
          border-color: rgba(0, 245, 160, 0.3);
          transform: translateY(-3px);
        }

        .resource-icon {
          width: 50px;
          height: 50px;
          background: linear-gradient(135deg, #00F5A0, #7877C6);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1rem;
          color: white;
        }

        .resource-title {
          font-size: 1.1rem;
          font-weight: 700;
          color: rgba(255, 255, 255, 0.95);
          margin-bottom: 0.5rem;
        }

        .resource-description {
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.6);
          line-height: 1.5;
        }

        .contact-section {
          text-align: center;
          padding: 3rem;
          background: rgba(255, 255, 255, 0.03);
          border-radius: 20px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          margin-top: 4rem;
          animation: fadeIn 0.6s ease 0.4s forwards;
          opacity: 0;
        }

        .contact-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: rgba(255, 255, 255, 0.9);
          margin-bottom: 1rem;
        }

        .contact-description {
          font-size: 1rem;
          color: rgba(255, 255, 255, 0.7);
          margin-bottom: 2rem;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
          line-height: 1.6;
        }

        .contact-btn {
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

        .contact-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(0, 245, 160, 0.3);
        }

        @media (max-width: 1024px) {
          .support-title {
            font-size: 2.8rem;
          }
          
          .support-content {
            padding: 5rem 1.5rem 3rem;
          }
          
          .support-channels,
          .help-resources {
            grid-template-columns: repeat(2, 1fr);
            gap: 1.5rem;
          }
        }

        @media (max-width: 768px) {
          .support-title {
            font-size: 2.2rem;
          }
          
          .support-subtitle {
            font-size: 1.1rem;
          }
          
          .support-channels,
          .help-resources {
            grid-template-columns: 1fr;
            gap: 1rem;
          }
          
          .faq-question {
            flex-direction: column;
            align-items: flex-start;
            gap: 1rem;
          }
          
          .faq-question-content {
            width: 100%;
          }
          
          .contact-section {
            padding: 2rem 1.5rem;
          }
          
          .categories-container {
            overflow-x: auto;
            padding-bottom: 0.5rem;
          }
          
          .category-btn {
            white-space: nowrap;
          }
        }

        @media (max-width: 480px) {
          .support-title {
            font-size: 1.8rem;
          }
          
          .support-content {
            padding: 4rem 1rem 2rem;
          }
          
          .search-section {
            padding: 1.5rem;
          }
          
          .quick-links {
            justify-content: center;
          }
        }
      `}</style>

      <div className="support-hero">
        <div className="support-content">
          <div className="support-header">
            <div className="support-title-icon">
              <HelpCircle size={40} />
            </div>
            <h1 className="support-title">Support Center</h1>
            <p className="support-subtitle">
              Get help and support for our services. Find answers, guides, and connect with our support team.
            </p>
          </div>

          <div className="support-main">
            <div className="search-section">
              <h2 className="section-title">
                <Search className="section-icon" size={24} />
                How can we help you today?
              </h2>
              <div className="search-input-container">
                <input
                  type="text"
                  placeholder="Search for answers, guides, or topics..."
                  className="search-input"
                />
              </div>
              <div className="quick-links">
                <a href="#" className="quick-link">API Authentication</a>
                <a href="#" className="quick-link">Billing Questions</a>
                <a href="#" className="quick-link">Technical Issues</a>
                <a href="#" className="quick-link">Integration Help</a>
                <a href="#" className="quick-link">Account Settings</a>
                <a href="#" className="quick-link">Troubleshooting</a>
              </div>
            </div>

            <div className="support-channels">
              {supportChannels.map((channel, index) => (
                <div key={index} className="channel-card">
                  <div className="channel-icon">
                    {channel.icon}
                  </div>
                  <h3 className="channel-title">{channel.title}</h3>
                  <p className="channel-description">{channel.description}</p>
                  <div className="channel-contact">{channel.contact}</div>
                  <div className="response-time">
                    <Clock size={14} />
                    {channel.responseTime}
                  </div>
                </div>
              ))}
            </div>

            <div className="faq-section">
              <h2 className="section-title">
                <HelpCircle className="section-icon" size={24} />
                Frequently Asked Questions
              </h2>
              
              <div className="categories-container">
                {categories.map((category) => (
                  <button
                    key={category}
                    className={`category-btn ${activeCategory === category ? "active" : ""}`}
                    onClick={() => setActiveCategory(category)}
                  >
                    {category}
                  </button>
                ))}
              </div>

              <div className="faq-list">
                {faqs
                  .filter(faq => activeCategory === "All" || faq.category === activeCategory)
                  .map((faq) => (
                    <div key={faq.id} className="faq-item">
                      <div 
                        className="faq-question"
                        onClick={() => toggleFAQ(faq.id)}
                      >
                        <div className="faq-question-content">
                          <span className="faq-category">
                            {faq.icon}
                            {faq.category}
                          </span>
                          <div className="faq-question-text">{faq.question}</div>
                        </div>
                        <ChevronDown 
                          className={`faq-toggle ${expandedFAQ === faq.id ? "open" : ""}`} 
                          size={20} 
                        />
                      </div>
                      <div className={`faq-answer ${expandedFAQ === faq.id ? "open" : ""}`}>
                        <div className="faq-answer-content">
                          {faq.answer}
                        </div>
                      </div>
                    </div>
                  ))
                }
              </div>
            </div>

            <div className="help-resources">
              {helpResources.map((resource, index) => (
                <a key={index} href={resource.link} className="resource-card">
                  <div className="resource-icon">
                    {resource.icon}
                  </div>
                  <h3 className="resource-title">{resource.title}</h3>
                  <p className="resource-description">{resource.description}</p>
                </a>
              ))}
            </div>

            <div className="contact-section">
              <h2 className="contact-title">Still Need Help?</h2>
              <p className="contact-description">
                If you can't find what you're looking for, our support team is ready to help. 
                Contact us for personalized assistance with any questions or issues.
              </p>
              <button className="contact-btn">
                <MessageSquare size={20} />
                Contact Support Team
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
}