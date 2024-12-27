import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import {colors} from '../constants';
import {ArrowLeftIcon} from 'react-native-heroicons/outline';
import {useNavigation} from '@react-navigation/native';
import {NavigationProps} from '../navigation/StackNavigation';

const screens = [
  {title: 'Home'},
  {title: 'Cart'},
  {title: 'Checkout'},
  {title: 'Contact'},
  {title: 'Address'},
];

const SideMenu = () => {
  const navigation = useNavigation<NavigationProps>();

  return (
    <View style={style.container}>
      <Text style={style.titleTxt}>Click to select screen</Text>
      {screens.map((screen, index) => (
        <View style={style.alignCenter}>
          <TouchableOpacity
            key={index}
            style={style.drawerItem}
            onPress={() => navigation.navigate(screen.title)}>
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
  titleTxt: {
    textAlign: 'center',
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
