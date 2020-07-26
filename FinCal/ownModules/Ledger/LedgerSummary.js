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
import {connect} from 'react-redux';
import FloatActionButton from '../FloatActionButton';
import {Searchbar} from 'react-native-paper';
import {CommonActions} from '@react-navigation/native';

import {getLedger} from '../API';
import {darkTheme, lightTheme} from '../GlobalValues';
import LedgerCard from './LedgerCard';

function LedgerSummary(props) {
  let currWidth = useWindowDimensions().width;
  let currHeight = useWindowDimensions().height;

  let [isLoading, updateLoading] = useState(false);
  let [themeDark, updateTheme] = useState(true);
  let [colorScheme, updateColorScheme] = useState(darkTheme);

  let navigation = props.navigation;
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

  let [toPayFull, updateToPayFull] = useState([]);
  let [toRecvFull, updateToRecvFull] = useState([]);

  let [toPayArr, updateToPayArr] = useState([]);
  let [toRecvArr, updateToRecvArr] = useState([]);
  let [toPayAmt, updateToPayAmt] = useState(0.0);
  let [toRecvAmt, updateToRecvAmt] = useState(0.0);

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
      // borderWidth: 1,
      // borderColor: 'green',
    },

    marginView: {
      flexGrow: 1,
      margin: 20,
      height: currHeight * 0.8,
      // borderWidth: 1,
      // borderColor: 'green',
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
      flexGrow: 1,
      // borderWidth: 1,
      // borderColor: 'yellow',
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

    toReceiveHeader: {
      fontStyle: 'italic',
      fontSize: 20,
      textAlign: 'left',
      color: colorScheme.toReceiveHeader,
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
      let toRecvRes = await getLedger(
        'getToRecv',
        currUser.Email,
        currUser.uuid,
      );

      if (typeof toRecvRes === 'object' && typeof toPayRes === 'object') {
        let toPayTemp = [];
        let toPayAmtTemp = 0.0;
        let toRecvTemp = [];
        let toRecvAmtTemp = 0.0;

        for (let i = 0; i < toPayRes.length; i++) {
          toPayAmtTemp += parseFloat(toPayRes[i].Amount);
          toPayTemp.push(toPayRes[i]);
        }

        for (let i = 0; i < toRecvRes.length; i++) {
          toRecvAmtTemp += parseFloat(toRecvRes[i].Amount);
          toRecvTemp.push(toRecvRes[i]);
        }

        updateToPayAmt(toPayAmtTemp.toFixed(2));
        updateToRecvAmt(toRecvAmtTemp.toFixed(2));
        updateToPayArr(toPayTemp);
        updateToRecvArr(toRecvTemp);

        updateToPayFull(toPayTemp);
        updateToRecvFull(toRecvTemp);
      }

      updateLoading(false);
    }

    const reload = navigation.addListener('focus', () => {
      tempHandler();
    });

    return reload;
  }, [currUser.Email, currUser.uuid, navigation]);

  function toPayPage() {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [
          {
            name: 'LedgerToPay',
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
      updateToRecvArr(toRecvFull);
    } else {
      let newWord = incomingWord.toLowerCase();

      let toPayTemp = [];
      let toRecvTemp = [];

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

      for (let i = 0; i < toRecvFull.length; i++) {
        let currItem = toRecvFull[i];

        if (
          currItem.fromName.toLowerCase().includes(newWord) ||
          currItem.toName.toLowerCase().includes(newWord) ||
          currItem.Amount.toLowerCase().includes(newWord) ||
          currItem.Detail.toLowerCase().includes(newWord) ||
          currItem.Date.toLowerCase().includes(newWord)
        ) {
          toRecvTemp.push(currItem);
        }
      }

      updateToPayArr(toPayTemp);
      updateToRecvArr(toRecvTemp);
    }
  }

  async function reloadPage() {
    updateLoading(true);
    let toPayRes = await getLedger('getToPay', currUser.Email, currUser.uuid);
    let toRecvRes = await getLedger('getToRecv', currUser.Email, currUser.uuid);

    if (typeof toRecvRes === 'object' && typeof toPayRes === 'object') {
      let toPayTemp = [];
      let toPayAmtTemp = 0.0;
      let toRecvTemp = [];
      let toRecvAmtTemp = 0.0;

      for (let i = 0; i < toPayRes.length; i++) {
        toPayAmtTemp += parseFloat(toPayRes[i].Amount);
        toPayTemp.push(toPayRes[i]);
      }

      for (let i = 0; i < toRecvRes.length; i++) {
        toRecvAmtTemp += parseFloat(toRecvRes[i].Amount);
        toRecvTemp.push(toRecvRes[i]);
      }

      updateToPayAmt(toPayAmtTemp.toFixed(2));
      updateToRecvAmt(toRecvAmtTemp.toFixed(2));
      updateToPayArr(toPayTemp);
      updateToRecvArr(toRecvTemp);

      updateToPayFull(toPayTemp);
      updateToRecvFull(toRecvTemp);
    }

    updateLoading(false);
  }

  if (isLoading) {
    return (
      <View style={styles.mainView}>
        <View style={styles.marginView}>
          <Text style={styles.headerText}>Ledger</Text>
          <View style={styles.selectorBar}>
            <TouchableOpacity style={[styles.btnWrap, styles.selectedBtn]}>
              <Text style={[styles.btnText, styles.selectedBtnText]}>
                Summary
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnWrap} onPress={toPayPage}>
              <Text style={styles.btnText}>To Pay</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnWrap} onPress={toRecvPage}>
              <Text style={styles.btnText}>To Receive</Text>
            </TouchableOpacity>
          </View>

          <Searchbar
            style={styles.searchBar}
            placeholder="Seach for an entry"
          />

          <View style={styles.fullSummary}>
            <View style={styles.loadingMain}>
              <ActivityIndicator size="small" color={colorScheme.textCol} />
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
            <TouchableOpacity style={[styles.btnWrap, styles.selectedBtn]}>
              <Text style={[styles.btnText, styles.selectedBtnText]}>
                Summary
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnWrap} onPress={toPayPage}>
              <Text style={styles.btnText}>To Pay</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnWrap} onPress={toRecvPage}>
              <Text style={styles.btnText}>To Receive</Text>
            </TouchableOpacity>
          </View>

          <Searchbar
            style={styles.searchBar}
            placeholder="Seach for an entry"
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
                    reloadPage={reloadPage}
                  />
                ))}
              </ScrollView>
            </View>
            <View style={styles.mainContainers}>
              <Text style={styles.toReceiveHeader}>
                To receive: SGD {toRecvAmt}
              </Text>
              <ScrollView style={styles.scroller} nestedScrollEnabled={true}>
                {toRecvArr.map((currItem, currIdx) => (
                  <LedgerCard
                    key={currIdx}
                    clickable={true}
                    currObj={currItem}
                    cardType="receive"
                    parentThemeDark={themeDark}
                    parWidth={currWidth - 40}
                    reloadPage={reloadPage}
                  />
                ))}
              </ScrollView>
            </View>
          </View>
        </View>
        <FloatActionButton currUser={currUser} pullLedger={reloadPage} />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currUser: state.currUser,
  };
};

export default connect(mapStateToProps)(LedgerSummary);
