import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Product} from '../constants/type';
import {useDispatch} from 'react-redux';
import {colors} from '../constants';
import {MinusIcon, PlusIcon, TrashIcon} from 'react-native-heroicons/outline';
import {
  decreaseQuantity,
  deleteProduct,
  increaseQuantity,
} from '../redux/slice/productSlice';

const ProductItem = ({product}: {product: Product}) => {
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <Image source={{uri: product?.image}} style={styles.prodImg} />
      <View style={styles.titleContainer}>
        <Text style={styles.titleTxt}>
          {product?.title.substring(0, 10).trim()}
        </Text>
        <Text style={styles.brandTxt}>{product?.brand}</Text>
      </View>
      <View style={styles.cartOperationContainer}>
        <Pressable onPress={() => dispatch(decreaseQuantity(product))}>
          <MinusIcon size={16} />
        </Pressable>
        <Text style={styles.quantityTxt}>{product?.quantity}</Text>
        <Pressable onPress={() => dispatch(increaseQuantity(product))}>
          <PlusIcon size={16} />
        </Pressable>
      </View>
      <Text style={styles.priceText}>
        ${Math.round(product?.price * product?.quantity)}
      </Text>
      <Pressable onPress={() => dispatch(deleteProduct(product))}>
        <TrashIcon size={20} color={colors.textBlack} />
      </Pressable>
    </View>
  );
};

export default ProductItem;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 2,
    paddingHorizontal: 5,
    backgroundColor: colors.defWhite,
    marginTop: 10,
    borderRadius: 6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  prodImg: {
    height: 70,
    width: 70,
  },
  cartOperationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 0.2,
    borderColor: colors.lightText,
    borderRadius: 4,
    width: 70,
    height: 30,
    justifyContent: 'space-between',
    paddingHorizontal: 5,
  },
  titleContainer: {
    // width: 180,
    justifyContent: 'flex-start',
  },
  titleTxt: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.textBlack,
  },
  brandTxt: {
    fontSize: 16,
    color: 'gray',
  },
  quantityTxt: {
    color: 'gray',
    fontWeight: '500',
  },
  priceText: {
    fontWeight: '700',
  },
});
