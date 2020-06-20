import React, {useState, useEffect} from 'react';
import {Text, View, ScrollView, StyleSheet, TouchableOpacity, useWindowDimensions} from 'react-native';
import {Searchbar} from 'react-native-paper';

import {darkTheme} from '../GlobalValues';
import LedgerCard from './LedgerCard';

export default function LedgerSummary() {
  let currWidth = useWindowDimensions().width;
  let [themeDark, updatetheme] = useState(true); 
  let [toPayArr, updateToPayArr] = useState([]);
  let [toPayAmt, updateToPayAmt] = useState(0.0);

  let colorScheme = themeDark === true ? darkTheme : lightTheme;

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

    toPayHeader:{
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
  });

  useEffect(() => {
    let result = [
      {Name: 'Amanda', Date: 'Apr 25', Amount: '5.50', Type: 'toPay'}, 
      {Name: 'Bryne', Date: 'May 26', Amount: '6.60', Type: 'toPay'}, 
      {Name: 'Colin', Date: 'Jun 27', Amount: '7.70', Type: 'toPay'},
      {Name: 'Donkey', Date: 'Jan 27', Amount: '50.70', Type: 'toPay'},
      {Name: 'Echo', Date: 'Jun 27', Amount: '7.70', Type: 'toPay'},
      {Name: 'Newww', Date: 'Jun 27', Amount: '7.70', Type: 'toPay'}];
      //Change this to fetch from server

    let toPayAmtTemp = 0.0;

    for(let i = 0; i < result.length; i++){
       toPayAmtTemp += parseFloat(result[i].Amount);
    }

    updateToPayArr(result);
    updateToPayAmt(toPayAmtTemp);
  }, []);

  return (
    <View style={styles.mainView}>
      <View style={styles.marginView}>
        <Text style={styles.headerText}>Ledger</Text>
        <View style={styles.selectorBar}>
          <TouchableOpacity style={styles.btnWrap}>
            <Text style={styles.btnText}>Summary</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.btnWrap, styles.selectedBtn]}>
            <Text style={[styles.btnText, styles.selectedBtnText]}>To Pay</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnWrap}>
            <Text style={styles.btnText}>To Receive</Text>
          </TouchableOpacity>
        </View>

        <Searchbar style={styles.searchBar} placeholder="Seach for a debt"/>
  
        <View style={styles.fullSummary}>
          <View style={styles.mainContainers}>
            <Text style={styles.toPayHeader}>To pay: SGD {toPayAmt}</Text>
            <ScrollView style={styles.scroller} nestedScrollEnabled={true}>
              {toPayArr.map((currItem, currIdx) => (<LedgerCard key={currIdx} currObj={currItem} cardType="payment" parentThemeDark={themeDark} parWidth={currWidth-40}/>))}
            </ScrollView>
          </View>
        </View>

      </View>
    </View>
  );
}
