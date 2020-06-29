import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, useWindowDimensions, Button} from 'react-native';
import {connect} from 'react-redux';

import FloatActionButton from '../FloatActionButton';
import PieChartWithDynamicSlices from './PieChartWithDynamicSlices';

import TransactionList from './TransactionList.js';
import {fetchTransact} from '../API';
import {darkTheme, lightTheme} from '../GlobalValues.js';

import JioPortalScreen from '../FoodJio/JioOverviewScreen';
import {useNavigation} from '@react-navigation/native';

function PersonalScreen(props) {

  navigation = useNavigation();

  let currHeight = useWindowDimensions().height;

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
      let result = await fetchTransact(currUser.Email, currUser.uuid);
      if (typeof result === 'object') {
        updateTransactData(result);
      }
    }

    tempHandler();
  }, [currUser.Email, currUser.uuid]);

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
    let result = await fetchTransact(currUser.Email, currUser.uuid);
    if (typeof result === 'object') {
      updateTransactData(result);
    }
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
          <Text
            style={localStyle.viewDetails}
            onPress={() => navigation.navigate("BudgetDetails")}>
            View details
          </Text>
        </View>

        <PieChartWithDynamicSlices />
      </View>

      {/* Transaction List */}
      <View style={localStyle.transList}>
        <View style={localStyle.subHeader}>
          <Text style={localStyle.subtitleStyle}>Latest Transactions</Text>
          <Text
            style={localStyle.viewDetails}
            onPress={() => navigation.navigate("AllTransactions")}>
            View all
          </Text>
        </View>
        <TransactionList dataArr={transactData} num="5" />
      </View>

      <FloatActionButton currUser={currUser} pullTransact={updateData} />

      {/* TEMP, REMOVE LATER */}
      <Button
            title="Go to Food Jio Overview"
            onPress={() => navigation.navigate("JioPortalScreen")}
      />

    </View>
  );
}

const mapStateToProps = (state) => {
  return {
    currUser: state.currUser,
  };
};

export default connect(mapStateToProps)(PersonalScreen);
