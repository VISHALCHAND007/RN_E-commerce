import {View, Text} from 'react-native';
import React from 'react';
import {
  createDrawerNavigator,
  DrawerNavigationProp,
} from '@react-navigation/drawer';
import StackNavigation from './StackNavigation';
import SideMenu from '../components/SideMenu';

export type DrawerItemList = {
  StackScreen: undefined;
  SideMenu: undefined;
};

const Drawer = createDrawerNavigator<DrawerItemList>();

export type HeaderProps = DrawerNavigationProp<DrawerItemList>;

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={props => <SideMenu {...props} />}
      screenOptions={{
        headerShown: false,
      }}>
      <Drawer.Screen name="StackScreen" component={StackNavigation} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
