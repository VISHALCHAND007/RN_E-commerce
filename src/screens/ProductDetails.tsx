import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationProps } from '../navigation/StackNavigation'
import CommonHeader from '../components/CommonHeader'

const ProductDetails = ({navigation}: NavigationProps) => {
  // const {_id} = navigation.
  return (
    <View>
      <CommonHeader title='Product Details'/>
      {/* <Text>ProductDetails</Text> */}
    </View>
  )
}

export default ProductDetails

const styles = StyleSheet.create({})