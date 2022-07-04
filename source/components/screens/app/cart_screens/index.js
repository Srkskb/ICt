import React, {useState, useEffect} from 'react';
import {View, Text,FlatList,Dimensions,TouchableOpacity,Image} from 'react-native';
import {DefaultColours} from '@constants';
import {Loader} from '@global_components';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Svg, {Path,Circle,Line} from 'react-native-svg';
let {height, width} = Dimensions.get('window');
import Toast from 'react-native-simple-toast';

const CartScreen = ({navigation}) => {
  const [state, setState] = useState({loader: true,cart:[]});
  const [id, setID] = useState('');

const getlist = () => {
  AsyncStorage.getItem('userExist')
            .then(res =>{
                try {
                 var data = JSON.stringify({
              "userId": JSON.parse(res)
            });
            
            var config = {
              method: 'post',
              url: 'http://3.16.105.232:8181/api/user/cart',
              headers: { 
                'Content-Type': 'application/json'
              },
              data : data
            };
            
            axios(config)
            .then(function (response) {
              // console.log(response.data.data.list)
              if(JSON.stringify(response.data.status)==200){
                setState(prev => ({...prev, cart:response.data.data.list}))
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
    setTimeout(() => {
      setState(prev => ({...prev, loader: false}));
    getlist()
    }, 2000);
    navigation.addListener('focus', () => {
    getlist()
    });
  }, []);

  const renderList = list => {

    let count=list.quantity
    const removeItem=()=>{
AsyncStorage.getItem('userExist')
            .then(res =>{
                try {
     var data = JSON.stringify({
  "userId": JSON.parse(res),
  "product": list._id
});
var config = {
  method: 'post',
  url: 'http://3.16.105.232:8181/api/user/remove/cart',
  headers: { 
    'Content-Type': 'application/json'
  },
  data : data
};
axios(config)
.then((response)=>{
  //console.log(JSON.stringify(response.data))
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
const addqty=()=>{
  const config = {
      headers : {'Authorization':`Bearer ${this.state.user.access_token}`}
      };

  const data={
    id:list.id,
    quantity:list.quantity+1
  }
  axios.post(`https://ecom.theaaura.com/api/v1/carts/change-quantity`,data,config).then(response=> {
      this.getdata()
      ToastAndroid.show('Added quantity by 1', ToastAndroid.SHORT)
}).catch(error=> {
  alert('Cannot Update Product Quantity');
});
}
const remqty=()=>{
  const config = {
      headers : {'Authorization':`Bearer ${this.state.user.access_token}`}
      };

  const data={
    id:list.id,
    quantity:list.quantity-1
  }
  axios.post(`https://ecom.theaaura.com/api/v1/carts/change-quantity`,data,config).then(response=> {
      this.getdata()
      ToastAndroid.show('Decreased quantity by 1', ToastAndroid.SHORT)
}).catch(error=> {
  alert('Cannot Update Product Quantity');
});
}

    return(
      <View elevation={5} style={{width: Dimensions.get('window').width-24,backgroundColor: '#fdfdfd',padding:6,
      marginHorizontal:12,marginVertical:6,borderRadius: 6}}>
        
        <View style={{flexDirection:'row',width:'100%',padding:6}}>
        <View style={{width:'20%'}}><Image style={{height:100,borderRadius: 6}}
                source={{uri:list.thumbnail}} resizeMode={'contain'}
                /></View>
        <View style={{width:'50%',paddingHorizontal:6,justifyContent: 'flex-start',alignItems: 'center'}}>
        <Text numberOfLines={3}
        style={{fontSize: 20,color:'#121212',fontFamily: "Montserrat-SemiBold"}}>
                  {list.title}</Text>
        
                {/*<View style={{width:'100%',flexDirection:'row',justifyContent: 'flex-start',alignItems: 'center'}}>
                <TouchableOpacity onPress={remqty}
      style={{borderRadius: 20,flexDirection:'row',
          justifyContent: 'center',alignItems: 'center',paddingHorizontal:4,paddingVertical:4}}>
      
      </TouchableOpacity>
                <TouchableOpacity onPress={addqty}
      style={{borderRadius: 20,flexDirection:'row',
          justifyContent: 'center',alignItems: 'center',paddingHorizontal:4,paddingVertical:4}}>
      
      </TouchableOpacity></View>*/}
                <View style={{flexDirection:'row-reverse',width:'100%',justifyContent: 'flex-end' }}>
                <TouchableOpacity onPress={removeItem}
      style={{borderRadius: 20,flexDirection:'row',
          justifyContent: 'flex-end',alignItems: 'center',paddingHorizontal:4,paddingVertical:4,width:'100%'}}>
      <Text style={{fontSize: 16,color:'#f37121',paddingBottom:2,fontFamily: "Montserrat-Medium"}}>Remove</Text>
      </TouchableOpacity>
      
                </View></View>

        <View style={{width:'15%',paddingHorizontal:6,justifyContent: 'center',alignItems: 'center'}}>
        <Text style={{fontSize: 16,color:'#121212',flexWrap: 'wrap',fontFamily: "Montserrat-Medium"}}>
                {list.quantity}</Text>
                </View>
        <View style={{width:'15%',paddingHorizontal:6,justifyContent: 'center',alignItems: 'center'}}>
        <Text style={{ color: 'black', fontSize: 15,textAlign:'center'}}>
        {list.currency} <Text style={{ fontWeight: 'bold'}}>{list.sellingPrice}</Text></Text>
        <Text style={{ color: 'grey', fontSize: 13, textDecorationLine: 'line-through',textAlign:'center'}}>
        {list.currency} {list.originalPrice}</Text>
        </View>
        </View></View>
                )
  }
  
  const total=state.cart.map(i=>i.sellingPrice).reduce((a, b) => a+b, 0)
  const acart=state.cart.map((o,i)=>{
  const product = o._id
  const currency=o.currency
  const type="product"
  const items=o.quantity
  const originalPrice=o.originalPrice
  const sellingPrice=o.sellingPrice
  // const vendor=o.seller.id? o.seller.id:null
  return {
    product,
    currency,
  type,
  items,
  originalPrice,
  sellingPrice,
  // vendor,
  }
});

  const checkOut=()=>{
    AsyncStorage.getItem('userExist')
            .then(res =>{
              try {
     var data = JSON.stringify({
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
    "address": {}
  }
});
     var config = {
  method: 'post',
  url: 'http://3.16.105.232:8181/api/buyproduct/add',
  headers: { 
    'Content-Type': 'application/json'
  },
  data : data
};

axios(config)
.then((response)=>{
  //console.log(JSON.stringify(response.data));
  Toast.show(response.data.message)
  if(response.data.status==200){
    getlist()
  }
})
.catch((error)=>{
  //console.log(error.response.data);
  Toast.show(error.response.data.message)
});
    }
    catch(error) {
                  //console.log('error2',error)
                }
            })
  }


  return (
    <>
    {/*<View style={{justifyContent:'center',alignItems:'flex-start',padding:height*0.02,backgroundColor: '#fdfdfd'}}>
        <Svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-arrow-left" width="32" height="32" viewBox="0 0 24 24" stroke-width="2" stroke="#5A429B" fill="none" stroke-linecap="round" stroke-linejoin="round">
      <Path stroke="none" d="M0 0h24v24H0z" fill="none"/>
      <Line x1="5" y1="12" x2="19" y2="12" />
      <Line x1="5" y1="12" x2="11" y2="18" />
      <Line x1="5" y1="12" x2="11" y2="6" />
    </Svg>
        </View>*/}
    {state.cart&&state.cart.length==0? <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        <Text>You have no items in the cart </Text>
        </View>:
        <View style={{flex:1}}>
        <View style={{paddingHorizontal:height*0.02,paddingVertical:height*0.01}}>
        <Text style={{color:'#121212'}}>You have {state.cart.length} {state.cart.length>1? 'items':'item'} in the cart </Text></View>
        <View style={{paddingHorizontal:height*0.02,paddingVertical:height*0.01}}>
        <Text style={{color:'#121212',fontSize:width*0.054,color: '#5A429B'}}>
        Sub Total : INR {total} </Text></View>
        <TouchableOpacity onPress={checkOut}
        style={{backgroundColor: '#5A429B',height:height*0.068,
        marginHorizontal:height*0.02,borderRadius:4,justifyContent:'center',alignItems:'center'}}>
        <Text style={{color:'#fdfdfd',fontSize:width*0.04,fontWeight:'400'}}>
        Proceed to buy ( {state.cart.length} {state.cart.length>1? 'items':'item'} )</Text>
        </TouchableOpacity>
        <FlatList
            data={state.cart}
            KeyExtractor={(item,index) => index.toString()}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => renderList(item) }
            />
        </View>}
    </>
  );
};

export default CartScreen;
