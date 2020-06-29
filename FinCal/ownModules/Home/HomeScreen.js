import * as React from 'react';
import {View, Text, StyleSheet, useWindowDimensions} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {connect} from 'react-redux';

import moment from 'moment';

import {fetchTransact} from '../API';
import {darkTheme, lightTheme} from '../GlobalValues.js';

import FloatActionButton from '../FloatActionButton';
import PieChartWithDynamicSlices from '../Personal/PieChartWithDynamicSlices';
import TransactionList from '../Personal/TransactionList';

var name = 'Jake';
var currMonth = 'May 2020';

function HomeScreen(props) {

  navigation = useNavigation();

  let currHeight = useWindowDimensions().height;

  let [transactData, updateTransactData] = React.useState([]);
  let [themeDark, updateTheme] = React.useState(true);
  let [colorScheme, updateColorScheme] = React.useState(darkTheme);

  let currUser = props.currUser;
  let parentDarkTheme = currUser.themeIsDark === 'true';

  React.useEffect(() => {
    themeDark === true
      ? updateColorScheme(darkTheme)
      : updateColorScheme(lightTheme);
  }, [themeDark]);

  React.useEffect(() => {
    updateTheme(parentDarkTheme);
  }, [parentDarkTheme]);

  React.useEffect(() => {
    async function tempHandler() {
      let result = await fetchTransact(currUser.Email, currUser.uuid);
      if (typeof result === 'object') {
        updateTransactData(result);
      }
    }
    tempHandler();
  }, [currUser.Email, currUser.uuid]);

  async function updateData() {
    let result = await fetchTransact(currUser.Email, currUser.uuid);
    if (typeof result === 'object') {
      updateTransactData(result);
    }
  }

  const localStyle = StyleSheet.create({
    mainView: {
      flex: 1,
      backgroundColor: colorScheme.backCol,
      // borderColor: 'white',
      // borderWidth: 1,
    },

    header: {
      marginBottom: 10,
    },

    subHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },

    welcomeStyle: {
      color: colorScheme.textCol,
      fontSize: 25,
      fontWeight: 'bold',
      marginTop: 20,
      marginLeft: 15,
    },

    dateStyle: {
      color: colorScheme.textCol,
      fontSize: 20,
      marginLeft: 15,
      marginBottom: 10,
    },

    subtitleStyle: {
      color: colorScheme.textCol,
      fontSize: 18,
      fontWeight: 'bold',
      fontStyle: 'italic',
      marginLeft: 15,
    },

    viewDetails: {
      color: 'aquamarine',
      marginRight: 15,
    },

    transList: {
      flexGrow: 1,
      marginTop: 20,
      height: currHeight * 0.431,
      // borderColor: 'white',
      // borderWidth: 1,
    },

    toPay: {
      color: 'red',
      fontSize: 18,
      fontStyle: 'italic',
      marginLeft:15,
    },

    toRecv: {
      color: 'green',
      fontSize: 18,
      fontStyle: 'italic',
      marginLeft:15,
    },

  });

  return (
    <View style = {localStyle.mainView}>

      {/* WELCOME HEADER */}
      <View>
        <Text style = {localStyle.welcomeStyle}>Welcome back, {name}!</Text>
        <Text style={localStyle.dateStyle}>Today is {moment().format("Do MMMM YYYY, dddd")}</Text>
      </View>

      {/* MONTH OVERVIEW */}
      <View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between',marginBottom:10}}>
        <Text style={localStyle.subtitleStyle}>{currMonth} overview</Text>
          <Text
            style={localStyle.viewDetails}
            onPress={() => navigation.navigate("BudgetDetails")}>
            View details
          </Text>
        </View>
        <PieChartWithDynamicSlices />
        <Text />
      </View>

      {/* RECENT TRANSACTIONS */}
      <View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between',}}>
          <Text style={localStyle.subtitleStyle}>Recent transactions</Text>
          <Text
            style={localStyle.viewDetails}
            onPress={() => navigation.navigate("AllTransactions")}>
            View all
          </Text>
        </View>
        <TransactionList dataArr={transactData} num="3" />
        <Text />
      </View>

      {/* LEGDER SUMMARY  */}
      <View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between',}}>
          <Text style={localStyle.subtitleStyle}>Ledger summary</Text>
          <Text
            style={localStyle.viewDetails}
            onPress={() => navigation.navigate("LedgerSummary")}>
            View all
          </Text>
        </View>
        <Text style={localStyle.toPay}>To pay:</Text>
        <Text style={localStyle.toRecv}>To receive:</Text>
      </View>

      <FloatActionButton />

    </View>
  );
}

const mapStateToProps = (state) => {
  return {
    currUser: state.currUser,
  };
};

export default connect(mapStateToProps)(HomeScreen);
