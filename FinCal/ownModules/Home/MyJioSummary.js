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
import {connect} from 'react-redux';
import Toast from 'react-native-simple-toast';

import {darkTheme, lightTheme} from '../GlobalValues';
import {menuData} from '../MenuData';
import {fetchFullMyJio, closeJio} from '../API';
import {updateParenthesizedType} from 'typescript';

function MyJioSummary(props) {
  let navigation = props.navigation;
  let currUser = props.currUser;
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

  let [isLoading, updateIsLoading] = useState(false);

  let [allLedgerDetail, updateAllLedgerDetail] = useState([]);
  let [allPersonalDetail, updateAllPersonalDetail] = useState([]);
  let [allTotalFin, updateAllTotalFin] = useState(0.0);
  let [allDetailFin, updateAllDetailFin] = useState([]);

  // useEffect(() => {
  //   // console.log('All personal detail ' + JSON.stringify(allPersonalDetail));
  //   console.log('All personal detail ');
  //   console.log(allPersonalDetail);
  // }, [allPersonalDetail]);

  // useEffect(() => {
  //   console.log('All allTotalFin ' + allTotalFin);
  // }, [allTotalFin]);

  // useEffect(() => {
  //   // console.log('All final detail ' + JSON.stringify(allDetailFin));
  //   console.log('All final detail ');
  //   console.log(allDetailFin);
  // }, [allDetailFin]);

  useEffect(() => {
    async function tempHandler() {
      if (currItem !== undefined) {
        let result = await fetchFullMyJio(currItem.jioUUID);

        if (typeof result === 'object') {
          //Creating the menu array
          let tempArr = [];
          for (let i = 0; i < menuData[currItem.resIdx].length; i++) {
            let innerArr = [];
            for (let j = 0; j < menuData[currItem.resIdx][i].data.length; j++) {
              innerArr.push(0);
            }

            tempArr.push(innerArr);
          }

          //To show the personal details to be displayed
          let finalDetailsAll = [];
          let finalLedgerAll = [];
          for (let i = 0; i < result.length; i++) {
            let currPerson = result[i];
            let currOrder = JSON.parse(currPerson.orderObj);

            let resultArr = [];
            let personTotal = 0.0;

            for (let j = 0; j < currOrder.length; j++) {
              tempArr[currOrder[j].x][currOrder[j].y] += currOrder[j].val;

              let itemName =
                menuData[currItem.resIdx][currOrder[j].x].data[currOrder[j].y]
                  .itemName;
              let perItemPrice =
                menuData[currItem.resIdx][currOrder[j].x].data[currOrder[j].y]
                  .itemPrice;
              let itemId =
                menuData[currItem.resIdx][currOrder[j].x].data[currOrder[j].y]
                  .serialNum;
              let numItem = currOrder[j].val;

              let tempObj = {
                foodName: itemName,
                foodPrice: perItemPrice,
                numberFood: numItem,
                foodId: itemId,
              };
              personTotal +=
                parseFloat(
                  menuData[currItem.resIdx][currOrder[j].x].data[currOrder[j].y]
                    .itemPrice,
                ) * parseFloat(currOrder[j].val);

              resultArr.push(tempObj);
            }

            let tempDetail = {
              foodDetails: resultArr,
              totalAmt: personTotal,
              userName: currPerson.peepsName,
            };

            let tempLedgerDetail = {
              totalAmt: personTotal,
              userUUID: currPerson.peepsUUID,
              userName: currPerson.peepsName,
            };

            finalDetailsAll.push(tempDetail);
            finalLedgerAll.push(tempLedgerDetail);
          }

          //To calculate the needed total and all details to be displayed
          let allTotal = 0.0;
          let allDetails = [];
          for (let i = 0; i < menuData[currItem.resIdx].length; i++) {
            for (let j = 0; j < menuData[currItem.resIdx][i].data.length; j++) {
              if (tempArr[i][j] !== 0) {
                let itemName = menuData[currItem.resIdx][i].data[j].itemName;
                let perItemPrice =
                  menuData[currItem.resIdx][i].data[j].itemPrice;
                let itemId = menuData[currItem.resIdx][i].data[j].serialNum;
                let numItem = tempArr[i][j];

                let tempObj = {
                  foodName: itemName,
                  foodPrice: perItemPrice,
                  numberFood: numItem,
                  foodId: itemId,
                };

                allTotal +=
                  parseFloat(menuData[currItem.resIdx][i].data[j].itemPrice) *
                  parseFloat(tempArr[i][j]);

                allDetails.push(tempObj);
              }
            }
          }

          updateAllPersonalDetail(finalDetailsAll);
          updateAllLedgerDetail(finalLedgerAll);
          updateAllTotalFin(allTotal);
          updateAllDetailFin(allDetails);
        }
      }
    }

    updateIsLoading(true);
    tempHandler();
    updateIsLoading(false);
  }, [currItem, currItem.resIdx]);

  useEffect(() => {
    console.log(allPersonalDetail);
  }, [allPersonalDetail]);

  useEffect(() => {
    console.log(allLedgerDetail);
  }, [allLedgerDetail]);

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
      marginLeft: 30,
      marginRight: 30,
      marginTop: 15,
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

    noneText: {
      marginLeft: 25,
      fontStyle: 'italic',
      color: colorScheme.textCol,
    },

    itemWrapper: {
      marginTop: 10,
      marginBottom: 10,
    },

    namePrice: {
      fontSize: 16,
      marginBottom: 5,
      color: colorScheme.textCol,
    },

    padding: {
      height: 40,
    },
  });

  function back() {
    navigation.pop(1);
  }

  function updateMyOrder() {
    navigation.pop(1);
    navigation.navigate('EditMenu', {
      currUser: currUser,
      currItem: currItem,
    });
  }

  async function closeMyJio() {
    let result = await closeJio(
      currItem.jioUUID,
      currUser.Name,
      currUser.uuid,
      allLedgerDetail,
      currItem.jioTitle,
    );
    Toast.show(result);

    if (result === 'MyJio closed Successfully') {
      navigation.pop(1);
    }
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
            <Text style={localStyle.header}>My Jio Currently</Text>

            <Text style={localStyle.subheader}>Title: </Text>
            <Text style={localStyle.text}>{currItem.jioTitle}</Text>

            <Text style={localStyle.subheader}>Details: </Text>
            <Text style={localStyle.text}>{currItem.jioComments || 'NA'}</Text>

            {/* <Text style={localStyle.subheader}>Individual Orders: </Text>
            <Text style={localStyle.text}>{currItem.creatorName || ''}</Text> */}

            <Text style={localStyle.subheader}>Individual Orders: </Text>
            {allPersonalDetail.map((innerItem, currIdx) => {
              let item;
              if (innerItem.foodDetails.length === 0) {
                item = <Text style={localStyle.noneText}>None</Text>;
              } else {
                item = innerItem.foodDetails.map((itemItem, itemIdx) => (
                  <OrderItem
                    colorScheme={colorScheme}
                    item={itemItem}
                    key={itemIdx}
                  />
                ));
              }

              return (
                <View key={currIdx} style={localStyle.itemWrapper}>
                  <Text style={localStyle.namePrice}>{`${
                    innerItem.userName || ''
                  }     (Total: $${innerItem.totalAmt.toFixed(2)})`}</Text>
                  {item}
                </View>
              );
            })}

            <Text style={localStyle.subheader}>Collated Orders: </Text>
            <View style={localStyle.itemWrapper}>
              <Text
                style={localStyle.namePrice}>{`Total: $${allTotalFin.toFixed(
                2,
              )}`}</Text>
              {allDetailFin.map((innerItem, currIdx) => {
                let item;
                if (allDetailFin.length === 0) {
                  item = <Text style={localStyle.noneText}>None</Text>;
                } else {
                  item = (
                    <OrderItem
                      colorScheme={colorScheme}
                      item={innerItem}
                      key={currIdx}
                    />
                  );
                }

                return item;
              })}
            </View>
          </View>

          <TouchableOpacity style={localStyle.btn} onPress={updateMyOrder}>
            <Text style={localStyle.btnText}>Edit My Order</Text>
          </TouchableOpacity>

          <TouchableOpacity style={localStyle.btn} onPress={closeMyJio}>
            <Text style={localStyle.btnText}>Close Jio</Text>
          </TouchableOpacity>

          <View style={localStyle.padding} />
        </ScrollView>
      </View>
    );
  }
}

// function UserItem(props) {
//   let colorScheme = props.colorScheme;
//   let userItem = props.userItem;

//   const localStyle = StyleSheet.create({

//   });

//   return (
//     <Text style={localStyle.text}>{`${currItem.userName || ''} ($${
//       currItem.totalAmt
//     })`}</Text>
//     {}

//   );
// }

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
      <Text style={localStyle.serial}>{item.foodId}</Text>
      <Text style={localStyle.textBox}>{item.foodName}</Text>
      <Text style={localStyle.price}>{item.foodPrice}</Text>
      <Text style={localStyle.amountItem}>x{item.numberFood}</Text>
    </View>
  );
}

const mapStateToProps = (state) => {
  return {
    currUser: state.currUser,
  };
};

export default connect(mapStateToProps)(MyJioSummary);
