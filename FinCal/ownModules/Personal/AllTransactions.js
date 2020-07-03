import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  useWindowDimensions,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';
import {ScrollView} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';

import FloatActionButton from '../FloatActionButton';

import TransactionList from './Components/TransactionList.js';
import {darkTheme, lightTheme} from '../GlobalValues.js';

function AllTransactions(props) {
  let currHeight = useWindowDimensions().height;

  // console.log(props);

  let navigation = props.navigation;
  let parTransactData = props.route.params.transactData;
  let pullTransact = props.route.params.pullTransactRef;

  let [transactData, updateTransactData] = useState([]);
  let [isLoading, updateIsLoading] = useState(true);

  let [themeDark, updateTheme] = useState(true);
  let [colorScheme, updateColorScheme] = useState(darkTheme);

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

  useEffect(() => {
    updateIsLoading(true);
    updateTransactData(parTransactData);
    updateIsLoading(false);
  }, [parTransactData]);

  const styles = StyleSheet.create({
    mainView: {
      flex: 1,
      backgroundColor: '#121212',
    },

    header: {
      marginBottom: 10,
    },

    subHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },

    back: {
      color: 'aquamarine',
      marginLeft: 15,
      fontStyle: 'italic',
    },

    subtitleStyle: {
      color: colorScheme.textCol,
      fontSize: 18,
      fontWeight: 'bold',
      fontStyle: 'italic',
      marginLeft: 15,
    },

    welcomeStyle: {
      color: colorScheme.textCol,
      fontSize: 25,
      fontWeight: 'bold',
      marginLeft: 15,
    },

    central: {
      flexGrow: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },

    text: {
      color: colorScheme.textCol,
    },

    scroller: {
      marginTop: 20,
      height: currHeight * 0.55,
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

    aboveContent: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
  });

  function back() {
    navigation.pop(1);
  }

  let disItem;
  if (isLoading) {
    disItem = (
      <View style={styles.central}>
        <ActivityIndicator size="small" color={colorScheme.textCol} />
      </View>
    );
  } else {
    if (transactData.length === 0) {
      disItem = (
        <View style={styles.central}>
          <Text style={styles.text}>There are no past transaction.</Text>
        </View>
      );
    } else {
      disItem = (
        <ScrollView style={styles.scroller}>
          <TransactionList
            dataArr={transactData}
            num={100}
            themeDark={themeDark}
          />
        </ScrollView>
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
      <View style={styles.header}>
        <Text style={styles.welcomeStyle}>Your personal finances.</Text>
      </View>

      <View style={styles.aboveContent}>
        <Text style={styles.subtitleStyle}>All Transactions</Text>
        {/* <Button title="drop down sort menu here" /> */}
      </View>

      {disItem}
      <FloatActionButton currUser={currUser} pullTransact={pullTransact} />
    </View>
  );
}

const mapStateToProps = (state) => {
  return {
    currUser: state.currUser,
  };
};

export default connect(mapStateToProps)(AllTransactions);
