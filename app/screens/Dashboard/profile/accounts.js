import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {Caption, Subheading} from 'react-native-paper';
import {makeNetworkCalls} from '../../../utils/';
import {api} from '../../../api';
import {useSelector, useDispatch} from 'react-redux';
import {accountAction, feedbackAction} from '../../../store/actions';
import Icon from 'react-native-vector-icons/FontAwesome';
import {colors} from '../../../theme';
import {Loading} from '../../../components/Loading';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

const Accounts = ({navigation: {navigate}}) => {
  const [accounts, setAccount] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const {token} = useSelector(({account}) => account);
  const {dark} = useSelector(({theme}) => theme);
  const [indexToDelete, setIndexToDelete] = useState(null);
  const dispatch = useDispatch();

  const deleteAccount = (i) => {
    setLoading(true);
    makeNetworkCalls({
      url: api.addbank,
      headers: {
        'x-auth-token': token,
        'Content-type': 'application/json',
      },
      data: {
        riderBankId: accounts[i]._id,
      },
      method: 'delete',
    })
      .then((res) => {
        const {msg} = res.data;
        dispatch(feedbackAction.launch({open: true, severity: 's', msg}));
        fetchBankAccounts();
      })
      .catch((err) => {
        const {msg} = err.response.data;
        dispatch(feedbackAction.launch({open: true, severity: 'w', msg}));
      })
      .finally(() => {
        setLoading(false);
        setIndexToDelete(null);
      });
  };

  const fetchBankAccounts = () => {
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
        setRefreshing(false);
      });
  };

  useEffect(() => {
    setLoading(true);
    fetchBankAccounts();
  }, []);
  return (
    <View>
      <FlatList
        data={accounts}
        refreshing={refreshing}
        keyExtractor={(item, index) => index.toString()}
        onRefresh={() => {
          setRefreshing(true);
          fetchBankAccounts();
        }}
        renderItem={({item, index}) => (
          <TouchableOpacity
            style={{
              padding: 10,
            }}
            onLongPress={() => {
              setIndexToDelete(index);
            }}>
            <View style={classes.historyListRoot}>
              <View style={{marginTop: 10}}>
                <Icon name="money" size={20} color={colors.grey.light} />
              </View>
              <View>
                <Subheading
                  numberOfLines={1}
                  style={[classes.historyListAmount, {width: 180}]}>
                  {`${item.accountName}`}
                </Subheading>
                <Caption
                  style={
                    classes.historyListDate
                  }>{`${item.accountNumber}`}</Caption>
              </View>
              <Subheading
                numberOfLines={1}
                style={[
                  classes.historyListAmount,
                ]}>{`${item.bankName}`}</Subheading>
            </View>
            {indexToDelete === index && (
              <Icon
                name="trash-o"
                color={dark ? colors.grey.light : colors.grey.dark}
                size={30}
                onPress={() => {
                  Alert.alert('Delete Account', 'Proceed to delete account?', [
                    {
                      text: 'Proceed',
                      onPress: () => deleteAccount(index),
                    },
                    {
                      text: 'Cancel',
                      onPress: () => setIndexToDelete(null),
                    },
                  ]);
                }}
                style={{margin: 15}}
              />
            )}
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity style={classes.prompt} onPress={() => navigate('BankAccount')}>
        <MaterialIcon name="add" color={colors.red.main} size={28} />
        <Caption>Add account</Caption>
      </TouchableOpacity>
      <Loading visible={loading} size="large" />
    </View>
  );
};

export default Accounts;

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
    fontSize: 16,
  },
  historyListRoot: {
    marginHorizontal: 5,
    justifyContent: 'space-evenly',
    //alignItems: 'center',
    flexDirection: 'row',
    borderBottomColor: colors.hr.light,
    borderBottomWidth: 1,
    paddingVertical: 5,
    paddingHorizontal: 10,
    width: '100%',
    backgroundColor: colors.red.main,
  },
  prompt: {
    justifyContent: 'space-evenly',
    padding: 10,
    flexDirection: 'row',
    width: 150,
    alignItems: 'center',
  },
});
