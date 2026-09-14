import React, { useState, useEffect } from 'react';
import {
  X,
  Trophy,
  Flame,
  Sparkles,
  Shield,
  Zap,
  CheckCircle2,
  Lock,
  ChevronRight,
  Award,
  Crown,
  Star,
  Compass,
  Layers,
  Palette,
  Clock,
} from 'lucide-react';
import {
  getUserXp,
  getLevelForXp,
  getStreakData,
  getXpActivityHistory,
  getCustomization,
  saveCustomization,
  LEVEL_DEFINITIONS,
  LevelDefinition,
} from '../../services/progressionService';

interface LevelProgressionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LevelProgressionModal({ isOpen, onClose }: LevelProgressionModalProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'roadmap' | 'customization'>('overview');
  const [currentXp, setCurrentXp] = useState<number>(() => getUserXp());
  const [streak, setStreak] = useState(() => getStreakData());
  const [activityHistory, setActivityHistory] = useState(() => getXpActivityHistory());
  const [customization, setCustomizationState] = useState(() => getCustomization());
  const [equippedNotice, setEquippedNotice] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    const refreshData = () => {
      setCurrentXp(getUserXp());
      setStreak(getStreakData());
      setActivityHistory(getXpActivityHistory());
      setCustomizationState(getCustomization());
    };

    refreshData();
    window.addEventListener('cardex_xp_updated', refreshData);
    window.addEventListener('cardex_streak_updated', refreshData);
    window.addEventListener('cardex_customization_updated', refreshData);

    return () => {
      window.removeEventListener('cardex_xp_updated', refreshData);
      window.removeEventListener('cardex_streak_updated', refreshData);
      window.removeEventListener('cardex_customization_updated', refreshData);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const levelInfo = getLevelForXp(currentXp);

  const handleEquipTitle = (title: string) => {
    const updated = saveCustomization({ equippedTitle: title });
    setCustomizationState(updated);
    setEquippedNotice(`Title set to "${title}"`);
    setTimeout(() => setEquippedNotice(null), 2500);
  };

  return (
    <div
      id="level-progression-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-lg bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200/80 dark:border-zinc-800 shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">
        {/* Modal Header */}
        <div className="px-5 py-4 border-b border-zinc-100 dark:border-zinc-800 flex items-center justify-between shrink-0 bg-gradient-to-r from-amber-500/5 via-transparent to-transparent">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-amber-500/10 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold text-sm">
              <Trophy className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5">
                <span>Spotter Progression</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold">
                  LVL {levelInfo.level}
                </span>
              </h2>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                {currentXp.toLocaleString()} Total XP &bull; {levelInfo.title}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Navigation Tabs */}
        <div className="flex items-center border-b border-zinc-100 dark:border-zinc-800 px-5 pt-2 shrink-0 gap-6">
          <button
            type="button"
            onClick={() => setActiveTab('overview')}
            className={`pb-2.5 text-xs font-semibold tracking-wide cursor-pointer transition-colors relative ${
              activeTab === 'overview'
                ? 'text-amber-600 dark:text-amber-400'
                : 'text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300'
            }`}
          >
            <span>Overview &amp; Perks</span>
            {activeTab === 'overview' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-500 rounded-full" />
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('roadmap')}
            className={`pb-2.5 text-xs font-semibold tracking-wide cursor-pointer transition-colors relative ${
              activeTab === 'roadmap'
                ? 'text-amber-600 dark:text-amber-400'
                : 'text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300'
            }`}
          >
            <span>Level Roadmap</span>
            {activeTab === 'roadmap' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-500 rounded-full" />
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('customization')}
            className={`pb-2.5 text-xs font-semibold tracking-wide cursor-pointer transition-colors relative ${
              activeTab === 'customization'
                ? 'text-amber-600 dark:text-amber-400'
                : 'text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300'
            }`}
          >
            <span>Customisation</span>
            {activeTab === 'customization' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-500 rounded-full" />
            )}
          </button>
        </div>

        {/* Notification pill */}
        {equippedNotice && (
          <div className="mx-5 mt-3 p-2 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-600 dark:text-emerald-400 text-xs font-medium flex items-center justify-center gap-1.5 animate-in fade-in duration-200">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>{equippedNotice}</span>
          </div>
        )}

        {/* Tab Content Container */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5">
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-4">
              {/* Main Level Progress Card */}
              <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200/80 dark:border-zinc-800 space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-0.5">
                    <span className="text-[10px] uppercase font-bold text-amber-600 dark:text-amber-400 tracking-wider">
                      Tier: {levelInfo.tier}
                    </span>
                    <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
                      {levelInfo.title}
                    </h3>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">
                      {levelInfo.badgeName}
                    </p>
                  </div>

                  <div className="flex flex-col items-end">
                    <span className="text-2xl font-black text-amber-500 font-mono">
                      {levelInfo.level}
                    </span>
                    <span className="text-[10px] font-semibold text-zinc-400 uppercase">
                      Spotter Level
                    </span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="space-y-1.5 pt-1">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-zinc-600 dark:text-zinc-300 font-semibold">
                      {currentXp.toLocaleString()} XP
                    </span>
                    <span className="text-zinc-400">
                      {levelInfo.nextLevelDef
                        ? `${levelInfo.nextLevelDef.xpRequired.toLocaleString()} XP (L${levelInfo.level + 1})`
                        : 'Max Handcrafted Level'}
                    </span>
                  </div>

                  <div className="w-full h-3 rounded-full bg-zinc-200 dark:bg-zinc-700 overflow-hidden p-0.5">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-amber-500 to-amber-400 transition-all duration-500 shadow-xs"
                      style={{ width: `${levelInfo.progressPercent}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-zinc-500 dark:text-zinc-400">
                    <span>{levelInfo.progressPercent}% complete</span>
                    <span>
                      {levelInfo.xpToNextLevel > 0
                        ? `${levelInfo.xpToNextLevel.toLocaleString()} XP to Level ${levelInfo.level + 1}`
                        : 'Max Milestone Reached!'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Active Perks Grid */}
              <div>
                <h4 className="text-xs font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-amber-500" />
                  <span>Current Active Perks &amp; Boosts</span>
                </h4>

                <div className="grid grid-cols-2 gap-2.5">
                  {/* Rarity Boost */}
                  <div className="p-3 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 space-y-1">
                    <div className="flex items-center gap-1.5 text-[10px] font-bold text-cyan-600 dark:text-cyan-400 uppercase tracking-wider">
                      <Sparkles className="w-3 h-3" />
                      <span>Rarity Boost</span>
                    </div>
                    <p className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                      +{levelInfo.rarityBoostPercent}%
                    </p>
                    <p className="text-[10px] text-zinc-500 dark:text-zinc-400">
                      Higher odds of rare target draws and rare encounters
                    </p>
                  </div>

                  {/* Daily Target Multiplier */}
                  <div className="p-3 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 space-y-1">
                    <div className="flex items-center gap-1.5 text-[10px] font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
                      <Award className="w-3 h-3" />
                      <span>Target Bounty</span>
                    </div>
                    <p className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                      {levelInfo.dailyTargetMultiplier}x XP
                    </p>
                    <p className="text-[10px] text-zinc-500 dark:text-zinc-400">
                      Daily target bounty scales up with your level
                    </p>
                  </div>

                  {/* Daily Streak Multiplier */}
                  <div className="p-3 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 space-y-1">
                    <div className="flex items-center gap-1.5 text-[10px] font-bold text-rose-600 dark:text-rose-400 uppercase tracking-wider">
                      <Flame className="w-3 h-3" />
                      <span>Spotting Streak</span>
                    </div>
                    <p className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                      {streak.currentStreak} Days ({streak.multiplier}x)
                    </p>
                    <p className="text-[10px] text-zinc-500 dark:text-zinc-400">
                      Daily tracking bonus applied to all XP gains
                    </p>
                  </div>

                  {/* Extra Daily Target Skips */}
                  <div className="p-3 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 space-y-1">
                    <div className="flex items-center gap-1.5 text-[10px] font-bold text-violet-600 dark:text-violet-400 uppercase tracking-wider">
                      <Shield className="w-3 h-3" />
                      <span>Bonus Skips</span>
                    </div>
                    <p className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                      +{levelInfo.extraDailySkips} Extra Skips
                    </p>
                    <p className="text-[10px] text-zinc-500 dark:text-zinc-400">
                      {levelInfo.level >= 10
                        ? 'Unlocked via Level progression'
                        : 'Unlocks at Level 10 (+1 Skip)'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Recent XP Activity Feed */}
              <div>
                <h4 className="text-xs font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-zinc-400" />
                  <span>Recent XP Activity</span>
                </h4>

                {activityHistory.length === 0 ? (
                  <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/40 border border-dashed border-zinc-200 dark:border-zinc-800 text-center text-xs text-zinc-400">
                    No XP activity logged yet. Spot cars or hit daily targets to earn XP!
                  </div>
                ) : (
                  <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                    {activityHistory.slice(0, 8).map((log) => (
                      <div
                        key={log.id}
                        className="px-3 py-2 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 flex items-center justify-between gap-2 text-xs"
                      >
                        <div className="min-w-0">
                          <p className="font-semibold text-zinc-800 dark:text-zinc-200 truncate">
                            {log.description}
                          </p>
                          <p className="text-[10px] text-zinc-400">
                            {new Date(log.timestamp).toLocaleTimeString([], {
                              hour: '2-digit',
                              minute: '2-digit',
                            })} &bull; {new Date(log.timestamp).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                          </p>
                        </div>
                        <span className="font-mono font-bold text-amber-600 dark:text-amber-400 shrink-0">
                          +{log.xpAmount} XP
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 2: LEVEL ROADMAP */}
          {activeTab === 'roadmap' && (
            <div className="space-y-3">
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Unlock higher rarity boosts, daily target multipliers, exclusive driver titles, and badges by advancing your spotter level.
              </p>

              <div className="space-y-2.5">
                {LEVEL_DEFINITIONS.map((def) => {
                  const isCompleted = currentXp >= def.xpRequired;
                  const isCurrent = levelInfo.level === def.level;

                  return (
                    <div
                      key={def.level}
                      className={`p-3.5 rounded-2xl border transition-all ${
                        isCurrent
                          ? 'bg-amber-500/10 border-amber-500/40 shadow-xs'
                          : isCompleted
                          ? 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800'
                          : 'bg-zinc-50/70 dark:bg-zinc-900/40 border-zinc-200/50 dark:border-zinc-800/50 opacity-75'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2.5">
                          <div
                            className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 ${
                              isCurrent
                                ? 'bg-amber-500 text-white shadow-xs'
                                : isCompleted
                                ? 'bg-emerald-500 text-white'
                                : 'bg-zinc-200 dark:bg-zinc-800 text-zinc-500'
                            }`}
                          >
                            {isCompleted && !isCurrent ? (
                              <CheckCircle2 className="w-4 h-4" />
                            ) : (
                              `L${def.level}`
                            )}
                          </div>

                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="text-xs font-bold text-zinc-900 dark:text-zinc-100">
                                {def.title}
                              </h4>
                              <span className="text-[10px] font-semibold px-1.5 py-0.2 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-500">
                                {def.tier}
                              </span>
                              {isCurrent && (
                                <span className="text-[10px] font-bold px-2 py-0.2 rounded-full bg-amber-500 text-white animate-pulse">
                                  Current
                                </span>
                              )}
                            </div>
                            <p className="text-[11px] text-zinc-500 dark:text-zinc-400 font-mono">
                              {def.xpRequired.toLocaleString()} XP required
                            </p>
                          </div>
                        </div>

                        <div className="text-right">
                          <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400 font-mono">
                            {def.dailyTargetMultiplier}x Bounty
                          </span>
                        </div>
                      </div>

                      {/* Perk description */}
                      <div className="mt-2 pt-2 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between text-xs">
                        <div className="flex items-center gap-1.5 text-zinc-700 dark:text-zinc-300">
                          <Zap className="w-3 h-3 text-amber-500 shrink-0" />
                          <span className="text-[11px]">{def.unlockedFeature}</span>
                        </div>
                        {def.rarityBoostPercent > 0 && (
                          <span className="text-[10px] font-semibold text-cyan-600 dark:text-cyan-400">
                            +{def.rarityBoostPercent}% Rarity
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 3: COSMETIC CUSTOMISATION */}
          {activeTab === 'customization' && (
            <div className="space-y-5">
              {/* Equippable Titles */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-amber-500" />
                  <span>Collector Titles (Level-Locked)</span>
                </h4>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  Select a title earned from your spotter milestones to display on your profile.
                </p>

                <div className="grid grid-cols-2 gap-2">
                  {LEVEL_DEFINITIONS.map((def) => {
                    const isUnlocked = levelInfo.level >= def.level;
                    const isEquipped = customization.equippedTitle === def.title;

                    return (
                      <button
                        key={def.level}
                        type="button"
                        disabled={!isUnlocked}
                        onClick={() => handleEquipTitle(def.title)}
                        className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                          isEquipped
                            ? 'bg-amber-500/10 border-amber-500 text-amber-700 dark:text-amber-400 ring-2 ring-amber-500/20'
                            : isUnlocked
                            ? 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200 hover:border-amber-400'
                            : 'bg-zinc-50 dark:bg-zinc-800/40 border-zinc-200/50 dark:border-zinc-800/50 text-zinc-400 cursor-not-allowed opacity-60'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold truncate">{def.title}</span>
                          {isEquipped ? (
                            <CheckCircle2 className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                          ) : !isUnlocked ? (
                            <Lock className="w-3 h-3 text-zinc-400 shrink-0" />
                          ) : null}
                        </div>
                        <span className="text-[10px] text-zinc-400">
                          {isUnlocked ? `Unlocked at L${def.level}` : `Requires Level ${def.level}`}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-zinc-100 dark:border-zinc-800 shrink-0 bg-zinc-50 dark:bg-zinc-900/50 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-zinc-500">
            <Flame className="w-3.5 h-3.5 text-amber-500" />
            <span>Streak: {streak.currentStreak} Days ({streak.multiplier}x Multiplier)</span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 text-xs font-bold hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
