import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Platform,
  ScrollView,
  FlatList,
  Text,
} from 'react-native';
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
import {getMapOfWeeks, makeNetworkCalls} from '../../utils';
import {api} from '../../api';
import {Loading} from '../../components/Loading';
import {accountAction, feedbackAction} from '../../store/actions';
import Carousel from 'react-native-snap-carousel';
import constants from '../../utils/constants';

const {DEVICE_WIDTH} = constants;

const Earnings = () => {
  const {dark} = useSelector(({theme}) => theme);
  const {token, loading} = useSelector(({account}) => account);
  const [summary, setSummary] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(accountAction.setLoadingStatus({loading: true}));
    makeNetworkCalls({
      url: api.weeklyOverview,
      headers: {
        'x-auth-token': token,
      },
      method: 'get',
    })
      .then((res) => {
        const {msg, data} = res.data;
        setSummary(data);
        dispatch(feedbackAction.launch({open: true, severity: 's', msg}));
      })
      .catch((err) =>
        dispatch(
          feedbackAction.launch({open: true, severity: 'w', msg: `${err}`}),
        ),
      )
      .finally(() =>
        dispatch(accountAction.setLoadingStatus({loading: false})),
      );
  }, []);

  const _renderItem = ({item, index}) => {
    return (
      <View style={classes.chartRoot}>
        <Surface style={classes.surface}>
          <View style={classes.chartHeaderRoot}>
            <Icon name="chevron-left" size={30} color={colors.red.main} />
            <View style={classes.chartHeaderTitleRoot}>
              <Caption style={classes.chartHeaderTitle}>
                {`${new Date(
                  item?._id?.year,
                  item?._id?.month,
                  item?._id?.day,
                ).toDateString()}`}
              </Caption>
              <View style={classes.chartHeaderAmountRoot}>
                <Caption style={classes.signChart}>₦</Caption>
                <Subheading style={classes.chartHeaderAmount}>
                  {`${item.totalIncome}`}
                </Subheading>
              </View>
            </View>
            <Icon name="chevron-right" size={30} color={colors.red.main} />
          </View>

          <View style={classes.chartBodyRoot}>
            <Bar />
          </View>
          <View style={classes.chartFooterRoot}>
            <View style={classes.chartFootContainer}>
              <Subheading
                style={
                  classes.chartFootTitle
                }>{`${item.totalOrders}`}</Subheading>
              <Caption>Orders</Caption>
            </View>
            <View style={classes.chartFootContainer}>
              <Subheading style={classes.chartFootTitle}>42:11</Subheading>
              <Caption>Online hours</Caption>
            </View>
            <View style={classes.chartFootContainer}>
              <Subheading
                style={
                  classes.chartFootTitle
                }>{`${item.totalDistance}`}</Subheading>
              <Caption>Total Distance</Caption>
            </View>
          </View>
        </Surface>
      </View>
    );
  };

  return (
    <View style={classes.root}>
      <ScrollView>
        <View style={classes.headerRoot}>
          <Caption style={classes.headerTitle}>Total Balance</Caption>
          <View style={classes.headerAmountRoot}>
            <Caption style={classes.sign}>₦</Caption>
            <Headline style={classes.headerAmount}>7,350.00</Headline>
          </View>
        </View>

        <Carousel
          data={summary}
          renderItem={_renderItem}
          sliderWidth={DEVICE_WIDTH * 0.92}
          itemWidth={DEVICE_WIDTH * 0.92}
        />

        <View style={classes.historyRoot}>
          <View
            style={[
              classes.historyHeaderTab,
              {backgroundColor: dark ? colors.grey.dark : colors.grey.light},
            ]}>
            <Subheading>September, 2020</Subheading>
          </View>

          <View>
            <FlatList
              data={[0, 1, 2, 3, 4, 5, 6]}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item}) => (
                <View style={classes.historyListRoot}>
                  <View style={classes.historyListLeft}>
                    <Subheading style={classes.historyListAmount}>
                      Withdrawal from wallet
                    </Subheading>
                    <Caption style={classes.historyListDate}>
                      23 Sept, 2020
                    </Caption>
                  </View>
                  <Subheading style={classes.historyListAmount}>
                    ₦1,500
                  </Subheading>
                </View>
              )}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Earnings;

const classes = StyleSheet.create({
  root: {
    flex: 1,
    // paddingHorizontal: 20,
  },
  headerRoot: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  headerTitle: {
    fontSize: 15,
  },
  headerAmountRoot: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  headerAmount: {
    fontSize: 30,
    fontWeight: '800',
  },
  sign: {
    fontSize: 15,
    color: colors.red.main,
  },
  buttonRoot: {
    width: 130,
    height: 41,
    backgroundColor: 'white',
    borderColor: colors.red.main,
    borderWidth: 1,
    borderRadius: 9,
  },
  button: {
    color: colors.red.main,
  },
  chartRoot: {
    flex: 4,
    margin: 20,
  },
  chartHeaderRoot: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginHorizontal: 20,
    // marginBottom: 0,
    // marginTop: 0,
  },
  chartHeaderTitleRoot: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  chartHeaderTitle: {
    fontWeight: '300',
    fontSize: 14,
  },
  chartHeaderAmountRoot: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  chartHeaderAmount: {
    fontSize: 20,
    fontWeight: '800',
  },
  signChart: {
    fontSize: 10,
    color: colors.red.main,
  },
  chartBodyRoot: {},
  surface: {
    borderRadius: 11,
    elevation: Platform.select({ios: 1, android: 8}),
  },
  chartFooterRoot: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    borderTopColor: colors.grey.light,
    borderTopWidth: 1,
  },
  chartFootContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  chartFootTitle: {
    fontWeight: '700',
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
