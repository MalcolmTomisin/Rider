import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Button} from '../../../components/Button';
import {TextField} from '../../../components/TextField';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {makeNetworkCalls} from '../../../utils';
import {Dropdown} from '../../../components/DropDown';
import {useDispatch, useSelector} from 'react-redux';
import {api} from '../../../api';
import {Loading} from '../../../components/Loading';
import {feedbackAction} from '../../../store/actions';
import {colors} from '../../../theme';
import {Caption, Checkbox} from 'react-native-paper';

const DeleteAccount = ({route, navigation: {goBack, navigate, pop, push, popToTop}}) => {
  const [banks, setBanks] = useState([]);
  const [bankName, setBankName] = useState('');
  const [loading, setLoading] = useState(false);
  const [id, setId] = useState(null);
  const [selectedBank, setSelectedBank] = useState(null);
  const [sortCode, selectSortCode] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [accountName, setAccountName] = useState('');
  const [defaultAccount, setDefaultAccount] = useState(false);
  const {token} = useSelector(({account}) => account);
  const [componentLoading, setComponentLoading] = useState(false);
  const {dark} = useSelector(({theme}) => theme);
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
        riderBankId: id,
      },
      method: 'delete',
    })
      .then((res) => {
        const {msg} = res.data;
        dispatch(feedbackAction.launch({open: true, severity: 's', msg}));
        popToTop();
        push('Accounts');
      })
      .catch((err) => {
        const {msg} = err.response.data;
        dispatch(feedbackAction.launch({open: true, severity: 'w', msg}));
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    setLoading(true);
    const {bank, account, name, defaultAccount, bankCode, id} = route.params;
    setBankName(bank);
    setAccountName(name);
    setAccountNumber(account);
    selectSortCode(bankCode);
    setDefaultAccount(defaultAccount);
    setLoading(false);
    setId(id);
  }, []);
  return (
    <KeyboardAwareScrollView style={classes.root}>
      <TextField
        label="Bank Name"
        rootStyle={classes.margin}
        containerStyle={{height: 53}}
        value={bankName}
        editable={false}
      />
      <TextField
        label="Account Number"
        rootStyle={classes.margin}
        containerStyle={{height: 53}}
        editable={false}
        value={accountNumber}
      />
      <TextField
        label="Account Name"
        rootStyle={classes.margin}
        containerStyle={{height: 53}}
        value={accountName}
        editable={false}
        loading={componentLoading}
      />
      <TextField
        label="Bank Sort Number"
        rootStyle={classes.margin}
        containerStyle={{height: 53}}
        value={sortCode}
        editable={false}
      />
      <View style={{flexDirection: 'row', alignItems: 'center', margin: 10}}>
        <Checkbox
          status={defaultAccount ? 'checked' : 'unchecked'}
        />
      </View>

      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginVertical: 40,
          marginHorizontal: 15,
        }}>
        <Button label="Delete Account" onPress={deleteAccount} />
      </View>

      <View style={classes.footerRoot} />
      <Loading visible={loading} size="large" />
    </KeyboardAwareScrollView>
  );
};

export default DeleteAccount;

const classes = StyleSheet.create({
  root: {
    flex: 1,
  },
  headerRoot: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  bodyRoot: {
    flex: 4,
    marginHorizontal: 20,
    justifyContent: 'space-evenly',
  },
  bodyTitle: {
    fontSize: 28,
  },
  footerRoot: {
    flex: 4,
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
  },
  margin: {
    marginHorizontal: 15,
    marginVertical: 10,
  },
  dropdownContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 53,
  },
});
