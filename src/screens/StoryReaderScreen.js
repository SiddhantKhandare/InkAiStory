import React, { useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import PagerView from 'react-native-pager-view';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { SafeAreaView } from 'react-native-safe-area-context';

import Colors from '../utils/colors';
import Fonts from '../utils/fonts'; // ✅ added

const StoryReaderScreen = ({ route, navigation }) => {
  const { pages } = route.params;
  const pagerRef = useRef(null);

  const goNext = (index) => {
    if (index < pages.length - 1) {
      pagerRef.current.setPage(index + 1);
    }
  };

  const goPrev = (index) => {
    if (index > 0) {
      pagerRef.current.setPage(index - 1);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Top Back Button */}
      

      <PagerView style={styles.pager} initialPage={0} ref={pagerRef}>
        {pages.map((item, index) => (
          <View key={index} style={styles.page}>
            {/* Background Image */}
            <ImageBackground
              source={require('../assets/images/ai_reading.png')}
              style={styles.background}
              resizeMode="cover"
            >
              {/* Dark Overlay */}
              <View style={styles.overlay} />

              <View style={styles.topBar}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backBtn}
        >
          <Icon name="arrow-left" size={26} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

              {/* Story Text */}
              <View style={styles.content}>
                <ScrollView
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={styles.storyContent}
                >
                  <Text style={styles.storyText}>
                    {item.content}
                  </Text>
                </ScrollView>
              </View>
            </ImageBackground>

            {/* Footer */}
            <View style={styles.footer}>
              <TouchableOpacity
                disabled={index === 0}
                onPress={() => goPrev(index)}
              >
                <Icon
                  name="chevron-left"
                  size={32}
                  color={
                    index === 0
                      ? Colors.card
                      : Colors.textPrimary
                  }
                />
              </TouchableOpacity>

              <Text style={styles.pageNumber}>
                Page {index + 1} / {pages.length}
              </Text>

              {index === pages.length - 1 ? (
                <TouchableOpacity
                  onPress={() => navigation.replace('Home')}
                >
                  <Icon
                    name="exit-to-app"
                    size={24}
                    color={Colors.accent}
                  />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => goNext(index)}
                >
                  <Icon
                    name="chevron-right"
                    size={32}
                    color={Colors.textPrimary}
                  />
                </TouchableOpacity>
              )}
            </View>
          </View>
        ))}
      </PagerView>
    </SafeAreaView>
  );
};

export default StoryReaderScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  /* Top bar */
  topBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  pager: {
    flex: 1,
  },
  page: {
    flex: 1,
  },

  /* Background */
  background: {
    flex: 9,
    justifyContent: 'flex-end',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.55)',
  },

  /* Story */
  content: {
    paddingHorizontal: 20,
    paddingBottom: 12,
  },
  storyContent: {
    paddingBottom: 8,
  },
  storyText: {
    color: '#FFFFFF',
    fontSize: 18,
    lineHeight: 28,
    fontFamily: Fonts.regular, // ✅
  },

  /* Footer */
  footer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 8,
    backgroundColor: Colors.background,
  },
  pageNumber: {
    color: Colors.textSecondary,
    fontSize: 13,
    fontFamily: Fonts.medium, // ✅
  },
});
