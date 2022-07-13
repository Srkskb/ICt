import React, {useState, useEffect} from 'react';
import {View, Text,TouchableOpacity, Image, TextInput, FlatList, ScrollView,
  StyleSheet,KeyboardAvoidingView,Dimensions} from 'react-native';
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
const { width, height } = Dimensions.get("window");

const ProductDetailScreen = ({ navigation,route }) => {
  const [state, setState] = useState({loader: true, modalVisible: false,search:false,cart:[]});
  const addcart = () => {
    AsyncStorage.getItem('userExist')
            .then(res =>{
     var data = JSON.stringify({
  "userId": JSON.parse(res),
  "carts": {
    "product":route.params.data._id, units: 1
  }
});
var config = {
  method: 'post',
  url: 'http://3.16.105.232:8181/api/user/add/incart',
  headers: { 
    'Content-Type': 'application/json'
  },
  data : data
};
axios(config)
.then((response)=>{
  // console.log(JSON.stringify(response.data))
  Toast.show(response.data.message)
})
.catch((error)=>{
  //console.log(error);
});
    }
  )}
const addtocart = () => {
    AsyncStorage.getItem('userExist')
            .then(res =>{
     var data = JSON.stringify({
  "userId": JSON.parse(res),
  "carts": {
    "product": route.params.data._id, units: 1
  }
});
var config = {
  method: 'post',
  url: 'http://3.16.105.232:8181/api/user/add/incart',
  headers: { 
    'Content-Type': 'application/json'
  },
  data : data
};
axios(config)
.then((response)=>{
  // console.log(JSON.stringify(response.data))
  Toast.show(response.data.message)
  navigation.navigate('AppTab', { screen: 'CartScreen' })
})
.catch((error)=>{
  //console.log(error);
});
    })
}
const [data, setData] = React.useState([])
  const getProductInfo=()=>{
      AsyncStorage.getItem('userExist')
            .then(res =>{
              axios.get(`http://3.16.105.232:8181/api/product/detail?productId=${route.params.data._id}&userId=${JSON.parse(res)}`)
      .then(response => {
      // console.log(response.data.data.product)
          setData(response.data.data.product)

      })
    .catch(err => {
        //console.log('error',err)
      });
            })
  }
  useEffect(() => {
    getProductInfo()
    getCart()
  }, [])
  const getCart = () => {
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
  return (
    <SafeAreaView style={{width:width,height:'100%',backgroundColor:"#FFF"}}>
<ScrollView showsVerticalScrollIndicator={false} style={{ width: width, height: '94%' }}>
<TouchableOpacity onPress={()=>navigation.goBack()}
style={{flexDirection:'row',justifyContent:'flex-start',alignItems:'center',
paddingVertical:6,paddingHorizontal:12}}>
<Svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-arrow-left" width="36" height="36" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ED4E94" fill="none" stroke-linecap="round" stroke-linejoin="round">
  <Path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <Line x1="5" y1="12" x2="19" y2="12" />
  <Line x1="5" y1="12" x2="11" y2="18" />
  <Line x1="5" y1="12" x2="11" y2="6" />
</Svg>
</TouchableOpacity>
<View style={{justifyContent:"center",alignItems:'center',borderBottomWidth:1,borderBottomColor:"#DCDCDC"}}>
    <Image
    source={{uri:route.params.data.thumbnail}}
    resizeMode="contain"
    style={{height:height*0.4,width:width*1,backgroundColor:"#DCDCDC"}}
    />
<View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',position: 'absolute'
,top:12,right:12 }}>
<View style={{justifyContent:'center',alignItems:'center',backgroundColor: '#fff',padding:6,
borderRadius:30}}>
<MaterialCommunityIcons name='cards-heart' size={20} color={"#999"}/>
</View>
<View style={{justifyContent:'center',alignItems:'center',backgroundColor: '#fff',padding:6,
borderRadius:30,marginLeft:6}}>
<MaterialCommunityIcons name='share-variant' size={20} color={"#999"}/>
</View>
</View>
</View>
<View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
<View style={{paddingTop:width*0.03,paddingHorizontal:width*0.03,width:"70%"}}>
<Text numberOfLines={3} style={{fontSize:width*0.04,fontWeight:'bold'}}>
   {data.title}
</Text>
</View>
<View style={{width:"30%",justifyContent:'center',alignItems:'center'}}>
    <TouchableOpacity style={{width:"100%",borderWidth:1,borderTopLeftRadius:50,borderBottomLeftRadius:50,
      padding:width*0.02,backgroundColor:"#1776BB",borderColor:'#1776BB',
      justifyContent:'center',alignItems:'center'}}>
<Text style={{fontWeight:'bold',color:"#fff",fontSize:width*0.04}}>
    {data.currency} {data.sellingPrice}
</Text>
<Text style={{fontWeight:'bold',color:"#fff",fontSize:width*0.026,
textDecorationLine:'line-through',paddingTop:4}}>
    {data.currency} {data.originalPrice}
</Text>
</TouchableOpacity>
</View>

</View>
<View style={{flexDirection:'row',justifyContent:'flex-start',alignItems:'center'}}>
    <View style={{paddingTop:width*0.06,paddingHorizontal:width*0.03}}>
    <Image
    source={require('../../../assets/images/images/fire.png')}
    resizeMode="contain"
    style={{backgroundColor:"#fff",height:height*0.04,width:width*0.09}}
    />

    </View>
    <View style={{alignItems:'center',justifyContent:'center',paddingTop:width*0.09}}>
        <Text style={{fontSize:width*0.048,fontWeight:'bold',color:'#ED4E94'}}>
            Hot Offer
        </Text>
    </View>
</View>
<View style={{paddingTop:width*0.02,paddingHorizontal:width*0.03}}>
    <Text style={{color:"#ABA0D9",fontSize:width*0.036}}>
15-Month Microsoft 365 offer with device
    </Text>
</View>
<View style={{paddingTop:width*0.02}}>
<View style={{borderTopWidth:1,borderBottomWidth:1,backgroundColor:'#DCDCDC',borderBottomColor:'#DCDCDC',borderTopColor:'#DCDCDC',paddingHorizontal:width*0.03,paddingTop:width*0.03,paddingBottom:width*0.03}}>
<Text style={{fontSize:width*0.05,fontWeight:'bold'}}>
    Get it in 13 days
</Text>
<View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
    <View style={{width:"20%",paddingHorizontal:width*0.03,paddingTop:width*0.03}}>
<MaterialCommunityIcons
name='file-document-outline' size={width*0.1} color={"#1776BB"}
/>
    </View>
    <View style={{width:"80%",justifyContent:'flex-start',alignItems:'flex-start'}}>
        <View style={{flexDirection:'row'}}>
        <Text style={{fontSize:width*0.04,fontWeight:'bold'}}>
            Pickup:
        </Text >
        <View style={{}}>
        <Text style={{fontSize:width*0.04}}>
            order now for pickup on Mon,Nov at Area
        </Text>
        </View>
  
</View>
<TouchableOpacity onPress={()=>alert("Check your locations")}>
<View style={{paddingTop:width*0.01}}>
<Text style={{color:"#1776BB",fontSize:width*0.04}}>
    See all pickup locations
</Text>
        </View>
        </TouchableOpacity>
    </View>
</View>
<View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
    <View style={{width:"20%",paddingHorizontal:width*0.03,paddingTop:width*0.03}}>
<FontAwesome5
name='shipping-fast' size={width*0.1} color={"#1776BB"}
/>
    </View>
    <View style={{width:"80%",justifyContent:'flex-start',alignItems:'flex-start'}}>
        <View style={{flexDirection:'row'}}>
        <Text style={{fontSize:width*0.04,fontWeight:'bold'}}>
            shipping :
        </Text >
        <View style={{paddingHorizontal:width*0.01}}>
        <Text style={{fontSize:width*0.04}}>
            Unavailable in your Area
        </Text>
        </View>
  
</View>
<TouchableOpacity onPress={()=>alert("Check your locations")}>
<View style={{paddingTop:width*0.01}}>
<Text style={{fontSize:width*0.04}}>
    this item is only available in market
</Text>
        </View>
        </TouchableOpacity>
    </View>
</View>
</View>

</View>
<View style={{justifyContent: "flex-start", alignItems: "flex-start", paddingTop: width * 0.09, paddingHorizontal: width * 0.03 }}>
<View style={{width:"100%",backgroundColor:"#FFFFFF"}}>
<Text style={{ fontSize: width * 0.06,color: "#121212", fontFamily: "Aileron-Bold" }}>
Description</Text></View>
<View style={{width:"100%",borderBottomWidth:1,borderBottomColor:"#DCDCDC",paddingTop:width*0.01}}/>
<View style={{width:"100%",backgroundColor:"#FFFFFF",paddingVertical:6}}>
<Text style={{ fontSize: width * 0.046, color: "#666", fontFamily: "Aileron-Medium" }}>
{data&&data.description}</Text>
</View>
</View>
<View style={{borderBottomWidth:1,borderBottomColor:"#DCDCDC",
marginHorizontal:width*0.03,paddingTop:width*0.01}}/>
<View style={{justifyContent: "flex-start", alignItems: "flex-start", paddingTop: width * 0.03, paddingHorizontal: width * 0.03 }}>
<View style={{width:"100%",backgroundColor:"#FFFFFF"}}>
<Text style={{ fontSize: width * 0.06,color: "#121212", fontFamily: "Aileron-Bold" }}>Specifications
</Text></View>
<View style={{width:"100%",borderBottomWidth:1,borderBottomColor:"#DCDCDC",paddingTop:width*0.01}}/>
<View style={{width:"100%",backgroundColor:"#FFFFFF",paddingVertical:6}}>
<Text style={{ fontSize: width * 0.05,color: "#121212", fontFamily: "Aileron-Bold" }}>
Product Name</Text></View>
<View style={{width:"100%",backgroundColor:"#FFFFFF",paddingVertical:4}}>
<Text style={{ fontSize: width * 0.046, color: "#666", fontFamily: "Aileron-Medium" }}>
{data.title}</Text>
</View>
<View style={{width:"100%",backgroundColor:"#FFFFFF",paddingVertical:6}}>
<Text style={{ fontSize: width * 0.05,color: "#121212", fontFamily: "Aileron-Bold" }}>
Category</Text></View>
<View style={{width:"100%",backgroundColor:"#FFFFFF",paddingVertical:4}}>
<Text style={{ fontSize: width * 0.046, color: "#666", fontFamily: "Aileron-Medium" }}>
{data.categoryData}</Text>
</View>
<View style={{width:"100%",backgroundColor:"#FFFFFF",paddingVertical:6}}>
<Text style={{ fontSize: width * 0.05,color: "#121212", fontFamily: "Aileron-Bold" }}>
Brand</Text></View>
<View style={{width:"100%",backgroundColor:"#FFFFFF",paddingVertical:4}}>
<Text style={{ fontSize: width * 0.046, color: "#666", fontFamily: "Aileron-Medium" }}>
{data.brandData}</Text>
</View>
<View style={{width:"100%",backgroundColor:"#FFFFFF",paddingVertical:6}}>
<Text style={{ fontSize: width * 0.05,color: "#121212", fontFamily: "Aileron-Bold" }}>
Modal Number</Text></View>
<View style={{width:"100%",backgroundColor:"#FFFFFF",paddingVertical:4}}>
<Text style={{ fontSize: width * 0.046, color: "#666", fontFamily: "Aileron-Medium" }}>
{data.modelNumber}</Text>
</View>
</View>
<View style={{borderBottomWidth:1,borderBottomColor:"#DCDCDC",
marginHorizontal:width*0.03,paddingTop:width*0.01}}/>
<View style={{justifyContent: "flex-start", alignItems: "flex-start", 
paddingTop: width * 0.03, paddingHorizontal: width * 0.03 }}>
          <View style={{width:"80%",backgroundColor:"#FFFFFF"}}>
          <Text style={{ fontSize: width * 0.06,color: "#121212",
          fontFamily: "Aileron-Bold" }}>
          About The Seller
          </Text>
</View>
<View style={{width:"100%",borderBottomWidth:1,borderBottomColor:"#DCDCDC",paddingTop:width*0.01}}/>

<View style={{width:"100%",backgroundColor:"#ffffff",paddingVertical:6}}>
<Text style={{ fontSize: width * 0.046, color: "#666", fontFamily: "Aileron-Medium" }}>
{data.vendor? data.vendor:'NA'}</Text>
</View>
</View>
<View style={{borderBottomWidth:1,borderBottomColor:"#DCDCDC",marginHorizontal:width*0.03,paddingTop:width*0.01}}>

</View>
{/*<View style={{ flexDirection: "row", justifyContent: "flex-start", alignItems: "flex-start", paddingTop: width * 0.05, paddingHorizontal: width * 0.03 }}>
          <View style={{width:"80%",backgroundColor:"#FFFFFF"}}>
          <Text style={{ fontSize: width * 0.05, fontWeight: 'bold', fontFamily: "Aileron-Medium" }}>
           Compare
          </Text>
</View>
<View style={{width:"20%",backgroundColor:"#ffffff"}}>
            <View style={{alignItems:'center',justifyContent:"center"}}>
              <TouchableOpacity>
              <MaterialCommunityIcons
name='chevron-down' size={width*0.09}
/>
</TouchableOpacity>
</View>
</View>
</View>
<View style={{borderBottomWidth:1,borderBottomColor:"#DCDCDC",marginHorizontal:width*0.03,paddingTop:width*0.01}}>

</View>
<View style={{ flexDirection: "row", justifyContent: "flex-start", alignItems: "flex-start", paddingTop: width * 0.05, paddingHorizontal: width * 0.03 }}>
          <View style={{width:"80%",backgroundColor:"#FFFFFF"}}>
          <Text style={{ fontSize: width * 0.05, fontWeight: 'bold', fontFamily: "Aileron-Medium" }}>
            FAQ
          </Text>
</View>
<View style={{width:"20%",backgroundColor:"#ffffff"}}>
            <View style={{alignItems:'center',justifyContent:"center"}}>
              <TouchableOpacity>
              <MaterialCommunityIcons
name='chevron-down' size={width*0.09}
/>
</TouchableOpacity>
</View>
</View>
</View>*/}
<View style={{borderBottomWidth:1,borderBottomColor:"#DCDCDC",marginHorizontal:width*0.01}}>

</View>
<View style={{ flexDirection: "row", justifyContent: "flex-start", alignItems: "flex-start", paddingTop: width * 0.05, paddingHorizontal: width * 0.03 }}>
          <View style={{width:"80%",backgroundColor:"#FFFFFF"}}>
          <Text style={{ fontSize: width * 0.06, fontWeight: 'bold', fontFamily: "Aileron-Medium" }}>
            Reviews
          </Text>
</View>
<View style={{width:"20%",backgroundColor:"#ffffff"}}>
            <View style={{alignItems:'center',justifyContent:"center"}}>
              <TouchableOpacity>
              <MaterialCommunityIcons
name='chevron-down' size={width*0.09}
/>
</TouchableOpacity>
</View>
</View>
</View>
<View style={{borderBottomWidth:1,borderBottomColor:"#DCDCDC",marginHorizontal:width*0.03,paddingTop:width*0.01}}>

</View>
</ScrollView>
<View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',
height: '6%',paddingHorizontal:12}}>
<View style={{width:"49%",borderRadius:5,borderWidth:1,flexDirection:'row',
alignItems:'center',backgroundColor:'#ED4E94',height:'100%',
justifyContent:'space-evenly',borderColor:"#ED4E94"}}>
<TouchableOpacity onPress={addcart}
style={{flexDirection:'row'}}>
<Text style={{fontSize:width*0.036,color:"#FFFFFF", fontFamily: "Aileron-Bold"}}>
ADD TO CART
</Text>
</TouchableOpacity>
       </View>
       <View style={{width:"49%",borderRadius:5,borderWidth:1,flexDirection:'row',
       alignItems:'center',backgroundColor:'#5A429B',height:'100%',
       justifyContent:'space-evenly',borderColor:'#5A429B'}}>
         <TouchableOpacity style={{flexDirection:'row'}} onPress={addtocart}>
<Text style={{fontSize:width*0.036,color:"#FFFFFF", fontFamily: "Aileron-Bold"}}>
PURCHASE
</Text>
</TouchableOpacity>
       </View>
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
  )
}

export default ProductDetailScreen

const styles = StyleSheet.create({})