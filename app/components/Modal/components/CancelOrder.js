import React from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Modal,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import { Surface, Subheading } from "react-native-paper"
import { Button } from '../../Button';
import { colors } from '../../../theme';
import { deliveryAction } from '../../../store/actions';
const {width, height} = Dimensions.get('screen');

const CancelOrder = () => {
  const {cancel} = useSelector(({delivery}) => delivery);
  const {dark} = useSelector(({theme}) => theme);
  const dispatch = useDispatch();
  return (
    <Modal animationType="slide" transparent={true} visible={cancel}>
      <View
        style={[
          classes.container,
          {backgroundColor: dark ? 'rgba(0,0,0,0.5)' : 'rgba(225,225,225,0.5)'},
        ]}>
        <Surface style={classes.surface}>
          <Subheading style={classes.message}>
            Cancel Leonard’s Order Pickup
          </Subheading>

          <Button
            label="Yes, Cancel"
            rootStyle={classes.cancel}
            onPress={() =>
              dispatch(
                deliveryAction.setDeliveryData({reason: true, cancel: false}),
              )
            }
          />

          <TouchableOpacity
            onPress={() =>
              dispatch(deliveryAction.setDeliveryData({cancel: false}))
            }>
            <Subheading style={classes.dontCancel}>No, don’t cancel</Subheading>
          </TouchableOpacity>
        </Surface>
      </View>
    </Modal>
  );
}

export default CancelOrder;


const classes = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   padding: 30,
  //   height: 5000,
  // },
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  surface: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    borderTopStartRadius: 30,
    borderTopEndRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 20,
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dontCancel: {
    color: colors.red.main,
    marginBottom: 30,
    marginTop: 10,
  },
  cancel: {
    marginVertical: 10,
  },
  message: {
    marginVertical: 10,
  },
});