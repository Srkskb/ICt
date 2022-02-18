import React, {useState, useEffect} from 'react';
import {View, Text,TouchableOpacity, Image, TextInput, FlatList, SafeAreaView, ScrollView, StyleSheet} from 'react-native';
import {DefaultColours, SCREEN_WIDTH} from '@constants';
import {Loader} from '@global_components';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackActions } from '@react-navigation/native';
import Modal from 'react-native-modal'
import axios from 'axios';

const SettingScreen = ({navigation}) => {
  const [state, setState] = useState({loader: true});








  return (
    <>
    <View style={{marginTop:20}}>
    <TouchableOpacity onPress={()=>navigation.navigate('AccountScreen')} style={{height:50, backgroundColor:'white', justifyContent:'center'}}>
    <Text style={{marginLeft:10}}>Edit Profile</Text>
    </TouchableOpacity >

    <TouchableOpacity onPress={()=>navigation.navigate('ChangePasswordScreen')} style={{height:50, backgroundColor:'white', marginTop:20, justifyContent:'center'}}>
    <Text style={{marginLeft:10}}>Change Password</Text>
    </TouchableOpacity>
    </View>

    </>
  );
};




export default SettingScreen;
