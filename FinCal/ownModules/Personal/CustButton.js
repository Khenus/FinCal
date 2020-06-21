/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {View, Text} from 'react-native';

function CustButton(props) {
  return (
    <View style={{backgroundColor: 'transparent', marginRight: 15}}>
      <Text style={{color: 'aquamarine'}} onPress={() => alert(props.msg)}>
        VIEW DETAILS
      </Text>
    </View>
  );
}

export default CustButton;
