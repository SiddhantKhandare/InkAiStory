import AsyncStorage from '@react-native-async-storage/async-storage';

const HISTORY_KEY = 'INK_AI_STORY_HISTORY';
const MAX_HISTORY = 50;

export const saveStoryToHistory = async (story) => {
  try {
    const existing = await AsyncStorage.getItem(HISTORY_KEY);
    let history = existing ? JSON.parse(existing) : [];

    history.unshift(story); // newest first

    if (history.length > MAX_HISTORY) {
      history = history.slice(0, MAX_HISTORY);
    }

    await AsyncStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  } catch (error) {
    console.log('Save history error', error);
  }
};

export const getHistory = async () => {
  try {
    const data = await AsyncStorage.getItem(HISTORY_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    return [];
  }
};

export const clearHistory = async () => {
  await AsyncStorage.removeItem(HISTORY_KEY);
};



export const deleteStoryFromHistory = async (id) => {
  try {
    const existing = await AsyncStorage.getItem(HISTORY_KEY);
    let history = existing ? JSON.parse(existing) : [];

    history = history.filter(item => item.id !== id);

    await AsyncStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  } catch (error) {
    console.log('Delete history error', error);
  }
};
