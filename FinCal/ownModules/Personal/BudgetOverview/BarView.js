import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import BarChartEx from '../Components/BarChart.js';
import FloatActionButton from '../../FloatActionButton';
import {darkTheme, lightTheme} from '../../GlobalValues.js';
import {monthName} from '../../GlobalObject';
import FakeDataBar from '../FakeDataBar.js';

export default function BarView() {
  const localStyle = StyleSheet.create({
    breakdownStyle: {
      color: 'white',
      fontSize: 18,
      fontStyle: 'italic',
      marginLeft: 15,
    },

    tableHeadStyle1: {
      color: 'white',
      fontSize: 18,
      fontWeight: 'bold',
      fontStyle: 'italic',
      marginLeft: 15,
      flex: 3.5,
    },

    tableHeadStyle2: {
      color: 'white',
      fontSize: 18,
      fontWeight: 'bold',
      fontStyle: 'italic',
      flex: 1,
    },
  });

  return (
    <View>
      <BarChartEx />

      <Text style={localStyle.breakdownStyle}>Breakdown</Text>

      <View>
        {FakeDataBar.map((item, idx) => (
          <BarListItem data={item} key={idx} />
        ))}
      </View>
    </View>
  );
}

function BarListItem(props) {
  let data = props.data;

  const localStyle = StyleSheet.create({
    monthContainerStyle: {
      flex: 3.5,
      flexDirection: 'row',
      justifyContent: 'flex-start',
      marginLeft: 15,
    },

    monthTextStyle: {
      color: 'white',
      fontSize: 17,
      marginLeft: 7.5,
      paddingVertical: 7,
    },

    amtTextStyle: {
      color: 'white',
      fontSize: 17,
      flex: 1,
      paddingVertical: 7,
    },
  });

  let icon;
  if (data.tmp === 'more') {
    icon = <MaterialCommunityIcons name="chevron-up" color="red" size={26} />;
  } else if (data.tmp == 'less') {
    icon = (
      <MaterialCommunityIcons name="chevron-down" color="green" size={26} />
    );
  } else {
    icon = <MaterialCommunityIcons name="minus" color="grey" size={26} />;
  }

  return (
    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
      <View style={localStyle.monthContainerStyle}>
        <MaterialCommunityIcons name="rocket" color="white" size={26} />
        <Text style={localStyle.monthTextStyle}>{data.month}</Text>
      </View>

      <Text style={localStyle.amtTextStyle}>${data.amt}</Text>
      <Text style={localStyle.amtTextStyle}>{icon}</Text>
    </View>
  );
}