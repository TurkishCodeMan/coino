import React from 'react';
import { useLocalStorage } from './useLocalStorage';
import { useMedia } from './useMedia';

function useDarkMode() {
  const [enabledState, setEnabledState] = useLocalStorage<boolean>('dark-mode-enabled', false);
  const prefersDarkMode = usePrefersDarkMode();
  const enabled = enabledState ?? prefersDarkMode;
  React.useEffect(() => {
    const className = 'dark-mode';
    const element = window.document.body;
    if (enabled) {
      element.classList.add(className);
    } else {
      element.classList.remove(className);
    }
  }, [enabled]);

  return [enabled, setEnabledState] as const;
}

function usePrefersDarkMode() {
  return useMedia<boolean>(['(prefers-color-scheme: dark)'], [true], false);
}

export { useDarkMode };
