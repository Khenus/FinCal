import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  ScrollView,
  useWindowDimensions,
} from 'react-native';
import {Picker} from '@react-native-community/picker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {transCategory} from '../../GlobalObject';
import {darkTheme, lightTheme} from '../../GlobalValues.js';
import PieChartWithDynamicSlices from '../Components/PieChartWithDynamicSlices';
import FakeDataPie from '../FakeDataPie.js';

export default function PieView(props) {
  let currWidth = useWindowDimensions().width;

  let currUser = props.currUser;
  let monthlyTotal = props.monthlyTotal;

  console.log(props);

  console.log('inside pie view ' + JSON.stringify(monthlyTotal));

  let [pickOption, updatePickOption] = useState([0]);
  let [actualData, updateActualData] = useState([0]);

  let [selOption, updateSelOption] = useState('');
  let [selIdx, updateSelIdx] = useState(0);

  let [disVal, updateDisVal] = useState([0]);

  useEffect(() => {
    updateDisVal(actualData[selIdx]);
    console.log("actual data = " + actualData);
  }, [actualData, selIdx]);

  useEffect(() => {
    updatePickOption(props.pickerOption);
  }, [props.pickerOption]);

  useEffect(() => {
    updateActualData(props.actualData);
    console.log("ran");
  }, [props.actualData]);

  useEffect(() => {
    updateSelOption(props.pickerIni);
  }, [props.pickerIni]);

  useEffect(() => {
    updateSelIdx(props.iniIdx);
  }, [props.iniIdx]);

  useEffect(() => {
    console.log("disval");
    console.log(disVal);
  }, [disVal]);

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

    pickerWrap: {
      borderColor: 'grey',
      borderWidth: 1,
      borderRadius: 5,
      width: currWidth * 0.35,
      marginLeft: 12,
      // marginRight: currWidth * 0.55,
      marginBottom: 10,
    },

    dropDown: {
      backgroundColor: 'white',
      height: 30,
      paddingLeft: 10,
    },

    note: {
      marginLeft: 10,
      color: 'white', //Change this into color scheme for dynamic color change
      fontStyle: 'italic',
      // borderColor: 'yellow',
      // borderWidth: 1,
    },
  });

  return (
    <View>
      <View style={localStyle.pickerWrap}>
        <Picker
          onValueChange={(newSelMonth, newSelIdx) => {
            updateSelOption(newSelMonth);
            updateSelIdx(newSelIdx);
          }}
          selectedValue={selOption}
          style={localStyle.dropDown}
          mode="dropdown">
          {pickOption.map((currItem, idx) => (
            <Picker.Item key={idx} label={`${currItem}`} value={currItem} />
          ))}
        </Picker>
      </View>
      <Text style={localStyle.note}>
        *Pie Chart only shows spending breakdown
      </Text>

      <PieChartWithDynamicSlices currUser={currUser} disData={disVal} />

      <Text style={localStyle.breakdownStyle}>Full Breakdown</Text>

      <PieListHandler
        monthlyTotal={monthlyTotal[selIdx]}
        currMonth={disVal}
        type="Spending"
      />
      <PieListHandler
        monthlyTotal={monthlyTotal[selIdx]}
        currMonth={disVal}
        type="Earning"
      />
    </View>
  );
}

function PieListHandler(props) {
  let monthTotal = props.monthlyTotal;
  let currMonth = props.currMonth;
  let type = props.type;

  console.log('inside pie list handler ' + JSON.stringify(monthTotal));

  let [currTotal, updateCurrTotal] = useState({Spending: 0.0, Earning: 0.0});
  let [currData, updateCurrData] = useState([]);

  let [earnArr, updateEarnArr] = useState([]);
  let [spendArr, updateSpendArr] = useState([]);

  let [spendTotal, updateSpendTotal] = useState(0.0);
  let [earnTotal, updateEarnTotal] = useState(0.0);

  useEffect(() => {
    updateCurrTotal(monthTotal);
    console.log(
      'curr total updated with month total with value ' +
        JSON.stringify(monthTotal),
    );
  }, [monthTotal]);

  useEffect(() => {
    updateCurrData(currMonth);
  }, [currMonth]);

  useEffect(() => {
    updateSpendTotal(currTotal.Spending.toFixed(2));
    updateEarnTotal(currTotal.Earning.toFixed(2));
  }, [currTotal.Earning, currTotal.Spending]);

  useEffect(() => {
    console.log(currData.length);
    console.log(currData);
    if (currData.length > 0) {
      let tempSpendArr = [];
      let tempEarnArr = [];

      for (let i = 0; i < transCategory.length; i++) {
        tempSpendArr.push({Amount: 0.0, Percent: 0.0, catoIdx: 0});
        tempEarnArr.push({Amount: 0.0, Percent: 0.0, catoIdx: 0});
      }

      console.log("temp spend arr");
      console.log(tempSpendArr);

      let finalSpendArr = [];
      let finalEarnArr = [];

      for (let i = 0; i < currData.length; i++) {
        if (currData[i].Type === 'Spending') {
          let catoIdx = parseInt(currData[i].catIdx, 10);
          tempSpendArr[catoIdx].Amount += parseFloat(currData[i].Amount);
          tempSpendArr[catoIdx].catoIdx = catoIdx;
          tempSpendArr[catoIdx].Percent =
            (tempSpendArr[catoIdx].Amount / monthTotal[catoIdx]) * 100;
        } else {
          let catoIdx = parseInt(currData[i].catIdx, 10);
          // console.log(catoIdx);
          tempEarnArr[catoIdx].Amount += parseFloat(currData[i].Amount);
          tempEarnArr[catoIdx].catoIdx = catoIdx;
          tempEarnArr[catoIdx].Percent =
            (parseFloat(tempEarnArr[catoIdx].Amount) /
              parseFloat(monthTotal[catoIdx])) *
            100;
        }
      }

      for (let j = 0; j < transCategory.length; j++) {
        if (tempSpendArr[j].Amount !== 0.0) {
          finalSpendArr.push(tempSpendArr[j]);
        }

        if (tempEarnArr[j].Amount !== 0.0) {
          finalEarnArr.push(tempEarnArr[j]);
        }
      }

      updateSpendArr(finalSpendArr);
      updateEarnArr(finalEarnArr);
    }
  }, [currData, monthTotal]);

  const localStyle = StyleSheet.create({
    tableHeadStyle1: {
      color: 'white',
      fontSize: 18,
      fontWeight: 'bold',
      fontStyle: 'italic',
      marginLeft: 15,
      flex: 2,
    },

    tableHeadStyle2: {
      color: 'white',
      fontSize: 18,
      fontWeight: 'bold',
      fontStyle: 'italic',
      flex: 1,
    },

    headerBar: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
  });

  if (type === 'Spending') {
    return (
      <View>
        <View style={localStyle.headerBar}>
          <Text style={localStyle.tableHeadStyle1}>Total Spending</Text>
          <Text style={localStyle.tableHeadStyle2}>${spendTotal}</Text>
          <Text style={localStyle.tableHeadStyle2}>100%</Text>
        </View>

        {spendArr.map((item, idx) => (
          <PieListItem data={item} key={idx} />
        ))}
      </View>
    );
  } else {
    return (
      <View>
        <View style={localStyle.headerBar}>
          <Text style={localStyle.tableHeadStyle1}>Total Earning</Text>
          <Text style={localStyle.tableHeadStyle2}>${earnTotal}</Text>
          <Text style={localStyle.tableHeadStyle2}>100%</Text>
        </View>

        {earnArr.map((item, idx) => (
          <PieListItem data={item} key={idx} />
        ))}
      </View>
    );
  }
}

function PieListItem(props) {
  let data = props.data;

  const localStyle = StyleSheet.create({
    catContainerStyle: {
      flex: 2,
      flexDirection: 'row',
      justifyContent: 'flex-start',
      marginLeft: 15,
    },

    catTextStyle: {
      color: 'white',
      fontSize: 17,
      marginLeft: 7.5,
      paddingVertical: 7,
    },

    amtPctTextStyle: {
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

  return (
    <View style={localStyle.itemStyle}>
      <View style={localStyle.catContainerStyle}>
        <MaterialCommunityIcons name="rocket" color="white" size={26} />
        <Text style={localStyle.catTextStyle}>
          {transCategory[data.catoIdx]}
        </Text>
      </View>

      <Text style={localStyle.amtPctTextStyle}>${data.Amount.toFixed(2)}</Text>
      <Text style={localStyle.amtPctTextStyle}>{data.Percent}%</Text>
    </View>
  );
}
