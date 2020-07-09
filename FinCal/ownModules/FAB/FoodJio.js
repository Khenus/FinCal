/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {View, Text, ScrollView, StyleSheet} from 'react-native';
import {Overlay, Input} from 'react-native-elements';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Toast from 'react-native-simple-toast';
import {useNavigation} from '@react-navigation/native';
import {Picker} from '@react-native-community/picker';

import {resData} from '../MenuData';
import {darkTheme, lightTheme} from '../GlobalValues';

export default function FoodJio(props) {
  let navigation = useNavigation();
  let currUser = props.currUser; //Pass in current user details
  let active = props.visible; //Pass in props for food showing
  let setFood = props.setFood; //Pass in ref for setFood

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

  let [visible, updateVisible] = useState(false);

  const [tmpTitle2, onChangeTitle2] = useState('');
  // let [tmpTime, onChangeTime] = useState(''); //change this to timepicker
  const [tmpComm, onChangeComm] = useState('');

  const [menuIdx, updateMenuIdx] = useState(0);
  const [pickerVal, updatePickerVal] = useState(resData[0]);

  useEffect(() => {
    updateVisible(active);
  }, [active]);

  const resetFoodInput = () => {
    onChangeTitle2('');
    // onChangeTime(''); //change this to prefill time
    onChangeComm('');
  };

  const handleCancelFood = () => {
    setFood(false);
    resetFoodInput();
  };

  async function handleConfirmFood() {
    if (!tmpTitle2) {
      var tmp = '';
      if (!tmpTitle2) {
        tmp = 'Title ';
      }

      Toast.show('Fields not filled in: ' + JSON.stringify(tmp).slice(1, -1));
    } else {
      //TODO: some backend stuff here?

      setFood(false);
      resetFoodInput();

      navigation.navigate('FoodJioDetails', {
        currUser: currUser,
        menuIdx: menuIdx,
      });
    }
  }

  const styles = StyleSheet.create({
    flexrowWrapper: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },

    header: {
      color: colorScheme.textCol,
      fontSize: 23,
      marginLeft: 10,
      marginBottom: 5,
    },

    overlaystyle: {
      width: 350,
      backgroundColor: colorScheme.fabBackCol,
    },

    labelstyle: {
      color: colorScheme.textCol,
      fontWeight: 'normal',
    },

    cancelbuttonstyle: {
      textAlign: 'center',
      color: '#FF6961',
      fontSize: 17,
      padding: 7,
      borderWidth: 1,
      borderColor: '#FF6961',
      borderRadius: 5,
    },

    confirmbuttonstyle: {
      textAlign: 'center',
      color: '#77DD77',
      fontSize: 17,
      padding: 7,
      borderWidth: 1,
      borderColor: '#77DD77',
      borderRadius: 5,
    },

    inputField: {
      color: colorScheme.textCol,
    },

    pickerText: {
      color: colorScheme.textCol,
      marginLeft: 10,
      marginBottom: 5,
      fontSize: 15,
    },

    pickerWrap: {
      borderColor: 'grey',
      borderWidth: 1,
      borderRadius: 10,
      marginLeft: 10,
      marginRight: 10,
      marginBottom: 10,
    },

    dropDown: {
      backgroundColor: 'white',
      height: 50,
      paddingLeft: 10,
      borderRadius: 10,
    },
  });

  return (
    <Overlay
      isVisible={visible}
      onBackdropPress={() => setFood(false)}
      overlayStyle={styles.overlaystyle}>
      <ScrollView>
        <View style={styles.flexrowWrapper}>
          <Text style={styles.header}>Create a new Food Jio</Text>
          <MaterialCommunityIcons name="food" color="#77DD77" size={30} />
        </View>

        <Input
          inputStyle={styles.inputField}
          label="Title"
          labelStyle={styles.labelstyle}
          placeholder="Give your jio a name!"
          placeholderTextColor={colorScheme.placeHolderText}
          onChangeText={(text) => onChangeTitle2(text)}
          value={tmpTitle2}
        />

        <Text style={styles.pickerText}>Food Outlet</Text>
        <View style={styles.pickerWrap}>
          <Picker
            onValueChange={(newVal, newOutIdx) => {
              updatePickerVal(newVal);
              updateMenuIdx(newOutIdx);
            }}
            selectedValue={pickerVal}
            style={styles.dropDown}
            mode="dropdown">
            {resData.map((currItem, idx) => (
              <Picker.Item
                key={idx}
                label={`${currItem.name}`}
                value={currItem.name}
              />
            ))}
          </Picker>
        </View>

        <Input
          inputStyle={styles.inputField}
          label="Any other comments?"
          labelStyle={styles.labelstyle}
          placeholder="(optional)"
          placeholderTextColor={colorScheme.placeHolderText}
          onChangeText={(text) => onChangeComm(text)}
          value={tmpComm}
        />

        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text
            style={styles.cancelbuttonstyle}
            onPress={() => handleCancelFood()}>
            Cancel
          </Text>
          <Text
            style={styles.confirmbuttonstyle}
            onPress={() => handleConfirmFood()}>
            Create jio!
          </Text>
        </View>
      </ScrollView>
    </Overlay>
  );
}
