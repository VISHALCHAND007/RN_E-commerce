import {Pressable, StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import {colors} from '../constants';
import {ArrowLeftIcon, ShoppingCartIcon} from 'react-native-heroicons/outline';
import {useNavigation} from '@react-navigation/native';
import {NavigationProps} from '../navigation/StackNavigation';
import {logo} from '../assets';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store/productStore';

const CommonHeader = ({title}: {title: string}) => {
  const navigation = useNavigation<NavigationProps>();
  const {productData} = useSelector((state: RootState) => state.product)
  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => {
          navigation.navigate('Home');
        }}
        style={styles.row}>
        <ArrowLeftIcon size={20} color={colors.textBlack} />
        <Text style={styles.titleText}>{title}</Text>
      </Pressable>
      <Pressable onPress={() => navigation.navigate('Home')}>
        <Image source={logo} style={styles.logo} alt="logo image" />
      </Pressable>
      <Pressable onPress={() => navigation.navigate('Cart')}>
        <ShoppingCartIcon style={styles.cartIcon} />
        <View style={styles.cartCount}>
          <Text style={styles.cartText}>
            {productData.length > 0 ? productData.length : 0}
          </Text>
        </View>
      </Pressable>
    </View>
  );
};

export default CommonHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBlockColor: 'gray',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 25,
    resizeMode: 'contain',
  },
  cartIcon: {
    position: 'relative',
  },
  cartText: {
    fontSize: 10,
    color: colors.defWhite,
    fontWeight: 700,
  },
  cartCount: {
    position: 'absolute',
    backgroundColor: '#000000',
    borderRadius: 25,
    right: -4,
    top: -6,
    width: 14,
    height: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: {
    color: colors.textBlack,
    marginLeft: 5,
    fontWeight: 600,
  },
});
