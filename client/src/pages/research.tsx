import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { FileText, Download, Calendar, User, BookOpen, Award, BarChart3, TrendingUp, Brain, Shield, Cpu, Zap } from "lucide-react";

export default function ResearchPapers() {
  const researchPapers = [
    {
      id: 1,
      title: "Deep Learning for Audio Analysis and Authentication",
      authors: ["Dr. Sarah Chen", "Prof. Alex Rodriguez", "Dr. Michael Zhang"],
      abstract: "Research on advanced neural network architectures for audio processing, analysis, and authenticity verification using transformer-based models.",
      journal: "Journal of AI Research",
      publishedDate: "Jan 2026",
      citations: 42,
      pages: 28,
      tags: ["Audio Analysis", "Deep Learning", "Transformers"],
      icon: <Brain size={20} />,
      gradient: "from-green-500 to-blue-500",
    },
    {
      id: 2,
      title: "AI-Powered Video Understanding and Content Verification",
      authors: ["Dr. James Wilson", "Prof. Lisa Park", "Dr. Robert Kim"],
      abstract: "Innovations in video content analysis using machine learning techniques for real-time verification and deepfake detection.",
      journal: "IEEE Transactions on Multimedia",
      publishedDate: "Dec 2025",
      citations: 38,
      pages: 32,
      tags: ["Computer Vision", "Video Analysis", "Deepfake Detection"],
      icon: <Cpu size={20} />,
      gradient: "from-purple-500 to-pink-500",
    },
    {
      id: 3,
      title: "Advancements in Natural Language Processing for Text Authentication",
      authors: ["Dr. Emma Thompson", "Prof. David Lee", "Dr. Sophia Martinez"],
      abstract: "Research focused on modern NLP models for text analysis, authorship attribution, and AI-generated text detection.",
      journal: "Computational Linguistics",
      publishedDate: "Nov 2025",
      citations: 56,
      pages: 35,
      tags: ["NLP", "Text Analysis", "AI Detection"],
      icon: <FileText size={20} />,
      gradient: "from-orange-500 to-red-500",
    },
    {
      id: 4,
      title: "Ethical AI Frameworks and Fairness in Machine Learning",
      authors: ["Dr. Rachel Green", "Prof. Kevin Patel", "Dr. Olivia Brown"],
      abstract: "Comprehensive studies on ethical AI, algorithmic fairness, and responsible machine learning practices for content verification.",
      journal: "AI Ethics Journal",
      publishedDate: "Oct 2025",
      citations: 29,
      pages: 24,
      tags: ["AI Ethics", "Fairness", "Responsible AI"],
      icon: <Shield size={20} />,
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      id: 5,
      title: "Multimodal AI Systems for Cross-Media Authentication",
      authors: ["Dr. Benjamin Carter", "Prof. Maria Garcia", "Dr. Thomas White"],
      abstract: "Development of integrated AI systems capable of analyzing audio, video, and text simultaneously for authenticity verification.",
      journal: "Nature AI",
      publishedDate: "Sep 2025",
      citations: 67,
      pages: 41,
      tags: ["Multimodal AI", "Cross-Media", "Integration"],
      icon: <Zap size={20} />,
      gradient: "from-indigo-500 to-purple-500",
    },
    {
      id: 6,
      title: "Real-time Neural Networks for Content Moderation",
      authors: ["Dr. Jessica Wong", "Prof. Daniel Clark", "Dr. Amanda Scott"],
      abstract: "Optimized neural network architectures for real-time content analysis and moderation with minimal latency.",
      journal: "Neural Processing Letters",
      publishedDate: "Aug 2025",
      citations: 45,
      pages: 30,
      tags: ["Real-time", "Neural Networks", "Optimization"],
      icon: <TrendingUp size={20} />,
      gradient: "from-pink-500 to-rose-500",
    },
  ];

  const categories = [
    { name: "All Papers", count: 18 },
    { name: "Audio Analysis", count: 4 },
    { name: "Computer Vision", count: 5 },
    { name: "Natural Language", count: 4 },
    { name: "AI Ethics", count: 2 },
    { name: "Multimodal Systems", count: 3 },
  ];

  const featuredPapers = [
    { title: "Most Cited: Multimodal AI Systems", citations: 89 },
    { title: "Most Viewed: Audio Analysis Techniques", views: "12.4k" },
    { title: "Latest: Transformer Architectures", date: "Feb 2026" },
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

        .research-hero {
          background: 
            radial-gradient(ellipse at 20% 20%, rgba(120, 119, 198, 0.15) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 80%, rgba(255, 119, 198, 0.1) 0%, transparent 50%),
            linear-gradient(135deg, #0A0B1E 0%, #1A1B3E 50%, #0A0B1E 100%);
          position: relative;
          overflow: hidden;
          font-family: 'Inter', sans-serif;
          min-height: 100vh;
        }

        .research-hero::before {
          content: '';
          position: absolute;
          inset: 0;
          background: 
            url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23000' fill-opacity='0.03' fill-rule='evenodd'/%3E%3C/svg%3E");
          opacity: 0.3;
          animation: shimmer 20s linear infinite;
          pointer-events: none;
        }

        .research-content {
          max-width: 1200px;
          margin: 0 auto;
          padding: 6rem 2rem 4rem;
          position: relative;
          z-index: 2;
        }

        .research-header {
          text-align: center;
          margin-bottom: 4rem;
        }

        .research-title-icon {
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

        .research-title {
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

        .research-subtitle {
          font-size: 1.3rem;
          color: rgba(255, 255, 255, 0.7);
          max-width: 600px;
          margin: 0 auto;
          line-height: 1.6;
          font-weight: 400;
        }

        .research-main {
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

        .featured-papers {
          background: rgba(255, 255, 255, 0.03);
          border-radius: 20px;
          padding: 2rem;
          border: 1px solid rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          margin-bottom: 3rem;
        }

        .featured-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: rgba(255, 255, 255, 0.95);
          margin-bottom: 1.5rem;
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .featured-icon {
          color: #00F5A0;
        }

        .featured-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 1.5rem;
        }

        .featured-item {
          padding: 1.5rem;
          background: rgba(255, 255, 255, 0.03);
          border-radius: 12px;
          border: 1px solid rgba(255, 255, 255, 0.05);
          transition: all 0.3s ease;
        }

        .featured-item:hover {
          background: rgba(255, 255, 255, 0.05);
          border-color: rgba(0, 245, 160, 0.2);
          transform: translateY(-3px);
        }

        .featured-item-title {
          font-size: 0.95rem;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.9);
          margin-bottom: 0.75rem;
        }

        .featured-stats {
          display: flex;
          align-items: center;
          gap: 1rem;
          font-size: 0.85rem;
          color: rgba(255, 255, 255, 0.6);
        }

        .research-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
          gap: 2rem;
          margin-bottom: 4rem;
        }

        .paper-card {
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

        .paper-card:hover {
          background: rgba(255, 255, 255, 0.05);
          border-color: rgba(0, 245, 160, 0.3);
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(0, 245, 160, 0.1);
        }

        .paper-header {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .paper-icon {
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

        .paper-title {
          font-size: 1.3rem;
          font-weight: 700;
          color: rgba(255, 255, 255, 0.95);
          margin: 0 0 0.5rem 0;
          line-height: 1.4;
          flex-grow: 1;
        }

        .paper-meta {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          margin-bottom: 1.5rem;
        }

        .authors-list {
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.7);
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          align-items: center;
        }

        .journal-info {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.85rem;
          color: rgba(255, 255, 255, 0.6);
        }

        .paper-abstract {
          font-size: 0.95rem;
          color: rgba(255, 255, 255, 0.7);
          line-height: 1.6;
          margin-bottom: 1.5rem;
          flex-grow: 1;
        }

        .paper-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: auto;
          padding-top: 1.5rem;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }

        .paper-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .paper-tag {
          padding: 0.25rem 0.75rem;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 20px;
          font-size: 0.75rem;
          color: rgba(255, 255, 255, 0.6);
        }

        .paper-stats {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .paper-stat {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.85rem;
          color: rgba(255, 255, 255, 0.6);
        }

        .download-btn {
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

        .download-btn:hover {
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
          .research-title {
            font-size: 2.8rem;
          }
          
          .research-content {
            padding: 5rem 1.5rem 3rem;
          }
          
          .research-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 1.5rem;
          }
          
          .featured-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 768px) {
          .research-title {
            font-size: 2.2rem;
          }
          
          .research-subtitle {
            font-size: 1.1rem;
          }
          
          .research-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }
          
          .featured-grid {
            grid-template-columns: 1fr;
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
          .research-title {
            font-size: 1.8rem;
          }
          
          .research-content {
            padding: 4rem 1rem 2rem;
          }
          
          .paper-card {
            padding: 1.5rem;
          }
          
          .paper-header {
            flex-direction: column;
            gap: 1rem;
          }
          
          .paper-footer {
            flex-direction: column;
            gap: 1rem;
            align-items: flex-start;
          }
        }
      `}</style>

      <div className="research-hero">
        <div className="research-content">
          <div className="research-header">
            <div className="research-title-icon">
              <BookOpen size={40} />
            </div>
            <h1 className="research-title">Research Papers</h1>
            <p className="research-subtitle">
              Explore our scientific contributions and innovations in AI, machine learning, and deep learning technologies.
            </p>
          </div>

          <div className="research-main">
            <div className="intro-section">
              <p className="intro-text">
                Access our collection of research papers, case studies, and publications focusing on AI, machine learning,
                deep learning, and related technologies. Stay informed about our latest innovations and scientific contributions.
              </p>

              <div className="categories-container">
                {categories.map((category) => (
                  <button
                    key={category.name}
                    className={`category-btn ${category.name === "All Papers" ? "active" : ""}`}
                  >
                    {category.name}
                    <span className="category-count">{category.count}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="featured-papers">
              <h2 className="featured-title">
                <Award className="featured-icon" size={24} />
                Featured Research
              </h2>
              <div className="featured-grid">
                {featuredPapers.map((paper, index) => (
                  <div key={index} className="featured-item">
                    <div className="featured-item-title">{paper.title}</div>
                    <div className="featured-stats">
                      {paper.citations ? (
                        <>
                          <BarChart3 size={14} />
                          {paper.citations} citations
                        </>
                      ) : paper.views ? (
                        <>
                          <EyeIcon size={14} />
                          {paper.views} views
                        </>
                      ) : (
                        <>
                          <Calendar size={14} />
                          {paper.date}
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="research-grid">
              {researchPapers.map((paper) => (
                <article key={paper.id} className="paper-card">
                  <div className="paper-header">
                    <div className="paper-icon">
                      {paper.icon}
                    </div>
                    <h2 className="paper-title">{paper.title}</h2>
                  </div>

                  <div className="paper-meta">
                    <div className="authors-list">
                      <User size={14} />
                      {paper.authors.join(", ")}
                    </div>
                    <div className="journal-info">
                      <FileText size={14} />
                      {paper.journal} • {paper.publishedDate}
                    </div>
                  </div>

                  <p className="paper-abstract">{paper.abstract}</p>

                  <div className="paper-footer">
                    <div className="paper-tags">
                      {paper.tags.map((tag, index) => (
                        <span key={index} className="paper-tag">{tag}</span>
                      ))}
                    </div>
                    <div className="paper-stats">
                      <div className="paper-stat">
                        <BarChart3 size={14} />
                        {paper.citations}
                      </div>
                      <div className="paper-stat">
                        <FileText size={14} />
                        {paper.pages}p
                      </div>
                    </div>
                  </div>

                  <a href="#" className="download-btn">
                    <Download size={16} />
                    Download PDF
                  </a>
                </article>
              ))}
            </div>

            <div className="cta-section">
              <h2 className="cta-title">Access Our Complete Research Library</h2>
              <p className="cta-description">
                For full access to our publications, including datasets, supplementary materials,
                and detailed methodologies, contact our research team or download our complete research catalog.
              </p>
              <div className="cta-buttons">
                <button className="cta-btn">
                  <Download size={20} />
                  Download Full Catalog
                </button>
                <button className="cta-btn-secondary">
                  <User size={20} />
                  Contact Research Team
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