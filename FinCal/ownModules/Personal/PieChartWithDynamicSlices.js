/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {View, Text, Dimensions} from 'react-native';

import {PieChart} from 'react-native-svg-charts';

class PieChartWithDynamicSlices extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selectedSlice: {
        label: '',
        value: 0,
      },
      labelWidth: 0,
    };
  }

  render() {
    const {labelWidth, selectedSlice} = this.state;
    //   const { label, value } = selectedSlice;
    //   const keys = ['Food', 'Transport', 'Bills', 'Leisure', 'Misc'];
    const values = [25, 25, 12.5, 12.5, 12.5, 12.5];
    const colors = ['#FF6961', '#FFB347', '#77DD77', '#87CEFA', '#B19CD9', 'grey'];

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

    const deviceWidth = Dimensions.get('window').width;

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
            this.setState({labelWidth: width});
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
}

export default PieChartWithDynamicSlices;
