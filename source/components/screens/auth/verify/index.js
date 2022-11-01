import React, {useState, useRef, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  Dimensions
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
const {width, height, scale} = Dimensions.get("window");

const VerifyScreen = ({route, navigation}) => {
  const [otp, setOtp] = useState(null)
  const [loadingtypeoverlay, setLoadingtypeoverlay] = useState(false)

  const otpRef = useRef(null);

  useEffect(() => {
    //console.log('props',route.params)
  }, []);


const onResend = async()=> {
  //console.log('hit login api in else part');
  setLoadingtypeoverlay(true)

var data={
    email: route.params.email,
}

try {
  var response = await axios.post('http://3.20.89.137:8181/api/user/otp', data)
  if(response){
    //console.log('response',response.data)
    //if(response.data !== null && response.status == 200 && ){

      Toast.show('OTP resend successfully.')
      setLoadingtypeoverlay(false);
      //navigation.navigate('VerifyScreen', { })
    //}
  }
}
  catch(error)  {
    //console.log('error',error)
      Toast.show('There is some connection problem. Please try later.')
      setLoadingtypeoverlay(false);
  }
}

  const onSubmit = async() => {

      //console.log('hit login api in else part');
      setLoadingtypeoverlay(true)

      var otp_test = (String(otp).trim()).length ==  4

      // var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      // var otp_test = re.test(otp)

      if ( otp_test === false  ) {
        setLoadingtypeoverlay(false);
        setTimeout(()=> {
          Toast.show('Invalid otp')
          },200)
          return
      }




    var data={
        otp: otp,
        email: route.params.email,
    }

    //console.log('otp data', data)


    try {

      var response = await axios.post('http://3.20.89.137:8181/api/user/verify/otp', data)
      if(response){
        //console.log('response',response.data)
        //if(response.data !== null && response.status == 200 && ){

          Toast.show('User login successfully.')
          setLoadingtypeoverlay(false);
          await AsyncStorage.setItem('token', JSON.stringify(response.data.data.token ));
          await AsyncStorage.setItem('userExist', JSON.stringify(response.data.data.user._id));
          navigation.navigate('App')


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
        contentContainerStyle={{paddingBottom: 0}}>
        <View style={{alignItems:'center', justifyContent:'center', height}}>
        <Text style={styles.headerTitle}>Verification</Text>
        <Text style={styles.headerSubtitle}>Please enter your code sent to otp ID</Text>
        <View style={{}}>

          <TextInput
            ref={otpRef}
            style={styles.textInputBoxStyle}
            value={otp}
            autoCorrect={false}
            onChangeText={val => setOtp(val)}
            placeholder={''}
            placeholderTextColor={DefaultColours.borderColor}
            returnKeyType={'next'}
            keyboardType={'numeric'}
            maxLength={4}
            autoCapitalize={'none'}
            autoCompleteType={'off'}
            secureTextEntry={false}
          />
        </View>

        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={onSubmit}>
          <Text style={styles.buttonText}>Verify</Text>
        </TouchableOpacity>
        <Text
          style={styles.bottomText}>
          Didn't receive OTP?{' '}
          <TouchableOpacity onPress={onResend}>
          <Text style={[styles.bottomText, {color: DefaultColours.ping1}]}>
             Resend Code.
          </Text>
          </TouchableOpacity>
        </Text>
        </View>


      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: DefaultColours.white,
  },
  headerTitle: {
    fontSize: FontSize(25),
    color: DefaultColours.titleColor,
    fontFamily: 'Aileron-Bold',
    marginLeft: 20,
    marginTop: 20,
  },
  headerSubtitle: {
    fontSize: FontSize(16),
    color: 'black',
    fontFamily: 'Aileron-Regular',
    marginLeft: 20,
    marginTop: 10,
  },

  textInputBoxImg: {marginLeft: 2, width: 40, height: 40},
  textInputBoxStyle: {
    marginLeft: 0,
    marginTop: 20,
    height: 50,
    paddingHorizontal:20,
    width: SCREEN_WIDTH / 4,
    alignItems: 'center',
    justifyContent:'center',
    fontSize:FontSize(25),
    borderBottomWidth: 2,
    borderBottomColor: DefaultColours.borderColor,

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
    fontSize: FontSize(16),
    fontFamily: 'Aileron-SemiBold',
  },
});

export default VerifyScreen;
