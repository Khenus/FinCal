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
import {connect} from 'react-redux';

import FloatActionButton from '../FloatActionButton';
import {getLedger} from '../API';
import {darkTheme, lightTheme} from '../GlobalValues';
import LedgerCard from './LedgerCard';

function LedgerToPay(props) {
  let currWidth = useWindowDimensions().width;
  let currHeight = useWindowDimensions().height;

  let [isLoading, updateLoading] = useState(false);
  let [themeDark, updateTheme] = useState(true);
  let [colorScheme, updateColorScheme] = useState(darkTheme);

  let navigation = props.navigation;

  let [toPayFull, updateToPayFull] = useState([]);
  let [toPayArr, updateToPayArr] = useState([]);
  let [toPayAmt, updateToPayAmt] = useState(0.0);

  let currUser = props.currUser;
  let parentDarkTheme = currUser.themeIsDark === 'true';

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
      height: currHeight * 0.8,
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
    async function tempHandler() {
      updateLoading(true);
      let toPayRes = await getLedger('getToPay', currUser.Email, currUser.uuid);

      if (typeof toPayRes === 'object') {
        let toPayAmtTemp = 0.0;

        for (let i = 0; i < toPayRes.length; i++) {
          toPayAmtTemp += parseFloat(toPayRes[i].Amount);
        }

        updateToPayArr(toPayRes);
        updateToPayAmt(toPayAmtTemp.toFixed(2));
        updateToPayFull(toPayRes);
      }

      updateLoading(false);
    }

    const reload = navigation.addListener('focus', () => {
      tempHandler();
    });

    return reload;
  }, [currUser.Email, currUser.uuid, navigation]);

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

  function search(incomingWord) {
    if (incomingWord === '') {
      updateToPayArr(toPayFull);
    } else {
      let newWord = incomingWord.toLowerCase();

      let toPayTemp = [];

      for (let i = 0; i < toPayFull.length; i++) {
        let currItem = toPayFull[i];

        if (
          currItem.fromName.toLowerCase().includes(newWord) ||
          currItem.toName.toLowerCase().includes(newWord) ||
          currItem.Amount.toLowerCase().includes(newWord) ||
          currItem.Detail.toLowerCase().includes(newWord) ||
          currItem.Date.toLowerCase().includes(newWord)
        ) {
          toPayTemp.push(currItem);
        }
      }

      updateToPayArr(toPayTemp);
    }
  }

  if (isLoading) {
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
            <View style={styles.loadingMain}>
              <ActivityIndicator size="small" color="white" />
              <Text style={styles.loadingText}>Loading...</Text>
            </View>
          </View>
        </View>
        <FloatActionButton currUser={currUser} />
      </View>
    );
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

          <Searchbar
            style={styles.searchBar}
            placeholder="Seach for a debt"
            onChangeText={(newWord) => search(newWord)}
          />

          <View style={styles.fullSummary}>
            <View style={styles.mainContainers}>
              <Text style={styles.toPayHeader}>To pay: SGD {toPayAmt}</Text>
              <ScrollView style={styles.scroller} nestedScrollEnabled={true}>
                {toPayArr.map((currItem, currIdx) => (
                  <LedgerCard
                    key={currIdx}
                    clickable={true}
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
        <FloatActionButton currUser={currUser} />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currUser: state.currUser,
  };
};

export default connect(mapStateToProps)(LedgerToPay);
