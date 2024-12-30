import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import React, {useEffect, useReducer, useState} from 'react';
import Header from '../components/Header';
import {colors, URL} from '../constants';
import {NavigationProps} from '../navigation/StackNavigation';
import {FlatList} from 'react-native-gesture-handler';
import {Product} from '../constants/type';
import Carousel from 'react-native-reanimated-carousel';
import {bannerOne, bannerThree, bannerTwo} from '../assets';
import Loader from '../components/Loader';
import {ShoppingCartIcon} from 'react-native-heroicons/outline';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {addToCart} from '../redux/slice/productSlice';
import Toast from 'react-native-toast-message';

const {height, width} = Dimensions.get('window');
const images = [bannerOne, bannerTwo, bannerThree];

const Home = () => {
  const dispatcher = useDispatch();
  const navigation = useNavigation<NavigationProps>();
  //states
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  const getProducts = async () => {
    setIsLoading(true);
    try {
      const respose = await fetch(URL.GET_PRODUCTS);
      const jsonResponse = await respose.json();
      setProducts(jsonResponse);
      setIsLoading(false);
    } catch (error) {
      console.log(`Error ::getting products:: ${error}`);
    }
  };

  const renderProducts = (item: Product) => {
    return (
      <TouchableOpacity
        style={styles.productView}
        onPress={() => navigation.navigate('ProductDetails', {_id: item?._id})}>
        {item.isNew ? (
          <View style={styles.imgContainer}>
            <View style={styles.newtag}>
              <Text style={styles.tagText}>New</Text>
            </View>
          </View>
        ) : null}
        <Image
          source={{uri: item?.image}}
          alt="Product Image"
          style={styles.img}
        />
        <Text style={styles.textView}>{item.title}</Text>
        <View style={styles.rowContainer}>
          <View>
            <Text style={styles.priceText}>${item.price}</Text>
            <Text style={styles.cutPrice}>${item.previousPrice}</Text>
          </View>
          <TouchableOpacity
            style={styles.addToCartIcon}
            onPress={() => {
              dispatcher(
                addToCart(item),
                Toast.show({
                  type: 'success',
                  text1: `${item.title} added successfully.`,
                  position: 'bottom'
                }),
              );
            }}>
            <ShoppingCartIcon size={20} color={colors.textBlack} />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <View>
      <Header />
      <View>
        {isLoading ? (
          <Loader />
        ) : (
          <FlatList
            data={products}
            contentContainerStyle={styles.container}
            keyExtractor={(item: Product) => item?._id.toString()}
            renderItem={({item}) => renderProducts(item)}
            refreshing={isRefreshing}
            onRefresh={() => getProducts()}
            numColumns={2}
            ListHeaderComponent={
              <View>
                <Carousel
                  loop
                  height={210}
                  width={width}
                  autoPlay={true}
                  scrollAnimationDuration={2000}
                  data={images}
                  renderItem={({item}) => {
                    return (
                      <Image
                        source={item}
                        style={styles.bannerImg}
                        alt="banner images"
                      />
                    );
                  }}
                />
              </View>
            }
          />
        )}
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.defWhite,
    paddingBottom: 100,
  },
  productView: {
    flex: 1,
    height: height / 3,
    borderWidth: 0.5,
    borderColor: colors.lightText,
    margin: 5,
    borderRadius: 6,
    // marginHorizontal: 10,
  },
  imgContainer: {
    position: 'relative',
  },
  img: {
    flex: 1,
    height: 100,
    resizeMode: 'contain',
    padding: 5,
  },
  newtag: {
    position: 'absolute',
    top: 2, // Place it near the bottom of the image container
    right: 4, // Align it to the right of the image container
    backgroundColor: colors.textBlack,
    paddingHorizontal: 5,
    paddingVertical: 2, // Add some vertical padding for better appearance
    borderRadius: 4, // Optional: Add some border-radius for a rounded look
    zIndex: 1,
  },
  tagText: {
    color: colors.defWhite,
    fontSize: 12,
  },
  bannerImg: {
    width: '100%',
    height: 270,
    resizeMode: 'cover',
  },
  textView: {
    padding: 10,
    fontSize: 20,
    fontWeight: '600',
  },
  indicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
  priceText: {
    fontSize: 14,
    fontWeight: '600',
  },
  cutPrice: {
    fontSize: 13,
    fontWeight: '500',
    color: 'gray',
    textDecorationLine: 'line-through',
  },
  addToCartIcon: {
    paddingVertical: 7,
    paddingHorizontal: 10,
    backgroundColor: colors.designColor,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
});
