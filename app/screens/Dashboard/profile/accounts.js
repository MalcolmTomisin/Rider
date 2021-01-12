import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
  Image
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
import Ionicon from 'react-native-vector-icons/Ionicons';
import img from '../../../image';

const Accounts = ({navigation: {navigate}}) => {
  const [accounts, setAccount] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const {token} = useSelector(({account}) => account);
  const {dark} = useSelector(({theme}) => theme);
  const [indexToDelete, setIndexToDelete] = useState(null);
  const dispatch = useDispatch();

  //get registered bank accounts from api
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
            onPress={() => {
              //setIndexToDelete(index);
              navigate('Delete', {
                bank: item.bankName,
                account: item.accountNumber,
                bankCode: item.bankCode,
                name: item.accountName,
                defaultAccount: item.default,
                id: item._id,
              });
            }}>
            <View style={classes.historyListRoot}>
              <View>
                <Subheading
                  numberOfLines={1}
                  style={[classes.historyListAmount, {width: 180, fontWeight: 'bold'}]}>
                  {`${item.accountName}`}
                </Subheading>
                <Caption
                  style={
                    [classes.historyListDate, {fontWeight: 'bold'}]
                  }>{`${item.accountNumber.replace(item.accountNumber.substring(0, 6),'*****')}`}</Caption>
                  <Subheading
                numberOfLines={1}
                style={[
                  classes.historyListAmount,
                ]}>{`${item.bankName}`}</Subheading>
              </View>
              <MaterialIcon name="keyboard-arrow-right" size={28} color={colors.white} />
            </View>
          </TouchableOpacity>
        )}
      />
      {accounts.length < 1 && 
      <View style={{
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <Image 
        source={img.emptyAccount}
        style={{
          width: 180,
          height: 225,
          marginVertical: 40
        }}
        />
        <Caption style={{fontWeight: '700', fontSize: 16, textAlign: 'center', marginHorizontal: 20, marginVertical: 10}}>You currently do not have a bank account connected.</Caption>
        <Caption style={{fontWeight: '300', fontSize: 10, textAlign: 'center', marginHorizontal: 20, marginVertical: 10}}>Click the add new account button below to add your first account. </Caption>
      </View>
      }
      <View style={{justifyContent: 'center', alignItems: 'center', margin: 20}}>
      <TouchableOpacity style={classes.prompt} onPress={() => navigate('BankAccount')}>
        <MaterialIcon name="add" color={colors.red.main} size={28} />
        <Caption style={{color: colors.red.main}}>Add account</Caption>
      </TouchableOpacity>
      </View>  
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
    fontSize: 10,
    color: colors.white,
  },
  historyListRoot: {
    //marginHorizontal: 5,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    borderBottomColor: colors.hr.light,
    borderBottomWidth: 1,
    paddingVertical: 5,
    paddingHorizontal: 10,
    width: '100%',
    backgroundColor: colors.grey.new,
    borderRadius: 4,
  },
  prompt: {
    justifyContent: 'space-evenly',
    padding: 10,
    flexDirection: 'row',
    width: 150,
    alignItems: 'center',
  },
  empty_alert: {
    fontWeight: '700', 
    fontSize: 16, 
    textAlign: 'center', 
    marginHorizontal: 20, 
    marginVertical: 10
  },
  historyListDate: {
    color: colors.grey.main,
  }
});
