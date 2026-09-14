import React, { useState, useEffect } from 'react';
import { Home, Warehouse, Camera, Layers, Settings } from 'lucide-react';
import { AppTab } from '../types';
import { isMyGarageEnabled } from '../services/myGarageService';

interface BottomTabBarProps {
  currentTab: AppTab;
  onSelectTab: (tab: AppTab) => void;
}

interface TabItem {
  id: AppTab;
  label: string;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
}

export function BottomTabBar({ currentTab, onSelectTab }: BottomTabBarProps) {
  const [garageEnabled, setGarageEnabled] = useState<boolean>(() => isMyGarageEnabled());

  useEffect(() => {
    const handleGarageToggle = () => {
      setGarageEnabled(isMyGarageEnabled());
    };
    window.addEventListener('cardex_garage_updated', handleGarageToggle);
    return () => {
      window.removeEventListener('cardex_garage_updated', handleGarageToggle);
    };
  }, []);

  const allTabs: TabItem[] = [
    { id: 'home', label: 'Home', icon: Home },
    ...(garageEnabled ? [{ id: 'garage' as AppTab, label: 'My Garage', icon: Warehouse }] : []),
    { id: 'scanner', label: 'Scanner', icon: Camera },
    { id: 'collection', label: 'Collections', icon: Layers },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <nav
      id="bottom-tab-bar"
      aria-label="Bottom Navigation Bar"
      className="fixed bottom-0 left-0 right-0 w-full bg-white dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800 rounded-t-2xl z-[9999]"
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        width: '100%',
        zIndex: 9999,
        paddingBottom: 'max(0.6rem, env(safe-area-inset-bottom, 0.6rem))',
      }}
    >
      <div className="max-w-md mx-auto flex items-center justify-around px-2 pt-2 pb-1">
        {allTabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = currentTab === tab.id;

          return (
            <button
              key={tab.id}
              id={`nav-tab-${tab.id}`}
              type="button"
              onClick={() => onSelectTab(tab.id)}
              className={`flex flex-col items-center justify-center flex-1 py-1 transition-colors cursor-pointer ${
                isActive
                  ? 'text-zinc-900 dark:text-zinc-100'
                  : 'text-zinc-400 dark:text-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-300'
              }`}
            >
              <Icon className="w-5 h-5 mb-1" strokeWidth={1.5} />
              <span className={`text-[11px] tracking-tight ${isActive ? 'font-medium' : 'font-normal'}`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
