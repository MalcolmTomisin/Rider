import React, {useEffect, useState} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {Task} from '../../../components/Card';
import {useSelector, useDispatch} from 'react-redux';
import {instance} from '../../../api';
import {feedbackAction, accountAction} from '../../../store/actions';

const CompletedOrder = () => {
  const {token} = useSelector(({account}) => account);
  const [completedOrders, setCompletedOrders] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    instance
      .get('rider/basket/completed', {
        headers: {
          'x-auth-token': token,
        },
      })
      .then((res) => {
        const {msg, data} = res.data;
        setCompletedOrders(data);
        dispatch(
          feedbackAction.launch({
            open: true,
            severity: res.statusText === 'OK' ? 's' : 'w',
            msg,
          }),
        );
      })
      .catch((err) => {
        dispatch(
          feedbackAction.launch({
            open: true,
            severity: 'w',
            msg: `${err}`,
          }),
        );
      });
  }, []);

  const renderTasks = () => {
    if (!completedOrders || completedOrders.length < 1) {
      return null;
    }

    return completedOrders.map((v, i) => <Task />);
  };

  return (
    <View style={classes.root}>
      <ScrollView>
        {/* {
        !data && !message.accept ? null : renderTasks(data?.orders)
      } */}
      </ScrollView>
    </View>
  );
};

export default CompletedOrder;

const classes = StyleSheet.create({
  root: {
    flex: 1,
    marginHorizontal: 20,
    paddingVertical: 15,
    justifyContent: 'space-evenly',
  },
});
