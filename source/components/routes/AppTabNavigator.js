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
} from '@images';
import {HomeScreen, SettingScreen, CartScreen, ChatScreen} from '@AppScreens';

const Tab = createBottomTabNavigator();

export default function AppTabNavigator() {
  return (
    <Tab.Navigator
      labeled={false}
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          //backgroundColor: DefaultColours.pink,
          height: '10%',
        },
        tabBarLabelStyle: {
          color: DefaultColours.tabText,
          height: '25%',
        },
      }}>
      <Tab.Screen
        name="HomeScreen"
        options={{
          title: 'Home',
          tabBarIcon: ({color, size, focused}) => (
            <>
              {focused ? (
                <Image
                  source={HomeActiveImg}
                  style={styles.icon}
                  resizeMode="contain"
                />
              ) : (
                <Image
                  source={HomeInactiveImg}
                  style={styles.icon}
                  resizeMode="contain"
                />
              )}
            </>
          ),
        }}
        component={HomeScreen}
      />
      <Tab.Screen
        name="SettingScreen"
        options={{
          title: 'Account',
          tabBarIcon: ({color, size, focused}) => (
            <>
              {focused ? (
                <Image
                  source={AccountActiveImg}
                  style={styles.icon}
                  resizeMode="contain"
                />
              ) : (
                <Image
                  source={AccountInactiveImg}
                  style={styles.icon}
                  resizeMode="contain"
                />
              )}
            </>
          ),
        }}
        component={SettingScreen}
      />
      <Tab.Screen
        name="CartScreen"
        options={{
          title: 'Cart',
          tabBarIcon: ({color, size, focused}) => (
            <>
              {focused ? (
                <Image
                  source={CartActiveImg}
                  style={styles.icon}
                  resizeMode="contain"
                />
              ) : (
                <Image
                  source={CartInactiveImg}
                  style={styles.icon}
                  resizeMode="contain"
                />
              )}
            </>
          ),
        }}
        component={CartScreen}
      />
      <Tab.Screen
        name="ChatScreen"
        options={{
          title: 'Chat',
          tabBarIcon: ({color, size, focused}) => (
            <>
              {focused ? (
                <Image
                  source={ChatActiveImg}
                  style={styles.icon}
                  resizeMode="contain"
                />
              ) : (
                <Image
                  source={ChatInavtiveImg}
                  style={styles.icon}
                  resizeMode="contain"
                />
              )}
            </>
          ),
        }}
        component={ChatScreen}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  icon: {
    width: 23,
    height: 22,
  },
});
