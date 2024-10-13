import React, { createContext, useState } from 'react';

// This context will store the theme and provide a function to toggle between light and dark themes
// so that all components can access the current theme
// and toggle the theme when the user presses a button


// Create a ThemeContext
export const ThemeContext = createContext();

// ThemeProvider to toggle between light and dark themes
export const ThemeProvider = ({ children }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const toggleTheme = () => {
    setIsDarkTheme((prevTheme) => !prevTheme);
  };

  const lightTheme = {
    backgroundColor: '#FFFFFF', // Light background
    textColor: '#333', // Dark text for light theme
    buttonColor: '#007BFF', // Blue button for light theme
  };

  const darkTheme = {
    backgroundColor: '#3A2A80', // Dark purple background
    textColor: '#FFD700', // Yellow text for dark theme
    buttonColor: '#FFD700', // Yellow button for dark theme
  };

  const theme = isDarkTheme ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
