import React, { useState, useEffect } from 'react';
import { Trophy, Palette, Crown, ChevronRight, Gauge, Sparkles, Flame, Award } from 'lucide-react';
import { AppTab } from '../../types';
import { getDailyTargetState } from '../../data/dailyTargetService';
import {
  getUserXp,
  getLevelForXp,
  getStreakData,
  getUserCustomization,
} from '../../services/progressionService';

interface HomeStatsOverviewProps {
  collectedCars: number;
  totalCars: number;
  collectedColors: number;
  brandMasteries: number;
  onNavigate?: (tab: AppTab) => void;
}

export function HomeStatsOverview({
  collectedCars,
  totalCars,
  collectedColors,
  brandMasteries,
  onNavigate,
}: HomeStatsOverviewProps) {
  const [xp, setXp] = useState(() => getUserXp());
  const [streak, setStreak] = useState(() => getStreakData());
  const [customization, setCustomization] = useState(() => getUserCustomization());

  useEffect(() => {
    const handleSync = () => {
      setXp(getUserXp());
      setStreak(getStreakData());
      setCustomization(getUserCustomization());
    };

    window.addEventListener('cardex_xp_updated', handleSync);
    window.addEventListener('cardex_level_up', handleSync);
    window.addEventListener('cardex_streak_updated', handleSync);
    window.addEventListener('cardex_customization_updated', handleSync);

    return () => {
      window.removeEventListener('cardex_xp_updated', handleSync);
      window.removeEventListener('cardex_level_up', handleSync);
      window.removeEventListener('cardex_streak_updated', handleSync);
      window.removeEventListener('cardex_customization_updated', handleSync);
    };
  }, []);

  const levelInfo = getLevelForXp(xp);
  const percentage = totalCars > 0 ? Math.round((collectedCars / totalCars) * 100) : 0;
  const levelProgressPct = Math.max(0, Math.min(100, levelInfo.progressPercentage ?? levelInfo.progressPercent ?? 0));
  const displayTitle = customization.selectedTitle || levelInfo.title;

  const handleOpenRoadmap = () => {
    window.dispatchEvent(new CustomEvent('cardex_open_level_roadmap'));
  };

  return (
    <div className="rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 p-4 sm:p-5 shadow-xs space-y-4">
      {/* Top row: Spotter rank, XP and Level Roadmap link */}
      <div className="flex items-center justify-between gap-2">
        <div
          onClick={handleOpenRoadmap}
          className="flex items-center gap-2.5 cursor-pointer group min-w-0"
          title="Click to view Level Roadmap and Unlocks"
        >
          {/* Level Badge with border styling */}
          <div className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-amber-500/20 to-amber-600/10 dark:from-amber-500/30 dark:to-zinc-800 border border-amber-500/40 dark:border-amber-400/30 flex items-center justify-center text-amber-700 dark:text-amber-300 font-extrabold text-xs shrink-0 group-hover:scale-105 transition-transform shadow-xs">
            L{levelInfo.level}
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-xs font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors truncate">
                {displayTitle}
              </span>
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 font-mono font-semibold flex items-center gap-1">
                <Sparkles className="w-2.5 h-2.5 text-amber-500" />
                <span>{xp.toLocaleString()} XP</span>
              </span>

              {streak.multiplier > 1.0 && (
                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400 font-bold flex items-center gap-0.5 border border-rose-500/20">
                  <Flame className="w-2.5 h-2.5 text-rose-500 fill-rose-500" />
                  <span>{streak.multiplier}x Streak</span>
                </span>
              )}
            </div>

            <p className="text-[11px] text-zinc-500 dark:text-zinc-400 truncate">
              {levelInfo.nextLevelBaseXp && levelInfo.nextLevelBaseXp > xp
                ? `${(levelInfo.nextLevelBaseXp - xp).toLocaleString()} XP to Level ${levelInfo.level + 1}`
                : levelInfo.nextLevelXp && levelInfo.nextLevelXp > xp
                ? `${(levelInfo.nextLevelXp - xp).toLocaleString()} XP to Level ${levelInfo.level + 1}`
                : 'Max level achieved!'}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleOpenRoadmap}
          className="text-xs font-semibold text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 flex items-center gap-1 px-2.5 py-1 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-900/50 transition-colors shrink-0 cursor-pointer"
        >
          <Award className="w-3.5 h-3.5" />
          <span>Roadmap</span>
          <ChevronRight className="w-3 h-3" />
        </button>
      </div>

      {/* Level Progress Bar */}
      <div className="space-y-1">
        <div className="flex justify-between items-center text-[10px] text-zinc-500 dark:text-zinc-400 font-medium">
          <span>Level {levelInfo.level} Progress</span>
          <span>{levelProgressPct}%</span>
        </div>
        <div className="w-full h-1.5 rounded-full bg-zinc-100 dark:bg-zinc-800 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-amber-500 to-rose-500 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${levelProgressPct}%` }}
          />
        </div>
      </div>

      {/* Progress Bar */}
      <div className="space-y-1.5">
        <div className="flex justify-between items-center text-xs">
          <span className="text-zinc-500 dark:text-zinc-400">Total Completion</span>
          <span className="font-semibold text-zinc-900 dark:text-zinc-100">
            {collectedCars} <span className="text-zinc-400 font-normal">/ {totalCars} ({percentage}%)</span>
          </span>
        </div>
        <div className="w-full h-2 rounded-full bg-zinc-100 dark:bg-zinc-800 overflow-hidden">
          <div
            className="h-full bg-zinc-900 dark:bg-zinc-100 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>

      {/* 3 Metric counters */}
      <div className="grid grid-cols-3 gap-2 pt-1 border-t border-zinc-100 dark:border-zinc-800/80">
        <div className="p-2.5 rounded-xl bg-zinc-50/70 dark:bg-zinc-800/30 border border-zinc-100 dark:border-zinc-800/50 text-center">
          <div className="flex items-center justify-center text-zinc-400 dark:text-zinc-500 mb-1">
            <Trophy className="w-3.5 h-3.5" />
          </div>
          <p className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
            {collectedCars}
          </p>
          <span className="text-[10px] text-zinc-500 dark:text-zinc-400 uppercase tracking-wider font-medium">
            Cars
          </span>
        </div>

        <div className="p-2.5 rounded-xl bg-zinc-50/70 dark:bg-zinc-800/30 border border-zinc-100 dark:border-zinc-800/50 text-center">
          <div className="flex items-center justify-center text-zinc-400 dark:text-zinc-500 mb-1">
            <Palette className="w-3.5 h-3.5" />
          </div>
          <p className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
            {collectedColors}
          </p>
          <span className="text-[10px] text-zinc-500 dark:text-zinc-400 uppercase tracking-wider font-medium">
            Colours
          </span>
        </div>

        <div className="p-2.5 rounded-xl bg-zinc-50/70 dark:bg-zinc-800/30 border border-zinc-100 dark:border-zinc-800/50 text-center">
          <div className="flex items-center justify-center text-zinc-400 dark:text-zinc-500 mb-1">
            <Crown className="w-3.5 h-3.5" />
          </div>
          <p className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
            {brandMasteries}
          </p>
          <span className="text-[10px] text-zinc-500 dark:text-zinc-400 uppercase tracking-wider font-medium">
            Masteries
          </span>
        </div>
      </div>
    </div>
  );
}
