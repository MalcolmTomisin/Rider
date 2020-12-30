import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {Caption} from 'react-native-paper';
import {makeNetworkCalls} from '../../../utils/';
import {api} from '../../../api';
import {useSelector, useDispatch} from 'react-redux';
import {feedbackAction} from '../../../store/actions';

const Accounts = ({}) => {
  const [accounts, setAccount] = useState([]);
  const [loading, setLoading] = useState(false);
  const {token} = useSelector(({account}) => account);
  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true);
    makeNetworkCalls({
      url: api.addbank,
      headers: {
        'x-auth-token': token,
      },
    })
      .then((res) => {
        const {msg, data} = res.data;
        dispatch(feedbackAction.launch({open: true, severity: 's', msg}));
        setAccount(data);
      })
      .catch((err) => {
        if (err.response.data) {
          const {msg} = err.response.data;
          dispatch(feedbackAction.launch({open: true, severity: 'w', msg}));
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  return (
    <View>
      <View />
    </View>
  );
};
