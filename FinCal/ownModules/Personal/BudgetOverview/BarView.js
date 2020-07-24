import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import BarChartEx from '../Components/BarChart.js';
// import {darkTheme, lightTheme} from '../../GlobalValues.js';
import {monthName, barGraphCol} from '../../GlobalObject';

export default function BarView(props) {
  let currWidth = useWindowDimensions().width;

  let oriIdx = props.oriIdx;
  let monthTotal = props.monthlyTotal;

  const xAxisFontSize = 15;

  let [spendingSelected, updateSpendingSelected] = useState(true);
  let [barData, updateBarData] = useState([]);
  let [disData, updateDisData] = useState([]);

  useEffect(() => {
    if (monthTotal !== undefined && oriIdx !== undefined) {
      if (spendingSelected) {
        let tempData = [];
        let tempBarChartData = [];

        for (let i = 0; i < monthTotal.length; i++) {
          let tempObj = {Month: '', Amount: 0.0, CmpToPrev: 'same'};

          if (i !== monthTotal.length - 1) {
            if (monthTotal[i].Spending > monthTotal[i + 1].Spending) {
              tempObj.CmpToPrev = 'more';
            } else if (monthTotal[i].Spending < monthTotal[i + 1].Spending) {
              tempObj.CmpToPrev = 'less';
            } else {
              tempObj.CmpToPrev = 'same';
            }
          }

          tempObj.Month = monthName[oriIdx[i]];
          tempObj.Amount = monthTotal[i].Spending;

          tempData.push(tempObj);
          tempBarChartData.push({
            value: monthTotal[i].Spending,
            svg: {fill: barGraphCol[i], fontSize: xAxisFontSize},
          });
        }

        updateDisData(tempData);
        updateBarData(tempBarChartData);
      } else {
        let tempData = [];
        let tempBarChartData = [];

        for (let i = 0; i < monthTotal.length; i++) {
          let tempObj = {Month: '', Amount: 0.0, CmpToPrev: 'same'};

          if (i !== monthTotal.length - 1) {
            if (monthTotal[i].Earning > monthTotal[i + 1].Earning) {
              tempObj.CmpToPrev = 'more';
            } else if (monthTotal[i].Earning < monthTotal[i + 1].Earning) {
              tempObj.CmpToPrev = 'less';
            } else {
              tempObj.CmpToPrev = 'same';
            }
          }

          tempObj.Month = monthName[oriIdx[i]];
          tempObj.Amount = monthTotal[i].Earning;

          tempData.push(tempObj);
          tempBarChartData.push({
            value: monthTotal[i].Earning,
            svg: {fill: barGraphCol[i], fontSize: xAxisFontSize},
          });
        }

        updateDisData(tempData);
        updateBarData(tempBarChartData);
      }
    }
  }, [monthTotal, oriIdx, spendingSelected]);

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

    selectorBar: {
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
      margin: 15,
    },

    spending: {
      borderRadius: 10,
      borderWidth: 2,
      borderColor: spendingSelected === true ? 'yellow' : 'white',
      width: currWidth * 0.4,
      height: 30,
      // backgroundColor: 'grey',
      justifyContent: 'center',
      alignItems: 'center',
    },

    spendingText: {
      color: spendingSelected === true ? 'yellow' : 'white',
      fontSize: 17,
    },

    earning: {
      borderRadius: 10,
      borderWidth: 2,
      borderColor: spendingSelected === true ? 'white' : 'yellow',
      width: currWidth * 0.4,
      height: 30,
      // backgroundColor: 'grey',
      justifyContent: 'center',
      alignItems: 'center',
    },

    earningText: {
      color: spendingSelected === true ? 'white' : 'yellow',
      fontSize: 17,
    },

    middleGap: {
      width: 20,
    },
  });

  function spendingClicked() {
    updateSpendingSelected(true);
  }

  function earningClicked() {
    updateSpendingSelected(false);
  }

  return (
    <View>
      <View style={localStyle.selectorBar}>
        <TouchableOpacity style={localStyle.spending} onPress={spendingClicked}>
          <Text style={localStyle.spendingText}>Spending</Text>
        </TouchableOpacity>

        <View style={localStyle.middleGap} />
        <TouchableOpacity style={localStyle.earning} onPress={earningClicked}>
          <Text style={localStyle.earningText}>Earning</Text>
        </TouchableOpacity>
      </View>

      <BarChartEx barData={barData} oriIdx={oriIdx} />

      <Text style={localStyle.breakdownStyle}>Breakdown</Text>

      <View>
        {disData.map((item, idx) => (
          <BarListItem
            data={item}
            key={idx}
            spendingSelected={spendingSelected}
          />
        ))}
      </View>
    </View>
  );
}

function BarListItem(props) {
  let data = props.data;
  let spendingSelected = props.spendingSelected;

  const localStyle = StyleSheet.create({
    monthContainerStyle: {
      flex: 3,
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

    itemStyle: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
  });

  let icon;
  if (spendingSelected === true) {
    if (data.CmpToPrev === 'more') {
      icon = <MaterialCommunityIcons name="chevron-up" color="red" size={26} />;
    } else if (data.CmpToPrev === 'less') {
      icon = (
        <MaterialCommunityIcons name="chevron-down" color="green" size={26} />
      );
    } else {
      icon = <MaterialCommunityIcons name="minus" color="grey" size={26} />;
    }
  } else {
    if (data.CmpToPrev === 'more') {
      icon = (
        <MaterialCommunityIcons name="chevron-up" color="green" size={26} />
      );
    } else if (data.CmpToPrev === 'less') {
      icon = (
        <MaterialCommunityIcons name="chevron-down" color="red" size={26} />
      );
    } else {
      icon = <MaterialCommunityIcons name="minus" color="grey" size={26} />;
    }
  }

  return (
    <View style={localStyle.itemStyle}>
      <View style={localStyle.monthContainerStyle}>
        <MaterialCommunityIcons name="rocket" color="white" size={26} />
        <Text style={localStyle.monthTextStyle}>{data.Month}</Text>
      </View>

      <Text style={localStyle.amtTextStyle}>${data.Amount.toFixed(2)}</Text>
      <Text style={localStyle.amtTextStyle}>{icon}</Text>
    </View>
  );
}
