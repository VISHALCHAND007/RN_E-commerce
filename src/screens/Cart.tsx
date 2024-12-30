import {Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import CommonHeader from '../components/CommonHeader';
import {useSelector} from 'react-redux';
import {RootState} from '../redux/store/productStore';
import {Product} from '../constants/type';
import ProductItem from '../components/ProductItem';
import {colors} from '../constants';
import Toast from 'react-native-toast-message';
import {NavigationProps} from '../navigation/StackNavigation';
import {useNavigation} from '@react-navigation/native';
import {isReanimated3} from 'react-native-reanimated';
import { Bars3CenterLeftIcon } from 'react-native-heroicons/outline';

const Cart = () => {
  const {productData} = useSelector((state: RootState) => state.product);
  const [totalAmount, setTotalAmount] = useState(0);
  const [discountedPrice, setDiscountedPrice] = useState(0);
  const navigation = useNavigation<NavigationProps>();

  const getDiscount = () => {
    let amt = 0;
    let discount = 0;
    productData?.map((item: Product) => {
      amt += item?.previousPrice * item?.quantity;
      discount += item?.price * item?.quantity;
      return;
    });
    setTotalAmount(Math.round(amt));
    setDiscountedPrice(Math.round(discount));
  };

  useEffect(() => {
    getDiscount();
  }, [productData]);

  const proceedToCheckout = () => {
    Toast.show({
      type: 'error',
      text1: 'Please login to initialize the checkout.',
      text1Style: styles.red,
      text2: 'Login feature is under progress...',
      text2Style: styles.black,
    });
  };

  return (
    <View>
      <CommonHeader title="Cart" />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {productData.length > 0 ? (
          // cart is not empty
          <View>
            <View style={styles.subTotalContainer}>
              <View style={styles.row}>
                <Text style={styles.subHeading}>Sub-total</Text>
                <Text style={styles.subHeadingVal}>${totalAmount}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.subHeading}>Discount</Text>
                <Text style={styles.subHeadingVal}>
                  -${totalAmount - discountedPrice}
                </Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.heading}>Total</Text>
                <Text style={styles.headingVal}>${discountedPrice}</Text>
              </View>
              <Pressable
                style={styles.proceedToCheckoutContainer}
                onPress={proceedToCheckout}>
                <Text style={styles.proceedToCheckoutTxt}>
                  Proceed To Checkout
                </Text>
              </Pressable>
              <Pressable
                style={styles.continueShoppingContainer}
                onPress={() => navigation.navigate('Home')}>
                <Text style={styles.continueShoppingTxt}>
                  Continue Shopping!
                </Text>
              </Pressable>
            </View>
            {/* products */}
            {productData.map((item: Product) => (
              <ProductItem
                key={item._id}
                product={item}
              />
            ))}
          </View>
        ) : (
          // cart is empty
          <View style={styles.emptyCartContainer}>
            <Text style={styles.emptyCartText}>Your Cart is Empty!</Text>
            <Pressable
                style={[styles.continueShoppingContainer, {marginTop: 20}]}
                onPress={() => navigation.navigate('Home')}>
                <Text style={styles.continueShoppingTxt}>
                  Back To Shopping!
                </Text>
              </Pressable>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default Cart;

const styles = StyleSheet.create({
  scrollContainer: {
    paddingBottom: 100,
    margin: 10,
  },
  subTotalContainer: {
    padding: 20,
    backgroundColor: colors.defWhite,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  subHeading: {
    fontSize: 16,
    fontWeight: '500',
  },
  subHeadingVal: {
    fontSize: 16,
    fontWeight: '600',
  },
  heading: {
    fontSize: 18,
    fontWeight: '700',
    marginTop: 5,
  },
  headingVal: {
    fontSize: 18,
    fontWeight: '700',
    marginTop: 5,
  },
  proceedToCheckoutContainer: {
    backgroundColor: colors.btnColor,
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  proceedToCheckoutTxt: {
    color: colors.defWhite,
    fontSize: 16,
    fontWeight: '600',
  },
  continueShoppingContainer: {
    backgroundColor: colors.defWhite,
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5,
    borderWidth: 1,
    borderColor: colors.lightText,
  },
  continueShoppingTxt: {
    color: colors.textBlack,
    fontSize: 16,
    fontWeight: '600',
  },
  red: {color: 'red'},
  black: {color: 'black'},
  emptyCartContainer: {
    flex: 1, 
    backgroundColor: colors.defWhite, 
    padding: 20
  }, 
  emptyCartText: {
    fontSize: 16, 
    color: colors.textBlack, 
    textAlign: 'center', 
    fontWeight: '700'
  }
});
