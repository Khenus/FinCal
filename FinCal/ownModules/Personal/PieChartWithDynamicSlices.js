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
    const values = [15, 25, 35, 45, 55];
    const colors = ['#FF6961', '#FFB347', '#77DD77', '#87CEFA', '#B19CD9'];

    const pieData = values
      .filter((value) => value > 0)
      .map((value, index) => ({
        value,
        svg: {
          fill: colors[index],
          onPress: () => alert('hi'),
        },
        key: `pie-${index}`,
      }));

    //   const data = keys.map((key, index) => {
    //       return {
    //         key,
    //         value: values[index],
    //         svg: { fill: colors[index] },
    //         arc: { outerRadius: (70 + values[index]) + '%', padAngle: label === key ? 0.1 : 0 },
    //         onPress: () => this.setState({ selectedSlice: { label: key, value: values[index] } })
    //       }
    //     })
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

// class PieChartExample extends React.PureComponent {
//     render() {
//         const data = [45, 10, 10, 20, 15]

//         const colors = ['#FF6961','#FFB347','#77DD77','#87CEFA','#B19CD9']
//         // const randomColor = () => ('#' + ((Math.random() * 0xffffff) << 0).toString(16) + '000000').slice(0, 7)

// const pieData = data
//     .filter((value) => value > 0)
//     .map((value, index) => ({
//         value,
//         svg: {
//             fill: colors[index],
//             onPress: () => alert('hi'),
//         },
//         key: `pie-${index}`,
//     }))

//         return <PieChart style={{ height:200 }} data={pieData} />
//     }
// }

export default PieChartWithDynamicSlices;
