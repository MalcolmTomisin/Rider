import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ActionSheetIOS, TouchableOpacity, Text } from 'react-native';
import { Button } from '../../../components/Button';
import { TextField } from '../../../components/TextField';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { makeNetworkCalls } from '../../../utils';
import { Dropdown } from '../../../components/DropDown';
import { useDispatch, useSelector } from 'react-redux';
import { api } from '../../../api';
import { Loading } from '../../../components/Loading';
import { feedbackAction } from '../../../store/actions';
import { colors } from '../../../theme';
import { Caption, Checkbox } from 'react-native-paper';
import constants from '../../../utils/constants';

const BankAccount = ({ navigation: { goBack, navigate, pop, push, popToTop } }) => {
  const [banks, setBanks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedBank, setSelectedBank] = useState(null);
  const [sortCode, selectSortCode] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [accountName, setAccountName] = useState('');
  const [defaultAccount, setDefaultAccount] = useState(false);
  const { token } = useSelector(({ account }) => account);
  const [componentLoading, setComponentLoading] = useState(false);
  const { dark } = useSelector(({ theme }) => theme);
  const dispatch = useDispatch();

  const changeSortCode = (code) => {
    selectSortCode(code);
  };
  //gets the account name for the respective bank
  const submitAccountNumber = () => {
    setComponentLoading(true);
    makeNetworkCalls({
      url:
        api.validateBank +
        `accountNumber=${accountNumber}&bankCode=${sortCode}`,
      headers: {
        'x-auth-token': token,
      },
    })
      .then((res) => {
        const { msg, data } = res.data;
        setAccountName(data.account_name);
      })
      .catch((err) => {
        if (err.response) {
          const { msg } = err.response.data;
          dispatch(feedbackAction.launch({ open: true, severity: 'w', msg }));
          return;
        }
      })
      .finally(() => {
        setComponentLoading(false);
      });
  };

  const validateFields = () => {
    if (selectedBank === '') {
      dispatch(
        feedbackAction.launch({
          open: true,
          severity: 'w',
          msg: 'Please select a bank',
        }),
      );
      return false;
    }
    if (accountNumber === '') {
      dispatch(
        feedbackAction.launch({
          open: true,
          severity: 'w',
          msg: 'Please input a valid account Number',
        }),
      );
      return false;
    }
    return true;
  };

  // const selectBankIOS = () => {
  //   if (banks.length > 0) {
  //     ActionSheetIOS.showActionSheetWithOptions(
  //       { options: banks, title: 'Select Bank' },
  //       (i) => {
  //         setSelectedBank(banks[i].name);
  //         changeSortCode(banks[i].code);
  //       },
  //     );
  //   }
  // };

  const selectBankIOS = () => {
    if (banks.length > 0) {
      ActionSheetIOS.showActionSheetWithOptions(
        { options: banks.map((v, i) => v.name), title: 'Select Bank' },
        (i) => {
          setSelectedBank(banks[i].name);
          changeSortCode(banks[i].code);
        },
      );
    }
  };

  //submit bank details to api
  const submitDetails = () => {
    if (!validateFields()) {
      return;
    }
    setLoading(true);
    makeNetworkCalls({
      url: api.addbank,
      headers: {
        'Content-type': 'application/json',
        'x-auth-token': token,
      },
      method: 'post',
      data: {
        accountName,
        accountNumber,
        bankName: selectedBank,
        bankCode: sortCode,
        default: defaultAccount,
      },
    })
      .then((res) => {
        const { msg } = res.data;
        dispatch(feedbackAction.launch({ open: true, severity: 's', msg }));
        popToTop();
        push('Accounts');
      })
      .catch((err) => {
        const { msg } = err?.response?.data;
        dispatch(feedbackAction.launch({ open: true, severity: 'w', msg }));
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    setLoading(true);
    makeNetworkCalls({
      url: api.listBank,
      headers: {
        'x-auth-token': token,
      },
    })
      .then((res) => {
        const { msg, data } = res.data;
        dispatch(feedbackAction.launch({ open: true, severity: 's', msg }));
        setBanks(data);
      })
      .catch((err) => {
        if (err.response) {
          const { msg } = err.response.data;
          dispatch(feedbackAction.launch({ open: true, severity: 'w', msg }));
          return;
        }
        dispatch(
          feedbackAction.launch({ open: true, severity: 'w', msg: `${err}` }),
        );
      })
      .finally(() => setLoading(false));
  }, []);
  return (
    <KeyboardAwareScrollView style={classes.root}>
      {constants.IS_IOS ? (
        <TouchableOpacity
          onPress={selectBankIOS}
          style={{ marginHorizontal: 15 }}>
          <View style={classes.dropDownIOS}>
            <Text style={classes.dropDownIOSText}>
              {!selectedBank
                ? banks.length > 0
                  ? banks[0].name
                  : ''
                : selectedBank}
            </Text>
          </View>
        </TouchableOpacity>
      ) : (
          <Dropdown
            containerStyle={[classes.dropdownContainer]}
            data={banks}
            label="Bank Name"
            rootStyle={{ marginHorizontal: 15 }}
            selectedValue={selectedBank}
            onValueChange={(itemValue, itemIndex) => {
              setSelectedBank(itemValue);
              console.log('re', itemValue);
              changeSortCode(banks[itemIndex].code);
            }}
          />
        )}

      <TextField
        label="Account Number"
        rootStyle={classes.margin}
        containerStyle={{ height: 53 }}
        placeholder="2933181931"
        placeholderTextColor="#a2a2a2"
        onChangeText={(text) => {
          setAccountNumber(text);
        }}
        value={accountNumber}
        onSubmitEditing={submitAccountNumber}
      />
      <TextField
        label="Account Name"
        rootStyle={classes.margin}
        containerStyle={{ height: 53 }}
        placeholder="Adekunle Ciroma Uche"
        placeholderTextColor="#a2a2a2"
        value={accountName}
        editable={false}
        loading={componentLoading}
      />
      <TextField
        label="Bank Sort Number"
        rootStyle={classes.margin}
        containerStyle={{ height: 53 }}
        placeholder="2123"
        placeholderTextColor="#a2a2a2"
        value={sortCode}
        editable={false}
      />
      <View style={{ flexDirection: 'row', alignItems: 'center', margin: 10 }}>
        <Checkbox
          status={defaultAccount ? 'checked' : 'unchecked'}
          onPress={() => {
            setDefaultAccount(!defaultAccount);
          }}
        />
        <Caption>Set as default</Caption>
      </View>

      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginVertical: 40,
          marginHorizontal: 15,
        }}>
        <Button label="Add Bank Account" onPress={submitDetails} />
      </View>

      <View style={classes.footerRoot} />
      <Loading visible={loading} size="large" />
    </KeyboardAwareScrollView>
  );
};

export default BankAccount;

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
  dropDownIOS: {
    borderWidth: 1,
    borderRadius: 6,
    borderColor: '#D9D9D9',
    height: 53,
    marginTop: 20,
    justifyContent: 'center',
    // alignItems: 'center',
  },
  dropDownIOSText: {
    paddingHorizontal: 10,
    width: '100%',
    color: '#2AC940',
    fontSize: 16,
    fontFamily: 'Manrope-Regular',
  },
});
