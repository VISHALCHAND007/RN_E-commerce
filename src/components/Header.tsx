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
import {useNavigation} from '@react-navigation/native';
import {NavigationProps} from '../navigation/StackNavigation';
import {HeaderProps} from '../navigation/DrawerNavigator';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../redux/store/productStore';

const Header = () => {
  const navigation = useNavigation<NavigationProps>();
  const drawerNavigation = useNavigation<HeaderProps>();
  const {productData} = useSelector((state: RootState) => state.product);

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Pressable onPress={() => drawerNavigation.openDrawer()}>
          <Bars4Icon
            color={colors.textBlack}
            fill={colors.textBlack}
            size={20}
          />
        </Pressable>
        <Pressable onPress={() => navigation.navigate('Home')}>
          <Image source={logo} alt="logo icon" style={styles.logo} />
        </Pressable>
        <Pressable
          style={styles.cartIcon}
          onPress={() => navigation.navigate('Cart')}>
          <ShoppingCartIcon color={colors.textBlack} size={22} />
          <View style={styles.cartCount}>
            <Text style={styles.cartText}>
              {productData.length > 0 ? productData.length : 0}
            </Text>
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
    borderBottomWidth: 0.3,
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
