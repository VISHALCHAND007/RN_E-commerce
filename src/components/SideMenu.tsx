import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Pressable,
} from 'react-native';
import React from 'react';
import {colors} from '../constants';
import {useNavigation} from '@react-navigation/native';
import {NavigationProps} from '../navigation/StackNavigation';
import {XMarkIcon} from 'react-native-heroicons/outline';
import {HeaderProps} from '../navigation/DrawerNavigator';
import { DrawerContentComponentProps } from '@react-navigation/drawer';

const screens = [
  {title: 'Home'},
  {title: 'Cart'},
  {title: 'Checkout'},
  {title: 'Contact'},
  {title: 'Address'},
];

const SideMenu: React.FC<DrawerContentComponentProps> = ({navigation}) => {
  const nav = useNavigation<NavigationProps>();
  return (
    <View style={style.container}>
      <View style={style.titleContainer}>
        <Text style={style.titleTxt}>Click to select screen</Text>
        <Pressable onPress={() => navigation.closeDrawer()}>
          <XMarkIcon size={25} color={'red'} />
        </Pressable>
      </View>
      {screens.map((screen, index) => (
        <View style={style.alignCenter}>
          <TouchableOpacity
            key={index}
            style={style.drawerItem}
            onPress={() => (nav.navigate(screen.title))}>
            <Text style={style.drawerItexTxt}>{screen.title}</Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 18,
    paddingVertical: 20,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  titleTxt: {
    color: 'gray',
    fontWeight: '600',
    fontSize: 15,
  },
  drawerItem: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 45,
    width: 250,
    backgroundColor: colors.textBlack,
    margin: 5,
    borderRadius: 25,
    marginVertical: 10,
  },
  drawerItexTxt: {
    color: 'white',
  },
  alignCenter: {justifyContent: 'center', alignItems: 'center'},
});

export default SideMenu;
