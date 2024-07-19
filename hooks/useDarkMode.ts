import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { darkModeState } from '@/states/themeState';

export default function useDarkMode() {
  const [darkMode, setDarkMode] = useRecoilState(darkModeState);

  useEffect(() => {
    const storedDarkMode = localStorage.getItem('darkMode');
    if (storedDarkMode !== null) {
      setDarkMode(storedDarkMode === 'true');
    }
  }, [setDarkMode]);

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode.toString());
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return [darkMode, setDarkMode] as const;
}
