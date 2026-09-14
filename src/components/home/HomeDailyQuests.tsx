import React from 'react';
import { Compass, CheckCircle2, Circle, Award } from 'lucide-react';
import { UserCarCollectionState } from '../../types';
import { ScannedCarEntry } from '../../data/userDataStorage';

interface HomeDailyQuestsProps {
  collectionState: Record<string, UserCarCollectionState>;
  recentScans: ScannedCarEntry[];
}

export function HomeDailyQuests({ collectionState, recentScans }: HomeDailyQuestsProps) {
  // Check completion states
  const hasScannedToday = recentScans.length > 0;

  // Check if any collected car has > 450 HP (from collectionState)
  const collectedCarsCount = Object.values(collectionState).filter((s) => s.isCollected).length;
  const collectedColorsCount = Object.values(collectionState).reduce(
    (acc, curr) => acc + (curr.collectedColors?.length || 0),
    0
  );

  const quests = [
    {
      id: 'spot-1',
      title: 'First Rollout',
      desc: 'Spot and photograph at least 1 car today',
      completed: hasScannedToday || collectedCarsCount > 0,
      xp: '+100 XP',
    },
    {
      id: 'color-2',
      title: 'Chroma Seeker',
      desc: 'Discover 2 different paint finishes in your garage',
      completed: collectedColorsCount >= 2,
      xp: '+150 XP',
    },
    {
      id: 'sport-power',
      title: 'Speed Scout',
      desc: 'Catalogue at least 3 vehicles to expand your garage',
      completed: collectedCarsCount >= 3,
      xp: '+200 XP',
    },
  ];

  const completedCount = quests.filter((q) => q.completed).length;

  return (
    <div className="rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 p-4 sm:p-5 shadow-xs space-y-3.5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Compass className="w-4 h-4 text-zinc-700 dark:text-zinc-300" />
          <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
            Daily Missions
          </h3>
        </div>
        <span className="text-xs font-mono text-zinc-500 dark:text-zinc-400">
          {completedCount} / {quests.length} Completed
        </span>
      </div>

      <div className="space-y-2">
        {quests.map((quest) => (
          <div
            key={quest.id}
            className={`p-3 rounded-xl border transition-all flex items-center justify-between gap-3 ${
              quest.completed
                ? 'bg-emerald-50/40 dark:bg-emerald-950/20 border-emerald-200/60 dark:border-emerald-800/40'
                : 'bg-zinc-50/60 dark:bg-zinc-800/30 border-zinc-100 dark:border-zinc-800'
            }`}
          >
            <div className="flex items-start gap-2.5">
              {quest.completed ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
              ) : (
                <Circle className="w-4 h-4 text-zinc-400 dark:text-zinc-500 shrink-0 mt-0.5" />
              )}
              <div>
                <p
                  className={`text-xs font-medium ${
                    quest.completed
                      ? 'line-through text-zinc-500 dark:text-zinc-400'
                      : 'text-zinc-900 dark:text-zinc-100'
                  }`}
                >
                  {quest.title}
                </p>
                <p className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-tight mt-0.5">
                  {quest.desc}
                </p>
              </div>
            </div>

            <span
              className={`text-[10px] font-mono px-2 py-0.5 rounded-md shrink-0 ${
                quest.completed
                  ? 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 font-semibold'
                  : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400'
              }`}
            >
              {quest.xp}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
