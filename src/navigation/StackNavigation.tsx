import {View, Text} from 'react-native';
import React from 'react';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import Home from '../screens/Home';
import Intro from '../screens/Intro';
import Cart from '../screens/Cart';
import Contact from '../screens/Contact';
import Checkout from '../screens/Checkout';
import ProductDetails from '../screens/ProductDetails';
import Address from '../screens/Address';

//type
export type AuthStackItemList = {
  Home: undefined;
  Intro: undefined;
  Cart: undefined;
  Contact: undefined;
  Checkout: undefined;
  ProductDetails: {_id: number};
  Address: undefined;
};

const Stack = createNativeStackNavigator<AuthStackItemList>();
export type NavigationProps = {
  navigation: NativeStackNavigationProp<AuthStackItemList>;
};

const StackNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="Intro"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Intro" component={Intro} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Cart" component={Cart} />
      <Stack.Screen name="Contact" component={Contact} />
      <Stack.Screen name="Checkout" component={Checkout} />
      <Stack.Screen name="ProductDetails" component={ProductDetails} />
      <Stack.Screen name="Address" component={Address} />
    </Stack.Navigator>
  );
};

export default StackNavigation;
