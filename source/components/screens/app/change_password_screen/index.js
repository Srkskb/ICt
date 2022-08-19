import React, {useState, useRef, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  SafeAreaView
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
  BackButtonImg
} from '@images';
import Toast from 'react-native-simple-toast';
import axios from 'axios';
import Spinner from 'react-native-loading-spinner-overlay';
//import HomeScreen from '../../app/home_screen'
import { StackActions } from '@react-navigation/native';

const ChangePasswordScreen = ({navigation}) => {
  const [oldPass, setOldPass] = useState(null)
  const [password, setPassword] = useState(null)
  const [loadingtypeoverlay, setLoadingtypeoverlay] = useState(false)

// const [states, setStates] = useState({loadingtypeoverlay: false, email: '', password: ''});
  const passwordRef = useRef(null);
  const oldPassRef = useRef(null);
  const [logged, setLogged] = useState(false)
  const [userid, setUserId] = useState(null)

  const handleChangeId = val => {
    setStates(prev => ({...prev, oldPass: val}));
  };
  const handleChangePass = val => {
    setStates(prev => ({...prev, password: val}));
  };
  useEffect(() => {
    loginCheck()
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
               setUserId(currentUserData)


           } else {
             setLogged(false);

           }
         } catch(error) {
           //console.log('Error loginCheck',error)
         }
     }


  const onSubmit = async() => {

      //console.log('hit login api in else part');
      setLoadingtypeoverlay(true)

      var password_test = (String(password).trim()).length > 5
      if ( password_test === false  ) {
      setLoadingtypeoverlay(false);
      //console.log('password_test',password_test)
        setTimeout(()=> {
          Toast.show('Invalid password')
          },200)
          return
      }

      var oldPass_test = (String(oldPass).trim()).length > 5
      if ( oldPass_test === false  ) {
      setLoadingtypeoverlay(false);
      //console.log('oldPass_test',oldPass_test)
        setTimeout(()=> {
          Toast.show('Invalid old Pass password')
          },200)
          return
      }


      // if( password !== oldPass  ){
      //    Toast.show('confirm password does not match with password');
      //   return;
      //  }



    var data = {
        userId: userid,
        oldPassword: oldPass,
        newPassword: password
      }
      //console.log('data', data)
    try {

      var response = await axios.post('https://api.ictkart.com/api/user/update/password', data)
      if(response){
        //console.log('response',response.data)
        //if(response.data !== null && response.status == 200 && ){

          Toast.show('Password change successfully.')
          setLoadingtypeoverlay(false);
          await AsyncStorage.removeItem('token');
          await AsyncStorage.removeItem('userExist');
          navigation.dispatch(
            StackActions.replace('Auth')
          );
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
    <SafeAreaView style={styles.container}>
    <Spinner
            visible={loadingtypeoverlay}
            textContent={'Loading...' }
            textStyle={{ color: 'white' }}
          />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 0}}>
        <View style={{width:SCREEN_WIDTH,justifyContent:'center',flexDirection:'row',alignItems:'center', height:90,  }}>
        <TouchableOpacity onPress={()=> navigation.goBack()} style={{alignItems:'flex-start', flex:0.1,marginLeft:10 }}>
        <Image
          style={{width:30, height:50}}
          resizeMode="contain"
          source={BackButtonImg}
        />
        </TouchableOpacity>
        <View style={{flex:1}}>
        <Text style={{textAlign:'center', color:'black', paddingRight:15}}>New Password</Text>
        </View>
        </View>

        <Image
          style={styles.headerImg}
          resizeMode="contain"
          source={LoginLogoImg}
        />
        <View style={{alignItems:'center'}}>
          <Text style={styles.headerTitle}>Fill the following field to</Text>
          <Text style={styles.headerTitle}>get new password</Text>
        </View>
        <View style={styles.textInputBoxContainer}>
        <TextInput
          ref={oldPassRef}
          style={styles.textInputBoxStyle}
          value={oldPass}
          autoCorrect={false}
          onChangeText={val => setOldPass(val)}
          placeholder={'Old Password'}
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

        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={onSubmit}>
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

export default ChangePasswordScreen;
