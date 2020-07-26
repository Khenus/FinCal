import React, {useEffect, useState} from 'react';
import {View, Text, Platform, ScrollView, StyleSheet} from 'react-native';
import {Overlay, Input} from 'react-native-elements';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import moment from 'moment';
import DateTimePicker from '@react-native-community/datetimepicker';
import Toast from 'react-native-simple-toast';
import {Picker} from '@react-native-community/picker';

import {addTransact} from '../API';
import {darkTheme, lightTheme} from '../GlobalValues';
import {transCategory, transactType} from '../GlobalObject';

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

export default function QuickAdd(props) {
  let currUser = props.currUser;
  let active = props.visible;
  let pullTransact = props.pullTransact;
  let setAdd = props.setAdd;
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
  const [type, updateType] = useState(transactType[0]);
  const [catIdx, updateCatIdx] = useState(0);
  const [tmpDate, onChangeDate] = useState(moment(new Date()).format('LL'));
  const [tmpTitle, onChangeTitle] = useState('');
  const [tmpAmt, onChangeAmt] = useState('');
  const [tmpCat, onChangeCat] = useState(transCategory[0]);
  const [tmpDesc, onChangeDesc] = useState('');

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
    onChangeDesc('');
  };

  const handleCancel = () => {
    setAdd(false);
    resetInput();
  };

  async function handleConfirm() {
    if (!tmpDate || !tmpTitle || !tmpAmt) {
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
      Toast.show('Fields not filled in: ' + JSON.stringify(tmp).slice(1, -1));
    } else {
      let result = await addTransact(
        currUser.uuid,
        tmpDate,
        tmpTitle,
        tmpAmt,
        type,
        catIdx,
        tmpCat,
        tmpDesc,
        parseInt(coreDate.getTime() / 1000, 10),
      );

      Toast.show(result);
      if (result === 'Transaction added') {
        setAdd(false);
        resetInput();

        if (typeof pullTransact !== 'undefined') {
          pullTransact();
        }
      }
    }
  }

  return (
    <Overlay
      isVisible={visible}
      onBackdropPress={() => setAdd(false)}
      overlayStyle={styles.overlaystyle}>
      <ScrollView keyboardShouldPersistTaps={'handled'}>
        <Text style={styles.header}>Add Transaction</Text>

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
          label="Title"
          labelStyle={styles.labelstyle}
          placeholderTextColor={colorScheme.placeHolderText}
          placeholder="e.g. Kelly's birthday present"
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
            {transactType.map((currItem, idx) => (
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

        <Input
          inputStyle={styles.inputField}
          label="Description"
          labelStyle={styles.labelstyle}
          placeholder="(optional)"
          placeholderTextColor={colorScheme.placeHolderText}
          onChangeText={(text) => onChangeDesc(text)}
          value={tmpDesc}
        />

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
