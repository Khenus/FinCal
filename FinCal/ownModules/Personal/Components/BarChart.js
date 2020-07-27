import React from 'react';
import {View, StyleSheet} from 'react-native';
import {BarChart, XAxis} from 'react-native-svg-charts';
import {monthName} from '../../GlobalObject';

export default function BarChartEx(props) {
  let data = props.barData;
  let oriIdx = props.oriIdx;

  const localStyle = StyleSheet.create({
    mainView: {
      height: 200,
    },

    barStyle: {
      flex: 1,
    },

    xaxisStyle: {
      marginHorizontal: 20,
      marginTop: 5,
    },
  });

  return (
    <View style={localStyle.mainView}>
      <BarChart
        style={localStyle.barStyle}
        data={data}
        gridMin={0}
        svg={{fill: 'WHITE'}}
        contentInset={{top: 10}}
        yAccessor={({item}) => item.value}
        spacingInner={0.5}
        spacingOuter={0.25}
      />
      <XAxis
        style={localStyle.xaxisStyle}
        data={data}
        formatLabel={(idx) => monthName[oriIdx[idx]]}
        contentInset={{left: 20, right: 20}}
        svg={{fontSize: 15, fill: 'white'}}
        //    spacingInner={0.5}
        //    spacingOuter={0.5}
      />
    </View>
  );
}
