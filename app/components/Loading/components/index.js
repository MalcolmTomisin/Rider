import React from 'react';
import {ActivityIndicator, Modal, StyleSheet, View} from 'react-native';
import dimens from '../../../utils/constants';
import {colors} from '../../../theme';

export const Default = ({visible, onRequestClose, size}) => {
  return (
    <Modal
      visible={visible}
      onRequestClose={onRequestClose}
      animationType="slide"
      transparent>
      <View style={styles.modal}>
        <ActivityIndicator size={size} color={colors.red.main} />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    // width: dimens.DEVICE_WIDTH * 0.8,
    // height: dimens.DEVICE_HEIGHT * 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    flex: 1,
    backgroundColor: '#00000080',
  },
});
