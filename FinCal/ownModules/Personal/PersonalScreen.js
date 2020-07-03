import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  useWindowDimensions,
} from 'react-native';
import {connect} from 'react-redux';

import FloatActionButton from '../FloatActionButton';
import PieChartWithDynamicSlices from './Components/PieChartWithDynamicSlices';

import TransactionList from './Components/TransactionList.js';
import {fetchTransact} from '../API';
import {darkTheme, lightTheme} from '../GlobalValues.js';

function PersonalScreen(props) {
  let currHeight = useWindowDimensions().height;

  const numMonths = 5;
  let navigation = props.navigation;

  let [yearArr, updateYearArr] = useState(new Array(12).fill(0));
  let [currMonthIdx, updateCurrMonthIdx] = useState(0);
  let [transactData, updateTransactData] = useState([]);
  let [monthlyTransactData, updateMonthlyTransactData] = useState([]);
  let [themeDark, updateTheme] = useState(true);
  let [colorScheme, updateColorScheme] = useState(darkTheme);

  let currUser = props.currUser;
  let parentDarkTheme = currUser.themeIsDark === 'true';

  useEffect(() => {
    themeDark === true
      ? updateColorScheme(darkTheme)
      : updateColorScheme(lightTheme);
  }, [themeDark]);

  useEffect(() => {
    updateTheme(parentDarkTheme);
  }, [parentDarkTheme]);

  useEffect(() => {
    async function tempHandler() {
      let result = await fetchTransact(
        currUser.Email,
        currUser.uuid,
        numMonths,
      );

      if (typeof result === 'object') {
        //Updating trasaction data for the recent trasaction
        updateTransactData(result);

        //Updated trasaction data sorted by month
        let tempArr = [];
        let tempYearArr = [];
        for (let j = 0; j < 12; j++) {
          tempArr.push([]);
          tempYearArr.push(0);
        }

        for (let i = 0; i < result.length; i++) {
          let currUnix = parseInt(result[i].createdAtUnix, 10) * 1000;
          let tempMonth = new Date(currUnix).getMonth();
          tempArr[tempMonth].push(result[i]);
          tempYearArr[tempMonth] = new Date(currUnix).getFullYear();
        }

        updateMonthlyTransactData(tempArr);
        updateYearArr(tempYearArr);
      }
    }
    tempHandler();

    //Updating current date index
    updateCurrMonthIdx(new Date().getMonth());
  }, [currUser.Email, currUser.uuid, numMonths]);

  const localStyle = StyleSheet.create({
    mainView: {
      flex: 1,
      backgroundColor: colorScheme.backCol,
    },

    header: {
      marginBottom: 10,
    },

    subHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },

    viewDetails: {
      color: 'aquamarine',
      marginRight: 15,
    },

    subtitleStyle: {
      color: colorScheme.textCol,
      fontSize: 18,
      fontWeight: 'bold',
      fontStyle: 'italic',
      marginLeft: 15,
    },

    welcomeStyle: {
      color: colorScheme.textCol,
      fontSize: 25,
      fontWeight: 'bold',
      //backgroundColor: 'grey',
      marginTop: 20,
      marginLeft: 15,
    },

    transList: {
      flexGrow: 1,
      marginTop: 20,
      height: currHeight * 0.431,
      // borderColor: 'white',
      // borderWidth: 1,
    },

    piePadding: {
      height: 10,
    },
  });

  async function updateData() {
    let result = await fetchTransact(currUser.Email, currUser.uuid, numMonths);

    if (typeof result === 'object') {
      //Updating trasaction data for the recent trasaction
      updateTransactData(result);

      //Updated trasaction data sorted by month
      let tempArr = [];
      let tempYearArr = [];
      for (let j = 0; j < 12; j++) {
        tempArr.push([]);
        tempYearArr.push(0);
      }

      for (let i = 0; i < result.length; i++) {
        let currUnix = parseInt(result[i].createdAtUnix, 10) * 1000;
        let tempMonth = new Date(currUnix).getMonth();
        tempArr[tempMonth].push(result[i]);
        tempYearArr[tempMonth] = new Date(currUnix).getFullYear();
      }

      updateMonthlyTransactData(tempArr);
      updateYearArr(tempYearArr);
    }
  }

  function toBudgetDetails() {
    navigation.navigate('BudgetDetails', {
      currMonthIdx: currMonthIdx,
      yearArr: yearArr,
      sortedMonthArr: monthlyTransactData,
      pullTransactRef: updateData,
    });
  }

  function toAllTransact() {
    navigation.navigate('AllTransactions', {
      transactData: transactData,
      pullTransactRef: updateData,
    });
  }

  return (
    <View style={localStyle.mainView}>
      {/* Header text */}
      <ScrollView>
        <View style={localStyle.header}>
          <Text style={localStyle.welcomeStyle}>Your personal finances.</Text>
        </View>

        {/* Budget breakdown */}
        <View>
          <View style={localStyle.subHeader}>
            <Text style={localStyle.subtitleStyle}>Budget Overview</Text>
            <Text style={localStyle.viewDetails} onPress={toBudgetDetails}>
              View Details
            </Text>
          </View>

          {/* Add this into pie chart component disData={sorteddata} */}
          <View style={localStyle.piePadding} />
          <PieChartWithDynamicSlices
            currUser={currUser}
            disData={monthlyTransactData[currMonthIdx]}
          />
          <View style={localStyle.piePadding} />
        </View>

        {/* Transaction List */}
        <View style={localStyle.transList}>
          <View style={localStyle.subHeader}>
            <Text style={localStyle.subtitleStyle}>Latest Transactions</Text>
            <Text style={localStyle.viewDetails} onPress={toAllTransact}>
              View All
            </Text>
          </View>

          <TransactionList
            dataArr={transactData}
            num={5}
            themeDark={themeDark}
          />
        </View>
      </ScrollView>
      <FloatActionButton currUser={currUser} pullTransact={updateData} />
    </View>
  );
}

const mapStateToProps = (state) => {
  return {
    currUser: state.currUser,
  };
};

export default connect(mapStateToProps)(PersonalScreen);
