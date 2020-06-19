import React, {useState} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, ColorPropType} from 'react-native';
import {Searchbar} from 'react-native-paper';

import {darkTheme} from '../GlobalValues';
import { ScrollView } from 'react-native-gesture-handler';

export default function LedgerSummary() {
  let [themeDark, updatetheme] = useState(true); 

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
      borderWidth: 1,
      borderColor: 'white',
    },

    mainContainers: {
      flexGrow: 1,
      borderColor: 'white',
      borderWidth: 1,
    },

    toPayHeader:{
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
      flexGrow: 1,
      borderWidth: 1,
      borderColor: 'white',
    },
  });

  return (
    <View style={styles.mainView}>
      <View style={styles.marginView}>
        <Text style={styles.headerText}>Ledger</Text>
        <View style={styles.selectorBar}>
          <TouchableOpacity style={[styles.btnWrap, styles.selectedBtn]}>
            <Text style={[styles.btnText, styles.selectedBtnText]}>Summary</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnWrap}>
            <Text style={styles.btnText}>To Pay</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnWrap}>
            <Text style={styles.btnText}>To Receive</Text>
          </TouchableOpacity>
        </View>

        <Searchbar style={styles.searchBar} placeholder="Seach for a debt"/>
  
        <View style={styles.fullSummary}>
          <View style={styles.mainContainers}>
            <Text style={styles.toPayHeader}>To pay: SGD {}</Text>
            <ScrollView contentContainerStyle={styles.scroller}></ScrollView>
          </View>
          <View style={styles.mainContainers}>
            <Text style={styles.toReceiveHeader}>To receive: SGD {}</Text>
            <ScrollView contentContainerStyle={styles.scroller}></ScrollView>
          </View>
        </View>

      </View>
    </View>
  );
}
