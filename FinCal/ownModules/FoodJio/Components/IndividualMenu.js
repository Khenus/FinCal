/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {pure} from 'recompose';

import NumericInput from 'react-native-numeric-input';

function IndividualMenu(props) {
  let item = props.currItem;
  let index = props.idx;
  let currVal = props.val;
  let colorScheme = props.colorScheme;
  let changeOrder = props.changeFunction;
  let currX = props.currX;
  let updateFirst = props.updateFirst;

  let localStyle = StyleSheet.create({
    itemContainer: {
      paddingVertical: 10,
      paddingHorizontal: 15,
      backgroundColor: '#333333',
    },
    itemTitle: {
      flex: 1,
      fontSize: 15,
      marginRight: 20,
      color: colorScheme.textCol,
    },
    itemPrice: {
      fontSize: 15,
      color: colorScheme.textCol,
    },
    itemRow: {
      flexDirection: 'row',
    },
    itemCode: {
      flexShrink: 1,
      fontSize: 15,
      marginRight: 20,
      color: colorScheme.textCol,
    },
    numericWrap: {
      marginLeft: 15,
      marginTop: -5,
      marginBottom: -5,
    },
  });

  if (index === 0) {
    updateFirst(item.serialNum);
  }

  return (
    <View style={localStyle.itemContainer}>
      <View style={localStyle.itemRow}>
        <Text style={localStyle.itemCode}>{item.serialNum}</Text>
        <Text style={localStyle.itemTitle}>{item.itemName}</Text>
        <Text style={localStyle.itemPrice}>${item.itemPrice}</Text>
        <NumericInput
          type="plus-minus"
          minValue={0}
          value={currVal}
          onChange={(val) => changeOrder(currX, index, val)}
          rounded
          rightButtonBackgroundColor="transparent"
          leftButtonBackgroundColor="transparent"
          textColor={colorScheme.textCol}
          borderColor="transparent"
          iconStyle={{color: colorScheme.textCol}}
          totalWidth={100}
          totalHeight={35}
          separatorWidth={0}
          containerStyle={[
            localStyle.numericWrap,
            {
              backgroundColor: currVal === 0 ? 'transparent' : '#5FA052',
            },
          ]}
        />
      </View>
    </View>
  );
}

export default pure(IndividualMenu);
