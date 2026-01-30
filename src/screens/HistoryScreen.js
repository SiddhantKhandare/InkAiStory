import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Swipeable } from 'react-native-gesture-handler';

import Colors from '../utils/colors';
import Fonts from '../utils/fonts'; // ✅ added
import {
  getHistory,
  deleteStoryFromHistory,
} from '../services/historyService';

const HistoryScreen = ({ navigation }) => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    const data = await getHistory();
    setHistory(data);
  };

  const handleDelete = async (id) => {
    await deleteStoryFromHistory(id);
    loadHistory();
  };

  const formatDate = (date) =>
    new Date(date).toLocaleDateString();

  const formatTime = (date) =>
    new Date(date).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });

  const renderRightActions = (id) => (
    <TouchableOpacity
      style={styles.deleteBox}
      onPress={() => handleDelete(id)}
    >
      <Icon name="delete" size={22} color="#FFF" />
      <Text style={styles.deleteText}>Delete</Text>
    </TouchableOpacity>
  );

  const renderItem = ({ item }) => (
    <Swipeable
      renderRightActions={() => renderRightActions(item.id)}
    >
      <TouchableOpacity
        style={styles.card}
        activeOpacity={0.85}
        onPress={() =>
          navigation.navigate('StoryReader', {
            pages: item.pages,
            prompt: item.prompt,
          })
        }
      >
        <Text style={styles.prompt} numberOfLines={2}>
          {item.prompt}
        </Text>

        {/* Date & Time Row */}
        <View style={styles.metaRow}>
          <View style={styles.dateRow}>
            <Icon
              name="calendar-month"
              size={14}
              color={Colors.textSecondary}
              style={{ marginRight: 4 }}
            />
            <Text style={styles.date}>
              {formatDate(item.createdAt)}
            </Text>
          </View>

          <Text style={styles.time}>
            {formatTime(item.createdAt)}
          </Text>
        </View>
      </TouchableOpacity>
    </Swipeable>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backBtn}
          >
            <Icon
              name="arrow-left"
              size={24}
              color={Colors.textPrimary}
            />
          </TouchableOpacity>

          <Text style={styles.title}>History</Text>

          <View style={{ width: 24 }} />
        </View>

        {history.length === 0 ? (
          <Text style={styles.empty}>No stories yet ✨</Text>
        ) : (
          <FlatList
            data={history}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default HistoryScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
  },

  /* Header */
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  backBtn: {
    padding: 4,
  },
  title: {
    color: Colors.textPrimary,
    fontSize: 22,
    fontFamily: Fonts.bold, // ✅
  },

  empty: {
    color: Colors.textSecondary,
    textAlign: 'center',
    marginTop: 50,
    fontSize: 14,
    fontFamily: Fonts.regular, // ✅
  },

  card: {
    backgroundColor: Colors.card,
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
  },
  prompt: {
    color: Colors.textPrimary,
    fontSize: 15,
    fontFamily: Fonts.semiBold, // ✅
    marginBottom: 10,
  },

  /* Date & Time */
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  date: {
    color: Colors.textSecondary,
    fontSize: 12,
    fontFamily: Fonts.regular, // ✅
  },
  time: {
    color: Colors.textSecondary,
    fontSize: 12,
    fontFamily: Fonts.regular, // ✅
  },

  /* Swipe delete */
  deleteBox: {
    backgroundColor: '#FF3B30',
    justifyContent: 'center',
    alignItems: 'center',
    width: 90,
    borderRadius: 16,
    marginBottom: 12,
  },
  deleteText: {
    color: '#FFF',
    fontSize: 12,
    fontFamily: Fonts.semiBold, // ✅
    marginTop: 4,
  },
});
