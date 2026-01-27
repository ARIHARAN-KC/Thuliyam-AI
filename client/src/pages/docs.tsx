import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { BookOpen, Code, FileText, Shield, Zap, Users, Search, Download, Terminal, Video, Settings, Star } from "lucide-react";

export default function Documentation() {
    const resources = [
        {
            id: 1,
            title: "API Reference",
            description: "Complete API documentation with endpoints, parameters, authentication, and example responses.",
            icon: <Code size={24} />,
            category: "Developer",
            difficulty: "Advanced",
            lastUpdated: "Jan 20, 2026",
            pages: 42,
            gradient: "from-green-500 to-blue-500",
        },
        {
            id: 2,
            title: "Getting Started Guide",
            description: "Step-by-step guide to using our AI tools effectively, from setup to first analysis.",
            icon: <Zap size={24} />,
            category: "Beginner",
            difficulty: "Easy",
            lastUpdated: "Jan 18, 2026",
            pages: 28,
            gradient: "from-purple-500 to-pink-500",
        },
        {
            id: 3,
            title: "Tutorials & Examples",
            description: "Practical tutorials to help you integrate AI features into your real-world projects.",
            icon: <Video size={24} />,
            category: "Tutorial",
            difficulty: "Intermediate",
            lastUpdated: "Jan 15, 2026",
            pages: 35,
            gradient: "from-orange-500 to-red-500",
        },
        {
            id: 4,
            title: "Best Practices",
            description: "Guidelines for maintaining security, performance, and reliability while using our APIs.",
            icon: <Shield size={24} />,
            category: "Security",
            difficulty: "Intermediate",
            lastUpdated: "Jan 12, 2026",
            pages: 31,
            gradient: "from-blue-500 to-cyan-500",
        },
        {
            id: 5,
            title: "Integration Guides",
            description: "Step-by-step integration guides for popular frameworks and platforms.",
            icon: <Settings size={24} />,
            category: "Integration",
            difficulty: "Intermediate",
            lastUpdated: "Jan 10, 2026",
            pages: 38,
            gradient: "from-indigo-500 to-purple-500",
        },
        {
            id: 6,
            title: "FAQ & Troubleshooting",
            description: "Common questions, troubleshooting steps, and solutions for frequent issues.",
            icon: <Search size={24} />,
            category: "Support",
            difficulty: "All Levels",
            lastUpdated: "Jan 8, 2026",
            pages: 47,
            gradient: "from-pink-500 to-rose-500",
        },
        {
            id: 7,
            title: "Video Tutorials",
            description: "Watch our step-by-step video guides for visual learners.",
            icon: <Video size={24} />,
            category: "Video",
            difficulty: "Beginner",
            lastUpdated: "Jan 5, 2026",
            duration: "2h 15m",
            gradient: "from-yellow-500 to-orange-500",
        },
        {
            id: 8,
            title: "Release Notes",
            description: "Detailed documentation of new features, improvements, and bug fixes in each release.",
            icon: <FileText size={24} />,
            category: "Updates",
            difficulty: "All Levels",
            lastUpdated: "Jan 3, 2026",
            pages: 52,
            gradient: "from-teal-500 to-emerald-500",
        },
    ];

    const categories = [
        { name: "All", count: 12 },
        { name: "Beginner", count: 4 },
        { name: "Developer", count: 5 },
        { name: "Tutorial", count: 3 },
        { name: "Security", count: 2 },
        { name: "Integration", count: 3 },
        { name: "Video", count: 2 },
    ];

    const popularGuides = [
        { title: "Quick Start: Your First Analysis", views: "2.4k" },
        { title: "API Authentication Explained", views: "1.8k" },
        { title: "Image Processing Best Practices", views: "1.5k" },
        { title: "Troubleshooting Common Errors", views: "1.2k" },
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

        .docs-hero {
          background: 
            radial-gradient(ellipse at 20% 20%, rgba(120, 119, 198, 0.15) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 80%, rgba(255, 119, 198, 0.1) 0%, transparent 50%),
            linear-gradient(135deg, #0A0B1E 0%, #1A1B3E 50%, #0A0B1E 100%);
          position: relative;
          overflow: hidden;
          font-family: 'Inter', sans-serif;
          min-height: 100vh;
        }

        .docs-hero::before {
          content: '';
          position: absolute;
          inset: 0;
          background: 
            url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23000' fill-opacity='0.03' fill-rule='evenodd'/%3E%3C/svg%3E");
          opacity: 0.3;
          animation: shimmer 20s linear infinite;
          pointer-events: none;
        }

        .docs-content {
          max-width: 1200px;
          margin: 0 auto;
          padding: 6rem 2rem 4rem;
          position: relative;
          z-index: 2;
        }

        .docs-header {
          text-align: center;
          margin-bottom: 4rem;
        }

        .docs-title-icon {
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

        .docs-title {
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

        .docs-subtitle {
          font-size: 1.3rem;
          color: rgba(255, 255, 255, 0.7);
          max-width: 600px;
          margin: 0 auto;
          line-height: 1.6;
          font-weight: 400;
        }

        .docs-main {
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

        .categories-container {
          display: flex;
          gap: 0.75rem;
          margin-bottom: 3rem;
          flex-wrap: wrap;
          justify-content: center;
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
          display: flex;
          align-items: center;
          gap: 0.5rem;
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

        .category-count {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
          padding: 0.1rem 0.5rem;
          font-size: 0.75rem;
          color: rgba(255, 255, 255, 0.7);
        }

        .docs-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
          gap: 2rem;
          margin-bottom: 4rem;
        }

        .doc-card {
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

        .doc-card:hover {
          background: rgba(255, 255, 255, 0.05);
          border-color: rgba(0, 245, 160, 0.3);
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(0, 245, 160, 0.1);
        }

        .card-icon {
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

        .card-title {
          font-size: 1.4rem;
          font-weight: 700;
          color: rgba(255, 255, 255, 0.95);
          margin-bottom: 1rem;
          line-height: 1.4;
        }

        .card-description {
          font-size: 0.95rem;
          color: rgba(255, 255, 255, 0.7);
          line-height: 1.6;
          margin-bottom: 1.5rem;
          flex-grow: 1;
        }

        .card-meta {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: auto;
          padding-top: 1.5rem;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }

        .meta-info {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .meta-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.8rem;
          color: rgba(255, 255, 255, 0.5);
        }

        .difficulty-badge {
          padding: 0.25rem 0.75rem;
          border-radius: 20px;
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .difficulty-easy {
          background: rgba(0, 245, 160, 0.1);
          color: #00F5A0;
          border: 1px solid rgba(0, 245, 160, 0.3);
        }

        .difficulty-intermediate {
          background: rgba(120, 119, 198, 0.1);
          color: #7877C6;
          border: 1px solid rgba(120, 119, 198, 0.3);
        }

        .difficulty-advanced {
          background: rgba(255, 119, 198, 0.1);
          color: #FF77C6;
          border: 1px solid rgba(255, 119, 198, 0.3);
        }

        .popular-guides {
          background: rgba(255, 255, 255, 0.03);
          border-radius: 20px;
          padding: 2rem;
          border: 1px solid rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          margin-bottom: 3rem;
        }

        .popular-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: rgba(255, 255, 255, 0.95);
          margin-bottom: 1.5rem;
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .popular-icon {
          color: #00F5A0;
        }

        .popular-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .popular-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1rem;
          background: rgba(255, 255, 255, 0.03);
          border-radius: 12px;
          border: 1px solid rgba(255, 255, 255, 0.05);
          transition: all 0.3s ease;
        }

        .popular-item:hover {
          background: rgba(255, 255, 255, 0.05);
          border-color: rgba(0, 245, 160, 0.2);
          transform: translateX(5px);
        }

        .popular-item-title {
          font-size: 0.95rem;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.9);
          flex-grow: 1;
        }

        .popular-item-views {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.8rem;
          color: rgba(255, 255, 255, 0.5);
          white-space: nowrap;
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
          .docs-title {
            font-size: 2.8rem;
          }
          
          .docs-content {
            padding: 5rem 1.5rem 3rem;
          }
          
          .docs-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 1.5rem;
          }
        }

        @media (max-width: 768px) {
          .docs-title {
            font-size: 2.2rem;
          }
          
          .docs-subtitle {
            font-size: 1.1rem;
          }
          
          .docs-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }
          
          .categories-container {
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
          .docs-title {
            font-size: 1.8rem;
          }
          
          .docs-content {
            padding: 4rem 1rem 2rem;
          }
          
          .doc-card {
            padding: 1.5rem;
          }
          
          .card-meta {
            flex-direction: column;
            gap: 1rem;
            align-items: flex-start;
          }
          
          .popular-item {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.5rem;
          }
        }
      `}</style>

            <div className="docs-hero">
                <div className="docs-content">
                    <div className="docs-header">
                        <div className="docs-title-icon">
                            <BookOpen size={40} />
                        </div>
                        <h1 className="docs-title">Documentation</h1>
                        <p className="docs-subtitle">
                            All the resources you need to get started, integrate, and master our AI-powered platform.
                        </p>
                    </div>

                    <div className="docs-main">
                        <div className="intro-section">
                            <p className="intro-text">
                                Explore our detailed guides, tutorials, and reference materials designed for both developers and users.
                                Whether you're integrating our APIs or exploring AI features, you'll find everything you need to get started.
                            </p>

                            <div className="categories-container">
                                {categories.map((category) => (
                                    <button
                                        key={category.name}
                                        className={`category-btn ${category.name === "All" ? "active" : ""}`}
                                    >
                                        {category.name}
                                        <span className="category-count">{category.count}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="popular-guides">
                            <h2 className="popular-title">
                                <Star className="popular-icon" size={24} />
                                Most Popular Guides
                            </h2>
                            <div className="popular-list">
                                {popularGuides.map((guide, index) => (
                                    <div key={index} className="popular-item">
                                        <div className="popular-item-title">{guide.title}</div>
                                        <div className="popular-item-views">
                                            <EyeIcon size={14} />
                                            {guide.views} views
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="docs-grid">
                            {resources.map((resource) => (
                                <article key={resource.id} className="doc-card">
                                    <div className="card-icon">
                                        {resource.icon}
                                    </div>
                                    <h2 className="card-title">{resource.title}</h2>
                                    <p className="card-description">{resource.description}</p>
                                    <div className="card-meta">
                                        <div className="meta-info">
                                            <div className="meta-item">
                                                <FileText size={14} />
                                                {resource.pages ? `${resource.pages} pages` : resource.duration}
                                            </div>
                                            <div className="meta-item">
                                                <CalendarIcon size={14} />
                                                Updated {resource.lastUpdated}
                                            </div>
                                        </div>
                                        <div className={`difficulty-badge ${resource.difficulty === 'Easy' ? 'difficulty-easy' : resource.difficulty === 'Intermediate' ? 'difficulty-intermediate' : 'difficulty-advanced'}`}>
                                            {resource.difficulty}
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>

                        <div className="cta-section">
                            <h2 className="cta-title">Need Additional Help?</h2>
                            <p className="cta-description">
                                Can't find what you're looking for? Reach out to our support team or explore our
                                community forums for guidance from other developers and users.
                            </p>
                            <div className="cta-buttons">
                                <button className="cta-btn">
                                    <Users size={20} />
                                    Join Community
                                </button>
                                <button className="cta-btn-secondary">
                                    <Download size={20} />
                                    Download PDF Guides
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

// Eye icon component
const EyeIcon = ({ size = 24, className = "" }) => (
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
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
    </svg>
);