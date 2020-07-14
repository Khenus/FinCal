import React, {useState, useEffect} from 'react';
import {View, Text, ScrollView, StyleSheet} from 'react-native';
import Toast from 'react-native-simple-toast';

import AddPeople from './Components/AddPeople.js';

import {darkTheme, lightTheme} from '../GlobalValues';

export default function FoodJioPeople(props) {
  let navigation = props.navigation;
  let currUser = props.route.params.currUser;
  let menuIdx = props.route.params.menuIdx;
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

  let [addedPeeps, updateAddedPeeps] = useState([]);

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

    addPeepWrap: {
      marginBottom: 10,
      paddingBottom: 25,
      marginLeft: 10,
      marginRight: 10,
      // borderBottomWidth: 4,
      // borderBottomColor: 'lightgrey',
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

  function toOrderPage() {
    if (addedPeeps.length !== 0) {
      navigation.navigate('FoodJioOrder', {
        currUser: currUser,
        menuIdx: menuIdx,
        addedPeeps: addedPeeps,
        title: title,
        comments: comments,
      });
    } else {
      Toast.show('There are no friends added');
    }
  }

  return (
    <ScrollView style={localStyle.mainView}>
      <View style={localStyle.addPeepWrap}>
        <Text style={localStyle.title}>Add People to Jio</Text>
        <AddPeople currUser={currUser} parAddedPeeps={updateAddedPeeps} />
      </View>
      <View style={localStyle.btnWrap}>
        <Text style={localStyle.cancelbutton} onPress={back}>
          Cancel
        </Text>
        <Text style={localStyle.confirmbutton} onPress={toOrderPage}>
          Confirm
        </Text>
      </View>
    </ScrollView>
  );
}
