import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { ThemeContext } from '../context/ThemeContext';
import { commonStyles } from '../styles/commonStyles';

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
