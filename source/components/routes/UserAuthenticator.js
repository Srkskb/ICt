import React, {useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Loader} from '@global_components';
import {CommonActions} from '@react-navigation/native';

const UserAuthenticator = ({navigation}) => {
  const GetToken = async () => {
    const userToken = await AsyncStorage.getItem('token');
    const userExist = await AsyncStorage.getItem('userExist');
    //console.log('#. userToken : ', userToken, ' #. exist : ', userExist);
    if (userToken && userExist == 1) {
      navigation.dispatch({
        ...CommonActions.reset({
          index: 0,
          routes: [
            {
              name: 'App',
              state: {
                routes: [
                  {
                    name: 'HomeScreen',
                  },
                ],
              },
            },
          ],
        }),
      });
    } else {
      //navigation.push('Auth');
      navigation.dispatch({
        ...CommonActions.reset({
          index: 0,
          routes: [
            {
              name: 'Auth',
              state: {
                routes: [
                  {
                    name: 'LoginScreen',
                  },
                ],
              },
            },
          ],
        }),
      });
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      //console.log('#. useEffect from Authenticator');
      GetToken();
    });

    return unsubscribe;
  }, [navigation]);

  return <Loader />;
};

export default UserAuthenticator;
