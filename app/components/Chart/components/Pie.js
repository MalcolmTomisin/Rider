import React from 'react';
import {StyleSheet, View, Dimensions} from 'react-native';
import {
  VictoryBar,
  VictoryChart,
  VictoryTheme,
  VictoryAxis,
  VictoryPie,
  VictoryLabel,
} from 'victory-native';
import {colors} from '../../../theme';
import {useSelector} from 'react-redux';
import Svg from 'react-native-svg';
const {width} = Dimensions.get('screen');

const Pie = ({count}) => {
  const {dark} = useSelector(({theme}) => theme);
  const [percent, setPercent] = React.useState(25);
  const [data, setData] = React.useState([]);
  let interval = null;

  React.useEffect(() => {
    let newNum = count === 0 ? 0 : (count / 40) * 100;
    setData(getData(newNum));
    // increasePercentage();

    // return () => {
    //   clearInterval(interval);
    // }
  }, [count]);

  const increasePercentage = () => {
    let percent = 25;
    interval = setInterval(() => {
      percent += Math.random() * 25;
      percent = percent > 100 ? 0 : percent;
      setPercent(percent);
      setData(getData(percent));
    }, 2000);
  };

  const getData = (percent) => {
    return [
      {x: 1, y: percent},
      {x: 2, y: 100 - percent},
    ];
  };

  //console.log("data", data);

  return (
    <View style={styles.container}>
      <Svg width={270} height={270}>
        <VictoryLabel
          textAnchor="middle"
          style={{
            fontSize: 30,
            fontWeight: '500',
            fill: dark ? colors.red.main : colors.grey.dark,
          }}
          x={135}
          y={125}
          text={`${count}`}
        />
        <VictoryLabel
          textAnchor="middle"
          style={{
            fontSize: 10,
            fill: dark ? colors.red.main : colors.grey.dark,
          }}
          x={135}
          y={150}
          text="Deliveries"
        />
        <VictoryPie
          innerRadius={75}
          standalone={false}
          width={270}
          height={270}
          data={data}
          style={{
            data: {
              fill: ({datum}) => {
                const color = 'red';
                return datum.x === 1 ? color : colors.grey.light;
              },
            },
          }}
          animate={{
            duration: 2000,
          }}
          labels={() => null}
          // startAngle={90}
          // endAngle={-90}
        />
      </Svg>
    </View>
  );
};

export default Pie;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
