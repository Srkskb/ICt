import React, {useState, useEffect} from 'react';
import {View, Text,TouchableOpacity, Image, TextInput, FlatList, SafeAreaView, ScrollView, StyleSheet} from 'react-native';
import {DefaultColours, SCREEN_WIDTH,SCREEN_HIGHT} from '@constants';
import {Loader} from '@global_components';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackActions } from '@react-navigation/native';
import Modal from 'react-native-modal'
import axios from 'axios';

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


const HomeScreen = ({navigation}) => {
  const [state, setState] = useState({loader: true, modalVisible: false});
  const [search, setsearchText] = useState('');
  const [sliderData, setsliderData] = useState([ {id: 1, image: '@images/images/home-slider-background.png', local: true}, {id: 2, image: '@images/images/home-slider-background.png', local: true} ])

  const [trendingData, settrendingData] = useState([])
  const [toppicksData, settoppicksData] = useState([
    { id: 1, image: '@images/images/sample1.png', description: 'HP-Pavilion-i5-1035G115.6-Inch-4-GB-DDR41-TB-Win-10-Laptop-15-cs3056tx-2', price1: '1150', price2: '1350', rating: '4.9' },
    { id: 2, image: '@images/images/sample2.png', description: 'boAt-Bluetooth-Headphone-Rockerz-518-Red', price1: '650', price2: '750', rating: '4.9' },
    { id: 3, image: '@images/images/sample1.png', description: 'HP-Pavilion-i5-1035G115.6-Inch-4-GB-DDR41-TB-Win-1Laptop15-cs3056tx-2', price1: '1150', price2: '1350', rating: '4.9' },
  ])
  const [professionalservicesData, setprofessionalservicesData] = useState([
    { id: 1, image: '@images/images/sample1.png', badge: true, name: 'Denis Thompson', description: 'Computer Hardware Services', price1: '1150', price2: '1350', rating: '4.9' },
    { id: 2, image: '@images/images/sample2.png', badge: false, name: 'Craing William', description: 'Laptop Repair Services', price1: '650', price2: '750', rating: '4.9' },
    { id: 3, image: '@images/images/sample1.png', badge: true, name: 'John Dew', description: 'App Development', price1: '1150', price2: '1350', rating: '4.9' },
  ])

  useEffect(() => {
    console.log('this is home page')
    setTimeout(() => {
      setState(prev => ({...prev, loader: false}));
    }, 2000);
    getlist()
  }, []);

  const getlist = () => {
    try {
     axios.get('http://3.16.105.232:8181/api/product/all/list')
      .then(response => {
      console.log('response list',response.data.data.list)
          settrendingData(response.data.data.list)

      })
    .catch(err => {
        console.log('error',err)
      });
    }
    catch(error) {
      console.log('error2',error)
    }
  }

  const addcart = () => {
    try {
     axios.post('http://3.16.105.232:8181/api/user/add/incart')
      .then(response => {
      console.log('response list',response.data.data.list)

      })
    .catch(err => {
        console.log('error',err)
      });
    }
    catch(error) {
      console.log('error2',error)
    }
  }

  const renderItem_sider1 = (item) => {
    return (
      <View key={item.id}>
        <Image source={require('@images/images/home-slider-background.png')} />
      </View>
    )
  }



  {/*const renderItem_trending = ({item,index}) => {
    console.log('item tranding ',item,index)
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
    //console.log('item ',item,index)
    return (
      <View key={item.id}
      style={{ width: SCREEN_WIDTH * .45, minHeight: SCREEN_WIDTH * .4,
        borderRadius: 5, borderWidth: 1, borderColor: 'grey', padding: 4 }}>
        <TouchableOpacity onPress={()=>console.log(item)}
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
            {(index % 2 == 0) ?
              <Image source={require('@images/images/sample1.png')} style={{ width: 100, height: 100}} />
              :
              <Image source={require('@images/images/sample2.png')} style={{ width: 100, height: 100}} />
            }
            </View>
          <Text numberOfLines={3}
          style={{ color: DefaultColours.black, fontSize: 13, color: 'black', padding: 5, lineHeight: 18 }}>
          {item.description}</Text>
          <View style={{ flexDirection: 'row', padding: 5 ,justifyContent:'flex-end' , flex:1}}>
              <View style={{ flex: 1, justifyContent:'flex-end'}}>
                  <Text style={{ color: DefaultColours.black, fontSize: 15,  }}>AED <Text style={{ fontWeight: 'bold'}}>{item.price1}</Text></Text>
                  <Text style={{ color: 'grey', fontSize: 13, textDecorationLine: 'line-through' }}>AED {item.price2}</Text>
              </View>
              <View style={{flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'center' }}>
                <Image source={require('@images/images/star.png')} style={{ width: 20, height: 20 }} />
                <Text style={{ color: DefaultColours.black, fontSize: 15,fontWeight:'bold' }}>
                {item.rating}</Text>
              </View>
          </View>
      </View>
    )
  }

  const renderItem_professionalservices = ({item, index}) => {
    //console.log('item ',item,index)
    return (
      <View key={item.id} style={{ width: SCREEN_WIDTH * .45, minHeight: SCREEN_WIDTH * .4, borderRadius: 5, borderWidth: 1, borderColor: 'grey', padding: 4 }}>
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

  return (
    <>
      {state.loader ? (
        <Loader />
      ) : (
        <SafeAreaView
          style={{
            flex: 1,
            width: SCREEN_WIDTH,
            backgroundColor: DefaultColours.white,
            alignItems: 'center',
            justifyContent: 'flex-start',
          }}>
          <ScrollView contentContainerStyle={{ width: SCREEN_WIDTH }}>


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
              <Text style={{ color: DefaultColours.black }}>Click to reveal address modal</Text></TouchableOpacity>
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
              <TouchableOpacity style={{width:'10%',alignItems: 'center', justifyContent: 'center' }}>
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
            contentContainerStyle={{  paddingHorizontal: 10, paddingVertical: 20 }}
            data={sliderData}
            renderItem={renderItem_sider1}
            keyExtractor={item => item.id}
            style={{  maxHeight: 180 }}
            showsHorizontalScrollIndicator={false}

          />


          <View style={{ flex: 1, flexDirection: 'row', width: SCREEN_WIDTH * 0.9, justifyContent: 'flex-start', alignItems: 'center', maxHeight: 40, paddingLeft: 12 }}>
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
            data={toppicksData}
            renderItem={renderItem_toppicks}
            keyExtractor={item => item.id}
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
        </SafeAreaView>
      )}

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

    </>
  );
};




export default HomeScreen;
