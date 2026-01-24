import Link from "next/link";
import Image from "next/image";
import { Menu, X, Shield } from "lucide-react";
import { useState, useEffect } from "react";

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

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
          background: ${isScrolled ? 'rgba(16, 18, 40, 0.9)' : 'rgba(16, 18, 40, 0.5)'};
          border-bottom: 1px solid ${isScrolled ? 'rgba(0, 245, 160, 0.2)' : 'rgba(255, 255, 255, 0.1)'};
          animation: slideDown 0.6s ease-out;
        }

        .navbar.scrolled {
          background: rgba(16, 18, 40, 0.95);
          border-bottom: 1px solid rgba(0, 245, 160, 0.3);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
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

        .btn-outline {
          padding: 0.8rem 2rem;
          background: transparent;
          color: #ffffff;
          font-weight: 600;
          font-size: 0.95rem;
          border: 2px solid #00F5A0;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 0.8rem;
          text-decoration: none;
          position: relative;
          overflow: hidden;
        }

        .btn-outline::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, #00F5A0, #7877C6);
          opacity: 0;
          transition: opacity 0.3s ease;
          z-index: -1;
        }

        .btn-outline:hover::before {
          opacity: 0.1;
        }

        .btn-outline:hover {
          color: #ffffff;
          border-color: #7877C6;
          transform: translateY(-2px);
          box-shadow: 0 10px 20px rgba(0, 245, 160, 0.2);
        }

        .btn-primary {
          padding: 0.8rem 2rem;
          background: linear-gradient(135deg, #00F5A0 0%, #7877C6 100%);
          color: #ffffff;
          font-weight: 600;
          font-size: 0.95rem;
          border: none;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 0.8rem;
          text-decoration: none;
          position: relative;
          overflow: hidden;
        }

        .btn-primary::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, #7877C6 0%, #FF77C6 100%);
          opacity: 0;
          transition: opacity 0.3s ease;
          z-index: -1;
        }

        .btn-primary:hover::before {
          opacity: 1;
        }

        .btn-primary span {
          position: relative;
          z-index: 2;
        }

        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 15px 30px rgba(0, 245, 160, 0.3);
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
          background: rgba(10, 11, 30, 0.95);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
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
          gap: 2rem;
          width: 90%;
          max-width: 400px;
        }

        .mobile-menu-content a {
          color: #ffffff;
          text-decoration: none;
          font-size: 1.5rem;
          font-weight: 600;
          padding: 1rem 2rem;
          width: 100%;
          text-align: center;
          border-radius: 16px;
          transition: all 0.3s ease;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .mobile-menu-content a:hover {
          color: #ffffff;
          background: rgba(0, 245, 160, 0.1);
          border-color: rgba(0, 245, 160, 0.3);
          transform: translateY(-2px);
        }

        .mobile-menu-content .btn-outline {
          font-size: 1.3rem;
          padding: 1.2rem 2rem;
          justify-content: center;
        }

        .mobile-menu-content .btn-primary {
          font-size: 1.3rem;
          padding: 1.2rem 2rem;
          justify-content: center;
        }

        .close-menu-button {
          position: absolute;
          top: 2rem;
          right: 2rem;
          background: transparent;
          border: none;
          color: #ffffff;
          cursor: pointer;
          padding: 0.5rem;
          z-index: 1002;
        }

        .user-menu {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .user-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: linear-gradient(135deg, #00F5A0, #7877C6);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #ffffff;
          font-weight: 600;
          border: 2px solid rgba(255, 255, 255, 0.1);
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .user-avatar:hover {
          transform: scale(1.05);
          border-color: rgba(0, 245, 160, 0.5);
        }

        .badge {
          background: linear-gradient(135deg, #FF4757, #FF6B9D);
          color: #ffffff;
          font-size: 0.7rem;
          font-weight: 700;
          padding: 0.2rem 0.6rem;
          border-radius: 10px;
          position: absolute;
          top: -5px;
          right: -5px;
        }

        @media (max-width: 1024px) {
          .navbar-links {
            gap: 2rem;
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
        }

        @media (max-width: 360px) {
          .navbar-logo {
            gap: 0.8rem;
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
                        <div className="user-menu">
                            <Link href="/upload" className="btn-outline">
                                <span>Analyze</span>
                            </Link>
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
                                <Shield size={20} />
                                <span>Home</span>
                            </Link>
                            <Link href="/about" onClick={() => setIsMobileMenuOpen(false)}>
                                <span>About</span>
                            </Link>
                            <Link
                                href="/upload"
                                className="btn-primary"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                <span>Analyze Image</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
}