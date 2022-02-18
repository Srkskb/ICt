import React, {useCallback} from 'react';
import {
  View,
  StatusBar,
  Image,
  Text,
  ScrollView,
  Animated,
  StyleSheet,
  BackHandler,
  Alert,
} from 'react-native';
import {
  DefaultColours,
  FontSize,
  SCREEN_WIDTH,
  verticalScale,
} from '@constants';
import {Styles} from '../Styles';
import {
  WalkthroughOneImg,
  WalkthroughTwoImg,
  WalkthroughThreeImg,
} from '@images';
import {useFocusEffect, useNavigation} from '@react-navigation/native';

const tempArr = [
  {
    id: 1,
    imgSource: WalkthroughOneImg,
    title: 'Shop Products & Services',
    subTitle: 'Shop your favorite products and services from ICT Kart',
  },
  {
    id: 2,
    imgSource: WalkthroughTwoImg,
    title: ' Sell Products & Services',
    subTitle: 'Sell your products and services from ICT Kart',
  },
  {
    id: 3,
    imgSource: WalkthroughThreeImg,
    title: 'Deal with Professional',
    subTitle: 'Deal with 100% verified professional exparts from ICT Kart',
  },
];

const WalkthroughScreen = ({navigation}) => {
  const scrollX = new Animated.Value(0);
  const position = Animated.divide(scrollX, SCREEN_WIDTH);
  const {reset} = useNavigation();

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        Alert.alert('ICTCIRCLE', `Are you sure you want to exit?`, [
          {
            text: 'Cancel',
            onPress: () => null,
            style: 'cancel',
          },
          {text: 'YES', onPress: () => BackHandler.exitApp()},
        ]);
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, []),
  );

  return (
    <View style={Styles.screenContainer}>
      <StatusBar
        barStyle={'dark-content'}
        translucent
        backgroundColor={'transparent'}
      />
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        pagingEnabled
        onScroll={Animated.event([
          {nativeEvent: {contentOffset: {x: scrollX}}},
        ])}>
        {tempArr.map((item, index) => {
          return (
            <View key={index} style={{marginTop: verticalScale(110)}}>
              <Image
                style={styles.sliderImg}
                source={item.imgSource}
                resizeMode="contain"
              />
              <Text style={styles.sliderTitle}>{item.title}</Text>
              <Text style={styles.sliderSubTitle}>{item.subTitle}</Text>
            </View>
          );
        })}
      </ScrollView>
      <View style={styles.indicatorContainer}>
        {tempArr.map((_, ind) => {
          let opacity = position.interpolate({
            inputRange: [ind - 1, ind, ind + 1],
            outputRange: [0.2, 1, 0.2],
            extrapolate: 'clamp',
          });
          return (
            <Animated.View
              key={ind}
              style={{
                ...styles.indicator,
                ...{opacity},
              }}
            />
          );
        })}
      </View>
      <Text
        style={styles.skip}
        onPress={() => navigation.navigate('LoginScreen')}>
        SKIP
      </Text>
    </View>
  );
};
//reset({index: 0, routes: [{name: 'App'}]})
const styles = StyleSheet.create({
  sliderImg: {
    width: SCREEN_WIDTH,
    height: verticalScale(334),
  },
  sliderTitle: {
    marginTop: 50,
    textAlign: 'center',
    color: DefaultColours.blue0,
    fontSize: FontSize(20),
    fontFamily: 'Aileron-Regular',
  },
  sliderSubTitle: {
    marginTop: 10,
    width: SCREEN_WIDTH / 1.6,
    alignSelf: 'center',
    textAlign: 'center',
    color: DefaultColours.labletextinput,
    fontSize: FontSize(13),
    fontFamily: 'Aileron-Regular',
  },
  indicatorContainer: {
    marginBottom: 20,
    width: SCREEN_WIDTH,
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  indicator: {
    height: 6,
    width: 30,
    backgroundColor: DefaultColours.blue0,
    margin: 5,
    borderRadius: 5,
  },
  skip: {
    marginBottom: 40,
    fontSize: FontSize(20),
    textAlign: 'center',
    color: DefaultColours.pink,
    paddingVertical: 3,
  },
});

export default WalkthroughScreen;
