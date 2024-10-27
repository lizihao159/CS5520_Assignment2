// components/PressableButton.js
import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import { commonStyles } from '../styles/commonStyles';

// Reusable PressableButton Component
const PressableButton = ({ onPress, title, style = {}, textStyle = {} }) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        style,
        { opacity: pressed ? 0.8 : 1 }, // Visual feedback for iOS/Android
      ]}
    >
      <Text style={[commonStyles.buttonText, textStyle]}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 10,
    backgroundColor: '#4C3D99', // Default dark purple background
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PressableButton;
