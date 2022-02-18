import React from 'react';
import {View, StatusBar, Image, StyleSheet} from 'react-native';
//import {DynamicStatusBar} from '@global_components';
import {SplashBackgroundImg, SplashLogoImg} from '@images';
import {DefaultColours} from '@constants';
import {horizontalScale, verticalScale} from '@constants';

const SplashScreen = () => {
  return (
    <View style={{flex: 1, backgroundColor: DefaultColours.white}}>
      {/* <DynamicStatusBar screenName={'splash'} /> */}
      <StatusBar
        barStyle={'dark-content'}
        translucent
        backgroundColor={'transparent'}
      />
      <Image
        source={SplashBackgroundImg}
        style={styles.backgroungImg}
        resizeMode="contain"
      />
      <Image
        source={SplashLogoImg}
        style={styles.logoImg}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  backgroungImg: {
    marginTop: 0,
    alignSelf: 'center',
    width: horizontalScale(270),
    height: verticalScale(315),
  },
  logoImg: {
    marginTop: verticalScale(30),
    alignSelf: 'center',
    height: 108,
    width: 199,
  },
});

export default SplashScreen;
