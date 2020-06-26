import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  useWindowDimensions,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import DetailCard from './DetailCard';
import {darkTheme, lightTheme} from '../GlobalValues.js';

export default function TransactHist(props) {
  let currWidth = useWindowDimensions().width;
  let toName = props.toName;

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

  const styles = StyleSheet.create({
    mainView: {
      flex: 1,
      backgroundColor: colorScheme.backCol,
    },

    marginView: {
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
  });

  function back() {
    navigation.pop(1);
  }

  return (
    <View style={styles.mainView}>
      <View style={styles.headerBar}>
        <TouchableOpacity>
          <Icon name="arrow-back" size={25} style={styles.text} />
        </TouchableOpacity>
        <View style={styles.headerPadding} />
      </View>

      <View style={styles.marginView}>
        <View style={styles.middle}>
          <Text style={[styles.text, styles.header]}>
            Transaction History with {toName}
          </Text>
        </View>

        <ScrollView>
          {/* {toRecvArr.map((currItem, currIdx) => (
                  <DetailCard
                    key={currIdx}
                    currObj={currItem}
                    cardType="receive"
                    parentThemeDark={themeDark}
                    parWidth={currWidth - 40}
                  />
                ))} */}
        </ScrollView>
      </View>
    </View>
  );
}
