import React from 'react';
import { StatusBar } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AppNavigator from './src/navigation/AppNavigator';
import Colors from './src/utils/colors';

const App = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar
        backgroundColor={Colors.background}
        barStyle="light-content"
      />
      <AppNavigator />
    </GestureHandlerRootView>
  );
};

export default App;
