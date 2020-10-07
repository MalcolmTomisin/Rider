import React from 'react';
import {StyleSheet, Dimensions} from 'react-native';
import {Snackbar} from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import { feedbackAction } from '../../../store/actions';


const FeedBack = () => {
  const {open, msg, severity} = useSelector(({feedback}) => feedback);
  const dispatch = useDispatch();
  return (
    <Snackbar
      visible={open}
      style={[
        classes.root,
        severity === 'w' && classes.warning,
        severity === 's' && classes.success,
      ]}
      onDismiss={() => dispatch(feedbackAction.dismiss())}
      action={{
        label: 'hide',
        onPress: () => dispatch(feedbackAction.dismiss())
      }}>
      {msg}
    </Snackbar>
  );
};

export default FeedBack;

const classes = StyleSheet.create({
  root: {
    borderRadius: 5,
  },
  warning: {
    backgroundColor: '#ebc063',
  },
  success: {
    backgroundColor: '#91cf91',
  },
});