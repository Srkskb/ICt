import React from 'react';
import {StatusBar} from 'react-native';
import {useIsFocused} from '@react-navigation/native';

const DynamicStatusBar = ({screenName}) => {
  const isFocused = useIsFocused();

  return (
    <>
      {isFocused && screenName === 'splash' ? (
        <StatusBar
          barStyle={'light-content'}
          translucent
          backgroundColor={'transparent'}
        />
      ) : isFocused && screenName === 1 ? (
        <StatusBar
          barStyle={'dark-content'}
          translucent
          backgroundColor={'transparent'}
        />
      ) : isFocused && screenName === 2 ? (
        <StatusBar
          barStyle={'light-content'}
          translucent
          backgroundColor={'transparent'}
        />
      ) : null}
    </>
  );
};

export default DynamicStatusBar;
