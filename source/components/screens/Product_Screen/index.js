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


const ProductScreen = ({ navigation,route }) => {
  const [loading, setLoading] = useState(false)
  const [state, setState] = useState({loader: true, modalVisible: false,search:false,cart:[]});
  useEffect(() => {
    // console.log(route.params.data._id)
    getProducts()
    getCart()
  }, [])
  const [data, setData] = useState([])
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
              //alert(error);
            });
                }
                catch(error) {
                  //console.log('error2',error)
                }}
  )}
  const getProducts=()=>{
    setLoading(true)
     var data = JSON.stringify({
  "search": {
    "category": [route.params.data._id]
  }
});

var config = {
  method: 'post',
  url: 'https://api.ictkart.com/api/product/all/list',
  headers: { 
    'Content-Type': 'application/json'
  },
  data : data
};

axios(config)
.then(response=>{
      // console.log(response.data.data.list)
  setData(response.data.data.list)
  setLoading(false)
})
.catch(function (error) {
  alert(error);
});
    }
    const getProductsPop=()=>{
      setLoading(true)
     var data = JSON.stringify({
  "search": {
    "category": [route.params.data._id]
  },
  "sort": "popularity"
});

var config = {
  method: 'post',
  url: 'https://api.ictkart.com/api/product/all/list',
  headers: { 
    'Content-Type': 'application/json'
  },
  data : data
};

axios(config)
.then(response=>{
      // console.log(response.data.data.list)
  setData(response.data.data.list)
  setLoading(false)
})
.catch(function (error) {
  alert(error);
});
    }
    const getProductsHigh=(item)=>{
      setLoading(true)
     var data = JSON.stringify({
  "search": {
    "category": [route.params.data._id]
  },
  "sort": "popularity"
});

var config = {
  method: 'post',
  url: 'https://api.ictkart.com/api/product/all/list',
  headers: { 
    'Content-Type': 'application/json'
  },
  data : data
};
if(item=='high'){
  axios(config)
.then(response=>{
      // console.log(response.data.data.list)
      let data=response.data.data.list.sort((a,b)=>b.sellingPrice-a.sellingPrice)
  setData(data)
  setLoading(false)
})
.catch(function (error) {
  alert(error);
});
}
if(item=='low'){
  axios(config)
.then(response=>{
      // console.log(response.data.data.list)
      let data=response.data.data.list.sort((a,b)=>a.sellingPrice-b.sellingPrice)
  setData(data)
  setLoading(false)
})
.catch(function (error) {
  alert(error);
});
}
    }
  const renderItem_search = ({item, index}) => {
    ////console.log('item ',item,index)
    const addcart = (list) => {
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
  url: 'http://3.16.105.232:8181/api/user/add/incart',
  headers: { 
    'Content-Type': 'application/json'
  },
  data : data
};
axios(config)
.then((response)=>{
  //console.log(JSON.stringify(response.data))
  Toast.show(response.data.message)
})
.catch((error)=>{
  //alert(error);
});
    }
    catch(error) {
                  //console.log('error2',error)
                }}
  )}

    return (
      <TouchableOpacity key={item._id} onPress={()=>navigation.navigate('ProductDetailScreen', { data: item })}
      style={{ width: SCREEN_WIDTH * .44, minHeight: SCREEN_WIDTH * .4,
        borderRadius: 5, borderWidth: 1, borderColor: 'grey', padding: 4,marginRight:SCREEN_WIDTH * .02,
        marginBottom:SCREEN_WIDTH * .02 }}>
        <TouchableOpacity onPress={()=>addcart(item)}
        style={{ top: 8, right: 8, position: 'absolute', justifyContent: 'center', alignItems: 'center', width: 26, height: 26, borderRadius: 13, backgroundColor: DefaultColours.blue0 }}>
        <Svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-shopping-cart" width="20" height="20" viewBox="0 0 24 24" stroke-width="3" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
  <Path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <Circle cx="6" cy="19" r="2" />
  <Circle cx="17" cy="19" r="2" />
  <Path d="M17 17h-11v-14h-2" />
  <Path d="M6 5l14 1l-1 7h-13" />
</Svg>
        </TouchableOpacity>
            <View style={{ alignItems: 'center', padding: 10 }}>
            <Image source={{uri:item.thumbnail}} style={{ width: 100, height: 100}} />
            </View>
          <Text numberOfLines={3}
          style={{ color: DefaultColours.black, fontSize: 13, color: 'black', padding: 5, lineHeight: 18 }}>
          {item.title}</Text>
          <View style={{ flexDirection: 'row', padding: 5 ,justifyContent:'flex-end' , flex:1}}>
              <View style={{ flex: 1, justifyContent:'flex-end'}}>
                  <Text style={{ color: DefaultColours.black, fontSize: 15,  }}>
                  {item.currency} <Text style={{ fontWeight: 'bold'}}>{item.sellingPrice}</Text></Text>
                  <Text style={{ color: 'grey', fontSize: 13, textDecorationLine: 'line-through' }}>
                  {item.currency} {item.originalPrice}</Text>
              </View>
              <View style={{flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'center' }}>
                <Image source={require('@images/images/star.png')} style={{ width: 20, height: 20 }} />
                <Text style={{ color: DefaultColours.black, fontSize: 15,fontWeight:'bold' }}>
                {item.rating}</Text>
              </View>
          </View>
      </TouchableOpacity>
    )
  }
  const [searchText, setsearchText] = useState('');
  const [searchData, setSearchData] = useState([])
const searchItem=(item)=>{
  setsearchText(item)
    var result = data.filter((e) => e.title.toLowerCase().includes(item.toLowerCase()));
    setSearchData(result)
    // console.log(result)
  }
  const [settate, setSettate] = useState(false)
  return (
    <SafeAreaView style={{flex:1,width:width,height:'100%',backgroundColor:"#fff"}}>
    <View style={{width:'100%', height:'6%'}}>
<View style={{ position: 'absolute',top:0,flexDirection:'row',
width:'100%', height: '100%'}}>
<TouchableOpacity onPress={()=>navigation.goBack()}
style={{width:'10%',justifyContent:'center',alignItems:'center'}}>
<Svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-arrow-left" width="36" height="36" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ED4E94" fill="none" stroke-linecap="round" stroke-linejoin="round">
  <Path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <Line x1="5" y1="12" x2="19" y2="12" />
  <Line x1="5" y1="12" x2="11" y2="18" />
  <Line x1="5" y1="12" x2="11" y2="6" />
</Svg>
</TouchableOpacity>
<View style={{width:'90%',justifyContent:'center',alignItems:'center'}}>
<TextInput style={{ fontSize: 14, color: DefaultColours.blue0,width:'100%',
        borderLeftWidth: 1,height:44,paddingLeft:12 }}
      value={searchText}
      placeholder={'Search Products'}
      placeholderTextColor={DefaultColours.blue0}
      onChangeText={text => searchItem(text)} />
</View>
</View>
</View>
<View style={{width:'100%', height:'5%',paddingHorizontal:20,flexDirection:'row'}}>
<ScrollView horizontal showsHorizontalScrollIndicator={false}>
{settate&&<><TouchableOpacity onPress={()=>setSettate(false)}
style={{justifyContent:'center',alignItems:'center',paddingRight:6}}>
<MaterialCommunityIcons name="close-circle-outline" size={24} color="black" />
</TouchableOpacity>
<TouchableOpacity onPress={()=>getProductsPop()}
style={{justifyContent:'center',alignItems:'center',marginRight:6,borderWidth: 1,borderRadius:16,
paddingHorizontal:8}}>
<Text style={{fontSize:width*0.036,color:DefaultColours.blue0, fontFamily: "Aileron-SemiBold"}}>
Popularity
</Text>
</TouchableOpacity>
<TouchableOpacity onPress={()=>getProductsPop()}
style={{justifyContent:'center',alignItems:'center',marginRight:6,borderWidth: 1,borderRadius:16,
paddingHorizontal:8}}>
<Text style={{fontSize:width*0.036,color:DefaultColours.blue0, fontFamily: "Aileron-SemiBold"}}>
Newly added
</Text>
</TouchableOpacity>
<TouchableOpacity onPress={()=>getProductsHigh('high')}
style={{justifyContent:'center',alignItems:'center',marginRight:6,borderWidth: 1,borderRadius:16,
paddingHorizontal:8}}>
<Text style={{fontSize:width*0.036,color:DefaultColours.blue0, fontFamily: "Aileron-SemiBold"}}>
Price - High to Low
</Text>
</TouchableOpacity>
<TouchableOpacity onPress={()=>getProductsHigh('low')}
style={{justifyContent:'center',alignItems:'center',marginRight:6,borderWidth: 1,borderRadius:16,
paddingHorizontal:8}}>
<Text style={{fontSize:width*0.036,color:DefaultColours.blue0, fontFamily: "Aileron-SemiBold"}}>
Price - Low to High
</Text>
</TouchableOpacity></>}</ScrollView>
<View style={{width:'14%',justifyContent:'center',alignItems:'center',borderLeftWidth:1,
borderColor: DefaultColours.blue0}}>
<TouchableOpacity onPress={()=>setSettate(true)}
style={{justifyContent:'center',alignItems:'center'}}>
<Text style={{fontSize:width*0.036,color:DefaultColours.blue0, fontFamily: "Aileron-SemiBold"}}>
Sort
</Text>
</TouchableOpacity></View>
</View>
<View style={{width:'100%', height: '81%',justifyContent:"center",alignItems:'center',
borderBottomColor:"#DCDCDC"}}>
{loading? <Loader/>:<FlatList
            
            numColumns={2}
            contentContainerStyle={{paddingHorizontal:16,paddingVertical:4 }}
            data={searchData.length>0? searchData:data}
            renderItem={renderItem_search}
            keyExtractor={item => item._id}
            showsHorizontalScrollIndicator={false}
            style={{width:'100%'}}
          />}
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

export default ProductScreen

const styles = StyleSheet.create({
  icon: {
    width: 23,
    height: 22,
  },
});