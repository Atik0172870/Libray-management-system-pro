
import React, { createContext, useContext, useState, useEffect } from 'react';

type ThemeType = 'light' | 'dark' | 'blue' | 'green' | 'purple';

interface ThemeContextType {
  currentTheme: ThemeType;
  setTheme: (theme: ThemeType) => void;
  availableThemes: {
    id: ThemeType;
    name: string;
    primaryColor: string;
  }[];
}

const themes = [
  { id: 'light', name: 'Light', primaryColor: '#ffffff' },
  { id: 'dark', name: 'Dark', primaryColor: '#1e293b' },
  { id: 'blue', name: 'Ocean Blue', primaryColor: '#0ea5e9' },
  { id: 'green', name: 'Forest Green', primaryColor: '#16a34a' },
  { id: 'purple', name: 'Royal Purple', primaryColor: '#8b5cf6' }
];

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState<ThemeType>(() => {
    const savedTheme = localStorage.getItem('libraryTheme');
    return (savedTheme as ThemeType) || 'light';
  });

  useEffect(() => {
    localStorage.setItem('libraryTheme', currentTheme);
    
    // Remove all theme classes and add the current one
    const root = window.document.documentElement;
    root.classList.remove('theme-light', 'theme-dark', 'theme-blue', 'theme-green', 'theme-purple');
    root.classList.add(`theme-${currentTheme}`);
    
    // Apply dark mode class for dark theme
    if (currentTheme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [currentTheme]);

  const setTheme = (theme: ThemeType) => {
    setCurrentTheme(theme);
  };

  return (
    <ThemeContext.Provider value={{ currentTheme, setTheme, availableThemes: themes }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
