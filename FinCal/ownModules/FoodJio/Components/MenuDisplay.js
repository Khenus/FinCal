import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  useWindowDimensions,
} from 'react-native';

import {menuData, resData} from '../../MenuData.js';
import {darkTheme, lightTheme} from '../../GlobalValues.js';
import IndividualMenu from './IndividualMenu.js';
import {TouchableOpacity, FlatList} from 'react-native-gesture-handler';

export default function MenuDisplay(props) {
  let currHeight = useWindowDimensions().height;

  let currItem = props.currItem;
  let menuIdx = props.menuIdx;
  let currUser = props.currUser;
  let parOrderList = props.parOrderList;
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
  let [menuTitle, updateMenuTitle] = useState([]);

  let [selectedIdx, updateSelectedIdx] = useState(0);
  let [selectedData, updateSelectedData] = useState([]);

  let [prevFirstItem, updatePrevFirst] = useState('');
  let [isLoading, updateIsLoading] = useState(false);

  useEffect(() => {
    let tempArr = [];
    let tempTitle = [];

    for (let i = 0; i < menuData[menuIdx].length; i++) {
      tempArr.push([]);
      tempTitle.push(menuData[menuIdx][i].title);
      for (let j = 0; j < menuData[menuIdx][i].data.length; j++) {
        tempArr[i].push(0);
      }
    }

    if (currItem !== undefined && currItem !== '[]') {
      let orderArr = JSON.parse(currItem.orderObj);

      for (let i = 0; i < orderArr.length; i++) {
        tempArr[orderArr[i].x][orderArr[i].y] = orderArr[i].val;
      }
    }

    updateNumItem(tempArr);
    parOrderList(tempArr);

    updateMenuTitle(tempTitle);
  }, [currItem, menuIdx, parOrderList]);

  useEffect(() => {
    updateSelectedData(menuData[menuIdx][selectedIdx].data);
  }, [menuIdx, selectedIdx]);

  function changeOrder(x, y, newVal) {
    updateIsLoading(true);
    let newNumItem = [...numItem];

    newNumItem[x][y] = newVal;
    updateNumItem(newNumItem);
    parOrderList(newNumItem);
    updateIsLoading(false);
  }

  function updateFirstItem(itemStr) {
    if (prevFirstItem !== itemStr) {
      updateIsLoading(false);
      updatePrevFirst(itemStr);
    }
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
    marginView: {
      height: currHeight * 0.5,
    },
    resView: {
      marginBottom: 10,
      flexDirection: 'row',
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
    tabClicker: {
      backgroundColor: 'grey',
    },
    tabWrapper: {
      marginLeft: 15,
      marginRight: 15,
      marginTop: 10,
      marginBottom: 10,
    },
    tabHeader: {
      color: colorScheme.textCol,
      fontSize: 17,
    },
    central: {
      flexGrow: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

  if (numItem.length !== 0) {
    return (
      <View>
        <View style={localStyle.resView}>
          <View>
            <Text style={localStyle.outletName}>{resData[menuIdx].name}</Text>
            <Text style={localStyle.outletSub}>{resData[menuIdx].address}</Text>
            <Text style={localStyle.outletSub}>
              Opening hours: {resData[menuIdx].openingTime} -{' '}
              {resData[menuIdx].closingTime} ({resData[menuIdx].openDays})
            </Text>
          </View>
          <View style={localStyle.central}>
            <ActivityIndicator
              animating={isLoading}
              size="small"
              color={colorScheme.inputTextWrapper}
            />
          </View>
        </View>
        <View style={localStyle.marginView}>
          <ScrollView horizontal={true}>
            {menuTitle.map((item, currIdx) => {
              return (
                <TouchableOpacity
                  key={currIdx}
                  style={localStyle.tabClicker}
                  onPress={() => {
                    if (currIdx !== selectedIdx) {
                      updateSelectedIdx(currIdx);
                      updateIsLoading(true);
                    }
                  }}>
                  <View style={localStyle.tabWrapper}>
                    <Text style={localStyle.tabHeader}>{item}</Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
          <FlatList
            // style={localStyle.listView}
            data={selectedData}
            keyExtractor={(item) => item.serialNum}
            renderItem={({index, item}) => {
              return (
                <IndividualMenu
                  currItem={item}
                  key={index}
                  idx={index}
                  currX={selectedIdx}
                  val={numItem[selectedIdx][index]}
                  colorScheme={colorScheme}
                  changeFunction={changeOrder}
                  updateFirst={updateFirstItem}
                />
              );
            }}
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
