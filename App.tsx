import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import DrawerNavigator from './src/navigation/DrawerNavigator';
import Intro from './src/screens/Intro';

const RootContent = () => {
  return(
    <NavigationContainer>
      <DrawerNavigator />
    </NavigationContainer>
  )
}

const App = () => {
  return (
    <RootContent />
  );
};

export default App;

const styles = StyleSheet.create({});
