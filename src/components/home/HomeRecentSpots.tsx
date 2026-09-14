import React, { useState } from 'react';
import { History, Camera, ChevronRight, Clock, Car } from 'lucide-react';
import { ScannedCarEntry } from '../../data/userDataStorage';
import { AppTab } from '../../types';

interface HomeRecentSpotsProps {
  recentScans: ScannedCarEntry[];
  onNavigate?: (tab: AppTab) => void;
}

export function HomeRecentSpots({ recentScans, onNavigate }: HomeRecentSpotsProps) {
  const [showAll, setShowAll] = useState(false);
  const displayScans = showAll ? recentScans : recentScans.slice(0, 5);

  return (
    <div className="rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 p-4 sm:p-5 shadow-xs space-y-3.5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <History className="w-4 h-4 text-zinc-700 dark:text-zinc-300" />
          <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
            Recent Spotting Journal
          </h3>
        </div>
        {recentScans.length > 0 && (
          <span className="text-xs text-zinc-400 font-mono">
            {recentScans.length} total logged
          </span>
        )}
      </div>

      {displayScans.length > 0 ? (
        <div className="space-y-2">
          {displayScans.map((scan) => {
            const scanDate = new Date(scan.scannedAt);
            const timeAgo = isNaN(scanDate.getTime())
              ? 'Recently'
              : scanDate.toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                });

            return (
              <div
                key={scan.id}
                className="p-3 rounded-xl bg-zinc-50/70 dark:bg-zinc-800/40 border border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-lg bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 flex items-center justify-center shrink-0 overflow-hidden text-zinc-400">
                    {scan.imageThumbnail ? (
                      <img
                        src={scan.imageThumbnail}
                        alt={scan.carName}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Car className="w-5 h-5" />
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 truncate">
                      {scan.carName}
                    </p>
                    <div className="flex items-center gap-1 text-[11px] text-zinc-500 dark:text-zinc-400">
                      <Clock className="w-3 h-3" />
                      <span>{timeAgo}</span>
                    </div>
                  </div>
                </div>

                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 text-emerald-700 dark:text-emerald-300 font-medium shrink-0">
                  Logged
                </span>
              </div>
            );
          })}
          {recentScans.length > 5 && (
            <div className="pt-1 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setShowAll((prev) => !prev)}
                className="text-xs font-semibold text-amber-600 dark:text-amber-400 hover:underline cursor-pointer"
              >
                {showAll ? 'Show fewer spots' : `Show all ${recentScans.length} spots`}
              </button>
              {onNavigate && (
                <button
                  type="button"
                  onClick={() => onNavigate('garage')}
                  className="text-xs text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 flex items-center gap-1 cursor-pointer"
                >
                  <span>Garage Timeline</span>
                  <ChevronRight className="w-3 h-3" />
                </button>
              )}
            </div>
          )}
        </div>
      ) : (
        <div className="p-6 rounded-xl bg-zinc-50/50 dark:bg-zinc-800/20 border border-dashed border-zinc-200 dark:border-zinc-800 text-center space-y-3">
          <div className="w-10 h-10 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-400 flex items-center justify-center mx-auto">
            <Camera className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <p className="text-xs font-medium text-zinc-800 dark:text-zinc-200">
              No spots recorded yet today
            </p>
            <p className="text-[11px] text-zinc-500 dark:text-zinc-400 max-w-xs mx-auto">
              Spot a vehicle on the street, tap the camera scanner, and build your digital garage.
            </p>
          </div>
          <button
            type="button"
            onClick={() => onNavigate?.('scanner')}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-950 text-xs font-medium transition-colors hover:bg-zinc-800 dark:hover:bg-white cursor-pointer"
          >
            <Camera className="w-3.5 h-3.5" />
            <span>Scan First Car</span>
          </button>
        </div>
      )}
    </div>
  );
}
