import {View, Text} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../screens/Home';
import Intro from '../screens/Intro';

//type
export type AuthStackItemList = {
  Home: undefined;
  Intro: undefined;
};

const Stack = createStackNavigator<AuthStackItemList>();

const StackNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="Intro"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Intro" component={Intro} />
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );
};

export default StackNavigation;
