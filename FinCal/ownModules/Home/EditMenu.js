import React, {useState, useEffect} from 'react';
import {View, Text, ScrollView, StyleSheet} from 'react-native';
import Toast from 'react-native-simple-toast';
import {connect} from 'react-redux';

import MenuDisplay from '../FoodJio/Components/MenuDisplay';

import {darkTheme, lightTheme} from '../GlobalValues';

function EditMenu(props) {
  let currUser = props.currUser;
  let currItem = props.route.params.currItem;
  let navigation = props.navigation;

  console.log(props.route.params.fetchJioAgain);

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
    if (orderList.length !== 0) {
      navigation.navigate('HomeMenuSummary', {
        currUser: currUser,
        currItem: currItem,
        orderList: orderList,
      });
    } else {
      Toast.show('Orders are not added');
    }
  }

  return (
    <ScrollView style={localStyle.mainView}>
      <View>
        <Text style={localStyle.title}>Add Orders</Text>
        <MenuDisplay
          currUser={currUser}
          currItem={currItem}
          menuIdx={currItem.resIdx}
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
    </ScrollView>
  );
}

const mapStateToProps = (state) => {
  return {
    currUser: state.currUser,
  };
};

export default connect(mapStateToProps)(EditMenu);
