import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, useWindowDimensions} from 'react-native';
import Toast from 'react-native-simple-toast';

import MenuDisplay from './Components/MenuDisplay.js';

import {darkTheme, lightTheme} from '../GlobalValues';

export default function FoodJioOrder(props) {
  let currHeight = useWindowDimensions().height;

  let navigation = props.navigation;
  let currUser = props.route.params.currUser;
  let menuIdx = props.route.params.menuIdx;
  let addedPeeps = props.route.params.addedPeeps;
  let title = props.route.params.title;
  let comments = props.route.params.comments;

  let parentDarkTheme = currUser.themeIsDark === 'true';

  let [themeDark, updateTheme] = useState(true);
  let [colorScheme, updateColorScheme] = useState(darkTheme);

  useEffect(() => {
    themeDark === true
      ? updateColorScheme(darkTheme)
      : updateColorScheme(lightTheme);
  }, [themeDark]);

  useEffect(() => {
    updateTheme(parentDarkTheme);
  }, [parentDarkTheme]);

  let [orderList, updateOrderList] = useState([]);

  const localStyle = StyleSheet.create({
    mainView: {
      flex: 1,
      backgroundColor: '#121212',
    },

    cancelbutton: {
      textAlign: 'center',
      color: '#FF6961',
      fontSize: 17,
      padding: 7,
      borderWidth: 1,
      borderColor: '#FF6961',
      borderRadius: 5,
    },

    confirmbutton: {
      textAlign: 'center',
      color: '#77DD77',
      fontSize: 17,
      padding: 7,
      borderWidth: 1,
      borderColor: '#77DD77',
      borderRadius: 5,
    },

    btnWrap: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      margin: 20,
    },

    title: {
      color: colorScheme.textCol,
      fontWeight: 'bold',
      fontSize: 20,
      margin: 15,
    },
  });

  function back() {
    navigation.pop(1);
  }

  function toSummaryPage() {
    if (orderList.length !== 0 && addedPeeps.length !== 0) {
      navigation.navigate('FoodJioSummary', {
        currUser: currUser,
        menuIdx: menuIdx,
        addedPeeps: addedPeeps,
        orderList: orderList,
        title: title,
        comments: comments,
      });
    } else {
      Toast.show('Orders are not added');
    }
  }

  return (
    <View style={localStyle.mainView}>
      <View>
        <Text style={localStyle.title}>Add Orders</Text>
        <MenuDisplay
          currUser={currUser}
          menuIdx={menuIdx}
          parOrderList={updateOrderList}
        />
      </View>
      <View style={localStyle.btnWrap}>
        <Text style={localStyle.cancelbutton} onPress={back}>
          Cancel
        </Text>
        <Text style={localStyle.confirmbutton} onPress={toSummaryPage}>
          Confirm
        </Text>
      </View>
    </View>
  );
}
