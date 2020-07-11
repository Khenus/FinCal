import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';

import {darkTheme, lightTheme} from '../GlobalValues';
import Icon from 'react-native-vector-icons/FontAwesome';
import FeatherIcon from 'react-native-vector-icons/Feather';
import {ActivityIndicator} from 'react-native-paper';
import Toast from 'react-native-simple-toast';
import {searchNum} from '../API';

export default function AddPeople(props) {
  let currHeight = useWindowDimensions().height;

  let currUser = props.currUser;
  let parAddedPeeps = props.parAddedPeeps;
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

  let [searchVal, updateSearchVal] = useState('');
  let [isLoading, updateIsLoading] = useState(false);

  let [searchRes, updateSearchRes] = useState({});

  let [peepAdded, updatePeepAdded] = useState([]);

  let marginVal = 15;

  const styles = StyleSheet.create({
    mainView: {
      marginLeft: marginVal,
      marginRight: marginVal,
    },

    touchable: {
      justifyContent: 'flex-end',
      marginRight: 10,
    },

    searchBarInput: {
      flex: 1,
      marginRight: 40,
      color: colorScheme.textCol,
    },

    searchBar: {
      borderWidth: 2,
      borderColor: colorScheme.inputTextWrapper,
      borderRadius: 10,
      paddingLeft: 10,
      flexDirection: 'row',
      alignItems: 'center',
    },

    text: {
      color: colorScheme.textCol,
    },

    resTouchWrap: {
      backgroundColor: 'grey',
      padding: 15,
      borderRadius: 10,
      flexDirection: 'row',
      alignItems: 'center',
    },

    noResWrap: {
      flexGrow: 1,
      height: 55,
      alignItems: 'center',
      justifyContent: 'center',
    },

    searchResWrap: {
      marginTop: 10,
    },

    peopleWrap: {
      marginTop: 10,
      height: currHeight * 0.38,
      paddingBottom: 10,
    },

    searchText: {
      marginTop: 10,
      marginBottom: 10,
      color: colorScheme.textCol,
      fontSize: 17,
    },

    resName: {
      color: colorScheme.textCol,
      fontSize: 17,
      marginLeft: 20,
    },

    addedStyles: {
      alignItems: 'center',
      flexDirection: 'row',
      paddingBottom: 10,
      paddingTop: 10,
      borderBottomColor: 'grey',
      borderBottomWidth: 1,
    },

    peopleAdded: {
      flex: 1,
      color: colorScheme.textCol,
      fontSize: 17,
    },
  });

  async function searchBackEnd() {
    updateIsLoading(true);
    if (searchVal.length === 8 && searchVal !== currUser.Phone) {
      let result = await searchNum(searchVal);

      if (typeof result === 'object') {
        updateSearchRes(result[0]);
      } else {
        updateSearchRes({});
        Toast.show('Error searching for number: ' + result);
      }
    } else {
      Toast.show('Invalid phone number');
    }
    updateIsLoading(false);
  }

  function addToPeeps() {
    let exist = false;

    for (let i = 0; i < peepAdded.length; i++) {
      if (peepAdded[i].uuid === searchRes.uuid) {
        exist = true;
        break;
      }
    }

    if (exist !== true) {
      let tempArr = [...peepAdded];

      tempArr.push(searchRes);
      updatePeepAdded(tempArr);
      parAddedPeeps(tempArr);
    } else {
      Toast.show('User already added to Jio list');
    }
  }

  function removeFromPeeps(idx) {
    let tempArr = [...peepAdded];
    tempArr.splice(idx, 1);
    updatePeepAdded(tempArr);
    parAddedPeeps(tempArr);
  }

  let searchLogo;
  if (isLoading) {
    searchLogo = (
      <View style={styles.touchable}>
        <ActivityIndicator size="small" color={colorScheme.textCol} />
      </View>
    );
  } else {
    searchLogo = (
      <TouchableOpacity style={styles.touchable} onPress={searchBackEnd}>
        <Icon name="search" size={25} style={styles.text} />
      </TouchableOpacity>
    );
  }

  let searchDis;
  if (
    searchRes === undefined ||
    (Object.keys(searchRes).length === 0 && searchRes.constructor === Object)
  ) {
    searchDis = (
      <View style={styles.noResWrap}>
        <Text style={styles.text}>There are no search results yet.</Text>
      </View>
    );
  } else {
    searchDis = (
      <TouchableOpacity style={styles.resTouchWrap} onPress={addToPeeps}>
        <Icon name="user-circle-o" size={25} style={styles.text} />
        <Text style={styles.resName}>{searchRes.Name}</Text>
      </TouchableOpacity>
    );
  }

  let addedPeeps;
  if (peepAdded.length === 0) {
    addedPeeps = (
      <View style={styles.noResWrap}>
        <Text style={styles.text}>There are no one added yet.</Text>
      </View>
    );
  } else {
    addedPeeps = peepAdded.map((currItem, currIdx) => (
      <View style={styles.addedStyles} key={currIdx}>
        <Text style={styles.peopleAdded}>{currItem.Name}</Text>
        <TouchableOpacity
          style={styles.touchable}
          onPress={() => removeFromPeeps(currIdx)}>
          <FeatherIcon name="x" size={25} style={styles.text} />
        </TouchableOpacity>
      </View>
    ));
  }

  return (
    <View style={styles.mainView}>
      <View style={styles.searchBar}>
        <TextInput
          maxLength={8}
          style={styles.searchBarInput}
          placeholder="User's Phone Number"
          placeholderTextColor={colorScheme.placeHolderText}
          onChangeText={(newVal) => updateSearchVal(newVal)}
          value={searchVal}
        />
        {searchLogo}
      </View>
      <View style={styles.searchResWrap}>
        <Text style={styles.searchText}>Search result:</Text>
        {searchDis}
      </View>
      <View style={styles.peopleWrap}>
        <Text style={styles.searchText}>People Added to Jio: </Text>
        <ScrollView nestedScrollEnabled={true}>{addedPeeps}</ScrollView>
      </View>
    </View>
  );
}
