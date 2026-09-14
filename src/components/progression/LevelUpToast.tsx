import React, { useState, useEffect } from 'react';
import { Trophy, Sparkles, X, ChevronRight, Zap } from 'lucide-react';
import { LevelDefinition } from '../../services/progressionService';

interface LevelUpToastProps {
  onOpenRoadmap?: () => void;
}

export function LevelUpToast({ onOpenRoadmap }: LevelUpToastProps) {
  const [levelUpData, setLevelUpData] = useState<{
    newLevel: number;
    title: string;
    levelDef?: LevelDefinition;
  } | null>(null);

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;

    const handleLevelUp = (e: Event) => {
      const custom = e as CustomEvent<{
        oldLevel: number;
        newLevel: number;
        title: string;
        levelDef?: LevelDefinition;
      }>;
      if (custom.detail) {
        setLevelUpData({
          newLevel: custom.detail.newLevel,
          title: custom.detail.title,
          levelDef: custom.detail.levelDef,
        });

        if (timer) clearTimeout(timer);
        // Auto-dismiss after 4 seconds to read, then smoothly disappear
        timer = setTimeout(() => {
          setLevelUpData(null);
        }, 4000);
      }
    };

    window.addEventListener('cardex_level_up', handleLevelUp);
    return () => {
      if (timer) clearTimeout(timer);
      window.removeEventListener('cardex_level_up', handleLevelUp);
    };
  }, []);

  if (!levelUpData) return null;

  return (
    <div
      onClick={() => {
        if (onOpenRoadmap) onOpenRoadmap();
        setLevelUpData(null);
      }}
      className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-sm animate-in slide-in-from-top-4 fade-in duration-300 cursor-pointer"
    >
      <div className="relative overflow-hidden p-4 rounded-2xl bg-zinc-900/95 text-white border border-amber-500/40 shadow-2xl backdrop-blur-md space-y-2">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-500 text-white flex items-center justify-center font-bold text-sm shadow-xs animate-bounce">
              <Trophy className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5 text-amber-400 text-[10px] font-bold uppercase tracking-wider">
                <Sparkles className="w-3 h-3" />
                <span>Level Up!</span>
              </div>
              <h4 className="text-sm font-bold text-white">
                Level {levelUpData.newLevel} &bull; {levelUpData.title}
              </h4>
            </div>
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setLevelUpData(null);
            }}
            className="text-zinc-400 hover:text-white p-1 rounded-md transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {levelUpData.levelDef?.unlockedFeature && (
          <div className="px-2.5 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-[11px] text-amber-300 flex items-center gap-1.5">
            <Zap className="w-3 h-3 text-amber-400 shrink-0" />
            <span className="truncate">Unlocked: {levelUpData.levelDef.unlockedFeature}</span>
          </div>
        )}

        {/* Auto-dismiss progress bar */}
        <div className="w-full h-0.5 bg-zinc-800 rounded-full overflow-hidden mt-1">
          <div
            className="h-full bg-amber-500 transition-all duration-[4000ms] ease-linear w-0"
            style={{ width: '100%', animation: 'shrinkWidth 4s linear forwards' }}
          />
        </div>
      </div>
    </div>
  );
}
