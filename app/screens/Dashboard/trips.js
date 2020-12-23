import React from 'react';
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
import {useSelector} from 'react-redux';

const Trips = () => {
  const {dark} = useSelector(({theme}) => theme);

  return (
    <View style={classes.root}>
      <FlatList
        data={[0, 1, 2, 3, 4, 5, 6]}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <View style={classes.historyListRoot}>
            <View style={classes.historyListLeft}>
              <Subheading style={classes.historyListAmount}>
                Mon, 18 Feb, 2020
              </Subheading>
              <Caption style={classes.historyListDate}>25 Trips</Caption>
            </View>
            <Subheading style={classes.historyListAmount}>₦1,500</Subheading>
          </View>
        )}
      />
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
