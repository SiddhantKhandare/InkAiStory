import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Animated,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import HapticFeedback from 'react-native-haptic-feedback';
import { SafeAreaView } from 'react-native-safe-area-context';

import { getHistory } from '../services/historyService';
import Fonts from '../utils/fonts';

const HomeScreen = ({ navigation }) => {
  const [prompt, setPrompt] = useState('');
  const [historyCount, setHistoryCount] = useState(0);

  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    loadHistory();
    animateHistoryIcon();
  }, []);

  const loadHistory = async () => {
    const history = await getHistory();
    setHistoryCount(history.length);
  };

  const animateHistoryIcon = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.1,
          duration: 900,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 900,
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  const onGenerateStory = () => {
    if (!prompt.trim()) return;

    HapticFeedback.trigger('impactLight', {
      enableVibrateFallback: true,
    });

    navigation.navigate('Loader', { prompt });
  };

  return (
    <LinearGradient
      colors={['#0F1020', '#171A3A', '#0F1020']}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        {/* Top Bar */}
        <View style={styles.topBar}>
          <Text style={styles.appName}>inkAiStory</Text>

          {historyCount > 0 && (
            <TouchableOpacity
              onPress={() => navigation.navigate('History')}
              style={styles.historyWrapper}
            >
              <Animated.View
                style={{ transform: [{ scale: scaleAnim }] }}
              >
                <Icon name="history" size={24} color="#FFFFFF" />
              </Animated.View>

              <View style={styles.badge}>
                <Text style={styles.badgeText}>
                  {historyCount > 99 ? '99+' : historyCount}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        </View>

        {/* MAIN LAYOUT */}
        <View style={styles.layout}>
          {/* TOP SECTION (Logo & Title) */}
          <View style={styles.topSection}>
            <Image
              source={require('../assets/images/logo.png')}
              style={styles.logo}
              resizeMode="contain"
            />

            <Text style={styles.title}>
              AI That Writes for You
            </Text>

            <Text style={styles.subtitle}>
              Stories made from your ideas
            </Text>
          </View>

          {/* MIDDLE SECTION (Input & Button) */}
          <View style={styles.middleSection}>
            <View style={styles.inputWrapper}>
              <TextInput
                placeholder="Type your idea..."
                placeholderTextColor="#9CA3AF"
                value={prompt}
                onChangeText={setPrompt}
                style={styles.input}
                multiline
              />
            </View>

            <TouchableOpacity
              style={styles.button}
              activeOpacity={0.9}
              onPress={onGenerateStory}
            >
              <Text style={styles.buttonText}>
                Generate Story
              </Text>
            </TouchableOpacity>
          </View>

          {/* BOTTOM SPACER */}
          <View style={styles.bottomSection} />
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: 20,
  },

  /* Top Bar */
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 6,
  },
  appName: {
    color: '#FFFFFF',
    fontSize: 18,
    fontFamily: Fonts.bold,
  },

  historyWrapper: {
    position: 'relative',
    padding: 6,
  },
  badge: {
    position: 'absolute',
    top: -2,
    right: -2,
    backgroundColor: '#FF3B30',
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontFamily: Fonts.bold,
  },

  /* MAIN LAYOUT */
  layout: {
    flex: 1,
  },

  /* TOP (25%) */
  topSection: {
    flex: 2.5,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 10,
  },
  logo: {
    width: 110,
    height: 110,
    marginBottom: 12,
  },
  title: {
    fontSize: 26,
    fontFamily: Fonts.bold,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    fontFamily: Fonts.regular,
    color: '#B8B8D2',
    textAlign: 'center',
    marginTop: 4,
  },

  /* MIDDLE (40%) */
  middleSection: {
    flex: 4,
    justifyContent: 'center',
  },
  inputWrapper: {
    backgroundColor: '#1C1F4A',
    borderRadius: 28,
    paddingHorizontal: 18,
    minHeight: 52,
    justifyContent: 'center',
    marginBottom: 18,
  },
  input: {
    fontSize: 16,
    fontFamily: Fonts.regular,
    color: '#FFFFFF',
  },

  button: {
    height: 52,
    backgroundColor: '#6A11CB',
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: Fonts.semiBold,
  },

  /* BOTTOM (35%) */
  bottomSection: {
    flex: 3.5,
  },
});
























// import React, { useEffect, useRef, useState } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TextInput,
//   TouchableOpacity,
//   Image,
//   Animated,
// } from 'react-native';
// import LinearGradient from 'react-native-linear-gradient';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// import HapticFeedback from 'react-native-haptic-feedback';
// import { SafeAreaView } from 'react-native-safe-area-context';

// import { getHistory } from '../services/historyService';

// const HomeScreen = ({ navigation }) => {
//   const [prompt, setPrompt] = useState('');
//   const [historyCount, setHistoryCount] = useState(0);
//   const [inputHeight, setInputHeight] = useState(52);

//   const scaleAnim = useRef(new Animated.Value(1)).current;

//   useEffect(() => {
//     loadHistory();
//     animateHistoryIcon();
//   }, []);

//   const loadHistory = async () => {
//     const history = await getHistory();
//     setHistoryCount(history.length);
//   };

//   const animateHistoryIcon = () => {
//     Animated.loop(
//       Animated.sequence([
//         Animated.timing(scaleAnim, {
//           toValue: 1.1,
//           duration: 900,
//           useNativeDriver: true,
//         }),
//         Animated.timing(scaleAnim, {
//           toValue: 1,
//           duration: 900,
//           useNativeDriver: true,
//         }),
//       ]),
//     ).start();
//   };

//   const onGenerateStory = () => {
//     if (!prompt.trim()) return;

//     HapticFeedback.trigger('impactLight', {
//       enableVibrateFallback: true,
//     });

//     navigation.navigate('Loader', { prompt });
//   };

//   return (
//     <LinearGradient
//       colors={['#0F1020', '#171A3A', '#0F1020']}
//       style={styles.container}
//     >
//       <SafeAreaView style={styles.safeArea}>
//         {/* Top Bar */}
//         <View style={styles.topBar}>
//           {/* App Name */}
//           <Text style={styles.appName}>inkAiStory</Text>

//           {/* History Icon */}
//           {historyCount > 0 && (
//             <TouchableOpacity
//               onPress={() => navigation.navigate('History')}
//               style={styles.historyWrapper}
//             >
//               <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
//                 <Icon name="history" size={24} color="#FFFFFF" />
//               </Animated.View>

//               {/* Badge */}
//               <View style={styles.badge}>
//                 <Text style={styles.badgeText}>
//                   {historyCount > 99 ? '99+' : historyCount}
//                 </Text>
//               </View>
//             </TouchableOpacity>
//           )}
//         </View>

//         {/* Center Content */}
//         <View style={styles.content}>
//           {/* Logo */}
//           <Image
//             source={require('../assets/images/logo.png')}
//             style={styles.logo}
//             resizeMode="contain"
//           />

//           {/* Title */}
//           <Text style={styles.title}>AI That Writes for You</Text>

//           {/* Subtitle */}
//           <Text style={styles.subtitle}>Stories made from your ideas</Text>

//           {/* Prompt */}
//           <View style={styles.inputWrapper}>
//             <TextInput
//               placeholder="Type your idea..."
//               placeholderTextColor="#9CA3AF"
//               value={prompt}
//               onChangeText={setPrompt}
//               multiline
//               onContentSizeChange={e =>
//                 setInputHeight(Math.max(52, e.nativeEvent.contentSize.height))
//               }
//               style={[styles.input, { height: inputHeight }]}
//             />
//           </View>

//           {/* Button */}
//           <TouchableOpacity
//             style={styles.button}
//             activeOpacity={0.9}
//             onPress={onGenerateStory}
//           >
//             <Text style={styles.buttonText}>Generate Story</Text>
//           </TouchableOpacity>
//         </View>
//       </SafeAreaView>
//     </LinearGradient>
//   );
// };

// export default HomeScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   safeArea: {
//     flex: 1,
//     paddingHorizontal: 20,
//   },

//   /* Top Bar */
//   topBar: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginTop: 6,
//   },
//   appName: {
//     color: '#FFFFFF',
//     fontSize: 18,
//     fontWeight: '700',
//     letterSpacing: 0.5,
//   },

//   historyWrapper: {
//     position: 'relative',
//     padding: 6,
//   },
//   badge: {
//     position: 'absolute',
//     top: -2,
//     right: -2,
//     backgroundColor: '#FF3B30',
//     borderRadius: 10,
//     minWidth: 18,
//     height: 18,
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingHorizontal: 4,
//   },
//   badgeText: {
//     color: '#FFFFFF',
//     fontSize: 10,
//     fontWeight: '700',
//   },

//   /* Main Content */
//   content: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     paddingHorizontal: 24,
//   },
//   logo: {
//     width: 120,
//     height: 120,
//     marginBottom: 24,
//   },
//   title: {
//     fontSize: 28,
//     fontWeight: '700',
//     color: '#FFFFFF',
//     textAlign: 'center',
//     marginBottom: 8,
//   },
//   subtitle: {
//     fontSize: 15,
//     color: '#B8B8D2',
//     textAlign: 'center',
//     marginBottom: 32,
//   },

//   inputWrapper: {
//     width: '100%',
//     backgroundColor: '#1C1F4A',
//     borderRadius: 28,
//     paddingHorizontal: 18,
//     paddingVertical: 14, // ✅ added
//     marginBottom: 20,
//   },

//   input: {
//     fontSize: 16,
//     color: '#FFFFFF',
//     lineHeight: 22,
//     textAlignVertical: 'top', // ✅ important for Android
//   },

//   button: {
//     width: '100%',
//     height: 52,
//     backgroundColor: '#6A11CB',
//     borderRadius: 28,
//     justifyContent: 'center',
//     alignItems: 'center',
//     shadowColor: '#6A11CB',
//     shadowOpacity: 0.4,
//     shadowRadius: 10,
//     elevation: 6,
//   },
//   buttonText: {
//     color: '#FFFFFF',
//     fontSize: 16,
//     fontWeight: '600',
//   },
// });
