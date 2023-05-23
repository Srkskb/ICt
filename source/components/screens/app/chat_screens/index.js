import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Dimensions,
} from 'react-native';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {DefaultColours, SCREEN_WIDTH, SCREEN_HIGHT, FontSize} from '@constants';
import {Loader} from '@global_components';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {StackActions} from '@react-navigation/native';
import Modal from 'react-native-modal';
import axios from 'axios';
import Toast from 'react-native-simple-toast';
import Svg, {Path, Circle, Line} from 'react-native-svg';
import {
  LoginLogoImg,
  AtdRateImg,
  LockImg,
  GoogleImg,
  FacebookImg,
  LinkedInImg,
  BackButtonImg,
  DrawerImage,
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
const {width, height} = Dimensions.get('window');
const ChatScreen = ({navigation, route}) => {
  const [state, setState] = useState({loader: true, cart: []});
  const getlist = () => {
    AsyncStorage.getItem('userExist').then(res => {
      try {
        var data = JSON.stringify({
          userId: JSON.parse(res),
        });

        var config = {
          method: 'post',
          url: 'http://Ictkart.com/api/user/cart',
          headers: {
            'Content-Type': 'application/json',
          },
          data: data,
        };

        axios(config)
          .then(function (response) {
            // console.log(response.data.data.list)
            if (JSON.stringify(response.data.status) == 200) {
              setState(prev => ({...prev, cart: response.data.data.list}));
            }
          })
          .catch(function (error) {
            //console.log(error);
          });
      } catch (error) {
        //console.log('error2',error)
      }
    });
  };
  useEffect(() => {
    setTimeout(() => {
      setState(prev => ({...prev, loader: false}));
    }, 2000);
    getlist();
  }, []);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#f9f9f9'}}>
      {state.loader ? (
        <Loader />
      ) : (
        <>
          <View style={{width: '100%', height: '92%'}}>
            <View
              style={{
                width: '100%',
                height: '10%',
                backgroundColor: '#fdfdfd',
                paddingHorizontal: width * 0.06,
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'row',
              }}>
              <Text
                style={{
                  paddingHorizontal: 12,
                  fontSize: width * 0.06,
                  fontWeight: 'bold',
                }}>
                Debit/Credit Cards
              </Text>
            </View>
            <View style={{paddingTop: width * 0.05}}>
              <View
                style={{
                  height: 300,
                  width: 370,
                  backgroundColor: '#FFFFFF',
                  justifyContent: 'center',
                  alignItems: 'center',
                  alignSelf: 'center',
                  paddingBottom: width * 0.06,
                  borderRadius: 10,
                }}>
                <View style={styles.topField}>
                  <TextInput
                    style={{fontSize: 20, borderBottomWidth: 1}}
                    placeholder={'1234-5678-9012-5456'}
                    placeholderTextColor={'#000000'}
                    keyboardType="numeric"
                  />
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    paddingTop: width * 0.04,
                    width: '80%',
                  }}>
                  <View style={{width: '40%'}}>
                    <TextInput
                      style={{
                        fontSize: 20,
                        borderBottomWidth: 2,
                        paddingHorizontal: width * 0.05,
                      }}
                      placeholder={'MM/YY'}
                      placeholderTextColor={'#000000'}
                      keyboardType="name-phone-pad"
                    />
                  </View>
                  <View style={{width: '60%', paddingLeft: width * 0.1}}>
                    <TextInput
                      style={{
                        fontSize: 20,
                        borderBottomWidth: 2,
                        paddingHorizontal: width * 0.1,
                      }}
                      placeholder={'CVV'}
                      placeholderTextColor={'#000000'}
                      keyboardType="phone-pad"
                    />
                  </View>
                </View>
                <View style={styles.topField}>
                  <TextInput
                    style={{fontSize: 20, borderBottomWidth: 1}}
                    placeholder={'Name'}
                    placeholderTextColor={'#000000'}
                  />
                </View>
              </View>
              <View style={{paddingTop: width * 0.09}}>
                <TouchableOpacity onPress={() => alert('Added Sucessfully')}>
                  <View
                    style={{
                      borderWidth: 1,
                      borderRadius: 5,
                      paddingVertical: width * 0.05,
                      marginHorizontal: width * 0.06,
                      backgroundColor: '#5A429B',
                      borderColor: '#5A429B',
                    }}>
                    <Text
                      style={{
                        textAlign: 'center',
                        fontSize: width * 0.05,
                        color: '#FFFFFF',
                      }}>
                      ADD CARDS
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View
            style={{
              width: '100%',
              height: '8%',
              alignItems: 'center',
              flexDirection: 'row',
            }}>
            <TouchableOpacity
              onPress={() => navigation.navigate('HomeScreen')}
              style={{
                width: '25%',
                height: '100%',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              {route.name == 'HomeScreen' ? (
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
              <Text
                style={{color: 'grey', fontSize: FontSize(10), paddingTop: 2}}>
                Home
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('SettingScreen')}
              style={{
                width: '25%',
                height: '100%',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              {route.name == 'SettingScreen' ? (
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
              <Text
                style={{color: 'grey', fontSize: FontSize(10), paddingTop: 2}}>
                Account
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('CartScreen')}
              style={{
                width: '25%',
                height: '100%',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              {route.name == 'CartScreen' ? (
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
              {state.cart && state.cart.length == 0 ? null : (
                <View
                  style={{
                    position: 'absolute',
                    borderRadius: 20,
                    backgroundColor: DefaultColours.blue0,
                    paddingHorizontal: 5,
                    top: 2,
                    right: '30%',
                    paddingVertical: 2,
                  }}>
                  <Text style={{color: '#fff', fontSize: FontSize(7)}}>
                    {state.cart && state.cart.length}
                  </Text>
                </View>
              )}
              <Text
                style={{color: 'grey', fontSize: FontSize(10), paddingTop: 2}}>
                Cart
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('ChatScreen')}
              style={{
                width: '25%',
                height: '100%',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              {route.name == 'ChatScreen' ? (
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
              <Text
                style={{color: 'grey', fontSize: FontSize(10), paddingTop: 2}}>
                Chat
              </Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  topField: {
    marginTop: 10,
    width: '80%',
    borderBottomWidth: 1,
    alignSelf: 'center',
  },
  bottomField: {
    marginTop: 10,
    width: '40%',
    borderBottomWidth: 1,
    alignSelf: 'center',
  },
});

export default ChatScreen;
