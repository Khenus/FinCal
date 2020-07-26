import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import EIcon from 'react-native-vector-icons/Entypo';
import Toast from 'react-native-simple-toast';

import {darkTheme, lightTheme} from '../GlobalValues';
import {menuData} from '../MenuData';
import {updateOrder} from '../API';

export default function HomeMenuSummary(props) {
  let navigation = props.navigation;
  let currUser = props.route.params.currUser;
  let orderList = props.route.params.orderList;
  let currItem = props.route.params.currItem;

  let parentDarkTheme = currUser.themeIsDark === 'true';

  let [themeDark, updateTheme] = useState(true);
  let [colorScheme, updateColorScheme] = useState(darkTheme);

  useEffect(() => {
    themeDark === true
      ? updateColorScheme(darkTheme)
      : updateColorScheme(lightTheme);
  }, [themeDark]);

  useEffect(() => {
    updateTheme(parentDarkTheme);
  }, [parentDarkTheme]);

  let [finalOrder, updateFinalOrder] = useState([]);
  let [finalOrderIdx, updateFinalOrderidx] = useState([]);
  let [isLoading, updateIsLoading] = useState(false);
  let [totalAmt, updateTotalAmt] = useState(0.0);

  useEffect(() => {
    updateIsLoading(true);

    if (orderList.length !== 0 && currItem !== undefined) {
      let tempArr = [];
      let tempOrderArr = [];
      let total = 0.0;

      for (let i = 0; i < menuData[currItem.resIdx].length; i++) {
        for (let j = 0; j < menuData[currItem.resIdx][i].data.length; j++) {
          if (orderList[i][j] !== 0) {
            let tempObj = {
              actualItem: menuData[currItem.resIdx][i].data[j],
              Amount: orderList[i][j],
            };

            let tempIdxObj = {x: i, y: j, val: orderList[i][j]};

            tempOrderArr.push(tempIdxObj);
            tempArr.push(tempObj);
            total +=
              parseFloat(menuData[currItem.resIdx][i].data[j].itemPrice) *
              parseFloat(orderList[i][j]);
          }
        }
      }

      updateFinalOrderidx(tempOrderArr);
      updateFinalOrder(tempArr);
      updateTotalAmt(total);
    }

    updateIsLoading(false);
  }, [currItem, currItem.resIdx, orderList]);

  async function updateMyOrder() {
    let orderPlaced = '';
    if (finalOrderIdx.length === 0) {
      // console.log('inside final order idx');
      orderPlaced = 'Pending';
    } else {
      orderPlaced = 'Ordered';
    }

    let result = await updateOrder(
      currUser.uuid,
      currItem.jioUUID,
      finalOrderIdx,
      orderPlaced,
    );

    Toast.show(result);

    if (result === 'Jio Order Updated Successfully') {
      navigation.pop(2);
    }
  }

  const localStyle = StyleSheet.create({
    mainView: {
      flex: 1,
      backgroundColor: colorScheme.backCol,
    },

    marginView: {
      marginBottom: 20,
      marginLeft: 20,
      marginRight: 20,
    },

    text: {
      color: colorScheme.textCol,
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

    header: {
      color: colorScheme.textCol,
      fontSize: 20,
    },

    subheader: {
      marginTop: 20,
      color: colorScheme.textCol,
      fontSize: 17,
    },

    btn: {
      margin: 30,
      height: 50,
      borderRadius: 10,
      backgroundColor: 'grey',
      alignItems: 'center',
      justifyContent: 'center',
    },

    btnText: {
      color: colorScheme.textCol,
      fontSize: 15,
    },
  });

  function back() {
    navigation.pop(1);
  }

  if (isLoading || currItem === undefined) {
    return (
      <View style={localStyle.mainView}>
        <View style={localStyle.headerBar}>
          <TouchableOpacity onPress={back}>
            <Icon name="arrow-back" size={25} style={localStyle.text} />
          </TouchableOpacity>
          <View style={localStyle.headerPadding} />
        </View>
        <ActivityIndicator size="small" color={colorScheme.textCol} />
      </View>
    );
  } else {
    return (
      <View style={localStyle.mainView}>
        <View style={localStyle.headerBar}>
          <TouchableOpacity onPress={back}>
            <Icon name="arrow-back" size={25} style={localStyle.text} />
          </TouchableOpacity>
          <View style={localStyle.headerPadding} />
        </View>
        <ScrollView>
          <View style={localStyle.marginView}>
            <Text style={localStyle.header}>Jio Summary</Text>

            <Text style={localStyle.subheader}>Title: </Text>
            <Text style={localStyle.text}>{currItem.jioTitle}</Text>

            <Text style={localStyle.subheader}>Details: </Text>
            <Text style={localStyle.text}>{currItem.jioComments || 'NA'}</Text>

            <Text style={localStyle.subheader}>Jio created by: </Text>
            <Text style={localStyle.text}>{currItem.creatorName || ''}</Text>

            <Text style={localStyle.subheader}>My Orders: </Text>
            {finalOrder.map((innerItem, currIdx) => (
              <OrderItem
                colorScheme={colorScheme}
                item={innerItem}
                key={currIdx}
              />
            ))}

            <Text style={localStyle.subheader}>
              Total Amount for My Orders:{' '}
            </Text>
            <Text style={localStyle.text}>${totalAmt.toFixed(2)}</Text>
          </View>

          <TouchableOpacity style={localStyle.btn} onPress={updateMyOrder}>
            <Text style={localStyle.btnText}>Add Order</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }
}

function OrderItem(props) {
  let colorScheme = props.colorScheme;
  let item = props.item;

  const localStyle = StyleSheet.create({
    textCol: {
      color: colorScheme.textCol,
    },

    textBox: {
      flex: 1,
      color: colorScheme.textCol,
      // borderColor: 'white',
      // borderWidth: 1,
    },

    serial: {
      color: colorScheme.textCol,
      marginRight: 15,
    },

    price: {
      color: colorScheme.textCol,
      marginRight: 15,
    },

    itemBar: {
      flexDirection: 'row',
      alignItems: 'center',
      // borderColor: 'white',
      // borderWidth: 1,
    },

    amountItem: {
      justifyContent: 'flex-end',
      color: colorScheme.textCol,
      // borderColor: 'white',
      // borderWidth: 1,
    },
  });

  return (
    <View style={localStyle.itemBar}>
      <EIcon name="dot-single" size={25} style={localStyle.textCol} />
      <Text style={localStyle.serial}>{item.actualItem.serialNum}</Text>
      <Text style={localStyle.textBox}>{item.actualItem.itemName}</Text>
      <Text style={localStyle.price}>{item.actualItem.itemPrice}</Text>
      <Text style={localStyle.amountItem}>x{item.Amount}</Text>
    </View>
  );
}
