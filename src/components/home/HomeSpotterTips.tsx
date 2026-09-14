import React, { useState } from 'react';
import { Lightbulb, ChevronDown, ChevronUp, Sparkles, Eye, ShieldCheck, Palette } from 'lucide-react';

export function HomeSpotterTips() {
  const [isExpanded, setIsExpanded] = useState(false);

  const tips = [
    {
      icon: Eye,
      title: 'Three-Quarter Angle',
      desc: 'Aim for a 45-degree angle showing both the front grille and side profile for the highest accuracy identification.',
    },
    {
      icon: ShieldCheck,
      title: 'Badge & Caliper Clues',
      desc: 'Look out for subtle trim badges (e.g. RS, M, AMG, GT3) or brake caliper colours that reveal high-performance trims.',
    },
    {
      icon: Palette,
      title: 'Rare Paint Finishes',
      desc: 'Spot the same model in multiple colours to unlock Colour Mastery and unlock exclusive garage collection badges.',
    },
  ];

  return (
    <div className="rounded-2xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200/80 dark:border-zinc-800 p-4 sm:p-5 shadow-xs space-y-3">
      <button
        type="button"
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between text-left cursor-pointer group"
      >
        <div className="flex items-center gap-2">
          <Lightbulb className="w-4 h-4 text-amber-500" />
          <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
            Spotter Pro Field Guide
          </h3>
        </div>
        <div className="flex items-center gap-1 text-xs text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-200 transition-colors">
          <span>{isExpanded ? 'Less' : 'Tips'}</span>
          {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </div>
      </button>

      {/* Primary tip always shown */}
      <div className="flex items-start gap-2.5 text-xs text-zinc-600 dark:text-zinc-300 bg-white/80 dark:bg-zinc-800/80 p-3 rounded-xl border border-zinc-200/60 dark:border-zinc-700/60">
        <Sparkles className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong className="text-zinc-900 dark:text-zinc-100 font-medium">Spotter Rule #1:</strong>{' '}
          Capture in natural daylight whenever possible. Taillight signatures and wheel designs give instant AI match triggers.
        </p>
      </div>

      {/* Expanded tips */}
      {isExpanded && (
        <div className="space-y-2 pt-1 border-t border-zinc-200/60 dark:border-zinc-800 animate-in fade-in slide-in-from-top-1">
          {tips.map((tip, idx) => {
            const Icon = tip.icon;
            return (
              <div
                key={idx}
                className="flex items-start gap-2.5 p-2.5 rounded-lg bg-white/50 dark:bg-zinc-800/40 text-xs text-zinc-600 dark:text-zinc-400"
              >
                <Icon className="w-3.5 h-3.5 text-zinc-400 mt-0.5 shrink-0" />
                <div>
                  <p className="font-medium text-zinc-800 dark:text-zinc-200">{tip.title}</p>
                  <p className="text-[11px] leading-relaxed mt-0.5">{tip.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
