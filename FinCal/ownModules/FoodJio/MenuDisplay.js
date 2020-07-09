/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';
import NumericInput from 'react-native-numeric-input';
import SectionList from 'react-native-tabs-section-list';

import {menuData, resData} from '../MenuData';
import {darkTheme, lightTheme} from '../GlobalValues.js';

export default function MenuDisplay(props) {
  let menuIdx = props.menuIdx;
  let currUser = props.currUser;
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

  let [numItem, updateNumItem] = useState([]);

  useEffect(() => {
    let tempArr = [];

    for (let i = 0; i < menuData[menuIdx].length; i++) {
      tempArr.push([]);
      // console.log(menuData[menuIdx][i].data.length);
      for (let j = 0; j < menuData[menuIdx][i].data.length; j++) {
        tempArr[i].push(0);
      }
    }
    updateNumItem(tempArr);
  }, [menuIdx]);

  function changeOrder(x, y, newVal) {
    let newNumItem = [...numItem];
    // let newNumItem = numItem;
    // let newNumItem = JSON.parse(JSON.stringify(numItem));

    newNumItem[x][y] = newVal;
    updateNumItem(newNumItem);
  }

  const localStyle = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#333333',
    },
    tabBar: {
      backgroundColor: '#333333',
      borderBottomColor: '#333333',
      borderBottomWidth: 1,
    },
    tabContainer: {
      borderBottomColor: '#B19CD9',
    },
    tabText: {
      padding: 15,
      color: colorScheme.textCol,
      fontSize: 15,
      fontWeight: '500',
    },
    sectionHeaderText: {
      color: colorScheme.textCol,
      backgroundColor: '#333333',
      fontSize: 20,
      fontWeight: 'bold',
      paddingTop: 20,
      paddingHorizontal: 15,
    },
    itemContainer: {
      paddingVertical: 10,
      paddingHorizontal: 15,
      backgroundColor: '#333333',
    },
    itemTitle: {
      flex: 1,
      fontSize: 15,
      marginRight: 20,
      color: colorScheme.textCol,
    },
    itemPrice: {
      fontSize: 15,
      color: colorScheme.textCol,
    },
    itemRow: {
      flexDirection: 'row',
    },
    numericWrap: {
      marginLeft: 15,
      marginTop: -5,
      marginBottom: -5,
    },
    itemCode: {
      flexShrink: 1,
      fontSize: 15,
      marginRight: 20,
      color: colorScheme.textCol,
    },
    marginView: {
      height: 400,
    },
    resView: {
      marginBottom: 10,
    },
    outletName: {
      color: colorScheme.textCol,
      fontSize: 20,
      fontWeight: 'bold',
      fontStyle: 'italic',
      marginLeft: 15,
    },
    outletSub: {
      color: colorScheme.textCol,
      fontSize: 15,
      fontWeight: 'bold',
      fontStyle: 'italic',
      marginLeft: 15,
    },
    loadingMain: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

  if (numItem.length !== 0) {
    return (
      <View>
        <View style={localStyle.resView}>
          <Text style={localStyle.outletName}>{resData[menuIdx].name}</Text>
          <Text style={localStyle.outletSub}>{resData[menuIdx].address}</Text>
          <Text style={localStyle.outletSub}>
            Opening hours: {resData[menuIdx].openingTime} -{' '}
            {resData[menuIdx].closingTime} ({resData[menuIdx].openDays})
          </Text>
        </View>
        <View style={localStyle.marginView}>
          <SectionList
            sections={menuData[menuIdx]}
            keyExtractor={(menu) => menu}
            stickySectionHeadersEnabled={false}
            scrollToLocationOffset={50}
            tabBarStyle={localStyle.tabBar}
            renderTab={({title, isActive}) => (
              <View
                style={[
                  localStyle.tabContainer,
                  {borderBottomWidth: isActive ? 1 : 0},
                ]}>
                <Text
                  style={[
                    localStyle.tabText,
                    {color: isActive ? '#B19CD9' : 'grey'},
                  ]}>
                  {title}
                </Text>
              </View>
            )}
            renderSectionHeader={({section}) => (
              <View key={section.idx}>
                <Text style={localStyle.sectionHeaderText}>
                  {section.title}
                </Text>
              </View>
            )}
            renderItem={({item, index}) => (
              <View style={localStyle.itemContainer} key={index + item.x}>
                <View style={localStyle.itemRow}>
                  <Text style={localStyle.itemCode}>{item.serialNum}</Text>
                  <Text style={localStyle.itemTitle}>{item.itemName}</Text>
                  <Text style={localStyle.itemPrice}>${item.itemPrice}</Text>
                  <NumericInput
                    type="plus-minus"
                    minValue={0}
                    value={numItem[item.x][index]}
                    onChange={(val) => changeOrder(item.x, index, val)}
                    rounded
                    rightButtonBackgroundColor="transparent"
                    leftButtonBackgroundColor="transparent"
                    textColor={colorScheme.textCol}
                    borderColor="transparent"
                    iconStyle={{color: colorScheme.textCol}}
                    totalWidth={100}
                    totalHeight={35}
                    separatorWidth={0}
                    containerStyle={[
                      localStyle.numericWrap,
                      {
                        backgroundColor:
                          numItem[item.x][index] === 0
                            ? 'transparent'
                            : '#5FA052',
                      },
                    ]}
                  />
                </View>
              </View>
            )}
          />
        </View>
      </View>
    );
  } else {
    return (
      <View style={localStyle.loadingMain}>
        <ActivityIndicator size="large" color={colorScheme.inputTextWrapper} />
      </View>
    );
  }
}
