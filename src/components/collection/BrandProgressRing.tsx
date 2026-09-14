import React from 'react';

interface BrandProgressRingProps {
  percentage: number;
  size?: number; // size in px, default 40
  strokeWidth?: number; // default 2.5 (thin)
  showText?: boolean;
  className?: string;
  isMastered?: boolean;
}

export function BrandProgressRing({
  percentage,
  size = 42,
  strokeWidth = 2.5,
  showText = true,
  className = '',
  isMastered = false,
}: BrandProgressRingProps) {
  const radius = (size - strokeWidth * 2) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (Math.min(100, Math.max(0, percentage)) / 100) * circumference;

  // Arc stroke color: gold for mastered, emerald or clean zinc for in-progress
  const strokeColor = isMastered
    ? '#EAB308' // Gold for 100% mastery
    : percentage > 0
    ? '#10B981' // Clean Emerald for active progress
    : '#71717A'; // Muted

  return (
    <div
      className={`relative inline-flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        width={size}
        height={size}
        className="transform -rotate-90"
        viewBox={`0 0 ${size} ${size}`}
      >
        {/* Background Track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-zinc-200 dark:text-zinc-800"
        />
        {/* Progress Arc */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-500 ease-out"
        />
      </svg>

      {showText && (
        <span
          className={`absolute font-mono text-[10px] font-medium tracking-tight ${
            isMastered
              ? 'text-yellow-600 dark:text-yellow-400 font-semibold'
              : 'text-zinc-700 dark:text-zinc-300'
          }`}
        >
          {percentage}%
        </span>
      )}
    </div>
  );
}
