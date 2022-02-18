import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import {DefaultColours} from '@constants';
import {Loader} from '@global_components';

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
            backgroundColor: DefaultColours.white,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text onPress={() => alert('under development')}>Chat Screen</Text>
        </View>
      )}
    </>
  );
};

export default ChatScreen;
