import React, { useState, useEffect, useCallback } from 'react';
import {
  Target,
  CheckCircle2,
  ChevronRight,
  Sparkles,
  RefreshCw,
  Flame,
  HelpCircle,
  Camera,
} from 'lucide-react';
import { UserCarCollectionState, AppTab } from '../../types';
import { ScannedCarEntry } from '../../data/userDataStorage';
import { BrandLogo } from '../collection/BrandLogo';
import {
  DailySpottingTargetState,
  getDailyTargetState,
  skipDailyTarget,
  TRIPLE_DAILY_TARGET_XP,
  TIER_CONFIG,
  formatBrandDescription,
} from '../../data/dailyTargetService';
import {
  getUserXp,
  getLevelForXp,
  getStreakData,
} from '../../services/progressionService';

interface HomeDailyTargetProps {
  collectionState: Record<string, UserCarCollectionState>;
  recentScans?: ScannedCarEntry[];
  onNavigate?: (tab: AppTab) => void;
}

export function HomeDailyTarget({
  collectionState,
  recentScans = [],
  onNavigate,
}: HomeDailyTargetProps) {
  const [targetState, setTargetState] = useState<DailySpottingTargetState>(() =>
    getDailyTargetState(collectionState, recentScans)
  );
  const [isSkipping, setIsSkipping] = useState(false);
  const [showHint, setShowHint] = useState(false);

  // Sync state whenever recentScans or collectionState updates
  useEffect(() => {
    const updated = getDailyTargetState(collectionState, recentScans);
    setTargetState(updated);
  }, [collectionState, recentScans]);

  // Listen for custom target updates
  useEffect(() => {
    const handleTargetUpdated = (e: Event) => {
      const customEvent = e as CustomEvent<DailySpottingTargetState>;
      if (customEvent.detail) {
        setTargetState(customEvent.detail);
      } else {
        setTargetState(getDailyTargetState(collectionState, recentScans));
      }
    };

    window.addEventListener('cardex_daily_target_updated', handleTargetUpdated);
    return () => {
      window.removeEventListener('cardex_daily_target_updated', handleTargetUpdated);
    };
  }, [collectionState, recentScans]);

  const handleSkip = useCallback(() => {
    if (targetState.completed || targetState.skipsRemaining <= 0 || isSkipping) return;

    setIsSkipping(true);
    try {
      const nextState = skipDailyTarget(collectionState, recentScans);
      setTargetState(nextState);
    } catch (err) {
      console.warn('Error skipping daily target:', err);
    } finally {
      setIsSkipping(false);
    }
  }, [targetState, isSkipping, collectionState, recentScans]);

  const target = targetState.targetBrand;
  const isSpotted = targetState.completed;
  const skipsLeft = targetState.skipsRemaining;
  const bountyXp = targetState.xpBounty || TRIPLE_DAILY_TARGET_XP;

  return (
    <div
      id="daily-spotting-target"
      className="rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 overflow-hidden shadow-xs transition-all"
    >
      {/* Header Banner */}
      <div className="px-4 py-2.5 bg-gradient-to-r from-rose-50/80 via-amber-50/50 to-orange-50/40 dark:from-rose-950/30 dark:via-zinc-800/80 dark:to-amber-950/20 border-b border-zinc-200/70 dark:border-zinc-800 flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-zinc-900 dark:text-zinc-100">
          <Target className="w-4 h-4 text-rose-500 animate-pulse" />
          <span className="uppercase tracking-wider text-[10px] font-bold">
            Daily Brand Target
          </span>
        </div>

        {/* XP Bounty Highlight Badge */}
        <div className="flex items-center gap-1.5">
          {getStreakData().multiplier > 1.0 && (
            <span className="flex items-center gap-1 text-[10px] font-bold text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/50 px-2 py-0.5 rounded-full border border-rose-200 dark:border-rose-900">
              <Flame className="w-3 h-3 text-rose-500 fill-rose-500" />
              <span>{getStreakData().multiplier}x</span>
            </span>
          )}
          <div className="flex items-center gap-1 text-[11px] font-bold text-amber-700 dark:text-amber-300 bg-amber-100/90 dark:bg-amber-950/70 px-2.5 py-0.5 rounded-full border border-amber-300 dark:border-amber-800 shadow-2xs">
            <Sparkles className="w-3 h-3 text-amber-500 fill-amber-400" />
            <span>+{bountyXp.toLocaleString()} XP Bounty</span>
          </div>
        </div>
      </div>

      {/* Main Target Card */}
      <div className="p-4 space-y-3.5">
        <div
          className={`relative rounded-2xl p-4 border transition-all ${
            isSpotted
              ? 'bg-gradient-to-br from-emerald-50/70 via-emerald-50/30 to-zinc-50/60 dark:from-emerald-950/30 dark:via-zinc-900 dark:to-zinc-800/50 border-emerald-300/80 dark:border-emerald-800/60'
              : target.isExotic
              ? 'bg-gradient-to-br from-purple-50/60 via-zinc-50 to-amber-50/30 dark:from-purple-950/20 dark:via-zinc-900 dark:to-amber-950/20 border-purple-200/70 dark:border-purple-800/50'
              : 'bg-gradient-to-br from-zinc-50 via-zinc-100/60 to-zinc-200/30 dark:from-zinc-900 dark:via-zinc-800/80 dark:to-zinc-800/40 border-zinc-200/80 dark:border-zinc-700/60'
          } flex flex-col sm:flex-row items-start sm:items-center gap-4 overflow-hidden`}
        >
          {/* Brand Logo & Exotic Emblem */}
          <div className="relative w-18 h-18 sm:w-20 sm:h-20 shrink-0 rounded-2xl bg-white dark:bg-zinc-800 p-2.5 shadow-xs border border-zinc-200/80 dark:border-zinc-700/80 flex items-center justify-center">
            <BrandLogo brand={target.brand} size="xl" className="w-full h-full" />
            {isSpotted ? (
              <div className="absolute -top-1.5 -right-1.5 w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-xs">
                <CheckCircle2 className="w-4 h-4" />
              </div>
            ) : target.isExotic ? (
              <div
                className="absolute -top-1.5 -right-1.5 w-6 h-6 rounded-full bg-amber-500 text-white flex items-center justify-center shadow-xs"
                title="Rare Exotic Target"
              >
                <Flame className="w-3.5 h-3.5" />
              </div>
            ) : null}
          </div>

          {/* Brand Information */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-1.5 mb-1">
              <span className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20">
                Today’s Target Brand
              </span>
              <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200/60 dark:border-zinc-700">
                {target.country}
              </span>
              {(() => {
                const tierMeta = target.rarityTier ? TIER_CONFIG[target.rarityTier] : null;
                if (tierMeta) {
                  return (
                    <span
                      className={`px-2 py-0.5 rounded-md text-[10px] font-bold border flex items-center gap-1 ${tierMeta.badgeBg} ${tierMeta.badgeText} ${tierMeta.borderClass}`}
                    >
                      {target.rarityTier === 'rare' || target.rarityTier === 'ultra-rare' ? (
                        <Flame className="w-2.5 h-2.5 text-amber-500" />
                      ) : null}
                      {tierMeta.label}
                    </span>
                  );
                }
                return (
                  <span className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-zinc-100 dark:bg-zinc-800/60 text-zinc-600 dark:text-zinc-400">
                    {target.category}
                  </span>
                );
              })()}
            </div>

            <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 tracking-tight leading-tight">
              {target.name}
            </h3>

            <p className="text-xs text-zinc-600 dark:text-zinc-300 mt-1 leading-snug">
              {formatBrandDescription(target)}
            </p>

            {/* Recognition Hint Toggle */}
            <div className="mt-2 pt-2 border-t border-zinc-200/50 dark:border-zinc-700/50">
              <button
                type="button"
                onClick={() => setShowHint((prev) => !prev)}
                className="text-[11px] font-medium text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 flex items-center gap-1 cursor-pointer transition-colors"
              >
                <HelpCircle className="w-3 h-3 text-amber-500" />
                <span>{showHint ? 'Hide Spotter ID Clue' : 'How to spot this brand on the road'}</span>
              </button>
              {showHint && (
                <p className="text-[11px] text-zinc-600 dark:text-zinc-300 mt-1 pl-4 border-l-2 border-amber-400 italic">
                  {target.hint}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Actions Row - Only Skip, Garage, and Scan Buttons */}
        <div className="flex items-center justify-end gap-2 pt-2 border-t border-zinc-100 dark:border-zinc-800 w-full flex-wrap sm:flex-nowrap">
          {/* Skip Button */}
          {!isSpotted && (
            <button
              type="button"
              id="skip-daily-target-btn"
              onClick={handleSkip}
              disabled={skipsLeft <= 0 || isSkipping}
              className={`px-3 py-1.5 rounded-xl border text-xs font-medium transition-all flex items-center gap-1.5 ${
                skipsLeft > 0 && !isSkipping
                  ? 'border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer shadow-2xs'
                  : 'border-zinc-200/50 dark:border-zinc-800 text-zinc-400 dark:text-zinc-600 bg-zinc-50/50 dark:bg-zinc-900/50 cursor-not-allowed opacity-70'
              }`}
            >
              <RefreshCw className={`w-3 h-3 ${isSkipping ? 'animate-spin' : ''}`} />
              <span>Skip {skipsLeft > 0 ? `(${skipsLeft})` : ''}</span>
            </button>
          )}

          {/* View Garage Button */}
          <button
            type="button"
            id="view-target-car-btn"
            onClick={() => onNavigate?.('collection')}
            className="px-3.5 py-1.5 rounded-xl border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 font-medium text-xs transition-colors cursor-pointer"
          >
            Garage
          </button>

          {/* Scan Button */}
          <button
            type="button"
            id="scan-target-car-btn"
            onClick={() => onNavigate?.('scanner')}
            className={`px-3.5 py-1.5 rounded-xl font-medium text-xs transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs ${
              isSpotted
                ? 'bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200'
                : 'bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-white text-white dark:text-zinc-950'
            }`}
          >
            <Camera className="w-3.5 h-3.5" />
            <span>{isSpotted ? 'Scan More' : `Scan ${target.name}`}</span>
            <ChevronRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
}
