import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/MaterialIcons';

import FloatActionButton from '../FloatActionButton';
import {darkTheme, lightTheme} from '../GlobalValues.js';
import {monthName} from '../GlobalObject';
import PieView from './BudgetOverview/PieView';
import BarView from './BudgetOverview/BarView';

function BudgetDetails(props) {
  let navigation = props.navigation;
  let currUser = props.currUser;
  let extra = props.route.params;

  let [currMonthIdx] = useState(extra.currMonthIdx);
  let [yearArray] = useState(extra.yearArr);
  let [sortedMonthArr] = useState(extra.sortedMonthArr);

  let [comMonthIdx, updateComMonthIdx] = useState(0);
  let [comMonth, updateComMonth] = useState('');
  let [comPickerVal, updateComPickerVal] = useState([]);
  let [comDataArr, updateComDataArr] = useState([]);
  let [originalIdx, updateOriginalIdx] = useState([]);
  let [monthTotal, updateMonthTotal] = useState([
    {Spending: 0.0, Earning: 0.0},
  ]);

  useEffect(() => {
    function tempHandler() {
      let tempPicker = [];
      let tempData = [];
      let tempOriginalIdx = [];
      let tempMonthTotal = [];

      for (let i = 0; i < yearArray.length; i++) {
        if (yearArray[i] > 0) {
          if (currMonthIdx === i) {
            updateComMonth(`${monthName[i]} ${yearArray[i]}`);
            updateComMonthIdx(tempPicker.length);
          }

          tempPicker.push(`${monthName[i]} ${yearArray[i]}`);
          tempData.push(sortedMonthArr[i]);
          tempOriginalIdx.push(i);
        }
      }

      for (let j = 0; j < tempData.length; j++) {
        let tempSpending = 0.0;
        let tempEarning = 0.0;
        for (let k = 0; k < tempData[j].length; k++) {
          if (tempData[j][k].Type === 'Spending') {
            tempSpending += parseFloat(tempData[j][k].Amount);
          } else {
            tempEarning += parseFloat(tempData[j][k].Amount);
          }
        }
        tempMonthTotal.push({Spending: tempSpending, Earning: tempEarning});
      }

      updateComPickerVal(tempPicker);
      updateComDataArr(tempData);
      updateOriginalIdx(tempOriginalIdx);
      updateMonthTotal(tempMonthTotal);
    }
    tempHandler();
  }, [currMonthIdx, sortedMonthArr, yearArray]);

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

  let [pieColor, updatePieColor] = useState('yellow');
  let [barColor, updateBarColor] = useState('white');
  let [view, updateView] = useState(true);

  const localStyle = StyleSheet.create({
    mainView: {
      flex: 1,
      backgroundColor: '#121212',
    },

    header: {
      marginBottom: 10,
    },

    subHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },

    back: {
      color: 'aquamarine',
      marginLeft: 15,
      fontStyle: 'italic',
    },

    subtitleStyle: {
      color: colorScheme.textCol,
      fontSize: 18,
      fontWeight: 'bold',
      fontStyle: 'italic',
      marginLeft: 15,
    },

    monthStyle: {
      color: 'aquamarine',
      fontSize: 18,
      fontWeight: 'bold',
      marginLeft: 15,
    },

    welcomeStyle: {
      color: colorScheme.textCol,
      fontSize: 25,
      fontWeight: 'bold',
      marginLeft: 15,
    },

    logoView: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      marginRight: 15,
    },

    pieIconStyle: {
      borderColor: pieColor,
      borderWidth: 1,
      borderRadius: 5,
      padding: 2.5,
      marginRight: 5,
    },

    barIconStyle: {
      borderColor: barColor,
      borderWidth: 1,
      borderRadius: 5,
      padding: 2.5,
      marginLeft: 5,
    },

    headerBar: {
      flexDirection: 'row',
      paddingLeft: 14,
      height: 60,
      alignItems: 'center',
      backgroundColor: colorScheme.backCol,
    },

    headerPadding: {
      flex: 1,
    },

    text: {
      color: colorScheme.textCol,
    },
  });

  function handlePiePress() {
    updatePieColor('yellow');
    updateBarColor('white');
    updateView(true);
  }

  function handleBarPress() {
    updatePieColor('white');
    updateBarColor('yellow');
    updateView(false);
  }

  function back() {
    navigation.pop(1);
  }

  let stuffToDisplay;
  if (view === true) {
    stuffToDisplay = (
      <PieView
        currUser={currUser}
        iniIdx={comMonthIdx}
        monthlyTotal={monthTotal}
        pickerIni={comMonth}
        pickerOption={comPickerVal}
        actualData={comDataArr}
      />
    );
  } else {
    stuffToDisplay = <BarView oriIdx={originalIdx} monthlyTotal={monthTotal} />;
  }

  return (
    <View style={localStyle.mainView}>
      <View style={localStyle.headerBar}>
        <TouchableOpacity onPress={back}>
          <Icon name="arrow-back" size={25} style={localStyle.text} />
        </TouchableOpacity>
        <View style={localStyle.headerPadding} />
      </View>

      <ScrollView>
        <View style={localStyle.header}>
          <Text style={localStyle.welcomeStyle}>Your personal finances.</Text>
        </View>

        <View style={localStyle.subHeader}>
          <Text style={localStyle.subtitleStyle}>Budget Overview</Text>
          <View style={localStyle.logoView}>
            <MaterialCommunityIcons
              name="chart-pie"
              color={pieColor}
              size={25}
              style={localStyle.pieIconStyle}
              onPress={() => handlePiePress()}
            />
            <MaterialCommunityIcons
              name="poll"
              color={barColor}
              size={25}
              style={localStyle.barIconStyle}
              onPress={() => handleBarPress()}
            />
          </View>
        </View>

        {/* Cond rendering for pie/bar view */}
        {stuffToDisplay}
      </ScrollView>
      <FloatActionButton
        currUser={currUser}
        pullTransact={props.route.params.pullTransactRef}
      />
    </View>
  );
}

const mapStateToProps = (state) => {
  return {
    currUser: state.currUser,
  };
};

export default connect(mapStateToProps)(BudgetDetails);
