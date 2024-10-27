
import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { ThemeContext } from '../context/ThemeContext';
import { commonStyles } from '../styles/commonStyles';
import PressableButton from '../components/PressableButton'; // Import reusable button

// This screen allows the user to toggle between light and dark themes
function SettingsScreen() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <View style={[commonStyles.container, { backgroundColor: theme.backgroundColor }]}>
      <View style={styles.centered}>
        { /*Render the PressableButton component */}
        <PressableButton
        // Pass the toggleTheme function to the button onPress prop
          onPress={toggleTheme}
          title="Toggle Theme"
          style={{ backgroundColor: theme.textColor }} // Dynamic background color
          textStyle={{ color: theme.backgroundColor }} // Dynamic text color
        />
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
});

export default SettingsScreen;
