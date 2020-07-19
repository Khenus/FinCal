import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';
import moment from 'moment';

import {monthName} from '../GlobalObject.js';
import {resData} from '../MenuData.js';
import {fetchTransact} from '../API';
import {darkTheme, lightTheme} from '../GlobalValues.js';
import FloatActionButton from '../FloatActionButton';
import PieChartWithDynamicSlices from '../Personal/Components/PieChartWithDynamicSlices';
// import TransactionList from '../Personal/Components/TransactionList';

import {getLedger, getJio} from '../API';

function HomeScreen(props) {
  let navigation = props.navigation;
  let currUser = props.currUser;

  let [themeDark, updateTheme] = useState(true);
  let [colorScheme, updateColorScheme] = useState(darkTheme);

  let parentDarkTheme = currUser.themeIsDark === 'true';

  useEffect(() => {
    themeDark === true
      ? updateColorScheme(darkTheme)
      : updateColorScheme(lightTheme);
  }, [themeDark]);

  useEffect(() => {
    updateTheme(parentDarkTheme);
  }, [parentDarkTheme]);

  // let [transactData, updateTransactData] = useState([]);
  let [currDate, updateCurrDate] = useState(new Date());

  const localStyle = StyleSheet.create({
    mainView: {
      flex: 1,
      backgroundColor: colorScheme.backCol,
      // borderColor: 'white',
      // borderWidth: 1,
    },

    welcomeStyle: {
      color: colorScheme.textCol,
      fontSize: 25,
      fontWeight: 'bold',
      marginTop: 20,
      marginLeft: 15,
    },

    dateStyle: {
      color: colorScheme.textCol,
      fontSize: 20,
      marginLeft: 15,
      marginBottom: 10,
    },

    header: {
      marginBottom: 10,
    },

    subHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },

    subtitleStyle: {
      color: colorScheme.textCol,
      fontSize: 18,
      fontWeight: 'bold',
      fontStyle: 'italic',
      marginLeft: 15,
      marginBottom: 10,
    },

    viewDetails: {
      color: 'aquamarine',
      marginRight: 15,
    },

    toPay: {
      color: 'red',
      fontSize: 18,
      fontStyle: 'italic',
    },

    toRecv: {
      color: 'green',
      fontSize: 18,
      fontStyle: 'italic',
    },

    loadingMain: {
      flexGrow: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },

    jioDisplay: {
      marginLeft: 15,
    },

    jioText: {
      color: colorScheme.textCol,
      fontSize: 17,
    },

    card: {
      marginTop: 5,
      marginBottom: 5,
      padding: 10,
      backgroundColor: 'grey',
      borderRadius: 10,
    },

    centralView: {
      justifyContent: 'center',
      alignItems: 'center',
    },

    jioWrap: {
      margin: 15,
      marginBottom: 40,
    },

    jioNormal: {
      color: colorScheme.textCol,
    },

    jioRes: {
      color: colorScheme.textCol,
      fontSize: 17,
      fontStyle: 'italic',
    },
  });

  let [monthlyTransactData, updateMonthlyTransactData] = useState([]);
  let [toPayAmt, updateToPayAmt] = useState(0.0);
  let [toRecvAmt, updateToRecvAmt] = useState(0.0);
  let [isLoading, updateIsLoading] = useState(false);
  let [jioInvite, updateJioInvite] = useState([]);
  let [myJio, updateMyJio] = useState([]);

  useEffect(() => {
    async function tempGetTrans() {
      let result = await fetchTransact(currUser.Email, currUser.uuid, 1);

      if (typeof result === 'object') {
        //Updating trasaction data for the recent trasaction
        // updateTransactData(result);

        //Updated trasaction data sorted by month
        let tempArr = [];
        for (let j = 0; j < 12; j++) {
          tempArr.push([]);
        }

        for (let i = 0; i < result.length; i++) {
          let currUnix = parseInt(result[i].createdAtUnix, 10) * 1000;
          let tempMonth = new Date(currUnix).getMonth();
          tempArr[tempMonth].push(result[i]);
        }

        updateMonthlyTransactData(tempArr);
      }
    }

    async function tempGetLedger() {
      let toPayRes = await getLedger('getToPay', currUser.Email, currUser.uuid);
      let toRecvRes = await getLedger(
        'getToRecv',
        currUser.Email,
        currUser.uuid,
      );

      if (typeof toRecvRes === 'object' && typeof toPayRes === 'object') {
        let toPayAmtTemp = 0.0;
        let toRecvAmtTemp = 0.0;

        for (let i = 0; i < toPayRes.length; i++) {
          toPayAmtTemp += parseFloat(toPayRes[i].Amount);
        }

        for (let i = 0; i < toRecvRes.length; i++) {
          toRecvAmtTemp += parseFloat(toRecvRes[i].Amount);
        }

        updateToPayAmt(toPayAmtTemp.toFixed(2));
        updateToRecvAmt(toRecvAmtTemp.toFixed(2));
      }
    }

    async function tempGetJio() {
      let result = await getJio(currUser.uuid);

      if (typeof result === 'object') {
        let myTemp = [];
        let inviteTemp = [];

        for (let i = 0; i < result.length; i++) {
          if (result[i].peepsUUID === result[i].creatorUUID) {
            myTemp.push(result[i]);
          } else {
            inviteTemp.push(result[i]);
          }
        }
        updateMyJio(myTemp);
        updateJioInvite(inviteTemp);
      }
    }

    updateIsLoading(true);
    tempGetTrans();
    tempGetLedger();
    tempGetJio();
    updateIsLoading(false);
  }, [currUser.Email, currUser.uuid]);

  useEffect(() => {
    async function fetchJioAgain() {
      let result = await getJio(currUser.uuid);

      if (typeof result === 'object') {
        let myTemp = [];
        let inviteTemp = [];

        for (let i = 0; i < result.length; i++) {
          if (result[i].peepsUUID === result[i].creatorUUID) {
            myTemp.push(result[i]);
          } else {
            inviteTemp.push(result[i]);
          }
        }
        updateMyJio(myTemp);
        updateJioInvite(inviteTemp);
      }
    }

    async function fetchTransactAgain() {
      let result = await fetchTransact(currUser.Email, currUser.uuid, 1);

      if (typeof result === 'object') {
        //Updating trasaction data for the recent trasaction
        // updateTransactData(result);

        //Updated trasaction data sorted by month
        let tempArr = [];
        for (let j = 0; j < 12; j++) {
          tempArr.push([]);
        }

        for (let i = 0; i < result.length; i++) {
          let currUnix = parseInt(result[i].createdAtUnix, 10) * 1000;
          let tempMonth = new Date(currUnix).getMonth();
          tempArr[tempMonth].push(result[i]);
        }

        updateMonthlyTransactData(tempArr);
      }
    }

    const reload = navigation.addListener('focus', () => {
      fetchJioAgain();
      fetchTransactAgain();
    });

    return reload;
  }, [currUser.Email, currUser.uuid, navigation]);

  function toEditMenu(currItem) {
    navigation.navigate('EditMenu', {
      currItem: currItem,
    });
  }

  function toMyJioSummary(currItem) {
    navigation.navigate('MyJioSummary', {
      currItem: currItem,
    });
  }

  let jioInviteShow;
  if (jioInvite.length !== 0) {
    jioInviteShow = jioInvite.map((currItem, currIdx) => {
      let td = new Date(currItem.unixCreatedAt * 1000);

      let status =
        currItem.orderPlaced !== 'Ordered'
          ? currItem.orderPlaced === 'Pending'
            ? 'No order yet'
            : 'Jio Rejected'
          : 'Order Placed';
      return (
        <View key={currIdx}>
          <TouchableOpacity
            style={localStyle.card}
            onPress={() => toEditMenu(currItem)}>
            <Text style={localStyle.jioRes}>
              {resData[currItem.resIdx].name}
            </Text>
            <Text style={localStyle.jioNormal}>
              created at{' '}
              {`${td.getHours()}:${td.getMinutes()}, ${td.getDate()} ${
                monthName[td.getMonth()]
              } ${td.getFullYear()}`}{' '}
              by {currItem.creatorName}
            </Text>
            <Text style={localStyle.jioNormal}>{status}</Text>
          </TouchableOpacity>
        </View>
      );
    });
  } else {
    jioInviteShow = (
      <View style={localStyle.centralView}>
        <Text style={localStyle.jioNormal}>There are no Jio invite yet.</Text>
      </View>
    );
  }

  let myJioShow;
  if (myJio.length !== 0) {
    myJioShow = myJio.map((currItem, currIdx) => {
      let td = new Date(currItem.unixCreatedAt * 1000);
      return (
        <View key={currIdx}>
          <TouchableOpacity
            style={localStyle.card}
            onPress={() => toMyJioSummary(currItem)}>
            <Text style={localStyle.jioRes}>
              {resData[currItem.resIdx].name}
            </Text>
            <Text style={localStyle.jioNormal}>
              created at{' '}
              {`${td.getHours()}:${td.getMinutes()}, ${td.getDate()} ${
                monthName[td.getMonth()]
              } ${td.getFullYear()}`}
            </Text>
          </TouchableOpacity>
        </View>
      );
    });
  } else {
    myJioShow = (
      <View style={localStyle.centralView}>
        <Text style={localStyle.jioNormal}>There are no Jio created yet.</Text>
      </View>
    );
  }

  if (isLoading) {
    return (
      <View style={localStyle.mainView}>
        <View style={localStyle.loadingMain}>
          <ActivityIndicator size="large" color={colorScheme.textCol} />
        </View>
      </View>
    );
  } else {
    return (
      <View style={localStyle.mainView}>
        <ScrollView>
          {/* WELCOME HEADER */}
          <View>
            <Text style={localStyle.welcomeStyle}>
              Welcome back, {currUser.Name}!
            </Text>
            <Text style={localStyle.dateStyle}>
              Today is {moment().format('Do MMMM YYYY, dddd')}
            </Text>
          </View>

          {/* MONTH OVERVIEW */}
          <View>
            <View style={[localStyle.subHeader, localStyle.header]}>
              <Text style={localStyle.subtitleStyle}>
                {`${monthName[currDate.getMonth()]} ${currDate.getFullYear()}`}{' '}
                overview
              </Text>
              <Text
                style={localStyle.viewDetails}
                onPress={() => navigation.navigate('Personal')}>
                View details
              </Text>
            </View>
            <PieChartWithDynamicSlices
              currUser={currUser}
              disData={monthlyTransactData[currDate.getMonth()]}
            />
            <Text />
          </View>

          {/* JIOS */}
          <View style={localStyle.jioWrap}>
            <View style={localStyle.subHeader}>
              <Text style={[localStyle.subtitleStyle, {marginLeft: 0}]}>
                FoodJio
              </Text>
              {/* <Text
                style={[localStyle.viewDetails, {marginRight: 0}]}
                onPress={() => navigation.navigate('AllTransactions')}>
                View all
              </Text> */}
            </View>

            <Text style={localStyle.jioText}>My Jio</Text>
            {myJioShow}

            <Text style={localStyle.jioText}>Jio Invite</Text>
            {jioInviteShow}
          </View>

          {/* LEGDER SUMMARY */}
          <View style={localStyle.jioWrap}>
            <View style={localStyle.subHeader}>
              <Text style={[localStyle.subtitleStyle, {marginLeft: 0}]}>
                Ledger summary
              </Text>
              <Text
                style={[localStyle.viewDetails, {marginRight: 0}]}
                onPress={() => navigation.navigate('Ledger')}>
                View details
              </Text>
            </View>
            <Text style={localStyle.toPay}>To pay: $ {toPayAmt}</Text>
            <Text style={localStyle.toRecv}>To receive: $ {toRecvAmt}</Text>
          </View>
        </ScrollView>
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

export default connect(mapStateToProps)(HomeScreen);
