/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, Text, Dimensions} from 'react-native';

import {PieChart} from 'react-native-svg-charts';

export default function PieChartWithDynamicSlices() {
  let deviceWidth = Dimensions.get('window').width;

  let [selectedSlice, updateSelectedSlice] = useState({label: '', value: 0});
  let [labelWidth, updateLabelWidth] = useState(0);

  const values = [15, 25, 35, 45, 55];
  const colors = ['#FF6961', '#FFB347', '#77DD77', '#87CEFA', '#B19CD9'];

  const pieData = values
    .filter((value) => value > 0)
    .map((value, index) => ({
      value,
      svg: {
        fill: colors[index],
        onPress: () => console.log('pie chart pressed ' + index),
      },
      key: `pie-${index}`,
    }));

  return (
    <View style={{justifyContent: 'center'}}>
      <PieChart
        style={{height: 200}}
        outerRadius={'100%'}
        innerRadius={'60%'}
        data={pieData}
      />
      <Text
        onLayout={({
          nativeEvent: {
            layout: {width},
          },
        }) => {
          updateLabelWidth(width);
        }}
        style={{
          position: 'absolute',
          left: deviceWidth / 2 - labelWidth / 2,
          textAlign: 'center',
        }}>
        <Text style={{color: 'white', fontSize: 25}}>20{'\n'}</Text>
        <Text style={{color: 'white', fontSize: 15}}>transactions{'\n'}</Text>
        <Text style={{color: 'red', fontSize: 15, fontStyle: 'italic'}}>
          Spent: $175{'\n'}
        </Text>
        <Text style={{color: 'green', fontSize: 15, fontStyle: 'italic'}}>
          Left: $25
        </Text>
      </Text>
    </View>
  );
}
