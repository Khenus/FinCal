/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {View, Text, Platform} from 'react-native';
import {FAB, Portal, Provider} from 'react-native-paper';
import {Overlay, Input} from 'react-native-elements';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import moment from 'moment';
import DateTimePicker from '@react-native-community/datetimepicker';
import Toast from 'react-native-simple-toast';

import {addTransact} from './API';
import {darkTheme, lightTheme} from './GlobalValues.js';

function DTPicker() {
  const [date, setDate] = React.useState(new Date());
  const [mode, setMode] = React.useState('date');
  const [show, setShow] = React.useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
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
          mode="date"
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
    </View>
  );
}

export default function FloatActionButton(props) {
  const [open, setOpen] = React.useState(false); //set state
  const [food, setFood] = React.useState(false);
  const [add, setAdd] = React.useState(false);

  let currUser = props.currUser;
  let pullTransact = props.pullTransact;

  let [themeDark, updateTheme] = React.useState(true);
  let [colorScheme, updateColorScheme] = React.useState(darkTheme);

  let parentDarkTheme = true;

  React.useEffect(() => {
    themeDark === true
      ? updateColorScheme(darkTheme)
      : updateColorScheme(lightTheme);
  }, [themeDark]);

  React.useEffect(() => {
    updateTheme(parentDarkTheme);
  }, [parentDarkTheme]);

  const [tmpDate, onChangeDate] = React.useState(
    moment(new Date()).format('LL'),
  );

  const [tmpTitle, onChangeTitle] = React.useState('');
  const [tmpAmt, onChangeAmt] = React.useState('');
  const [tmpCat, onChangeCat] = React.useState('');
  const [tmpDesc, onChangeDesc] = React.useState('');

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

  //Styles object
  const inputField = {
    color: colorScheme.textCol,
  };

  const cancelbuttonstyle = {
    textAlign: 'center',
    color: '#FF6961',
    fontSize: 17,
    padding: 7,
    borderWidth: 1,
    borderColor: '#FF6961',
    borderRadius: 5,
  };

  const confirmbuttonstyle = {
    textAlign: 'center',
    color: '#77DD77',
    fontSize: 17,
    padding: 7,
    borderWidth: 1,
    borderColor: '#77DD77',
    borderRadius: 5,
  };

  const overlaystyle = {
    width: 350,
    backgroundColor: colorScheme.fabBackCol,
  };

  const labelstyle = {
    color: 'white',
    fontWeight: 'normal',
  };

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
        overlayStyle={overlaystyle}>
        <Text style={{color: 'white', fontSize: 23}}>Quick add</Text>

        <Text />

        <Input
          inputStyle={inputField}
          label="Date"
          labelStyle={labelstyle}
          placeholder="dd/mm/yyyy"
          placeholderTextColor={colorScheme.placeHolderText}
          rightIcon={<DTPicker />} //TODO: datepicker needs to update value in input field
          onPress={() => DTPicker.setShow(true)}
          onChangeText={(text) => onChangeDate(text)}
          value={tmpDate}
        />

        <Input
          inputStyle={inputField}
          label="Title"
          labelStyle={labelstyle}
          placeholderTextColor={colorScheme.placeHolderText}
          placeholder="e.g. Kelly's birthday present"
          onChangeText={(text) => onChangeTitle(text)}
          value={tmpTitle}
        />

        <Input
          inputStyle={inputField}
          label="Amount"
          labelStyle={labelstyle}
          placeholder="e.g. $5.50"
          placeholderTextColor={colorScheme.placeHolderText}
          keyboardType="numeric"
          onChangeText={(text) => onChangeAmt(text)}
          value={tmpAmt}
        />

        <Input
          inputStyle={inputField}
          label="Category"
          labelStyle={labelstyle}
          placeholder="(optional)"
          placeholderTextColor={colorScheme.placeHolderText}
          onChangeText={(text) => onChangeCat(text)}
          value={tmpCat}
        />

        <Input
          inputStyle={inputField}
          label="Description"
          labelStyle={labelstyle}
          placeholder="(optional)"
          placeholderTextColor={colorScheme.placeHolderText}
          onChangeText={(text) => onChangeDesc(text)}
          value={tmpDesc}
        />

        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={cancelbuttonstyle} onPress={() => handleCancel()}>
            Cancel
          </Text>
          <Text
            style={confirmbuttonstyle}
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
