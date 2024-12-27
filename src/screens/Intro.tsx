import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {introPng} from '../assets/index';
import {colors} from '../constants';
import {NavigationProps} from '../navigation/StackNavigation';
import { useNavigation } from '@react-navigation/native';

const {height} = Dimensions.get('window');

const Intro = () => {
  const navigation = useNavigation<NavigationProps>()
  return (
    <View style={styles.container}>
      {/* Top */}
      <View style={styles.top}>
        <Image source={introPng} alt="Intro image" style={styles.logoImg} />
      </View>
      {/* bottom */}
      <View style={styles.bottom}>
        <Text style={styles.title}>Great way to lift you style!</Text>
        <Text style={styles.subTitle}>
          Complete your style with awesome collections from bazaar
        </Text>

        <TouchableOpacity
          style={styles.btn}
          onPress={() => navigation.navigate('Home')}>
          <Text style={styles.btnText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Intro;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000000',
    height: height,
  },
  top: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
  },
  logoImg: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
    marginTop: -10,
  },
  bottom: {
    flex: 1,
    paddingHorizontal: 20,
  },
  title: {
    color: colors.defWhite,
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 32,
    paddingHorizontal: 70,
  },
  subTitle: {
    color: colors.defWhite,
    textAlign: 'center',
    marginTop: 20,
    fontWeight: 400,
    fontSize: 16,
    paddingHorizontal: 20,
  },
  btn: {
    width: '100%',
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
  },
  btnText: {
    fontSize: 17,
    fontWeight: 500,
  },
});
