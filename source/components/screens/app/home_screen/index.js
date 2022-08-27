import React, {useState, useEffect} from 'react';
import {View, Text,TouchableOpacity, Image, TextInput, FlatList, ScrollView,
  StyleSheet,KeyboardAvoidingView,StatusBar} from 'react-native';
import {SafeAreaProvider,SafeAreaView} from 'react-native-safe-area-context';

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

const HomeScreen = ({navigation,route}) => {
  const [state, setState] = useState({loader: true, modalVisible: false,search:false,cart:[]});
  const [searchText, setsearchText] = useState('');
  const [sliderData, setsliderData] = useState([])
  const [categoryData, setCategoryData] = useState([])

  const [trendingData, settrendingData] = useState([])
  const [searchData, setSearchData] = useState([])
  const [toppicksData, settoppicksData] = useState([])
  const [professionalservicesData, setprofessionalservicesData] = useState([
    { id: 1, image: '@images/images/sample1.png', badge: true, name: 'Denis Thompson', description: 'Computer Hardware Services', price1: '1150', price2: '1350', rating: '4.9' },
    { id: 2, image: '@images/images/sample2.png', badge: false, name: 'Craing William', description: 'Laptop Repair Services', price1: '650', price2: '750', rating: '4.9' },
    { id: 3, image: '@images/images/sample1.png', badge: true, name: 'John Dew', description: 'App Development', price1: '1150', price2: '1350', rating: '4.9' },
  ])

  useEffect(() => {
    // console.log(route)
    setTimeout(() => {
      setState(prev => ({...prev, loader: false}));
    }, 2000);
    getlist()
    getBanner()
    getCategories()
    getCart()
    getFeatured()
  }, []);

  const getlist = () => {
    try {
     axios.post('https://api.ictkart.com/api/product/all/list')
      .then(response => {
      //console.log('response list',response.data.data.list)
          settrendingData(response.data.data.list)

      })
    .catch(err => {
        //console.log('error',err)
      });
    }
    catch(error) {
      //console.log('error2',error)
    }
  }
  const getFeatured = () => {
    try {
     axios.post('https://api.ictkart.com/api/product/all/features-list')
      .then(response => {
      //console.log('response list',response.data.data.list)
          settoppicksData(response.data.data.list)

      })
    .catch(err => {
        //console.log('error',err)
      });
    }
    catch(error) {
      //console.log('error2',error)
    }
  }
  const getCart = () => {
    setState(prev => ({...prev, loader: true}));
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
            
            axios(config)
            .then(function (response) {
              // console.log(response.data.data.list)
              if(JSON.stringify(response.data.status)==200){
                setState(prev => ({...prev, cart:response.data.data.list, loader: false}))
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
const getBanner = () => {
    try {
     axios.get('https://api.ictkart.com/api/banner/list?displayAt=home&status=true')
      .then(response => {
      //console.log('response list',response.data.data.banners)
          setsliderData(response.data.data.banners)

      })
    .catch(err => {
        //console.log('error',err)
      });
    }
    catch(error) {
      //console.log('error2',error)
    }
  }
const getCategories = () => {
    try {
     axios.get('https://api.ictkart.com/api/categories/dropdown/list?type=product')
      .then(response => {
      //console.log(response.data.data.list)
      setCategoryData(response.data.data.list)

      })
    .catch(err => {
        //console.log('error',err)
      });
    }
    catch(error) {
      //console.log('error2',error)
    }
  }
  

  const renderItem_sider1 = ({item, index}) => {
    return (
      <View key={item._id}>
        <Image style={{height:180,width:SCREEN_WIDTH-24,borderRadius:6}} source={{uri:item.bannerImage}} />
        
      </View>
    )
  }



  {/*const renderItem_trending = ({item,index}) => {
    //console.log('item tranding ',item,index)
      return (
        <View key={item._id} style={{ width: SCREEN_WIDTH * .45, minHeight: SCREEN_WIDTH * .4, borderRadius: 5, borderWidth: 1, borderColor: 'grey', padding: 4 }}>
              <View style={{ alignItems: 'center', padding: 10 }}>
  
                <Image source={{uri:item.thumbnail}} style={{ width: 100, height: 100}} />
  
              </View>
            <Text style={{ color: DefaultColours.black, fontSize: 13, color: 'black', padding: 5, lineHeight: 18 }}>{item.title}</Text>
            <View style={{ flexDirection: 'row', padding: 5, justifyContent:'flex-end' , flex:1}}>
                <View style={{ flex: 1, justifyContent:'flex-end' ,}}>
                    <Text style={{ color: DefaultColours.black, fontSize: 15,  }}>AED <Text style={{ fontWeight: 'bold'}}>{item.sellingPrice}</Text></Text>
                    <Text style={{ color: 'grey', fontSize: 13, textDecorationLine: 'line-through' }}>AED {item.originalPrice}</Text>
                </View>
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'center' }}>
                  <Image source={require('@images/images/star.png')} style={{ width: 20, height: 20 }} />
                  <Text style={{ color: DefaultColours.black, fontSize: 15,  }}>4.9</Text>
                </View>
            </View>
        </View>
      )
  
    }*/}

  const renderItem_toppicks = ({item, index}) => {
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
  getCart()
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
      <View key={item._id}
      style={{ width: SCREEN_WIDTH * .45, minHeight: SCREEN_WIDTH * .4,
        borderRadius: 5, borderWidth: 1, borderColor: 'grey', padding: 4 }}>
        <TouchableOpacity onPress={()=>navigation.navigate('ProductDetailScreen', { data: item })}>
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
      </View>
    )
  }

  const renderItem_trending = ({item, index}) => {
    // console.log('item ',item,index)
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
  getCart()
})
.catch((error)=>{
  //console.log(error);
});
    }
    catch(error) {
                  //console.log('error2',error)
                }}
  )}

    return (
      <View key={item._id}
      style={{ width: SCREEN_WIDTH * .45, minHeight: SCREEN_WIDTH * .4,
        borderRadius: 5, borderWidth: 1, borderColor: 'grey', padding: 4 }}>
        <TouchableOpacity onPress={()=>navigation.navigate('ProductDetailScreen', { data: item })}>
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
      </View>
    )
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
  getCart()
})
.catch((error)=>{
  //console.log(error);
});
    }
    catch(error) {
                  //console.log('error2',error)
                }}
  )}

    return (
      <View key={item._id}
      style={{ width: SCREEN_WIDTH * .44, minHeight: SCREEN_WIDTH * .4,
        borderRadius: 5, borderWidth: 1, borderColor: 'grey', padding: 4,marginRight:SCREEN_WIDTH * .02,
        marginBottom:SCREEN_WIDTH * .02 }}>
      <TouchableOpacity onPress={()=>navigation.navigate('ProductDetailScreen', { data: item })}>
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
      </View>
    )
  }

  const renderItem_professionalservices = ({item, index}) => {
    ////console.log('item ',item,index)
    return (
      <View key={index} style={{ width: SCREEN_WIDTH * .45, minHeight: SCREEN_WIDTH * .4, borderRadius: 5, borderWidth: 1, borderColor: 'grey', padding: 4 }}>
            <View style={{ alignItems: 'center', padding: 10 }}>
            {(index % 2 == 0) ?
              <Image source={require('@images/images/s1.png')} style={{ borderRadius: 50, width: 100, height: 100}} />
              :
              <Image source={require('@images/images/s2.png')} style={{ borderRadius: 50, width: 100, height: 100}} />
            }
            </View>
          <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ color: DefaultColours.black, fontSize: 15, fontWeight: 'bold', color: 'black', padding: 5, lineHeight: 18, textAlign: 'center' }}>{item.name}</Text>
          {item.badge && (
            <Image source={require('@images/images/service_badge.png')} style={{ width: 20, height: 20 }} />
          )}
          </View>
          <Text style={{ color: DefaultColours.black, fontSize: 13, color: 'black', padding: 5, lineHeight: 18, textAlign: 'center' }}>{item.description}</Text>
          <View style={{ flexDirection: 'row', padding: 5 ,justifyContent:'flex-end' , flex:1}}>
              <View style={{ flex: 1, flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'flex-start' }}>
                <Image source={require('@images/images/pinkstar.png')} style={{ width: 20, height: 20 }} />
                <Text style={{  color: DefaultColours.black, fontSize: 15,  }}>{item.rating}</Text>
              </View>
              <View style={{ flex: 1, justifyContent:'flex-end'}}>
                  <Text style={{ color: 'grey', fontSize: 11 }}>STARTING AT</Text>
                  <Text style={{ color: DefaultColours.black, fontSize: 15,  }}>AED <Text style={{ fontWeight: 'bold'}}>{item.price1}</Text></Text>
              </View>
          </View>
      </View>
    )
  }



  const logout = async () =>{
      try {
          await AsyncStorage.removeItem('token');
          await AsyncStorage.removeItem('userExist');
          navigation.dispatch(
            StackActions.replace('Auth')
          );
          //return true;
      }
      catch(exception) {
          return false;
      }
  }

  const searchItem=(item)=>{
    var data = JSON.stringify({
      "search":item,
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
.then((response)=>{
    setSearchData(response.data.data.list)
})
.catch((error)=>{
  // console.log(error);
});
    // console.log(result)
  }

  return (
    <>
    <StatusBar/>
    <SafeAreaView style={{
            flex: 1,
            backgroundColor: DefaultColours.white
          }}>
    {state.loader? <Loader/>:<><ScrollView contentContainerStyle={{ width: SCREEN_WIDTH }}>
    
    
              {/* nav_bar */}
              <View style={{ flex: 1, flexDirection: 'row', width: SCREEN_WIDTH, height: 50,paddingHorizontal:12}}>
                  <TouchableOpacity onPress={()=> navigation.openDrawer()}
                  style={{alignItems:'center',justifyContent:'center',width:'10%'}}>
                  <Image
                    style={{width:30, height:30}}
                    resizeMode="contain"
                    source={DrawerImage}
                  />
                   </TouchableOpacity>
                  <TouchableOpacity onPress={()=>setState(prev => ({...prev, modalVisible: true}))}
                  style={{justifyContent: 'center', alignItems: 'center',width:'70%'  }} >
                  <Text style={{ color: DefaultColours.black }}>Click to reveal address modal</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={{width:'10%',alignItems: 'center', justifyContent: 'center' }}>
                    <View style={{ top: 4, right: 4, position: 'absolute', justifyContent: 'center', alignItems: 'center', width: 18, height: 18, borderRadius: 9, backgroundColor: DefaultColours.pink }}>
                      <Text style={{ color: DefaultColours.white, fontSize: 9 }}>10</Text>
                    </View>
                    <Svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-bell" width="30" height="30" viewBox="0 0 24 24" stroke-width="1.5" stroke="#9e9e9e" fill="none" stroke-linecap="round" stroke-linejoin="round">
      <Path stroke="none" d="M0 0h24v24H0z" fill="none"/>
      <Path d="M10 5a2 2 0 0 1 4 0a7 7 0 0 1 4 6v3a4 4 0 0 0 2 3h-16a4 4 0 0 0 2 -3v-3a7 7 0 0 1 4 -6" />
      <Path d="M9 17v1a3 3 0 0 0 6 0v-1" />
    </Svg>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={()=>setState(prev => ({...prev, search: true}))}
                  style={{width:'10%',alignItems: 'center', justifyContent: 'center' }}>
                  <Svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-search" width="32" height="32" viewBox="0 0 24 24" stroke-width="1.5" stroke="#9e9e9e" fill="none" stroke-linecap="round" stroke-linejoin="round">
      <Path stroke="none" d="M0 0h24v24H0z" fill="none"/>
      <Circle cx="10" cy="10" r="7" />
      <Line x1="21" y1="21" x2="15" y2="15" />
    </Svg></TouchableOpacity>
              </View>
              {/* nav_bar_ends */}
    
    
              {/* search_bar }
              <View  style={{ flex: 1, alignItems: 'center' }}>
              <View style={{  borderRadius: 4, borderColor: 'grey', borderWidth: 1, padding: 1, width: SCREEN_WIDTH * 0.92 , height: 48 }}>
              <TextInput style={{ fontSize: 13, color: DefaultColours.black }} value={state.searchText} onChangeText={text => setsearchText(text)} />
              </View>
              </View>
              { search_bar_end */}
    
    
              <FlatList
                horizontal
                ItemSeparatorComponent={
                  () => <View style={{ padding: 5 }}/>
                }
                contentContainerStyle={{  padding:10 }}
                data={sliderData}
                renderItem={renderItem_sider1}
                keyExtractor={item => item._id}
                showsHorizontalScrollIndicator={false}
                initialNumToRender={1}
              />
    
    
              <View style={{ flex: 1, flexDirection: 'row', width: SCREEN_WIDTH * 0.9, justifyContent: 'flex-start', alignItems: 'center', maxHeight: 40, paddingLeft: 12,marginTop:12 }}>
                <Image source={require('@images/images/fire.png')} style={{ width: 20, height: 30  }} />
                <Text style={{ paddingLeft: 10, color: DefaultColours.black , fontWeight: 'bold', fontSize : 17 }}>Trending</Text>
              </View>
    
              {/* trending */}
    
    
              <FlatList
                horizontal
                ItemSeparatorComponent={
                  () => <View style={{ padding: 5 }}/>
                }
                contentContainerStyle={{  paddingHorizontal: 10, paddingVertical: 20 }}
                data={trendingData.slice(0, 20)}
                renderItem={renderItem_trending}
                keyExtractor={item => item._id}
                showsHorizontalScrollIndicator={false}
    
              />
    
    
    
              <View style={{ flex: 1, flexDirection: 'row', width: SCREEN_WIDTH * 0.9, justifyContent: 'flex-start', alignItems: 'center', maxHeight: 40, paddingLeft:10 }}>
                <Image source={require('@images/images/toppicks.png')} style={{ width: 20, height: 20  }} />
                <Text style={{ paddingLeft: 10, color: DefaultColours.black , fontWeight: 'bold', fontSize : 17 }}>Top Picks</Text>
              </View>
              <FlatList
                horizontal
                ItemSeparatorComponent={
                  () => <View style={{ padding: 5 }}/>
                }
                contentContainerStyle={{  paddingHorizontal: 10, paddingVertical: 20 }}
                data={toppicksData}
                renderItem={renderItem_toppicks}
                keyExtractor={item => item.id}
                showsHorizontalScrollIndicator={false}
    
              />
    
    
    
              <View style={{ flex: 1, flexDirection: 'row', width: SCREEN_WIDTH * 0.9, justifyContent: 'flex-start', alignItems: 'center', maxHeight: 40, paddingLeft:10 }}>
                <Image source={require('@images/images/professional_services.png')} style={{ width: 20, height: 30  }} />
                <Text style={{ paddingLeft: 10, color: DefaultColours.black , fontWeight: 'bold', fontSize : 17 }}>Professional Services</Text>
              </View>
              <FlatList
                horizontal
                ItemSeparatorComponent={
                  () => <View style={{ padding: 5 }}/>
                }
                contentContainerStyle={{  paddingHorizontal: 10, paddingVertical: 20 }}
                data={professionalservicesData}
                renderItem={renderItem_professionalservices}
                keyExtractor={item => item.id}
                showsHorizontalScrollIndicator={false}
    
              />
    
              {/*<Text style={{ color: DefaultColours.black }} onPress={() => alert('under development')}>Home Screen</Text>
              <TouchableOpacity onPress={logout}  style={{marginTop:20}}>
              <Text>Logout</Text>
              </TouchableOpacity>*/}
    
    
              </ScrollView>
            <View style={{ width:'100%',height:SCREEN_HIGHT*0.08, alignItems: 'center',flexDirection:'row' }}>
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
            </View></>}
        </SafeAreaView>

      <Modal animationType="slide" style={{ margin: 0, padding: 0 }} transparent={true} visible={state.modalVisible} onRequestClose={() =>  setState(prev => ({...prev, modalVisible: false })) }>
            <View style={{ height: '50%', marginTop: 'auto', backgroundColor:'blue', elevation: 2 }}>
                <View style={{ flex: 1, backgroundColor: 'white', bottom: 0, left: 0, right: 0,}}>
                  <Text style={{ color: 'black', fontSize: 18, padding: 26 }}>Hide this modal by pressing backbutton</Text>
                </View>
                {/*
                <TouchableOpacity
                  style={{
                          position: 'absolute',
                          zIndex: 11,
                          right: 20,
                          bottom: 90,
                          backgroundColor: '#98B3B7',
                          width: 70,
                          height: 70,
                          borderRadius: 35,
                          alignItems: 'center',
                          justifyContent: 'center',
                          elevation: 8,
                      }}
                  onPress={() => {
                    setState(prev => ({...prev, modalVisible: !state.modalVisible }))
                  }}>
                  <Text style={{ color: '#fff', fontSize: 18 }}>Close</Text>
                </TouchableOpacity>
                */}
            </View>
      </Modal>
<Modal animationType="slide" style={{ position: 'absolute',margin: 0, padding:0 }} transparent={true} visible={state.search} onRequestClose={() =>  setState(prev => ({...prev, search: false })) }>
  <View style={{ width:'100%',height:SCREEN_HIGHT, backgroundColor:'#fdfdfd', elevation: 2 }}>
<View style={{ width:'100%',height:SCREEN_HIGHT, alignItems: 'center' }}>
  <View style={{  height:60,borderRadius: 4, borderColor: 'grey',
  flexDirection:'row',justifyContent:'space-between', alignItems: 'center',
  marginHorizontal:16,borderBottomWidth:1 }}>
      <TouchableOpacity
                  style={{
                          width:'10%',
                          height: 48,
                          borderRadius: 24,
                          alignItems: 'center',
                          justifyContent: 'center'
                      }}
                  onPress={() => {
                    setState(prev => ({...prev, search: !state.search }))
                  }}>
  <Svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-arrow-left"
                  width="28" height="28" viewBox="0 0 24 24" stroke-width="1.5" stroke="#5A429B"
                  fill="none" stroke-linecap="round" stroke-linejoin="round">
  <Path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <Line x1="5" y1="12" x2="19" y2="12" />
  <Line x1="5" y1="12" x2="11" y2="18" />
  <Line x1="5" y1="12" x2="11" y2="6" />
</Svg>
                </TouchableOpacity>
      <TextInput style={{ color: DefaultColours.blue0,width:'80%',
        borderLeftWidth: 1,height:40,paddingLeft:12,fontSize: 14,borderRightWidth:1 }}
      value={searchText}
      placeholder={'Search ICT Kart'}
      placeholderTextColor={DefaultColours.blue0}
      onChangeText={text => setsearchText(text)} />
  <TouchableOpacity
                  style={{
                          width:'10%',
                          height: 48,
                          borderRadius: 24,
                          alignItems: 'center',
                          justifyContent: 'center'
                      }}
                  onPress={() =>searchItem(searchText)}>
  <Svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-search" 
  width="28" height="28" viewBox="0 0 24 24" stroke-width="1.5" stroke="#5A429B" 
  fill="none" stroke-linecap="round" stroke-linejoin="round">
  <Path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <Circle cx="10" cy="10" r="7" />
  <Line x1="21" y1="21" x2="15" y2="15" />
</Svg>
                </TouchableOpacity>
  </View>
  <View style={{width:'100%',height:44,paddingTop:4,flexDirection:'row',paddingHorizontal:20}}>
      <View style={{width:'50%',alignItems:'flex-start',justifyContent:'center'}}>
      <Text style={{ color: DefaultColours.black , fontWeight: 'bold', fontSize : 16 }}>
      Results</Text></View>
      <View style={{width:'50%',alignItems:'flex-end',justifyContent:'center'}}>
      {/*<Text style={{ color: DefaultColours.blue0 , fontWeight: '400', fontSize : 16 }}>
      Filter</Text>*/}
      </View>
  </View>
  <View style={{width:'100%',height:SCREEN_HIGHT-104,paddingTop:4}}>
      <FlatList
            ItemSeparatorComponent={
              () => <View style={{ padding:2}}/>
            }
            numColumns={2}
            contentContainerStyle={{paddingHorizontal:16,paddingVertical:4 }}
            data={searchData.length>0? searchData:trendingData}
            renderItem={renderItem_search}
            keyExtractor={item => item._id}
            showsHorizontalScrollIndicator={false}

          />
  </View>
          </View>
</View>
      </Modal>
    </>
  );
};




export default HomeScreen;
const styles = StyleSheet.create({
  icon: {
    width: 23,
    height: 22,
  },
});
