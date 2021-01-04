import React from 'react';
import {StyleSheet, View, Dimensions} from 'react-native';
import {
  VictoryBar,
  VictoryChart,
  VictoryTheme,
  VictoryAxis,
} from 'victory-native';
import {colors} from '../../../theme';
import {useSelector} from 'react-redux';
const {width} = Dimensions.get('screen');

const Bar = ({data}) => {
  const {dark} = useSelector(({theme}) => theme);
  return (
    <View stxle={styles.container}>
      <VictoryChart height={200} width={width / 1.1}>
        <VictoryAxis
          label="Days of the week"
          style={{
            axis: {stroke: '#756f6a'},
            axisLabel: {
              fontSize: 10,
              padding: 30,
              stroke: dark ? colors.white : colors.grey.main,
              fontWeight: '200',
            },
            // grid: {stroke: ({tick}) => (tick > 0.5 ? 'red' : 'grey')},
            ticks: {stroke: 'grey', size: 5},
            tickLabels: {
              fontSize: 10,
              padding: 2,
              stroke: dark ? colors.white : colors.grey.main,
              fontWeight: '200',
            },
          }}
        />
        <VictoryBar
          style={{
            data: {
              fill: dark ? colors.red.light : colors.red.main,
            },
          }}
          barWidth={30}
          alignment="middle"
          animate={{
            duration: 2000,
            onLoad: {duration: 1000},
          }}
          barRatio={0.8}
          data={data}
        />
      </VictoryChart>
    </View>
  );
};

export default Bar;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#f5fcff',
  },
});
