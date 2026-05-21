'use client';

import { useEffect, useRef } from 'react';

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

function syncButtonTheme(button: HTMLButtonElement | null) {
  if (!button) {
    return;
  }

  button.dataset.theme = getCurrentTheme();
}

export function ThemeToggle() {
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const handleThemeChange = () => {
      syncButtonTheme(buttonRef.current);
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
    syncButtonTheme(buttonRef.current);
  };

  return (
    <button ref={buttonRef} type="button" className="group inline-flex items-center focus-visible:outline-none focus-visible:ring-1 cursor-pointer" onClick={toggleTheme} aria-label="Cambiar entre tema claro y oscuro" title="Cambiar tema">
      <span className="relative inline-flex h-6 w-10.5 items-center border border-foreground" aria-hidden="true">
        <span className="block ml-1 h-4 w-4 bg-foreground duration-300 group-data-[theme=dark]:translate-x-4 group-data-[theme=dark]:bg-foreground" />
      </span>
    </button>
  );
}
