import React, {useState, useEffect} from 'react';
import {View, Text,FlatList} from 'react-native';
import {DefaultColours} from '@constants';
import {Loader} from '@global_components';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
              console.log(response.data.data.list.length)
              if(JSON.stringify(response.data.status)==200){
                setState(prev => ({...prev, cart:response.data.data.list}))
              }
            })
            .catch(function (error) {
              console.log(error);
            });
                }
                catch(error) {
                  console.log('error2',error)
                }}
  )}

  useEffect(() => {
    setTimeout(() => {
      setState(prev => ({...prev, loader: false}));
    }, 2000);
    getlist()
  }, []);

  
  return (
    <>
    {state.cart&&state.cart.length==0? <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        <Text>You have no items in the cart </Text>
        </View>:
        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        <Text>You have no items in the cart </Text>
        </View>}
    </>
  );
};

export default CartScreen;
