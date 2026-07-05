"use client";
import { useState, useEffect, useRef } from "react";
import { Upload, Shield, RefreshCw, AlertCircle, CheckCircle, Film, Clock, FileVideo } from "lucide-react";
import Image from "next/image";

interface ApiResponse {
  success: boolean;
  label: string;
  confidence: number;
  scores?: { fake: number; real: number };
}

interface PredictionResult {
  label: string;
  confidence: number;
}

interface PieChartProps {
  confidence: number;
  label: string;
}

interface VideoMetadata {
  duration: number;
  dimensions: { width: number; height: number };
  size: string;
}

/* ── Pie Chart ── */
function PieChart({ confidence, label }: PieChartProps) {
  const scaled  = Math.min(100, Math.max(0, confidence * 100));
  const realPct = label === "real" ? scaled : 100 - scaled;
  const fakePct = 100 - realPct;
  const radius  = 70;
  const circ    = 2 * Math.PI * radius;
  const stroke  = (realPct / 100) * circ;
  const isReal  = label === "real";
  const color   = isReal ? "#00F5A0" : "#FF6B9D";

  return (
    <div style={{ display:"flex", flexDirection:"column", alignItems:"center", width:"100%", gap:"1.25rem" }}>
      <svg viewBox="0 0 200 200" style={{ width:"100%", maxWidth:200 }}>
        <defs>
          <linearGradient id="rg2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00F5A0" /><stop offset="100%" stopColor="#00D4AA" />
          </linearGradient>
          <linearGradient id="fg2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF6B9D" /><stop offset="100%" stopColor="#FF4757" />
          </linearGradient>
        </defs>
        <circle cx="100" cy="100" r={radius} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="14" />
        <circle cx="100" cy="100" r={radius} fill="none"
          stroke={isReal ? "url(#rg2)" : "url(#fg2)"}
          strokeWidth="14"
          strokeDasharray={`${stroke} ${circ}`}
          transform="rotate(-90 100 100)"
          strokeLinecap="round"
          style={{ transition:"stroke-dasharray 0.8s ease" }}
        />
        <text x="100" y="93" textAnchor="middle" fontSize="11" fontWeight="600" fill="rgba(255,255,255,0.55)">CONFIDENCE</text>
        <text x="100" y="122" textAnchor="middle" fontSize="30" fontWeight="800" fill={color}>{scaled.toFixed(1)}%</text>
      </svg>

      <div style={{ display:"flex", gap:"0.75rem", flexWrap:"wrap", justifyContent:"center", width:"100%" }}>
        {[
          { label:"REAL", pct:realPct, color:"#00F5A0", bg:"rgba(0,245,160,0.08)",    border:"rgba(0,245,160,0.2)"    },
          { label:"FAKE", pct:fakePct, color:"#FF6B9D", bg:"rgba(255,107,157,0.08)", border:"rgba(255,107,157,0.2)" },
        ].map(item => (
          <div key={item.label} style={{
            flex:"1 1 110px", minWidth:100,
            padding:"0.7rem 0.875rem",
            background:item.bg, border:`1px solid ${item.border}`,
            borderRadius:12,
            display:"flex", alignItems:"center", gap:"0.55rem",
          }}>
            <div style={{ width:11, height:11, borderRadius:"50%", background:item.color,
              flexShrink:0, boxShadow:`0 0 8px ${item.color}` }} />
            <div>
              <div style={{ fontSize:"0.62rem", color:"rgba(255,255,255,0.5)", fontWeight:600, letterSpacing:"0.8px" }}>{item.label}</div>
              <div style={{ fontSize:"1.05rem", fontWeight:800, color:"#fff" }}>{item.pct.toFixed(1)}%</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Main Component ── */
export default function VideoUpload() {
  const [file,           setFile]           = useState<File | null>(null);
  const [preview,        setPreview]        = useState<string | null>(null);
  const [loading,        setLoading]        = useState(false);
  const [result,         setResult]         = useState<PredictionResult | null>(null);
  const [error,          setError]          = useState("");
  const [isDragging,     setIsDragging]     = useState(false);
  const [scanProgress,   setScanProgress]   = useState(0);
  const [videoMetadata,  setVideoMetadata]  = useState<VideoMetadata | null>(null);
  const [isPlaying,      setIsPlaying]      = useState(false);

  const videoRef     = useRef<HTMLVideoElement | null>(null);
  const abortRef     = useRef<AbortController | null>(null);
  const lastSubmitRef = useRef<number>(0);
  const COOLDOWN     = 3000;

  /* cleanup */
  const cleanup = () => {
    if (preview?.startsWith("blob:")) URL.revokeObjectURL(preview);
    if (abortRef.current) { abortRef.current.abort(); abortRef.current = null; }
  };

  useEffect(() => () => { cleanup(); }, []);

  /* scan progress */
  useEffect(() => {
    if (!loading) { setScanProgress(0); return; }
    const iv = setInterval(() => setScanProgress(p => p >= 90 ? (clearInterval(iv), 90) : p + 8), 250);
    return () => clearInterval(iv);
  }, [loading]);

  /* validation */
  const validate = (f: File): { valid: boolean; error?: string } => {
    const types = ["video/mp4","video/quicktime","video/x-msvideo","video/webm"];
    if (!types.includes(f.type.toLowerCase())) return { valid:false, error:"Only MP4, MOV, AVI, WebM allowed" };
    if (f.size > 100*1024*1024) return { valid:false, error:"Max file size is 100 MB" };
    if (f.size === 0) return { valid:false, error:"File is empty" };
    const exts = [".mp4",".mov",".avi",".webm"];
    if (!exts.some(e => f.name.toLowerCase().endsWith(e))) return { valid:false, error:"Invalid file extension" };
    return { valid:true };
  };

  const handleFile = (f: File) => {
    const v = validate(f);
    if (!v.valid) { setError(v.error || "Invalid file"); return; }
    cleanup();
    setFile(f); setError(""); setResult(null); setVideoMetadata(null); setIsPlaying(false);
    setPreview(URL.createObjectURL(f));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]; if (f) handleFile(f);
  };
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault(); setIsDragging(false);
    const f = e.dataTransfer.files[0];
    if (f) handleFile(f); else setError("Please upload a valid video file");
  };

  const handleVideoLoaded = () => {
    if (videoRef.current && file) {
      setVideoMetadata({
        duration: videoRef.current.duration,
        dimensions: { width: videoRef.current.videoWidth, height: videoRef.current.videoHeight },
        size: (file.size/(1024*1024)).toFixed(2) + " MB",
      });
    }
  };

  const formatDuration = (s: number) =>
    `${Math.floor(s/60)}:${Math.floor(s%60).toString().padStart(2,"0")}`;

  const handleSubmit = async () => {
    const now = Date.now();
    if (now - lastSubmitRef.current < COOLDOWN) { setError("Please wait before resubmitting"); return; }
    if (!file) { setError("Please select a video"); return; }
    const v = validate(file);
    if (!v.valid) { setError(v.error || "Invalid file"); return; }

    setLoading(true); setError(""); setResult(null); setScanProgress(0);
    lastSubmitRef.current = now;
    abortRef.current = new AbortController();

    const form = new FormData();
    form.append("file", file);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      if (!apiUrl) throw new Error("API URL not configured");
      if (process.env.NODE_ENV === "production" && !apiUrl.startsWith("https://"))
        throw new Error("Secure connection required");

      const res = await fetch(`${apiUrl}/predict/video`, {
        method:"POST", body:form,
        signal:abortRef.current.signal,
        headers:{ "X-Requested-With":"XMLHttpRequest" },
      });

      if (!res.ok) {
        if (res.status === 429) throw new Error("Too many requests. Try again later.");
        if (res.status === 413) throw new Error("File too large. Upload a smaller video.");
        if (res.status === 415) throw new Error("Unsupported format. Upload a valid video.");
        throw new Error(`Request failed: ${res.status}`);
      }
      const ct = res.headers.get("content-type");
      if (!ct?.includes("application/json")) throw new Error("Invalid response format");

      const data: ApiResponse = await res.json();
      if (!data?.success) throw new Error("API request unsuccessful");

      const label = data.label.toLowerCase();
      if (!["real","fake"].includes(label)) throw new Error("Invalid label from API");
      if (typeof data.confidence !== "number" || data.confidence < 0 || data.confidence > 1)
        throw new Error("Invalid confidence value");

      setResult({ label, confidence: data.confidence });
      setScanProgress(100);
    } catch (err: unknown) {
      const e = err as Error;
      if (e.name === "AbortError") setError("Request cancelled");
      else { setError(e.message || "Something went wrong"); console.error(err); }
    } finally {
      setTimeout(() => { setLoading(false); abortRef.current = null; }, 500);
    }
  };

  const handleReset = () => {
    cleanup();
    setFile(null); setPreview(null); setResult(null);
    setError(""); setVideoMetadata(null); setIsPlaying(false);
    lastSubmitRef.current = 0;
  };

  return (
    <>
      <style jsx>{`
        *, *::before, *::after { box-sizing: border-box; }

        @keyframes fadeUp  { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        @keyframes slideUp { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
        @keyframes spin    { to{transform:rotate(360deg)} }
        @keyframes pulse   {
          0%  { transform:scale(1);    box-shadow:0 0 0 0   rgba(0,245,160,0.4); }
          70% { transform:scale(1.04); box-shadow:0 0 0 10px rgba(0,245,160,0);  }
          100%{ transform:scale(1);    box-shadow:0 0 0 0   rgba(0,245,160,0);   }
        }
        @keyframes betaPulse {
          0%,100% { opacity:1; }
          50%     { opacity:0.7; }
        }

        .page {
          min-height: 100dvh;
          display: flex;
          align-items: flex-start;
          justify-content: center;
          padding: clamp(5rem,12vw,8rem) clamp(0.75rem,4vw,2rem) clamp(2rem,6vw,4rem);
          font-family: 'Inter', sans-serif;
        }

        .card {
          background: rgba(14,16,38,0.75);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          width: 100%;
          max-width: 1100px;
          border-radius: clamp(16px,3vw,24px);
          padding: clamp(1.25rem,5vw,3rem);
          border: 1px solid rgba(255,255,255,0.1);
          box-shadow: 0 24px 64px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.06);
          position: relative;
          overflow: hidden;
          animation: fadeUp 0.6s ease both;
        }
        .card::before {
          content:'';
          position:absolute; top:0; left:0; right:0; height:1px;
          background:linear-gradient(90deg,transparent,rgba(0,245,160,0.5),transparent);
        }

        /* ── header ── */
        .header { text-align:center; margin-bottom:clamp(1.5rem,4vw,2.5rem); }
        .logo-row {
          display:inline-flex; align-items:center;
          gap:clamp(0.5rem,2vw,1rem);
          margin-bottom:clamp(0.75rem,2vw,1rem);
        }
        h1 {
          font-size: clamp(1.5rem,4vw,2.4rem);
          font-weight:800;
          background:linear-gradient(135deg,#00F5A0,#7877C6 50%,#FF77C6);
          -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text;
          margin:0; letter-spacing:-0.5px; line-height:1.1;
        }
        .subtitle {
          color:rgba(255,255,255,0.6);
          font-size:clamp(0.88rem,2vw,1.05rem);
          max-width:580px; margin:0 auto; line-height:1.65;
        }

        /* ── upload ── */
        .upload-area {
          border:2px dashed rgba(0,245,160,0.25);
          border-radius:clamp(14px,2.5vw,20px);
          padding:clamp(1.75rem,5vw,3rem) clamp(1rem,4vw,2rem);
          text-align:center; cursor:pointer;
          transition:border-color 0.3s, box-shadow 0.3s, transform 0.3s;
          background:rgba(255,255,255,0.015);
          display:flex; align-items:center; justify-content:center;
          min-height:clamp(160px,25vw,220px);
          position:relative; overflow:hidden;
        }
        .upload-area::before {
          content:''; position:absolute; inset:0;
          background:linear-gradient(135deg,rgba(0,245,160,0.07) 0%,transparent 50%,rgba(255,119,198,0.07) 100%);
          opacity:0; transition:opacity 0.3s;
        }
        .upload-area:hover::before, .upload-area.dragging::before { opacity:1; }
        .upload-area:hover, .upload-area.dragging {
          border-color:#00F5A0;
          box-shadow:0 8px 32px rgba(0,245,160,0.15);
          transform:translateY(-2px);
        }
        .upload-area input { display:none; }

        .upload-label {
          display:flex; flex-direction:column; align-items:center;
          gap:clamp(0.75rem,2vw,1.25rem);
          cursor:pointer; position:relative; z-index:1;
        }
        .upload-icon-ring {
          width:clamp(56px,10vw,76px); height:clamp(56px,10vw,76px);
          border-radius:50%;
          background:rgba(255,255,255,0.04);
          border:1px solid rgba(0,245,160,0.2);
          display:flex; align-items:center; justify-content:center;
          color:#00F5A0;
          transition:background 0.3s, border-color 0.3s, transform 0.3s;
        }
        .upload-area:hover .upload-icon-ring {
          background:rgba(0,245,160,0.1); border-color:rgba(0,245,160,0.4); transform:scale(1.06);
        }
        .upload-main-text { font-size:clamp(0.95rem,2.2vw,1.1rem); font-weight:600; color:rgba(255,255,255,0.9); }
        .upload-hint { font-size:clamp(0.78rem,1.8vw,0.88rem); color:rgba(255,255,255,0.42); margin-top:0.25rem; }

        /* ── file info ── */
        .file-info {
          margin-top:0.875rem;
          padding:0.75rem 1rem;
          background:rgba(255,255,255,0.03);
          border:1px solid rgba(255,255,255,0.08);
          border-radius:12px;
          display:flex; align-items:center; justify-content:space-between; gap:0.5rem;
          flex-wrap:wrap;
          animation:slideUp 0.3s ease both;
        }
        .file-name {
          display:flex; align-items:center; gap:0.5rem;
          color:rgba(255,255,255,0.85);
          font-size:clamp(0.8rem,1.8vw,0.9rem); font-weight:500;
          min-width:0; overflow:hidden;
        }
        .file-name span { overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
        .file-size {
          font-size:0.82rem; color:rgba(255,255,255,0.5);
          padding:0.2rem 0.65rem;
          background:rgba(255,255,255,0.05); border-radius:50px; flex-shrink:0;
        }

        /* ── progress ── */
        .progress-track {
          margin-top:1rem; height:4px;
          background:rgba(255,255,255,0.08); border-radius:2px; overflow:hidden;
        }
        .progress-bar {
          height:100%;
          background:linear-gradient(90deg,#00F5A0,#7877C6,#FF77C6);
          border-radius:2px; transition:width 0.25s ease;
        }

        /* ── analyze btn ── */
        .analyze-btn {
          width:100%; margin-top:1.25rem;
          padding:clamp(0.85rem,2.5vw,1.1rem);
          border-radius:50px;
          background:linear-gradient(135deg,#00F5A0,#7877C6);
          color:#07081A; font-weight:700;
          font-size:clamp(0.95rem,2vw,1.05rem);
          border:none; cursor:pointer;
          display:flex; align-items:center; justify-content:center; gap:0.75rem;
          transition:transform 0.25s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.25s;
          -webkit-tap-highlight-color:transparent; touch-action:manipulation;
        }
        .analyze-btn:hover:not(:disabled) { transform:translateY(-2px); box-shadow:0 12px 32px rgba(0,245,160,0.28); }
        .analyze-btn:active:not(:disabled) { transform:scale(0.98); }
        .analyze-btn:disabled { opacity:0.45; cursor:not-allowed; }
        .spinner {
          width:20px; height:20px;
          border:3px solid rgba(7,8,26,0.3); border-top-color:#07081A;
          border-radius:50%; animation:spin 0.8s linear infinite;
        }

        /* ── error ── */
        .error-box {
          margin-top:1rem;
          padding:0.9rem 1.1rem;
          background:rgba(255,71,87,0.09);
          border:1px solid rgba(255,107,157,0.25);
          border-radius:12px; color:#FF6B9D;
          font-size:clamp(0.82rem,1.8vw,0.92rem);
          display:flex; align-items:flex-start; gap:0.65rem;
          animation:slideUp 0.3s ease both;
        }
        .error-box svg { flex-shrink:0; margin-top:1px; }

        /* ── content grid ── */
        .content-grid {
          display:grid; grid-template-columns:1fr 1fr;
          gap:clamp(1rem,3vw,2rem);
          margin-top:clamp(1.5rem,4vw,2.5rem);
          animation:fadeUp 0.5s ease both;
        }

        .section-label {
          display:flex; align-items:center; gap:0.65rem;
          font-size:clamp(0.9rem,1.8vw,1.05rem); font-weight:700; color:#fff;
          padding:clamp(0.65rem,1.5vw,0.875rem) clamp(0.875rem,2vw,1.25rem);
          background:rgba(255,255,255,0.04);
          border:1px solid rgba(255,255,255,0.08); border-radius:12px;
        }

        /* ── video preview ── */
        .preview-box {
          border-radius:clamp(12px,2vw,18px);
          background:rgba(0,0,0,0.3);
          border:1px solid rgba(255,255,255,0.08);
          height:clamp(220px,30vw,320px);
          display:flex; align-items:center; justify-content:center;
          padding:0.75rem; position:relative; overflow:hidden;
        }
        .video-preview {
          width:100%; height:100%; object-fit:contain; border-radius:10px;
        }
        .video-meta {
          position:absolute; bottom:0.75rem; left:0.75rem; right:0.75rem;
          background:rgba(0,0,0,0.72);
          backdrop-filter:blur(10px);
          border-radius:10px;
          padding:0.5rem 0.875rem;
          display:flex; gap:clamp(0.5rem,2vw,1rem); justify-content:center; flex-wrap:wrap;
          border:1px solid rgba(255,255,255,0.08);
          animation:slideUp 0.3s ease both;
        }
        .meta-item {
          display:flex; align-items:center; gap:0.35rem;
          color:rgba(255,255,255,0.82);
          font-size:clamp(0.72rem,1.5vw,0.82rem); font-weight:500;
        }
        .meta-item svg { color:#00F5A0; flex-shrink:0; }

        /* play overlay — hidden once video plays (pointer-events:none so controls still work) */
        .play-overlay {
          position:absolute; inset:0;
          background:rgba(0,0,0,0.45);
          display:flex; align-items:center; justify-content:center;
          border-radius:10px; pointer-events:none;
        }
        .play-pill {
          background:rgba(0,0,0,0.7);
          backdrop-filter:blur(10px);
          padding:0.75rem 1.5rem;
          border-radius:50px;
          display:flex; align-items:center; gap:0.75rem;
          border:1px solid rgba(255,255,255,0.18);
          color:#fff; font-size:clamp(0.82rem,1.8vw,0.95rem);
          animation:pulse 2s infinite;
        }
        .play-dot {
          width:clamp(26px,4vw,32px); height:clamp(26px,4vw,32px);
          background:rgba(0,245,160,0.18); border-radius:50%;
          display:flex; align-items:center; justify-content:center;
          font-size:12px; color:#00F5A0;
        }

        /* ── chart box ── */
        .chart-box {
          border-radius:clamp(12px,2vw,18px);
          background:rgba(255,255,255,0.02);
          border:1px solid rgba(255,255,255,0.08);
          height:clamp(220px,30vw,320px);
          display:flex; align-items:center; justify-content:center;
          padding:clamp(1rem,3vw,1.75rem); overflow:hidden;
        }
        .placeholder {
          display:flex; flex-direction:column; align-items:center; gap:0.75rem;
          color:rgba(255,255,255,0.3);
          font-size:clamp(0.82rem,1.8vw,0.92rem);
          text-align:center; padding:0 1rem;
        }

        /* ── result footer ── */
        .result-footer {
          margin-top:clamp(1.25rem,3vw,2rem);
          padding:clamp(1.25rem,4vw,2rem);
          background:rgba(255,255,255,0.02);
          border:1px solid rgba(255,255,255,0.08);
          border-radius:clamp(14px,2.5vw,20px);
          animation:fadeUp 0.5s ease both;
          text-align:center;
        }
        .result-badge {
          display:inline-flex; align-items:center; gap:0.6rem;
          padding:0.5rem 1.25rem; border-radius:50px;
          font-size:clamp(0.78rem,1.8vw,0.88rem); font-weight:700;
          letter-spacing:0.5px; text-transform:uppercase; margin-bottom:1rem;
        }
        .badge-real { background:rgba(0,245,160,0.1);   color:#00F5A0; border:1px solid rgba(0,245,160,0.25);   }
        .badge-fake { background:rgba(255,107,157,0.1); color:#FF6B9D; border:1px solid rgba(255,107,157,0.25); }
        .result-text {
          font-size:clamp(1.4rem,4vw,2rem); font-weight:800;
          background:linear-gradient(135deg,#00F5A0,#7877C6);
          -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text;
          margin-bottom:0.875rem; line-height:1.2;
        }
        .confidence-note {
          color:rgba(255,255,255,0.5);
          font-size:clamp(0.78rem,1.8vw,0.88rem);
          line-height:1.65; max-width:560px; margin:0 auto;
        }

        /* ── reset btn ── */
        .reset-btn {
          width:100%; margin-top:clamp(1rem,3vw,1.5rem);
          padding:clamp(0.75rem,2vw,0.95rem);
          border-radius:50px;
          background:rgba(255,255,255,0.04);
          color:rgba(255,255,255,0.7); font-weight:600;
          font-size:clamp(0.88rem,1.8vw,0.97rem);
          border:1px solid rgba(255,255,255,0.1); cursor:pointer;
          display:flex; align-items:center; justify-content:center; gap:0.6rem;
          transition:background 0.25s, color 0.25s, border-color 0.25s, transform 0.25s;
          -webkit-tap-highlight-color:transparent; touch-action:manipulation;
        }
        .reset-btn:hover { background:rgba(255,255,255,0.07); color:#fff; border-color:rgba(255,255,255,0.18); transform:translateY(-2px); }
        .reset-btn:active { transform:scale(0.98); }

        /* ── security + beta badge ── */
        .security-block {
          display:flex; flex-direction:column; gap:0.6rem;
          margin-top:clamp(1rem,3vw,1.5rem);
          padding:clamp(0.875rem,2.5vw,1.25rem);
          background:rgba(0,245,160,0.03);
          border:1px solid rgba(0,245,160,0.1);
          border-radius:clamp(12px,2vw,16px);
          position:relative; overflow:hidden;
        }
        .security-block::before {
          content:''; position:absolute; top:0; left:0; right:0; height:1px;
          background:linear-gradient(90deg,transparent,rgba(0,245,160,0.35),transparent);
        }
        .security-row {
          display:flex; align-items:center; justify-content:center; gap:0.65rem;
          padding:0.6rem 1rem;
          background:rgba(255,255,255,0.02);
          border:1px solid rgba(255,255,255,0.05);
          border-radius:10px;
          color:rgba(255,255,255,0.85);
          font-size:clamp(0.78rem,1.8vw,0.88rem); font-weight:500;
          flex-wrap:wrap; text-align:center;
        }
        .security-row svg { color:#00F5A0; filter:drop-shadow(0 0 6px rgba(0,245,160,0.35)); flex-shrink:0; }
        .beta-row {
          display:flex; align-items:center; justify-content:center; gap:0.65rem;
          padding:0.6rem 1rem;
          background:linear-gradient(135deg,rgba(255,119,198,0.05),rgba(120,119,198,0.05));
          border:1px solid rgba(255,119,198,0.15);
          border-radius:10px;
          color:rgba(255,255,255,0.65);
          font-size:clamp(0.75rem,1.7vw,0.85rem);
          flex-wrap:wrap; text-align:center;
        }
        .beta-tag {
          background:linear-gradient(135deg,#FF77C6,#7877C6);
          color:#fff; padding:0.2rem 0.65rem; border-radius:50px;
          font-size:clamp(0.6rem,1.4vw,0.7rem); font-weight:700;
          letter-spacing:0.5px; text-transform:uppercase;
          box-shadow:0 2px 8px rgba(255,119,198,0.3);
          animation:betaPulse 2s ease-in-out infinite;
          flex-shrink:0;
        }

        /* ── responsive ── */
        @media (max-width:768px) {
          .content-grid { grid-template-columns:1fr; }
          .preview-box, .chart-box { height:clamp(200px,55vw,280px); }
          .security-row, .beta-row { flex-direction:column; gap:0.4rem; }
        }

        @media (max-width:480px) {
          .preview-box, .chart-box { height:220px; }
          .video-meta { gap:0.4rem; }
        }

        @media (max-width:360px) {
          .preview-box, .chart-box { height:190px; }
        }

        @media (max-width:812px) and (orientation:landscape) and (max-height:450px) {
          .page { padding-top:4rem; }
          .content-grid { grid-template-columns:1fr 1fr; }
          .preview-box, .chart-box { height:180px; }
        }

        @media (hover:none) {
          .upload-area:hover { transform:none; }
          .upload-area:active { border-color:#00F5A0; }
          .analyze-btn:hover:not(:disabled) { transform:none; }
          .analyze-btn:active:not(:disabled) { transform:scale(0.98); }
          .reset-btn:hover { transform:none; }
          .reset-btn:active { transform:scale(0.98); }
        }

        @media (prefers-reduced-motion:reduce) {
          *,*::before,*::after { animation-duration:0.01ms !important; transition-duration:0.01ms !important; }
        }
      `}</style>

      <div className="page">
        <div className="card">

          {/* header */}
          <div className="header">
            <div className="logo-row">
              <Image src="/logo.svg" alt="Thuliyam AI" width={36} height={36} priority />
              <h1>Thuliyam AI</h1>
            </div>
            <p className="subtitle">
              Detect AI-generated and manipulated videos using advanced machine learning.
              Upload a video to receive a probabilistic authenticity assessment.
            </p>
          </div>

          {/* upload */}
          <div
            className={`upload-area ${isDragging ? "dragging" : ""}`}
            onDragOver={e => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={e => { e.preventDefault(); setIsDragging(false); }}
            onDrop={handleDrop}
          >
            <input type="file" accept="video/mp4,video/quicktime,video/x-msvideo,video/webm"
              onChange={handleFileChange} id="file-upload" />
            <label htmlFor="file-upload" className="upload-label">
              <div className="upload-icon-ring"><Upload size={28} /></div>
              <div>
                <div className="upload-main-text">Drag & drop or click to upload</div>
                <div className="upload-hint">MP4 · MOV · AVI · WebM &nbsp;·&nbsp; Max 100 MB &nbsp;·&nbsp; Secure</div>
              </div>
            </label>
          </div>

          {/* file info */}
          {file && !result && (
            <div className="file-info">
              <div className="file-name"><Film size={15} /><span title={file.name}>{file.name}</span></div>
              <span className="file-size">{(file.size/(1024*1024)).toFixed(2)} MB</span>
            </div>
          )}

          {/* progress */}
          {loading && (
            <div className="progress-track">
              <div className="progress-bar" style={{ width:`${scanProgress}%` }} />
            </div>
          )}

          {/* analyze button */}
          {preview && !result && (
            <button className="analyze-btn" onClick={handleSubmit} disabled={!file || loading}>
              {loading
                ? <><div className="spinner" /><span>Analyzing Video…</span></>
                : <span>Analyze Authenticity</span>}
            </button>
          )}

          {/* error */}
          {error && (
            <div className="error-box"><AlertCircle size={18} /><span>{error}</span></div>
          )}

          {/* grid */}
          {preview && (
            <>
              <div className="content-grid">
                {/* video */}
                <div style={{ display:"flex", flexDirection:"column", gap:"0.75rem" }}>
                  <div className="section-label"><Film size={18} />Uploaded Video</div>
                  <div className="preview-box">
                    <video
                      ref={videoRef}
                      src={preview}
                      controls
                      className="video-preview"
                      onLoadedMetadata={handleVideoLoaded}
                      onPlay={() => setIsPlaying(true)}
                      onPause={() => setIsPlaying(false)}
                    />
                    {videoMetadata && (
                      <div className="video-meta">
                        <div className="meta-item"><Film size={12} />{videoMetadata.dimensions.width}×{videoMetadata.dimensions.height}</div>
                        <div className="meta-item"><Clock size={12} />{formatDuration(videoMetadata.duration)}</div>
                        <div className="meta-item"><FileVideo size={12} />{videoMetadata.size}</div>
                      </div>
                    )}
                    {!isPlaying && (
                      <div className="play-overlay">
                        <div className="play-pill">
                          <div className="play-dot">▶</div>
                          <span>Click to preview</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* chart */}
                <div style={{ display:"flex", flexDirection:"column", gap:"0.75rem" }}>
                  <div className="section-label"><Shield size={18} />Analysis Results</div>
                  <div className="chart-box">
                    {result
                      ? <PieChart label={result.label} confidence={result.confidence} />
                      : <div className="placeholder">
                          <Shield size={40} />
                          <span>Click "Analyze Authenticity"<br/>to see results</span>
                        </div>
                    }
                  </div>
                </div>
              </div>

              {/* result footer */}
              {result && (
                <div className="result-footer">
                  <div className={`result-badge ${result.label === "real" ? "badge-real" : "badge-fake"}`}>
                    {result.label === "real"
                      ? <><CheckCircle size={16} />Likely Real Video</>
                      : <><AlertCircle size={16} />Likely Fake Video</>}
                  </div>
                  <div className="result-text">
                    {result.label === "real" ? "Likely Real" : "Likely Fake"} &nbsp;·&nbsp; {(result.confidence*100).toFixed(1)}%
                  </div>
                  <p className="confidence-note">
                    This is a probabilistic assessment. While the model achieves high accuracy,
                    false positives or negatives may occur. Always verify with additional evidence.
                  </p>
                </div>
              )}

              <button className="reset-btn" onClick={handleReset}>
                <RefreshCw size={18} />Analyze Another Video
              </button>
            </>
          )}

          {/* security + beta block */}
          {!preview && (
            <div className="security-block">
              <div className="security-row">
                <Shield size={15} />
                <span>Videos are processed securely and not stored after analysis</span>
              </div>
              <div className="beta-row">
                <span className="beta-tag">BETA</span>
                <span>Video detection model currently in testing — Available Soon</span>
              </div>
            </div>
          )}

          <p className="confidence-note" style={{ marginTop:"1rem", textAlign:"center" }}>
            The confidence score reflects the model's estimation and does not guarantee correctness.
          </p>

        </div>
      </div>
    </>
  );
}