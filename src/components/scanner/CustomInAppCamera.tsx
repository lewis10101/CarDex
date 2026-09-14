import React, { useState, useRef, useEffect } from 'react';
import {
  Camera,
  RefreshCw,
  Upload,
  Zap,
  ZapOff,
  AlertCircle,
  Target,
  Sparkles,
  X,
} from 'lucide-react';
import { getDailyTargetState } from '../../data/dailyTargetService';

interface CustomInAppCameraProps {
  onCapture: (imageDataUrl: string) => void;
  onUploadFile: (file: File) => void;
}

export function CustomInAppCamera({ onCapture, onUploadFile }: CustomInAppCameraProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const filePickerRef = useRef<HTMLInputElement | null>(null);

  const [cameraActive, setCameraActive] = useState<boolean>(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [isCapturing, setIsCapturing] = useState<boolean>(false);
  const [facingMode, setFacingMode] = useState<'environment' | 'user'>('environment');
  const [hasTorch, setHasTorch] = useState<boolean>(false);
  const [torchOn, setTorchOn] = useState<boolean>(false);
  const [shutterFlash, setShutterFlash] = useState<boolean>(false);

  const dailyTarget = getDailyTargetState();

  // Initialize camera stream
  const startCamera = async (facing: 'environment' | 'user') => {
    // Stop any active stream first
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }

    setCameraError(null);
    setTorchOn(false);

    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Camera not supported in this browser.');
      }

      const constraints: MediaStreamConstraints = {
        video: {
          facingMode: { ideal: facing },
          width: { ideal: 1920 },
          height: { ideal: 1080 },
        },
        audio: false,
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play().catch((err) => {
          console.warn('Video playback warning:', err);
        });
      }

      setCameraActive(true);

      // Check if torch/flashlight is supported on this track
      const videoTrack = stream.getVideoTracks()[0];
      if (videoTrack) {
        const capabilities = (videoTrack.getCapabilities && videoTrack.getCapabilities()) as any;
        if (capabilities && capabilities.torch) {
          setHasTorch(true);
        } else {
          setHasTorch(false);
        }
      }
    } catch (err: any) {
      console.warn('In-app camera stream could not be started:', err);
      setCameraActive(false);
      if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
        setCameraError('Camera permission was denied. You can allow camera in browser settings or upload a photo.');
      } else if (err.name === 'NotFoundError' || err.name === 'DevicesNotFoundError') {
        setCameraError('No camera hardware found on this device.');
      } else {
        setCameraError('Camera unavailable. You can upload or select an existing photo.');
      }
    }
  };

  useEffect(() => {
    startCamera(facingMode);

    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
      }
    };
  }, [facingMode]);

  // Flip camera between back/front
  const toggleFacingMode = () => {
    setFacingMode((prev) => (prev === 'environment' ? 'user' : 'environment'));
  };

  // Toggle torch / flash
  const toggleTorch = async () => {
    if (!streamRef.current) return;
    const videoTrack = streamRef.current.getVideoTracks()[0];
    if (!videoTrack) return;

    try {
      const nextTorch = !torchOn;
      await (videoTrack as any).applyConstraints({
        advanced: [{ torch: nextTorch }],
      });
      setTorchOn(nextTorch);
    } catch (e) {
      console.warn('Torch toggle failed:', e);
    }
  };

  // Capture photo from video feed
  const capturePhoto = () => {
    if (!videoRef.current || isCapturing) return;

    try {
      setIsCapturing(true);
      setShutterFlash(true);
      setTimeout(() => setShutterFlash(false), 180);

      const video = videoRef.current;
      const canvas = document.createElement('canvas');
      const width = video.videoWidth || 1280;
      const height = video.videoHeight || 720;

      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext('2d');
      if (ctx) {
        // If front-facing camera, flip horizontally for natural mirror feel
        if (facingMode === 'user') {
          ctx.translate(width, 0);
          ctx.scale(-1, 1);
        }
        ctx.drawImage(video, 0, 0, width, height);

        const dataUrl = canvas.toDataURL('image/jpeg', 0.9);

        // Turn off torch and stop tracks
        if (streamRef.current) {
          streamRef.current.getTracks().forEach((t) => t.stop());
          streamRef.current = null;
        }

        onCapture(dataUrl);
      }
    } catch (err) {
      console.error('Failed to capture frame from in-app camera:', err);
    } finally {
      setIsCapturing(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop());
        streamRef.current = null;
      }
      onUploadFile(file);
    }
  };

  return (
    <div
      id="cardex-custom-in-app-camera"
      className="relative w-full aspect-[3/4] max-h-[72vh] rounded-3xl overflow-hidden bg-zinc-950 border border-zinc-800 shadow-2xl flex flex-col justify-between select-none"
    >
      {/* Hidden file input for alternative photo library upload */}
      <input
        ref={filePickerRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />

      {/* Live Video Feed */}
      {cameraActive ? (
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className={`absolute inset-0 w-full h-full object-cover ${
            facingMode === 'user' ? 'scale-x-[-1]' : ''
          }`}
        />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-zinc-950 space-y-4">
          <div className="w-16 h-16 rounded-3xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-amber-400">
            <Camera className="w-8 h-8 stroke-1" />
          </div>
          <div className="space-y-1 max-w-xs">
            <h3 className="text-sm font-bold text-white">CarDex Spotter Camera</h3>
            <p className="text-xs text-zinc-400">
              {cameraError || 'Initializing viewfinder in capture-ready mode...'}
            </p>
          </div>
          <div className="flex items-center gap-2 pt-2">
            <button
              type="button"
              onClick={() => startCamera(facingMode)}
              className="px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-zinc-950 text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Retry Camera</span>
            </button>
            <button
              type="button"
              onClick={() => filePickerRef.current?.click()}
              className="px-3.5 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-medium transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Choose Photo</span>
            </button>
          </div>
        </div>
      )}

      {/* Shutter Flash Animation */}
      {shutterFlash && (
        <div className="absolute inset-0 bg-white z-40 pointer-events-none transition-opacity duration-150 animate-out fade-out" />
      )}

      {/* Top Camera Controls Overlay */}
      <div className="relative z-20 flex items-center justify-between p-3.5 bg-linear-to-b from-black/70 via-black/30 to-transparent">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-[11px] font-semibold text-white">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>CARDEX LIVE</span>
          </div>

          {dailyTarget && !dailyTarget.completed && (
            <div className="hidden sm:flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-500/20 backdrop-blur-md border border-amber-500/30 text-[10px] font-bold text-amber-300">
              <Target className="w-3 h-3 text-amber-400" />
              <span>Target: {dailyTarget.targetBrand.name}</span>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2">
          {hasTorch && (
            <button
              type="button"
              onClick={toggleTorch}
              className={`p-2.5 rounded-full backdrop-blur-md border transition-all cursor-pointer ${
                torchOn
                  ? 'bg-amber-400 text-zinc-950 border-amber-300 shadow-md'
                  : 'bg-black/50 text-white border-white/15 hover:bg-black/70'
              }`}
              title="Toggle Flashlight"
            >
              {torchOn ? <Zap className="w-4 h-4 fill-current" /> : <ZapOff className="w-4 h-4" />}
            </button>
          )}

          <button
            type="button"
            onClick={toggleFacingMode}
            className="p-2.5 rounded-full bg-black/50 hover:bg-black/70 backdrop-blur-md border border-white/15 text-white transition-all cursor-pointer"
            title="Flip Camera"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Center Viewfinder Framing Reticle */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center p-4 pointer-events-none">
        <div className="relative w-full max-w-[280px] aspect-[4/3] rounded-2xl border border-white/20 flex items-center justify-center">
          {/* 4 Corner Brackets in CarDex Amber */}
          <div className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-amber-400 rounded-tl-lg" />
          <div className="absolute top-0 right-0 w-5 h-5 border-t-2 border-r-2 border-amber-400 rounded-tr-lg" />
          <div className="absolute bottom-0 left-0 w-5 h-5 border-b-2 border-l-2 border-amber-400 rounded-bl-lg" />
          <div className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 border-amber-400 rounded-br-lg" />

          {/* Center Aim Crosshair */}
          <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center">
            <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
          </div>

          <span className="absolute bottom-2 text-[10px] font-medium tracking-wider uppercase text-white/70 bg-black/40 px-2 py-0.5 rounded-full backdrop-blur-xs">
            Align Car in Frame
          </span>
        </div>
      </div>

      {/* Bottom Camera Action Bar */}
      <div className="relative z-20 p-4 bg-linear-to-t from-black/80 via-black/40 to-transparent flex items-center justify-between">
        {/* Left: Upload from library button */}
        <button
          type="button"
          onClick={() => filePickerRef.current?.click()}
          className="w-11 h-11 rounded-2xl bg-black/50 hover:bg-black/70 backdrop-blur-md border border-white/20 text-white flex flex-col items-center justify-center gap-0.5 transition-all cursor-pointer shadow-lg active:scale-95"
          title="Upload from Photo Library"
        >
          <Upload className="w-4 h-4 text-zinc-300" />
          <span className="text-[9px] font-semibold text-zinc-300">Upload</span>
        </button>

        {/* Center: Large CarDex Shutter Button */}
        <button
          type="button"
          id="cardex-inapp-shutter-btn"
          disabled={!cameraActive || isCapturing}
          onClick={capturePhoto}
          className="relative w-18 h-18 rounded-full p-1 border-2 border-amber-400/80 flex items-center justify-center cursor-pointer transition-transform active:scale-90 hover:scale-105 disabled:opacity-40 disabled:pointer-events-none shadow-xl shadow-amber-500/20"
          title="Take Photo"
        >
          <div className="w-full h-full rounded-full bg-amber-400 flex items-center justify-center">
            <div className="w-12 h-12 rounded-full bg-zinc-950 flex items-center justify-center">
              <Camera className="w-5 h-5 text-amber-400" />
            </div>
          </div>
        </button>

        {/* Right: Daily Target Reminder Pill */}
        <div className="w-11 flex flex-col items-center justify-center">
          {dailyTarget && (
            <div
              className="text-center"
              title={`Today's bounty: ${dailyTarget.targetBrand.name}`}
            >
              <div className="w-9 h-9 rounded-2xl bg-black/50 backdrop-blur-md border border-white/20 flex items-center justify-center text-amber-400">
                <Sparkles className="w-4 h-4" />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
