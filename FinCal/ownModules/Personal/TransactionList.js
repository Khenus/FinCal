/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {View, Text} from 'react-native';
import {Divider} from 'react-native-elements';

import fakeData from './fakeData.js';
import styles from './styles';

function TransactionList(props) {
  var choppedArr = fakeData.slice(0, props.num);

  return (
    <View>
      {choppedArr.map((item, idx) => (
        <View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 8,
              marginBottom: 5,
            }}>
            <Text style={styles.transactionListStyleL} key={idx}>
              SGD {item.amount}
              {'\n'}
              {item.title}
            </Text>
            <Text style={styles.transactionListStyleR} key={idx}>
              {item.date}
              {'\n'}
              {item.category}
            </Text>
          </View>
          <Divider
            style={{backgroundColor: 'grey', marginLeft: 15, marginRight: 15}}
          />
        </View>
      ))}
    </View>
  );
}

export default TransactionList;
