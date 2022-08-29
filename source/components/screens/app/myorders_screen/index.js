import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  Switch,
  ScrollView,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,Image,Linking
} from 'react-native';
import axios from 'axios';

import AsyncStorage from '@react-native-async-storage/async-storage';
//To make the selector (Something like tabs)
import {DefaultColours, SCREEN_WIDTH,SCREEN_HIGHT,FontSize} from '@constants';
import Svg, {Path,Circle,Line} from 'react-native-svg';
import Toast from 'react-native-simple-toast';


const Myordersscreen = ({navigation,route}) => {
  // Ddefault active selector
  const [activeSections, setActiveSections] = useState([]);
  // Collapsed condition for the single collapsible
  const [collapsed, setCollapsed] = useState(true);
  const [loading, setLoading] = useState(false);
  const [state,setState] = useState({ data: [], hiderows: {}  })
  const [orderData, setorderData] = useState([])
  const [hiderows, sethiderows] = useState(null)

  // MultipleSelect is for the Multiple Expand allowed
  // True: Expand multiple at a time
  // False: One can be expand at a time


  useEffect(() => {
    //console.log('this is get list')
    getlist()
  }, []);

  const getlist = () => {
    AsyncStorage.getItem('userExist')
            .then(res =>{
              var data = JSON.stringify({
  "user": JSON.parse(res)
});

var config = {
  method: 'post',
  url: 'https://api.ictkart.com/api/buyproduct/list',
  headers: { 
    'Content-Type': 'application/json'
  },
  // data : data
};

axios(config)
.then((response)=> {
  setorderData(response.data.data.list);
})
.catch((error)=> {
  // console.log(error);
});
            })
  }


  const togglerows = (id)=> {
    //console.log('id',id)
    //console.log('before state',state.hiderows)
    var hiderows ={...state.hiderows, [id]: !state.hiderows[id]}
    //console.log('hiderows',hiderows)
    setState(prev => ({...prev, hiderows }));

  }

  const renderItem = ({item, index}) => {
    // console.log('item ',item,index)
    

    return (
      <View key={item._id}
      style={{ width: '100%', minHeight: SCREEN_WIDTH * .4,
        borderRadius: 5, borderWidth: 1, borderColor: 'grey', padding: 4 }}>
        {/*<TouchableOpacity onPress={()=>navigation.navigate('ProductDetailScreen', { data: item })}>*/}
        <TouchableOpacity onPress={()=>Toast.show('Yet to be implement')}>
        <View style={{ alignItems: 'center', padding: 6 }}>
            <Image source={{uri:item.product.thumbnailImage}} style={{ width:'100%', height:140}} />
            </View>
          <Text numberOfLines={3}
          style={{ color: DefaultColours.black, fontSize: 13, color: 'black', padding: 5, lineHeight: 18 }}>
          {item.product.title}</Text>
          <View style={{ flexDirection: 'row', padding: 5 ,justifyContent:'flex-end' , flex:1}}>
              <View style={{ flex: 1, justifyContent:'flex-end'}}>
                  <Text style={{ color: 'black', fontSize: 13 }}>
                  Total Amount</Text>
                  <Text style={{ color: DefaultColours.black, fontSize: 15,  }}>
                  {item.currency} <Text style={{ fontWeight: 'bold'}}>{item.sellingPrice}</Text></Text>
              </View>
              <View style={{alignItems: 'flex-end', justifyContent: 'center' }}>
                <Text style={{ color: 'black', fontSize: 13 }}>
                  Ordered At</Text>
                  <Text style={{color: 'black',fontWeight: 'bold'}}>{item.createdAt}</Text>
              </View>
          </View>
          <View style={{ flexDirection: 'row', padding: 5 ,justifyContent:'flex-end' , flex:1}}>
              <View style={{ flex: 1, justifyContent:'flex-end'}}>
                  <Text style={{ color: 'black', fontSize: 13 }}>
                  Current Status</Text>
                  <Text style={{ color: DefaultColours.black, fontSize: 15,fontWeight: 'bold'}}>
                  {item.status?'Ordered':'Delivery'}</Text>
              </View>
              <View style={{alignItems: 'flex-end', justifyContent: 'center' }}>
                <Text style={{ color: 'black', fontSize: 13 }}>
                  Type</Text>
                  <Text style={{color: 'black',fontWeight: 'bold'}}>{item.type}</Text>
              </View>
          </View>
          <View style={{width:'100%',flexDirection:'row',alignItems:'center',
  justifyContent:'space-between',paddingBottom:6}}>
  <TouchableOpacity onPress={()=>Toast.show('Order Cancelled')} style={{borderColor: '#5A429B',
    height:40,borderRadius:4,justifyContent:'center',width: '49%',
      alignItems:'center',paddingHorizontal: '6%',marginTop:'2%',borderWidth: 1}}>
            <Text style={{color:'#5A429B',fontSize:FontSize(16),fontWeight:'400'}}>
            Cancel</Text>
            </TouchableOpacity>
  <TouchableOpacity onPress={()=>Linking.openURL(`https://api.ictkart.com/api/invoice/download/${item.id}`)} style={{backgroundColor: '#5A429B',
    height:40,borderRadius:4,justifyContent:'center',borderColor: '#5A429B',width: '49%',
      alignItems:'center',paddingHorizontal: '6%',marginTop:'2%',borderWidth: 1}}>
            <Text style={{color:'#fdfdfd',fontSize:FontSize(16),fontWeight:'400'}}>
            Invoice</Text>
            </TouchableOpacity>
  </View>
          </TouchableOpacity>
      </View>
    )
  }
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
      <FlatList
                ItemSeparatorComponent={
                  () => <View style={{ padding: 5 }}/>
                }
                contentContainerStyle={{  paddingHorizontal: 10, paddingVertical: 20 }}
                data={orderData}
                renderItem={renderItem}
                keyExtractor={item => item._id}
                showsVerticalScrollIndicator={false}
    
              />  
      </View>
    </SafeAreaView>
  );
};

export default Myordersscreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    // paddingTop: 30,
  },
  title: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '300',
    marginBottom: 20,
  },
  header: {
    backgroundColor: '#F5FCFF',
    padding: 10,
  },
  headerText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500',
  },
  content: {
    padding: 20,
    backgroundColor: '#fff',
  },
  active: {
    backgroundColor: 'rgba(255,255,255,1)',
  },
  inactive: {
    backgroundColor: 'rgba(245,252,255,1)',
  },
  selectors: {
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  selector: {
    backgroundColor: '#F5FCFF',
    padding: 10,
  },
  activeSelector: {
    fontWeight: 'bold',
    color:'red'
  },
  selectTitle: {
    fontSize: 14,
    fontWeight: '500',
    padding: 10,
    textAlign: 'center',
  },
  multipleToggle: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 30,
    alignItems: 'center',
  },
  multipleToggle__title: {
    fontSize: 16,
    marginRight: 8,
  },
});
