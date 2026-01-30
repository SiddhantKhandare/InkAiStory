import React, { useEffect, useRef } from 'react';
import {
  View,
  Animated,
  StyleSheet,
  StatusBar,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Colors from '../utils/colors';

const SplashScreen = ({ navigation }) => {
  const scaleAnim = useRef(new Animated.Value(0.7)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Logo zoom + fade animation
    Animated.parallel([
      Animated.timing(scaleAnim, {
        toValue: 1.2,        // 🔍 zoom effect
        duration: 3000,     // animation duration
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true,
      }),
    ]).start();

    // Navigate after 4 seconds
    const timer = setTimeout(() => {
      navigation.replace('Home');
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <LinearGradient
      colors={['#0F1020', '#171A3A', '#0F1020']} // 🌑 dark premium gradient
      style={styles.container}
    >
      {/* Status Bar */}
      <StatusBar
        backgroundColor="#0F1020"
        barStyle="light-content"
        translucent={false}
      />

      <Animated.Image
        source={require('../assets/images/logoWithName.png')}
        style={[
          styles.logo,
          {
            transform: [{ scale: scaleAnim }],
            opacity: opacityAnim,
          },
        ]}
        resizeMode="contain"
      />
    </LinearGradient>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 180,   // slightly bigger logo
    height: 180,
  },
});
