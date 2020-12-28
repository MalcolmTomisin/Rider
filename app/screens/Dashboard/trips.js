import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Platform, ScrollView, FlatList} from 'react-native';
import {
  Caption,
  Headline,
  Surface,
  Title,
  Subheading,
} from 'react-native-paper';
import {Button} from '../../components/Button';
import {colors} from '../../theme';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Bar} from '../../components/Chart';
import {useSelector, useDispatch} from 'react-redux';
import {makeNetworkCalls} from '../../utils';
import {api} from '../../api';
import {Loading} from '../../components/Loading';
import {feedbackAction} from '../../store/actions';
import constants from '../../utils/constants';

const Trips = () => {
  const {dark} = useSelector(({theme}) => theme);
  const dispatch = useDispatch();
  const {token} = useSelector(({account}) => account);
  const [loading, setLoading] = useState(false);
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    setLoading(true);
    makeNetworkCalls({
      url: api.tripsCurrentMonth,
      headers: {
        'x-auth-token': token,
      },
    })
      .then((res) => {
        const {msg, data} = res.data;
        setTrips(data);
        dispatch(feedbackAction.launch({open: true, severity: 's', msg}));
      })
      .catch((err) => {
        if (err.response) {
          const {msg} = err.response.data;
          dispatch(feedbackAction.launch({open: true, severity: 'w', msg}));
          return;
        }
        dispatch(
          feedbackAction.launch({open: true, severity: 'w', msg: `${err}`}),
        );
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  return (
    <View style={classes.root}>
      <FlatList
        data={trips}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <View style={classes.historyListRoot}>
            <View style={classes.historyListLeft}>
              <Subheading style={classes.historyListAmount}>
                {`${new Date(item.createdAt).toDateString()}`}
              </Subheading>
              <Caption
                style={classes.historyListDate}>{`${item.status}`}</Caption>
            </View>
            <Subheading style={classes.historyListAmount}>{`₦ ${Math.round(
              item.estimatedCost,
            )}`}</Subheading>
          </View>
        )}
      />
      <Loading visible={loading} size="large" />
    </View>
  );
};

export default Trips;

const classes = StyleSheet.create({
  root: {
    flex: 1,
    // paddingHorizontal: 20,
  },
  historyHeaderTab: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  historyListAmount: {
    fontWeight: '600',
    fontSize: 15,
  },
  historyListRoot: {
    marginHorizontal: 20,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    flexDirection: 'row',
    borderBottomColor: colors.hr.light,
    borderBottomWidth: 1,
    paddingVertical: 5,
  },
});
