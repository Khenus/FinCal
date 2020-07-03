/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {View, Text, Dimensions, ActivityIndicator} from 'react-native';

import {PieChart} from 'react-native-svg-charts';
import {transCategory, pieChartCols} from '../../GlobalObject';
import {getThisMonthTransact} from '../../API';

import {darkTheme, lightTheme} from '../../GlobalValues.js';

export default function PieChartWithDynamicSlices(props) {
  let deviceWidth = Dimensions.get('window').width;

  let currUser = props.currUser;

  let [isLoading, updateIsLoading] = useState(true);

  let [themeDark, updateTheme] = useState(true);
  let [colorScheme, updateColorScheme] = useState(darkTheme);

  let parentDarkTheme = currUser.themeIsDark === 'true';

  useEffect(() => {
    themeDark === true
      ? updateColorScheme(darkTheme)
      : updateColorScheme(lightTheme);
  }, [themeDark]);

  useEffect(() => {
    updateTheme(parentDarkTheme);
  }, [parentDarkTheme]);

  // let [selectedSlice, updateSelectedSlice] = useState({label: '', value: 0});
  let [labelWidth, updateLabelWidth] = useState(0);

  let [numTransact, updateNumTransact] = useState(0);
  let [spending, updateSpending] = useState(0.0);
  let [earning, updateEarning] = useState(0.0);
  let [disVal, updateDisVal] = useState([0.0]);

  // const colors = ['#FF6961', '#FFB347', '#77DD77', '#87CEFA', '#B19CD9'];

  useEffect(() => {
    async function tempHandler() {
      updateIsLoading(true);
      // let result = await getThisMonthTransact(currUser.Email, currUser.uuid);
      let result = props.disData;

      if (typeof result === 'object') {
        let tempSpending = 0.0;
        let tempEarning = 0.0;
        let tempSliceArr = new Array(transCategory.length);

        for (let i = 0; i < transCategory.length; i++) {
          tempSliceArr[i] = 0.0;
        }

        for (let i = 0; i < result.length; i++) {
          let currAmt = parseFloat(result[i].Amount, 10);
          if (result[i].Type === 'Spending') {
            tempSpending += currAmt;
            tempSliceArr[parseFloat(result[i].catIdx, 10)] += currAmt;
          } else {
            tempEarning += currAmt;
          }
        }

        updateNumTransact(result.length);
        updateDisVal(tempSliceArr);
        updateSpending(tempSpending);
        updateEarning(tempEarning);
      }

      updateIsLoading(false);
    }
    tempHandler();
  }, [props.disData]);

  // useEffect(() => {
  //   console.log(disVal);
  // }, [disVal]);

  const pieData = disVal
    .filter((value) => value > 0)
    .map((value, index) => ({
      value,
      svg: {
        fill: pieChartCols[index],
        onPress: () => console.log('pie chart pressed ' + index),
      },
      key: `pie-${index}`,
    }));

  if (isLoading) {
    return (
      <View style={{justifyContent: 'center', height: 200}}>
        <ActivityIndicator size="small" color={colorScheme.textCol} />
      </View>
    );
  } else {
    return (
      <View style={{alignItem: 'center', justifyContent: 'center'}}>
        <PieChart
          style={{height: 250}}
          outerRadius={'90%'}
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
          <Text style={{color: 'white', fontSize: 25}}>
            {numTransact}
            {'\n'}
          </Text>
          <Text style={{color: 'white', fontSize: 15}}>transactions{'\n'}</Text>
          <Text style={{color: 'red', fontSize: 15, fontStyle: 'italic'}}>
            Spent: ${spending.toFixed(2)} {'\n'}
          </Text>
          <Text style={{color: 'green', fontSize: 15, fontStyle: 'italic'}}>
            Left: ${(earning - spending).toFixed(2)}
          </Text>
        </Text>
      </View>
    );
  }
}
