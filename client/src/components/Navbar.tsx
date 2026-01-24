import Link from "next/link";
import Image from "next/image";
import { Menu, X, ChevronDown, ImageIcon, VideoIcon, MusicIcon, TextIcon } from "lucide-react";
import { useState, useEffect, useRef } from "react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAnalyzeOpen, setIsAnalyzeOpen] = useState(false);
  const analyzeDropdownRef = useRef<HTMLDivElement>(null);
  const mobileAnalyzeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (analyzeDropdownRef.current && !analyzeDropdownRef.current.contains(event.target as Node)) {
        setIsAnalyzeOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close mobile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (mobileAnalyzeRef.current && !mobileAnalyzeRef.current.contains(event.target as Node)) {
        setIsAnalyzeOpen(false);
      }
    };
    if (isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobileMenuOpen]);

  return (
    <>
      <style jsx>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          transition: all 0.4s ease;
          padding: 1.5rem 2rem;
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          background: ${isScrolled ? 'rgba(16, 18, 40, 0.95)' : 'rgba(16, 18, 40, 0.7)'};
          border-bottom: 1px solid ${isScrolled ? 'rgba(0, 245, 160, 0.3)' : 'rgba(255, 255, 255, 0.1)'};
          animation: slideDown 0.6s ease-out;
        }

        .navbar.scrolled {
          background: rgba(16, 18, 40, 0.98);
          border-bottom: 1px solid rgba(0, 245, 160, 0.4);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
          padding: 1rem 2rem;
        }

        .navbar-container {
          max-width: 1400px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          position: relative;
        }

        .navbar-logo {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          text-decoration: none;
          position: relative;
          z-index: 2;
        }

        .logo-wrapper {
          position: relative;
          width: 50px;
          height: 50px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .logo-image {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }

        .navbar-links {
          display: flex;
          align-items: center;
          gap: 3rem;
        }

        .navbar-links a {
          color: #ffffff;
          text-decoration: none;
          font-weight: 500;
          font-size: 1rem;
          transition: all 0.3s ease;
          position: relative;
          padding: 0.5rem 0;
        }

        .navbar-links a::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 2px;
          background: linear-gradient(90deg, #00F5A0, #7877C6);
          transition: width 0.3s ease;
        }

        .navbar-links a:hover {
          color: #ffffff;
        }

        .navbar-links a:hover::after {
          width: 100%;
        }

        /* Desktop Analyze Dropdown Styles */
        .analyze-dropdown {
          position: relative;
          height: 44px;
        }

        .analyze-trigger {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.5rem;
          background: linear-gradient(135deg, #00F5A0 0%, #7877C6 100%);
          color: #ffffff;
          font-weight: 600;
          font-size: 0.95rem;
          border: none;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.3s ease;
          text-decoration: none;
          position: relative;
          overflow: hidden;
          height: 44px;
        }

        .analyze-trigger::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, #7877C6 0%, #FF77C6 100%);
          opacity: 0;
          transition: opacity 0.3s ease;
          z-index: -1;
          border-radius: 12px;
        }

        .analyze-trigger:hover::after {
          opacity: 1;
        }

        .analyze-trigger:hover {
          transform: translateY(-2px);
          box-shadow: 0 15px 30px rgba(0, 245, 160, 0.3);
        }

        .dropdown-menu {
          position: absolute;
          top: calc(100% + 12px);
          left: 50%;
          transform: translateX(-50%) scale(0.95);
          background: rgba(22, 24, 50, 0.98);
          backdrop-filter: blur(30px);
          -webkit-backdrop-filter: blur(30px);
          border: 1px solid rgba(0, 245, 160, 0.4);
          border-radius: 16px;
          padding: 1rem;
          min-width: 280px;
          opacity: 0;
          visibility: hidden;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          z-index: 1000;
          box-shadow: 
            0 25px 50px rgba(0, 0, 0, 0.5),
            0 0 0 1px rgba(0, 245, 160, 0.1) inset;
          animation: fadeIn 0.3s ease-out;
        }

        .dropdown-menu.active {
          opacity: 1;
          visibility: visible;
          transform: translateX(-50%) scale(1);
        }

        .dropdown-menu::before {
          content: '';
          position: absolute;
          top: -8px;
          left: 50%;
          transform: translateX(-50%);
          width: 0;
          height: 0;
          border-left: 8px solid transparent;
          border-right: 8px solid transparent;
          border-bottom: 8px solid rgba(22, 24, 50, 0.98);
          filter: drop-shadow(0 -1px 0 rgba(0, 245, 160, 0.4));
        }

        .dropdown-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem 1.25rem;
          color: #ffffff;
          text-decoration: none;
          transition: all 0.3s ease;
          position: relative;
          border-radius: 12px;
          margin: 0.25rem 0;
        }

        .dropdown-item:hover {
          background: linear-gradient(90deg, 
            rgba(0, 245, 160, 0.15) 0%,
            rgba(120, 119, 198, 0.15) 100%
          );
          transform: translateX(4px);
        }

        .dropdown-item-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          background: rgba(0, 245, 160, 0.1);
          border-radius: 10px;
          border: 1px solid rgba(0, 245, 160, 0.2);
          flex-shrink: 0;
          transition: all 0.3s ease;
        }

        .dropdown-item:hover .dropdown-item-icon {
          background: rgba(0, 245, 160, 0.2);
          border-color: rgba(0, 245, 160, 0.4);
          transform: scale(1.1);
        }

        .dropdown-item-content {
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .dropdown-item-title {
          font-weight: 600;
          font-size: 1rem;
          color: #ffffff;
          margin-bottom: 0.25rem;
          transition: all 0.3s ease;
        }

        .dropdown-item:hover .dropdown-item-title {
          color: #00F5A0;
        }

        .dropdown-item-subtitle {
          font-size: 0.85rem;
          color: rgba(255, 255, 255, 0.6);
          transition: all 0.3s ease;
          font-weight: 400;
        }

        .dropdown-item:hover .dropdown-item-subtitle {
          color: rgba(255, 255, 255, 0.9);
        }

        .mobile-menu-button {
          display: none;
          background: transparent;
          border: none;
          color: #ffffff;
          cursor: pointer;
          padding: 0.5rem;
          z-index: 1002;
        }

        .mobile-menu-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(10, 11, 30, 0.98);
          backdrop-filter: blur(15px);
          -webkit-backdrop-filter: blur(15px);
          z-index: 1001;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          opacity: 0;
          visibility: hidden;
          transition: all 0.3s ease;
        }

        .mobile-menu-overlay.active {
          opacity: 1;
          visibility: visible;
        }

        .mobile-menu-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
          width: 90%;
          max-width: 400px;
          padding: 2rem 0;
        }

        .mobile-menu-content a {
          color: #ffffff;
          text-decoration: none;
          font-size: 1.3rem;
          font-weight: 500;
          padding: 1rem 1.5rem;
          width: 100%;
          text-align: left;
          border-radius: 12px;
          transition: all 0.3s ease;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .mobile-menu-content a:hover {
          color: #ffffff;
          background: rgba(0, 245, 160, 0.1);
          border-color: rgba(0, 245, 160, 0.3);
          transform: translateX(4px);
        }

        /* Mobile Analyze Dropdown */
        .mobile-analyze-dropdown {
          width: 100%;
          position: relative;
        }

        .mobile-analyze-trigger {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 1.3rem;
          font-weight: 500;
          padding: 1rem 1.5rem;
          background: linear-gradient(135deg, #00F5A0 0%, #7877C6 100%);
          color: #ffffff;
          border: none;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.3s ease;
          margin-bottom: 0.5rem;
        }

        .mobile-analyze-trigger:hover {
          transform: translateX(4px);
          box-shadow: 0 15px 30px rgba(0, 245, 160, 0.3);
        }

        .mobile-dropdown-menu {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          padding: 0.75rem;
          background: rgba(22, 24, 50, 0.8);
          border-radius: 12px;
          border: 1px solid rgba(0, 245, 160, 0.3);
          animation: slideDown 0.3s ease-out;
        }

        .mobile-dropdown-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 0.875rem 1rem;
          color: #ffffff;
          text-decoration: none;
          font-size: 1.1rem;
          font-weight: 500;
          border-radius: 10px;
          transition: all 0.3s ease;
          position: relative;
        }

        .mobile-dropdown-item:hover {
          background: linear-gradient(90deg, 
            rgba(0, 245, 160, 0.15) 0%,
            rgba(120, 119, 198, 0.15) 100%
          );
          transform: translateX(4px);
        }

        .mobile-dropdown-item-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          background: rgba(0, 245, 160, 0.1);
          border-radius: 8px;
          border: 1px solid rgba(0, 245, 160, 0.2);
          flex-shrink: 0;
          transition: all 0.3s ease;
        }

        .mobile-dropdown-item:hover .mobile-dropdown-item-icon {
          background: rgba(0, 245, 160, 0.2);
          border-color: rgba(0, 245, 160, 0.4);
        }

        .mobile-dropdown-item-content {
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .mobile-dropdown-item-title {
          color: #ffffff;
          font-size: 1rem;
          font-weight: 500;
          transition: all 0.3s ease;
          line-height: 1.3;
        }

        .mobile-dropdown-item:hover .mobile-dropdown-item-title {
          color: #00F5A0;
        }

        .mobile-dropdown-item-subtitle {
          font-size: 0.8rem;
          color: rgba(255, 255, 255, 0.6);
          font-weight: 400;
          transition: all 0.3s ease;
          line-height: 1.4;
        }

        .mobile-dropdown-item:hover .mobile-dropdown-item-subtitle {
          color: rgba(255, 255, 255, 0.9);
        }

        .close-menu-button {
          position: absolute;
          top: 1.5rem;
          right: 1.5rem;
          background: transparent;
          border: none;
          color: #ffffff;
          cursor: pointer;
          padding: 0.5rem;
          z-index: 1002;
        }

        @media (max-width: 1024px) {
          .navbar-links {
            gap: 2rem;
          }
          
          .dropdown-menu {
            min-width: 260px;
          }
        }

        @media (max-width: 768px) {
          .navbar {
            padding: 1rem 1.5rem;
          }

          .navbar.scrolled {
            padding: 0.8rem 1.5rem;
          }

          .navbar-links {
            display: none;
          }

          .mobile-menu-button {
            display: block;
          }

          .logo-wrapper {
            width: 40px;
            height: 40px;
          }
          
          .mobile-menu-content {
            padding: 1rem 0;
          }
          
          .mobile-menu-content a {
            font-size: 1.2rem;
            padding: 0.875rem 1.25rem;
          }
          
          .mobile-analyze-trigger {
            font-size: 1.2rem;
            padding: 0.875rem 1.25rem;
          }
          
          .mobile-dropdown-item {
            padding: 0.75rem 0.875rem;
          }
          
          .mobile-dropdown-item-title {
            font-size: 1rem;
          }
        }

        @media (max-width: 480px) {
          .navbar {
            padding: 0.8rem 1rem;
          }

          .logo-wrapper {
            width: 35px;
            height: 35px;
          }
          
          .navbar-logo {
            gap: 1rem;
          }
          
          .mobile-menu-content {
            gap: 0.75rem;
          }
          
          .mobile-menu-content a {
            font-size: 1.1rem;
            padding: 0.75rem 1rem;
          }
          
          .mobile-analyze-trigger {
            font-size: 1.1rem;
            padding: 0.75rem 1rem;
          }
          
          .mobile-dropdown-item {
            padding: 0.625rem 0.75rem;
          }
          
          .mobile-dropdown-item-title {
            font-size: 0.95rem;
          }
          
          .mobile-dropdown-item-subtitle {
            font-size: 0.75rem;
          }
          
          .mobile-dropdown-item-icon {
            width: 28px;
            height: 28px;
          }
        }

        @media (max-width: 360px) {
          .navbar-logo {
            gap: 0.8rem;
          }
          
          .mobile-menu-content {
            max-width: 320px;
          }
          
          .mobile-dropdown-menu {
            padding: 0.5rem;
          }
        }
      `}</style>

      <header className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="navbar-container">
          {/* Logo */}
          <Link href="/" className="navbar-logo">
            <div className="logo-wrapper">
              <Image
                src="/logo.svg"
                alt="Thuliyam AI Logo"
                width={50}
                height={50}
                className="logo-image"
                priority
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="navbar-links">
            <Link href="/">Home</Link>
            <Link href="/about">About</Link>

            {/* Analyze Dropdown for Desktop */}
            <div className="analyze-dropdown" ref={analyzeDropdownRef}>
              <button
                className="analyze-trigger"
                onClick={() => setIsAnalyzeOpen(!isAnalyzeOpen)}
              >
                <span>Analyze</span>
                <ChevronDown size={18} />
              </button>

              <div className={`dropdown-menu ${isAnalyzeOpen ? 'active' : ''}`}>
                <Link
                  href="/analyze/audio"
                  className="dropdown-item"
                  onClick={() => setIsAnalyzeOpen(false)}
                >
                  <div className="dropdown-item-icon">
                    <MusicIcon size={20} />
                  </div>
                  <div className="dropdown-item-content">
                    <div className="dropdown-item-title">Audio Analyze</div>
                    <div className="dropdown-item-subtitle">Analyze audio files</div>
                  </div>
                </Link>
                <Link
                  href="/analyze/image"
                  className="dropdown-item"
                  onClick={() => setIsAnalyzeOpen(false)}
                >
                  <div className="dropdown-item-icon">
                    <ImageIcon size={20} />
                  </div>
                  <div className="dropdown-item-content">
                    <div className="dropdown-item-title">Image Analyze</div>
                    <div className="dropdown-item-subtitle">Analyze and process images</div>
                  </div>
                </Link>
                <Link
                  href="/analyze/video"
                  className="dropdown-item"
                  onClick={() => setIsAnalyzeOpen(false)}
                >
                  <div className="dropdown-item-icon">
                    <VideoIcon size={20} />
                  </div>
                  <div className="dropdown-item-content">
                    <div className="dropdown-item-title">Video Analyze</div>
                    <div className="dropdown-item-subtitle">Process video content</div>
                  </div>
                </Link>
                <Link
                  href="/analyze/text"
                  className="dropdown-item"
                  onClick={() => setIsAnalyzeOpen(false)}
                >
                  <div className="dropdown-item-icon">
                    <TextIcon size={20} />
                  </div>
                  <div className="dropdown-item-content">
                    <div className="dropdown-item-title">Text Analyze</div>
                    <div className="dropdown-item-subtitle">Process text content</div>
                  </div>
                </Link>
              </div>
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="mobile-menu-button"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu size={28} />
          </button>

          {/* Mobile Menu Overlay */}
          <div className={`mobile-menu-overlay ${isMobileMenuOpen ? 'active' : ''}`}>
            <button
              className="close-menu-button"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <X size={32} />
            </button>

            <div className="mobile-menu-content">
              <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>
                <span>Home</span>
              </Link>
              <Link href="/about" onClick={() => setIsMobileMenuOpen(false)}>
                <span>About</span>
              </Link>

              {/* Analyze Dropdown for Mobile */}
              <div className="mobile-analyze-dropdown" ref={mobileAnalyzeRef}>
                <button
                  className="mobile-analyze-trigger"
                  onClick={() => setIsAnalyzeOpen(!isAnalyzeOpen)}
                >
                  <span>Analyze</span>
                  <ChevronDown size={20} />
                </button>

                {isAnalyzeOpen && (
                  <div className="mobile-dropdown-menu">
                    <Link
                      href="/analyze/audio"
                      className="mobile-dropdown-item"
                      onClick={() => {
                        setIsAnalyzeOpen(false);
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      <div className="mobile-dropdown-item-icon">
                        <MusicIcon size={18} />
                      </div>
                      <div className="mobile-dropdown-item-content">
                        <div className="mobile-dropdown-item-title">Audio Analyze</div>
                        <div className="mobile-dropdown-item-subtitle">Analyze audio files</div>
                      </div>
                    </Link>
                    <Link
                      href="/analyze/image"
                      className="mobile-dropdown-item"
                      onClick={() => {
                        setIsAnalyzeOpen(false);
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      <div className="mobile-dropdown-item-icon">
                        <ImageIcon size={18} />
                      </div>
                      <div className="mobile-dropdown-item-content">
                        <div className="mobile-dropdown-item-title">Image Analyze</div>
                        <div className="mobile-dropdown-item-subtitle">Analyze and process images</div>
                      </div>
                    </Link>
                    <Link
                      href="/analyze/video"
                      className="mobile-dropdown-item"
                      onClick={() => {
                        setIsAnalyzeOpen(false);
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      <div className="mobile-dropdown-item-icon">
                        <VideoIcon size={18} />
                      </div>
                      <div className="mobile-dropdown-item-content">
                        <div className="mobile-dropdown-item-title">Video Analyze</div>
                        <div className="mobile-dropdown-item-subtitle">Process video content</div>
                      </div>
                    </Link>
                    <Link
                      href="/analyze/text"
                      className="mobile-dropdown-item"
                      onClick={() => {
                        setIsAnalyzeOpen(false);
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      <div className="mobile-dropdown-item-icon">
                        <TextIcon size={18} />
                      </div>
                      <div className="mobile-dropdown-item-content">
                        <div className="mobile-dropdown-item-title">Text Analyze</div>
                        <div className="mobile-dropdown-item-subtitle">Process text content</div>
                      </div>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}