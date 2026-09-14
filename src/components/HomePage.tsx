import React, { useState, useEffect, useMemo } from 'react';
import { Camera, Sparkles, SlidersHorizontal, Sun, Compass } from 'lucide-react';
import { AppTab, UserCarCollectionState } from '../types';
import {
  BRANDS_CATALOG,
  getCarCollectionState,
  getBrandCompletion,
} from '../data/collectionData';
import { getScannedCarsHistory, ScannedCarEntry } from '../data/userDataStorage';
import { HomeHeroScanner } from './home/HomeHeroScanner';
import { HomeStatsOverview } from './home/HomeStatsOverview';
import { HomeDailyTarget } from './home/HomeDailyTarget';
import { HomeRecentSpots } from './home/HomeRecentSpots';
import { HomeSpotterTips } from './home/HomeSpotterTips';

export interface HomePageProps {
  onNavigate?: (tab: AppTab) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  const [collectionState, setCollectionState] = useState<Record<string, UserCarCollectionState>>({});
  const [recentScans, setRecentScans] = useState<ScannedCarEntry[]>([]);

  const refreshData = () => {
    setCollectionState(getCarCollectionState());
    setRecentScans(getScannedCarsHistory());
  };

  useEffect(() => {
    refreshData();

    const handleUpdate = () => refreshData();
    window.addEventListener('cardex_collection_updated', handleUpdate);
    window.addEventListener('cardex_data_cleared', handleUpdate);

    return () => {
      window.removeEventListener('cardex_collection_updated', handleUpdate);
      window.removeEventListener('cardex_data_cleared', handleUpdate);
    };
  }, []);

  // Compute overall summary metrics
  const stats = useMemo(() => {
    let totalCars = 0;
    let collectedCars = 0;
    let collectedColors = 0;
    let brandMasteries = 0;

    BRANDS_CATALOG.forEach((brand) => {
      const { total, collected, isMastered } = getBrandCompletion(brand, collectionState);
      totalCars += total;
      collectedCars += collected;
      if (isMastered) brandMasteries += 1;

      brand.cars.forEach((c) => {
        const carState = collectionState[c.id];
        if (carState && carState.isCollected && carState.collectedColors) {
          collectedColors += carState.collectedColors.length;
        }
      });
    });

    return {
      totalCars,
      collectedCars,
      collectedColors,
      brandMasteries,
    };
  }, [collectionState]);

  // Current day formatting
  const todayFormatted = new Date().toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });

  return (
    <div className="w-full max-w-lg mx-auto px-4 py-4 sm:py-6 space-y-5 pb-12">
      {/* Sleek Top Header Bar */}
      <header className="flex items-center justify-between pb-2 border-b border-zinc-100 dark:border-zinc-800">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 flex items-center justify-center font-black text-sm tracking-tight shadow-xs">
            CX
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="text-base font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
                CarDex
              </h1>
              <span className="px-1.5 py-0.5 rounded text-[9px] font-semibold bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 uppercase tracking-wider">
                Spotter
              </span>
            </div>
            <p className="text-[11px] text-zinc-400 dark:text-zinc-500">
              {todayFormatted} &bull; Spotting Radar Online
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => onNavigate?.('scanner')}
            title="Launch Scanner"
            className="p-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 transition-colors cursor-pointer"
          >
            <Camera className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => onNavigate?.('settings')}
            title="Settings"
            className="p-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 transition-colors cursor-pointer"
          >
            <SlidersHorizontal className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* 1. Hero Spotter Card */}
      <HomeHeroScanner onNavigate={onNavigate} />

      {/* 2. Collection & Spotter Rank Overview */}
      <HomeStatsOverview
        collectedCars={stats.collectedCars}
        totalCars={stats.totalCars}
        collectedColors={stats.collectedColors}
        brandMasteries={stats.brandMasteries}
        onNavigate={onNavigate}
      />

      {/* 3. Daily Spotting Bounty / Target (Brand focused with Logo) */}
      <HomeDailyTarget
        collectionState={collectionState}
        recentScans={recentScans}
        onNavigate={onNavigate}
      />

      {/* 4. Recent Spotting Activity */}
      <HomeRecentSpots
        recentScans={recentScans}
        onNavigate={onNavigate}
      />

      {/* 7. Spotter Pro Field Guide */}
      <HomeSpotterTips />
    </div>
  );
}
