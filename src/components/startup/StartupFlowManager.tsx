import React, { useState, useEffect } from 'react';
import { SplashScreen } from './SplashScreen';
import { LoadingScreen } from './LoadingScreen';
import { OnboardingScreen } from './OnboardingScreen';

export type StartupPhase = 'splash' | 'loading' | 'onboarding' | 'ready';

interface StartupFlowManagerProps {
  children: React.ReactNode;
}

export function StartupFlowManager({ children }: StartupFlowManagerProps) {
  const [phase, setPhase] = useState<StartupPhase>('splash');

  // Handle external triggers (e.g. owner testing reset profile/onboarding)
  useEffect(() => {
    const handleReplayOnboarding = () => {
      setPhase('splash');
    };

    window.addEventListener('cardex_replay_onboarding', handleReplayOnboarding);

    return () => {
      window.removeEventListener('cardex_replay_onboarding', handleReplayOnboarding);
    };
  }, []);

  if (phase === 'splash') {
    return <SplashScreen onComplete={() => setPhase('loading')} />;
  }

  if (phase === 'loading') {
    return (
      <LoadingScreen
        onComplete={(destination) => {
          if (destination === 'home') {
            setPhase('ready');
          } else {
            setPhase('onboarding');
          }
        }}
      />
    );
  }

  if (phase === 'onboarding') {
    return <OnboardingScreen onComplete={() => setPhase('ready')} />;
  }

  // Phase is 'ready': Render the main application (Home / Tabs)
  return <>{children}</>;
}
