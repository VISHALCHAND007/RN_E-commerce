import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import DrawerNavigator from './src/navigation/DrawerNavigator';
import {Provider} from 'react-redux';
import {store} from './src/redux/store/productStore';
import Toast, {BaseToast} from 'react-native-toast-message';
import {colors} from './src/constants';

const RootContent = () => {
  return (
    <NavigationContainer>
      <DrawerNavigator />
    </NavigationContainer>
  );
};

const toastConfig = {
  success: (props: any) => (
    <BaseToast
      {...props}
      style={{borderLeftColor: colors.designColor}}
      contentContainerStyle={{paddingHorizontal: 15}}
      text1Style={{fontSize: 15, fontWeight: '500'}}
    />
  ),
};

const App = () => {
  return (
    <Provider store={store}>
      <RootContent />
      <Toast config={toastConfig} position="bottom" visibilityTime={2000} />
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({});
