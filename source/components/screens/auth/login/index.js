import React, {useState, useRef} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
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
} from '@images';
import Toast from 'react-native-simple-toast';
import axios from 'axios';
import Spinner from 'react-native-loading-spinner-overlay';
//import HomeScreen from '../../app/home_screen'

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loadingtypeoverlay, setLoadingtypeoverlay] = useState(false)

// const [states, setStates] = useState({loadingtypeoverlay: false, email: '', password: ''});
  const emailRef = useRef(null);
  const passwordRef = useRef(null);



  const onSubmit = async() => {

      //console.log('hit login api in else part');
      setLoadingtypeoverlay(true)

      var email_test = String(email).trim().toLowerCase()
      // var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      // var email_test = re.test(email)

      if ( email_test === false  ) {
        setLoadingtypeoverlay(false);
        setTimeout(()=> {
          Toast.show('Invalid email')
          },200)
          return
      }


      var password_test = String(password).trim().toLowerCase()
      if ( password_test === false  ) {
        setLoadingtypeoverlay(false);
        setTimeout(()=> {
          Toast.show('Invalid password')
          },200)
          return
      }

    var data={
        email: email,
        password: password,
        role: 'user'
    }
    //console.log('data',data)

    try {

      var response = await axios.post('https://api.ictkart.com/api/user/login', data)
      // console.log(response.data.data)

      if(typeof response === 'undefined'){
        Toast.show('There is some connection problem. Please try later.')
        return
        setLoadingtypeoverlay(false);
      }



      if(response.data.status !== 200){
        Toast.show('error to login account')
        setLoadingtypeoverlay(false);
        return
      }



      // if(response.data.data === 'please verify you account first'){
      //   Toast.show(response.data.data)
      //   navigation.navigate('VerifyScreen', {token: response.data.data.token, email})
      //   setLoadingtypeoverlay(false);
      //   return;
      // }

        //console.log('token',response.data.data.token)
        //if(response.data !== null && response.status == 200 && ){
          await AsyncStorage.setItem('token', JSON.stringify(response.data.data.token ));
          await AsyncStorage.setItem('userExist', JSON.stringify(response.data.data.user._id));



          Toast.show('User login successfully.')
          setLoadingtypeoverlay(false);
          navigation.replace('App')
        //}


    }
      catch(error)  {
        // console.log('error',error.response.data)
          Toast.show('There is some connection problem. Please try later.')
          setLoadingtypeoverlay(false);
      }


}

const onForgot = async() => {

    //console.log('hit onForgot api in else part');
    setLoadingtypeoverlay(true)

    var email_test = String(email).trim().toLowerCase()
    // var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    // var email_test = re.test(email)

    if ( email_test === false  ) {
      setLoadingtypeoverlay(false);
      setTimeout(()=> {
        Toast.show('Invalid email')
        },200)
        return
    }



      var data={
          email: email,
      }

  try {

    var response = await axios.post('https://api.ictkart.com/api/user/forgot/password', data)
    if(response){
      //console.log('response',response.data)
      //if(response.data !== null && response.status == 200 && ){

        Toast.show('Password Has Been Sent To Your Mail.')
        setLoadingtypeoverlay(false);
        //navigation.navigate('ForgotScreen')
      //}
    }
  }
    catch(error)  {
      //console.log('error',error)
        Toast.show('There is some connection problem. Please try later.')
        setLoadingtypeoverlay(false);
    }


}
  return (
    <View style={styles.container}>
    <Spinner
            visible={loadingtypeoverlay}
            textContent={'Loading...' }
            textStyle={{ color: 'white' }}
          />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 50}}>
        <Image
          style={styles.headerImg}
          resizeMode="contain"
          source={LoginLogoImg}
        />
        <Text style={styles.headerTitle}>Welcome!</Text>
        <Text style={styles.headerSubtitle}>Login to continue...</Text>
        <View style={styles.textInputBoxContainer}>
          <Image
            style={styles.textInputBoxImg}
            resizeMode="contain"
            source={AtdRateImg}
          />
          <TextInput
            ref={emailRef}
            style={styles.textInputBoxStyle}
            value={email}
            autoCorrect={false}
            onChangeText={val => setEmail(val)}
            placeholder={''}
            placeholderTextColor={DefaultColours.borderColor}
            returnKeyType={'next'}
            keyboardType={'email-address'}
            maxLength={150}
            autoCapitalize={'none'}
            autoCompleteType={'off'}
            secureTextEntry={false}
          />
        </View>
        <View style={styles.textInputBoxContainer}>
          <Image
            style={styles.textInputBoxImg}
            resizeMode="contain"
            source={LockImg}
          />
          <TextInput
            ref={passwordRef}
            style={[styles.textInputBoxStyle, {width: SCREEN_WIDTH / 1.75}]}
            value={password}
            autoCorrect={false}
            onChangeText={val => setPassword(val)}
            placeholder={''}
            placeholderTextColor={DefaultColours.borderColor}
            returnKeyType={'go'}
            keyboardType={'visible-password'}
            maxLength={12}
            autoCapitalize={'none'}
            autoCompleteType={'off'}
            secureTextEntry={true}
          />
          <TouchableOpacity onPress={onForgot}>
          <Text style={styles.forgetText}>Forgot ?</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={onSubmit}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <Text style={styles.orLogin}>or Login with...</Text>
        <View style={styles.socialMdeiaContainer}>
          <TouchableOpacity
            style={styles.socialMediaButton}
            onPress={() => alert('go to signup')}>
            <Image
              style={styles.socialMedia}
              resizeMode="contain"
              source={GoogleImg}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.socialMediaButton}
            onPress={() => alert('go to signup')}>
            <Image
              style={styles.socialMedia}
              resizeMode="contain"
              source={FacebookImg}
            />
          </TouchableOpacity>
          {/*<TouchableOpacity
            style={styles.socialMediaButton}
            onPress={() => alert('go to signup')}>
            <Image
              style={styles.socialMedia}
              resizeMode="contain"
              source={LinkedInImg}
            />
          </TouchableOpacity>*/}
        </View>
        <Text
          style={styles.bottomText}
          onPress={() => navigation.navigate('SignupScreen')}>
          New to ICT Kart?{' '}
          <Text style={[styles.bottomText, {color: DefaultColours.ping1}]}>
            Register
          </Text>
        </Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: DefaultColours.white,
  },
  headerImg: {marginTop: 60, width: SCREEN_WIDTH, height: 250},
  headerTitle: {
    fontSize: FontSize(25),
    color: DefaultColours.titleColor,
    fontFamily: 'Aileron-Bold',
    marginLeft: 20,
    marginTop: 20,
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

export default LoginScreen;
