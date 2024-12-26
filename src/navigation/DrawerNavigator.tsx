import {View, Text} from 'react-native';
import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import StackNavigation from './StackNavigation';
import SideMenu from '../components/SideMenu';

export type DrawerItemList = {
  StackScreen: undefined
}

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={() => <SideMenu />}
      screenOptions={{
        headerShown: false,
      }}>
      <Drawer.Screen name="StackScreens" component={StackNavigation} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
