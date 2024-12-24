import {
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import {Bars4Icon, ShoppingCartIcon} from 'react-native-heroicons/outline';
import {colors} from '../constants';
import {logo} from '../assets';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {DrawerItemList} from '../navigation/DrawerNavigator';
import {useNavigation} from '@react-navigation/native';

type HeaderProps = DrawerNavigationProp<DrawerItemList>;

const Header = () => {
  const navigation = useNavigation<HeaderProps>();
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Pressable onPress={() => navigation.openDrawer()}>
          <Bars4Icon
            color={colors.textBlack}
            fill={colors.textBlack}
            size={20}
          />
        </Pressable>
        <Pressable onPress={()=> navigation.navigate('')}>
          <Image source={logo} alt="logo icon" style={styles.logo} />
        </Pressable>
        <Pressable style={styles.cartIcon}>
          <ShoppingCartIcon color={colors.textBlack} size={22} />
          <View style={styles.cartCount}>
            <Text style={styles.cartText}>0</Text>
          </View>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBlockColor: 'gray',
  },
  logo: {
    width: 100,
    height: 25,
    resizeMode: 'contain',
  },
  cartIcon: {
    position: 'relative',
  },
  cartCount: {
    position: 'absolute',
    backgroundColor: '#000000',
    borderRadius: 50,
    right: -4,
    top: -6,
    width: 14,
    height: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cartText: {
    fontSize: 10,
    color: colors.defWhite,
    fontWeight: 700,
  },
});
