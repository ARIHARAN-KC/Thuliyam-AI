"use client";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ChevronDown, ImageIcon, VideoIcon, MusicIcon, TextIcon } from "lucide-react";
import { useState, useEffect, useRef, CSSProperties } from "react";
import { createPortal } from "react-dom";

interface NavItem {
  href: string;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
}

const analyzeItems: NavItem[] = [
  { href: "/analyze/image",           icon: <ImageIcon size={18} />, title: "Image Analyze",  subtitle: "Analyze and process images"  },
  { href: "/features/about-features", icon: <MusicIcon size={18} />, title: "Audio Analyze",  subtitle: "Analyze audio files"         },
  { href: "/analyze/video",           icon: <VideoIcon size={18} />, title: "Video Analyze",  subtitle: "Process video content"       },
  { href: "/features/about-features", icon: <TextIcon  size={18} />, title: "Text Analyze",   subtitle: "Process text content"        },
];

export default function Navbar() {
  const [isScrolled,          setIsScrolled]          = useState(false);
  const [isMobileMenuOpen,    setIsMobileMenuOpen]    = useState(false);
  const [isAnalyzeOpen,       setIsAnalyzeOpen]       = useState(false);
  const [isMobileAnalyzeOpen, setIsMobileAnalyzeOpen] = useState(false);
  const [mounted,             setMounted]             = useState(false);

  const analyzeDropdownRef = useRef<HTMLDivElement>(null);

  // portal mount guard (SSR safe)
  useEffect(() => { setMounted(true); }, []);

  // scroll detection
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // close desktop dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (analyzeDropdownRef.current && !analyzeDropdownRef.current.contains(e.target as Node)) {
        setIsAnalyzeOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // body scroll lock + escape for mobile menu
  useEffect(() => {
    if (!isMobileMenuOpen) {
      document.body.style.overflow = "";
      return;
    }
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") closeMobile(); };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const closeMobile = () => {
    setIsMobileMenuOpen(false);
    setIsMobileAnalyzeOpen(false);
  };

  // Mobile overlay — rendered via portal directly into <body>
  const mobileOverlay = (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(7,8,26,0.97)",
        backdropFilter: "blur(18px)",
        WebkitBackdropFilter: "blur(18px)",
        zIndex: 9999,
        display: "flex",
        flexDirection: "column" as const,
        opacity: isMobileMenuOpen ? 1 : 0,
        visibility: isMobileMenuOpen ? "visible" : "hidden",
        pointerEvents: isMobileMenuOpen ? "all" : "none",
        transition: "opacity 0.28s ease, visibility 0.28s ease",
        overflowY: "auto" as const,
        WebkitOverflowScrolling: "touch" as never,
      }}
      aria-hidden={!isMobileMenuOpen}
    >
      {/* Header row inside overlay */}
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "clamp(0.75rem,3vw,1rem) clamp(1rem,4vw,1.5rem)",
        borderBottom: "1px solid rgba(255,255,255,0.07)",
        flexShrink: 0,
      }}>
        <Link href="/" onClick={closeMobile} aria-label="Home" style={{ display: "flex", alignItems: "center", gap: "0.5rem", textDecoration: "none" }}>
          <Image src="/logo.svg" alt="Thuliyam AI" width={32} height={32} priority />
        </Link>
        <button
          onClick={closeMobile}
          aria-label="Close menu"
          style={{
            width: 40, height: 40,
            display: "flex", alignItems: "center", justifyContent: "center",
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: 10,
            color: "#fff",
            cursor: "pointer",
            WebkitTapHighlightColor: "transparent",
          }}
        >
          <X size={20} />
        </button>
      </div>

      {/* Nav items */}
      <nav style={{ display: "flex", flexDirection: "column", gap: "0.6rem", padding: "clamp(1rem,4vw,1.5rem)" }}>
        {[{ href: "/", label: "Home" }, { href: "/about", label: "About" }].map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={closeMobile}
            style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              padding: "clamp(0.85rem,2.5vw,1rem) clamp(1rem,3vw,1.25rem)",
              color: "rgba(255,255,255,0.88)",
              textDecoration: "none",
              fontSize: "clamp(1rem,3.5vw,1.15rem)",
              fontWeight: 500,
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 14,
              WebkitTapHighlightColor: "transparent",
            }}
          >
            {item.label}
          </Link>
        ))}

        {/* Analyze accordion */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <button
            onClick={() => setIsMobileAnalyzeOpen((v) => !v)}
            aria-expanded={isMobileAnalyzeOpen}
            style={{
              width: "100%",
              display: "flex", alignItems: "center", justifyContent: "space-between",
              padding: "clamp(0.85rem,2.5vw,1rem) clamp(1rem,3vw,1.25rem)",
              background: "linear-gradient(135deg,#00F5A0,#7877C6)",
              color: "#07081A",
              fontSize: "clamp(1rem,3.5vw,1.15rem)",
              fontWeight: 700,
              border: "none",
              borderRadius: isMobileAnalyzeOpen ? "14px 14px 0 0" : 14,
              cursor: "pointer",
              transition: "border-radius 0.2s",
              WebkitTapHighlightColor: "transparent",
              touchAction: "manipulation",
            }}
          >
            Analyze
            <ChevronDown
              size={18}
              style={{ transition: "transform 0.3s", transform: isMobileAnalyzeOpen ? "rotate(180deg)" : "none" } as CSSProperties}
            />
          </button>

          {isMobileAnalyzeOpen && (
            <div style={{
              background: "rgba(20,22,48,0.97)",
              border: "1px solid rgba(0,245,160,0.22)",
              borderTop: "none",
              borderRadius: "0 0 14px 14px",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
            }}>
              {analyzeItems.map((item) => (
                <Link
                  key={item.href + item.title}
                  href={item.href}
                  onClick={closeMobile}
                  style={{
                    display: "flex", alignItems: "center",
                    gap: "clamp(0.75rem,2vw,1rem)",
                    padding: "clamp(0.75rem,2.5vw,0.95rem) clamp(1rem,3vw,1.25rem)",
                    color: "rgba(255,255,255,0.88)",
                    textDecoration: "none",
                    borderBottom: "1px solid rgba(255,255,255,0.05)",
                    WebkitTapHighlightColor: "transparent",
                  }}
                >
                  <span style={{
                    width: "clamp(28px,6vw,34px)", height: "clamp(28px,6vw,34px)",
                    flexShrink: 0,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    background: "rgba(0,245,160,0.08)",
                    border: "1px solid rgba(0,245,160,0.18)",
                    borderRadius: 8,
                    color: "#00F5A0",
                  }}>
                    {item.icon}
                  </span>
                  <span>
                    <div style={{ fontSize: "clamp(0.9rem,2.8vw,1rem)", fontWeight: 600, color: "#fff", lineHeight: 1.2 }}>{item.title}</div>
                    <div style={{ fontSize: "clamp(0.72rem,2vw,0.8rem)", color: "rgba(255,255,255,0.45)", marginTop: 2 }}>{item.subtitle}</div>
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </nav>
    </div>
  );

  return (
    <>
      <style jsx>{`
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes dropIn {
          from { opacity: 0; transform: translateX(-50%) translateY(-8px) scale(0.96); }
          to   { opacity: 1; transform: translateX(-50%) translateY(0) scale(1); }
        }

        *, *::before, *::after { box-sizing: border-box; }

        .navbar {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 1000;
          padding: clamp(0.6rem,2vw,1rem) clamp(1rem,4vw,1.5rem);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          background: rgba(7,8,26,0.82);
          border-bottom: none;
          transition: background 0.35s, box-shadow 0.35s, padding 0.35s;
          animation: slideDown 0.5s ease-out both;
        }
        .navbar.scrolled {
          background: rgba(7,8,26,0.97);
          box-shadow: 0 8px 32px rgba(0,0,0,0.5);
          padding-top: clamp(0.5rem,1.5vw,0.7rem);
          padding-bottom: clamp(0.5rem,1.5vw,0.7rem);
        }

        .navbar-container {
          max-width: 1400px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
        }

        .navbar-logo {
          display: flex; align-items: center;
          gap: clamp(0.5rem,1.5vw,0.875rem);
          text-decoration: none; flex-shrink: 0;
        }
        .logo-wrapper {
          width: clamp(28px,5vw,40px);
          height: clamp(28px,5vw,40px);
          flex-shrink: 0;
        }
        .logo-image { width: 100%; height: 100%; object-fit: contain; }

        /* desktop links */
        .navbar-links {
          display: none;
          align-items: center;
          gap: clamp(1.5rem,3vw,2.5rem);
        }
        .navbar-links a {
          color: rgba(255,255,255,0.85);
          text-decoration: none;
          font-weight: 500;
          font-size: clamp(0.88rem,1.4vw,1rem);
          padding: 0.4rem 0;
          position: relative;
          white-space: nowrap;
          transition: color 0.25s;
        }
        .navbar-links a::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0;
          width: 0; height: 2px;
          background: linear-gradient(90deg,#00F5A0,#7877C6);
          transition: width 0.3s;
        }
        .navbar-links a:hover { color: #fff; }
        .navbar-links a:hover::after { width: 100%; }

        /* analyze dropdown */
        .analyze-dropdown { position: relative; }
        .analyze-trigger {
          display: inline-flex; align-items: center; gap: 0.4rem;
          padding: clamp(0.55rem,1.2vw,0.72rem) clamp(1rem,2vw,1.25rem);
          background: linear-gradient(135deg,#00F5A0,#7877C6);
          color: #07081A;
          font-weight: 700;
          font-size: clamp(0.85rem,1.4vw,0.95rem);
          border: none; border-radius: 12px;
          cursor: pointer; white-space: nowrap;
          transition: transform 0.25s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.25s;
          -webkit-tap-highlight-color: transparent;
        }
        .analyze-trigger:hover { transform: translateY(-2px); box-shadow: 0 12px 28px rgba(0,245,160,0.28); }
        .analyze-trigger:active { transform: scale(0.97); }

        .chevron { transition: transform 0.3s; flex-shrink: 0; }
        .chevron.open { transform: rotate(180deg); }

        .dropdown-menu {
          position: absolute;
          top: calc(100% + 10px);
          left: 50%;
          transform: translateX(-50%) scale(0.95);
          background: rgba(20,22,48,0.98);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border: 1px solid rgba(0,245,160,0.3);
          border-radius: 16px;
          padding: 0.75rem;
          min-width: clamp(240px,30vw,290px);
          opacity: 0; visibility: hidden;
          transition: opacity 0.25s, visibility 0.25s, transform 0.25s cubic-bezier(0.4,0,0.2,1);
          z-index: 1001;
          box-shadow: 0 20px 48px rgba(0,0,0,0.5);
        }
        .dropdown-menu.active {
          opacity: 1; visibility: visible;
          transform: translateX(-50%) scale(1);
          animation: dropIn 0.25s ease-out both;
        }
        .dropdown-menu::before {
          content: '';
          position: absolute;
          top: -7px; left: 50%;
          transform: translateX(-50%);
          border: 7px solid transparent;
          border-top: 0;
          border-bottom-color: rgba(20,22,48,0.98);
          filter: drop-shadow(0 -1px 0 rgba(0,245,160,0.3));
        }
        .dropdown-item {
          display: flex; align-items: center; gap: 0.875rem;
          padding: 0.85rem 1rem;
          color: #fff; text-decoration: none;
          border-radius: 10px;
          transition: background 0.2s, transform 0.2s;
        }
        .dropdown-item:hover {
          background: linear-gradient(90deg,rgba(0,245,160,0.12),rgba(120,119,198,0.12));
          transform: translateX(3px);
        }
        .dropdown-item-icon {
          width: 34px; height: 34px; flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
          background: rgba(0,245,160,0.08);
          border: 1px solid rgba(0,245,160,0.18);
          border-radius: 9px; color: #00F5A0;
          transition: background 0.2s, border-color 0.2s, transform 0.2s;
        }
        .dropdown-item:hover .dropdown-item-icon {
          background: rgba(0,245,160,0.18);
          border-color: rgba(0,245,160,0.4);
          transform: scale(1.08);
        }
        .dropdown-item-title { font-size: 0.95rem; font-weight: 600; color: #fff; transition: color 0.2s; }
        .dropdown-item:hover .dropdown-item-title { color: #00F5A0; }
        .dropdown-item-subtitle { font-size: 0.8rem; color: rgba(255,255,255,0.5); margin-top: 2px; }

        /* hamburger — hidden by default, shown on mobile */
        .mobile-menu-button {
          display: none;
          align-items: center; justify-content: center;
          width: clamp(38px,8vw,44px);
          height: clamp(38px,8vw,44px);
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 10px;
          color: #fff; cursor: pointer;
          flex-shrink: 0;
          -webkit-tap-highlight-color: transparent;
          touch-action: manipulation;
          transition: background 0.2s, border-color 0.2s;
        }
        .mobile-menu-button:hover { background: rgba(0,245,160,0.1); border-color: rgba(0,245,160,0.3); }
        .mobile-menu-button:active { transform: scale(0.95); }

        /* show/hide breakpoints */
        @media (min-width: 769px) {
          .navbar-links { display: flex !important; }
          .mobile-menu-button { display: none !important; }
        }
        @media (max-width: 768px) {
          .navbar-links { display: none !important; }
          .mobile-menu-button { display: flex !important; }
        }

        @media (max-width: 1024px) and (min-width: 769px) {
          .navbar-links { gap: 1.5rem; }
          .dropdown-menu { min-width: 240px; }
        }

        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>

      <header className={`navbar ${isScrolled ? "scrolled" : ""}`}>
        <div className="navbar-container">

          <Link href="/" className="navbar-logo" aria-label="Thuliyam AI home">
            <div className="logo-wrapper">
              <Image src="/logo.svg" alt="Thuliyam AI" width={40} height={40} className="logo-image" priority />
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="navbar-links" aria-label="Main navigation">
            <Link href="/">Home</Link>
            <Link href="/about">About</Link>

            <div className="analyze-dropdown" ref={analyzeDropdownRef}>
              <button
                className="analyze-trigger"
                onClick={() => setIsAnalyzeOpen((v) => !v)}
                aria-expanded={isAnalyzeOpen}
                aria-haspopup="true"
              >
                Analyze
                <ChevronDown size={16} className={`chevron ${isAnalyzeOpen ? "open" : ""}`} />
              </button>
              <div className={`dropdown-menu ${isAnalyzeOpen ? "active" : ""}`} role="menu">
                {analyzeItems.map((item) => (
                  <Link key={item.href + item.title} href={item.href} className="dropdown-item"
                    onClick={() => setIsAnalyzeOpen(false)} role="menuitem">
                    <div className="dropdown-item-icon">{item.icon}</div>
                    <div>
                      <div className="dropdown-item-title">{item.title}</div>
                      <div className="dropdown-item-subtitle">{item.subtitle}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </nav>

          {/* Hamburger */}
          <button
            className="mobile-menu-button"
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open navigation menu"
            aria-expanded={isMobileMenuOpen}
          >
            <Menu size={22} />
          </button>

        </div>
      </header>

      {/* Mobile overlay — portalled directly into <body>, outside header */}
      {mounted && createPortal(mobileOverlay, document.body)}
    </>
  );
}