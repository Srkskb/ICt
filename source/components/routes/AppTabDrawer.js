import * as React from 'react';
import {StyleSheet, Image} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {DefaultColours} from '@constants';
import {
  HomeActiveImg,
  HomeInactiveImg,
  AccountActiveImg,
  AccountInactiveImg,
  CartActiveImg,
  CartInactiveImg,
  ChatActiveImg,
  ChatInavtiveImg,
  DrawerImage
} from '@images';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { ChatScreen} from '@AppScreens';

const Drawer = createDrawerNavigator();

export default function AppTabDrawer() {
  return (
    <Drawer.Navigator    drawerImage={DrawerImage}
        drawerWidth={250}
        title="Home">
        <Drawer.Screen name="ChatScreen" component={ChatScreen} options={{headerShown: false, unmountOnBlur:true}} />
    </Drawer.Navigator>

  );
}

const styles = StyleSheet.create({
  icon: {
    width: 23,
    height: 22,
  },
});
