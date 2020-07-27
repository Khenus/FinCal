import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';

import Toast from 'react-native-simple-toast';
import MatIcon from 'react-native-vector-icons/MaterialIcons';
import FeatherIcon from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';

import {darkTheme, lightTheme} from '../GlobalValues';
import {Overlay} from 'react-native-elements';
import Icon from 'react-native-vector-icons/Foundation';

import {paidLedger, deleteLedger} from '../API';

export default function LedgerCard(props) {
  let navigation = useNavigation();

  let paymentType = props.paymentType || 'normal';
  let cardType = props.cardType || 'payment';
  let parentThemeDark = props.parentThemeDark || true;
  let parWidth = props.parWidth;
  let currObj = props.currObj;
  let reloadPage = props.reloadPage;

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
      width: parWidth * 0.3,
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
        fromUUID: currObj.toUUID,
        toUUID: currObj.fromUUID,
        Name: currObj.fromName,
        cardType: 'receive',
        Amount: currObj.Amount,
      });
    }
  }

  let [open, updateOpen] = useState(false);

  if (cardType === 'payment') {
    if (clickable) {
      return (
        <View style={styles.allWrapper}>
          <View style={styles.padding} />
          <TouchableOpacity
            style={styles.wholeCompo}
            onPress={clickHandler}
            onLongPress={() => updateOpen(true)}>
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
              <Text style={styles.amountText}>
                ${parseFloat(amount).toFixed(2)}
              </Text>
            </View>
          </TouchableOpacity>
          <LedgerActions
            open={open}
            updateOpen={updateOpen}
            currItem={currObj}
            reloadPage={reloadPage}
          />
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
              <Text style={styles.amountText}>
                ${parseFloat(amount).toFixed(2)}
              </Text>
            </View>
          </View>
        </View>
      );
    }
  } else {
    if (clickable) {
      return (
        <View style={styles.allWrapper}>
          <TouchableOpacity
            style={styles.wholeCompo}
            onPress={clickHandler}
            onLongPress={() => updateOpen(true)}>
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
              <Text style={styles.amountText}>
                ${parseFloat(amount).toFixed(2)}
              </Text>
            </View>
          </TouchableOpacity>
          <View style={styles.padding} />
          <LedgerActions
            open={open}
            updateOpen={updateOpen}
            currItem={currObj}
            reloadPage={reloadPage}
          />
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
              <Text style={styles.amountText}>
                ${parseFloat(amount).toFixed(2)}
              </Text>
            </View>
          </View>
          <View style={styles.padding} />
        </View>
      );
    }
  }
}

function LedgerActions(props) {
  let open = props.open;
  let updateOpen = props.updateOpen;
  let currItem = props.currItem;
  let reloadPage = props.reloadPage;

  let [confirmOpen, updateConfirmOpen] = useState(false);
  let [confirmAction, updateConfirmAction] = useState('');

  const styles = StyleSheet.create({
    btnStyle: {
      margin: 5,
      padding: 10,
      width: 200,
      backgroundColor: 'white',
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
    },

    cancelBtn: {
      margin: 5,
      marginTop: 30,
      padding: 10,
      width: 200,
      backgroundColor: 'pink',
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
    },

    mainView: {
      justifyContent: 'center',
      alignItems: 'center',
    },

    overStyles: {
      backgroundColor: 'grey',
      borderRadius: 10,
    },

    title: {
      margin: 20,
      fontSize: 20,
      fontWeight: 'bold',
      color: 'white',
    },

    text: {
      color: 'white',
    },

    iconWrap: {
      borderWidth: 2,
      borderColor: 'white',
      paddingTop: 15,
      paddingBottom: 15,
      paddingLeft: 20,
      paddingRight: 20,
      borderRadius: 35,
      marginTop: 10,
    },
  });

  async function executeActions() {
    if (confirmAction === 'delete') {
      let res = await deleteLedger(currItem.ledgerUUID);

      Toast.show(res);
      if (res === 'Ledger Deleted') {
        updateOpen(false);
        updateConfirmOpen(false);
        reloadPage();
      }
    } else if (confirmAction === 'paid') {
      let res = await paidLedger(currItem.ledgerUUID);

      Toast.show(res);
      if (res === 'Ledger Paid') {
        updateOpen(false);
        updateConfirmOpen(false);
        reloadPage();
      }
    }
  }

  let disVal;
  if (confirmOpen) {
    disVal = (
      <View style={styles.mainView}>
        <Text style={styles.title}>Are you sure?</Text>

        <TouchableOpacity style={styles.btnStyle} onPress={executeActions}>
          <Text>Confirm</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.btnStyle}
          onPress={() => updateConfirmOpen(false)}>
          <Text>Cancel</Text>
        </TouchableOpacity>
      </View>
    );
  } else {
    disVal = (
      <View style={styles.mainView}>
        <View style={styles.iconWrap}>
          <Icon name="wrench" size={30} style={styles.text} />
        </View>
        <Text style={styles.title}>Ledger Actions</Text>

        {/* <TouchableOpacity style={styles.btnStyle}>
          <Text>Edit Ledger</Text>
        </TouchableOpacity> */}
        <TouchableOpacity
          style={styles.btnStyle}
          onPress={() => {
            updateConfirmOpen(true);
            updateConfirmAction('delete');
          }}>
          <Text>Delete Ledger</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.btnStyle}
          onPress={() => {
            updateConfirmOpen(true);
            updateConfirmAction('paid');
          }}>
          <Text>Ledger Paid!</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.cancelBtn}
          onPress={() => updateOpen(false)}>
          <Text>Cancel</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <Overlay
      isVisible={open}
      onBackdropPress={() => updateOpen(false)}
      overlayStyle={styles.overStyles}>
      {disVal}
    </Overlay>
  );
}
