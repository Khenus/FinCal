import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';

import MatIcon from 'react-native-vector-icons/MaterialIcons';
import FeatherIcon from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';

import {darkTheme, lightTheme} from '../GlobalValues';

export default function LedgerCard(props) {
  let navigation = useNavigation();

  let paymentType = props.paymentType || 'normal';
  let cardType = props.cardType || 'payment';
  let parentThemeDark = props.parentThemeDark || true;
  let parWidth = props.parWidth;
  let currObj = props.currObj;

  let clickable = props.clickable || false;

  let [themeDark, updateTheme] = useState(true);
  let colorScheme = themeDark === true ? darkTheme : lightTheme;

  useEffect(() => {
    updateTheme(parentThemeDark);
  }, [parentThemeDark]);

  const styles = StyleSheet.create({
    header: {
      color: colorScheme.cardContent,
      fontSize: 15,
    },

    sub: {
      color: colorScheme.cardContent,
      fontSize: 12,
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
      marginRight: 10,
    },

    padding: {
      width: parWidth * 0.4,
      // borderWidth: 1,
    },

    allWrapper: {
      flexDirection: 'row',
    },

    detail: {
      fontStyle: 'italic',
    },
  });

  let name, date, amount, detail;
  date = currObj.Date || 'Apr 25';
  amount = currObj.Amount || '99.99';
  detail = currObj.Detail || 'NA';

  if (cardType === 'payment') {
    name = currObj.toName || 'Name';
  } else {
    name = currObj.fromName || 'Name';
  }

  let icons;
  if (paymentType === 'late') {
    icons = <FeatherIcon name="frown" size={35} style={styles.iconCol} />;
  } else if (paymentType === 'normal') {
    icons = <MatIcon name="face" size={30} style={styles.iconCol} />;
  } else {
    icons = <FeatherIcon name="smile" size={35} style={styles.iconCol} />;
  }

  function clickHandler() {
    if (cardType === 'payment') {
      navigation.navigate('TransactHist', {
        fromUUID: currObj.fromUUID,
        toUUID: currObj.toUUID,
        Name: currObj.toName,
        cardType: 'payment',
        Amount: currObj.Amount,
      });
    } else {
      navigation.navigate('TransactHist', {
        fromUUID: currObj.fromUUID,
        toUUID: currObj.toUUID,
        Name: currObj.fromName,
        cardType: 'receive',
        Amount: currObj.Amount,
      });
    }
  }

  if (cardType === 'payment') {
    if (clickable) {
      return (
        <View style={styles.allWrapper}>
          <View style={styles.padding} />
          <TouchableOpacity style={styles.wholeCompo} onPress={clickHandler}>
            <View style={styles.start}>
              <View style={styles.iconContain}>{icons}</View>

              <View style={styles.textContain}>
                <Text style={styles.header}>{name}</Text>
                <Text style={styles.sub}>{date}</Text>
                <Text style={[styles.sub, styles.detail]}>
                  Details: {detail}
                </Text>
              </View>
            </View>
            <View style={styles.end}>
              <Text style={styles.amountText}>${amount}</Text>
            </View>
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <View style={styles.allWrapper}>
          <View style={styles.padding} />
          <View style={styles.wholeCompo}>
            <View style={styles.start}>
              <View style={styles.iconContain}>{icons}</View>

              <View style={styles.textContain}>
                <Text style={styles.header}>{name}</Text>
                <Text style={styles.sub}>{date}</Text>
                <Text style={[styles.sub, styles.detail]}>
                  Details: {detail}
                </Text>
              </View>
            </View>
            <View style={styles.end}>
              <Text style={styles.amountText}>${amount}</Text>
            </View>
          </View>
        </View>
      );
    }
  } else {
    if (clickable) {
      return (
        <View style={styles.allWrapper}>
          <TouchableOpacity style={styles.wholeCompo} onPress={clickHandler}>
            <View style={styles.start}>
              <View style={styles.iconContain}>{icons}</View>

              <View style={styles.textContain}>
                <Text style={styles.header}>{name}</Text>
                <Text style={styles.sub}>{date}</Text>
                <Text style={[styles.sub, styles.detail]}>
                  Details: {detail}
                </Text>
              </View>
            </View>
            <View style={styles.end}>
              <Text style={styles.amountText}>${amount}</Text>
            </View>
          </TouchableOpacity>
          <View style={styles.padding} />
        </View>
      );
    } else {
      return (
        <View style={styles.allWrapper}>
          <View style={styles.wholeCompo}>
            <View style={styles.start}>
              <View style={styles.iconContain}>{icons}</View>

              <View style={styles.textContain}>
                <Text style={styles.header}>{name}</Text>
                <Text style={styles.sub}>{date}</Text>
                <Text style={[styles.sub, styles.detail]}>
                  Details: {detail}
                </Text>
              </View>
            </View>
            <View style={styles.end}>
              <Text style={styles.amountText}>${amount}</Text>
            </View>
          </View>
          <View style={styles.padding} />
        </View>
      );
    }
  }
}
