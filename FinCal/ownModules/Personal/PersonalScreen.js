/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {View, Text} from 'react-native';
import {FAB} from 'react-native-paper';

import PieChartWithDynamicSlices from './PieChartWithDynamicSlices';

import TransactionList from './TransactionList.js';
import CustButton from './CustButton.js';
import fakeData from './fakeData.js';
// import FakeDataItem from './fakeDataItem'
import styles from './styles';

class PersonalScreen extends React.Component {
  constructor() {
    super();
  }

  render() {
    var choppedArr = fakeData.slice(0, 5);

    return (
      <View style={{flex: 1, backgroundColor: '#121212'}}>
        {/* Header text */}
        <View style={{marginBottom: 10}}>
          <Text style={styles.welcomeStyle}>Your personal finances.</Text>
        </View>

        {/* Budget breakdown */}
        <View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={styles.subtitleStyle}>Budget</Text>
            <CustButton msg="to personal > budget breakdown page" />
            {/* <Button title = "View details"
                                color = "teal"
                                onPress = { () => alert('to personal > budget breakdown page')}
                                //onPress = { () => navigation.navigate('BudgetBreakdown')}
                        /> */}
          </View>

          <PieChartWithDynamicSlices />

          <Text> </Text>
        </View>

        {/* Transaction List */}
        <View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={styles.subtitleStyle}>Transactions</Text>
            <CustButton msg="to personal > full transaction list page" />
            {/* <Button title = "View details"
                                color = "teal"
                                //onPress = { () => navigation.navigate('FullTransactionList')}
                                onPress = { () => alert('to personal > full transaction list page')}
                        /> */}
          </View>

          <TransactionList num="5" />
        </View>

        <FAB
          icon="tooltip-plus-outline"
          style={styles.fab}
          onPress={() => alert('FAB pressed!')}
        />
      </View>
    );
  }
}

export default PersonalScreen;
