import React, {useState, useEffect, useRef} from 'react';
import {View, Text,TextInput, TouchableOpacity, Image,SafeAreaView, StyleSheet,StatusBar} from 'react-native';
import {Loader} from '@global_components';
import {DefaultColours, SCREEN_WIDTH, FontSize} from '@constants';
import {
  LoginLogoImg,
  AtdRateImg,
  LockImg,
  GoogleImg,
  FacebookImg,
  LinkedInImg,
  BackButtonImg,
  AccountActiveImg,
  AccountInactiveImg,

} from '@images';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CountryPicker from 'react-native-region-country-picker';
import Toast from 'react-native-simple-toast';
import axios from 'axios';
import Spinner from 'react-native-loading-spinner-overlay';

import ImagePicker from 'react-native-image-crop-picker';

const AccountScreen = ({navigation}) => {
  const [state, setState] = useState({loader: true});
  const [logged, setLogged] = useState(false)
  const [firstname, setFirstName] = useState('')
  const [lastname, setLastName] = useState('')
  const [mobile, setMobile] = useState('')
  const [countryCallingCode, setcountryCallingCode] = useState('')
  const [countryCode, setCountryCode] = useState('IN')
  const [countryName, setCountryName] = useState('')
  const [email, setEmail] = useState('')
  const [userid, setUserId] = useState(null)
  const [profileImage, setProfileImage] = useState(null)
  const [loadingtypeoverlay, setLoadingtypeoverlay] = useState(false)

  const [selectedimages, setselectedimage] = useState(null)


  let countryPickerRef = null;

  const firstnameRef = useRef(null);
  const lastnameRef = useRef(null);
  const mobileRef = useRef(null);
  const emailRef = useRef(null);

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

                   getUserData(currentUserData)
               } else {
                 setLogged(false);

               }
             } catch(error) {
               //console.log('Error loginCheck',error)
             }
   }

 const  getUserData= async  (currentUserData) =>{
 //console.log('userID',currentUserData)
 var response = await axios.get(`http://3.16.105.232:8181/api/user/detail?userId=${currentUserData}`)
 //console.log('response profile',response.data.data.user)
 if(typeof response.data !== 'undefined' && response.data !== null ){

    setFirstName(response.data.data.user.firstName)
    setLastName(response.data.data.user.lastName)
    setMobile(response.data.data.user.mobile)
    setEmail(response.data.data.user.email)
    setUserId(response.data.data.user.id)
    setcountryCallingCode(response.data.data.user.dialCode)
    setCountryName(response.data.data.user.countryName)
    setProfileImage(response.data.data.user.avatar)



   //console.log(response.data.Response[0].UserId)
 }
 }

 const  submitForm = async  () =>{
   //console.log('update api ')
   setLoadingtypeoverlay(true);
    var mobile_test = (String(mobile).trim()).length ==  10
    if ( mobile_test === false  ) {
    setLoadingtypeoverlay(false);
    //console.log('email_test',mobile_test)
      setTimeout(()=> {
        Toast.show('Invalid phone number')
        },200)
        return
    }

    var firstname_test = (String(firstname).trim()).length > 2
    if ( firstname_test === false  ) {
    setLoadingtypeoverlay(false);
    //console.log('firstname_test',firstname_test)
      setTimeout(()=> {
        Toast.show('Invalid first name')
        },200)
        return
    }

    var lastname_test = (String(lastname).trim()).length  > 2
    if ( lastname_test === false  ) {
    setLoadingtypeoverlay(false);
    //console.log('lastname_test',lastname_test)
      setTimeout(()=> {
        Toast.show('Invalid last name')
        },200)
        return
    }

      // go ahead

      var data = new FormData();
       data.append('id',userid);
       data.append('firstName',firstname);
       data.append('lastName',lastname);
       data.append('dialCode',countryCallingCode)
       data.append('mobile',mobile)

       if(selectedimages !== null){
         var file_extension = selectedimages.mime
         file_extension = file_extension.split('/')
         //console.log(`${userid}.${file_extension[1]}`)
         data.append('avatar',
           {
              uri: selectedimages.path,
              name: `${userid}.${file_extension[1]}`,
              type: selectedimages.mime
           });
       }

       // data.append('image',
       //   {
       //      uri:image,
       //      name:'userProfile.jpg',
       //      type:'image/jpg'
       //   });
       // data.append('country_code',countryCode);
       // data.append('phone',phone);
       // data.append('locale','en');

      // var data= {
      //    id: userid,
      //    firstName: firstname,
      //    lastName: lastname,
      //    dialCode: countryCallingCode,
      //    mobile: mobile,
      //   }

         //console.log('data', data)
         try {
          axios.post('http://3.16.105.232:8181/api/user/update', data)
           .then(response => {
           //console.log('response',response)
           Toast.show('Profile update')
           setLoadingtypeoverlay(false);

           })
         .catch(err => {
             //console.log('error',err)
             setLoadingtypeoverlay(false);
             Toast.show('some problem')
           });
         }
         catch(error)  {
           //console.log('error',error)
             Toast.show('There is some connection problem. Please try later.')
             setLoadingtypeoverlay(false);
         }

 }

 const opentheGallery = () => {
     var imgW = 300
     var imgH = 300

     const self = this;
     ImagePicker.openPicker({
       multiple: false,
       width: imgW,
       height: imgH,
       cropping: true,
       mediaType: 'photo',
       type: ['jpg','png']
     }).then(image => {
        //console.log('ImagePicker => openPicker(gallery) => images:: ',image);
         if(image !== null){
             setselectedimage(image)
         } //if images !== null
     });
   }

   useEffect(()=>{
     if(selectedimages !== null){
       //console.log(' now we will upload image')
        uploadPhotoProfile();
     }
   },[selectedimages])

   const uploadPhotoProfile = () =>{
        return;
         // const self = this;
         // const image = this.state.selectedimages;
         //
         // setLoadingtypeoverlay(true)
         //
         //   //if(imgType == )
         //
         // //  //console.log('are you even triggering?',image.path)
         //
         //   var thepath = `/users/profile/${imgType}/${self.state.currentUser.uid}.${image.file_extension}`;
         // //  //console.log('thepath',thepath)
         //
         // storage().ref(thepath)
         // .putFile(image.path, {
         //     contentType: image.mime
         // })
         // .then(uploadedFile => {
         //   //  //console.log('uploadedFile>',uploadedFile,self.state.currentUser.uid)
         //     return  storage().ref(thepath).getDownloadURL()
         // })
         // .then(downloadURL => {
         // //  //console.log('getDownloadURL',downloadURL)
         //   return firestore().collection('users').doc(self.state.currentUser.uid).set({[imgType]: downloadURL }, {merge: true })
         // })
         // .then(() => {
         // //  //console.log('updated into database')
         //   //Toast.show('Profile Updated')
         //   this.setState({ loadingImage: false })
         //   // if(typeof this.props.method() !== 'undefined'){
         //   //   this.props.method()
         //   // }
         // })
         // .catch(err => {
         //     //Error
         //   //  //console.log('error:',err);
         //     Toast.show('There is some problem to update your image. Please try later.')
         //     this.setState({ loadingImage: false })
         // })

       }

  return (
    <SafeAreaView style={styles.container}>
    <Spinner
            visible={loadingtypeoverlay}
            textContent={'Loading...' }
            textStyle={{ color: 'white' }}
          />
    <View style={{width:SCREEN_WIDTH,justifyContent:'center',flexDirection:'row',alignItems:'center', height:50,  }}>
    <TouchableOpacity onPress={()=> navigation.goBack()} style={{alignItems:'flex-start', flex:0.1,marginLeft:10 }}>
    <Image
      style={{width:30, height:50}}
      resizeMode="contain"
      source={BackButtonImg}
    />
    </TouchableOpacity>
    <View style={{flex:1}}>
    <Text style={{textAlign:'center', color:'black', paddingRight:15, fontSize:20}}>Profile</Text>
    </View>
    </View>
    <View style={{flex:1, alignItems:'center', marginTop:40}}>
    <TouchableOpacity  onPress={opentheGallery} style={{width:30, height:30, borderRadius:30, backgroundColor:'#493d88', alignItems:'center', justifyContent:'center'}}>
      {selectedimages !== null ?
        <Image source={{uri: selectedimages.path }} style={{ width: 100, height: 100, borderRadius:50 }} />
      : profileImage !== null ?
        <Image source={{uri: profileImage }} style={{ width: 100, height: 100, borderRadius:50 }} />
      : <Image source={AccountInactiveImg} style={{ width: 100, height: 100, borderRadius:50 }} />
      }
     </TouchableOpacity>
     </View>
    <View style={{marginTop:0}}>
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
          setCountryName(data.name)
          setCountryCode(data.code)
          setcountryCallingCode(data.callingCode)
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
  </View>

    <TouchableOpacity
      style={styles.buttonContainer}
      onPress={submitForm}>
      <Text style={styles.buttonText}>Update</Text>
      </TouchableOpacity>

    </SafeAreaView>
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
export default AccountScreen;
