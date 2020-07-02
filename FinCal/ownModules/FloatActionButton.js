/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {View, Text, Platform, StyleSheet} from 'react-native';
import {FAB, Portal, Provider} from 'react-native-paper';
import {Overlay, Input} from 'react-native-elements';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import moment from 'moment';
import DateTimePicker from '@react-native-community/datetimepicker';
import Toast from 'react-native-simple-toast';

import {addTransact} from './API';
import {darkTheme, lightTheme} from './GlobalValues.js';

function DTPicker(props) {
  let parDateUpdate = props.parDateUpdate;
  let parUnixDateUpdate = props.parUnixDateUpdate;

  console.log(props);

  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  useEffect(() => {
    console.log(date);
    console.log(date.getTime() / 1000);
  }, [date]);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
    parDateUpdate(moment(date).format('LL'));
    parUnixDateUpdate(date.getTime());
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

export default function FloatActionButton(props) {
  const [open, setOpen] = useState(false); //set state
  const [food, setFood] = useState(false);
  const [add, setAdd] = useState(false);

  let currUser = props.currUser;
  let pullTransact = props.pullTransact;

  let [themeDark, updateTheme] = useState(true);
  let [colorScheme, updateColorScheme] = useState(darkTheme);

  let parentDarkTheme = true;

  useEffect(() => {
    themeDark === true
      ? updateColorScheme(darkTheme)
      : updateColorScheme(lightTheme);
  }, [themeDark]);

  useEffect(() => {
    updateTheme(parentDarkTheme);
  }, [parentDarkTheme]);

  const [tmpDate, onChangeDate] = useState(moment(Date()).format('LL'));
  const [unixDate, updateUnixDate] = useState(Date.now());
  const [tmpTitle, onChangeTitle] = useState('');
  const [tmpAmt, onChangeAmt] = useState('');
  const [tmpCat, onChangeCat] = useState('');
  const [tmpDesc, onChangeDesc] = useState('');

  const handleOpen = () => {
    setOpen(!open);
  };

  const handleFood = () => {
    setOpen(false);
    setFood(true);
  };

  const handleAdd = () => {
    setOpen(false);
    setAdd(true);
  };

  const toggleOverlay = () => {
    setAdd(false);
  };

  const handleCancel = () => {
    toggleOverlay();
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
        currUser.Email,
        currUser.uuid,
        tmpDate,
        tmpTitle,
        tmpAmt,
        tmpCat,
        tmpDesc,
      );
      toggleOverlay();
      resetInput();

      if (typeof pullTransact !== 'undefined') {
        pullTransact();
      }

      Toast.show(result);
    }
  }

  const resetInput = () => {
    onChangeDate(moment(new Date()).format('LL'));
    onChangeTitle('');
    onChangeAmt('');
    onChangeCat('');
    onChangeDesc('');
  };

  async function updateDate(newDate) {
    onChangeDate(moment(newDate).format('LL'));
    updateUnixDate(newDate);
    console.log('in parent');
    console.log(moment(newDate).format('LL'));
    console.log(newDate);
  }

  //Styles object
  const styles = StyleSheet.create({
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
      color: 'white',
      fontWeight: 'normal',
    },
  });

  return (
    <Provider>
      {/* FAB itself */}
      <Portal>
        <FAB.Group
          open={open}
          icon="tooltip-plus-outline"
          fabStyle={{backgroundColor: 'teal'}}
          actions={[
            {
              icon: 'food',
              label: 'Food Jio',
              color: 'white',
              style: {backgroundColor: 'teal'},
              onPress: () => handleFood(),
            },
            {
              icon: 'pencil-outline',
              label: 'Fast Add',
              color: 'white',
              style: {backgroundColor: 'teal'},
              onPress: () => handleAdd(),
            },
          ]}
          onStateChange={() => console.log('state changed')} //required handler, do NOT remove
          onPress={handleOpen}
        />
      </Portal>

      {/* Quick Add overlay */}
      <Overlay
        isVisible={add}
        onBackdropPress={toggleOverlay}
        overlayStyle={styles.overlaystyle}>
        <Text style={{color: 'white', fontSize: 23}}>Quick add</Text>

        <Input
          inputStyle={styles.inputField}
          label="Date"
          labelStyle={styles.labelstyle}
          placeholder="dd/mm/yyyy"
          placeholderTextColor={colorScheme.placeHolderText}
          rightIcon={
            <DTPicker
              parDateUpdate={(newDate) => console.log(newDate)}
              parUnixDateUpdate={updateUnixDate}
            />
          } //TODO: datepicker needs to update value in input field
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
          placeholder="e.g. $5.50"
          placeholderTextColor={colorScheme.placeHolderText}
          keyboardType="numeric"
          onChangeText={(text) => onChangeAmt(text)}
          value={tmpAmt}
        />

        <Input
          inputStyle={styles.inputField}
          label="Category"
          labelStyle={styles.labelstyle}
          placeholder="(optional)"
          placeholderTextColor={colorScheme.placeHolderText}
          onChangeText={(text) => onChangeCat(text)}
          value={tmpCat}
        />

        <Input
          inputStyle={styles.inputField}
          label="Description"
          labelStyle={styles.labelstyle}
          placeholder="(optional)"
          placeholderTextColor={colorScheme.placeHolderText}
          onChangeText={(text) => onChangeDesc(text)}
          value={tmpDesc}
        />

        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
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
      </Overlay>
    </Provider>
  );
}
