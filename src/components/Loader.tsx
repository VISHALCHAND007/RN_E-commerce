import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Loader = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator style={styles.progressBar}/>
    </View>
  )
}

export default Loader

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    progressBar: {
        height: 80, 
        width: 80,
        justifyContent: 'center', 
        alignItems: 'center'
    }
})