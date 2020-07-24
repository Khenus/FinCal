import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  useWindowDimensions,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {connect} from 'react-redux';

import {getAllTrans} from '../API';
import LedgerCard from './LedgerCard';
import FloatActionButton from '../FloatActionButton';
import {darkTheme, lightTheme} from '../GlobalValues.js';

function TransactHist(props) {
  let currWidth = useWindowDimensions().width;
  let currHeight = useWindowDimensions().height;
  let navigation = props.navigation;

  let currUser = props.currUser;
  let currObj = props.route.params;
  let name = currObj.Name;

  let [ledgerTotal, updateLedgerTotal] = useState(0.0);
  let [transHist, updateTransHist] = useState([]);
  let [isLoading, updateIsLoading] = useState(true);

  let [themeDark, updateTheme] = useState(true);
  let [colorScheme, updateColorScheme] = useState(darkTheme);

  let parentDarkTheme = true;

  useEffect(() => {
    themeDark === true
      ? updateColorScheme(darkTheme)
      : updateColorScheme(lightTheme);
  }, [themeDark]);

  useEffect(() => {
    updateTheme(parentDarkTheme);
  }, [parentDarkTheme]);

  useEffect(() => {
    async function tempHandler() {
      updateIsLoading(true);
      let result = await getAllTrans(currObj.fromUUID, currObj.toUUID);

      if (typeof result === 'object') {
        let ledgerTotalTemp = 0.0;
        let ledgerClosedTemp = [];

        for (let i = 0; i < result.length; i++) {
          if (result[i].Status === 'Open') {
            if (result[i].toUUID !== currUser.uuid) {
              ledgerTotalTemp -= parseFloat(result[i].Amount);
            } else {
              ledgerTotalTemp += parseFloat(result[i].Amount);
            }
          } else {
            ledgerClosedTemp.push(result[i]);
          }
        }

        updateLedgerTotal(ledgerTotalTemp);
        updateTransHist(ledgerClosedTemp);
      }

      updateIsLoading(false);
    }
    tempHandler();
  }, [currObj.fromUUID, currObj.toUUID, currUser.uuid]);

  const styles = StyleSheet.create({
    mainView: {
      flex: 1,
      backgroundColor: colorScheme.backCol,
    },

    marginView: {
      // borderWidth: 1,
      // borderColor: 'white',
      flexGrow: 1,
      margin: 20,
      marginTop: 0,
    },

    middle: {
      alignItems: 'center',
      justifyContent: 'center',
    },

    text: {
      color: colorScheme.textCol,
    },

    header: {
      // borderWidth: 1,
      // borderColor: 'white',
      fontSize: 25,
      fontWeight: 'bold',
    },

    headerBar: {
      flexDirection: 'row',
      paddingLeft: 14,
      height: 60,
      alignItems: 'center',
      backgroundColor: colorScheme.backCol,
    },

    headerPadding: {
      flex: 1,
    },

    central: {
      // borderColor: 'white',
      // borderWidth: 1,
      flexGrow: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },

    scroller: {
      // borderColor: 'yellow',
      // borderWidth: 1,
      marginTop: 20,
      height: currHeight * 0.55,
    },

    oweText: {
      color: 'red',
      fontSize: 18,
      fontStyle: 'italic',
    },

    recvText: {
      color: 'lightgreen',
      fontSize: 18,
      fontStyle: 'italic',
    },

    padding: {
      height: 50,
    },
  });

  function back() {
    navigation.pop(1);
  }

  let ledgerText;
  if (ledgerTotal < 0.0) {
    ledgerText = (
      <Text style={styles.oweText}>
        You owe {name} ${Math.abs(ledgerTotal).toFixed(2)}
      </Text>
    );
  } else {
    ledgerText = (
      <Text style={styles.recvText}>
        {name} owes you ${ledgerTotal.toFixed(2)}
      </Text>
    );
  }

  let disItem;
  if (isLoading) {
    disItem = (
      <View style={styles.central}>
        <ActivityIndicator size="small" color={colorScheme.textCol} />
      </View>
    );
  } else {
    if (transHist.length === 0) {
      disItem = (
        <View style={styles.central}>
          <Text style={styles.text}>
            There are no past transaction with {name}
          </Text>
          <View style={styles.padding} />
          {ledgerText}
        </View>
      );
    } else {
      disItem = (
        <View style={styles.central}>
          <ScrollView style={styles.scroller}>
            {transHist.map((currItem, currIdx) => (
              <LedgerCard
                key={currIdx}
                clickable={false}
                currObj={currItem}
                cardType={
                  currItem.toUUID === currObj.toUUID ? 'payment' : 'receive'
                }
                parentThemeDark={themeDark}
                parWidth={currWidth - 40}
              />
            ))}
          </ScrollView>
          {ledgerText}
        </View>
      );
    }
  }

  return (
    <View style={styles.mainView}>
      <View style={styles.headerBar}>
        <TouchableOpacity onPress={back}>
          <Icon name="arrow-back" size={25} style={styles.text} />
        </TouchableOpacity>
        <View style={styles.headerPadding} />
      </View>

      <View style={styles.marginView}>
        <View style={styles.middle}>
          <Text style={[styles.text, styles.header]}>
            Transaction History with {name}
          </Text>
        </View>

        {disItem}
      </View>
      <FloatActionButton currUser={currUser} />
    </View>
  );
}

const mapStateToProps = (state) => {
  return {
    currUser: state.currUser,
  };
};

export default connect(mapStateToProps)(TransactHist);
