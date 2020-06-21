import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import {Searchbar} from 'react-native-paper';
import {CommonActions} from '@react-navigation/native';

import {darkTheme, lightTheme} from '../GlobalValues';
import LedgerCard from './LedgerCard';

export default function LedgerToPay(props) {
  let currWidth = useWindowDimensions().width;

  let [isLoading, updateLoading] = useState(false);
  let [themeDark, updateTheme] = useState(true);
  let [colorScheme, updateColorScheme] = useState(darkTheme);

  let navigation = props.navigation;

  let [toPayArr, updateToPayArr] = useState([]);
  let [toPayAmt, updateToPayAmt] = useState(0.0);

  let parentDarkTheme = true;
  // props.route.params.parentDarkTheme === undefined
  //   ? true
  //   : props.route.params.parentDarkTheme;

  useEffect(() => {
    themeDark === true
      ? updateColorScheme(darkTheme)
      : updateColorScheme(lightTheme);
  }, [themeDark]);

  useEffect(() => {
    updateTheme(parentDarkTheme);
  }, [parentDarkTheme]);

  const styles = StyleSheet.create({
    selectorBar: {
      // borderWidth: 1,
      marginTop: 15,
      marginBottom: 15,
      flexDirection: 'row',
      justifyContent: 'center',
      alignContent: 'center',
    },

    mainView: {
      flex: 1,
      backgroundColor: colorScheme.backCol,
    },

    marginView: {
      flexGrow: 1,
      margin: 20,
    },

    headerText: {
      color: colorScheme.textCol,
      fontSize: 30,
      fontWeight: 'bold',
    },

    btnWrap: {
      marginLeft: 10,
      marginRight: 10,
      borderRadius: 20,
      width: 110,
      height: 40,
      borderColor: colorScheme.btnCol,
      borderWidth: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },

    btnText: {
      color: colorScheme.textCol,
      fontSize: 15,
    },

    selectedBtn: {
      borderColor: colorScheme.selectedBtnCol,
    },

    selectedBtnText: {
      color: colorScheme.selectedTextCol,
    },

    searchBar: {
      height: 44,
      borderRadius: 22,
      backgroundColor: colorScheme.searchBackgroundCol,
      borderColor: colorScheme.searchCol,
    },

    fullSummary: {
      marginTop: 15,
      flex: 1,
      // borderWidth: 1,
      // borderColor: 'pink',
    },

    mainContainers: {
      flexGrow: 1,
      // borderColor: 'yellow',
      // borderWidth: 1,
    },

    toPayHeader: {
      fontStyle: 'italic',
      fontSize: 20,
      textAlign: 'right',
      color: colorScheme.toPayHeader,
    },

    scroller: {
      flex: 1,
      // borderWidth: 1,
      // borderColor: 'white',
    },

    loadingMain: {
      flexGrow: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },

    loadingText: {
      color: 'grey',
      fontSize: 20,
    },
  });

  useEffect(() => {
    updateLoading(true);
    let result = [
      {Name: 'Amanda', Date: 'Apr 25', Amount: '5.50', Type: 'toPay'},
      {Name: 'Bryne', Date: 'May 26', Amount: '6.60', Type: 'toPay'},
      {Name: 'Colin', Date: 'Jun 27', Amount: '7.70', Type: 'toPay'},
      {Name: 'Donkey', Date: 'Jan 27', Amount: '50.70', Type: 'toPay'},
      {Name: 'Echo', Date: 'Jun 27', Amount: '7.70', Type: 'toPay'},
      {Name: 'Newww', Date: 'Jun 27', Amount: '7.70', Type: 'toPay'},
    ];
    //Change this to fetch from server

    let toPayAmtTemp = 0.0;

    for (let i = 0; i < result.length; i++) {
      toPayAmtTemp += parseFloat(result[i].Amount);
    }

    updateToPayArr(result);
    updateToPayAmt(toPayAmtTemp);
    updateLoading(false);
  }, []);

  function toSummaryPage() {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [
          {
            name: 'LedgerSummary',
          },
        ],
      }),
    );
  }

  function toRecvPage() {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [
          {
            name: 'LedgerToRecv',
          },
        ],
      }),
    );
  }

  if (isLoading) {
    <View style={styles.mainView}>
      <View style={styles.marginView}>
        <Text style={styles.headerText}>Ledger</Text>
        <View style={styles.selectorBar}>
          <TouchableOpacity style={styles.btnWrap} onPress={toSummaryPage}>
            <Text style={styles.btnText}>Summary</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.btnWrap, styles.selectedBtn]}>
            <Text style={[styles.btnText, styles.selectedBtnText]}>To Pay</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnWrap} onPress={toRecvPage}>
            <Text style={styles.btnText}>To Receive</Text>
          </TouchableOpacity>
        </View>

        <Searchbar style={styles.searchBar} placeholder="Seach for a debt" />

        <View style={styles.fullSummary}>
          <View style={styles.loadingMain}>
            <ActivityIndicator size="small" color="white" />
            <Text style={styles.loadingText}>Loading...</Text>
          </View>
        </View>
      </View>
    </View>;
  } else {
    return (
      <View style={styles.mainView}>
        <View style={styles.marginView}>
          <Text style={styles.headerText}>Ledger</Text>
          <View style={styles.selectorBar}>
            <TouchableOpacity style={styles.btnWrap} onPress={toSummaryPage}>
              <Text style={styles.btnText}>Summary</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.btnWrap, styles.selectedBtn]}>
              <Text style={[styles.btnText, styles.selectedBtnText]}>
                To Pay
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnWrap} onPress={toRecvPage}>
              <Text style={styles.btnText}>To Receive</Text>
            </TouchableOpacity>
          </View>

          <Searchbar style={styles.searchBar} placeholder="Seach for a debt" />

          <View style={styles.fullSummary}>
            <View style={styles.mainContainers}>
              <Text style={styles.toPayHeader}>To pay: SGD {toPayAmt}</Text>
              <ScrollView style={styles.scroller} nestedScrollEnabled={true}>
                {toPayArr.map((currItem, currIdx) => (
                  <LedgerCard
                    key={currIdx}
                    currObj={currItem}
                    cardType="payment"
                    parentThemeDark={themeDark}
                    parWidth={currWidth - 40}
                  />
                ))}
              </ScrollView>
            </View>
          </View>
        </View>
      </View>
    );
  }
}
