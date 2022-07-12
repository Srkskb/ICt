import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
//import {createDrawerNavigator} from '@react-navigation/drawer';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Button, TextInput,View,TouchableOpacity,Text,StatusBar,Linking,Dimensions,StyleSheet }from 'react-native';

import UserAuthenticator from './UserAuthenticator';
import SplashScreen from '../screens/auth/splash/';
import {WalkthroughScreen, LoginScreen, SignupScreen, VerifyScreen ,ForgotScreen, ProfileScreen} from '@AuthScreens';
import AppTabNavigator from './AppTabNavigator';
import AppTabDrawer from './AppTabDrawer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DrawerContent from './DrawerContent';
import {HomeScreen, AccountScreen, CartScreen, ChatScreen, FaqScreen, SettingScreen,ProductDetailScreen,
  ChangePasswordScreen, AboutScreen, ContactusScreen,DetailScreen,ServiceScreen,SubServices,
ProductScreen} from '@AppScreens';



const RootNavigator = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuth,setAuth] = useState(false)

  useEffect(() => {
    validAuth()
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);

  //console.log('user login details',AsyncStorage.getItem(token))
  }, []);

  const validAuth = async() => {
    //console.log('mofo')
    const userToken = await AsyncStorage.getItem('token');
    const userExist = await AsyncStorage.getItem('userExist');
    //console.log('#. userToken : ', userToken, ' #. exist : ', userExist);
    if(typeof userToken !== 'undefined' && userToken !== null && userToken.length !== ''){
      //console.log('this is logged in')
      setAuth(true);
    }
    else {
      setAuth(false);
    }
  }

  if (isLoading) {
    return <SplashScreen />;
  }

  const AuthStack = createNativeStackNavigator();
  const AppStack = createNativeStackNavigator();
  const RootStack = createNativeStackNavigator();
  const Drawer = createDrawerNavigator();

  const MainApp = ({navigation}) => {
    //console.log('navigation',navigation)


    return (
      <Drawer.Navigator
          drawerWidth={250}
          title="Home"
          initialRouteName="HomeScreen"
          drawerContent={props => <DrawerContent {...props} />}>
          {/*<Drawer.Screen name="AppTab" navigation={navigation} component={AppTabNavigator} options={{headerShown: false, unmountOnBlur:true}} />*/}
          <Drawer.Screen name="HomeScreen" component={HomeScreen} options={{headerShown: false, unmountOnBlur:true,}} />
          <Drawer.Screen name="CartScreen" component={CartScreen} options={{headerShown: true, unmountOnBlur:true, title: "My Cart"}} />
          <Drawer.Screen name="AccountScreen" component={AccountScreen} options={{headerShown: true, unmountOnBlur:true, title: "My Account"}} />
          <Drawer.Screen name="ChatScreen" component={ChatScreen} options={{headerShown: true, unmountOnBlur:true, title: "My Chat"}} />
          <Drawer.Screen name="FaqScreen" component={FaqScreen} options={{headerShown: true, unmountOnBlur:true, title: "FAQ"}} />
          <Drawer.Screen name="SettingScreen" component={SettingScreen} options={{headerShown: true, unmountOnBlur:true, title: "My Account"}} />
          <Drawer.Screen name="ChangePasswordScreen" component={ChangePasswordScreen} options={{headerShown: false, unmountOnBlur:true, title: "Change Password"}} />
          <Drawer.Screen name="AboutScreen" component={AboutScreen} options={{headerShown: true, unmountOnBlur:true,title: "About"}} />
          <Drawer.Screen name="ContactusScreen" component={ContactusScreen} options={{headerShown: true, unmountOnBlur:true, title: "Contact us"}} />
          <Drawer.Screen name="DetailScreen" component={DetailScreen} options={{headerShown: true, unmountOnBlur:true, title: "Details",headerTitleAlign:'center'}} />
          <Drawer.Screen name="ProductScreen" component={ProductScreen} options={{headerShown: true, unmountOnBlur:true, title: "Products",headerTitleAlign:'center'}} />
          <Drawer.Screen name="ProductDetailScreen" component={ProductDetailScreen} options={{headerShown: false, unmountOnBlur:true, title: "Services",headerTitleAlign:'center'}} />
          <Drawer.Screen name="ServiceScreen" component={ServiceScreen} options={{headerShown: false, unmountOnBlur:true, title: "Services",headerTitleAlign:'center'}} />
          <Drawer.Screen name="SubServices" component={SubServices} options={{headerShown: false, unmountOnBlur:true, title: "Services",headerTitleAlign:'center'}} />
      </Drawer.Navigator>
    )
  }


  // Before Login Screens Stack
  const AuthStackScreen = () => {
    return (
      <AuthStack.Navigator
        initialRouteName="WalkthroughScreen"
        screenOptions={{gestureEnabled: true, gestureDirection: 'horizontal'}}
        backBehavior="none">
        <AuthStack.Screen
          name="WalkthroughScreen"
          component={WalkthroughScreen}
          options={{headerShown: false}}
        />
        <AuthStack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{headerShown: false}}
        />
        <AuthStack.Screen
          name="SignupScreen"
          component={SignupScreen}
          options={{headerShown: false}}
        />

        <AuthStack.Screen
          name="VerifyScreen"
          component={VerifyScreen}
          options={{headerShown: false}}
        />

        <AuthStack.Screen
          name="ForgotScreen"
          component={ForgotScreen}
          options={{headerShown: false}}
        />
      </AuthStack.Navigator>
    );
  };

  const RootStackScreen = () => {
    return (
      <RootStack.Navigator
        headerMode="none"
        initialRouteName={isAuth ? "App" : "Auth"}
        mode="modal"
        screenOptions={{gestureEnabled: true}}>
        {/*<RootStack.Screen
            name="UserAuthenticator"
            component={UserAuthenticator}
            options={{animationEnabled: false, headerShown: false}}
          />*/}
        <RootStack.Screen
          name="App"
          component={MainApp}
          options={{
            animationEnabled: true,
            headerShown: false,
          }}
        />


        <RootStack.Screen
          name="Auth"
          component={AuthStackScreen}
          options={{
            animationEnabled: false,
            headerShown: false,
          }}
        />
      </RootStack.Navigator>
    );
  };

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <RootStackScreen />
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default RootNavigator;
