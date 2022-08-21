import React, {useState, useEffect, useRef} from 'react';

import {StyleSheet, Image, TouchableOpacity, Text, View,ScrollView} from 'react-native';
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
import { StackActions } from '@react-navigation/native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import {HomeScreen, AccountScreen, CartScreen, ChatScreen, FaqScreen,SettingScreen, 
  ContactusScreen,DetailScreen,ProductScreen} from '@AppScreens';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';
import Toast from 'react-native-simple-toast';
import axios from 'axios';
const DrawerContent = ({navigation}) => {
  const [logged, setLogged] = useState(false)
  const [firstname, setFirstName] = useState('')
  const [lastname, setLastName] = useState('')
  const [profileImage, setProfileImage] = useState(null)
  const [loadingtypeoverlay, setLoadingtypeoverlay] = useState(false)

  const firstnameRef = useRef(null);
  const lastnameRef = useRef(null);

  useEffect(() => {
    loginCheck()
    category()
  }, []);
  const  loginCheck = async () => {
               //console.log('triggering loginCheck')
               try {
                 var currentUserData =  await AsyncStorage.getItem('userExist')
                 //console.log('currentUserData',currentUserData)
                 if(currentUserData !== null){
                     currentUserData = JSON.parse(currentUserData)
                     //console.log(currentUserData,'currentUserData')
                     setLogged(true);

                     getUserData(currentUserData)
                 } else {
                   setLogged(false);

                 }
               } catch(error) {
                 //console.log('Error loginCheck',error)
               }
     }

   const  getUserData= async (currentUserData) =>{
   // console.log('userID',currentUserData)
   var response = await axios.get(`https://api.ictkart.com/api/user/detail?userId=${currentUserData}`)
   //console.log('response profile',response.data.data.user)
   if(typeof response.data !== 'undefined' && response.data !== null ){

      setFirstName(response.data.data.user.firstName)
      setLastName(response.data.data.user.lastName)
      setProfileImage(response.data.data.user.profileImage)



     //console.log('hello',response.data.data.user.firstName)
   }
   }
    const [loading, setloading] = useState(false)

    const logout = async () =>{
      //console.log('logout trigger')
        try {
            await AsyncStorage.removeItem('token');
            await AsyncStorage.removeItem('userExist');
            navigation.dispatch(
              StackActions.replace('Auth')
            );

            Toast.show('Log out successfully')
            //console.log('Log out successfully')
            //return true;
        }
        catch(exception) {
            return false;
            Toast.show('There is some connection problem. Please try later.')
            //console.log('there are some problem')
        }
    }
    const [categories, setCategory] = useState([])
    const [subCategories, setSubCategory] = useState([])
    const [showCategory, setShow] = useState(false)
    const [label, setLabel] = useState('')
    const category=()=>{
      try {
     axios.get('https://api.ictkart.com/api/categories/dropdown/list?type=product')
      .then(response => {
      //console.log(response.data.data.list)
      setCategory(response.data.data.list)

      })
    .catch(err => {
        //console.log('error',err)
      });
    }
    catch(error) {
      //console.log('error2',error)
    }
    }
  return (
    <View>
    <View style={{marginLeft:50, marginVertical:10}}>
    { profileImage !== null ?
      <Image source={{uri: profileImage }} style={{ width: 100, height: 100, borderRadius:50 }} />
    : <Image source={AccountInactiveImg} style={{ width: 100, height: 100, borderRadius:50 }} />
    }
    <Text style={{marginTop:5, fontWeight:'bold'}}>{firstname} {lastname}</Text>
    </View>
    <ScrollView contentContainerStyle={{marginLeft:10}} showsVerticalScrollIndicator={false}>
    <TouchableOpacity onPress={()=>navigation.navigate('HomeScreen')}
      style={{  flexDirection: 'row', padding:10, borderBottomColor: "grey", alignItems:'center' , backgroundColor:'white', marginTop:5  }}>
      <Text style={{ fontSize: 16,  flexShrink: 1 }}>Home</Text>
    </TouchableOpacity>
    {showCategory&&<TouchableOpacity onPress={()=>setShow(false)}
          style={{  flexDirection: 'row', padding:10, borderBottomColor: "grey", 
          alignItems:'center' , backgroundColor:'white', marginTop:5 ,justifyContent:'space-between' }}>
          <Text style={{ fontSize: 16,  flexShrink: 1 }}>Products</Text>
          <FontAwesome5 name='chevron-up' size={14} color={"grey"}/>
        </TouchableOpacity>}
    {!showCategory&&<TouchableOpacity onPress={()=>setShow(true)}
          style={{  flexDirection: 'row', padding:10, borderBottomColor: "grey", 
          alignItems:'center' , backgroundColor:'white', marginTop:5 ,justifyContent:'space-between' }}>
          <Text style={{ fontSize: 16,  flexShrink: 1 }}>Products</Text>
          <FontAwesome5 name='chevron-down' size={14} color={"grey"}/>
        </TouchableOpacity>}
    {showCategory&&categories.map((item,index)=>{
          return(
            <>
      {subCategories.length>0&&<TouchableOpacity key={index}
      onPress={()=>{setSubCategory([])}}
            style={{  flexDirection: 'row', marginHorizontal:10, borderBottomColor: "grey", 
            alignItems:'center' , backgroundColor:'white', marginVertical:6 ,paddingLeft:12
            ,justifyContent:'space-between' }}>
            <Text style={{ fontSize: 16,  flexShrink: 1 }}>{item.label}</Text>
            {item.subcategories&&item.subcategories.length>0&&<FontAwesome5 name='chevron-up' size={14} color={"grey"}/>}
          </TouchableOpacity>}
      {subCategories.length==0&&<TouchableOpacity key={index}
      onPress={()=>{item.subcategories&&item.subcategories.length>0? setSubCategory(item.subcategories):navigation.navigate('ProductScreen', { data: item });setLabel(item.label)}}
            style={{  flexDirection: 'row', marginHorizontal:10, borderBottomColor: "grey", 
            alignItems:'center' , backgroundColor:'white', marginVertical:6 ,paddingLeft:12
            ,justifyContent:'space-between' }}>
            <Text style={{ fontSize: 16,  flexShrink: 1 }}>{item.label}</Text>
            {item.subcategories&&item.subcategories.length>0&&<FontAwesome5 name='chevron-down' size={14} color={"grey"}/>}
          </TouchableOpacity>}
    {label==item.label&&item.subcategories&&item.subcategories.length>0&&subCategories.map((item,index)=>{
          return(
            <TouchableOpacity key={index} onPress={()=>navigation.navigate('ProductScreen', { data: item })}
      style={{  flexDirection: 'row', marginLeft:24, borderBottomColor: "grey", marginRight:10,
      alignItems:'center' , backgroundColor:'white', marginVertical:6 ,paddingLeft:12 }}>
      <Text style={{ fontSize: 16,  flexShrink: 1 }}>{item.label}</Text>
    </TouchableOpacity>)})}
    </>
            )
        })}
    <TouchableOpacity  onPress={()=>navigation.navigate('FaqScreen')}
      style={{  flexDirection: 'row', padding:10, borderBottomColor: "grey", alignItems:'center' , backgroundColor:'white', marginTop:5  }}>
      <Text style={{ fontSize: 16,  flexShrink: 1 }}>FAQ</Text>
    </TouchableOpacity>

    <TouchableOpacity onPress={()=>navigation.navigate('ContactusScreen')}
      style={{  flexDirection: 'row', padding:10, borderBottomColor: "grey", alignItems:'center' , backgroundColor:'white', marginTop:5  }}>
      <Text style={{ fontSize: 16,  flexShrink: 1 }}>Contact</Text>
    </TouchableOpacity>

    <TouchableOpacity onPress={()=>navigation.navigate('AboutScreen')}
      style={{  flexDirection: 'row', padding:10, borderBottomColor: "grey", alignItems:'center' , backgroundColor:'white', marginTop:5  }}>
      <Text style={{ fontSize: 16,  flexShrink: 1 }}>About us</Text>
    </TouchableOpacity>

    <TouchableOpacity onPress={()=>navigation.navigate('SettingScreen')}
      style={{  flexDirection: 'row', padding:10, borderBottomColor: "grey", alignItems:'center' , backgroundColor:'white', marginTop:5  }}>
      <Text style={{ fontSize: 16,  flexShrink: 1 }}>Setting</Text>
    </TouchableOpacity>

    <TouchableOpacity onPress={()=>navigation.navigate('DetailScreen')}
          style={{  flexDirection: 'row', padding:10, borderBottomColor: "grey", alignItems:'center' , backgroundColor:'white', marginTop:5  }}>
          <Text style={{ fontSize: 16,  flexShrink: 1 }}>Services</Text>
        </TouchableOpacity>

    <TouchableOpacity onPress={logout}
      style={{  flexDirection: 'row', padding:10, borderBottomColor: "grey", alignItems:'center' , backgroundColor:'white', marginTop:5  }}>
      <Text style={{ fontSize: 16,  flexShrink: 1 }}>Log out</Text>
    </TouchableOpacity>

   
</ScrollView>
    </View>

  );
}

const styles = StyleSheet.create({
  icon: {
    width: 23,
    height: 22,
  },
});
export default DrawerContent;
