import {Dimensions, StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
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
import {colors, URL} from '../constants';
import {Product} from '../constants/type';
import Loader from '../components/Loader';
import { ArrowRightIcon, XMarkIcon } from 'react-native-heroicons/outline';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/slice/productSlice';
import Toast from 'react-native-toast-message';

type ProductDetailsProps = NativeStackScreenProps<
  AuthStackItemList,
  'ProductDetails'
>;

const {height, width} = Dimensions.get('window');

const ProductDetails = ({navigation, route}: ProductDetailsProps) => {
  const {_id} = route?.params;
  const dispatch = useDispatch();
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
      {product ? (
        <View>
          {/* product image */}
          <View style={styles.imageContainer}>
            <Image source={{uri: product?.image}} style={styles.image} />
            {product?.isNew ? (
              <View style={styles.newContainer}>
                <Text style={styles.newTagTxt}>New</Text>
              </View>
            ) : null}
          </View>
          {/* product details  */}
          <View style={styles.detailsContainer}>
            <Text style={styles.prodTitle}>{product?.title}</Text>
            <Text style={styles.prodCategory}>
              Brand | Category: {product?.brand} | {product?.category}
            </Text>
            <Text style={styles.prodDescription}>{product?.description}</Text>
          </View>
          {/* bottom view  */}
          <View style={styles.btmContainer}>
            <View style={styles.row}>
              <View>
                <Text style={styles.priceText}>${product?.price}</Text>
                <Text style={styles.cutPrice}>${product?.previousPrice}</Text>
              </View>
              <TouchableOpacity style={styles.cartContainer} onPress={() => {
                  dispatch(addToCart(product),
                  Toast.show({
                    text1: `${product.title} added successfully.`,
                    type: 'success', 
                    position: 'bottom'
                  }) 
                )
              }
              }>
                <Text style={styles.cartText}>Add to cart</Text>
                <ArrowRightIcon size={20}/>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      ) : (
        <Loader />
      )}
    </View>
  );
};

export default ProductDetails;

const styles = StyleSheet.create({
  imageContainer: {
    height: height / 2,
    width: width,
  },
  image: {
    height: '100%',
    resizeMode: 'cover',
  },
  newContainer: {
    backgroundColor: colors.textBlack,
    height: 20,
    width: 40,
    borderRadius: 4,

    //putting it to place
    position: 'absolute',
    right: 20,
    top: 10,
  },
  detailsContainer: {
    padding: 10,
  },
  newTagTxt: {
    fontSize: 12,
    color: colors.defWhite,
    textAlign: 'center',
  },
  prodTitle: {
    fontSize: 20,
    fontWeight: '600',
  },
  prodCategory: {
    fontSize: 17,
    fontWeight: '500',
  },
  prodDescription: {
    fontSize: 14,
    fontWeight: '400',
  },
  btmContainer: {
    flex: 1,
    width: width,
    paddingHorizontal: 15,
    paddingVertical: 20,
    backgroundColor: 'black',
    // positioning
    position: 'absolute',
    bottom: -150,
  },
  priceText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.defWhite,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cutPrice: {
    fontSize: 13,
    fontWeight: '500',
    textDecorationLine: 'line-through',
    color: colors.defWhite,
  },
  cartContainer: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
    backgroundColor: colors.designColor,
    flexDirection: 'row',
    alignItems: 'center'
  },
  cartText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textBlack,
    marginRight: 5
  },
});
