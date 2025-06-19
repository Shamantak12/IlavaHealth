import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface ThemeColors {
  primary: string;
  secondary: string;
  background: string;
  surface: string;
  text: string;
  textSecondary: string;
  border: string;
  card: string;
  success: string;
  warning: string;
  error: string;
  info: string;
}

const lightTheme: ThemeColors = {
  primary: '#27AE60',
  secondary: '#3498DB',
  background: '#FFFFFF',
  surface: '#F8F9FA',
  text: '#2C3E50',
  textSecondary: '#7F8C8D',
  border: '#E1E8ED',
  card: '#FFFFFF',
  success: '#27AE60',
  warning: '#F39C12',
  error: '#E74C3C',
  info: '#3498DB',
};

const darkTheme: ThemeColors = {
  primary: '#27AE60',
  secondary: '#3498DB',
  background: '#1A1A1A',
  surface: '#2C2C2C',
  text: '#FFFFFF',
  textSecondary: '#BDC3C7',
  border: '#34495E',
  card: '#2C2C2C',
  success: '#27AE60',
  warning: '#F39C12',
  error: '#E74C3C',
  info: '#3498DB',
};

interface ThemeContextType {
  isDarkMode: boolean;
  colors: ThemeColors;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    loadThemePreference();
  }, []);

  const loadThemePreference = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem('darkMode');
      if (savedTheme !== null) {
        setIsDarkMode(JSON.parse(savedTheme));
      }
    } catch (error) {
      console.log('Error loading theme preference:', error);
    }
  };

  const toggleTheme = async () => {
    try {
      const newTheme = !isDarkMode;
      setIsDarkMode(newTheme);
      await AsyncStorage.setItem('darkMode', JSON.stringify(newTheme));
    } catch (error) {
      console.log('Error saving theme preference:', error);
    }
  };

  const colors = isDarkMode ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ isDarkMode, colors, toggleTheme }}>
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
