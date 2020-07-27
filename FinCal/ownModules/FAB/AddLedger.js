import React, {useEffect, useState} from 'react';
import {View, Text, Platform, ScrollView, StyleSheet} from 'react-native';
import {Overlay, Input} from 'react-native-elements';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import moment from 'moment';
import DateTimePicker from '@react-native-community/datetimepicker';
import Toast from 'react-native-simple-toast';
import {Picker} from '@react-native-community/picker';

import {newLedger} from '../API';
import {darkTheme, lightTheme} from '../GlobalValues';
import {transCategory, ledgerType} from '../GlobalObject';
import AddPeople from '../FoodJio/Components/AddPeople';

function DTPicker(props) {
  let parDateUpdate = props.parDateUpdate;

  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
    parDateUpdate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  return (
    <View>
      <MaterialCommunityIcons
        name="calendar-edit"
        color={'white'}
        size={30}
        onPress={showDatepicker}
      />
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
    </View>
  );
}

export default function AddLedger(props) {
  let currUser = props.currUser;
  let active = props.visible;
  let pullLedger = props.pullLedger;
  let setLedger = props.setLedger;
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

  const [visible, updateVisible] = useState(false);

  const [coreDate, updateCoreDate] = useState(new Date());
  const [type, updateType] = useState(ledgerType[0]);
  const [catIdx, updateCatIdx] = useState(0);
  const [tmpDate, onChangeDate] = useState(moment(new Date()).format('LL'));
  const [tmpTitle, onChangeTitle] = useState('');
  const [tmpAmt, onChangeAmt] = useState('');
  const [tmpCat, onChangeCat] = useState(transCategory[0]);
  const [addedPeeps, updateAddedPeeps] = useState([]);

  const styles = StyleSheet.create({
    header: {
      color: colorScheme.textCol,
      marginLeft: 10,
      marginBottom: 5,
      fontSize: 23,
    },

    inputField: {
      color: colorScheme.textCol,
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

    overlaystyle: {
      width: 350,
      backgroundColor: colorScheme.fabBackCol,
    },

    labelstyle: {
      color: colorScheme.textCol,
      fontWeight: 'normal',
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
      borderRadius: 5,
      marginLeft: 10,
      marginRight: 10,
      marginBottom: 10,
    },

    dropDown: {
      backgroundColor: 'white',
      height: 60,
      paddingLeft: 10,
    },

    inputDis: {
      opacity: 1,
    },

    flexrowWrapper: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },

    padding: {
      height: 10,
    },

    largePadding: {
      height: 30,
    },
  });

  useEffect(() => {
    onChangeDate(moment(coreDate).format('LL'));
  }, [coreDate]);

  useEffect(() => {
    updateVisible(active);
  }, [active]);

  const resetInput = () => {
    onChangeDate(moment(new Date()).format('LL'));
    onChangeTitle('');
    onChangeAmt('');
    onChangeCat(transCategory[0]);
    updateType(ledgerType[0]);
  };

  const handleCancel = () => {
    setLedger(false);
    resetInput();
  };

  async function handleConfirm() {
    if (!tmpDate || !tmpTitle || !tmpAmt || addedPeeps.length === 0) {
      var tmp = '';
      if (!tmpDate) {
        tmp = 'Date ';
      }
      if (!tmpTitle) {
        tmp = tmp + 'Title ';
      }
      if (!tmpAmt) {
        tmp = tmp + 'Amount ';
      }
      if (addedPeeps.length === 0) {
        tmp = tmp + ', Recipient/Payer list';
      }
      Toast.show('Fields not filled in: ' + JSON.stringify(tmp).slice(1, -1));
    } else {
      let result = await newLedger(
        currUser,
        addedPeeps,
        tmpAmt,
        type,
        catIdx,
        tmpCat,
        tmpTitle,
        tmpDate,
      );

      Toast.show(result);
      if (result === 'Ledger Added') {
        setLedger(false);
        resetInput();

        if (typeof pullTransact !== 'undefined') {
          pullLedger();
        }
      }
    }
  }

  return (
    <Overlay
      isVisible={visible}
      onBackdropPress={() => setLedger(false)}
      overlayStyle={styles.overlaystyle}>
      <ScrollView keyboardShouldPersistTaps={'handled'}>
        <Text style={styles.header}>Add Ledger</Text>

        <Input
          inputStyle={styles.inputField}
          label="Date"
          disabled={true}
          disabledInputStyle={styles.inputDis}
          labelStyle={styles.labelstyle}
          placeholder="dd/mm/yyyy"
          placeholderTextColor={colorScheme.placeHolderText}
          rightIcon={<DTPicker parDateUpdate={updateCoreDate} />}
          onPress={() => DTPicker.setShow(true)}
          onChangeText={(text) => onChangeDate(text)}
          value={tmpDate}
        />

        <Input
          inputStyle={styles.inputField}
          label="Detail"
          labelStyle={styles.labelstyle}
          placeholderTextColor={colorScheme.placeHolderText}
          placeholder="e.g. Groceries"
          onChangeText={(text) => onChangeTitle(text)}
          value={tmpTitle}
        />

        <Input
          inputStyle={styles.inputField}
          label="Amount"
          labelStyle={styles.labelstyle}
          placeholder="e.g. 5.50"
          placeholderTextColor={colorScheme.placeHolderText}
          keyboardType="numeric"
          onChangeText={(text) => onChangeAmt(text)}
          value={tmpAmt}
        />

        <Text style={styles.pickerText}>Type</Text>
        <View style={styles.pickerWrap}>
          <Picker
            onValueChange={(newType) => updateType(newType)}
            selectedValue={type}
            style={styles.dropDown}
            mode="dropdown">
            {ledgerType.map((currItem, idx) => (
              <Picker.Item key={idx} label={`${currItem}`} value={currItem} />
            ))}
          </Picker>
        </View>

        <Text style={styles.pickerText}>Category</Text>
        <View style={styles.pickerWrap}>
          <Picker
            onValueChange={(newCato, newCatIdx) => {
              updateCatIdx(newCatIdx);
              onChangeCat(newCato);
            }}
            selectedValue={tmpCat}
            style={styles.dropDown}
            itemStyle={styles.pickerDrop}
            mode="dialog">
            {transCategory.map((currItem, idx) => (
              <Picker.Item key={idx} label={`${currItem}`} value={currItem} />
            ))}
          </Picker>
        </View>

        <View style={styles.largePadding} />
        <Text style={styles.pickerText}>Add Recipient/Payer</Text>
        <View style={styles.padding} />
        <AddPeople currUser={currUser} parAddedPeeps={updateAddedPeeps} />

        <View style={styles.flexrowWrapper}>
          <Text style={styles.cancelbuttonstyle} onPress={() => handleCancel()}>
            Cancel
          </Text>
          <Text
            style={styles.confirmbuttonstyle}
            onPress={() => {
              handleConfirm();
            }}>
            Confirm
          </Text>
        </View>
      </ScrollView>
    </Overlay>
  );
}
