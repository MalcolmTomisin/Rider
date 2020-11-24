import React from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {Task} from '../../../components/Card';
import {useSelector} from 'react-redux';

const CompletedOrder = () => {
  return (
    <View style={classes.root}>
      <ScrollView>
        {/* {
        !data && !message.accept ? null : renderTasks(data?.orders)
      } */}
      </ScrollView>
    </View>
  );
};

export default CompletedOrder;

const classes = StyleSheet.create({
  root: {
    flex: 1,
    marginHorizontal: 20,
    paddingVertical: 15,
    justifyContent: 'space-evenly',
  },
});
