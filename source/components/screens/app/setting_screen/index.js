import React, {useState, useEffect} from 'react';
import {View, Text,TouchableOpacity, Image, TextInput, FlatList, ScrollView,
  StyleSheet,KeyboardAvoidingView} from 'react-native';
import {SafeAreaProvider,SafeAreaView} from 'react-native-safe-area-context';

import {DefaultColours, SCREEN_WIDTH,SCREEN_HIGHT,FontSize} from '@constants';
import {Loader} from '@global_components';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackActions } from '@react-navigation/native';
import Modal from 'react-native-modal'
import axios from 'axios';
import Toast from 'react-native-simple-toast';
import Svg, {Path,Circle,Line} from 'react-native-svg';
import {
  LoginLogoImg,
  AtdRateImg,
  LockImg,
  GoogleImg,
  FacebookImg,
  LinkedInImg,
  BackButtonImg,
  DrawerImage
} from '@images';
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
const SettingScreen = ({navigation,route}) => {
  
  const [state, setState] = useState({loader: true, modalVisible: false,search:false,cart:[]});
useEffect(() => {
    // console.log(route)
    setTimeout(() => {
      setState(prev => ({...prev, loader: false}));
    }, 2000);
    getCart()
  }, []);
const getCart = () => {
  AsyncStorage.getItem('userExist')
            .then(res =>{
                try {
                 var data = JSON.stringify({
              "userId": JSON.parse(res)
            });
            
            var config = {
              method: 'post',
              url: 'https://api.ictkart.com/api/user/cart',
              headers: { 
                'Content-Type': 'application/json'
              },
              data : data
            };
            
            axios(config)
            .then(function (response) {
              // console.log(response.data.data.list)
              if(JSON.stringify(response.data.status)==200){
                setState(prev => ({...prev, cart:response.data.data.list}))
              }
            })
            .catch(function (error) {
              //console.log(error);
            });
                }
                catch(error) {
                  //console.log('error2',error)
                }}
  )}
return (
    <SafeAreaView style={{width: '100%',height: '100%'}}>
    <View style={{width: '100%',height: '92%',paddingTop:20}}>
    <TouchableOpacity onPress={()=>navigation.navigate('AccountScreen')} style={{height:50, backgroundColor:'white', justifyContent:'center'}}>
    <Text style={{marginLeft:10}}>Edit Profile</Text>
    </TouchableOpacity >

    <TouchableOpacity onPress={()=>navigation.navigate('ChangePasswordScreen')} style={{height:50, backgroundColor:'white', marginTop:20, justifyContent:'center'}}>
    <Text style={{marginLeft:10}}>Change Password</Text>
    </TouchableOpacity>
    </View>
    <View style={{ width:'100%',height:'8%', alignItems: 'center',flexDirection:'row' }}>
        <TouchableOpacity onPress={()=>navigation.navigate('HomeScreen')}
        style={{ width:'25%',height:'100%', alignItems: 'center',justifyContent:'center' }}>
        {route.name=='HomeScreen'? <Image source={HomeActiveImg} style={styles.icon} resizeMode="contain"
        />:<Image source={HomeInactiveImg} style={styles.icon} resizeMode="contain"/>}
        <Text style={{color: 'grey' ,fontSize :FontSize(10),paddingTop:2 }}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>navigation.navigate('SettingScreen')}
        style={{ width:'25%',height:'100%', alignItems: 'center',justifyContent:'center' }}>
        {route.name=='SettingScreen'? <Image source={AccountActiveImg} style={styles.icon} 
        resizeMode="contain" />:<Image source={AccountInactiveImg} style={styles.icon} 
        resizeMode="contain" />}
        <Text style={{color: 'grey' ,fontSize :FontSize(10),paddingTop:2 }}>Account</Text></TouchableOpacity>
        <TouchableOpacity onPress={()=>navigation.navigate('CartScreen')}
        style={{ width:'25%',height:'100%', alignItems: 'center',justifyContent:'center' }}>
        {route.name=='CartScreen'? <Image source={CartActiveImg} style={styles.icon} resizeMode="contain" />:
                <Image source={CartInactiveImg} style={styles.icon} resizeMode="contain" />}
        {state.cart&&state.cart.length==0? null:<View style={{position:'absolute',borderRadius:20,
        backgroundColor:DefaultColours.blue0,paddingHorizontal:5,top:2,right:'30%',paddingVertical:2}}>
        <Text style={{color:'#fff',fontSize:FontSize(7)}}>{state.cart&&state.cart.length}</Text></View>}
        <Text style={{color: 'grey' ,fontSize :FontSize(10),paddingTop:2 }}>Cart</Text></TouchableOpacity>
        <TouchableOpacity onPress={()=>navigation.navigate('ChatScreen')}
        style={{ width:'25%',height:'100%', alignItems: 'center',justifyContent:'center' }}>
        {route.name=='ChatScreen'? <Image source={ChatActiveImg} style={styles.icon} resizeMode="contain" />:
                <Image source={ChatInavtiveImg} style={styles.icon} resizeMode="contain" />}
        <Text style={{color: 'grey' ,fontSize :FontSize(10),paddingTop:2 }}>Chat</Text></TouchableOpacity>
        </View>
    </SafeAreaView>
  );
};
export default SettingScreen;
const styles = StyleSheet.create({
  icon: {
    width: 23,
    height: 22,
  },
});