import React from 'react';
import {Text, TouchableWithoutFeedback, StyleSheet} from 'react-native';
import {DefaultColours} from '@constants';

const CustomButton = ({onPress, title}) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.btn}>
        <Text style={[styles.label, styles.textStyle]}>{title}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};
const styles = StyleSheet.create({
  btn: {
    paddingVertical: 17,
    borderRadius: 10,
    width: '90%',
    alignSelf: 'center',
  },
  label: {
    color: DefaultColours.white,
    textAlign: 'center',
    fontSize: 15,
  },
  textStyle: {
    fontSize: 20,
    color: 'white',
    alignSelf: 'center',
    fontWeight: 'bold',
    justifyContent: 'center',
  },
});

export default CustomButton;
