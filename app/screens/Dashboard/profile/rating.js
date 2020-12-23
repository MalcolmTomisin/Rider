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

const RatingScreen = () => {
  const {dark} = useSelector(({theme}) => theme);
  const {token} = useSelector(({account}) => account);
  const [page, setpage] = React.useState(1);

  const dispatch = useDispatch();
  React.useEffect(() => {
    makeNetworkCalls({
      url: `${api.ratingSummary}?pageNumber=${page}&nPerPage=10`,
      headers: {
        'x-auth-token': token,
      },
    })
      .then((res) => {
        const {msg, data} = res.data;
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
      });
  }, [token]);
  return (
    <View style={classes.root}>
      <ScrollView>
        <Surface style={classes.surface}>
          <View style={classes.infoRoot}>
            <Headline style={classes.ratingNumber}>4.5</Headline>
            <Rating
              rated={4.5}
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
              <Caption>123 Users</Caption>
            </View>
          </View>
          <Pie />
        </Surface>

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
                <View style={classes.reviewRoot}>
                  <Rating
                    rated={4.5}
                    totalCount={5}
                    ratingColor="#f1c644"
                    ratingBackgroundColor="#d4d4d4"
                    size={12}
                    readonly // by default is false
                    icon="ios-star"
                    direction="row" // anyOf["row" (default), "row-reverse", "column", "column-reverse"]
                  />
                  <Caption style={classes.review}>
                    Your service is very good. My Package got to me in perfect
                    shape
                  </Caption>
                </View>
              )}
            />
          </View>
        </View>
      </ScrollView>
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
