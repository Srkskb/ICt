import React from 'react';
import {View, Modal, StyleSheet, ActivityIndicator} from 'react-native';
import {DefaultColours} from '@constants';

export default AppLoader = () => {
  return (
    <Modal transparent={true} visible={true} animationType={'fade'}>
      <View style={styles.fullScreenLoader}>
        <View style={styles.box}>
          <ActivityIndicator size="large" color={DefaultColours.white} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  fullScreenLoader: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 99,
    backgroundColor: DefaultColours.black,
    opacity: 0.3,
    flex: 1,
  },
  box: {
    backgroundColor: DefaultColours.buttonBottomColor,
    borderRadius: 10,
    padding: 26,
  },
});
