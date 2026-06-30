'use client';

import { useEffect, useState } from 'react';
import { MingcuteMoonStarsFill } from '@/components/icons/mingcute/moon-stars-fill';
import { MingcuteSunFill } from '@/components/icons/mingcute/sun-fill';
import { ToggleSwitch } from '@/components/ToggleSwitch';
import { useLanguage } from '@/components/translate/LanguageProvider';
import { siteCopy } from '@/components/translate/translations';

const STORAGE_KEY = 'portfolio-theme';
const THEME_CHANGE_EVENT = 'portfolio-theme-change';

type Theme = 'light' | 'dark';

function getCurrentTheme(): Theme {
  if (document.documentElement.dataset.theme === 'dark') {
    return 'dark';
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;
  localStorage.setItem(STORAGE_KEY, theme);
  window.dispatchEvent(new Event(THEME_CHANGE_EVENT));
}

export function ThemeToggle() {
  const { language } = useLanguage();
  const copy = siteCopy[language].controls;
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const handleThemeChange = () => {
      setIsDark(getCurrentTheme() === 'dark');
    };

    handleThemeChange();
    window.addEventListener(THEME_CHANGE_EVENT, handleThemeChange);

    return () => {
      window.removeEventListener(THEME_CHANGE_EVENT, handleThemeChange);
    };
  }, []);

  const toggleTheme = () => {
    const currentTheme = getCurrentTheme();
    const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(nextTheme);
    setIsDark(nextTheme === 'dark');
  };

  return (
    <ToggleSwitch
      ariaLabel={copy.toggleTheme}
      title={copy.changeTheme}
      onClick={toggleTheme}
      leftContent={<MingcuteMoonStarsFill className="h-3.5 w-3.5" />}
      rightContent={<MingcuteSunFill className="h-3.5 w-3.5" />}
      leftContentClassName={isDark ? 'opacity-100' : 'opacity-0'}
      rightContentClassName={isDark ? 'opacity-0' : 'opacity-100'}
      thumbActive={isDark}
    />
  );
}
