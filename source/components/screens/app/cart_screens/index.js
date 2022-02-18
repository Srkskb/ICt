import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
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
    <Text>Chat</Text>
    </>
  );
};

export default CartScreen;
