import React, { useState, useRef, useEffect } from 'react';
import {
  Camera,
  Upload,
  RefreshCw,
  AlertCircle,
  Check,
  ThumbsUp,
  ThumbsDown,
  Sparkles,
  ArrowLeft,
  CheckCircle2,
  Search,
  X,
  Car as CarIcon,
  Plus,
  Database,
  Copy,
  Palette,
  Zap,
  ZapOff,
  HelpCircle,
  Info,
  Target,
  Image as ImageIcon,
} from 'lucide-react';
import { AppTab } from '../types';
import {
  searchMasterCarCatalog,
  getLocalCustomCars,
  saveLocalCustomCar,
  CustomCarRecord,
  COMPREHENSIVE_CAR_CATALOG,
} from '../data/allCarDatabase';
import {
  saveScannedCar,
  isCustomCarTombstoned,
  removeCustomCarTombstone,
  addDuplicateBonusXp,
} from '../data/userDataStorage';
import { recordCarScanToCollection, CarScanResult } from '../data/collectionData';
import { compressImageDataUrl } from '../utils/imageCompressor';
import { CarModelSuggestion } from '../data/popularCarModels';
import {
  getDailyTargetState,
  isBrandMatchForDailyTarget,
  markDailyTargetCompleted,
  getDailyTargetXpBounty,
} from '../data/dailyTargetService';
import {
  awardSpotXp,
  addXp,
  checkAndAwardBrandMilestoneXp,
} from '../services/progressionService';

interface IdentifiedCarData {
  carName: string;
  make?: string;
  model?: string;
  subModel?: string;
  generation?: string;
  yearRange?: string;
  color?: {
    name: string;
    baseColor?: string;
    hex?: string;
  };
  isCar: boolean;
  confidence?: number;
}

type FeedbackState = 'pending' | 'agreed' | 'disagreed_entering' | 'submitted';

interface FeedbackStats {
  totalFeedback: number;
  agreed: number;
  corrected: number;
}

interface ScannerPageProps {
  onNavigate?: (tab: AppTab) => void;
}

export function ScannerPage({ onNavigate }: ScannerPageProps) {
  // Live Camera DOM references
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const galleryInputRef = useRef<HTMLInputElement | null>(null);
  const cameraInputRef = useRef<HTMLInputElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Live in-app camera controls and state
  const [cameraActive, setCameraActive] = useState<boolean>(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [facingMode, setFacingMode] = useState<'environment' | 'user'>('environment');
  const [hasTorch, setHasTorch] = useState<boolean>(false);
  const [torchOn, setTorchOn] = useState<boolean>(false);
  const [shutterFlash, setShutterFlash] = useState<boolean>(false);
  const [showInstructionsModal, setShowInstructionsModal] = useState<boolean>(false);

  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [scanResult, setScanResult] = useState<IdentifiedCarData | null>(null);
  const [scanError, setScanError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  // Feedback & Training state
  const [feedbackState, setFeedbackState] = useState<FeedbackState>('pending');
  const [userCorrectionText, setUserCorrectionText] = useState<string>('');
  const [isSubmittingFeedback, setIsSubmittingFeedback] = useState<boolean>(false);
  const [feedbackStats, setFeedbackStats] = useState<FeedbackStats | null>(null);

  // Correction autocomplete suggestions state
  const [suggestions, setSuggestions] = useState<CarModelSuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);
  const inputContainerRef = useRef<HTMLDivElement | null>(null);
  const correctionInputRef = useRef<HTMLInputElement | null>(null);

  // Custom community / niche cars
  const [customCars, setCustomCars] = useState<CustomCarRecord[]>([]);
  const [isAddingCustomCar, setIsAddingCustomCar] = useState<boolean>(false);
  const [customCarAddedSuccess, setCustomCarAddedSuccess] = useState<string | null>(null);
  const [isDailyTargetMatch, setIsDailyTargetMatch] = useState<boolean>(false);
  const [dailyTargetBonusXp, setDailyTargetBonusXp] = useState<number>(0);
  const [collectionScanResult, setCollectionScanResult] = useState<CarScanResult | null>(null);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (inputContainerRef.current && !inputContainerRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Load feedback stats and custom cars from backend & local storage
  useEffect(() => {
    fetchFeedbackStats();
    loadCustomCarsFromSources();

    const handleDataCleared = () => {
      resetScanner();
      setCustomCars([]);
      setFeedbackStats({ totalFeedback: 0, agreed: 0, corrected: 0 });
      setTimeout(() => {
        loadCustomCarsFromSources();
        fetchFeedbackStats();
      }, 50);
    };

    window.addEventListener('cardex_data_cleared', handleDataCleared);
    return () => {
      window.removeEventListener('cardex_data_cleared', handleDataCleared);
    };
  }, []);

  const loadCustomCarsFromSources = async () => {
    // 1. Read local storage first (already tombstone filtered)
    const local = getLocalCustomCars();
    setCustomCars(local);

    // 2. Fetch server-persisted database of custom cars
    try {
      const res = await fetch('/api/custom-cars');
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data.cars)) {
          const map = new Map<string, CustomCarRecord>();
          for (const c of local) {
            if (!isCustomCarTombstoned(c.fullName, c.id)) {
              map.set(c.fullName.toLowerCase(), c);
            }
          }
          for (const c of data.cars) {
            if (!isCustomCarTombstoned(c.fullName, c.id)) {
              map.set(c.fullName.toLowerCase(), c);
            }
          }
          const combined = Array.from(map.values());
          setCustomCars(combined);
        }
      }
    } catch {
      // ignore
    }
  };

  const fetchFeedbackStats = async () => {
    try {
      const res = await fetch('/api/car-feedback');
      if (res.ok) {
        const data = await res.json();
        setFeedbackStats({
          totalFeedback: data.totalFeedback || 0,
          agreed: data.agreed || 0,
          corrected: data.corrected || 0,
        });
      }
    } catch {
      // ignore
    }
  };

  // Camera live stream starter
  const startCamera = async (facing: 'environment' | 'user') => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }

    setCameraError(null);
    setTorchOn(false);

    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Live camera not supported in this browser.');
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
          console.warn('Camera video playback warning:', err);
        });
      }

      setCameraActive(true);

      const videoTrack = stream.getVideoTracks()[0];
      if (videoTrack) {
        const capabilities = (videoTrack.getCapabilities && videoTrack.getCapabilities()) as any;
        setHasTorch(Boolean(capabilities && capabilities.torch));
      }
    } catch (err: any) {
      console.warn('In-app camera stream could not be started:', err);
      setCameraActive(false);
      if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
        setCameraError('Camera permission was denied. Please allow camera access in your browser or select a photo from your library.');
      } else if (err.name === 'NotFoundError' || err.name === 'DevicesNotFoundError') {
        setCameraError('No camera hardware found on this device.');
      } else {
        setCameraError('Camera is currently unavailable. You can select a photo from your gallery.');
      }
    }
  };

  // Ensure camera streams whenever capturedImage is null (idle camera mode)
  useEffect(() => {
    if (!capturedImage) {
      startCamera(facingMode);
    } else {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop());
        streamRef.current = null;
      }
      setCameraActive(false);
    }

    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop());
        streamRef.current = null;
      }
    };
  }, [capturedImage, facingMode]);

  // Flip camera between front/back
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

  // Capture instantaneous frame from the live video stream
  const capturePhoto = () => {
    if (!videoRef.current || isScanning) return;

    try {
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
        if (facingMode === 'user') {
          ctx.translate(width, 0);
          ctx.scale(-1, 1);
        }
        ctx.drawImage(video, 0, 0, width, height);

        const dataUrl = canvas.toDataURL('image/jpeg', 0.9);

        // Turn off torch & stop stream
        if (streamRef.current) {
          streamRef.current.getTracks().forEach((t) => t.stop());
          streamRef.current = null;
        }
        setCameraActive(false);

        setCapturedImage(dataUrl);
        identifyCar(dataUrl);
      }
    } catch (err) {
      console.error('Failed to capture frame from in-app camera:', err);
    }
  };

  // Handle gallery file selection
  const handleGalleryFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop());
        streamRef.current = null;
      }
      setCameraActive(false);
      processFile(file);
    }
  };

  // Synchronous trigger for device camera fallback
  const triggerCamera = () => {
    setScanError(null);
    if (cameraInputRef.current) {
      cameraInputRef.current.value = '';
      cameraInputRef.current.click();
    }
  };

  // Synchronous trigger for photo upload
  const triggerUpload = () => {
    setScanError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
      fileInputRef.current.click();
    }
  };

  // Identify car image via backend AI vision
  const identifyCar = async (base64Image: string) => {
    setIsScanning(true);
    setScanError(null);
    setScanResult(null);
    setFeedbackState('pending');
    setUserCorrectionText('');

    try {
      const response = await fetch('/api/identify-car', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageBase64: base64Image,
          mimeType: 'image/jpeg',
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || errorData.message || 'Failed to identify car');
      }

      const result = await response.json();
      const car = result.data;

      if (!car) {
        throw new Error('No car data returned from scanner.');
      }

      // Check if image is actually a car
      if (car.isCar === false || (car.make === 'N/A' && car.model === 'N/A')) {
        setScanResult({
          carName: 'No Car Detected',
          isCar: false,
          confidence: 0,
        });
        return;
      }

      // Format clean, concise car name
      let fullCarName = '';
      if (car.make && car.model) {
        const makeClean = car.make.trim();
        const modelClean = car.model.trim();

        if (modelClean.toLowerCase().startsWith(makeClean.toLowerCase())) {
          fullCarName = modelClean;
        } else {
          fullCarName = `${makeClean} ${modelClean}`;
        }

        if (car.subModel && !fullCarName.toLowerCase().includes(car.subModel.toLowerCase())) {
          fullCarName += ` ${car.subModel.trim()}`;
        }
      } else if (car.model) {
        fullCarName = car.model;
      } else if (car.name) {
        fullCarName = car.name;
      } else {
        fullCarName = 'Identified Vehicle';
      }

      setScanResult({
        carName: fullCarName,
        make: car.make,
        model: car.model,
        subModel: car.subModel,
        generation: car.generation,
        yearRange: car.yearRange,
        color: car.color,
        isCar: true,
        confidence: car.confidence,
      });

      // Compress user submitted photo for high performance, sharp rendering, and quota-safe storage
      const userPhoto = await compressImageDataUrl(base64Image, 400, 300, 0.65);

      // Save to scanned cars history with full submitted photo
      saveScannedCar({
        carName: fullCarName,
        make: car.make,
        model: car.model,
        yearRange: car.yearRange,
        imageThumbnail: userPhoto,
      });

      // Update brand collection and completion using user submitted photo as the car's photo
      const scanStatusResult = recordCarScanToCollection(
        car.make || fullCarName,
        car.model || fullCarName,
        car.color,
        userPhoto
      );
      setCollectionScanResult(scanStatusResult);

      if (scanStatusResult.isDuplicate) {
        addDuplicateBonusXp(scanStatusResult.xpAwarded);
        addXp(scanStatusResult.xpAwarded || 50, `Duplicate Spot: ${fullCarName}`, 'spot');
      } else {
        awardSpotXp(scanStatusResult.car?.rarity || 'Common', fullCarName, false, !!userPhoto);
      }

      // Check if this car matches the Daily Spotting Target Brand (Scaled rarity XP bounty)
      try {
        const targetState = getDailyTargetState();
        if (isBrandMatchForDailyTarget(targetState.targetBrand, fullCarName, car.make, car.model)) {
          markDailyTargetCompleted();
          const bounty = targetState.xpBounty || getDailyTargetXpBounty(targetState.targetBrand.rarityTier);
          setDailyTargetBonusXp(bounty);
          setIsDailyTargetMatch(true);
          addXp(bounty, `Daily Target Complete: ${targetState.targetBrand.brand}`, 'daily_target');
        } else {
          setIsDailyTargetMatch(false);
        }
      } catch {
        // ignore
      }
    } catch (err: any) {
      console.error('Car identification error:', err);
      let friendlyMessage = 'Could not identify this car. Please try another photo.';
      if (err.message) {
        if (err.message.includes('429') || err.message.toLowerCase().includes('quota')) {
          friendlyMessage = 'AI scanning quota temporarily reached. Please retry in a few moments or enter details manually.';
        } else if (err.message.includes('503') || err.message.toLowerCase().includes('demand')) {
          friendlyMessage = 'AI vision service is experiencing high traffic. Please retry in a few seconds.';
        } else if (!err.message.startsWith('{')) {
          friendlyMessage = err.message;
        }
      }
      setScanError(friendlyMessage);
    } finally {
      setIsScanning(false);
    }
  };

  // Submit user agreement (Thumbs Up)
  const handleAgree = async () => {
    if (!scanResult) return;
    setIsSubmittingFeedback(true);

    try {
      const res = await fetch('/api/car-feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          aiIdentifiedFull: scanResult.carName,
          aiMake: scanResult.make,
          aiModel: scanResult.model,
          userAgreed: true,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.stats) {
          setFeedbackStats(data.stats);
        }
      }
      setFeedbackState('agreed');
    } catch (err) {
      console.error('Failed to submit agreement:', err);
      // Still allow UI state transition
      setFeedbackState('agreed');
    } finally {
      setIsSubmittingFeedback(false);
    }
  };

  // User initiates disagreement (Thumbs Down)
  const handleStartDisagree = () => {
    setFeedbackState('disagreed_entering');
    setUserCorrectionText('');
    setSuggestions([]);
    setShowSuggestions(false);
    setHighlightedIndex(-1);
  };

  // Autocomplete search as user types
  const handleCorrectionInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setUserCorrectionText(val);

    if (val.trim().length >= 1) {
      const matches = searchMasterCarCatalog(val, customCars, 8);
      setSuggestions(matches);
      setShowSuggestions(true);
      setHighlightedIndex(-1);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
      setHighlightedIndex(-1);
    }
  };

  // Add a brand-new niche car to the database permanently
  const handleAddNewCustomCar = async (carName: string) => {
    const trimmed = carName.trim();
    if (!trimmed) return;

    // Un-tombstone in case it was previously deleted and user now explicitly re-adds it
    removeCustomCarTombstone(trimmed);

    setIsAddingCustomCar(true);
    const parts = trimmed.split(/\s+/);
    const newCarRecord: CustomCarRecord = {
      id: 'car_' + Date.now(),
      fullName: trimmed,
      make: parts[0] || 'Custom',
      model: parts.slice(1).join(' ') || trimmed,
      category: 'User Added',
      addedAt: new Date().toISOString(),
    };

    // Save locally immediately
    saveLocalCustomCar(newCarRecord);
    setCustomCars((prev) => {
      if (!prev.some((c) => c.fullName.toLowerCase() === trimmed.toLowerCase())) {
        return [newCarRecord, ...prev];
      }
      return prev;
    });

    try {
      const res = await fetch('/api/custom-cars', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ carName: trimmed, category: 'User Added' }),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.car) {
          newCarRecord.id = data.car.id;
        }
      }
    } catch (err) {
      console.warn('Could not post custom car to backend:', err);
    } finally {
      setIsAddingCustomCar(false);
      setUserCorrectionText(trimmed);
      setShowSuggestions(false);
      setCustomCarAddedSuccess(`Added "${trimmed}" to car database!`);
      setTimeout(() => setCustomCarAddedSuccess(null), 4000);
      if (correctionInputRef.current) {
        correctionInputRef.current.focus();
      }
    }
  };

  // Select car suggestion from autocomplete list
  const handleSelectSuggestion = (carName: string) => {
    setUserCorrectionText(carName);
    setShowSuggestions(false);
    setHighlightedIndex(-1);
    if (correctionInputRef.current) {
      correctionInputRef.current.focus();
    }
  };

  // Keyboard navigation for suggestions list
  const handleCorrectionKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (showSuggestions && suggestions.length > 0) {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setHighlightedIndex((prev) => (prev < suggestions.length - 1 ? prev + 1 : 0));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : suggestions.length - 1));
      } else if (e.key === 'Enter') {
        if (highlightedIndex >= 0 && suggestions[highlightedIndex]) {
          e.preventDefault();
          handleSelectSuggestion(suggestions[highlightedIndex].fullName);
          return;
        }
      } else if (e.key === 'Escape') {
        setShowSuggestions(false);
      }
    }
  };

  // Submit disagreement with optional user correction
  const handleSubmitCorrection = async () => {
    if (!scanResult) return;
    setIsSubmittingFeedback(true);
    setShowSuggestions(false);

    const trimmedCorrection = userCorrectionText.trim();

    try {
      const res = await fetch('/api/car-feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          aiIdentifiedFull: scanResult.carName,
          aiMake: scanResult.make,
          aiModel: scanResult.model,
          userAgreed: false,
          userCorrection: trimmedCorrection || undefined,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.stats) {
          setFeedbackStats(data.stats);
        }
      }

      // If the user specified what car it actually was, update the scan result name to reflect their correction
      if (trimmedCorrection) {
        setScanResult((prev) =>
          prev
            ? {
                ...prev,
                carName: trimmedCorrection,
              }
            : null
        );

        // Also ensure this car is saved to our custom cars database if not already present
        removeCustomCarTombstone(trimmedCorrection);
        const isKnown =
          COMPREHENSIVE_CAR_CATALOG.some(
            (c) => c.fullName.toLowerCase() === trimmedCorrection.toLowerCase()
          ) ||
          customCars.some(
            (c) => c.fullName.toLowerCase() === trimmedCorrection.toLowerCase()
          );

        if (!isKnown) {
          const parts = trimmedCorrection.split(/\s+/);
          const newCarRecord: CustomCarRecord = {
            id: 'car_' + Date.now(),
            fullName: trimmedCorrection,
            make: parts[0] || 'Custom',
            model: parts.slice(1).join(' ') || trimmedCorrection,
            category: 'User Added',
            addedAt: new Date().toISOString(),
          };
          saveLocalCustomCar(newCarRecord);
          setCustomCars((prev) => [newCarRecord, ...prev]);
        }

        // Also record the verified car correction to the collection using the submitted photo
        const parts = trimmedCorrection.split(/\s+/);
        const userPhoto = capturedImage ? await compressImageDataUrl(capturedImage, 400, 300, 0.65) : undefined;
        const scanStatus = recordCarScanToCollection(
          parts[0] || trimmedCorrection,
          parts.slice(1).join(' ') || trimmedCorrection,
          undefined,
          userPhoto
        );

        if (scanStatus.isDuplicate) {
          addXp(scanStatus.xpAwarded || 50, `Duplicate Spot: ${trimmedCorrection}`, 'spot');
        } else {
          awardSpotXp(scanStatus.car?.rarity || 'Common', trimmedCorrection, false, !!userPhoto);
        }

        // Check if this corrected car matches the Daily Spotting Target Brand
        try {
          const targetState = getDailyTargetState();
          if (
            isBrandMatchForDailyTarget(
              targetState.targetBrand,
              trimmedCorrection,
              parts[0],
              parts.slice(1).join(' ')
            )
          ) {
            markDailyTargetCompleted();
            const bounty = targetState.xpBounty || getDailyTargetXpBounty(targetState.targetBrand.rarityTier);
            setDailyTargetBonusXp(bounty);
            setIsDailyTargetMatch(true);
            addXp(bounty, `Daily Target Complete: ${targetState.targetBrand.brand}`, 'daily_target');
          }
        } catch {
          // ignore
        }
      }

      setFeedbackState('submitted');
    } catch (err) {
      console.error('Failed to submit correction:', err);
      setFeedbackState('submitted');
    } finally {
      setIsSubmittingFeedback(false);
    }
  };

  // Process a selected file
  const processFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      setScanError('Please select a valid image file.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      setCapturedImage(dataUrl);
      identifyCar(dataUrl);
    };
    reader.onerror = () => {
      setScanError('Could not read image file. Please try again.');
    };
    reader.readAsDataURL(file);
  };

  // Handle image selected from camera or file input
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  // Drag and drop handlers
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
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  // Reset scanner to scan another car
  const resetScanner = () => {
    setCapturedImage(null);
    setScanResult(null);
    setCollectionScanResult(null);
    setScanError(null);
    setIsScanning(false);
    setFeedbackState('pending');
    setUserCorrectionText('');
    setSuggestions([]);
    setShowSuggestions(false);
    setHighlightedIndex(-1);
    setIsDailyTargetMatch(false);
  };

  // If no captured photo yet, render the dedicated CarDex live camera experience
  if (!capturedImage) {
    const dailyTarget = getDailyTargetState();

    return (
      <div className="w-full flex flex-col h-[calc(100dvh-4.5rem)] bg-black text-white relative overflow-hidden select-none">
        {/* Hidden inputs for gallery or fallback device picker */}
        <input
          ref={galleryInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleGalleryFileSelect}
        />
        <input
          ref={cameraInputRef}
          type="file"
          accept="image/*"
          capture="environment"
          className="hidden"
          onChange={handleFileChange}
        />

        {/* Live Video Feed or Permission / Hardware Fallback */}
        <div className="absolute inset-0 w-full h-full">
          {cameraActive ? (
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className={`w-full h-full object-cover ${
                facingMode === 'user' ? 'scale-x-[-1]' : ''
              }`}
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-zinc-950 space-y-4">
              <div className="w-16 h-16 rounded-3xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-amber-400 shadow-xl">
                <Camera className="w-8 h-8 stroke-1" />
              </div>
              <div className="space-y-1.5 max-w-xs">
                <h3 className="text-base font-semibold text-white">CarDex Camera</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  {cameraError || 'Starting live camera viewfinder...'}
                </p>
              </div>
              <div className="flex flex-col sm:flex-row items-center gap-2.5 pt-2 w-full max-w-xs">
                <button
                  type="button"
                  onClick={() => startCamera(facingMode)}
                  className="w-full py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 text-xs font-bold transition active:scale-95 cursor-pointer flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>Enable Camera / Retry</span>
                </button>
                <button
                  type="button"
                  onClick={() => galleryInputRef.current?.click()}
                  className="w-full py-2.5 px-4 rounded-xl bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-white text-xs font-medium transition active:scale-95 cursor-pointer flex items-center justify-center gap-2"
                >
                  <Upload className="w-4 h-4 text-zinc-300" />
                  <span>Select from Gallery</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Shutter Flash Animation */}
        {shutterFlash && (
          <div className="absolute inset-0 bg-white z-40 pointer-events-none transition-opacity duration-150 animate-out fade-out" />
        )}

        {/* TOP CAMERA OVERLAY */}
        <div className="relative z-20 flex items-center justify-between p-4 bg-gradient-to-b from-black/80 via-black/40 to-transparent">
          {/* Back Button */}
          <button
            type="button"
            onClick={() => onNavigate?.('home')}
            className="p-2.5 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-md border border-white/15 text-white transition active:scale-95 cursor-pointer"
            title="Back to Home"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>

          {/* Center Status: Live Pulse + Daily Target Badge */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/15 text-[11px] font-semibold text-white tracking-wide">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>CARDEX VISION</span>
            </div>

            {dailyTarget && !dailyTarget.completed && (
              <div className="hidden sm:flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-500/20 backdrop-blur-md border border-amber-500/30 text-[10px] font-bold text-amber-300">
                <Target className="w-3 h-3 text-amber-400" />
                <span className="truncate max-w-[100px]">{dailyTarget.targetBrand.name}</span>
              </div>
            )}
          </div>

          {/* Right Controls: Flash, Switch Camera, Instructions */}
          <div className="flex items-center gap-2">
            {hasTorch && (
              <button
                type="button"
                onClick={toggleTorch}
                className={`p-2.5 rounded-full backdrop-blur-md border transition cursor-pointer ${
                  torchOn
                    ? 'bg-amber-400 text-zinc-950 border-amber-300 shadow-md'
                    : 'bg-black/40 text-white border-white/15 hover:bg-black/60'
                }`}
                title="Toggle Flash / Torch"
              >
                {torchOn ? <Zap className="w-4 h-4 fill-current" /> : <ZapOff className="w-4 h-4" />}
              </button>
            )}

            <button
              type="button"
              onClick={toggleFacingMode}
              className="p-2.5 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-md border border-white/15 text-white transition active:scale-95 cursor-pointer"
              title="Switch Camera (Front / Back)"
            >
              <RefreshCw className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => setShowInstructionsModal(true)}
              className="p-2.5 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-md border border-white/15 text-white transition active:scale-95 cursor-pointer"
              title="Spotting Instructions & Tips"
            >
              <HelpCircle className="w-4 h-4 text-amber-400" />
            </button>
          </div>
        </div>

        {/* CENTER VIEWFINDER FRAMING RETICLE */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center p-4 pointer-events-none">
          <div className="relative w-full max-w-[320px] aspect-[4/3] rounded-2xl border border-white/20 flex items-center justify-center">
            {/* 4 Corner Brackets in CarDex Amber */}
            <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-amber-400 rounded-tl-xl" />
            <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-amber-400 rounded-tr-xl" />
            <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-amber-400 rounded-bl-xl" />
            <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-amber-400 rounded-br-xl" />

            {/* Center Crosshair */}
            <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            </div>

            {/* Status Guide Indicator */}
            <span className="absolute bottom-3 text-[10px] font-medium tracking-wider uppercase text-white/90 bg-black/60 px-3 py-1 rounded-full backdrop-blur-md border border-white/10 shadow-sm">
              Point at car &amp; tap shutter
            </span>
          </div>
        </div>

        {/* BOTTOM CAMERA ACTION BAR */}
        <div className="relative z-20 px-6 py-5 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex items-center justify-between">
          {/* Left: Gallery Picker */}
          <button
            type="button"
            onClick={() => galleryInputRef.current?.click()}
            className="w-12 h-12 rounded-2xl bg-zinc-900/80 hover:bg-zinc-800 backdrop-blur-md border border-white/20 text-white flex flex-col items-center justify-center gap-0.5 transition cursor-pointer active:scale-95 shadow-lg"
            title="Choose from Gallery"
          >
            <Upload className="w-4 h-4 text-zinc-300" />
            <span className="text-[9px] font-medium text-zinc-300">Gallery</span>
          </button>

          {/* Center: Large CarDex Shutter Button */}
          <button
            type="button"
            id="cardex-camera-shutter-btn"
            disabled={!cameraActive}
            onClick={capturePhoto}
            className="relative w-20 h-20 rounded-full p-1.5 border-2 border-amber-400 flex items-center justify-center cursor-pointer transition active:scale-90 hover:scale-105 disabled:opacity-40 disabled:pointer-events-none shadow-2xl shadow-amber-500/30"
            title="Take Photo"
          >
            <div className="w-full h-full rounded-full bg-amber-400 flex items-center justify-center">
              <div className="w-14 h-14 rounded-full bg-zinc-950 flex items-center justify-center border border-amber-300/40">
                <Camera className="w-6 h-6 text-amber-400" />
              </div>
            </div>
          </button>

          {/* Right: Instructions / Tips button */}
          <button
            type="button"
            onClick={() => setShowInstructionsModal(true)}
            className="w-12 h-12 rounded-2xl bg-zinc-900/80 hover:bg-zinc-800 backdrop-blur-md border border-white/20 text-white flex flex-col items-center justify-center gap-0.5 transition cursor-pointer active:scale-95 shadow-lg"
            title="Camera Tips"
          >
            <Info className="w-4 h-4 text-amber-400" />
            <span className="text-[9px] font-medium text-zinc-300">Tips</span>
          </button>
        </div>

        {/* Spotting Instructions Modal */}
        {showInstructionsModal && (
          <div className="fixed inset-0 z-[10000] bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="w-full max-w-sm bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 p-5 space-y-4 shadow-2xl animate-in fade-in zoom-in-95 duration-150">
              <div className="flex items-center justify-between pb-2 border-b border-zinc-100 dark:border-zinc-800">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-amber-500/15 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                    <Camera className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Spotting Tips</h3>
                    <p className="text-[11px] text-zinc-500 dark:text-zinc-400">Get the best scan accuracy</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setShowInstructionsModal(false)}
                  className="p-1.5 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-2.5 text-xs text-zinc-600 dark:text-zinc-300">
                <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/50">
                  <span className="text-base">📐</span>
                  <div>
                    <p className="font-semibold text-zinc-900 dark:text-zinc-100">3/4 Angle View</p>
                    <p className="text-[11px] text-zinc-500 dark:text-zinc-400">Capture the front or rear corner so the grille, badges, and wheels are visible.</p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/50">
                  <span className="text-base">💡</span>
                  <div>
                    <p className="font-semibold text-zinc-900 dark:text-zinc-100">Good Lighting</p>
                    <p className="text-[11px] text-zinc-500 dark:text-zinc-400">Avoid extreme glare or dark shadows. Use the flash toggle if in low light.</p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/50">
                  <span className="text-base">🎯</span>
                  <div>
                    <p className="font-semibold text-zinc-900 dark:text-zinc-100">Frame Entire Vehicle</p>
                    <p className="text-[11px] text-zinc-500 dark:text-zinc-400">Keep the whole car inside the amber reticle brackets for proper model detection.</p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/50">
                  <span className="text-base">🏆</span>
                  <div>
                    <p className="font-semibold text-zinc-900 dark:text-zinc-100">Trim Badges = Bonus XP</p>
                    <p className="text-[11px] text-zinc-500 dark:text-zinc-400">Spotting high-performance badges (AMG, M-Power, RS, GT3) yields Rare &amp; Legendary rewards!</p>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowInstructionsModal(false)}
                className="w-full py-2.5 rounded-xl bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-semibold text-xs transition active:scale-98 cursor-pointer"
              >
                Got it
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col min-h-[calc(100vh-4rem)] pb-20 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100">
      {/* Top Header of Result View */}
      <div className="sticky top-0 z-30 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-sm border-b border-zinc-200 dark:border-zinc-800 px-4 py-3 flex items-center justify-between">
        <button
          type="button"
          onClick={resetScanner}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-xs font-semibold text-zinc-800 dark:text-zinc-200 transition cursor-pointer"
        >
          <Camera className="w-3.5 h-3.5 text-amber-500" />
          <span>Scan Another</span>
        </button>

        {/* Learning telemetry pill */}
        {feedbackStats && feedbackStats.totalFeedback > 0 && (
          <div
            title="Feedback collected to train and prevent car identification errors"
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-[10px] text-zinc-600 dark:text-zinc-400 font-medium"
          >
            <Sparkles className="w-3 h-3 text-amber-500" />
            <span>
              {feedbackStats.corrected > 0
                ? `${feedbackStats.corrected} learned`
                : `${feedbackStats.agreed} verified`}
            </span>
          </div>
        )}
      </div>

      <div className="p-4 max-w-md mx-auto w-full space-y-4">
        {/* Main Photo Area / Dropzone */}
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-zinc-50 dark:bg-zinc-950 border transition-all flex items-center justify-center ${
            isDragging
              ? 'border-zinc-900 dark:border-zinc-100 bg-zinc-100/80 dark:bg-zinc-800/80'
              : 'border-zinc-200 dark:border-zinc-800'
          }`}
        >
          {/* Captured Image Preview */}
          <div className="relative w-full h-full">
            <img
              src={capturedImage}
              alt="Captured Car"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />

            {/* Scanning Overlay Animation */}
            {isScanning && (
              <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] flex flex-col items-center justify-center text-white space-y-3">
                <div className="w-10 h-10 rounded-full border-2 border-white border-t-transparent animate-spin" />
                <span className="text-xs tracking-wider uppercase font-medium">
                  Identifying car...
                </span>
              </div>
            )}
          </div>
        </div>

        {/* SCAN RESULT & FEEDBACK SECTION */}
        {scanResult && (
          <div className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 space-y-4 shadow-sm">
            {scanResult.isCar ? (
              <>
                {/* Header Tag */}
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-[10px] text-zinc-600 dark:text-zinc-400 uppercase tracking-wider font-medium">
                    {feedbackState === 'agreed' ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-500" strokeWidth={2.5} />
                        <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                          Confirmed & Kept
                        </span>
                      </>
                    ) : feedbackState === 'submitted' && userCorrectionText.trim() ? (
                      <>
                        <Sparkles className="w-3 h-3 text-amber-500" strokeWidth={2} />
                        <span className="text-amber-600 dark:text-amber-400 font-semibold">
                          Corrected & Learned
                        </span>
                      </>
                    ) : (
                      <>
                        <Check className="w-3 h-3 text-emerald-500" strokeWidth={2} />
                        <span>Car Identified</span>
                      </>
                    )}
                  </div>

                  {scanResult.yearRange && scanResult.yearRange !== 'N/A' && (
                    <span className="text-xs text-zinc-500 dark:text-zinc-400">
                      {scanResult.yearRange}
                    </span>
                  )}
                </div>

                {/* Car Name */}
                <div className="space-y-1">
                  <h2 className="text-2xl sm:text-3xl font-semibold text-zinc-900 dark:text-zinc-100 tracking-tight leading-tight">
                    {scanResult.carName}
                  </h2>

                  {/* Detected Car Color */}
                  {scanResult.color && (
                    <div className="flex items-center gap-2 pt-0.5">
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 border border-zinc-200/80 dark:border-zinc-700/80 text-xs font-medium text-zinc-800 dark:text-zinc-200 shadow-2xs">
                        <span
                          className="w-3.5 h-3.5 rounded-full border border-black/20 dark:border-white/30 shrink-0 shadow-xs"
                          style={{ backgroundColor: scanResult.color.hex || '#71717A' }}
                        />
                        <span>{scanResult.color.name}</span>
                        {scanResult.color.baseColor &&
                          scanResult.color.baseColor.toLowerCase() !== scanResult.color.name.toLowerCase() && (
                            <span className="text-[10px] text-zinc-400 dark:text-zinc-500">
                              • {scanResult.color.baseColor}
                            </span>
                          )}
                      </div>
                    </div>
                  )}

                  {/* Collection Scan Status Banner: Duplicate XP vs New Color Variant vs New Car */}
                  {collectionScanResult?.isDuplicate ? (
                    <div className="mt-2.5 p-3 rounded-xl bg-amber-500/10 dark:bg-amber-500/15 border border-amber-500/30 flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
                          <Copy className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-amber-900 dark:text-amber-200">
                            Duplicate Spotted — Not Saved
                          </p>
                          <p className="text-[11px] text-zinc-600 dark:text-zinc-400">
                            Already have this {collectionScanResult.colorName || 'color'} variant. +{collectionScanResult.xpAwarded} XP awarded instead!
                          </p>
                        </div>
                      </div>
                      <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-800 dark:text-amber-200 border border-amber-500/30 shrink-0">
                        +{collectionScanResult.xpAwarded} XP
                      </span>
                    </div>
                  ) : collectionScanResult?.isNewColor ? (
                    <div className="mt-2.5 p-3 rounded-xl bg-purple-500/10 dark:bg-purple-500/15 border border-purple-500/30 flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-purple-500/20 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
                          <Palette className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-purple-900 dark:text-purple-200">
                            New Color Variant Added to Garage!
                          </p>
                          <p className="text-[11px] text-zinc-600 dark:text-zinc-400">
                            Added {collectionScanResult.colorName} variant with your photo! Scroll variants in garage.
                          </p>
                        </div>
                      </div>
                      <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-800 dark:text-purple-200 border border-purple-500/30 shrink-0">
                        +{collectionScanResult.xpAwarded} XP
                      </span>
                    </div>
                  ) : collectionScanResult?.carAdded ? (
                    <div className="mt-2.5 p-3 rounded-xl bg-emerald-500/10 dark:bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                          <CheckCircle2 className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-emerald-900 dark:text-emerald-200">
                            New Car Added to Collection!
                          </p>
                          <p className="text-[11px] text-zinc-600 dark:text-zinc-400">
                            First spot unlocked with your real photo!
                          </p>
                        </div>
                      </div>
                      <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-800 dark:text-emerald-200 border border-emerald-500/30 shrink-0">
                        +{collectionScanResult.xpAwarded} XP
                      </span>
                    </div>
                  ) : null}

                  {/* Daily Spotting Target Bounty Banner */}
                  {isDailyTargetMatch && (
                    <div className="mt-2 p-3 rounded-xl bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/40 dark:to-orange-950/30 border border-amber-300/80 dark:border-amber-800/60 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-amber-500 fill-amber-400 shrink-0" />
                        <div>
                          <p className="text-xs font-bold text-amber-900 dark:text-amber-200">
                            Daily Brand Target Spotted!
                          </p>
                          <p className="text-[11px] text-amber-800/80 dark:text-amber-300/80">
                            Bonus XP Earned &amp; Claimed
                          </p>
                        </div>
                      </div>
                      <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-amber-200/90 dark:bg-amber-950/80 text-amber-950 dark:text-amber-100">
                        +{dailyTargetBonusXp ? dailyTargetBonusXp.toLocaleString() : '300'} XP
                      </span>
                    </div>
                  )}
                </div>

                {/* --- 1. PENDING FEEDBACK (Thumbs Up / Thumbs Down) --- */}
                {feedbackState === 'pending' && (
                  <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800 space-y-3">
                    <p className="text-xs text-zinc-600 dark:text-zinc-400 font-medium text-center">
                      Did we get this right?
                    </p>

                    <div className="grid grid-cols-2 gap-2.5">
                      {/* Thumbs Up: Agree */}
                      <button
                        type="button"
                        onClick={handleAgree}
                        disabled={isSubmittingFeedback}
                        className="py-2.5 px-3 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:border-emerald-400 dark:hover:border-emerald-600 hover:bg-emerald-50/50 dark:hover:bg-emerald-950/30 text-zinc-800 dark:text-zinc-200 text-xs font-medium flex items-center justify-center gap-2 transition active:scale-95"
                      >
                        <ThumbsUp className="w-4 h-4 text-emerald-600 dark:text-emerald-400" strokeWidth={1.8} />
                        <span>Yes, correct</span>
                      </button>

                      {/* Thumbs Down: Disagree */}
                      <button
                        type="button"
                        onClick={handleStartDisagree}
                        disabled={isSubmittingFeedback}
                        className="py-2.5 px-3 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-200 text-xs font-medium flex items-center justify-center gap-2 transition active:scale-95"
                      >
                        <ThumbsDown className="w-4 h-4 text-zinc-500 dark:text-zinc-400" strokeWidth={1.8} />
                        <span>No, wrong car</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* --- 2. DISAGREED: Enter correction or leave blank --- */}
                {feedbackState === 'disagreed_entering' && (
                  <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800 space-y-3 text-left">
                    <div className="flex items-center justify-between">
                      <label
                        htmlFor="car-correction-input"
                        className="text-xs font-medium text-zinc-800 dark:text-zinc-200 flex items-center gap-1.5"
                      >
                        <span>What car is it?</span>
                      </label>
                      <button
                        type="button"
                        onClick={() => setFeedbackState('pending')}
                        className="text-[11px] text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 flex items-center gap-1"
                      >
                        <ArrowLeft className="w-3 h-3" />
                        <span>Back</span>
                      </button>
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-zinc-500 dark:text-zinc-400">
                      <span>Can&apos;t find your car? Enter it here:</span>
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-[10px] text-zinc-600 dark:text-zinc-400 font-medium">
                        <Database className="w-2.5 h-2.5 text-zinc-400" />
                        {COMPREHENSIVE_CAR_CATALOG.length + customCars.length}+ cars
                      </span>
                    </div>

                    {/* Autocomplete Input Container */}
                    <div className="relative w-full" ref={inputContainerRef}>
                      <div className="relative flex items-center">
                        <input
                          ref={correctionInputRef}
                          id="car-correction-input"
                          type="text"
                          value={userCorrectionText}
                          onChange={handleCorrectionInputChange}
                          onKeyDown={handleCorrectionKeyDown}
                          onFocus={() => {
                            if (userCorrectionText.trim().length >= 1) {
                              const matches = searchMasterCarCatalog(userCorrectionText, customCars, 8);
                              setSuggestions(matches);
                              setShowSuggestions(true);
                            }
                          }}
                          placeholder="e.g. Aston Martin DB12, Ford Mustang, TVR Sagaris, or any model..."
                          className="w-full pl-9 pr-8 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-xs text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-900/20 dark:focus:ring-zinc-100/20 focus:border-zinc-900 dark:focus:border-zinc-100 transition shadow-sm"
                          autoFocus
                          autoComplete="off"
                        />
                        <Search className="w-4 h-4 text-zinc-400 absolute left-3 pointer-events-none" />

                        {userCorrectionText && (
                          <button
                            type="button"
                            onClick={() => {
                              setUserCorrectionText('');
                              setSuggestions([]);
                              setShowSuggestions(false);
                              if (correctionInputRef.current) {
                                correctionInputRef.current.focus();
                              }
                            }}
                            className="absolute right-2.5 p-1 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
                            title="Clear"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>

                      {/* Autocomplete Suggestions & Add Niche Car Dropdown */}
                      {showSuggestions && userCorrectionText.trim().length >= 1 && (
                        <div className="absolute left-0 right-0 top-full mt-1.5 z-50 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-xl overflow-hidden py-1 max-h-64 overflow-y-auto divide-y divide-zinc-100 dark:divide-zinc-800/60 animate-in fade-in slide-in-from-top-1 duration-150">
                          {suggestions.length > 0 && (
                            <>
                              <div className="px-3 py-1.5 text-[10px] font-medium tracking-wider uppercase text-zinc-400 dark:text-zinc-500 flex items-center justify-between bg-zinc-50/50 dark:bg-zinc-950/50">
                                <span>Matching Models</span>
                                <span>Click exact car</span>
                              </div>

                              {suggestions.map((car, idx) => {
                                const isSelected = highlightedIndex === idx;
                                return (
                                  <button
                                    key={car.fullName + idx}
                                    type="button"
                                    onClick={() => handleSelectSuggestion(car.fullName)}
                                    onMouseEnter={() => setHighlightedIndex(idx)}
                                    className={`w-full text-left px-3 py-2 flex items-center justify-between gap-2.5 transition cursor-pointer ${
                                      isSelected
                                        ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100'
                                        : 'hover:bg-zinc-50 dark:hover:bg-zinc-800/60 text-zinc-800 dark:text-zinc-200'
                                    }`}
                                  >
                                    <div className="flex items-center gap-2.5 min-w-0">
                                      <div className="w-7 h-7 rounded-lg bg-zinc-100 dark:bg-zinc-800 border border-zinc-200/60 dark:border-zinc-700/60 flex items-center justify-center shrink-0 text-zinc-500 dark:text-zinc-400">
                                        <CarIcon className="w-4 h-4" strokeWidth={1.75} />
                                      </div>
                                      <div className="min-w-0">
                                        <p className="text-xs font-semibold truncate leading-tight text-zinc-900 dark:text-zinc-100">
                                          {car.fullName}
                                        </p>
                                        <p className="text-[10px] text-zinc-400 dark:text-zinc-500 truncate">
                                          {car.make} {car.category ? `• ${car.category}` : ''}
                                        </p>
                                      </div>
                                    </div>

                                    <div className="shrink-0 flex items-center">
                                      <span className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 border border-zinc-200/50 dark:border-zinc-700/50">
                                        Select
                                      </span>
                                    </div>
                                  </button>
                                );
                              })}
                            </>
                          )}

                          {/* Option to Add New Car if not in catalog */}
                          {userCorrectionText.trim().length >= 2 &&
                            !suggestions.some(
                              (s) => s.fullName.toLowerCase() === userCorrectionText.trim().toLowerCase()
                            ) && (
                              <div className="p-2.5 bg-zinc-50 dark:bg-zinc-950/80 border-t border-zinc-200/80 dark:border-zinc-800">
                                <button
                                  type="button"
                                  onClick={() => handleAddNewCustomCar(userCorrectionText)}
                                  disabled={isAddingCustomCar}
                                  className="w-full py-2 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-medium flex items-center justify-center gap-1.5 transition active:scale-95 shadow-sm"
                                >
                                  {isAddingCustomCar ? (
                                    <div className="w-3 h-3 border-2 border-current border-t-transparent animate-spin rounded-full" />
                                  ) : (
                                    <Plus className="w-3.5 h-3.5" />
                                  )}
                                  <span>Add &ldquo;{userCorrectionText.trim()}&rdquo; to Car Database</span>
                                </button>
                                <p className="text-[10px] text-zinc-400 dark:text-zinc-500 text-center mt-1">
                                  Can&apos;t find your car? Click to add it to the database!
                                </p>
                              </div>
                            )}
                        </div>
                      )}
                    </div>

                    {/* Success notification when new car added */}
                    {customCarAddedSuccess && (
                      <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs flex items-center justify-between gap-2 animate-in fade-in duration-150">
                        <div className="flex items-center gap-2 min-w-0">
                          <Sparkles className="w-4 h-4 text-emerald-500 shrink-0" />
                          <span className="font-medium truncate">{customCarAddedSuccess}</span>
                        </div>
                        <span className="text-[10px] bg-emerald-100 dark:bg-emerald-900/60 px-2 py-0.5 rounded-md font-medium shrink-0">
                          In Database
                        </span>
                      </div>
                    )}

                    {/* Selected model chip preview */}
                    {userCorrectionText.trim() && (
                      <div className="p-2.5 rounded-lg bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700 flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2 min-w-0">
                          <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                          <span className="text-zinc-500 dark:text-zinc-400 text-[11px]">Correcting to:</span>
                          <span className="font-semibold text-zinc-900 dark:text-zinc-100 truncate">
                            {userCorrectionText.trim()}
                          </span>
                        </div>
                      </div>
                    )}

                    <div className="flex gap-2 pt-1">
                      <button
                        type="button"
                        onClick={handleSubmitCorrection}
                        disabled={isSubmittingFeedback}
                        className="flex-1 py-2.5 rounded-xl bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 text-xs font-medium hover:opacity-90 active:scale-95 transition flex items-center justify-center gap-1.5 shadow-sm"
                      >
                        {isSubmittingFeedback ? (
                          <div className="w-3 h-3 border-2 border-current border-t-transparent animate-spin rounded-full" />
                        ) : (
                          <Sparkles className="w-3.5 h-3.5" />
                        )}
                        <span>
                          {userCorrectionText.trim()
                            ? `Save as "${userCorrectionText.trim()}" & Train`
                            : 'Submit as Incorrect (Model Unknown)'}
                        </span>
                      </button>
                    </div>
                  </div>
                )}

                {/* --- 3. AGREED STATE: Confirmed & Info Kept --- */}
                {feedbackState === 'agreed' && (
                  <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800 space-y-3">
                    <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/50 flex items-start gap-2.5 text-[11px] text-emerald-800 dark:text-emerald-300 text-left">
                      <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-emerald-600 dark:text-emerald-400" />
                      <div>
                        <p className="font-medium">Car information verified & kept</p>
                        <p className="text-emerald-700/80 dark:text-emerald-400/80 text-[10px] mt-0.5">
                          Your verification has been recorded to reinforce accurate matches for similar cars.
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={resetScanner}
                      className="w-full py-2.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 text-xs font-medium hover:opacity-90 active:scale-[0.99] transition flex items-center justify-center gap-1.5"
                    >
                      <RefreshCw className="w-3.5 h-3.5" strokeWidth={1.5} />
                      <span>Scan Another Car</span>
                    </button>
                  </div>
                )}

                {/* --- 4. SUBMITTED CORRECTION STATE: Learned & Kept --- */}
                {feedbackState === 'submitted' && (
                  <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800 space-y-3">
                    <div className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 flex items-start gap-2.5 text-[11px] text-zinc-700 dark:text-zinc-300 text-left">
                      <Sparkles className="w-4 h-4 shrink-0 mt-0.5 text-amber-500" />
                      <div>
                        <p className="font-medium">
                          {userCorrectionText.trim()
                            ? `Updated to "${userCorrectionText.trim()}"`
                            : 'Feedback logged'}
                        </p>
                        <p className="text-zinc-500 dark:text-zinc-400 text-[10px] mt-0.5 leading-relaxed">
                          {userCorrectionText.trim()
                            ? 'Saved! This correction is now logged to prevent future misidentifications for this car model.'
                            : "Recorded that this was not the correct car. The scanner will use this to refine future matches."}
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={resetScanner}
                      className="w-full py-2.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 text-xs font-medium hover:opacity-90 active:scale-[0.99] transition flex items-center justify-center gap-1.5"
                    >
                      <RefreshCw className="w-3.5 h-3.5" strokeWidth={1.5} />
                      <span>Scan Another Car</span>
                    </button>
                  </div>
                )}
              </>
            ) : (
              /* No Car Detected Case */
              <div className="space-y-3">
                <div className="w-9 h-9 mx-auto rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-400">
                  <AlertCircle className="w-5 h-5" strokeWidth={1.5} />
                </div>
                <div className="space-y-1">
                  <h3 className="text-base font-medium text-zinc-900 dark:text-zinc-100">
                    No Car Detected
                  </h3>
                  <p className="text-xs text-zinc-400 dark:text-zinc-500 max-w-xs mx-auto">
                    Could not identify a vehicle in this photo. Make sure the car is clearly visible and well-lit.
                  </p>
                </div>

                <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800">
                  <button
                    type="button"
                    onClick={resetScanner}
                    className="w-full py-2.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 text-xs font-medium hover:opacity-90 active:scale-[0.99] transition flex items-center justify-center gap-1.5"
                  >
                    <RefreshCw className="w-3.5 h-3.5" strokeWidth={1.5} />
                    <span>Try Another Photo</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Scan Error Notice */}
        {scanError && (
          <div className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 text-center space-y-2">
            <p className="text-xs font-medium text-zinc-800 dark:text-zinc-200">
              {scanError}
            </p>
            <button
              type="button"
              onClick={resetScanner}
              className="px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 text-xs text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Bottom Action Button if result view is idle without a detected car */}
        {!scanResult && !isScanning && (
          <div className="pt-2">
            <button
              type="button"
              onClick={resetScanner}
              className="w-full py-3 px-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 text-xs font-semibold flex items-center justify-center gap-2 hover:opacity-95 active:scale-95 transition shadow-sm cursor-pointer"
            >
              <Camera className="w-4 h-4 text-amber-500" />
              <span>Scan Another Car</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
