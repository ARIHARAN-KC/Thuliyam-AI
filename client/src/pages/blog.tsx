import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { BookOpen, Calendar, User, Clock, Tag, ArrowRight, TrendingUp, Shield, Zap, Brain } from "lucide-react";

export default function Blog() {
    const blogPosts = [
        {
            id: 1,
            title: "AI in Everyday Life: The Silent Revolution",
            description: "Learn how AI is transforming industries and daily routines, from smart assistants to predictive healthcare.",
            date: "Jan 20, 2026",
            readTime: "5 min read",
            author: "Alex Chen",
            category: "Industry Insights",
            icon: <Brain size={20} />,
            gradient: "from-green-500 to-blue-500",
        },
        {
            id: 2,
            title: "Getting Started with AI Analysis",
            description: "A beginner-friendly guide to using our AI tools for audio, video, and text processing with practical examples.",
            date: "Jan 18, 2026",
            readTime: "8 min read",
            author: "Sarah Johnson",
            category: "Tutorial",
            icon: <Zap size={20} />,
            gradient: "from-purple-500 to-pink-500",
        },
        {
            id: 3,
            title: "Upcoming Features Preview: What's Next in AI",
            description: "Sneak peek into upcoming AI features and improvements coming soon to our platform.",
            date: "Jan 15, 2026",
            readTime: "4 min read",
            author: "Tech Team",
            category: "Updates",
            icon: <TrendingUp size={20} />,
            gradient: "from-orange-500 to-red-500",
        },
        {
            id: 4,
            title: "Best Practices for Data Security in AI Era",
            description: "Essential tips to keep your data safe while using AI tools effectively in today's digital landscape.",
            date: "Jan 12, 2026",
            readTime: "6 min read",
            author: "Security Team",
            category: "Security",
            icon: <Shield size={20} />,
            gradient: "from-blue-500 to-cyan-500",
        },
        {
            id: 5,
            title: "The Future of AI Image Detection",
            description: "Exploring how AI image authentication technology is evolving and what to expect in the coming years.",
            date: "Jan 10, 2026",
            readTime: "7 min read",
            author: "Dr. Michael Zhang",
            category: "Technology",
            icon: <Brain size={20} />,
            gradient: "from-indigo-500 to-purple-500",
        },
        {
            id: 6,
            title: "Case Study: AI in Journalism",
            description: "How news organizations are using AI tools to verify content and maintain journalistic integrity.",
            date: "Jan 8, 2026",
            readTime: "9 min read",
            author: "Lisa Park",
            category: "Case Study",
            icon: <BookOpen size={20} />,
            gradient: "from-pink-500 to-rose-500",
        },
    ];

    const categories = [
        { name: "All", count: 12 },
        { name: "Tutorials", count: 4 },
        { name: "Industry Insights", count: 3 },
        { name: "Security", count: 2 },
        { name: "Updates", count: 2 },
        { name: "Case Studies", count: 1 },
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

        .blog-hero {
          background: 
            radial-gradient(ellipse at 20% 20%, rgba(120, 119, 198, 0.15) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 80%, rgba(255, 119, 198, 0.1) 0%, transparent 50%),
            linear-gradient(135deg, #0A0B1E 0%, #1A1B3E 50%, #0A0B1E 100%);
          position: relative;
          overflow: hidden;
          font-family: 'Inter', sans-serif;
          min-height: 100vh;
        }

        .blog-hero::before {
          content: '';
          position: absolute;
          inset: 0;
          background: 
            url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23000' fill-opacity='0.03' fill-rule='evenodd'/%3E%3C/svg%3E");
          opacity: 0.3;
          animation: shimmer 20s linear infinite;
          pointer-events: none;
        }

        .blog-content {
          max-width: 1200px;
          margin: 0 auto;
          padding: 6rem 2rem 4rem;
          position: relative;
          z-index: 2;
        }

        .blog-header {
          text-align: center;
          margin-bottom: 4rem;
        }

        .blog-title-icon {
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

        .blog-title {
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

        .blog-subtitle {
          font-size: 1.3rem;
          color: rgba(255, 255, 255, 0.7);
          max-width: 600px;
          margin: 0 auto;
          line-height: 1.6;
          font-weight: 400;
        }

        .blog-main {
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem 0;
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

        .blog-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
          gap: 2rem;
          margin-bottom: 4rem;
        }

        .blog-card {
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

        .blog-card:hover {
          background: rgba(255, 255, 255, 0.05);
          border-color: rgba(0, 245, 160, 0.3);
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(0, 245, 160, 0.1);
        }

        .card-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1.5rem;
        }

        .category-tag {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.4rem 0.8rem;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 500;
          color: rgba(255, 255, 255, 0.8);
        }

        .category-icon {
          color: #00F5A0;
        }

        .read-time {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.8rem;
          color: rgba(255, 255, 255, 0.5);
        }

        .card-title {
          font-size: 1.4rem;
          font-weight: 700;
          color: rgba(255, 255, 255, 0.95);
          margin-bottom: 1rem;
          line-height: 1.4;
          flex-grow: 1;
        }

        .card-description {
          font-size: 0.95rem;
          color: rgba(255, 255, 255, 0.7);
          line-height: 1.6;
          margin-bottom: 1.5rem;
          flex-grow: 2;
        }

        .card-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: auto;
          padding-top: 1.5rem;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }

        .author-info {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .author-avatar {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: linear-gradient(135deg, #00F5A0, #7877C6);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: 600;
          font-size: 0.9rem;
        }

        .author-details h4 {
          font-size: 0.9rem;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.9);
          margin: 0;
        }

        .author-details p {
          font-size: 0.8rem;
          color: rgba(255, 255, 255, 0.5);
          margin: 0.1rem 0 0 0;
        }

        .date-info {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.8rem;
          color: rgba(255, 255, 255, 0.5);
        }

        .read-more {
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

        .read-more:hover {
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

        .subscribe-btn {
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
          gap: 0.8rem;
        }

        .subscribe-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(0, 245, 160, 0.3);
        }

        @media (max-width: 1024px) {
          .blog-title {
            font-size: 2.8rem;
          }
          
          .blog-content {
            padding: 5rem 1.5rem 3rem;
          }
          
          .blog-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 1.5rem;
          }
        }

        @media (max-width: 768px) {
          .blog-title {
            font-size: 2.2rem;
          }
          
          .blog-subtitle {
            font-size: 1.1rem;
          }
          
          .blog-grid {
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
        }

        @media (max-width: 480px) {
          .blog-title {
            font-size: 1.8rem;
          }
          
          .blog-content {
            padding: 4rem 1rem 2rem;
          }
          
          .blog-card {
            padding: 1.5rem;
          }
          
          .card-footer {
            flex-direction: column;
            gap: 1rem;
            align-items: flex-start;
          }
        }
      `}</style>

            <div className="blog-hero">
                <div className="blog-content">
                    <div className="blog-header">
                        <div className="blog-title-icon">
                            <BookOpen size={40} />
                        </div>
                        <h1 className="blog-title">Blog & Insights</h1>
                        <p className="blog-subtitle">
                            Stay updated with the latest articles, tutorials, and AI trends.
                            Our blog covers practical guides, feature updates, and industry insights.
                        </p>
                    </div>

                    <div className="blog-main">
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

                        <div className="blog-grid">
                            {blogPosts.map((post) => (
                                <article key={post.id} className="blog-card">
                                    <div className="card-header">
                                        <div className="category-tag">
                                            <span className="category-icon">{post.icon}</span>
                                            {post.category}
                                        </div>
                                        <div className="read-time">
                                            <Clock size={14} />
                                            {post.readTime}
                                        </div>
                                    </div>

                                    <h2 className="card-title">{post.title}</h2>
                                    <p className="card-description">{post.description}</p>

                                    <div className="card-footer">
                                        <div className="author-info">
                                            <div className="author-avatar">
                                                {post.author.charAt(0)}
                                            </div>
                                            <div className="author-details">
                                                <h4>{post.author}</h4>
                                                <div className="date-info">
                                                    <Calendar size={12} />
                                                    {post.date}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <a href="#" className="read-more">
                                        Read Article <ArrowRight size={16} />
                                    </a>
                                </article>
                            ))}
                        </div>

                        <div className="cta-section">
                            <h2 className="cta-title">Stay Informed with Our Newsletter</h2>
                            <p className="cta-description">
                                Get the latest AI insights, tutorials, and updates delivered directly to your inbox.
                                Join our community of AI enthusiasts and professionals.
                            </p>
                            <button className="subscribe-btn">
                                <Mail size={20} />
                                Subscribe to Newsletter
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    );
}

// Mail icon component
const Mail = ({ size = 24, className = "" }) => (
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
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
    </svg>
);