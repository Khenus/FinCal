import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Divider} from 'react-native-elements';
import {darkTheme, lightTheme} from '../../GlobalValues.js';

function ListItem(props) {
  let currObj = props.currObj;
  let themeIsDark = props.themeDark;

  let [themeDark, updateTheme] = useState(true);
  let [colorScheme, updateColorScheme] = useState(darkTheme);

  useEffect(() => {
    themeDark === true
      ? updateColorScheme(darkTheme)
      : updateColorScheme(lightTheme);
  }, [themeDark]);

  useEffect(() => {
    updateTheme(themeIsDark);
  }, [themeIsDark]);

  const localStyle = StyleSheet.create({
    transactionListStyleL: {
      color:
        currObj.Type === 'Spending'
          ? colorScheme.spendingText
          : colorScheme.earningText,
      fontSize: 15,
      // fontStyle: 'italic',
      marginLeft: 15,
    },

    transactionListStyleR: {
      color:
        currObj.Type === 'Spending'
          ? colorScheme.spendingText
          : colorScheme.earningText,
      fontSize: 15,
      fontStyle: 'italic',
      marginRight: 15,
      textAlign: 'right',
    },

    mainStyle: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 8,
      marginBottom: 5,
    },

    divider: {
      backgroundColor: 'grey',
      marginLeft: 15,
      marginRight: 15,
    },
  });

  return (
    <View>
      <View style={localStyle.mainStyle}>
        <Text style={localStyle.transactionListStyleL}>
          SGD {currObj.Amount}
          {'\n'}
          {currObj.Title}
        </Text>
        <Text style={localStyle.transactionListStyleR}>
          {currObj.Date}
          {'\n'}
          {currObj.Category}
        </Text>
      </View>
      <Divider style={localStyle.divider} />
    </View>
  );
}

export default function TransactionList(props) {
  let dataArr = props.dataArr || [];
  var choppedArr = dataArr.slice(0, props.num);
  let themeDark = props.themeDark;

  const localStyle = StyleSheet.create({
    noResultView: {
      flexGrow: 1,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 40,
      // borderWidth: 1,
      // borderColor: 'white',
    },
    noResultText: {
      color: 'white',
    },
  });

  if (dataArr.length === 0) {
    return (
      <View style={localStyle.noResultView}>
        <Text style={localStyle.noResultText}>
          There are no transactions yet
        </Text>
      </View>
    );
  } else {
    return (
      <View>
        {choppedArr.map((item, idx) => (
          <ListItem currObj={item} key={idx} themeDark={themeDark} />
        ))}
      </View>
    );
  }
}
