import React, {useState, useEffect} from 'react';
import {View, Text,TouchableOpacity, Image, TextInput, FlatList, SafeAreaView, ScrollView, StyleSheet} from 'react-native';
import {DefaultColours, SCREEN_WIDTH} from '@constants';
import {Loader} from '@global_components';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackActions } from '@react-navigation/native';
import Modal from 'react-native-modal'
import axios from 'axios';
import {
  LoginLogoImg,
  AtdRateImg,
  LockImg,
  GoogleImg,
  FacebookImg,
  LinkedInImg,
  BackButtonImg
} from '@images';


const AboutScreen = ({navigation}) => {
  const [state, setState] = useState({loader: true});








  return (
    <>
  
    <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
    <Text style={{fontSize:20, fontWeight:'bold'}}>test content for about us page </Text>
    </View>

    </>
  );
};




export default AboutScreen;
