import React, { useState, useEffect, useRef } from 'react';
import { AppTab, PhonePresetId } from './types';
import { PHONE_PRESETS } from './constants/phonePresets';
import { BottomTabBar } from './components/BottomTabBar';
import { HomePage } from './components/HomePage';
import { GaragePage } from './components/garage/GaragePage';
import { ScannerPage } from './components/ScannerPage';
import { CollectionPage } from './components/CollectionPage';
import { SettingsPage } from './components/SettingsPage';
import { PhoneSizeModal } from './components/PhoneSizeModal';
import { resetScrollToTop } from './utils/scrollHelper';
import { StartupFlowManager } from './components/startup/StartupFlowManager';
import { LevelProgressionModal } from './components/progression/LevelProgressionModal';
import { LevelUpToast } from './components/progression/LevelUpToast';

const THEME_STORAGE_KEY = 'cardex_theme';
const PRESET_STORAGE_KEY = 'cardex_phone_preset';

export default function App() {
  const [currentTab, setCurrentTab] = useState<AppTab>('home');
  const [isPhoneSizeModalOpen, setIsPhoneSizeModalOpen] = useState(false);
  const [isLevelModalOpen, setIsLevelModalOpen] = useState(false);

  useEffect(() => {
    const handleOpenRoadmap = () => {
      setIsLevelModalOpen(true);
    };
    window.addEventListener('cardex_open_level_roadmap', handleOpenRoadmap);
    return () => {
      window.removeEventListener('cardex_open_level_roadmap', handleOpenRoadmap);
    };
  }, []);

  const [activePresetId, setActivePresetId] = useState<PhonePresetId>(() => {
    try {
      const saved = localStorage.getItem(PRESET_STORAGE_KEY);
      if (saved && PHONE_PRESETS.some((p) => p.id === saved)) {
        return saved as PhonePresetId;
      }
    } catch {
      // ignore
    }
    return 'auto';
  });

  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem(THEME_STORAGE_KEY);
      return saved === 'dark';
    } catch {
      return false;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(THEME_STORAGE_KEY, isDarkMode ? 'dark' : 'light');
    } catch {
      // ignore
    }
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      document.body.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('dark');
    }
  }, [isDarkMode]);

  useEffect(() => {
    try {
      localStorage.setItem(PRESET_STORAGE_KEY, activePresetId);
    } catch {
      // ignore
    }
  }, [activePresetId]);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  const activePreset =
    PHONE_PRESETS.find((p) => p.id === activePresetId) || PHONE_PRESETS[0];
  const isFramed = activePreset.id !== 'auto' && Boolean(activePreset.width);
  const [collectionResetTrigger, setCollectionResetTrigger] = useState(0);
  const [garageResetTrigger, setGarageResetTrigger] = useState(0);
  const mainRef = useRef<HTMLElement | null>(null);

  // Automatically reset scroll position to top whenever switching tabs
  useEffect(() => {
    resetScrollToTop(false);
  }, [currentTab]);

  const handleSelectTab = (tab: AppTab) => {
    resetScrollToTop(false);
    if (tab === 'garage') {
      setGarageResetTrigger((prev) => prev + 1);
      window.dispatchEvent(new CustomEvent('cardex_reset_garage'));
    }
    if (tab === 'collection') {
      setCollectionResetTrigger((prev) => prev + 1);
      window.dispatchEvent(new CustomEvent('cardex_reset_collection'));
    }
    setCurrentTab(tab);
  };

  return (
    <StartupFlowManager>
      <div
        className={`min-h-screen w-full bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 ${
          isDarkMode ? 'dark' : ''
        } ${
          isFramed
            ? 'flex flex-col items-center justify-start overflow-x-hidden'
            : ''
        }`}
      >
        {/* Main app viewport container */}
        <div
          id="app-viewport-container"
          className="w-full bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 min-h-screen flex flex-col relative"
          style={
            isFramed && activePreset.width && activePreset.height
              ? {
                  width: `${activePreset.width}px`,
                  minHeight: '100dvh',
                  maxWidth: '100%',
                }
              : undefined
          }
        >
          {/* Scrollable content layer */}
          <main
            ref={mainRef}
            id="main-scroll-container"
            className={`w-full flex-1 overflow-y-auto overflow-x-hidden ${
              isFramed ? 'pb-20' : 'pb-24'
            }`}
            style={{
              WebkitOverflowScrolling: 'touch',
            }}
          >
            {currentTab === 'home' && <HomePage onNavigate={handleSelectTab} />}
            {currentTab === 'garage' && (
              <GaragePage
                onNavigate={handleSelectTab}
                resetTrigger={garageResetTrigger}
              />
            )}
            {currentTab === 'scanner' && (
              <ScannerPage onNavigate={handleSelectTab} />
            )}
            {currentTab === 'collection' && (
              <CollectionPage resetTrigger={collectionResetTrigger} />
            )}
            {currentTab === 'settings' && (
              <SettingsPage
                isDarkMode={isDarkMode}
                onToggleDarkMode={toggleDarkMode}
                activePresetId={activePresetId}
                onOpenPhoneSizeModal={() => setIsPhoneSizeModalOpen(true)}
              />
            )}
          </main>

          {/* Permanent bottom navigation bar fixed to the bottom */}
          <BottomTabBar currentTab={currentTab} onSelectTab={handleSelectTab} />
        </div>

        {/* Phone Specifications Mini Menu */}
        <PhoneSizeModal
          isOpen={isPhoneSizeModalOpen}
          activePresetId={activePresetId}
          onSelectPreset={setActivePresetId}
          onClose={() => setIsPhoneSizeModalOpen(false)}
        />

        {/* Global Level Up Toast Notification */}
        <LevelUpToast onOpenRoadmap={() => setIsLevelModalOpen(true)} />

        {/* Global Level Progression & Unlocks Modal */}
        <LevelProgressionModal
          isOpen={isLevelModalOpen}
          onClose={() => setIsLevelModalOpen(false)}
        />
      </div>
    </StartupFlowManager>
  );
}
