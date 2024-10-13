import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { ThemeContext } from '../context/ThemeContext';
import { commonStyles } from '../styles/commonStyles';

// This screen allows the user to toggle between light and dark themes
// The user can press a button to toggle the theme
// The screen uses the commonStyles for consistent styling
// The screen uses the ThemeContext to access the current theme and toggle function
// The dynamic theme prop is applied to the background color and text color

function SettingsScreen() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <View style={[commonStyles.container, { backgroundColor: theme.backgroundColor }]}>
      {/* Centering the toggle button */}
      <View style={styles.centered}>
        <TouchableOpacity onPress={toggleTheme} style={styles.button}>
          <Text style={[commonStyles.buttonText, { color: theme.textColor }]}>Toggle Theme</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    padding: 10,
    backgroundColor: '#4C3D99', // A dark purple background for the button
    borderRadius: 5,
  },
});

export default SettingsScreen;
