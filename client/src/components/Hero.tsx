import Link from "next/link";
import { Zap, Target, Lock, Brain } from "lucide-react";
import { useEffect, useRef, CSSProperties } from "react";

interface Particle {
  x: number;
  y: number;
  r: number;
  dx: number;
  dy: number;
  alpha: number;
}

const AlertCircle = ({ size = 24, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
);

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let raf: number;
    let particles: Particle[] = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      particles = [];
      const count = canvas.width < 480 ? 25 : canvas.width < 768 ? 35 : 55;
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          r: Math.random() * 1.4 + 0.3,
          dx: (Math.random() - 0.5) * 0.28,
          dy: (Math.random() - 0.5) * 0.28,
          alpha: Math.random() * 0.45 + 0.1,
        });
      }
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const connDist = canvas.width < 480 ? 80 : 120;

      particles.forEach((p) => {
        p.x += p.dx;
        p.y += p.dy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,245,160,${p.alpha})`;
        ctx.fill();
      });

      particles.forEach((a, i) => {
        particles.slice(i + 1).forEach((b) => {
          const dist = Math.hypot(a.x - b.x, a.y - b.y);
          if (dist < connDist) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(120,119,198,${0.1 * (1 - dist / connDist)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <>
      <style jsx>{`
        /* ─── keyframes ─── */
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.93); }
          to   { opacity: 1; transform: scale(1); }
        }
        @keyframes borderPulse {
          0%, 100% { border-color: rgba(0,245,160,0.18); }
          50%       { border-color: rgba(0,245,160,0.48); }
        }
        @keyframes gradientShift {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes badgeFade {
          from { opacity: 0; transform: translateY(-6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes dotPulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(0,245,160,0.5); }
          50%       { box-shadow: 0 0 0 4px rgba(0,245,160,0); }
        }

        /* ─── base ─── */
        *,
        *::before,
        *::after {
          box-sizing: border-box;
        }

        .hero {
          min-height: 100vh;
          min-height: 100dvh;
          background: linear-gradient(180deg, #07081A 0%, #111230 50%, #07081A 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: clamp(5rem, 12vw, 8rem) clamp(1rem, 5vw, 2rem) clamp(3rem, 8vw, 5rem);
          position: relative;
          overflow: hidden;
          font-family: 'Inter', sans-serif;
        }

        .hero-canvas {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 0;
        }

        .blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          pointer-events: none;
          z-index: 0;
        }
        .blob-1 {
          width: clamp(200px, 40vw, 480px);
          height: clamp(200px, 40vw, 480px);
          background: rgba(120,119,198,0.12);
          top: -80px;
          left: -60px;
        }
        .blob-2 {
          width: clamp(150px, 30vw, 360px);
          height: clamp(150px, 30vw, 360px);
          background: rgba(0,245,160,0.08);
          bottom: -60px;
          right: -40px;
        }

        /* ─── content wrapper ─── */
        .hero-content {
          max-width: 1100px;
          width: 100%;
          text-align: center;
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        /* ─── badge ─── */
        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 5px 14px;
          background: rgba(0,245,160,0.06);
          border: 1px solid rgba(0,245,160,0.2);
          border-radius: 50px;
          color: #00F5A0;
          font-size: clamp(0.7rem, 1.8vw, 0.82rem);
          font-weight: 600;
          letter-spacing: 0.7px;
          text-transform: uppercase;
          margin-bottom: clamp(1.25rem, 3vw, 2rem);
          animation: badgeFade 0.6s ease both;
          cursor: default;
          transition: border-color 0.3s, background 0.3s;
          white-space: nowrap;
        }
        .hero-badge:hover {
          background: rgba(0,245,160,0.1);
          border-color: rgba(0,245,160,0.4);
        }
        .badge-dot {
          width: 7px;
          height: 7px;
          flex-shrink: 0;
          border-radius: 50%;
          background: #00F5A0;
          animation: dotPulse 2s ease-in-out infinite;
        }

        /* ─── headline ─── */
        h1 {
          font-size: clamp(1.8rem, 5.5vw, 4rem);
          font-weight: 800;
          background: linear-gradient(135deg, #00F5A0, #7877C6 50%, #FF77C6);
          background-size: 200% 200%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          letter-spacing: -0.5px;
          line-height: 1.12;
          margin: 0 0 clamp(1rem, 2.5vw, 1.5rem);
          animation: fadeUp 0.7s ease 0.1s both, gradientShift 6s ease infinite;
          max-width: 820px;
          width: 100%;
        }

        /* ─── subtitle ─── */
        .hero-subtitle {
          font-size: clamp(0.95rem, 2.2vw, 1.15rem);
          color: rgba(255,255,255,0.58);
          max-width: 680px;
          width: 100%;
          margin: 0 0 clamp(2rem, 5vw, 3.5rem);
          line-height: 1.72;
          font-weight: 400;
          animation: fadeUp 0.7s ease 0.2s both;
          padding: 0 clamp(0px, 2vw, 1rem);
        }

        /* ─── feature cards ─── */
        .features-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: clamp(0.75rem, 2vw, 1.25rem);
          width: 100%;
          margin: 0 0 clamp(2rem, 5vw, 3.5rem);
          animation: fadeUp 0.7s ease 0.3s both;
        }

        .feature-card {
          background: rgba(255,255,255,0.03);
          border-radius: clamp(14px, 2vw, 20px);
          padding: clamp(1.25rem, 3vw, 1.75rem) clamp(1rem, 2.5vw, 1.5rem);
          border: 1px solid rgba(255,255,255,0.08);
          transition:
            transform 0.35s cubic-bezier(0.34,1.56,0.64,1),
            border-color 0.3s,
            background 0.3s,
            box-shadow 0.35s;
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          will-change: transform;
          cursor: default;
          text-align: center;
        }

        .feature-card:hover {
          background: rgba(255,255,255,0.055);
          border-color: rgba(0,245,160,0.28);
          transform: translateY(-6px) scale(1.01);
          box-shadow: 0 20px 44px rgba(0,245,160,0.09);
        }

        /* touch devices — no hover lift that gets stuck */
        @media (hover: none) {
          .feature-card:hover {
            transform: none;
            background: rgba(255,255,255,0.03);
            border-color: rgba(255,255,255,0.08);
            box-shadow: none;
          }
          .feature-card:active {
            background: rgba(255,255,255,0.06);
            border-color: rgba(0,245,160,0.25);
            transform: scale(0.98);
          }
        }

        .feature-icon {
          width: clamp(44px, 6vw, 52px);
          height: clamp(44px, 6vw, 52px);
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, rgba(0,245,160,0.12), rgba(120,119,198,0.12));
          border: 1px solid rgba(0,245,160,0.18);
          border-radius: clamp(10px, 1.5vw, 14px);
          margin: 0 auto clamp(0.9rem, 2vw, 1.25rem);
          color: #00F5A0;
          transition: background 0.3s, box-shadow 0.3s;
        }
        .feature-card:hover .feature-icon {
          background: linear-gradient(135deg, rgba(0,245,160,0.2), rgba(120,119,198,0.2));
          box-shadow: 0 0 18px rgba(0,245,160,0.14);
        }

        .feature-title {
          font-size: clamp(0.92rem, 1.8vw, 1.05rem);
          font-weight: 700;
          color: rgba(255,255,255,0.9);
          margin-bottom: 0.5rem;
          line-height: 1.3;
        }
        .feature-desc {
          font-size: clamp(0.82rem, 1.5vw, 0.9rem);
          color: rgba(255,255,255,0.5);
          line-height: 1.55;
        }

        /* ─── stats ─── */
        .stats-container {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: clamp(0.6rem, 1.5vw, 1.25rem);
          width: 100%;
          margin: 0 0 clamp(2rem, 5vw, 3.5rem);
          animation: scaleIn 0.7s ease 0.4s both;
        }

        .stat-item {
          text-align: center;
          padding: clamp(1rem, 2.5vw, 1.5rem) clamp(0.75rem, 2vw, 1.5rem);
          background: rgba(255,255,255,0.025);
          border-radius: clamp(12px, 2vw, 16px);
          border: 1px solid rgba(255,255,255,0.07);
          transition:
            transform 0.3s cubic-bezier(0.34,1.56,0.64,1),
            border-color 0.3s,
            background 0.3s;
          cursor: default;
          animation: borderPulse 4s ease-in-out infinite;
          animation-delay: calc(var(--i, 0) * 0.8s);
        }
        .stat-item:hover {
          background: rgba(255,255,255,0.05);
          transform: translateY(-4px) scale(1.02);
          border-color: rgba(0,245,160,0.35);
          animation-play-state: paused;
        }
        @media (hover: none) {
          .stat-item:hover { transform: none; }
          .stat-item:active { transform: scale(0.97); }
        }

        .stat-value {
          font-size: clamp(1.6rem, 3.5vw, 2.4rem);
          font-weight: 800;
          background: linear-gradient(135deg, #00F5A0, #7877C6);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          line-height: 1.1;
          margin-bottom: 0.3rem;
        }
        .stat-label {
          font-size: clamp(0.65rem, 1.2vw, 0.78rem);
          color: rgba(255,255,255,0.42);
          text-transform: uppercase;
          letter-spacing: 1px;
          font-weight: 500;
          line-height: 1.3;
        }

        /* ─── CTA buttons ─── */
        .hero-actions {
          display: flex;
          gap: clamp(0.75rem, 2vw, 1.25rem);
          justify-content: center;
          margin: 0 0 clamp(2rem, 5vw, 3.5rem);
          animation: fadeUp 0.7s ease 0.5s both;
          flex-wrap: wrap;
          width: 100%;
        }

        .oval-btn {
          position: relative;
          padding: clamp(0.8rem, 2vw, 0.95rem) clamp(1.75rem, 4vw, 2.5rem);
          background: linear-gradient(135deg, #00F5A0 0%, #7877C6 100%);
          color: #07081A;
          font-weight: 700;
          font-size: clamp(0.9rem, 2vw, 1rem);
          border: none;
          border-radius: 50px;
          cursor: pointer;
          transition:
            transform 0.25s cubic-bezier(0.34,1.56,0.64,1),
            box-shadow 0.25s;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          text-decoration: none;
          min-width: clamp(150px, 35vw, 190px);
          box-shadow: 0 8px 24px rgba(0,245,160,0.25), 0 2px 8px rgba(0,0,0,0.3);
          overflow: hidden;
          -webkit-tap-highlight-color: transparent;
          touch-action: manipulation;
        }
        .oval-btn::after {
          content: '';
          position: absolute;
          inset: 0;
          background: rgba(255,255,255,0);
          transition: background 0.2s;
          border-radius: 50px;
        }
        .oval-btn:hover {
          transform: translateY(-3px) scale(1.02);
          box-shadow: 0 16px 36px rgba(0,245,160,0.35), 0 4px 12px rgba(0,0,0,0.3);
        }
        .oval-btn:hover::after { background: rgba(255,255,255,0.08); }
        .oval-btn:active {
          transform: translateY(0) scale(0.97);
          box-shadow: 0 6px 16px rgba(0,245,160,0.2);
        }
        .oval-btn span { position: relative; z-index: 1; }

        .btn-secondary {
          padding: clamp(0.8rem, 2vw, 0.95rem) clamp(1.5rem, 3.5vw, 2.2rem);
          background: rgba(255,255,255,0.04);
          color: rgba(255,255,255,0.85);
          font-weight: 600;
          font-size: clamp(0.9rem, 2vw, 1rem);
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 50px;
          cursor: pointer;
          transition:
            transform 0.25s cubic-bezier(0.34,1.56,0.64,1),
            background 0.25s, border-color 0.25s, color 0.2s, box-shadow 0.25s;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          text-decoration: none;
          min-width: clamp(130px, 28vw, 160px);
          -webkit-tap-highlight-color: transparent;
          touch-action: manipulation;
        }
        .btn-secondary:hover {
          background: rgba(255,255,255,0.08);
          color: white;
          border-color: rgba(255,255,255,0.22);
          transform: translateY(-3px) scale(1.02);
          box-shadow: 0 10px 24px rgba(0,0,0,0.2);
        }
        .btn-secondary:active { transform: translateY(0) scale(0.97); }

        /* ─── disclaimer ─── */
        .hero-disclaimer {
          display: inline-flex;
          align-items: flex-start;
          gap: 0.65rem;
          padding: clamp(0.75rem, 2vw, 1rem) clamp(1rem, 3vw, 1.5rem);
          background: rgba(255,71,87,0.07);
          border: 1px solid rgba(255,107,157,0.18);
          border-radius: 12px;
          color: rgba(255,255,255,0.52);
          font-size: clamp(0.8rem, 1.8vw, 0.88rem);
          line-height: 1.55;
          animation: fadeUp 0.7s ease 0.6s both;
          max-width: 580px;
          width: 100%;
          text-align: left;
        }
        .disclaimer-icon {
          color: #FF6B9D;
          flex-shrink: 0;
          opacity: 0.9;
          margin-top: 1px;
        }

        /* ═══════════════════════════════
           RESPONSIVE BREAKPOINTS
        ═══════════════════════════════ */

        /* Large tablets / small laptops  (≤1024px) */
        @media (max-width: 1024px) {
          .features-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .stats-container {
            grid-template-columns: repeat(4, 1fr);
          }
        }

        /* Tablets portrait  (≤768px) */
        @media (max-width: 768px) {
          .features-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 0.85rem;
          }
          .stats-container {
            grid-template-columns: repeat(2, 1fr);
            gap: 0.75rem;
          }
          .hero-actions {
            flex-direction: row;
            justify-content: center;
          }
          .oval-btn, .btn-secondary {
            flex: 1 1 140px;
            max-width: 240px;
          }
        }

        /* Large phones  (≤600px) */
        @media (max-width: 600px) {
          .hero-actions {
            flex-direction: column;
            align-items: stretch;
          }
          .oval-btn, .btn-secondary {
            width: 100%;
            max-width: 100%;
            min-width: unset;
            padding: 1rem 1.5rem;
          }
          .hero-disclaimer {
            text-align: left;
          }
        }

        /* Small phones  (≤480px) */
        @media (max-width: 480px) {
          .features-grid {
            grid-template-columns: 1fr 1fr;
            gap: 0.65rem;
          }
          .feature-card {
            padding: 1.1rem 0.85rem;
          }
          .feature-icon {
            width: 40px;
            height: 40px;
            border-radius: 10px;
            margin-bottom: 0.75rem;
          }
          .stats-container {
            grid-template-columns: repeat(2, 1fr);
            gap: 0.6rem;
          }
        }

        /* Very small phones  (≤360px) */
        @media (max-width: 360px) {
          .features-grid {
            grid-template-columns: 1fr;
          }
          .stats-container {
            grid-template-columns: repeat(2, 1fr);
          }
          .hero-badge {
            font-size: 0.68rem;
            padding: 4px 12px;
          }
        }

        /* Landscape phones */
        @media (max-width: 812px) and (orientation: landscape) and (max-height: 450px) {
          .hero {
            padding: 2rem 1.5rem;
            min-height: unset;
          }
          .features-grid {
            grid-template-columns: repeat(4, 1fr);
            gap: 0.6rem;
          }
          .feature-card { padding: 0.9rem 0.75rem; }
          .stats-container {
            grid-template-columns: repeat(4, 1fr);
            gap: 0.6rem;
          }
          .hero-actions {
            flex-direction: row;
          }
          .oval-btn, .btn-secondary {
            flex: 0 0 auto;
            min-width: 160px;
          }
        }

        /* Reduce motion */
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>

      <section className="hero">
        <div className="blob blob-1" />
        <div className="blob blob-2" />
        <canvas ref={canvasRef} className="hero-canvas" aria-hidden="true" />

        <div className="hero-content">

          {/* badge */}
          <div className="hero-badge">
            <span className="badge-dot" aria-hidden="true" />
            AI-Powered Detection
          </div>

          {/* headline */}
          <h1>AI-Powered Authenticity Detection</h1>

          <p className="hero-subtitle">
            Thuliyam AI helps identify AI-generated and manipulated contents using
            advanced machine learning models. Results are probabilistic and
            designed to assist human decision-making.
          </p>

          {/* feature cards */}
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon"><Brain size={22} /></div>
              <h3 className="feature-title">Advanced AI Models</h3>
              <p className="feature-desc">State-of-the-art neural networks trained on millions of images</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon"><Target size={22} /></div>
              <h3 className="feature-title">High Accuracy</h3>
              <p className="feature-desc">93.7% detection rate for synthetic images</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon"><Zap size={22} /></div>
              <h3 className="feature-title">Real-Time Analysis</h3>
              <p className="feature-desc">Get results in seconds with our optimized processing</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon"><Lock size={22} /></div>
              <h3 className="feature-title">Secure & Private</h3>
              <p className="feature-desc">End-to-end encryption with no data storage</p>
            </div>
          </div>

          {/* stats */}
          <div className="stats-container">
            {[
              { val: "93.7%", label: "Accuracy Rate",       i: 0 },
              { val: "19K+",  label: "Test Images",          i: 1 },
              { val: "24/7",  label: "Real-time Monitoring", i: 2 },
              { val: "<3s",   label: "Avg. Response Time",   i: 3 },
            ].map(({ val, label, i }) => (
              <div className="stat-item" key={label} style={{ "--i": i } as CSSProperties}>
                <div className="stat-value">{val}</div>
                <div className="stat-label">{label}</div>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="hero-actions">
            <Link href="/upload" className="oval-btn">
              <span>Analyze Image</span>
            </Link>
            <Link href="/about" className="btn-secondary">
              <span>Learn More</span>
            </Link>
          </div>

          {/* disclaimer */}
          <p className="hero-disclaimer">
            <AlertCircle className="disclaimer-icon" size={16} />
            Results may occasionally be incorrect. Always verify with additional evidence.
          </p>

        </div>
      </section>
    </>
  );
}