import React, {useState, useEffect} from 'react';
import {View, Text,FlatList} from 'react-native';
import {DefaultColours} from '@constants';
import {Loader} from '@global_components';

const CartScreen = ({navigation}) => {
  const [state, setState] = useState({loader: true});

  useEffect(() => {
    setTimeout(() => {
      setState(prev => ({...prev, loader: false}));
    }, 2000);
  }, []);

  
  return (
    <>
    <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
    <Text>You have two items in the cart </Text>
    </View>
    </>
  );
};

export default CartScreen;
