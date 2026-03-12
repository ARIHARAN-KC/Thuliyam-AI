"use client";
import { useState, useEffect, useRef } from "react";
import { Upload, Shield, RefreshCw, AlertCircle, CheckCircle, Film, Clock, FileVideo } from "lucide-react";
import Image from "next/image";

interface ApiResponse {
  success: boolean;
  label: string;  // Comes as "Real" or "Fake" (capitalized)
  confidence: number;
  scores?: {
    fake: number;
    real: number;
  };
}

interface PredictionResult {
  label: string;  // Will be lowercase: 'real' or 'fake'
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

export default function VideoUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [error, setError] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [videoMetadata, setVideoMetadata] = useState<VideoMetadata | null>(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  
  // Refs
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  const lastSubmissionRef = useRef<number>(0);
  const submissionCooldown = 3000; // 3 seconds cooldown

  // Cleanup function for memory management
  const cleanup = () => {
    // Clean up preview URL
    if (preview && preview.startsWith('blob:')) {
      URL.revokeObjectURL(preview);
    }
    
    // Abort any pending requests
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
  };

  useEffect(() => {
    return () => {
      cleanup();
    };
  }, []);

  useEffect(() => {
    if (loading) {
      const interval = setInterval(() => {
        setScanProgress((prev) => {
          if (prev >= 90) {
            clearInterval(interval);
            return 90;
          }
          return prev + 10;
        });
      }, 300);
      return () => clearInterval(interval);
    } else {
      setScanProgress(0);
    }
  }, [loading]);

  // Extract video metadata
  const extractVideoMetadata = (videoElement: HTMLVideoElement): VideoMetadata => {
    return {
      duration: videoElement.duration,
      dimensions: {
        width: videoElement.videoWidth,
        height: videoElement.videoHeight
      },
      size: file ? (file.size / (1024 * 1024)).toFixed(2) + ' MB' : 'Unknown'
    };
  };

  // Strict file validation for videos
  const validateFile = (file: File): { valid: boolean; error?: string } => {
    // Check file type
    const validTypes = ['video/mp4', 'video/quicktime', 'video/x-msvideo', 'video/webm'];
    if (!validTypes.includes(file.type.toLowerCase())) {
      return { valid: false, error: "Invalid file type. Only MP4, MOV, AVI, and WebM videos are allowed" };
    }

    // Check file size (100MB for videos)
    if (file.size > 100 * 1024 * 1024) {
      return { valid: false, error: "File size must be less than 100MB" };
    }

    // Check for potential malicious files by extension
    const fileName = file.name.toLowerCase();
    const validExtensions = ['.mp4', '.mov', '.avi', '.webm'];
    const hasValidExtension = validExtensions.some(ext => fileName.endsWith(ext));
    
    if (!hasValidExtension) {
      return { valid: false, error: "Invalid file extension. Please upload a video file" };
    }

    // Additional security checks
    if (file.size === 0) {
      return { valid: false, error: "File is empty" };
    }

    return { valid: true };
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;
    handleFile(selectedFile);
  };

  const handleFile = (selectedFile: File) => {
    // Validate file
    const validation = validateFile(selectedFile);
    if (!validation.valid) {
      setError(validation.error || "Invalid file");
      return;
    }

    // Cleanup previous file
    cleanup();

    setFile(selectedFile);
    setError("");
    setResult(null);
    setVideoMetadata(null);
    setIsVideoPlaying(false);

    // Create video preview
    const videoUrl = URL.createObjectURL(selectedFile);
    setPreview(videoUrl);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      handleFile(droppedFile);
    } else {
      setError("Please upload a valid video file (MP4, MOV, AVI, WebM)");
    }
  };

  const handleVideoLoaded = () => {
    if (videoRef.current && file) {
      const metadata = extractVideoMetadata(videoRef.current);
      setVideoMetadata(metadata);
    }
  };

  const handleVideoPlay = () => {
    setIsVideoPlaying(true);
  };

  const handleVideoPause = () => {
    setIsVideoPlaying(false);
  };

  const handleSubmit = async () => {
    // Anti-spam submission guard
    const now = Date.now();
    if (now - lastSubmissionRef.current < submissionCooldown) {
      setError("Please wait before submitting another request");
      return;
    }

    if (!file) {
      setError("Please select a video");
      return;
    }

    // Validate file again before submission
    const validation = validateFile(file);
    if (!validation.valid) {
      setError(validation.error || "Invalid file");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);
    setScanProgress(0);
    lastSubmissionRef.current = now;

    // Create abort controller for the request
    abortControllerRef.current = new AbortController();

    const progressInterval = setInterval(() => {
      setScanProgress(prev => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return 90;
        }
        return prev + 5;
      });
    }, 200);

    const formData = new FormData();
    formData.append("file", file);

    try {
      // Get API URL (allow HTTP for local development)
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      if (!apiUrl) {
        throw new Error("API URL not configured");
      }

      // For production, ensure HTTPS
      if (process.env.NODE_ENV === 'production' && !apiUrl.startsWith('https://')) {
        throw new Error("Secure connection required in production");
      }

      const res = await fetch(
        `${apiUrl}/predict/video`,
        {
          method: "POST",
          body: formData,
          signal: abortControllerRef.current.signal,
          headers: {
            // Security headers
            'X-Requested-With': 'XMLHttpRequest',
          }
        }
      );

      if (!res.ok) {
        if (res.status === 429) {
          throw new Error("Too many requests. Please try again later.");
        }
        if (res.status === 413) {
          throw new Error("File too large. Please upload a smaller video.");
        }
        if (res.status === 415) {
          throw new Error("Unsupported media type. Please upload a valid video format.");
        }
        throw new Error(`Request failed with status: ${res.status}`);
      }

      const contentType = res.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error("Invalid response format");
      }

      // Parse API response
      const apiData: ApiResponse = await res.json();
      
      // Validate response structure
      if (!apiData || typeof apiData !== 'object') {
        throw new Error("Invalid response structure");
      }

      if (!apiData.success) {
        throw new Error("API request was not successful");
      }

      // Convert label to lowercase for consistency
      const normalizedLabel = apiData.label.toLowerCase();
      
      // Validate label
      const validLabels = ['real', 'fake'];
      if (!validLabels.includes(normalizedLabel)) {
        throw new Error(`Invalid label value: ${apiData.label}`);
      }

      // Validate confidence
      if (typeof apiData.confidence !== 'number' || 
          apiData.confidence < 0 || 
          apiData.confidence > 1) {
        throw new Error("Invalid confidence value");
      }

      // Create the result object
      const resultData: PredictionResult = {
        label: normalizedLabel,
        confidence: apiData.confidence
      };

      setResult(resultData);
      setScanProgress(100);
      
    } catch (err: any) {
      // Don't show error if request was aborted
      if (err.name === 'AbortError') {
        setError("Request was cancelled");
      } else {
        setError(err.message || "Something went wrong");
        console.error("API Error:", err);
      }
    } finally {
      setTimeout(() => {
        setLoading(false);
        clearInterval(progressInterval);
        abortControllerRef.current = null;
      }, 500);
    }
  };

  const PieChart = ({ confidence, label }: PieChartProps) => {
    // Ensure confidence is properly scaled (0-100)
    const scaledConfidence = Math.min(100, Math.max(0, confidence * 100));
    
    // Calculate percentages based on label
    const realPercent = label === "real" ? scaledConfidence : 100 - scaledConfidence;
    const fakePercent = 100 - realPercent;

    const radius = 75;
    const circumference = 2 * Math.PI * radius;
    const realStroke = (realPercent / 100) * circumference;

    return (
      <div className="chart-container">
        <div className="chart-wrapper">
          <div className="chart-glow"></div>
          <svg viewBox="0 0 200 200" className="pie-chart">
            <defs>
              <linearGradient id="realGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00F5A0" />
                <stop offset="100%" stopColor="#00D4AA" />
              </linearGradient>
              <linearGradient id="fakeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FF6B9D" />
                <stop offset="100%" stopColor="#FF4757" />
              </linearGradient>
            </defs>
            <circle
              cx="100"
              cy="100"
              r={radius}
              fill="none"
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="12"
            />
            <circle
              cx="100"
              cy="100"
              r={radius}
              fill="none"
              stroke={label === "real" ? "url(#realGradient)" : "url(#fakeGradient)"}
              strokeWidth="12"
              strokeDasharray={`${realStroke} ${circumference}`}
              transform="rotate(-90 100 100)"
              strokeLinecap="round"
              className="chart-progress"
            />
            <text
              x="100"
              y="95"
              textAnchor="middle"
              fontSize="14"
              fontWeight="600"
              fill="rgba(255,255,255,0.7)"
              className="chart-label"
            >
              CONFIDENCE
            </text>
            <text
              x="100"
              y="125"
              textAnchor="middle"
              fontSize="32"
              fontWeight="800"
              fill={label === "real" ? "#00F5A0" : "#FF6B9D"}
              className="chart-percentage"
            >
              {scaledConfidence.toFixed(1)}%
            </text>
          </svg>
        </div>
        <div className="legend">
          <div className="legend-item">
            <div className="legend-indicator real">
              <div className="indicator-glow"></div>
            </div>
            <div className="legend-content">
              <span className="legend-label">REAL PROBABILITY: </span>
              <span className="legend-value">{realPercent.toFixed(1)}%</span>
            </div>
          </div>
          <div className="legend-item">
            <div className="legend-indicator fake">
              <div className="indicator-glow"></div>
            </div>
            <div className="legend-content">
              <span className="legend-label">FAKE PROBABILITY: </span>
              <span className="legend-value">{fakePercent.toFixed(1)}%</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const handleReset = () => {
    cleanup();
    setFile(null);
    setPreview(null);
    setResult(null);
    setError("");
    setVideoMetadata(null);
    setIsVideoPlaying(false);
    lastSubmissionRef.current = 0;
  };

  // Format duration from seconds to MM:SS
  const formatDuration = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Function to render video preview with metadata
  const renderVideoPreview = () => {
    if (!preview) return null;
    
    return (
      <div className="video-preview-wrapper">
        <video 
          ref={videoRef}
          src={preview} 
          controls 
          className="video-preview"
          onLoadedMetadata={handleVideoLoaded}
          onPlay={handleVideoPlay}
          onPause={handleVideoPause}
          style={{ maxWidth: '100%', maxHeight: '100%' }}
        />
        {videoMetadata && (
          <div className="video-metadata">
            <div className="metadata-item">
              <Film size={14} />
              <span>{videoMetadata.dimensions.width}x{videoMetadata.dimensions.height}</span>
            </div>
            <div className="metadata-item">
              <Clock size={14} />
              <span>{formatDuration(videoMetadata.duration)}</span>
            </div>
            <div className="metadata-item">
              <FileVideo size={14} />
              <span>{videoMetadata.size}</span>
            </div>
          </div>
        )}
        {!isVideoPlaying && (
          <div className="video-overlay">
            <div className="play-indicator">
              <div className="play-icon">▶</div>
              <span>Click to preview video</span>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      <style jsx>{`
        .container {
          min-height: calc(120vh - 96px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          position: relative;
          font-family: 'Inter', sans-serif;
        }

        .card {
          background: rgba(16, 18, 40, 0.7);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          max-width: 1200px;
          width: 100%;
          border-radius: 24px;
          padding: 3rem;
          border: 1px solid rgba(255, 255, 255, 0.15);
          box-shadow: 
            0 20px 60px rgba(0, 0, 0, 0.3),
            0 0 0 1px rgba(255, 255, 255, 0.1);
          position: relative;
          overflow: hidden;
          z-index: 1;
        }

        .card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(90deg, 
            transparent 0%, 
            rgba(0, 245, 160, 0.5) 50%, 
            transparent 100%);
          z-index: 2;
        }

        .header {
          text-align: center;
          margin-bottom: 3rem;
          position: relative;
        }

        .title-container {
          display: inline-flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1rem;
          position: relative;
        }

        h1 {
          font-size: 2.5rem;
          font-weight: 800;
          background: linear-gradient(135deg, #00F5A0 0%, #7877C6 50%, #FF77C6 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          letter-spacing: -0.5px;
          margin: 0;
          text-shadow: 0 10px 30px rgba(0, 245, 160, 0.2);
        }

        .subtitle {
          text-align: center;
          color: rgba(255, 255, 255, 0.7);
          font-size: 1.1rem;
          margin-bottom: 2rem;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
          line-height: 1.6;
          font-weight: 400;
        }

        .upload-section {
          position: relative;
          margin-bottom: 2rem;
        }

        .upload-area {
          border: 2px dashed rgba(0, 245, 160, 0.3);
          border-radius: 20px;
          padding: 3rem 2rem;
          text-align: center;
          cursor: pointer;
          transition: all 0.3s ease;
          background: rgba(255, 255, 255, 0.02);
          position: relative;
          min-height: 240px;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .upload-area::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, 
            rgba(0, 245, 160, 0.1) 0%, 
            transparent 50%, 
            rgba(255, 119, 198, 0.1) 100%);
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .upload-area:hover::before,
        .upload-area.dragging::before {
          opacity: 1;
        }

        .upload-area:hover,
        .upload-area.dragging {
          border-color: #00F5A0;
          box-shadow: 
            0 10px 40px rgba(0, 245, 160, 0.2),
            inset 0 1px 0 0 rgba(255, 255, 255, 0.1);
          transform: translateY(-2px);
        }

        .upload-area input {
          display: none;
        }

        .upload-label {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.5rem;
          font-size: 1.1rem;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.9);
          padding: 1.5rem;
          position: relative;
          z-index: 2;
        }

        .upload-icon-wrapper {
          width: 80px;
          height: 80px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 50%;
          position: relative;
          transition: all 0.3s ease;
        }

        .upload-icon-wrapper::before {
          content: '';
          position: absolute;
          inset: -2px;
          background: linear-gradient(135deg, #00F5A0, #FF77C6);
          border-radius: 50%;
          opacity: 0;
          transition: opacity 0.3s ease;
          z-index: -1;
        }

        .upload-area:hover .upload-icon-wrapper::before {
          opacity: 1;
        }

        .upload-icon {
          width: 36px;
          height: 36px;
          color: #00F5A0;
          transition: all 0.3s ease;
        }

        .upload-area:hover .upload-icon {
          color: white;
          transform: scale(1.1);
        }

        .upload-hint {
          color: rgba(255, 255, 255, 0.5);
          font-size: 0.9rem;
          margin-top: 0.5rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-weight: 400;
        }

        .scan-progress {
          margin-top: 2rem;
          width: 100%;
          height: 4px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 2px;
          overflow: hidden;
          position: relative;
        }

        .scan-progress-bar {
          height: 100%;
          background: linear-gradient(90deg, #00F5A0, #FF77C6);
          border-radius: 2px;
          transition: width 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .analyze-btn {
          width: 100%;
          padding: 1.2rem;
          border-radius: 50px;
          background: linear-gradient(135deg, #00F5A0 0%, #7877C6 100%);
          color: white;
          font-weight: 600;
          font-size: 1.1rem;
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
          margin-top: 2rem;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          position: relative;
          overflow: hidden;
          min-width: 200px;
        }

        .analyze-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(0, 245, 160, 0.3);
        }

        .analyze-btn:active:not(:disabled) {
          transform: translateY(0px);
        }

        .analyze-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .loading-container {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          position: relative;
          z-index: 2;
        }

        .loading-spinner {
          width: 24px;
          height: 24px;
          border: 3px solid rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          border-top-color: #00F5A0;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .error-box {
          margin-top: 1.5rem;
          background: rgba(255, 71, 87, 0.1);
          color: #FF6B9D;
          padding: 1.2rem 1.5rem;
          border-radius: 16px;
          font-weight: 500;
          border: 1px solid rgba(255, 107, 157, 0.3);
          display: flex;
          align-items: center;
          gap: 1rem;
          font-size: 0.95rem;
          backdrop-filter: blur(10px);
        }

        .content-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
          margin-top: 3rem;
          animation: fadeIn 0.5s ease-out;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .video-section,
        .chart-section {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .section-label {
          font-size: 1.2rem;
          font-weight: 700;
          color: #ffffff;
          padding: 1rem 1.5rem;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 16px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          display: flex;
          align-items: center;
          gap: 0.8rem;
          backdrop-filter: blur(10px);
        }

        .preview-container {
          border-radius: 20px;
          overflow: hidden;
          background: rgba(0, 0, 0, 0.3);
          border: 1px solid rgba(255, 255, 255, 0.1);
          height: 320px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem;
          position: relative;
        }

        .video-preview-wrapper {
          width: 100%;
          height: 100%;
          position: relative;
          display: flex;
          flex-direction: column;
        }

        .video-preview {
          width: 100%;
          height: 100%;
          object-fit: contain;
          border-radius: 12px;
        }

        .video-metadata {
          position: absolute;
          bottom: 1rem;
          left: 1rem;
          right: 1rem;
          background: rgba(0, 0, 0, 0.7);
          backdrop-filter: blur(10px);
          border-radius: 12px;
          padding: 0.75rem 1rem;
          display: flex;
          gap: 1.5rem;
          justify-content: center;
          border: 1px solid rgba(255, 255, 255, 0.1);
          animation: slideUp 0.3s ease-out;
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .metadata-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: rgba(255, 255, 255, 0.9);
          font-size: 0.85rem;
          font-weight: 500;
        }

        .metadata-item svg {
          color: #00F5A0;
        }

        .video-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 12px;
          pointer-events: none;
        }

        .play-indicator {
          background: rgba(0, 0, 0, 0.7);
          backdrop-filter: blur(10px);
          padding: 1rem 2rem;
          border-radius: 50px;
          display: flex;
          align-items: center;
          gap: 1rem;
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: white;
          font-size: 1rem;
          animation: pulse 2s infinite;
        }

        .play-icon {
          width: 32px;
          height: 32px;
          background: rgba(0, 245, 160, 0.2);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
          color: #00F5A0;
        }

        @keyframes pulse {
          0% {
            transform: scale(1);
            box-shadow: 0 0 0 0 rgba(0, 245, 160, 0.4);
          }
          70% {
            transform: scale(1.05);
            box-shadow: 0 0 0 10px rgba(0, 245, 160, 0);
          }
          100% {
            transform: scale(1);
            box-shadow: 0 0 0 0 rgba(0, 245, 160, 0);
          }
        }

        .chart-container {
          background: rgba(255, 255, 255, 0.02);
          border-radius: 20px;
          padding: 2rem;
          border: 1px solid rgba(255, 255, 255, 0.1);
          height: 320px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
        }

        .chart-wrapper {
          position: relative;
          margin-bottom: 1.5rem;
        }

        .pie-chart {
          width: 100%;
          max-width: 250px;
        }

        .legend {
          display: flex;
          gap: 1rem;
        }

        .legend-item {
          display: flex;
          align-items: center;
          gap: 0.8rem;
          padding: 0.8rem 1.2rem;
          background: rgba(255, 255, 255, 0.03);
          border-radius: 12px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          min-width: 140px;
          transition: all 0.3s ease;
        }

        .legend-item:hover {
          background: rgba(255, 255, 255, 0.05);
          transform: translateY(-2px);
        }

        .legend-indicator {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          position: relative;
        }

        .indicator-glow {
          position: absolute;
          inset: -4px;
          background: inherit;
          border-radius: 50%;
          opacity: 0.5;
          filter: blur(4px);
        }

        .real {
          background: linear-gradient(135deg, #00F5A0, #00D4AA);
        }

        .fake {
          background: linear-gradient(135deg, #FF6B9D, #FF4757);
        }

        .legend-content {
          display: flex;
          flex-direction: column;
          gap: 0.2rem;
        }

        .legend-label {
          font-size: 0.7rem;
          color: rgba(255, 255, 255, 0.6);
          font-weight: 500;
          letter-spacing: 1px;
          text-transform: uppercase;
        }

        .legend-value {
          font-size: 1.2rem;
          font-weight: 800;
          color: #ffffff;
        }

        .result-footer {
          margin-top: 3rem;
          padding: 2rem;
          background: rgba(255, 255, 255, 0.02);
          border-radius: 20px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          animation: fadeIn 0.5s ease-out;
          position: relative;
          overflow: hidden;
        }

        .result-header {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .result-icon {
          color: #00F5A0;
          filter: drop-shadow(0 0 10px rgba(0, 245, 160, 0.5));
        }

        .result-label {
          font-size: 1.1rem;
          color: rgba(255, 255, 255, 0.7);
          text-align: center;
          margin-bottom: 0.5rem;
          font-weight: 500;
        }

        .result-text {
          font-size: 2rem;
          font-weight: 800;
          text-align: center;
          color: #ffffff;
          margin-bottom: 1.5rem;
          background: linear-gradient(135deg, #00F5A0 0%, #7877C6 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .confidence-note {
          text-align: center;
          color: rgba(255, 255, 255, 0.6);
          font-size: 0.9rem;
          line-height: 1.6;
          max-width: 600px;
          margin: 0 auto;
          font-weight: 400;
        }

        .reset-btn {
          width: 100%;
          padding: 1rem;
          border-radius: 50px;
          background: rgba(255, 255, 255, 0.05);
          color: rgba(255, 255, 255, 0.7);
          font-weight: 600;
          font-size: 1rem;
          border: 1px solid rgba(255, 255, 255, 0.1);
          cursor: pointer;
          transition: all 0.3s ease;
          margin-top: 2rem;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.8rem;
        }

        .reset-btn:hover {
          background: rgba(255, 255, 255, 0.08);
          color: #ffffff;
          border-color: rgba(255, 255, 255, 0.2);
          transform: translateY(-2px);
        }

        .security-badge {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.8rem;
          margin-top: 2rem;
          color: rgba(255, 255, 255, 0.5);
          font-size: 0.9rem;
        }

        .file-info {
          margin-top: 1rem;
          padding: 1rem;
          background: rgba(255, 255, 255, 0.03);
          border-radius: 12px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .file-name {
          color: rgba(255, 255, 255, 0.9);
          font-size: 0.9rem;
          font-weight: 500;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .file-size {
          color: rgba(255, 255, 255, 0.6);
          font-size: 0.85rem;
          padding: 0.25rem 0.75rem;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 50px;
        }

        @media (max-width: 1024px) {
          .container {
            padding: 1rem;
          }
          
          .card {
            padding: 2rem;
          }
          
          h1 {
            font-size: 2rem;
          }
          
          .content-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }
          
          .preview-container,
          .chart-container {
            height: 280px;
          }
          
          .result-text {
            font-size: 1.8rem;
          }
        }

        @media (max-width: 768px) {
          .card {
            padding: 1.5rem;
          }
          
          h1 {
            font-size: 1.8rem;
          }
          
          .upload-area {
            padding: 2rem 1rem;
            min-height: 200px;
          }
          
          .upload-icon-wrapper {
            width: 60px;
            height: 60px;
          }
          
          .upload-icon {
            width: 28px;
            height: 28px;
          }
          
          .preview-container,
          .chart-container {
            height: 250px;
          }
          
          .result-text {
            font-size: 1.5rem;
          }
          
          .legend {
            flex-direction: column;
            align-items: center;
          }
          
          .legend-item {
            width: 100%;
            max-width: 200px;
          }

          .video-metadata {
            flex-wrap: wrap;
            gap: 0.75rem;
            padding: 0.5rem;
          }

          .metadata-item {
            font-size: 0.75rem;
          }
        }

        @media (max-width: 480px) {
          .container {
            padding: 0.5rem;
          }
          
          .card {
            padding: 1rem;
            border-radius: 16px;
          }
          
          h1 {
            font-size: 1.5rem;
          }
          
          .upload-label {
            padding: 1rem;
            font-size: 1rem;
          }
          
          .section-label {
            font-size: 1rem;
            padding: 0.8rem 1rem;
          }
          
          .result-text {
            font-size: 1.3rem;
          }
          
          .confidence-note {
            font-size: 0.8rem;
            padding: 0 1rem;
          }

          .play-indicator {
            padding: 0.75rem 1.5rem;
            font-size: 0.9rem;
          }
        }
      `}</style>

      <div className="container">
        <div className="card">
          <div className="header">
            <div className="title-container">
              <Image
                src="/logo.svg"
                alt="Thuliyam AI Logo"
                width={40}
                height={40}
                priority
              />
              <h1>Thuliyam AI</h1>
            </div>
            <p className="subtitle">
              Detect AI-generated and manipulated videos using advanced machine learning.
              Upload a video to receive a probabilistic authenticity assessment.
            </p>
          </div>

          <div className="upload-section">
            <div
              className={`upload-area ${isDragging ? 'dragging' : ''}`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <input
                type="file"
                accept="video/mp4,video/quicktime,video/x-msvideo,video/webm"
                onChange={handleFileChange}
                id="file-upload"
              />
              <label htmlFor="file-upload" className="upload-label">
                <div className="upload-icon-wrapper">
                  <Upload className="upload-icon" />
                </div>
                <div>
                  <div>Drag & drop or click to upload</div>
                  <div className="upload-hint">
                    Supports: MP4, MOV, AVI, WebM • Max 100MB • Secure Processing
                  </div>
                </div>
              </label>
            </div>

            {file && !result && (
              <div className="file-info">
                <div className="file-name">
                  <Film size={16} />
                  <span>{file.name}</span>
                </div>
                <div className="file-size">
                  {(file.size / (1024 * 1024)).toFixed(2)} MB
                </div>
              </div>
            )}

            {loading && (
              <div className="scan-progress">
                <div
                  className="scan-progress-bar"
                  style={{ width: `${scanProgress}%` }}
                />
              </div>
            )}

            {preview && !result && (
              <button
                onClick={handleSubmit}
                disabled={!file || loading}
                className="analyze-btn"
              >
                {loading ? (
                  <div className="loading-container">
                    <div className="loading-spinner"></div>
                    <span>Analyzing Video...</span>
                  </div>
                ) : (
                  <>
                    <span>Analyze Authenticity</span>
                  </>
                )}
              </button>
            )}

            {error && (
              <div className="error-box">
                <AlertCircle size={20} />
                <span>{error}</span>
              </div>
            )}
          </div>

          {preview && (
            <>
              <div className="content-grid">
                <div className="video-section">
                  <div className="section-label">
                    <Upload size={20} />
                    Uploaded Video
                  </div>
                  <div className="preview-container">
                    {renderVideoPreview()}
                  </div>
                </div>

                <div className="chart-section">
                  <div className="section-label">
                    <Shield size={20} />
                    Analysis Results
                  </div>
                  <div className="chart-container">
                    {result ? (
                      <PieChart
                        label={result.label}
                        confidence={result.confidence}
                      />
                    ) : (
                      <div style={{ textAlign: 'center', color: 'rgba(255,255,255,0.5)' }}>
                        <Shield size={48} style={{ marginBottom: '1rem', opacity: 0.3 }} />
                        <p>Click "Analyze Authenticity" to see results</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {result && (
                <div className="result-footer">
                  <div className="result-header">
                    {result.label === 'real' ? (
                      <>
                        <CheckCircle className="result-icon" size={32} />
                        <div className="result-label">LIKELY REAL VIDEO</div>
                      </>
                    ) : (
                      <>
                        <AlertCircle className="result-icon" size={32} />
                        <div className="result-label">LIKELY FAKE VIDEO</div>
                      </>
                    )}
                  </div>
                  <div className="result-text">
                    {result.label === 'real' ? 'Likely Real' : 'Likely Fake'} • {(result.confidence * 100).toFixed(1)}%
                  </div>

                  <p className="confidence-note">
                    This result is a probabilistic assessment generated by an AI model.
                    While the system achieves high accuracy, false positives or false negatives may occur.
                  </p>
                </div>
              )}

              <button
                onClick={handleReset}
                className="reset-btn"
              >
                <RefreshCw size={20} />
                Analyze Another Video
              </button>
            </>
          )}

          {!preview && !result && (
            <div className="security-badge">
              <Shield size={16} />
              <span>Videos are processed securely and are not stored after analysis</span>
            </div>
          )}
          
          <p className="confidence-note" style={{ marginTop: "1rem" }}>
            The confidence score reflects the model's estimation and does not guarantee correctness.
          </p>
        </div>
      </div>
    </>
  );
}