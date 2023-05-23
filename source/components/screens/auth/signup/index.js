import React, {useState, useRef, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  StatusBar,
} from 'react-native';
import {DefaultColours, SCREEN_WIDTH, FontSize} from '@constants';
import {BackButtonImg, TickMarkImg} from '@images';
import CountryPicker from 'react-native-region-country-picker';
import Toast from 'react-native-simple-toast';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';

const SignupScreen = ({navigation}) => {
  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [mobile, setMobile] = useState('');
  const [countryCallingCode, setcountryCallingCode] = useState('91');
  const [countryCode, setCountryCode] = useState('IN');
  const [countryName, setCountryName] = useState('India');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [termsConditionReadStatus, setTermsConditionReadStatus] =
    useState(false);
  const [loadingtypeoverlay, setLoadingtypeoverlay] = useState(false);

  let countryPickerRef = null;

  const firstnameRef = useRef(null);
  const lastnameRef = useRef(null);
  const mobileRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPassRef = useRef(null);

  useEffect(() => {
    //console.log('this is didmount')
  }, []);

  useEffect(() => {
    //console.log('this will run after country code update',countryCode)
  }, [countryCode]);

  const onSubmit = async () => {
    //console.log('hit login api in else part');
    setLoadingtypeoverlay(true);

    var email_test = String(email).trim().toLowerCase();
    // var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    // var email_test = re.test(email)

    if (email_test === false) {
      setLoadingtypeoverlay(false);
      //console.log('email_test',email_test)
      setTimeout(() => {
        Toast.show('Invalid email');
      }, 200);
      return;
    }
    // var firstname = String(firstname).trim()
    // var lastname = String(lastname).trim()
    //
    // var firstname_test = firstname.length > 2
    // var lastname_test = lastname.length > 2
    //
    // if ( firstname_test === false  ) {
    // setLoadingtypeoverlay(false);
    // //console.log('firstname_test',firstname_test)
    //   setTimeout(()=> {
    //     Toast.show('Invalid first name')
    //     },200)
    //     return
    // }
    //
    //
    // if ( lastname_test === false  ) {
    // setLoadingtypeoverlay(false);
    // //console.log('lastname_test',lastname_test)
    //   setTimeout(()=> {
    //     Toast.show('Invalid last name')
    //     },200)
    //     return
    // }

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

    var mobile_test = String(mobile).trim().length == 10;
    if (mobile_test === false) {
      setLoadingtypeoverlay(false);
      //console.log('email_test',mobile_test)
      setTimeout(() => {
        Toast.show('Invalid phone number');
      }, 200);
      return;
    }

    if (password !== confirmPass) {
      Toast.show('confirm password does not match with password');
      return;
    }

    var data = {
      firstName: firstname,
      lastName: lastname,
      dialCode: countryCallingCode,
      mobile: mobile,
      country: countryName,
      email: email,
      password: password,
      hearAboutICT: 'hear about ICT',
      role: 'user',
    };
    var ldata = {
      email: email,
      password: password,
      role: 'user',
    };
    //console.log('data', data)

    try {
      axios
        .post('http://Ictkart.com/api/user/add', data)
        .then(response => {
          //console.log('response',response)
          Toast.show(
            'Your Account Register successfully. Signing into your account',
          );
          // setLoadingtypeoverlay(false);
          try {
            axios.post('http://Ictkart.com/api/user/login', data).then(res => {
              // console.log(response.data.data)

              if (res.data.status !== 200) {
                Toast.show('error to login account');
                setLoadingtypeoverlay(false);
                return;
              }

              // if(response.data.data === 'please verify you account first'){
              //   Toast.show(response.data.data)
              //   navigation.navigate('VerifyScreen', {token: response.data.data.token, email})
              //   setLoadingtypeoverlay(false);
              //   return;
              // }

              //console.log('token',response.data.data.token)
              //if(response.data !== null && response.status == 200 && ){
              AsyncStorage.setItem(
                'token',
                JSON.stringify(res.data.data.token),
              );
              AsyncStorage.setItem(
                'userExist',
                JSON.stringify(res.data.data.user._id),
              );

              Toast.show('User login successfully.');
              setLoadingtypeoverlay(false);
              navigation.replace('App');
              //}
            });
          } catch (error) {
            // console.log('error',error.response.data)
            Toast.show('There is some connection problem. Please try later.');
            setLoadingtypeoverlay(false);
          }
          // navigation.navigate('VerifyScreen',{ email})
        })
        .catch(err => {
          //console.log('error',err)
          setLoadingtypeoverlay(false);
          Toast.show('This account already exit');
        });
    } catch (error) {
      //console.log('error',error)
      Toast.show('There is some connection problem. Please try later.');
      setLoadingtypeoverlay(false);
    }
  };
  const changeTermnConditionReadStatus = () =>
    setTermsConditionReadStatus(prev => ({
      ...prev,
      termsConditionReadStatus: !prev.termsConditionReadStatus,
    }));

  return (
    <View style={styles.container}>
      <Spinner
        visible={loadingtypeoverlay}
        textContent={'Loading...'}
        textStyle={{color: 'white'}}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 50}}>
        <View style={styles.headerContainer}>
          <TouchableOpacity
            style={styles.backButtonContainer}
            onPress={() => navigation.goBack()}>
            <Image
              style={styles.backButtonImg}
              resizeMode="contain"
              source={BackButtonImg}
            />
          </TouchableOpacity>
          <Text style={styles.headerSubtitle}>Signup</Text>
          <View style={{marginRight: 20, height: 50, width: 50}} />
        </View>
        <View style={styles.textInputBoxContainer}>
          <TextInput
            ref={firstnameRef}
            style={styles.textInputBoxStyle}
            value={firstname}
            autoCorrect={false}
            onChangeText={val => setFirstName(val)}
            placeholder={'First Name'}
            placeholderTextColor={DefaultColours.black}
            returnKeyType={'next'}
            keyboardType={'default'}
            maxLength={90}
            autoCapitalize={'none'}
            autoCompleteType={'off'}
            secureTextEntry={false}
          />
        </View>

        <View style={styles.textInputBoxContainer}>
          <TextInput
            ref={lastnameRef}
            style={styles.textInputBoxStyle}
            value={lastname}
            autoCorrect={false}
            onChangeText={val => setLastName(val)}
            placeholder={'Last Name'}
            placeholderTextColor={DefaultColours.black}
            returnKeyType={'next'}
            keyboardType={'default'}
            maxLength={90}
            autoCapitalize={'none'}
            autoCompleteType={'off'}
            secureTextEntry={false}
          />
        </View>
        <View style={styles.textInputBoxContainer}>
          <CountryPicker
            countryPickerRef={ref => {
              countryPickerRef = ref;
            }}
            enable={true}
            darkMode={false}
            countryCode={countryCode}
            containerConfig={{
              showFlag: false,
              showCallingCode: true,
              showCountryName: false,
              showCountryCode: false,
            }}
            modalConfig={{
              showFlag: true,
              showCallingCode: true,
              showCountryName: true,
              showCountryCode: false,
            }}
            onSelectCountry={data => {
              //console.log('#. onSelectCountry : ', data);
              setCountryName(data.name);
              setCountryCode(data.code);
              setcountryCallingCode(data.callingCode);
            }}
            containerStyle={{
              container: {marginLeft: 5},
            }}
            title={'Country'}
            searchPlaceholder={'Search'}
            showCloseButton={true}
            showModalTitle={true}
          />
          <TextInput
            ref={mobileRef}
            style={[styles.textInputBoxStyle, {width: SCREEN_WIDTH / 1.3}]}
            value={mobile}
            autoCorrect={false}
            onChangeText={val => setMobile(val)}
            placeholder={'Mobile Number'}
            placeholderTextColor={DefaultColours.black}
            returnKeyType={'next'}
            keyboardType={'default'}
            maxLength={10}
            autoCapitalize={'none'}
            autoCompleteType={'off'}
            secureTextEntry={false}
          />
        </View>
        <View style={styles.textInputBoxContainer}>
          <TextInput
            ref={emailRef}
            style={styles.textInputBoxStyle}
            value={email}
            autoCorrect={false}
            onChangeText={val => setEmail(val)}
            placeholder={'Email Address'}
            placeholderTextColor={DefaultColours.black}
            returnKeyType={'next'}
            keyboardType={'default'}
            maxLength={150}
            autoCapitalize={'none'}
            autoCompleteType={'off'}
            secureTextEntry={false}
          />
        </View>
        <View style={styles.textInputBoxContainer}>
          <TextInput
            ref={passwordRef}
            style={styles.textInputBoxStyle}
            value={password}
            autoCorrect={false}
            onChangeText={val => setPassword(val)}
            placeholder={'Password'}
            placeholderTextColor={DefaultColours.black}
            returnKeyType={'next'}
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
        <TouchableOpacity
          style={styles.readConditionContainer}
          onPress={changeTermnConditionReadStatus}>
          <View style={styles.readConditionBox}>
            {termsConditionReadStatus ? (
              <Image
                style={styles.backButtonImg}
                resizeMode="contain"
                source={TickMarkImg}
              />
            ) : null}
          </View>
          <Text style={styles.reacConditionText}>
            I have read terms & conditions
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonContainer} onPress={onSubmit}>
          <Text style={styles.buttonText}>Signup</Text>
        </TouchableOpacity>
        <Text
          style={styles.bottomText}
          onPress={() => navigation.navigate('LoginScreen')}>
          Already a member?{' '}
          <Text style={[styles.bottomText, {color: DefaultColours.ping1}]}>
            Sign In
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
  headerContainer: {
    marginTop: StatusBar.currentHeight + 5,
    height: 50,
    width: SCREEN_WIDTH,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButtonContainer: {
    marginLeft: 10,
    height: 50,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButtonImg: {width: 20, height: 20},
  headerSubtitle: {
    fontSize: FontSize(19),
    color: DefaultColours.black,
    fontFamily: 'Aileron-Regular',
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
  textInputBoxStyle: {
    marginLeft: 2,
    height: 50,
    width: SCREEN_WIDTH / 1.15,
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
  bottomText: {
    marginTop: 30,
    textAlign: 'center',
    color: DefaultColours.titleColor,
    fontSize: FontSize(18),
    fontFamily: 'Aileron-SemiBold',
  },
  readConditionContainer: {
    marginTop: 20,
    marginLeft: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  readConditionBox: {
    height: 22,
    width: 22,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: DefaultColours.borderColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
  reacConditionText: {
    marginLeft: 15,
    color: DefaultColours.titleColor,
    fontSize: FontSize(16),
    fontFamily: 'Aileron-Regular',
  },
});

export default SignupScreen;
