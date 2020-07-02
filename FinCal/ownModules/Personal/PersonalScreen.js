import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, useWindowDimensions} from 'react-native';
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

  let [transactData, updateTransactData] = useState([]);
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
      console.log(result);
      if (typeof result === 'object') {
        updateTransactData(result);
      }
    }

    tempHandler();
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
  });

  async function updateData() {
    let result = await fetchTransact(currUser.Email, currUser.uuid, numMonths);
    console.log(result);
    if (typeof result === 'object') {
      updateTransactData(result);
    }
  }

  function toBudgetDetails() {
    navigation.navigate('BudgetDetails');
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
        <PieChartWithDynamicSlices currUser={currUser} />
      </View>

      {/* Transaction List */}
      <View style={localStyle.transList}>
        <View style={localStyle.subHeader}>
          <Text style={localStyle.subtitleStyle}>Latest Transactions</Text>
          <Text style={localStyle.viewDetails} onPress={toAllTransact}>
            View All
          </Text>
        </View>

        <TransactionList dataArr={transactData} num={5} themeDark={themeDark} />
      </View>

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
