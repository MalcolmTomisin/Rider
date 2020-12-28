import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Rating} from 'react-native-rating-element';
import {Title} from 'react-native-paper';
import {Button} from '../../../components/Button';
import {Loading} from '../../../components/Loading';
import {makeNetworkCalls} from '../../../utils';
import {useDispatch, useSelector} from 'react-redux';
import {accountAction, feedbackAction} from '../../../store/actions';
import {api} from '../../../api';

const Rate = ({navigation: {navigate}}) => {
  const [rate, setRate] = useState(0);
  const {loading, token} = useSelector(({account}) => account);
  const {ratingDetails} = useSelector(({delivery}) => delivery);
  const dispatch = useDispatch();

  const submit = () => {
    dispatch(accountAction.setLoadingStatus({loading: true}));
    makeNetworkCalls({
      url: api.rateUser,
      method: 'post',
      headers: {
        'Content-type': 'application/json',
        'x-auth-token': token,
      },
      data: {rating: rate, entry: ratingDetails.entry._id, source: 'rider'},
    })
      .then((res) => {
        const {msg} = res.data;
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
        dispatch(accountAction.setLoadingStatus({loading: false}));
      });
  };

  return (
    <View style={classes.root}>
      <Title style={classes.text} />
      <Rating
        rated={0}
        totalCount={10}
        ratingColor="#f1c644"
        ratingBackgroundColor="#d4d4d4"
        size={30}
        icon="ios-star"
        direction="row" // anyOf["row" (default), "row-reverse", "column", "column-reverse"]
        onIconTap={(value) => {
          setRate(value);
        }}
      />

      <Button
        label="Rate Client"
        rootStyle={classes.buttonRoot}
        onPress={submit}
      />
      <Loading visible={loading} size="large" />
    </View>
  );
};

export default Rate;

const classes = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'flex-start',
    marginHorizontal: 40,
    alignItems: 'center',
  },
  text: {
    marginVertical: 20,
  },
  buttonRoot: {
    marginVertical: 40,
  },
});
