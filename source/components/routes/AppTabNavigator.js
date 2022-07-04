import React, {useState, useEffect} from 'react';
import {StyleSheet, Image,View,Text} from 'react-native';
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
import AsyncStorage from '@react-native-async-storage/async-storage';
import {HomeScreen, SettingScreen, CartScreen, ChatScreen} from '@AppScreens';

const Tab = createBottomTabNavigator();

export default function AppTabNavigator() {
  const [id, setID] = useState('');
  // const getlist = () => {
  // AsyncStorage.getItem('userExist')
  //           .then(res =>{
  //               try {
  //                var data = JSON.stringify({
  //             "userId": JSON.parse(res)
  //           });
            
  //           var config = {
  //             method: 'post',
  //             url: 'http://3.16.105.232:8181/api/user/cart',
  //             headers: { 
  //               'Content-Type': 'application/json'
  //             },
  //             data : data
  //           };
            
  //           axios(config)
  //           .then(function (response) {
  //             // console.log(response.data.data.list)
  //             if(JSON.stringify(response.data.status)==200){
  //               if(response.data.data.list.length>0)
  //                 {setID(response.data.data.list.length)}
  //             }
  //           })
  //           .catch(function (error) {
  //             //console.log(error);
  //           });
  //               }
  //               catch(error) {
  //                 //console.log('error2',error)
  //               }}
  // )}

  // useEffect(() => {
  //   getlist()
    
  // }, []);

  return (
    <Tab.Navigator
      labeled={false}
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          //backgroundColor: DefaultColours.pink,
          height: '7%',
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
                <><Image
                  source={CartActiveImg}
                  style={styles.icon}
                  resizeMode="contain"
                />
                {id!==''&&<View style={{position:'absolute',borderRadius:20,backgroundColor: '#ccc',
                                paddingHorizontal:4,top:2,right:'30%',paddingVertical:2}}>
                                  <Text style={{color:'#fff',fontSize:10}}>{id}</Text>
                                </View>}</>
              ) : (
                <><Image
                  source={CartInactiveImg}
                  style={styles.icon}
                  resizeMode="contain"
                />
                {id!==''? <View style={{position:'absolute',borderRadius:20,backgroundColor: '#ccc',
                                paddingHorizontal:4,top:2,right:'30%',paddingVertical:2}}>
                                  <Text style={{color:'#fff',fontSize:10}}>{id}</Text>
                                </View>:null}</>
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
