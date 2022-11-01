import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  Switch,
  ScrollView,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,Image,Linking,PermissionsAndroid, Alert,Platform
} from 'react-native';
import axios from 'axios';
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
//To make the selector (Something like tabs)
import {DefaultColours, SCREEN_WIDTH,SCREEN_HIGHT,FontSize} from '@constants';
import Svg, {Path,Circle,Line} from 'react-native-svg';
import Toast from 'react-native-simple-toast';
import {Loader} from '@global_components';
import RNFetchBlob from "rn-fetch-blob";
import FileViewer from "react-native-file-viewer";
const Myordersscreen = ({navigation,route}) => {
  const [state, setState] = useState({loader: true})
  // Ddefault active selector
  const [activeSection, setActiveSection] = useState('list');
  // Collapsed condition for the single collapsible
  const [collapsed, setCollapsed] = useState(true);
  const [loading, setLoading] = useState(false);
  // const [state,setState] = useState({ data: [], hiderows: {}  })
  const [orderData, setorderData] = useState([])
  const [data, setData] = useState([])
  const [hiderows, sethiderows] = useState(null)

  // MultipleSelect is for the Multiple Expand allowed
  // True: Expand multiple at a time
  // False: One can be expand at a time


  useEffect(() => {
    //console.log('this is get list')
    getlist()
  }, []);

  const getlist = () => {
    setState(prev => ({...prev, loader: true}));
    AsyncStorage.getItem('userExist')
            .then(res =>{
              var data = JSON.stringify({
  "user": JSON.parse(res)
});

var config = {
  method: 'post',
  url: 'http://3.20.89.137:8181/api/buyproduct/list',
  headers: { 
    'Content-Type': 'application/json'
  },
  // data : data
};

axios(config)
.then((response)=> {
  setorderData(response.data.data.list);
  setState(prev => ({...prev, loader: false}));
})
.catch((error)=> {
  // console.log(error);
  setState(prev => ({...prev, loader: false}));
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
  const getDetails=(id)=>{
    var config = {
  method: 'get',
  url: `http://3.20.89.137:8181/api/buyproduct/order-details/${id}`,
  headers: { 
    'Content-Type': 'application/json'
  },
  // data : data
};

axios(config)
.then((response)=> {
  setData(response.data.data);
  setActiveSection('details')
  setState(prev => ({...prev, loader: false}));
})
.catch((error)=> {
  // console.log(error);
  setState(prev => ({...prev, loader: false}));
});
  }

    const actualDownload = (id) => {
   const { dirs } = RNFetchBlob.fs;
  RNFetchBlob.config({
    fileCache: true,
    addAndroidDownloads: {
    useDownloadManager: true,
    notification: true,
    mime: 'application/pdf',
    mediaScannable: true,
    path: `${dirs.DownloadDir}/${id}.pdf`,
    },
  })
    .fetch('GET', `http://3.20.89.137:8181/api/invoice/download/${id}`, {})
    .then((res) => {
      Toast.show('The file saved to downloads');
      //FileViewer.open(res.path())
      const path = res.path();
      FileViewer.open(path) // absolute-path-to-my-local-file.
  .then(() => {
    // success
  })
  .catch((error) => {
    // console.log(error)
  });
    })
    .catch((e) => {
      // console.log(e)
    });
}
const downloadFile = async(id) => {
  try {
      const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        actualDownload(id);
      } else {
        Alert.alert('Permission Denied!', 'You need to give storage permission to download the file');
      }
    } catch (err) {
      // console.warn(err);
    } 
}
const getParsedDate=(strDate)=>{
    var strSplitDate = String(strDate).split(' ');
    var date = new Date(strSplitDate[0]);
    // alert(date);
    var dd = date.getDate();
    var mm = date.getMonth() + 1; //January is 0!

    var yyyy = date.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }
    date =  dd + "-" + mm + "-" + yyyy;
    return date.toString();
}
  const renderItem = ({item, index}) => {
    // console.log('item ',item,index)

    return (
      <View key={item._id}
      style={{ width: '100%', minHeight: SCREEN_WIDTH * .4,
        borderRadius: 5, borderWidth: 1, borderColor: 'grey', padding: 4 }}>
        {/*<TouchableOpacity onPress={()=>navigation.navigate('ProductDetailScreen', { data: item })}>*/}
        <TouchableOpacity onPress={()=>getDetails(item.id)}>
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
                  <Text style={{color: 'black',fontWeight: 'bold'}}>{getParsedDate(item.createdAt)}</Text>
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
  <TouchableOpacity onPress={()=>downloadFile(item.id)} style={{backgroundColor: '#5A429B',
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
    {state.loader&&<Loader/>}
      {activeSection=='list'&&<View style={styles.container}>
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
            </View>}
      {activeSection=='details'&&<View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
      <View style={{width:SCREEN_WIDTH,justifyContent:'flex-start',
      flexDirection:'row',alignItems:'center', height:50,paddingHorizontal:20  }}>
      <TouchableOpacity onPress={()=>setActiveSection('list')}
    style={{width:SCREEN_WIDTH*0.1,justifyContent:'center',alignItems:'center' }}>
    <Image
      style={{width:SCREEN_WIDTH*0.07, height:SCREEN_WIDTH*0.07}}
      resizeMode="contain"
      source={BackButtonImg}
    />
    </TouchableOpacity></View>
          <View style={{ alignItems: 'center',marginBottom:6, padding: 6,backgroundColor: '#fdfdfd' }}>
          <Text style={{ color: DefaultColours.black, fontSize: 13, color: 'black', padding: 5,
          lineHeight: 18 }}>{data.products.description}</Text>
            </View>
          <View style={{ alignItems: 'center',marginBottom:6, paddingHorizontal:10,
          backgroundColor: '#fdfdfd',paddingVertical:6,flexDirection: 'row'}}>
          <View style={{width: '49%',}}>
          <Text style={{ color: DefaultColours.black, fontSize:FontSize(14), color: 'black', padding: 5,
          lineHeight: 18 }}>Invoice Number{'\n'}{data._id}</Text></View>
          <TouchableOpacity onPress={()=>downloadFile(data._id)} style={{backgroundColor: '#5A429B',
    height:40,borderRadius:4,justifyContent:'center',borderColor: '#5A429B',width: '49%',
      alignItems:'center',paddingHorizontal: '6%',marginTop:'2%',borderWidth: 1}}>
            <Text style={{color:'#fdfdfd',fontSize:FontSize(16),fontWeight:'400'}}>
            Download Invoice</Text>
            </TouchableOpacity>
            </View>
            <View style={{ alignItems: 'center',marginBottom:6, paddingHorizontal:10,
          backgroundColor: '#fdfdfd',paddingVertical:6}}>
            <View style={{width: '100%',borderBottomWidth:1,marginBottom:4}}>
          <Text style={{ color: DefaultColours.black, fontSize:FontSize(16), color: 'black', padding: 5,
          lineHeight: 18 }}>Product Details</Text></View>
            <View style={{width: '100%',flexDirection: 'row'}}>
          <View style={{width: '30%',}}>
          <Text style={{ color: DefaultColours.black, fontSize:FontSize(14), color: 'black', padding: 5,
          lineHeight: 18 }}>Name</Text></View>
          <View style={{width: '70%',}}>
          <Text style={{ color: DefaultColours.black, fontSize:FontSize(14), color: 'black', padding: 5,
          lineHeight: 18 }}>{data.products.title}</Text></View>
          </View>
            <View style={{width: '100%',flexDirection: 'row'}}>
          <View style={{width: '30%',}}>
          <Text style={{ color: DefaultColours.black, fontSize:FontSize(14), color: 'black', padding: 5,
          lineHeight: 18 }}>Code</Text></View>
          <View style={{width: '70%',}}>
          <Text style={{ color: DefaultColours.black, fontSize:FontSize(14), color: 'black', padding: 5,
          lineHeight: 18 }}>{data.products.code}</Text></View>
          </View>
          <View style={{width: '100%',flexDirection: 'row'}}>
          <View style={{width: '30%',}}>
          <Text style={{ color: DefaultColours.black, fontSize:FontSize(14), color: 'black', padding: 5,
          lineHeight: 18 }}>Original Price</Text></View>
          <View style={{width: '70%',}}>
          <Text style={{ color: DefaultColours.black, fontSize:FontSize(14), color: 'black', padding: 5,
          lineHeight: 18 }}>AED {data.products.originalPrice}</Text></View>
          </View>
            <View style={{width: '100%',flexDirection: 'row'}}>
          <View style={{width: '30%',}}>
          <Text style={{ color: DefaultColours.black, fontSize:FontSize(14), color: 'black', padding: 5,
          lineHeight: 18 }}>Selling Price</Text></View>
          <View style={{width: '70%',}}>
          <Text style={{ color: DefaultColours.black, fontSize:FontSize(14), color: 'black', padding: 5,
          lineHeight: 18 }}>AED {data.products.sellingPrice}</Text></View>
          </View>
            </View>
          <View style={{ alignItems: 'center',marginBottom:6, paddingHorizontal:10,
          backgroundColor: '#fdfdfd',paddingVertical:6}}>
            <View style={{width: '100%',borderBottomWidth:1,marginBottom:4}}>
          <Text style={{ color: DefaultColours.black, fontSize:FontSize(16), color: 'black', padding: 5,
          lineHeight: 18 }}>Purchase Details</Text></View>
            <View style={{width: '100%',flexDirection: 'row'}}>
          <View style={{width: '30%',}}>
          <Text style={{ color: DefaultColours.black, fontSize:FontSize(14), color: 'black', padding: 5,
          lineHeight: 18 }}>Quantity</Text></View>
          <View style={{width: '70%',}}>
          <Text style={{ color: DefaultColours.black, fontSize:FontSize(14), color: 'black', padding: 5,
          lineHeight: 18 }}>{data.buyproducts.totalItems}</Text></View>
          </View>
            <View style={{width: '100%',flexDirection: 'row'}}>
          <View style={{width: '30%',}}>
          <Text style={{ color: DefaultColours.black, fontSize:FontSize(14), color: 'black', padding: 5,
          lineHeight: 18 }}>Transaction Id</Text></View>
          <View style={{width: '70%',}}>
          <Text style={{ color: DefaultColours.black, fontSize:FontSize(14), color: 'black', padding: 5,
          lineHeight: 18 }}>{data.buyproducts.transactionId}</Text></View>
          </View>
          <View style={{width: '100%',flexDirection: 'row'}}>
          <View style={{width: '30%',}}>
          <Text style={{ color: DefaultColours.black, fontSize:FontSize(14), color: 'black', padding: 5,
          lineHeight: 18 }}>Order Id</Text></View>
          <View style={{width: '70%',}}>
          <Text style={{ color: DefaultColours.black, fontSize:FontSize(14), color: 'black', padding: 5,
          lineHeight: 18 }}>{data.buyproducts.orderId}</Text></View>
          </View>
            <View style={{width: '100%',flexDirection: 'row'}}>
          <View style={{width: '30%',}}>
          <Text style={{ color: DefaultColours.black, fontSize:FontSize(14), color: 'black', padding: 5,
          lineHeight: 18 }}>Price</Text></View>
          <View style={{width: '70%',}}>
          <Text style={{ color: DefaultColours.black, fontSize:FontSize(14), color: 'black', padding: 5,
          lineHeight: 18 }}>AED {data.buyproducts.totalPrice}</Text></View>
          </View>
            <View style={{width: '100%',flexDirection: 'row'}}>
          <View style={{width: '30%',}}>
          <Text style={{ color: DefaultColours.black, fontSize:FontSize(14), color: 'black', padding: 5,
          lineHeight: 18 }}>Paid Amount</Text></View>
          <View style={{width: '70%',}}>
          <Text style={{ color: DefaultColours.black, fontSize:FontSize(14), color: 'black', padding: 5,
          lineHeight: 18 }}>AED {data.buyproducts.paidAmount}</Text></View>
          </View>
            <View style={{width: '100%',flexDirection: 'row'}}>
          <View style={{width: '30%',}}>
          <Text style={{ color: DefaultColours.black, fontSize:FontSize(14), color: 'black', padding: 5,
          lineHeight: 18 }}>Purchase Date</Text></View>
          <View style={{width: '70%',}}>
          <Text style={{ color: DefaultColours.black, fontSize:FontSize(14), color: 'black', padding: 5,
          lineHeight: 18 }}>{data.products.createdAt}</Text></View>
          </View>
            </View>
            <View style={{ alignItems: 'center',marginBottom:6, paddingHorizontal:10,
          backgroundColor: '#fdfdfd',paddingVertical:6}}>
            <View style={{width: '100%',borderBottomWidth:1,marginBottom:4}}>
          <Text style={{ color: DefaultColours.black, fontSize:FontSize(16), color: 'black', padding: 5,
          lineHeight: 18 }}>Customer Details</Text></View>
            <View style={{width: '100%',flexDirection: 'row'}}>
          <View style={{width: '30%',}}>
          <Text style={{ color: DefaultColours.black, fontSize:FontSize(14), color: 'black', padding: 5,
          lineHeight: 18 }}>Name</Text></View>
          <View style={{width: '70%', padding: 5}}>
          <Text style={{ color: DefaultColours.black, fontSize:FontSize(14), color: 'black',
          lineHeight: 18 }}>{data.user.firstName}</Text>
          <Text style={{ color: DefaultColours.black, fontSize:FontSize(14), color: 'black',
          lineHeight: 18 }}>{data.user.lastName}</Text></View>
          </View>
          <View style={{width: '100%',flexDirection: 'row'}}>
          <View style={{width: '30%',}}>
          <Text style={{ color: DefaultColours.black, fontSize:FontSize(14), color: 'black', padding: 5,
          lineHeight: 18 }}>Email</Text></View>
          <View style={{width: '70%', padding: 5}}>
          <Text style={{ color: DefaultColours.black, fontSize:FontSize(14), color: 'black',
          lineHeight: 18 }}>{data.user.email}</Text></View>
          </View>
          <View style={{width: '100%',flexDirection: 'row'}}>
          <View style={{width: '30%',}}>
          <Text style={{ color: DefaultColours.black, fontSize:FontSize(14), color: 'black', padding: 5,
          lineHeight: 18 }}>Mobile</Text></View>
          <View style={{width: '70%', padding: 5}}>
          <Text style={{ color: DefaultColours.black, fontSize:FontSize(14), color: 'black',
          lineHeight: 18 }}>{data.user.mobile}</Text></View>
          </View>
          <View style={{width: '100%',flexDirection: 'row'}}>
          <View style={{width: '30%',}}>
          <Text style={{ color: DefaultColours.black, fontSize:FontSize(14), color: 'black', padding: 5,
          lineHeight: 18 }}>Address</Text></View>
          <View style={{width: '70%', padding: 5}}>
          <Text style={{ color: DefaultColours.black, fontSize:FontSize(14), color: 'black',
          lineHeight: 18 }}>{data.user.address.postalAddress},{data.user.address.city},{data.user.address.state},{data.user.address.country}</Text></View>
          </View>
          </View>
          <View style={{ alignItems: 'center',marginBottom:6, paddingHorizontal:10,
          backgroundColor: '#fdfdfd',paddingVertical:6}}>
            <View style={{width: '100%',borderBottomWidth:1,marginBottom:4}}>
          <Text style={{ color: DefaultColours.black, fontSize:FontSize(16), color: 'black', padding: 5,
          lineHeight: 18 }}>Seller Details</Text></View>
            <View style={{width: '100%',flexDirection: 'row'}}>
          <View style={{width: '30%',}}>
          <Text style={{ color: DefaultColours.black, fontSize:FontSize(14), color: 'black', padding: 5,
          lineHeight: 18 }}>Name</Text></View>
          <View style={{width: '70%', padding: 5}}>
          <Text style={{ color: DefaultColours.black, fontSize:FontSize(14), color: 'black',
          lineHeight: 18 }}>{data.vendor?.firstName}</Text>
          <Text style={{ color: DefaultColours.black, fontSize:FontSize(14), color: 'black',
          lineHeight: 18 }}>{data.vendor?.lastName}</Text></View>
          </View>
          <View style={{width: '100%',flexDirection: 'row'}}>
          <View style={{width: '30%',}}>
          <Text style={{ color: DefaultColours.black, fontSize:FontSize(14), color: 'black', padding: 5,
          lineHeight: 18 }}>Email</Text></View>
          <View style={{width: '70%', padding: 5}}>
          <Text style={{ color: DefaultColours.black, fontSize:FontSize(14), color: 'black',
          lineHeight: 18 }}>{data.vendor?.email}</Text></View>
          </View>
          <View style={{width: '100%',flexDirection: 'row'}}>
          <View style={{width: '30%',}}>
          <Text style={{ color: DefaultColours.black, fontSize:FontSize(14), color: 'black', padding: 5,
          lineHeight: 18 }}>Mobile</Text></View>
          <View style={{width: '70%', padding: 5}}>
          <Text style={{ color: DefaultColours.black, fontSize:FontSize(14), color: 'black',
          lineHeight: 18 }}>{data.vendor?.mobile}</Text></View>
          </View>
          <View style={{width: '100%',flexDirection: 'row'}}>
          <View style={{width: '30%',}}>
          <Text style={{ color: DefaultColours.black, fontSize:FontSize(14), color: 'black', padding: 5,
          lineHeight: 18 }}>Address</Text></View>
          <View style={{width: '70%', padding: 5}}>
          <Text style={{ color: DefaultColours.black, fontSize:FontSize(14), color: 'black',
          lineHeight: 18 }}>{data.vendor?.address.postalAddress},{data.vendor?.address.city},{data.vendor?.address.state},{data.vendor?.address.country}</Text></View>
          </View>
          </View>
            </ScrollView>
            </View>}
    </SafeAreaView>
  );
};

export default Myordersscreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFC',
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
