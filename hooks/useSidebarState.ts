/**
 * useSidebarState Hook
 *
 * Manages sidebar open/closed state with localStorage persistence
 */

import { useState, useEffect } from 'react';
import * as storage from '@/lib/storage';

export function useSidebarState() {
  const [leftOpen, setLeftOpen] = useState(true);
  const [rightOpen, setRightOpen] = useState(true);
  const [autoUpdate, setAutoUpdate] = useState(true);

  useEffect(() => {
    const prefs = storage.getPreferences();
    setLeftOpen(prefs.leftSidebarOpen);
    setRightOpen(prefs.rightSidebarOpen);
    setAutoUpdate(prefs.autoUpdate);
  }, []);

  useEffect(() => {
    storage.updatePreference('leftSidebarOpen', leftOpen);
  }, [leftOpen]);

  useEffect(() => {
    storage.updatePreference('rightSidebarOpen', rightOpen);
  }, [rightOpen]);

  useEffect(() => {
    storage.updatePreference('autoUpdate', autoUpdate);
  }, [autoUpdate]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.metaKey && e.key === '[') {
        e.preventDefault();
        setLeftOpen(prev => !prev);
      }
      if (e.metaKey && e.key === ']') {
        e.preventDefault();
        setRightOpen(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return {
    leftOpen,
    rightOpen,
    autoUpdate,
    setLeftOpen,
    setRightOpen,
    setAutoUpdate,
    toggleLeft: () => setLeftOpen(prev => !prev),
    toggleRight: () => setRightOpen(prev => !prev),
  };
}
