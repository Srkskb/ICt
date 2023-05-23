import React, {useState, useRef} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {DefaultColours, SCREEN_WIDTH, FontSize} from '@constants';
import {
  LoginLogoImg,
  AtdRateImg,
  LockImg,
  GoogleImg,
  FacebookImg,
  LinkedInImg,
  BackButtonImg,
} from '@images';
import Toast from 'react-native-simple-toast';
import axios from 'axios';
import Spinner from 'react-native-loading-spinner-overlay';
//import HomeScreen from '../../app/home_screen'

const ForgotScreen = ({navigation}) => {
  const [confirmPass, setConfirmPass] = useState(null);
  const [password, setPassword] = useState(null);
  const [loadingtypeoverlay, setLoadingtypeoverlay] = useState(false);

  // const [states, setStates] = useState({loadingtypeoverlay: false, email: '', password: ''});
  const passwordRef = useRef(null);
  const confirmPassRef = useRef(null);

  const handleChangeId = val => {
    setStates(prev => ({...prev, confirmPass: val}));
  };
  const handleChangePass = val => {
    setStates(prev => ({...prev, password: val}));
  };

  const onSubmit = async () => {
    //console.log('hit login api in else part');
    setLoadingtypeoverlay(true);

    var password_test = String(password).trim().length > 5;
    if (password_test === false) {
      setLoadingtypeoverlay(false);
      //console.log('password_test',password_test)
      setTimeout(() => {
        Toast.show('Invalid password');
      }, 200);
      return;
    }

    var confirmPass_test = String(confirmPass).trim().length > 5;
    if (confirmPass_test === false) {
      setLoadingtypeoverlay(false);
      //console.log('confirmPass_test',confirmPass_test)
      setTimeout(() => {
        Toast.show('Invalid confirm password');
      }, 200);
      return;
    }

    if (password !== confirmPass) {
      Toast.show('confirm password does not match with password');
      return;
    }

    var data = {
      password: password,
      role: 'user',
    };

    try {
      var response = await axios.post(
        'http://Ictkart.com/api/user/forgot/password',
        data,
      );
      if (response) {
        //console.log('response',response.data.data.token)
        //if(response.data !== null && response.status == 200 && ){
        await AsyncStorage.setItem(
          'token',
          JSON.stringify(response.data.data.token),
        );
        await AsyncStorage.setItem(
          'userExist',
          JSON.stringify(response.data.data.user._id),
        );

        Toast.show('User login successfully.');
        setLoadingtypeoverlay(false);
        navigation.navigate('App');
        //}
      }
    } catch (error) {
      //console.log('error',error)
      Toast.show('There is some connection problem. Please try later.');
      setLoadingtypeoverlay(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Spinner
        visible={loadingtypeoverlay}
        textContent={'Loading...'}
        textStyle={{color: 'white'}}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 0}}>
        <View
          style={{
            width: SCREEN_WIDTH,
            justifyContent: 'center',
            flexDirection: 'row',
            alignItems: 'center',
            height: 90,
          }}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{alignItems: 'flex-start', flex: 0.1, marginLeft: 10}}>
            <Image
              style={{width: 30, height: 50}}
              resizeMode="contain"
              source={BackButtonImg}
            />
          </TouchableOpacity>
          <View style={{flex: 1}}>
            <Text
              style={{textAlign: 'center', color: 'black', paddingRight: 15}}>
              New Password
            </Text>
          </View>
        </View>

        <Image
          style={styles.headerImg}
          resizeMode="contain"
          source={LoginLogoImg}
        />
        <View style={{alignItems: 'center'}}>
          <Text style={styles.headerTitle}>Fill the following field to</Text>
          <Text style={styles.headerTitle}>get new password</Text>
        </View>
        <View style={styles.textInputBoxContainer}>
          <TextInput
            ref={passwordRef}
            style={styles.textInputBoxStyle}
            value={password}
            autoCorrect={false}
            onChangeText={val => setPassword(val)}
            placeholder={'New Password'}
            placeholderTextColor={DefaultColours.black}
            returnKeyType={'go'}
            keyboardType={'visible-password'}
            maxLength={12}
            autoCapitalize={'none'}
            autoCompleteType={'off'}
            secureTextEntry={true}
          />
        </View>
        <View style={styles.textInputBoxContainer}>
          <TextInput
            ref={confirmPassRef}
            style={styles.textInputBoxStyle}
            value={confirmPass}
            autoCorrect={false}
            onChangeText={val => setConfirmPass(val)}
            placeholder={'Confirm Password'}
            placeholderTextColor={DefaultColours.black}
            returnKeyType={'go'}
            keyboardType={'visible-password'}
            maxLength={12}
            autoCapitalize={'none'}
            autoCompleteType={'off'}
            secureTextEntry={true}
          />
        </View>
        <TouchableOpacity style={styles.buttonContainer} onPress={onSubmit}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: DefaultColours.white,
  },
  headerImg: {marginTop: 60, width: SCREEN_WIDTH, height: 250},
  headerTitle: {
    fontSize: FontSize(16),
    color: DefaultColours.titleColor,
    fontFamily: 'Aileron-Bold',
    marginLeft: 20,
    marginTop: 10,
  },
  headerSubtitle: {
    fontSize: FontSize(19),
    color: DefaultColours.subTitlteColor,
    fontFamily: 'Aileron-Regular',
    marginLeft: 20,
    marginTop: 10,
  },
  textInputBoxContainer: {
    marginTop: 20,
    marginHorizontal: 18,
    height: 52,
    width: SCREEN_WIDTH / 1.12,
    borderBottomWidth: 2,
    borderBottomColor: DefaultColours.borderColor,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  textInputBoxImg: {marginLeft: 2, width: 40, height: 40},
  textInputBoxStyle: {
    marginLeft: 10,
    height: 50,
    width: SCREEN_WIDTH / 1.35,
  },
  forgetText: {
    fontSize: FontSize(16),
    fontFamily: 'Aileron-Regular',
    color: DefaultColours.ping1,
  },
  buttonContainer: {
    marginTop: 30,
    marginHorizontal: 18,
    width: SCREEN_WIDTH / 1.12,
    height: 50,
    backgroundColor: DefaultColours.pink,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  buttonText: {
    color: DefaultColours.white,
    fontSize: FontSize(18),
    fontFamily: 'Aileron-Regular',
  },
  orLogin: {
    fontSize: FontSize(19),
    color: DefaultColours.subTitlteColor,
    fontFamily: 'Aileron-Regular',
    textAlign: 'center',
    marginTop: 20,
  },
  socialMdeiaContainer: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  socialMediaButton: {
    marginHorizontal: 2,
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: DefaultColours.grey,
    alignItems: 'center',
    justifyContent: 'center',
  },
  socialMedia: {width: 40, height: 40},
  bottomText: {
    marginTop: 30,
    textAlign: 'center',
    color: DefaultColours.titleColor,
    fontSize: FontSize(18),
    fontFamily: 'Aileron-SemiBold',
  },
});

export default ForgotScreen;
