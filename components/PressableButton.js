// components/PressableButton.js
import React, { useState } from 'react';
import { Pressable, Text, StyleSheet, Animated, Platform } from 'react-native';
import { commonStyles } from '../styles/commonStyles';

// Reusable PressableButton Component
const PressableButton = ({ onPress, title, style = {}, textStyle = {} }) => {
  const scaleValue = useState(new Animated.Value(1))[0]; // Initialize scale value

  const handlePressIn = () => {
    if (Platform.OS === 'ios') {
      Animated.spring(scaleValue, {
        toValue: 0.95, // Shrink effect
        useNativeDriver: true,
      }).start();
    }
  };

  const handlePressOut = () => {
    if (Platform.OS === 'ios') {
      Animated.spring(scaleValue, {
        toValue: 1.1, // Restore original size
        useNativeDriver: true,
      }).start();
    }
  };

  const animatedStyle = {
    transform: [{ scale: scaleValue }], // Apply scaling effect
  };

  return (
    <Animated.View style={[styles.container, animatedStyle, style]}>
      <Pressable
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={onPress}
        android_ripple={{ color: 'rgba(0, 0, 0, 0.2)' }} // Android ripple effect
        style={({ pressed }) => [
          styles.button,
          pressed && Platform.OS === 'android' && styles.pressed, // Android pressed opacity
        ]}
      >
        <Text style={[commonStyles.buttonText, textStyle]}>{title}</Text>
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 30, // More circular appearance for all platforms
    overflow: Platform.OS === 'android' ? 'hidden' : 'visible', // Needed for Android ripple
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 25,
    backgroundColor: '#4C3D99', // Default dark purple background
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: Platform.OS === 'ios' ? 30 : 10, // More rounded on iOS
  },
  pressed: {
    opacity: 0.7, // Slight opacity reduction on Android when pressed
  },
});

export default PressableButton;
