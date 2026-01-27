import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Briefcase, TrendingUp, Users, Target, DollarSign, Shield, Zap, BarChart3, Building, Heart, Truck, Lock } from "lucide-react";

export default function CaseStudies() {
    const caseStudies = [
        {
            id: 1,
            title: "Retail Analytics Transformation",
            client: "Global Retail Chain",
            industry: "Retail",
            challenge: "Inefficient inventory management and lack of real-time sales insights leading to stockouts and lost revenue.",
            solution: "Implemented AI-driven sales forecasting and inventory optimization system with real-time analytics dashboard.",
            results: [
                { metric: "30%", label: "Reduction in stockouts" },
                { metric: "25%", label: "Increase in sales" },
                { metric: "40%", label: "Faster inventory turnover" }
            ],
            duration: "6 months",
            completedDate: "Feb 2026",
            icon: <Building size={20} />,
            gradient: "from-green-500 to-blue-500",
        },
        {
            id: 2,
            title: "Healthcare Predictive Insights",
            client: "Regional Hospital Network",
            industry: "Healthcare",
            challenge: "Limited ability to predict patient admission rates and optimize resource allocation for emergency services.",
            solution: "Developed predictive models using historical patient data and real-time monitoring for resource optimization.",
            results: [
                { metric: "45%", label: "Reduced wait times" },
                { metric: "20%", label: "Cost savings" },
                { metric: "35%", label: "Improved patient outcomes" }
            ],
            duration: "8 months",
            completedDate: "Jan 2026",
            icon: <Heart size={20} />,
            gradient: "from-purple-500 to-pink-500",
        },
        {
            id: 3,
            title: "Finance Risk Analysis & Fraud Detection",
            client: "International Bank",
            industry: "Finance",
            challenge: "Increasing sophisticated fraud attempts and manual risk assessment processes causing delays and losses.",
            solution: "AI-powered fraud detection system with real-time transaction monitoring and automated risk scoring.",
            results: [
                { metric: "99.7%", label: "Fraud detection accuracy" },
                { metric: "60%", label: "Faster risk assessment" },
                { metric: "$4.2M", label: "Fraud prevented" }
            ],
            duration: "9 months",
            completedDate: "Dec 2025",
            icon: <DollarSign size={20} />,
            gradient: "from-orange-500 to-red-500",
        },
        {
            id: 4,
            title: "Logistics & Supply Chain Optimization",
            client: "E-commerce Logistics Provider",
            industry: "Logistics",
            challenge: "Inefficient route planning and warehouse operations leading to delayed deliveries and high operational costs.",
            solution: "AI-powered route optimization and warehouse automation system with predictive demand forecasting.",
            results: [
                { metric: "35%", label: "Reduced delivery times" },
                { metric: "28%", label: "Lower fuel costs" },
                { metric: "50%", label: "Higher customer satisfaction" }
            ],
            duration: "7 months",
            completedDate: "Nov 2025",
            icon: <Truck size={20} />,
            gradient: "from-blue-500 to-cyan-500",
        },
        {
            id: 5,
            title: "Media Content Verification System",
            client: "News Organization",
            industry: "Media",
            challenge: "Increasing spread of misinformation and deepfake content undermining journalistic credibility.",
            solution: "Comprehensive AI-powered content verification platform for real-time authenticity checking of media assets.",
            results: [
                { metric: "95%", label: "Accuracy in deepfake detection" },
                { metric: "70%", label: "Faster fact-checking" },
                { metric: "40%", label: "Reduced misinformation spread" }
            ],
            duration: "5 months",
            completedDate: "Oct 2025",
            icon: <Shield size={20} />,
            gradient: "from-indigo-500 to-purple-500",
        },
        {
            id: 6,
            title: "Manufacturing Quality Control",
            client: "Automotive Manufacturer",
            industry: "Manufacturing",
            challenge: "Manual quality inspection processes leading to inconsistent quality and high defect rates.",
            solution: "Computer vision AI system for automated quality inspection with real-time defect detection and reporting.",
            results: [
                { metric: "90%", label: "Defect detection rate" },
                { metric: "55%", label: "Faster inspection times" },
                { metric: "30%", label: "Reduced waste" }
            ],
            duration: "6 months",
            completedDate: "Sep 2025",
            icon: <Zap size={20} />,
            gradient: "from-pink-500 to-rose-500",
        },
    ];

    const industries = [
        { name: "All Industries", count: 12 },
        { name: "Retail", count: 3 },
        { name: "Healthcare", count: 2 },
        { name: "Finance", count: 2 },
        { name: "Logistics", count: 2 },
        { name: "Media", count: 2 },
        { name: "Manufacturing", count: 1 },
    ];

    const keyMetrics = [
        { value: "95%", label: "Average Client Satisfaction" },
        { value: "42%", label: "Average Efficiency Improvement" },
        { value: "28M", label: "Total Impact Value Created" },
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

        .cases-hero {
          background: 
            radial-gradient(ellipse at 20% 20%, rgba(120, 119, 198, 0.15) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 80%, rgba(255, 119, 198, 0.1) 0%, transparent 50%),
            linear-gradient(135deg, #0A0B1E 0%, #1A1B3E 50%, #0A0B1E 100%);
          position: relative;
          overflow: hidden;
          font-family: 'Inter', sans-serif;
          min-height: 100vh;
        }

        .cases-hero::before {
          content: '';
          position: absolute;
          inset: 0;
          background: 
            url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23000' fill-opacity='0.03' fill-rule='evenodd'/%3E%3C/svg%3E");
          opacity: 0.3;
          animation: shimmer 20s linear infinite;
          pointer-events: none;
        }

        .cases-content {
          max-width: 1200px;
          margin: 0 auto;
          padding: 6rem 2rem 4rem;
          position: relative;
          z-index: 2;
        }

        .cases-header {
          text-align: center;
          margin-bottom: 4rem;
        }

        .cases-title-icon {
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

        .cases-title {
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

        .cases-subtitle {
          font-size: 1.3rem;
          color: rgba(255, 255, 255, 0.7);
          max-width: 600px;
          margin: 0 auto;
          line-height: 1.6;
          font-weight: 400;
        }

        .cases-main {
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

        .metrics-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 2rem;
          margin-bottom: 3rem;
        }

        .metric-card {
          background: rgba(255, 255, 255, 0.03);
          border-radius: 20px;
          padding: 2rem;
          border: 1px solid rgba(255, 255, 255, 0.1);
          text-align: center;
          transition: all 0.3s ease;
        }

        .metric-card:hover {
          background: rgba(255, 255, 255, 0.05);
          border-color: rgba(0, 245, 160, 0.3);
          transform: translateY(-5px);
        }

        .metric-value {
          font-size: 2.5rem;
          font-weight: 800;
          background: linear-gradient(135deg, #00F5A0, #7877C6);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 0.5rem;
        }

        .metric-label {
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.6);
          line-height: 1.4;
        }

        .industries-container {
          display: flex;
          gap: 0.75rem;
          margin-bottom: 3rem;
          flex-wrap: wrap;
          justify-content: center;
        }

        .industry-btn {
          padding: 0.5rem 1.25rem;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 50px;
          color: rgba(255, 255, 255, 0.7);
          font-size: 0.9rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .industry-btn:hover {
          background: rgba(255, 255, 255, 0.05);
          color: rgba(255, 255, 255, 0.9);
          border-color: rgba(0, 245, 160, 0.3);
        }

        .industry-btn.active {
          background: linear-gradient(135deg, #00F5A0, #7877C6);
          color: white;
          border-color: transparent;
        }

        .industry-count {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
          padding: 0.1rem 0.5rem;
          font-size: 0.75rem;
          color: rgba(255, 255, 255, 0.7);
        }

        .cases-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
          gap: 2rem;
          margin-bottom: 4rem;
        }

        .case-card {
          background: rgba(255, 255, 255, 0.03);
          border-radius: 20px;
          padding: 2rem;
          border: 1px solid rgba(255, 255, 255, 0.1);
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
          display: flex;
          flex-direction: column;
          height: 100%;
        }

        .case-card:hover {
          background: rgba(255, 255, 255, 0.05);
          border-color: rgba(0, 245, 160, 0.3);
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(0, 245, 160, 0.1);
        }

        .case-header {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .case-icon {
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

        .case-title-section {
          flex-grow: 1;
        }

        .case-title {
          font-size: 1.3rem;
          font-weight: 700;
          color: rgba(255, 255, 255, 0.95);
          margin: 0 0 0.5rem 0;
          line-height: 1.4;
        }

        .case-client {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.7);
        }

        .case-content {
          margin-bottom: 1.5rem;
        }

        .case-section {
          margin-bottom: 1.5rem;
        }

        .section-title {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.95rem;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.9);
          margin-bottom: 0.5rem;
        }

        .section-content {
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.7);
          line-height: 1.6;
        }

        .results-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1rem;
          margin-top: 1rem;
        }

        .result-item {
          text-align: center;
          padding: 0.75rem;
          background: rgba(255, 255, 255, 0.03);
          border-radius: 8px;
          border: 1px solid rgba(255, 255, 255, 0.05);
        }

        .result-metric {
          font-size: 1.2rem;
          font-weight: 700;
          color: #00F5A0;
          margin-bottom: 0.25rem;
        }

        .result-label {
          font-size: 0.7rem;
          color: rgba(255, 255, 255, 0.6);
          line-height: 1.2;
        }

        .case-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: auto;
          padding-top: 1.5rem;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }

        .case-industry {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.85rem;
          color: rgba(255, 255, 255, 0.6);
        }

        .case-date {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.85rem;
          color: rgba(255, 255, 255, 0.6);
        }

        .view-details {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          color: #00F5A0;
          font-size: 0.9rem;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.3s ease;
          margin-top: 1rem;
        }

        .view-details:hover {
          color: #7877C6;
          gap: 0.75rem;
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
          .cases-title {
            font-size: 2.8rem;
          }
          
          .cases-content {
            padding: 5rem 1.5rem 3rem;
          }
          
          .cases-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 1.5rem;
          }
          
          .metrics-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        @media (max-width: 768px) {
          .cases-title {
            font-size: 2.2rem;
          }
          
          .cases-subtitle {
            font-size: 1.1rem;
          }
          
          .cases-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }
          
          .metrics-grid {
            grid-template-columns: 1fr;
            gap: 1rem;
          }
          
          .industries-container {
            justify-content: flex-start;
            overflow-x: auto;
            padding-bottom: 0.5rem;
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
          .cases-title {
            font-size: 1.8rem;
          }
          
          .cases-content {
            padding: 4rem 1rem 2rem;
          }
          
          .case-card {
            padding: 1.5rem;
          }
          
          .case-header {
            flex-direction: column;
            gap: 1rem;
          }
          
          .results-grid {
            grid-template-columns: 1fr;
            gap: 0.75rem;
          }
          
          .case-footer {
            flex-direction: column;
            gap: 1rem;
            align-items: flex-start;
          }
        }
      `}</style>

            <div className="cases-hero">
                <div className="cases-content">
                    <div className="cases-header">
                        <div className="cases-title-icon">
                            <Briefcase size={40} />
                        </div>
                        <h1 className="cases-title">Case Studies</h1>
                        <p className="cases-subtitle">
                            See how our AI solutions transform real businesses across industries with measurable impact.
                        </p>
                    </div>

                    <div className="cases-main">
                        <div className="intro-section">
                            <p className="intro-text">
                                Explore detailed case studies showcasing how our AI-powered tools and solutions have helped organizations
                                across industries optimize operations, enhance customer experiences, and drive measurable results.
                            </p>

                            <div className="metrics-grid">
                                {keyMetrics.map((metric, index) => (
                                    <div key={index} className="metric-card">
                                        <div className="metric-value">{metric.value}</div>
                                        <div className="metric-label">{metric.label}</div>
                                    </div>
                                ))}
                            </div>

                            <div className="industries-container">
                                {industries.map((industry) => (
                                    <button
                                        key={industry.name}
                                        className={`industry-btn ${industry.name === "All Industries" ? "active" : ""}`}
                                    >
                                        {industry.name}
                                        <span className="industry-count">{industry.count}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="cases-grid">
                            {caseStudies.map((study) => (
                                <article key={study.id} className="case-card">
                                    <div className="case-header">
                                        <div className="case-icon">
                                            {study.icon}
                                        </div>
                                        <div className="case-title-section">
                                            <h2 className="case-title">{study.title}</h2>
                                            <div className="case-client">
                                                <Users size={14} />
                                                {study.client}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="case-content">
                                        <div className="case-section">
                                            <div className="section-title">
                                                <Target size={14} />
                                                Challenge
                                            </div>
                                            <p className="section-content">{study.challenge}</p>
                                        </div>

                                        <div className="case-section">
                                            <div className="section-title">
                                                <Zap size={14} />
                                                Solution
                                            </div>
                                            <p className="section-content">{study.solution}</p>
                                        </div>

                                        <div className="case-section">
                                            <div className="section-title">
                                                <TrendingUp size={14} />
                                                Results
                                            </div>
                                            <div className="results-grid">
                                                {study.results.map((result, index) => (
                                                    <div key={index} className="result-item">
                                                        <div className="result-metric">{result.metric}</div>
                                                        <div className="result-label">{result.label}</div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="case-footer">
                                        <div className="case-industry">
                                            <Briefcase size={12} />
                                            {study.industry}
                                        </div>
                                        <div className="case-date">
                                            <CalendarIcon size={12} />
                                            {study.completedDate} • {study.duration}
                                        </div>
                                    </div>

                                    <a href="#" className="view-details">
                                        <FileText size={16} />
                                        View Detailed Report
                                    </a>
                                </article>
                            ))}
                        </div>

                        <div className="cta-section">
                            <h2 className="cta-title">Interested in Similar Results?</h2>
                            <p className="cta-description">
                                Contact our team for in-depth case study reports, customized solutions for your industry,
                                and a consultation on how AI can transform your business operations.
                            </p>
                            <div className="cta-buttons">
                                <button className="cta-btn">
                                    <Briefcase size={20} />
                                    Schedule Consultation
                                </button>
                                <button className="cta-btn-secondary">
                                    <DownloadIcon size={20} />
                                    Download Case Studies PDF
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

// Calendar icon component
const CalendarIcon = ({ size = 24, className = "" }) => (
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
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
);

// FileText icon component
const FileText = ({ size = 24, className = "" }) => (
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
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
    </svg>
);

// Download icon component
const DownloadIcon = ({ size = 24, className = "" }) => (
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
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
);