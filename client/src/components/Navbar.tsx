import Link from "next/link";
import Image from "next/image";
import { Menu, X, ChevronDown, ImageIcon, VideoIcon, MusicIcon, TextIcon } from "lucide-react";
import { useState, useEffect, useRef } from "react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAnalyzeOpen, setIsAnalyzeOpen] = useState(false);
  const [isMobileAnalyzeOpen, setIsMobileAnalyzeOpen] = useState(false);

  const analyzeDropdownRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

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

  // Close mobile menu when clicking outside or pressing escape
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
        setIsMobileMenuOpen(false);
        setIsMobileAnalyzeOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMobileMenuOpen(false);
        setIsMobileAnalyzeOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
      // Prevent body scroll when mobile menu is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
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

        @keyframes slideInFromLeft {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          transition: all 0.4s ease;
          padding: 1rem 1.5rem;
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          background: ${isScrolled ? 'rgba(16, 18, 40, 0.98)' : 'rgba(16, 18, 40, 0.9)'};
          border-bottom: 1px solid ${isScrolled ? 'rgba(0, 245, 160, 0.3)' : 'rgba(255, 255, 255, 0.1)'};
          animation: slideDown 0.6s ease-out;
        }

        .navbar.scrolled {
          background: rgba(16, 18, 40, 0.98);
          border-bottom: 1px solid rgba(0, 245, 160, 0.4);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
          padding: 0.75rem 1.5rem;
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
          gap: 1rem;
          text-decoration: none;
          position: relative;
          z-index: 1002;
        }

        .logo-wrapper {
          position: relative;
          width: 40px;
          height: 40px;
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
          gap: 2.5rem;
        }

        .navbar-links a {
          color: #ffffff;
          text-decoration: none;
          font-weight: 500;
          font-size: 1rem;
          transition: all 0.3s ease;
          position: relative;
          padding: 0.5rem 0;
          white-space: nowrap;
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
          padding: 0.75rem 1.25rem;
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
          white-space: nowrap;
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
        }

        .dropdown-menu.active {
          opacity: 1;
          visibility: visible;
          transform: translateX(-50%) scale(1);
          animation: fadeIn 0.3s ease-out;
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
          min-width: 0;
        }

        .dropdown-item-title {
          font-weight: 600;
          font-size: 1rem;
          color: #ffffff;
          margin-bottom: 0.25rem;
          transition: all 0.3s ease;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .dropdown-item:hover .dropdown-item-title {
          color: #00F5A0;
        }

        .dropdown-item-subtitle {
          font-size: 0.85rem;
          color: rgba(255, 255, 255, 0.6);
          transition: all 0.3s ease;
          font-weight: 400;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
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
          width: 44px;
          height: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 8px;
          transition: background-color 0.3s ease;
        }

        .mobile-menu-button:hover {
          background: rgba(255, 255, 255, 0.1);
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
          align-items: stretch;
          gap: 0.75rem;
          width: 100%;
          max-width: 100%;
          padding: 5rem 1.5rem 2rem;
          overflow-y: auto;
          -webkit-overflow-scrolling: touch;
        }

        .mobile-menu-content > a {
          color: #ffffff;
          text-decoration: none;
          font-size: 1.25rem;
          font-weight: 500;
          padding: 1.125rem 1.25rem;
          text-align: left;
          border-radius: 12px;
          transition: all 0.3s ease;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          display: flex;
          align-items: center;
          justify-content: space-between;
          animation: slideInFromLeft 0.3s ease-out forwards;
          opacity: 0;
        }

        .mobile-menu-content > a:nth-child(1) { animation-delay: 0.1s; }
        .mobile-menu-content > a:nth-child(2) { animation-delay: 0.15s; }
        .mobile-menu-content > .mobile-analyze-dropdown { animation-delay: 0.2s; }

        .mobile-menu-content > a:hover {
          color: #ffffff;
          background: rgba(0, 245, 160, 0.1);
          border-color: rgba(0, 245, 160, 0.3);
          transform: translateX(4px);
        }

        /* Mobile Analyze Dropdown */
        .mobile-analyze-dropdown {
          width: 100%;
          position: relative;
          animation: slideInFromLeft 0.3s ease-out forwards;
          opacity: 0;
        }

        .mobile-analyze-trigger {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 1.25rem;
          font-weight: 500;
          padding: 1.125rem 1.25rem;
          background: linear-gradient(135deg, #00F5A0 0%, #7877C6 100%);
          color: #ffffff;
          border: none;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.3s ease;
          margin-bottom: 0;
        }

        .mobile-analyze-trigger:hover,
        .mobile-analyze-trigger:active {
          transform: translateX(4px);
          box-shadow: 0 15px 30px rgba(0, 245, 160, 0.3);
        }

        .mobile-dropdown-menu {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          padding: 0.75rem;
          background: rgba(22, 24, 50, 0.9);
          border-radius: 12px;
          border: 1px solid rgba(0, 245, 160, 0.3);
          margin-top: 0.5rem;
          animation: slideInFromLeft 0.2s ease-out;
        }

        .mobile-dropdown-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 0.875rem 1rem;
          color: #ffffff;
          text-decoration: none;
          font-size: 1.05rem;
          font-weight: 500;
          border-radius: 10px;
          transition: all 0.3s ease;
          position: relative;
        }

        .mobile-dropdown-item:hover,
        .mobile-dropdown-item:active {
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

        .mobile-dropdown-item:hover .mobile-dropdown-item-icon,
        .mobile-dropdown-item:active .mobile-dropdown-item-icon {
          background: rgba(0, 245, 160, 0.2);
          border-color: rgba(0, 245, 160, 0.4);
        }

        .mobile-dropdown-item-content {
          display: flex;
          flex-direction: column;
          flex: 1;
          min-width: 0;
        }

        .mobile-dropdown-item-title {
          color: #ffffff;
          font-size: 0.95rem;
          font-weight: 500;
          transition: all 0.3s ease;
          line-height: 1.3;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .mobile-dropdown-item:hover .mobile-dropdown-item-title,
        .mobile-dropdown-item:active .mobile-dropdown-item-title {
          color: #00F5A0;
        }

        .mobile-dropdown-item-subtitle {
          font-size: 0.8rem;
          color: rgba(255, 255, 255, 0.6);
          font-weight: 400;
          transition: all 0.3s ease;
          line-height: 1.4;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .mobile-dropdown-item:hover .mobile-dropdown-item-subtitle,
        .mobile-dropdown-item:active .mobile-dropdown-item-subtitle {
          color: rgba(255, 255, 255, 0.9);
        }

        .close-menu-button {
          position: absolute;
          top: 1.25rem;
          right: 1.25rem;
          background: transparent;
          border: none;
          color: #ffffff;
          cursor: pointer;
          padding: 0.5rem;
          z-index: 1002;
          width: 44px;
          height: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 8px;
          transition: background-color 0.3s ease;
        }

        .close-menu-button:hover {
          background: rgba(255, 255, 255, 0.1);
        }

        /* Desktop Styles */
        @media (min-width: 1025px) {
          .navbar-links {
            display: flex;
          }
          
          .mobile-menu-button {
            display: none;
          }
        }

        /* Tablet Styles */
        @media (max-width: 1024px) {
          .navbar-links {
            gap: 2rem;
          }
          
          .dropdown-menu {
            min-width: 260px;
          }
        }

        /* Mobile Styles */
        @media (max-width: 768px) {
          .navbar {
            padding: 0.875rem 1.25rem;
          }

          .navbar.scrolled {
            padding: 0.75rem 1.25rem;
          }

          .navbar-links {
            display: none;
          }

          .mobile-menu-button {
            display: flex;
          }

          .logo-wrapper {
            width: 36px;
            height: 36px;
          }
          
          .mobile-menu-content {
            padding: 4.5rem 1.25rem 1.5rem;
            gap: 0.75rem;
          }
          
          .mobile-menu-content > a {
            font-size: 1.1rem;
            padding: 1rem 1.125rem;
          }
          
          .mobile-analyze-trigger {
            font-size: 1.1rem;
            padding: 1rem 1.125rem;
          }
          
          .mobile-dropdown-item {
            padding: 0.75rem 0.875rem;
          }
          
          .mobile-dropdown-item-title {
            font-size: 0.95rem;
          }
          
          .mobile-dropdown-item-subtitle {
            font-size: 0.75rem;
          }
          
          .mobile-dropdown-item-icon {
            width: 30px;
            height: 30px;
          }
          
          .close-menu-button {
            top: 1rem;
            right: 1rem;
          }
        }

        /* Small Mobile Styles */
        @media (max-width: 480px) {
          .navbar {
            padding: 0.75rem 1rem;
          }

          .navbar.scrolled {
            padding: 0.625rem 1rem;
          }

          .logo-wrapper {
            width: 32px;
            height: 32px;
          }
          
          .navbar-logo {
            gap: 0.75rem;
          }
          
          .mobile-menu-content {
            padding: 4rem 1rem 1.25rem;
            gap: 0.625rem;
          }
          
          .mobile-menu-content > a {
            font-size: 1rem;
            padding: 0.875rem 1rem;
          }
          
          .mobile-analyze-trigger {
            font-size: 1rem;
            padding: 0.875rem 1rem;
          }
          
          .mobile-dropdown-menu {
            padding: 0.625rem;
            gap: 0.375rem;
          }
          
          .mobile-dropdown-item {
            padding: 0.625rem 0.75rem;
            gap: 0.75rem;
          }
          
          .mobile-dropdown-item-title {
            font-size: 0.9rem;
          }
          
          .mobile-dropdown-item-subtitle {
            font-size: 0.7rem;
          }
          
          .mobile-dropdown-item-icon {
            width: 28px;
            height: 28px;
          }
          
          .mobile-menu-button {
            width: 40px;
            height: 40px;
          }
          
          .close-menu-button {
            width: 40px;
            height: 40px;
            top: 0.875rem;
            right: 0.875rem;
          }
        }

        /* Extra Small Mobile Styles */
        @media (max-width: 360px) {
          .navbar {
            padding: 0.625rem 0.875rem;
          }

          .navbar.scrolled {
            padding: 0.5rem 0.875rem;
          }

          .logo-wrapper {
            width: 28px;
            height: 28px;
          }
          
          .mobile-menu-content {
            padding: 3.5rem 0.875rem 1rem;
          }
          
          .mobile-menu-content > a {
            font-size: 0.95rem;
            padding: 0.75rem 0.875rem;
          }
          
          .mobile-analyze-trigger {
            font-size: 0.95rem;
            padding: 0.75rem 0.875rem;
          }
          
          .mobile-dropdown-item {
            padding: 0.5rem 0.625rem;
          }
          
          .mobile-dropdown-item-title {
            font-size: 0.85rem;
          }
          
          .mobile-dropdown-item-subtitle {
            font-size: 0.65rem;
          }
          
          .mobile-dropdown-item-icon {
            width: 26px;
            height: 26px;
          }
        }

        /* Landscape Orientation */
        @media (max-height: 600px) and (orientation: landscape) {
          .mobile-menu-content {
            padding-top: 3.5rem;
            padding-bottom: 1rem;
            max-height: calc(100vh - 4.5rem);
          }
          
          .mobile-menu-content > a {
            padding: 0.75rem 1rem;
            font-size: 1rem;
          }
          
          .mobile-analyze-trigger {
            padding: 0.75rem 1rem;
            font-size: 1rem;
          }
          
          .mobile-dropdown-menu {
            max-height: 200px;
            overflow-y: auto;
          }
        }
      `}</style>

      <header className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="navbar-container" ref={mobileMenuRef}>
          {/* Logo */}
          <Link href="/" className="navbar-logo">
            <div className="logo-wrapper">
              <Image
                src="/logo.svg"
                alt="Thuliyam AI Logo"
                width={40}
                height={40}
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
                aria-expanded={isAnalyzeOpen}
                aria-haspopup="true"
              >
                <span>Analyze</span>
                <ChevronDown size={18} />
              </button>

              <div className={`dropdown-menu ${isAnalyzeOpen ? 'active' : ''}`} role="menu" aria-hidden={!isAnalyzeOpen}>
                <Link
                  href="/analyze/image"
                  className="dropdown-item"
                  onClick={() => setIsAnalyzeOpen(false)}
                  role="menuitem"
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
                  href="/features/about-features"
                  className="dropdown-item"
                  onClick={() => setIsAnalyzeOpen(false)}
                  role="menuitem"
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
                  href="/features/about-features"
                  className="dropdown-item"
                  onClick={() => setIsAnalyzeOpen(false)}
                  role="menuitem"
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
                  href="/features/about-features"
                  className="dropdown-item"
                  onClick={() => setIsAnalyzeOpen(false)}
                  role="menuitem"
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
          {!isMobileMenuOpen && (
            <button
              className="mobile-menu-button"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={24} />
            </button>
          )}


          {/* Mobile Menu Overlay */}
          <div className={`mobile-menu-overlay ${isMobileMenuOpen ? 'active' : ''}`}>
            <button
              className="close-menu-button"
              onClick={() => {
                setIsMobileMenuOpen(false);
                setIsMobileAnalyzeOpen(false);
              }}
              aria-label="Close menu"
            >
              <X size={24} />
            </button>

            <div className="mobile-menu-content">
              <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>
                <span>Home</span>
              </Link>
              <Link href="/about" onClick={() => setIsMobileMenuOpen(false)}>
                <span>About</span>
              </Link>

              {/* Analyze Dropdown for Mobile */}
              <div className="mobile-analyze-dropdown">
                <button
                  className="mobile-analyze-trigger"
                  onClick={() => setIsMobileAnalyzeOpen(!isMobileAnalyzeOpen)}
                  aria-expanded={isMobileAnalyzeOpen}
                  aria-haspopup="true"
                >
                  <span>Analyze</span>
                  <ChevronDown size={18} style={{
                    transform: isMobileAnalyzeOpen ? 'rotate(180deg)' : 'none',
                    transition: 'transform 0.3s ease'
                  }} />
                </button>

                {isMobileAnalyzeOpen && (
                  <div className="mobile-dropdown-menu" role="menu">
                    <Link
                      href="/analyze/image"
                      className="mobile-dropdown-item"
                      onClick={() => setIsMobileMenuOpen(false)}
                      role="menuitem"
                    >
                      <div className="mobile-dropdown-item-icon">
                        <ImageIcon size={16} />
                      </div>
                      <div className="mobile-dropdown-item-content">
                        <div className="mobile-dropdown-item-title">Image Analyze</div>
                        <div className="mobile-dropdown-item-subtitle">Analyze and process images</div>
                      </div>
                    </Link>
                    <Link
                      href="/features/about-features"
                      className="mobile-dropdown-item"
                      onClick={() => setIsMobileMenuOpen(false)}
                      role="menuitem"
                    >
                      <div className="mobile-dropdown-item-icon">
                        <MusicIcon size={16} />
                      </div>
                      <div className="mobile-dropdown-item-content">
                        <div className="mobile-dropdown-item-title">Audio Analyze</div>
                        <div className="mobile-dropdown-item-subtitle">Analyze audio files</div>
                      </div>
                    </Link>
                    <Link
                      href="/features/about-features"
                      className="mobile-dropdown-item"
                      onClick={() => setIsMobileMenuOpen(false)}
                      role="menuitem"
                    >
                      <div className="mobile-dropdown-item-icon">
                        <VideoIcon size={16} />
                      </div>
                      <div className="mobile-dropdown-item-content">
                        <div className="mobile-dropdown-item-title">Video Analyze</div>
                        <div className="mobile-dropdown-item-subtitle">Process video content</div>
                      </div>
                    </Link>
                    <Link
                      href="/features/about-features"
                      className="mobile-dropdown-item"
                      onClick={() => setIsMobileMenuOpen(false)}
                      role="menuitem"
                    >
                      <div className="mobile-dropdown-item-icon">
                        <TextIcon size={16} />
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