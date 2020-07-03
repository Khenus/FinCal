import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  useWindowDimensions,
} from 'react-native';
import {Picker} from '@react-native-community/picker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {transCategory} from '../../GlobalObject';
// import {darkTheme, lightTheme} from '../../GlobalValues.js'; //Add this in when we need to change theme
import PieChartWithDynamicSlices from '../Components/PieChartWithDynamicSlices';

export default function PieView(props) {
  let currWidth = useWindowDimensions().width;

  let currUser = props.currUser;
  let iniIdx = props.iniIdx;
  let monthlyTotal = props.monthlyTotal;
  let pickerIni = props.pickerIni;
  let pickerOption = props.pickerOption;
  let actualData = props.actualData;

  let [selOption, updateSelOption] = useState('');
  let [selIdx, updateSelIdx] = useState(0);

  useEffect(() => {
    updateSelOption(pickerIni);
  }, [pickerIni]);

  useEffect(() => {
    updateSelIdx(iniIdx);
  }, [iniIdx]);

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

    padding: {
      height: 20,
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
          {pickerOption.map((currItem, idx) => (
            <Picker.Item key={idx} label={`${currItem}`} value={currItem} />
          ))}
        </Picker>
      </View>
      <Text style={localStyle.note}>
        *Pie Chart only shows spending breakdown
      </Text>

      <PieChartWithDynamicSlices
        currUser={currUser}
        disData={actualData[selIdx]}
      />

      <Text style={localStyle.breakdownStyle}>Full Breakdown</Text>

      <PieListHandler
        monthlyTotal={monthlyTotal[selIdx]}
        currMonthData={actualData[selIdx]}
        type="Spending"
      />

      <View style={localStyle.padding} />

      <PieListHandler
        monthlyTotal={monthlyTotal[selIdx]}
        currMonthData={actualData[selIdx]}
        type="Earning"
      />
    </View>
  );
}

function PieListHandler(props) {
  // useEffect(() => {
  //   console.log('Curr Month Data');
  //   console.log(props.currMonthData);
  // }, [props.currMonthData]);

  // useEffect(() => {
  //   console.log('Curr Month Total value');
  //   console.log(props.monthlyTotal);
  // }, [props.monthlyTotal]);

  let currData = props.currMonthData;
  let monthTotal = props.monthlyTotal;
  let type = props.type;

  let [currTotal, updateCurrTotal] = useState(0.0);
  let [currDataCompressed, updateCurrDataCompressed] = useState([]);

  useEffect(() => {
    if (type === 'Spending') {
      updateCurrTotal(monthTotal.Spending);
    } else {
      updateCurrTotal(monthTotal.Earning);
    }
  }, [monthTotal, type]);

  useEffect(() => {
    if (
      currData !== undefined &&
      transCategory !== undefined &&
      monthTotal !== undefined
    ) {
      let tempArr = [];
      let compressedArr = [];

      for (let i = 0; i < transCategory.length; i++) {
        tempArr.push({Amount: 0.0, Percent: 0.0, catoIdx: 0});
      }

      for (let i = 0; i < currData.length; i++) {
        if (currData[i].Type === type) {
          let catoIdx = parseInt(currData[i].catIdx, 10);
          tempArr[catoIdx].Amount += parseFloat(currData[i].Amount);
          tempArr[catoIdx].catoIdx = catoIdx;
          tempArr[catoIdx].Percent =
            (parseFloat(tempArr[catoIdx].Amount) / parseFloat(currTotal)) * 100;
        }
      }

      for (let j = 0; j < transCategory.length; j++) {
        if (tempArr[j].Amount !== 0.0) {
          compressedArr.push(tempArr[j]);
        }
      }

      // console.log(tempArr);
      // console.log(compressedArr);
      updateCurrDataCompressed(compressedArr);
    }
  }, [currData, currTotal, monthTotal, type]);

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

  return (
    <View>
      <View style={localStyle.headerBar}>
        <Text style={localStyle.tableHeadStyle1}>Total {type}</Text>
        <Text style={localStyle.tableHeadStyle2}>${currTotal.toFixed(2)}</Text>
        <Text style={localStyle.tableHeadStyle2}>100%</Text>
      </View>

      {currDataCompressed.map((item, idx) => (
        <PieListItem data={item} key={idx} />
      ))}
    </View>
  );
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

    loading: {
      justifyContent: 'center',
      height: 200,
    },
  });

  if (data.Amount === undefined || data.Percent === undefined) {
    return (
      <View style={localStyle.loading}>
        <ActivityIndicator size="small" color="white" />
      </View>
    );
  } else {
    return (
      <View style={localStyle.itemStyle}>
        <View style={localStyle.catContainerStyle}>
          <MaterialCommunityIcons name="rocket" color="white" size={26} />
          <Text style={localStyle.catTextStyle}>
            {transCategory[data.catoIdx]}
          </Text>
        </View>

        <Text style={localStyle.amtPctTextStyle}>
          ${data.Amount.toFixed(2)}
        </Text>
        <Text style={localStyle.amtPctTextStyle}>
          {data.Percent.toFixed(2)}%
        </Text>
      </View>
    );
  }
}
