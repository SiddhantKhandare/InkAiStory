import React, { useEffect } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  Alert,
} from 'react-native';

import Colors from '../utils/colors';
import { generateStory } from '../services/storyService';
import { saveStoryToHistory } from '../services/historyService';

const LoaderScreen = ({ route, navigation }) => {
  const { prompt } = route.params;

  useEffect(() => {
    generate();
  }, []);

  const generate = async () => {
    try {
      const pages = await generateStory(prompt);

      // Save to history
      const storyData = {
        id: Date.now(),
        prompt,
        pages,
        createdAt: new Date().toISOString(),
      };

      await saveStoryToHistory(storyData);

      // Navigate to reader
      navigation.replace('StoryReader', {
        pages,
        prompt,
      });
    } catch (error) {
      Alert.alert(
        'Error',
        'Failed to generate story. Please try again.'
      );
      navigation.replace('Home');
    }
  };

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={Colors.primary} />
      <Text style={styles.text}>
  Crafting your story with AI magic ✨
</Text>

    </View>
  );
};

export default LoaderScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: Colors.textSecondary,
    marginTop: 16,
    fontSize: 14,
    letterSpacing: 0.4,
  },
});
