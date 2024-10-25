import React, { useContext } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { ThemeContext } from '../context/ThemeContext';
import { commonStyles } from '../styles/commonStyles';

// This screen allows the user to toggle between light and dark themes
// Uses Pressable for the button to enhance UX and responsiveness
// The screen uses the commonStyles for consistent styling
// The dynamic theme prop is applied to the background color and text color

function SettingsScreen() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <View style={[commonStyles.container, { backgroundColor: theme.backgroundColor }]}>
      {/* Centering the toggle button */}
      <View style={styles.centered}>
        <Pressable
          onPress={toggleTheme}
          style={({ pressed }) => [
            styles.button,
            { opacity: pressed ? 0.8 : 1 }, // Visual feedback on press
          ]}
        >
          <Text style={[commonStyles.buttonText, { color: theme.textColor }]}>
            Toggle Theme
          </Text>
        </Pressable>
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
