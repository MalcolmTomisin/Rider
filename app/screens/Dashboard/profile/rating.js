import React from 'react';
import {View, StyleSheet, Platform, ScrollView, FlatList} from 'react-native';
import {
  Caption,
  Headline,
  Surface,
  Title,
  Subheading,
} from 'react-native-paper';
import {Button} from '../../../components/Button';
import {colors} from '../../../theme';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Pie} from '../../../components/Chart';
import {useSelector, useDispatch} from 'react-redux';
import {Rating} from 'react-native-rating-element';
import {makeNetworkCalls} from '../../../utils';
import {api} from '../../../api';
import {feedbackAction} from '../../../store/actions';
import constants from '../../../utils/constants';
import {Loading} from '../../../components/Loading';

const RatingScreen = () => {
  const {dark} = useSelector(({theme}) => theme);
  const {token} = useSelector(({account}) => account);
  const [page, setpage] = React.useState(1);
  const [avg, setAvg] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  const [userRatings, setUserRatings] = React.useState([]);

  const dispatch = useDispatch();

  const calculateAverageRating = (ratings) => {
    let sum = 0;
    let avgNum = 0;
    if (ratings.length > 0) {
      for (let i = 0; i < ratings.length; i++) {
        sum += ratings[i].rating;
      }
      if (ratings.length > 1) {
        avgNum = sum / ratings.length;
      }
      console.log('sum', sum);
      setAvg(avgNum);
    }
  };
  React.useEffect(() => {
    setLoading(true);
    makeNetworkCalls({
      url: `${api.ratingSummary}?pageNumber=${page}&nPerPage=10`,
      headers: {
        'x-auth-token': token,
      },
    })
      .then((res) => {
        const {msg, data} = res.data;
        console.log('rate', data);
        setUserRatings(data);
        //dispatch(feedbackAction.launch({open: true, severity: 's', msg}));
        calculateAverageRating(data);
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
  }, [token]);
  return (
    <View>
      <ScrollView>
        <Surface style={classes.surface}>
          <View style={classes.infoRoot}>
            <Headline style={classes.ratingNumber}>{`${
              avg === 0 ? avg : avg.toFixed(1)
            }`}</Headline>
            <Rating
              rated={avg === 0 ? 0 : avg / 2}
              totalCount={5}
              ratingColor="#f1c644"
              ratingBackgroundColor="#d4d4d4"
              size={15}
              readonly // by default is false
              icon="ios-star"
              direction="row" // anyOf["row" (default), "row-reverse", "column", "column-reverse"]
            />
            <View style={classes.user}>
              <Icon name="account" size={20} color={colors.grey.main} />
              <Caption>{userRatings.length} users</Caption>
            </View>
          </View>
          <View style={{justifyContent: 'center', alignItems: 'center', marginLeft: -20}}>
            <Pie
              count={userRatings.length}
            />
          </View>
        </Surface>
        <View style={classes.historyRoot}>
          <View
            style={[
              classes.historyHeaderTab,
              {backgroundColor: dark ? colors.grey.dark : colors.grey.light},
            ]}>
            <Subheading>
              {' '}
              {`${
                constants.month[new Date().getMonth()]
              }, ${new Date().getFullYear()}`}
            </Subheading>
          </View>

          <View>
            <FlatList
              data={userRatings}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item}) => (
                <View style={classes.reviewRoot}>
                  <Rating
                    rated={item?.rating / 2}
                    totalCount={5}
                    ratingColor="#f1c644"
                    ratingBackgroundColor="#d4d4d4"
                    size={12}
                    readonly // by default is false
                    icon="ios-star"
                    direction="row" // anyOf["row" (default), "row-reverse", "column", "column-reverse"]
                  />
                  <Caption style={classes.review}>{`${item?.comment}`}</Caption>
                </View>
              )}
            />
          </View>
        </View>
      </ScrollView>
      <Loading visible={loading} size="large" />
    </View>
  );
};

export default RatingScreen;

const classes = StyleSheet.create({
  root: {
    flex: 1,
    // paddingHorizontal: 20,
  },
  surface: {
    borderRadius: 11,
    elevation: Platform.select({ios: 1, android: 8}),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    margin: 20,
    height: 200,
  },
  ratingNumber: {
    fontWeight: '800',
    fontSize: 30,
  },
  user: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  infoRoot: {
    justifyContent: 'flex-start',
  },
  historyHeaderTab: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  review: {
    fontWeight: '400',
    fontSize: 15,
  },
  reviewRoot: {
    marginLeft: 20,
    paddingRight: 20,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    borderBottomColor: colors.hr.light,
    borderBottomWidth: 1,
    paddingVertical: 10,
  },
});
