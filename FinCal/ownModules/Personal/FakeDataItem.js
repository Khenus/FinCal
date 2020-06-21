import * as React from 'react';
import {View, Text} from 'react-native';

function FakeDataItem(props) {
  return (
    <View>
      <Text> {props.product.date} </Text>
      <Text> {props.product.title} </Text>
      <Text> {props.product.amount} </Text>
      <Text> {props.product.category} </Text>
      <Text> {props.product.description} </Text>
    </View>
  );
}

export default FakeDataItem;
