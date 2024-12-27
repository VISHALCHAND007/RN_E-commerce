import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import { colors } from '../constants';

const Loader = () => {
  return <ActivityIndicator style={styles.progressBar} size={40} color={colors.btnColor}/>;
};

export default Loader;

const styles = StyleSheet.create({
  progressBar: {
    height: '100%',
    width: '100%',
  },
});
