import React, {useState, useEffect} from 'react';
import {View, Text,Dimensions,TextInput,StyleSheet} from 'react-native';
import {DefaultColours} from '@constants';
import {Loader} from '@global_components';
const { width, height } = Dimensions.get("window");
const ChatScreen = ({navigation}) => {
  const [state, setState] = useState({loader: true});

  useEffect(() => {
    setTimeout(() => {
      setState(prev => ({...prev, loader: false}));
    }, 2000);
  }, []);
  return (
    <>
      {state.loader ? (
        <Loader />
      ) : (
        <View
          style={{
            flex: 1,
            backgroundColor: "#f9f9f9",
            alignItems: 'center',
            justifyContent: 'center',
          }}>
           <View style={{width: '100%',height: '100%'}}>
               <View style={{width: '100%',height: '10%', backgroundColor: '#fdfdfd',paddingHorizontal:width*0.06,
               alignItems:'center',justifyContent:'center',flexDirection:'row'}}>
              <Text style={{paddingHorizontal:12,fontSize:width*0.06,fontWeight:'bold'}}>Debit/Credit Cards</Text>
            </View>
            <View style={{height:300,width:400,backgroundColor:"#FFFFFF",justifyContent:'center',alignItems:'center',alignSelf:'center',paddingTop:width*0.2}}>
            <View style={styles.topField}>
         <TextInput
         style={{fontSize:20,borderBottomWidth:1}}
         placeholder={'Email Id'}
         placeholderTextColor={"#000000"}
         />
        </View>
        <View style={styles.bottomField}>
         <TextInput
         style={{fontSize:20,borderBottomWidth:1}}
         placeholder={'Last Name'}
         placeholderTextColor={"#000000"}
         
         />
        </View>
            </View>
            </View>
        </View>
      )}
    </>
  );
};
const styles = StyleSheet.create({
  topField: {
    marginTop:10,
    width:'80%',
    borderBottomWidth:1,
    alignSelf:'center'
    
    
},
bottomField: {
  marginTop: 10,
  width:'40%',
  borderBottomWidth:1,
  alignSelf:'center',
  
  
},
})

export default ChatScreen;
