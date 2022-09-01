import React, {useState, useEffect} from 'react';
import {View, Text,TouchableOpacity, Image, TextInput, FlatList, ScrollView,
  StyleSheet,KeyboardAvoidingView,Dimensions,Alert} from 'react-native';
import {SafeAreaProvider,SafeAreaView} from 'react-native-safe-area-context';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import {DefaultColours, SCREEN_WIDTH,SCREEN_HIGHT,FontSize} from '@constants';
import {Loader} from '@global_components';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackActions } from '@react-navigation/native';
import Modal from 'react-native-modal'
import axios from 'axios';
import Toast from 'react-native-simple-toast';
import Svg, {Path,Circle,Line} from 'react-native-svg';
import {
  LoginLogoImg,
  AtdRateImg,
  LockImg,
  GoogleImg,
  FacebookImg,
  LinkedInImg,
  BackButtonImg,
  DrawerImage
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
let {height, width} = Dimensions.get('window');
import RazorpayCheckout from 'react-native-razorpay';
import { initStripe,CardField,useStripe,useConfirmPayment,StripeProvider  } from '@stripe/stripe-react-native';
import StripeCheckout from 'react-native-stripe-checkout-webview';
const CartScreen = ({navigation,route}) => {
  const [state, setState] = useState({loader: true,cart:[]});
  const [id, setID] = useState('');
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [houseNo, setHouseNo] = useState('');
  const [locality, setLocality] = useState('');
  const [postalAddress, setPostalAddress] = useState('');
  const [city, setCity] = useState('');
  const [cstate, setcState] = useState('');
  const [code, setCode] = useState('');
  const [view, setView] = useState('cart');
  const [cardView, setCardView] = useState(false)
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [loading, setLoading] = useState(false)
  const [address, setAddress] = useState([])

  
  const fetchPaymentIntentClientSecret = async () => {
    const total=state.cart.map(i=>i.sellingPrice*i.quantity).reduce((a, b) => a+b, 0)
    const response = await fetch(`https://ictsripepay.netlify.app/.netlify/functions/stripe`, {
      method: 'POST',
        body: JSON.stringify({
          "amount": total*100,
          "currency": "INR",
          "payment_method_types": ["card"]
        }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const { paymentIntent, ephemeralKey, customer} = await response.json();
    return {
      paymentIntent
    };
  };
  const initializePaymentSheet = async () => {
    const {
      paymentIntent
    } = await fetchPaymentIntentClientSecret();
    // await new Promise((resolve) => setTimeout(resolve, 2500));
    const { error } = await initPaymentSheet({
      paymentIntentClientSecret: (paymentIntent),
      // Set `allowsDelayedPaymentMethods` to true if your business can handle payment
      //methods that complete payment after a delay, like SEPA Debit and Sofort.
      // customerId: customer,
      customFlow: false,
      merchantDisplayName: 'Ict',
      style: 'alwaysDark',
    });
    if (!error) {
      setLoading(true);
    }
  };

  const openPaymentSheet = async () => {
    const { error } = await presentPaymentSheet();

    if (error) {
      Alert.alert(`Error code: ${error.code}`, error.message);
    } else {
      Alert.alert('Success', 'Your order is confirmed!');
      checkOut()
    }
  };
const getlist = () => {
  AsyncStorage.getItem('userExist')
            .then(res =>{
                try {
                 var data = JSON.stringify({
              "userId": JSON.parse(res)
            });
            
            var config = {
              method: 'post',
              url: 'https://api.ictkart.com/api/user/cart',
              headers: { 
                'Content-Type': 'application/json'
              },
              data : data
            };
            var config1 = {
              method: 'post',
              url: 'https://api.ictkart.com/api/address/list',
              headers: { 
                'Content-Type': 'application/json'
              },
              data : data
            };
            
            axios(config)
            .then((response)=>{
              // console.log(response.data.data.list)
              if(JSON.stringify(response.data.status)==200){
                setState(prev => ({...prev, cart:response.data.data.list}))
              }
            })
            .catch(function (error) {
              //console.log(error);
            });
            axios(config1)
            .then((response)=>{
              // console.log(response.data.data.list)
              if(JSON.stringify(response.data.status)==200){
                setAddress(response.data.data.list)
                if(response.data.data.list!==null){
                  let data=response.data.data.list
                  setName(data[0].name)
                  setMobile(data[0].mobile)
                  setHouseNo(data[0].address.houseNo)
                  setLocality(data[0].address.locality)
                  setPostalAddress(data[0].address.postalAddress)
                  setCity(data[0].address.city)
                  setcState(data[0].address.state)
                  setCode(data[0].address.postcode)
                }
              }
            })
            .catch(function (error) {
              //console.log(error);
            });
                }
                catch(error) {
                  //console.log('error2',error)
                }}
  )}

  useEffect(() => {
    if(navigation.isFocused()){
        setTimeout(() => {
          setState(prev => ({...prev, loader: false}));
        }, 2000);
        getlist()
        initStripe({
      publishableKey: 'pk_test_51Gze4PEdL6oaZOjizb9kCMyTAwKEzo0Lcl0ZTBKsHJNtGfrqIfNcoYRAh6XtguOXVGjAuOha5wqUIcP3YCahaHne00FSYLR15v'
    });
        // initializePaymentSheet()
      }
  }, [navigation]);

  const renderList = list => {

    
    const removeItem=(list)=>{
AsyncStorage.getItem('userExist')
            .then(res =>{
                try {
     var data = JSON.stringify({
  "userId": JSON.parse(res),
  "product": list._id
});
var config = {
  method: 'post',
  url: 'https://api.ictkart.com/api/user/remove/cart',
  headers: { 
    'Content-Type': 'application/json'
  },
  data : data
};
axios(config)
.then((response)=>{
  // console.log(JSON.stringify(response.data))
  getlist()
  Toast.show(response.data.message)
})
.catch((error)=>{
  //console.log(error);
});
    }
    catch(error) {
                  //console.log('error2',error)
                }}
  )}
const addqty=(list)=>{
  AsyncStorage.getItem('userExist')
            .then(res =>{
                try {
     var data = JSON.stringify({
  "userId": JSON.parse(res),
  "carts": {
    "product": list._id, units: 1
  }
});

var config = {
  method: 'post',
  url: 'https://api.ictkart.com/api/user/add/incart',
  headers: { 
    'Content-Type': 'application/json'
  },
  data : data
};
axios(config)
.then((response)=>{
  //console.log(JSON.stringify(response.data))
  Toast.show(response.data.message)
  getlist()
})
.catch((error)=>{
  //alert(error);
});
    }
    catch(error) {
                  //console.log('error2',error)
                }}
  )
}
const remqty=(list)=>{
  AsyncStorage.getItem('userExist')
            .then(res =>{
                try {
     var data = JSON.stringify({
  "userId": JSON.parse(res),
  "carts": {
    "product": list._id, units:Number(-1)
  }
});

var config = {
  method: 'post',
  url: 'https://api.ictkart.com/api/user/add/incart',
  headers: { 
    'Content-Type': 'application/json'
  },
  data : data
};
axios(config)
.then((response)=>{
  // console.log(JSON.stringify(response.data))
  Toast.show(response.data.message)
  getlist()
})
.catch((error)=>{
  //alert(error);
});
    }
    catch(error) {
                  //console.log('error2',error)
                }}
  )
}

    return(
      <View elevation={5} style={{marginHorizontal:height*0.02,backgroundColor: '#fdfdfd',padding:6,
      marginVertical:height*0.01,borderRadius: 6}}>
        
        <View style={{flexDirection:'row',width:'100%',padding:6}}>
        <View style={{width:'20%'}}><Image style={{height:100,borderRadius: 6}}
                source={{uri:list.thumbnail}} resizeMode={'contain'}
                /></View>
        <View style={{width:'50%',paddingHorizontal:6,justifyContent: 'space-between',alignItems: 'center'}}>
        <Text numberOfLines={5}
        style={{fontSize: FontSize(14),color:'#121212',fontFamily: "Montserrat-SemiBold"}}>
                  {list.title}</Text>
        {/*<View style={{width:'100%',flexDirection:'row',justifyContent: 'flex-start',alignItems: 'center'}}>
                <TouchableOpacity onPress={remqty}
      style={{borderRadius: 20,flexDirection:'row',
          justifyContent: 'center',alignItems: 'center',paddingHorizontal:4,paddingVertical:4}}>
      <MaterialCommunityIcons name="minus-circle" size={24} color="black" />
      </TouchableOpacity>
                <TouchableOpacity onPress={addqty}
      style={{borderRadius: 20,flexDirection:'row',
          justifyContent: 'center',alignItems: 'center',paddingHorizontal:4,paddingVertical:4}}>
      <MaterialCommunityIcons name="plus-circle" size={24} color="black" />
      </TouchableOpacity></View>*/}
      <View style={{flexDirection:'row-reverse',width:'100%',justifyContent: 'flex-end' }}>
                <TouchableOpacity onPress={()=>removeItem(list)}
      style={{borderRadius: 20,flexDirection:'row',
          justifyContent: 'flex-end',alignItems: 'center',paddingHorizontal:4,paddingVertical:4,width:'100%'}}>
      <Text style={{fontSize: FontSize(14),color:'#f37121',paddingBottom:2,fontFamily: "Montserrat-Medium"}}>Remove</Text>
      </TouchableOpacity>
      
                </View></View>

        <View style={{width:'15%',paddingHorizontal:6,justifyContent: 'center',alignItems: 'center'}}>
        <TouchableOpacity onPress={()=>remqty(list)}
      style={{borderRadius: 20,flexDirection:'row',
          justifyContent: 'center',alignItems: 'center',paddingHorizontal:4,paddingVertical:4}}>
      <MaterialCommunityIcons name="minus-circle" size={20} color="#5A429B" />
      </TouchableOpacity>
      <Text style={{fontSize: FontSize(14),color:'#5A429B',flexWrap: 'wrap',
        fontFamily: "Montserrat-Medium"}}>
                {list.quantity}</Text>
      <TouchableOpacity onPress={()=>addqty(list)}
      style={{borderRadius: 20,flexDirection:'row',
          justifyContent: 'center',alignItems: 'center',paddingHorizontal:4,paddingVertical:4}}>
      <MaterialCommunityIcons name="plus-circle" size={20} color="#5A429B" />
      </TouchableOpacity>
                </View>
        <View style={{width:'15%',paddingHorizontal:6,justifyContent: 'center',alignItems: 'center'}}>
        <Text style={{ color: '#5A429B', fontSize: FontSize(13),textAlign:'center'}}>
        {list.currency} <Text style={{ fontWeight: 'bold'}}>{list.sellingPrice}</Text></Text>
        <Text style={{ color: 'grey', fontSize: FontSize(11), textDecorationLine: 'line-through',textAlign:'center'}}>
        {list.currency} {list.originalPrice}</Text>
        </View>
        </View></View>
                )
  }
  
  const total=state.cart.map(i=>i.sellingPrice*i.quantity).reduce((a, b) => a+b, 0)
  const ototal=state.cart.map(i=>i.originalPrice*i.quantity).reduce((a, b) => a+b, 0)
  const acart=state.cart.map((o,i)=>{
  const product = o._id
  const currency=o.currency
  const type="product"
  const items=o.quantity
  const originalPrice=o.originalPrice
  const sellingPrice=o.sellingPrice
  const vendor=null
  return {
    product,
    currency,
  type,
  items,
  originalPrice,
  sellingPrice,
  vendor,
  }
});

  const checkOut=()=>{
    AsyncStorage.getItem('userExist')
            .then(res =>{
              try {
     var data = JSON.stringify({
  "product": {
  "user": JSON.parse(res),
  "transactionId": "TR1648301811161",
  "orderId": "OR1648301811161",
  "paidAmount": total,
  "totalItems": state.cart.length,
  "totalPrice": total,
  "totalDiscount": 0,
  "deliveryCharges": 0,
  "totalAmount": total,
  "shippingAddr": null,
  "appOrderId": "APOR1648301811161",
  "paymentStatus": true,
  "from": "bycart",
  "items": acart,
  "address": {
    "address": {},
      "name":name,
      "mobile":mobile,
      "postcode":code,
      "houseNo":houseNo,
      "locality":locality,
      "city":city,
      "state":cstate,
      "postalAddress":postalAddress,
      "userId":JSON.parse(res),
      "long": 0,
      "lat": 0
    }
  },
  "token": {
    "id": "tok_1LafzjIQlecXJ3PYF5gn9tZh",
    "object": "token",
    "card": {
      "id": "card_1LafzjIQlecXJ3PYul7fwOZz",
      "object": "card",
      "address_city": null,
      "address_country": null,
      "address_line1": null,
      "address_line1_check": null,
      "address_line2": null,
      "address_state": null,
      "address_zip": null,
      "address_zip_check": null,
      "brand": "Visa",
      "country": "US",
      "cvc_check": "unchecked",
      "dynamic_last4": null,
      "exp_month": 12,
      "exp_year": 2023,
      "funding": "credit",
      "last4": "4242",
      "name": "nitish1@yopmail.com",
      "tokenization_method": null
    },
    "client_ip": "106.211.27.82",
    "created": 1661433675,
    "email": "nitish1@yopmail.com",
    "livemode": false,
    "type": "card",
    "used": false
  }
});
     var config = {
  method: 'post',
  url: 'https://api.ictkart.com/api/buyproduct/add',
  headers: { 
    'Content-Type': 'application/json'
  },
  data : data
};
axios(config)
.then((response)=>{
  // console.log(res)

  Toast.show(response.data.message)
  if(response.data.status==200){
    getlist()
    setView('cart')
    navigation.navigate('Myordersscreen')
  }
})
.catch((error)=>{
  // console.log(error);
  Toast.show(error.response.data.message)
});
    }
    catch(error) {
                  //console.log('error2',error)
                }
            })
  }
  const addAddress=()=>{
    AsyncStorage.getItem('userExist')
            .then(res =>{
    var data = JSON.stringify({
  
  "name": name,
  "mobile":mobile,
  "temporaryMobile": "",
  "userId":JSON.parse(res),
  "type": "Point",
  "coordinates": [ 0,0],
  "houseNo":houseNo,
  "locality":locality,
  "city":city,
  "state":cstate,
  "postcode":code,
  "postalAddress":postalAddress,
  "country":"India",
  "long": 0,
  "lat": 0
});

var config = {
  method: 'post',
  url: 'https://api.ictkart.com/api/address/add',
  headers: { 
    'Content-Type': 'application/json'
  },
  data : data
};

axios(config)
.then((response)=>{
  if(response.data.status==200){
    Toast.show(response.data.message)}else{
      Toast.show(response.data.message)
    }
})
.catch((error)=>{
  Toast.show(error.response.data);
});
})
  }


  return (
    <SafeAreaView style={{flex:1}}>
    {/*<View style={{justifyContent:'center',alignItems:'flex-start',padding:height*0.02,backgroundColor: '#fdfdfd'}}>
        <Svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-arrow-left" width="32" height="32" viewBox="0 0 24 24" stroke-width="2" stroke="#5A429B" fill="none" stroke-linecap="round" stroke-linejoin="round">
      <Path stroke="none" d="M0 0h24v24H0z" fill="none"/>
      <Line x1="5" y1="12" x2="19" y2="12" />
      <Line x1="5" y1="12" x2="11" y2="18" />
      <Line x1="5" y1="12" x2="11" y2="6" />
    </Svg>
        </View>*/}
    <View style={{width: '100%',height:'92%', alignItems: 'center'}}>
    {view=='cart'&&<>{state.cart&&state.cart.length==0? <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
            <Text>You have no items in the cart </Text>
            </View>:
            <View style={{flex:1}}>
            <View style={{paddingHorizontal:height*0.02,paddingVertical:height*0.01}}>
            <Text style={{color:'#121212'}}>You have {state.cart.length} {state.cart.length>1? 'items':'item'} in the cart </Text></View>
            <View style={{paddingHorizontal:height*0.02,paddingBottom:height*0.01}}>
            <Text style={{color:'#121212',fontSize:FontSize(width*0.054),color: '#5A429B'}}>
            Sub Total : AED {total} </Text></View>
            <TouchableOpacity onPress={()=>setView('address')}
            style={{marginHorizontal:height*0.02,backgroundColor: '#5A429B',height:height*0.068,borderRadius:4,
            justifyContent:'center',alignItems:'center'}}>
            <Text style={{color:'#fdfdfd',fontSize:FontSize(width*0.04),fontWeight:'400'}}>
            Proceed to buy ( {state.cart.length} {state.cart.length>1? 'items':'item'} )</Text>
            </TouchableOpacity>
            <FlatList
                data={state.cart}
                KeyExtractor={(item,index) => index.toString()}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => renderList(item) }
                />
            </View>}</>}
    {view=='address'&&<>
    <View style={{paddingHorizontal:height*0.02,height:'7%',flexDirection:'row'}}>
    <TouchableOpacity onPress={()=>setView('cart')}
    style={{ width:'10%',height:'100%', alignItems: 'center',justifyContent:'center' }}>
    <Svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-arrow-left"
                  width="28" height="28" viewBox="0 0 24 24" stroke-width="1.5" stroke="#5A429B"
                  fill="none" stroke-linecap="round" stroke-linejoin="round">
  <Path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <Line x1="5" y1="12" x2="19" y2="12" />
  <Line x1="5" y1="12" x2="11" y2="18" />
  <Line x1="5" y1="12" x2="11" y2="6" />
</Svg>
    </TouchableOpacity>
    <View style={{ width:'80%',height:'100%', alignItems: 'center',justifyContent:'center'}}>
            <Text style={{color:'#121212',fontSize:FontSize(width*0.05),color: '#5A429B'}}>
    Shipping Address</Text></View>
    <View style={{ width:'10%',height:'100%', alignItems: 'center',flexDirection:'row' }}></View>
    </View>
    <View style={{paddingHorizontal:height*0.02, alignItems: 'center',flexDirection:'row',marginTop:8 }}>
    <TextInput style={{ color: DefaultColours.blue0,width:'100%',height:44,paddingLeft:12,
    fontSize: 14 ,borderBottomWidth:1,borderRadius:4}}
      value={name}
      placeholder={'Name'}
      placeholderTextColor={DefaultColours.blue0}
      onChangeText={text => setName(text)} />
    </View>
    <View style={{paddingHorizontal:height*0.02, alignItems: 'center',flexDirection:'row',marginTop:8 }}>
    <TextInput style={{ color: DefaultColours.blue0,width:'100%',height:44,paddingLeft:12,
    fontSize: 14 ,borderBottomWidth:1,borderRadius:4}}
      value={mobile}
      placeholder={'Mobile Number'}
      placeholderTextColor={DefaultColours.blue0}
      onChangeText={text => setMobile(text)}
      keyboardType={'numeric'}
       />
    </View>
    <View style={{paddingHorizontal:height*0.02, alignItems: 'center',flexDirection:'row' }}>
    <View style={{ width:'50%', alignItems: 'center',flexDirection:'row',marginTop:8 }}>
    <TextInput style={{ color: DefaultColours.blue0,width:'100%',height:44,paddingLeft:12,
    fontSize: 14 ,borderBottomWidth:1,borderRadius:4}}
      value={houseNo}
      placeholder={'House Number'}
      placeholderTextColor={DefaultColours.blue0}
      keyboardType={'numeric'}
      onChangeText={text => setHouseNo(text)} />
    </View>
    <View style={{ width:'50%', alignItems: 'center',flexDirection:'row',marginTop:8 }}>
    <TextInput style={{ color: DefaultColours.blue0,width:'100%',height:44,paddingLeft:12,
    fontSize: 14 ,borderBottomWidth:1,borderRadius:4}}
      value={code}
      placeholder={'Postal Code'}
      placeholderTextColor={DefaultColours.blue0}
      keyboardType={'numeric'}
      onChangeText={text => setCode(text)} />
    </View></View>
    <View style={{paddingHorizontal:height*0.02, alignItems: 'center',flexDirection:'row',marginTop:8 }}>
    <TextInput style={{ color: DefaultColours.blue0,width:'100%',height:44,paddingLeft:12,
    fontSize: 14 ,borderBottomWidth:1,borderRadius:4}}
      value={postalAddress}
      placeholder={'Address (Area and Street)'}
      placeholderTextColor={DefaultColours.blue0}
      onChangeText={text => setPostalAddress(text)}
      />
    </View>
    <View style={{paddingHorizontal:height*0.02, alignItems: 'center',flexDirection:'row',marginTop:8 }}>
    <TextInput style={{ color: DefaultColours.blue0,width:'100%',height:44,paddingLeft:12,
    fontSize: 14 ,borderBottomWidth:1,borderRadius:4}}
      value={locality}
      placeholder={'Locality'}
      placeholderTextColor={DefaultColours.blue0}
      onChangeText={text => setLocality(text)} />
    </View>
    <View style={{paddingHorizontal:height*0.02, alignItems: 'center',flexDirection:'row',marginTop:8 }}>
    <TextInput style={{ color: DefaultColours.blue0,width:'100%',height:44,paddingLeft:12,
    fontSize: 14 ,borderBottomWidth:1,borderRadius:4}}
      value={city}
      placeholder={'City/District/Town'}
      placeholderTextColor={DefaultColours.blue0}
      onChangeText={text => setCity(text)} />
    </View>
    <View style={{paddingHorizontal:height*0.02, alignItems: 'center',flexDirection:'row',marginTop:8 }}>
    <TextInput style={{ color: DefaultColours.blue0,width:'100%',height:44,paddingLeft:12,
    fontSize: 14 ,borderBottomWidth:1,borderRadius:4}}
      value={cstate}
      placeholder={'State'}
      placeholderTextColor={DefaultColours.blue0}
      onChangeText={text => setcState(text)} />
    </View>
    <TouchableOpacity onPress={()=>addAddress()} style={{backgroundColor: '#5A429B',
    height:height*0.068,borderRadius:4,justifyContent:'center',width: '100%',
      alignItems:'center',paddingHorizontal: '6%',marginTop:'4%'}}>
            <Text style={{color:'#fdfdfd',fontSize:FontSize(width*0.04),fontWeight:'400'}}>
            Save and Deliver here</Text>
            </TouchableOpacity>
    <TouchableOpacity onPress={()=>{setView('summary');initializePaymentSheet();}} style={{backgroundColor: '#5A429B',
    height:height*0.068,borderRadius:4,justifyContent:'center',width: '100%',
      alignItems:'center',paddingHorizontal: '6%',marginTop:'2%'}}>
            <Text style={{color:'#fdfdfd',fontSize:FontSize(width*0.04),fontWeight:'400'}}>
            Continue</Text>
            </TouchableOpacity>
    </>}
    {view=='summary'&&<>
    <View style={{marginHorizontal:height*0.02,height:'7%',flexDirection:'row'}}>
    <TouchableOpacity onPress={()=>setView('address')}
    style={{ width:'10%',height:'100%', alignItems: 'center',justifyContent:'center' }}>
    <Svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-arrow-left"
                  width="28" height="28" viewBox="0 0 24 24" stroke-width="1.5" stroke="#5A429B"
                  fill="none" stroke-linecap="round" stroke-linejoin="round">
  <Path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <Line x1="5" y1="12" x2="19" y2="12" />
  <Line x1="5" y1="12" x2="11" y2="18" />
  <Line x1="5" y1="12" x2="11" y2="6" />
</Svg>
    </TouchableOpacity>
    <View style={{ width:'80%',height:'100%', alignItems: 'center',justifyContent:'center'}}>
            <Text style={{fontSize:FontSize(width*0.05),color: '#5A429B'}}>
    Order Summary</Text></View>
    <View style={{ width:'10%',height:'100%', alignItems: 'center',flexDirection:'row' }}></View>
    </View>
    <View style={{width:'100%',height:'84%'}}>
    <View style={{width:'100%',height:'60%'}}>
    <FlatList
                data={state.cart}
                KeyExtractor={(item,index) => index.toString()}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => renderList(item) }
                />
    </View>
    <View style={{width:'100%',height:'40%',paddingHorizontal:height*0.03,backgroundColor: '#fdfdfd',
    paddingTop:'2%'}}>
    <View style={{ width:'100%', alignItems: 'center',flexDirection:'row',marginBottom: '1%' }}>
    <View style={{width:'50%'}}>
    <Text style={{color:'#121212',fontSize:FontSize(width*0.038)}}>
    Original Price</Text>
    </View>
    <View style={{width:'50%'}}>
    <Text style={{color:'#121212',fontSize:FontSize(width*0.038),textAlign:'right'}}>
    AED {ototal}</Text>
    </View>
    </View>
    <View style={{ width:'100%', alignItems: 'center',flexDirection:'row',marginBottom: '1%' }}>
    <View style={{width:'50%'}}>
    <Text style={{color:'#121212',fontSize:FontSize(width*0.038)}}>
    Savings</Text>
    </View>
    <View style={{width:'50%'}}>
    <Text style={{color:'#121212',fontSize:FontSize(width*0.038),textAlign:'right'}}>
    - AED {ototal-total}</Text>
    </View>
    </View>
    <View style={{ width:'100%', alignItems: 'center',flexDirection:'row',marginBottom: '2%',
    borderBottomWidth:1,paddingBottom: '2%' }}>
    <View style={{width:'50%'}}>
    <Text style={{color:'#121212',fontSize:FontSize(width*0.038)}}>
    Store Pick-Up</Text>
    </View>
    <View style={{width:'50%'}}>
    <Text style={{color:'#121212',fontSize:FontSize(width*0.038),textAlign:'right'}}>
    FREE</Text>
    </View>
    </View>
    <View style={{ width:'100%', alignItems: 'center',flexDirection:'row',marginBottom: '1%' }}>
    <View style={{width:'50%'}}>
    <Text style={{color:'#121212',fontSize:FontSize(width*0.038),fontWeight:'bold'}}>
    Total</Text>
    </View>
    <View style={{width:'50%'}}>
    <Text style={{color:'#121212',fontSize:FontSize(width*0.038),textAlign:'right',fontWeight:'bold'}}>
    AED {total}</Text>
    </View>
    </View>
    </View>
    </View>
    {loading?<TouchableOpacity onPress={()=>openPaymentSheet()} style={{backgroundColor: '#5A429B',
        height:'7%',borderRadius:4,justifyContent:'center',alignItems:'center',marginTop:'1%',
        width:'100%'}}>
                <Text style={{color:'#fdfdfd',fontSize:FontSize(width*0.036),fontWeight:'400'}}>
                Make Payment ( AED {total} )</Text>
                </TouchableOpacity>:
            <TouchableOpacity style={{backgroundColor: '#999',
        height:'7%',borderRadius:4,justifyContent:'center',alignItems:'center',marginTop:'1%',
        width:'100%'}}>
                <Text style={{color:'#fdfdfd',fontSize:FontSize(width*0.036),fontWeight:'400'}}>
                Make Payment ( AED {total} )</Text>
                </TouchableOpacity>}
    </>}

          </View>
          <View style={{ width:'100%',height:'8%', alignItems: 'center',flexDirection:'row' }}>
            <TouchableOpacity onPress={()=>navigation.navigate('HomeScreen')}
            style={{ width:'25%',height:'100%', alignItems: 'center',justifyContent:'center' }}>
            {route.name=='HomeScreen'? <Image source={HomeActiveImg} style={styles.icon} resizeMode="contain"
            />:<Image source={HomeInactiveImg} style={styles.icon} resizeMode="contain"/>}
            <Text style={{color: 'grey' ,fontSize :FontSize(10),paddingTop:2 }}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>navigation.navigate('SettingScreen')}
            style={{ width:'25%',height:'100%', alignItems: 'center',justifyContent:'center' }}>
            {route.name=='SettingScreen'? <Image source={AccountActiveImg} style={styles.icon} 
            resizeMode="contain" />:<Image source={AccountInactiveImg} style={styles.icon} 
            resizeMode="contain" />}
            <Text style={{color: 'grey' ,fontSize :FontSize(10),paddingTop:2 }}>Account</Text></TouchableOpacity>
            <TouchableOpacity onPress={()=>navigation.navigate('CartScreen')}
            style={{ width:'25%',height:'100%', alignItems: 'center',justifyContent:'center' }}>
            {route.name=='CartScreen'? <Image source={CartActiveImg} style={styles.icon} resizeMode="contain" />:
                    <Image source={CartInactiveImg} style={styles.icon} resizeMode="contain" />}
            {state.cart&&state.cart.length==0? null:<View style={{position:'absolute',borderRadius:20,
            backgroundColor:DefaultColours.blue0,paddingHorizontal:5,top:2,right:'30%',paddingVertical:2}}>
            <Text style={{color:'#fff',fontSize:FontSize(7)}}>{state.cart&&state.cart.length}</Text></View>}
            <Text style={{color: 'grey' ,fontSize :FontSize(10),paddingTop:2 }}>Cart</Text></TouchableOpacity>
            <TouchableOpacity onPress={()=>navigation.navigate('ChatScreen')}
            style={{ width:'25%',height:'100%', alignItems: 'center',justifyContent:'center' }}>
            {route.name=='ChatScreen'? <Image source={ChatActiveImg} style={styles.icon} resizeMode="contain" />:
                    <Image source={ChatInavtiveImg} style={styles.icon} resizeMode="contain" />}
            <Text style={{color: 'grey' ,fontSize :FontSize(10),paddingTop:2 }}>Chat</Text></TouchableOpacity>
            </View>
    </SafeAreaView>
  );
};

export default CartScreen;
const styles = StyleSheet.create({
  icon: {
    width: 23,
    height: 22,
  },
});