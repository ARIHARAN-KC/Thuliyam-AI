import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Code, Key, Zap, Shield, FileCode, Terminal, Cpu, Database } from "lucide-react";

export default function ApiDocs() {
  const endpoints = [
    {
      method: "GET",
      path: "/predict/",
      description: "AI Image Analysis Endpoint",
      color: "from-green-500 to-blue-500",
    },
    {
      method: "POST",
      path: "/batch-predict/",
      description: "Batch Image Processing",
      color: "from-purple-500 to-pink-500",
    },
    {
      method: "GET",
      path: "/health/",
      description: "Service Health Check",
      color: "from-blue-500 to-cyan-500",
    },
    {
      method: "POST",
      path: "/auth/token/",
      description: "Authentication Token",
      color: "from-orange-500 to-red-500",
    },
  ];

  const codeSnippets = {
    python: `import requests

# Authentication
headers = {
    "Authorization": "Bearer YOUR_API_KEY",
    "Content-Type": "application/json"
}

# Image analysis request
response = requests.post(
    "https://api.thuliyamai.com/predict/",
    headers=headers,
    json={"image_url": "https://example.com/image.jpg"}
)

# Parse response
result = response.json()
print(f"Analysis result: {result['data']['analysis']}")`,

    javascript: `const axios = require('axios');

// Configure API client
const client = axios.create({
    baseURL: 'https://api.thuliyamai.com',
    headers: {
        'Authorization': 'Bearer YOUR_API_KEY',
        'Content-Type': 'application/json'
    }
});

// Analyze image
async function analyzeImage(imageUrl) {
    try {
        const response = await client.post('/predict/', {
            image_url: imageUrl
        });
        return response.data.data.analysis;
    } catch (error) {
        console.error('API Error:', error.response?.data || error.message);
        throw error;
    }
}`,

    curl: `curl -X POST https://api.thuliyamai.com/predict/ \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"image_url": "https://example.com/image.jpg"}'`
  };

  const languages = ["python", "javascript", "curl"] as const;

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

        .api-hero {
          background: 
            radial-gradient(ellipse at 20% 20%, rgba(120, 119, 198, 0.15) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 80%, rgba(255, 119, 198, 0.1) 0%, transparent 50%),
            linear-gradient(135deg, #0A0B1E 0%, #1A1B3E 50%, #0A0B1E 100%);
          position: relative;
          overflow: hidden;
          font-family: 'Inter', sans-serif;
          min-height: 100vh;
        }

        .api-hero::before {
          content: '';
          position: absolute;
          inset: 0;
          background: 
            url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23000' fill-opacity='0.03' fill-rule='evenodd'/%3E%3C/svg%3E");
          opacity: 0.3;
          animation: shimmer 20s linear infinite;
          pointer-events: none;
        }

        .api-content {
          max-width: 1200px;
          margin: 0 auto;
          padding: 6rem 2rem 4rem;
          position: relative;
          z-index: 2;
        }

        .api-header {
          text-align: center;
          margin-bottom: 4rem;
        }

        .api-title-icon {
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

        .api-title {
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

        .api-subtitle {
          font-size: 1.3rem;
          color: rgba(255, 255, 255, 0.7);
          max-width: 600px;
          margin: 0 auto;
          line-height: 1.6;
          font-weight: 400;
        }

        .api-main {
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem 0;
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
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
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #00F5A0, #7877C6);
          border-radius: 16px;
          margin: 0 auto 1.5rem;
          color: white;
          font-size: 1.8rem;
        }

        .feature-title {
          font-size: 1.2rem;
          font-weight: 700;
          color: rgba(255, 255, 255, 0.9);
          margin-bottom: 0.8rem;
          text-align: center;
        }

        .feature-desc {
          font-size: 0.95rem;
          color: rgba(255, 255, 255, 0.6);
          line-height: 1.5;
          text-align: center;
        }

        .endpoints-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1.5rem;
          margin-bottom: 4rem;
        }

        .endpoint-card {
          background: rgba(255, 255, 255, 0.03);
          border-radius: 16px;
          padding: 1.5rem;
          border: 1px solid rgba(255, 255, 255, 0.1);
          transition: all 0.3s ease;
        }

        .endpoint-card:hover {
          background: rgba(255, 255, 255, 0.05);
          transform: translateY(-3px);
        }

        .method-badge {
          display: inline-block;
          padding: 0.25rem 0.75rem;
          border-radius: 20px;
          font-size: 0.75rem;
          font-weight: 700;
          margin-bottom: 1rem;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .method-get {
          background: linear-gradient(135deg, #10b981, #059669);
          color: white;
        }

        .method-post {
          background: linear-gradient(135deg, #8b5cf6, #7c3aed);
          color: white;
        }

        .endpoint-path {
          font-family: 'Monaco', 'Menlo', 'Consolas', monospace;
          color: rgba(255, 255, 255, 0.9);
          font-size: 0.95rem;
          margin-bottom: 0.5rem;
          word-break: break-all;
        }

        .endpoint-desc {
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.6);
          line-height: 1.5;
        }

        .code-section {
          background: rgba(255, 255, 255, 0.03);
          border-radius: 20px;
          padding: 2.5rem;
          border: 1px solid rgba(255, 255, 255, 0.1);
          margin-bottom: 3rem;
          backdrop-filter: blur(10px);
        }

        .section-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: rgba(255, 255, 255, 0.9);
          margin-bottom: 1.5rem;
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .section-icon {
          color: #00F5A0;
        }

        .tabs-container {
          display: flex;
          gap: 0.5rem;
          margin-bottom: 1.5rem;
          flex-wrap: wrap;
        }

        .tab-btn {
          padding: 0.5rem 1rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          color: rgba(255, 255, 255, 0.7);
          font-size: 0.9rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
          font-family: 'Monaco', 'Menlo', 'Consolas', monospace;
        }

        .tab-btn:hover {
          background: rgba(255, 255, 255, 0.08);
          color: rgba(255, 255, 255, 0.9);
        }

        .tab-btn.active {
          background: linear-gradient(135deg, #00F5A0, #7877C6);
          color: white;
          border-color: transparent;
        }

        .code-block {
          background: #0f1122;
          border-radius: 12px;
          padding: 1.5rem;
          overflow-x: auto;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .code-block pre {
          margin: 0;
          font-family: 'Monaco', 'Menlo', 'Consolas', monospace;
          font-size: 0.9rem;
          line-height: 1.6;
          color: #00F5A0;
        }

        .api-note {
          margin-top: 3rem;
          padding: 1.5rem;
          background: rgba(0, 245, 160, 0.1);
          border: 1px solid rgba(0, 245, 160, 0.3);
          border-radius: 16px;
          color: rgba(255, 255, 255, 0.7);
          font-size: 0.95rem;
          line-height: 1.6;
          backdrop-filter: blur(10px);
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .note-icon {
          color: #00F5A0;
          flex-shrink: 0;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 1024px) {
          .api-title {
            font-size: 2.8rem;
          }
          
          .api-content {
            padding: 5rem 1.5rem 3rem;
          }
          
          .features-grid,
          .endpoints-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 1.5rem;
          }
        }

        @media (max-width: 768px) {
          .api-title {
            font-size: 2.2rem;
          }
          
          .api-subtitle {
            font-size: 1.1rem;
          }
          
          .features-grid,
          .endpoints-grid {
            grid-template-columns: 1fr;
            gap: 1rem;
          }
          
          .code-section {
            padding: 1.5rem;
          }
        }

        @media (max-width: 480px) {
          .api-title {
            font-size: 1.8rem;
          }
          
          .api-content {
            padding: 4rem 1rem 2rem;
          }
          
          .tabs-container {
            flex-direction: column;
          }
          
          .tab-btn {
            width: 100%;
          }
        }
      `}</style>

      <div className="api-hero">
        <div className="api-content">
          <div className="api-header">
            <div className="api-title-icon">
              <Code size={40} />
            </div>
            <h1 className="api-title">API Documentation</h1>
            <p className="api-subtitle">
              Explore our APIs and integration guides. Build powerful AI-powered applications with our comprehensive API suite.
            </p>
          </div>

          <div className="api-main">
            <div className="features-grid">
              <div className="feature-card">
                <div className="feature-icon">
                  <Zap size={28} />
                </div>
                <h3 className="feature-title">RESTful APIs</h3>
                <p className="feature-desc">
                  Modern REST APIs with JSON responses
                </p>
              </div>

              <div className="feature-card">
                <div className="feature-icon">
                  <Key size={28} />
                </div>
                <h3 className="feature-title">Authentication</h3>
                <p className="feature-desc">
                  API key based authentication
                </p>
              </div>

              <div className="feature-card">
                <div className="feature-icon">
                  <Shield size={28} />
                </div>
                <h3 className="feature-title">Secure & Private</h3>
                <p className="feature-desc">
                  End-to-end encryption with no data storage
                </p>
              </div>

              <div className="feature-card">
                <div className="feature-icon">
                  <Cpu size={28} />
                </div>
                <h3 className="feature-title">AI-Powered</h3>
                <p className="feature-desc">
                  Advanced AI models for image analysis
                </p>
              </div>
            </div>

            <div className="code-section">
              <h2 className="section-title">
                <Terminal className="section-icon" size={24} />
                Getting Started
              </h2>
              <p style={{ color: 'rgba(255, 255, 255, 0.7)', marginBottom: '1.5rem', lineHeight: '1.6' }}>
                To start using our APIs, create an account and generate an API key.
                Include the key in your requests to access our AI features securely.
              </p>

              <div className="tabs-container">
                {languages.map((lang) => (
                  <button
                    key={lang}
                    className="tab-btn active"
                    onClick={() => { }}
                  >
                    {lang === 'curl' ? 'cURL' : lang.charAt(0).toUpperCase() + lang.slice(1)}
                  </button>
                ))}
              </div>

              <div className="code-block">
                <pre>{codeSnippets.python}</pre>
              </div>
            </div>

            <div className="code-section">
              <h2 className="section-title">
                <FileCode className="section-icon" size={24} />
                Example Endpoints
              </h2>
              <p style={{ color: 'rgba(255, 255, 255, 0.7)', marginBottom: '1.5rem', lineHeight: '1.6' }}>
                Here are the main API endpoints you can use to integrate with our services:
              </p>

              <div className="endpoints-grid">
                {endpoints.map((endpoint, index) => (
                  <div key={index} className="endpoint-card">
                    <div className={`method-badge ${endpoint.method === 'GET' ? 'method-get' : 'method-post'}`}>
                      {endpoint.method}
                    </div>
                    <div className="endpoint-path">{endpoint.path}</div>
                    <div className="endpoint-desc">{endpoint.description}</div>
                  </div>
                ))}
              </div>

              <div className="code-block" style={{ marginTop: '2rem' }}>
                <pre>{`GET https://kc-zt-thuliyam-ml-api-server.hf.space/predict/image
Headers:
  Authorization: Bearer YOUR_API_KEY
Response:
{
  "status": "success",
  "data": {
    "analysis": "Result data here...",
    "confidence": 0.937,
    "timestamp": "2024-12-15T10:30:00Z"
  }
}`}</pre>
              </div>
            </div>

            <div className="api-note">
              <div className="note-icon">
                <Database size={24} />
              </div>
              <div>
                <strong>Note:</strong> For more examples and advanced usage, check each endpoint section below.
                Our APIs are designed to help you get up and running quickly! Rate limits apply: 1000 requests/day on free tier.
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
}