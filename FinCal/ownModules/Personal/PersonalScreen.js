import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {FAB} from 'react-native-paper';

import PieChartWithDynamicSlices from './PieChartWithDynamicSlices';

import GlobalStyles from '../GlobalStyles.js';
import TransactionList from './TransactionList.js';
import fakeData from './fakeData.js';
import FloatActionButton from '../FloatActionButton.js'

export default function PersonalScreen() {
  let [transactData, updateTransactData] = useState([]);

  useEffect(() => {
    //Fetch data from server
    updateTransactData(fakeData); //Change this to result after you add in teh api
  }, []);

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

    viewDetails: {
      color: 'aquamarine',
      marginRight: 15,
    },

    subtitleStyle: {
      color: '#FFFFFF',
      fontSize: 18,
      fontWeight: 'bold',
      fontStyle: 'italic',
      marginLeft: 15,
    },

    welcomeStyle: {
      color: '#FFFFFF',
      fontSize: 25,
      fontWeight: 'bold',
      //backgroundColor: 'grey',
      marginTop: 20,
      marginLeft: 15,
    },

    transList: {
      flexGrow: 1,
    },
  });

  return (
    <View style={localStyle.mainView}>
      {/* Header text */}
      <View style={localStyle.header}>
        <Text style={localStyle.welcomeStyle}>Your personal finances.</Text>
      </View>

      {/* Budget breakdown */}
      <View>
        <View style={localStyle.subHeader}>
          <Text style={localStyle.subtitleStyle}>Budget</Text>
          <Text
            style={localStyle.viewDetails}
            onPress={() => console.log('to personal > budget breakdown page')}>
            VIEW DETAILS
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
            onPress={() =>
              console.log('to personal > full transaction list page')
            }>
            View all transactions
          </Text>
        </View>

        <TransactionList dataArr={transactData} num="5" />
      </View>

      <FloatActionButton/>

//       <FAB
//         icon="tooltip-plus-outline"
//         style={GlobalStyles.fab}
//         onPress={() => console.log('FAB pressed!')}
//       />
    </View>
  );
}
