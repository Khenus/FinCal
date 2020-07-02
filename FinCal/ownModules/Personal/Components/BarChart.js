import * as React from 'react';
import {View, StyleSheet} from 'react-native';
import {BarChart, XAxis} from 'react-native-svg-charts';

const month = 'Jan';

class BarChartEx extends React.PureComponent {
  localStyle = StyleSheet.create({
    mainView: {
      height: 200,
      //   padding: 10,
      //   borderColor: 'white',
      //   borderWidth: 1,
    },

    barStyle: {
      flex: 1,
    },

    xaxisStyle: {
      marginHorizontal: 20,
      marginTop: 5,
      // borderColor:'lightblue',
      // borderWidth:1,
      // textAlign:'center',
    },
  });

  render() {
    // TODO: replace w data pulled from backend
    const data = [
      {value: 230, svg: {fill: '#FF6961', fontSize: 15}},
      {value: 500, svg: {fill: '#FDFD96', fontSize: 15}},
      {value: 380, svg: {fill: '#77DD77', fontSize: 15}},
      {value: 470, svg: {fill: '#87CEFA', fontSize: 15}},
      {value: 190, svg: {fill: '#B19CD9', fontSize: 15}},
    ];

    return (
      <View style={this.localStyle.mainView}>
        <BarChart
          style={this.localStyle.barStyle}
          data={data}
          gridMin={0}
          svg={{fill: 'WHITE'}}
          contentInset={{top: 10}}
          yAccessor={({item}) => item.value}
          spacingInner={0.5}
          spacingOuter={0.25}
        />
        <XAxis
          style={this.localStyle.xaxisStyle}
          data={data}
          formatLabel={() => month}
          contentInset={{left: 20, right: 20}}
          svg={{fontSize: 15, fill: 'white'}}
          //    spacingInner={0.5}
          //    spacingOuter={0.5}
        />
      </View>
    );
  }
}

export default BarChartEx;
