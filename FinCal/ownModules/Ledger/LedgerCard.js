import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';

import MatIcon from 'react-native-vector-icons/MaterialIcons';
import FeatherIcon from 'react-native-vector-icons/Feather';
import {darkTheme, lightTheme} from '../GlobalValues';

export default function LedgerCard(props) {
  let paymentType = props.paymentType;
  let cardType = props.cardType;
  let parentThemeDark = props.parentThemeDark;
  let parWidth = props.parWidth;

  let [themeDark, updatetheme] = useState(true);
  let colorScheme = themeDark === true ? darkTheme : lightTheme;

  // useEffect(() => {
  //   updatetheme(parentThemeDark);
  // }, [parentThemeDark]);

  const styles = StyleSheet.create({
    header: {
      color: colorScheme.cardContent,
      fontSize: 18,
    },

    sub: {
      color: colorScheme.cardContent,
    },

    iconContain: {
      justifyContent: 'center',
      alignItems: 'center',
      width: 40,
    },

    wholeCompo: {
      width: parWidth * 0.6,
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 5,
      marginBottom: 5,
      borderColor: 'grey',
      borderRadius: 10,
      backgroundColor: colorScheme.cardBackground,
    },

    textContain: {
      marginTop: 5,
      marginBottom: 5,
      justifyContent: 'center',
    },

    iconCol: {
      color: colorScheme.cardContent,
    },

    start: {
      justifyContent: 'flex-start',
      flexDirection: 'row',
    },

    end: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-end',
    },

    amountText: {
      color: colorScheme.cardContent,
      fontSize: 15,
      marginRight: 5,
    }, 

    padding: {
      width: parWidth * 0.4,
      borderWidth: 1,
    },

    allWrapper: {
      flexDirection: 'row',
    },
  });

  let icons;
  if(paymentType === 'late') {
    icons = <FeatherIcon name="frown" size={35} style={styles.iconCol} />
  } else if (paymentType === 'normal') {
    icons = <MatIcon name="face" size={30} style={styles.iconCol} />
  } else {
    icons = <FeatherIcon name="smile" size={35} style={styles.iconCol} />
  }

  if(cardType === 'payment') {
    return (
      <View style={styles.allWrapper}>
        <View style={styles.padding}/>
        <TouchableOpacity style={styles.wholeCompo}>
          <View style={styles.start}>  
            <View style={styles.iconContain}>
              {icons}
            </View>
  
            <View style={styles.textContain}>
              <Text style={styles.header}>testing</Text>
              <Text style={styles.sub}>tesubg</Text>
            </View>
          </View>
          <View style={styles.end}>
            <Text style={styles.amountText}>Amount</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  } else {
    return (
      <View style={styles.allWrapper}>
        <TouchableOpacity style={styles.wholeCompo}>
          <View style={styles.start}>  
            <View style={styles.iconContain}>
              {icons}
            </View>
  
            <View style={styles.textContain}>
              <Text style={styles.header}>testing</Text>
              <Text style={styles.sub}>tesubg</Text>
            </View>
          </View>
          <View style={styles.end}>
            <Text style={styles.amountText}>Amount</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.padding}/>
      </View>
    );
  }  
}
