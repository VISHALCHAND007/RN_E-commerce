import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  AuthStackItemList,
  NavigationProps,
} from '../navigation/StackNavigation';
import CommonHeader from '../components/CommonHeader';
import {
  NativeStackNavigatorProps,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {URL} from '../constants';
import {Product} from '../constants/type';

type ProductDetailsProps = NativeStackScreenProps<
  AuthStackItemList,
  'ProductDetails'
>;

const ProductDetails = ({navigation, route}: ProductDetailsProps) => {
  const {_id} = route?.params;
  //states
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getProductDetails = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${URL.GET_PRODUCTS}/${_id}`);
      const jsonRes = await response.json();
      if (jsonRes) {
        setIsLoading(false);
        setProduct(jsonRes);
        // console.log(`details:: ${product}`);
      }
    } catch (error) {
      console.log(`Error :: getting product details:: ${error}`);
    }
  };

  useEffect(() => {
    getProductDetails();
  }, [_id]);

  return (
    <View>
      <CommonHeader title="Product Details" />
      {/* <Text>ProductDetails</Text> */}
    </View>
  );
};

export default ProductDetails;

const styles = StyleSheet.create({});
