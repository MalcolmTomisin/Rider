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
  const [trips, setTrips] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const dispatch = useDispatch();

  const getEarningsAndTrips = () => {
    makeNetworkCalls({
      url: api.weeklyOverview,
      headers: {
        'x-auth-token': token,
      },
      method: 'get',
    })
      .then((res) => {
        const {msg, data} = res.data;
        console.log('rear', data);
        setSummary(data);
        dispatch(feedbackAction.launch({open: true, severity: 's', msg}));
        return makeNetworkCalls({
          url: api.tripsCurrentMonth,
          headers: {
            'x-auth-token': token,
          },
          method: 'get',
        });
      })
      .then((res) => {
        const {msg, data} = res.data;
        setTrips(data);
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
        setRefreshing(false);
      });
  };

  useEffect(() => {
    dispatch(accountAction.setLoadingStatus({loading: true}));
    getEarningsAndTrips();
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
                  {`${Math.round(item?.estimatedCost)}`}
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
                }>{`${item?.data.length}`}</Subheading>
              <Caption>Orders</Caption>
            </View>
            <View style={classes.chartFootContainer}>
              <Subheading style={classes.chartFootTitle}>N/A</Subheading>
              <Caption>Online hours</Caption>
            </View>
            <View style={classes.chartFootContainer}>
              <Subheading style={classes.chartFootTitle}>{`${Math.round(
                item?.estimatedDistance,
              )}`}</Subheading>
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
            <Headline style={classes.headerAmount}>{`${
              summary.length > 0 ? Math.round(summary[0].totalIncome) : 0
            }`}</Headline>
          </View>
        </View>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Carousel
            data={summary}
            renderItem={_renderItem}
            sliderWidth={DEVICE_WIDTH * 0.92}
            itemWidth={DEVICE_WIDTH * 0.92}
          />
        </View>

        <View style={classes.historyRoot}>
          <View
            style={[
              classes.historyHeaderTab,
              {backgroundColor: dark ? colors.grey.dark : colors.grey.light},
            ]}>
            <Subheading>
              {`${constants.month[new Date().getMonth()]}, 2020`}
            </Subheading>
          </View>
        </View>
      </ScrollView>

      <FlatList
        data={trips}
        keyExtractor={(item, index) => index.toString()}
        refreshing={refreshing}
        onRefresh={() => {
          setRefreshing(true);
          getEarningsAndTrips();
        }}
        renderItem={({item}) => (
          <View style={classes.historyListRoot}>
            <View style={classes.historyListLeft}>
              <Subheading style={classes.historyListAmount}>
                {`${
                  item?.status.charAt(0).toUpperCase() + item?.status.slice(1)
                }`}
              </Subheading>
              <Caption style={classes.historyListDate}>{`${new Date(
                item.createdAt,
              ).toDateString()}`}</Caption>
            </View>
            <Subheading style={classes.historyListAmount}>{`₦ ${Math.round(
              item.estimatedCost,
            )}`}</Subheading>
          </View>
        )}
      />
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
    color: colors.green.main,
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
