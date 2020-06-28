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

  // hooks for quick add
  const [tmpDate, onChangeDate] = React.useState(moment(new Date()).format('LL'));
  const [tmpTitle, onChangeTitle] = React.useState('');
  const [tmpAmt, onChangeAmt] = React.useState('');
  const [tmpCat, onChangeCat] = React.useState('');
  const [tmpDesc, onChangeDesc] = React.useState('');

  // hooks for food jio
  const [tmpTitle2, onChangeTitle2] = React.useState('');
  const [tmpOutlet, onChangeOutlet] = React.useState('');
  const [tmpTime, onChangeTime] = React.useState(''); //change this to timepicker
  const [tmpComm, onChangeComm] = React.useState('');

  
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


  const handleOpen = () => {
    setOpen(!open);
  };

  // Handlers for quick add
  const handleAdd = () => {
    setOpen(false);
    setAdd(true);
  };

  const toggleAddOverlay = () => {
    setAdd(false);
  };

  const resetAddInput = () => {
    onChangeDate(moment(new Date()).format('LL'));
    onChangeTitle('');
    onChangeAmt('');
    onChangeCat('');
    onChangeDesc('');
  };

  const handleCancelAdd = () => {
    toggleAddOverlay();
    resetAddInput();
  };

  async function handleConfirmAdd() {
    if (!tmpDate || !tmpTitle || !tmpAmt) {
      var tmp = '';
      if (!tmpDate) {tmp = 'Date '};
      if (!tmpTitle) {tmp = tmp + 'Title '};
      if (!tmpAmt) {tmp = tmp + 'Amount '};

      Toast.show('Fields not filled in: ' + JSON.stringify(tmp).slice(1, -1));
    } 

    else {
      let result = await addTransact(
        currUser.Email,
        currUser.uuid,
        tmpDate,
        tmpTitle,
        tmpAmt,
        tmpCat,
        tmpDesc,
      );
      toggleAddOverlay();
      resetAddInput();

      if (typeof pullTransact !== 'undefined') {
        pullTransact();
      }

      Toast.show(result);
    }
  }

  // Handlers for food jio
  const handleFood = () => {
    setOpen(false);
    setFood(true);
  };

  const toggleFoodOverlay = () => {
    setFood(false);
  };

  const resetFoodInput = () => {
    onChangeTitle2('');
    onChangeOutlet('');
    onChangeTime(''); //change this to prefill time
    onChangeComm('');
  };

  const handleCancelFood = () => {
    toggleFoodOverlay();
    resetFoodInput();
  };

  async function handleConfirmFood() {
    if (!tmpTitle2 || !tmpOutlet) {
      var tmp = '';
      if (!tmpTitle2) {tmp = 'Title ';}
      if (!tmpOutlet) {tmp = tmp + 'Outlet '}

      Toast.show('Fields not filled in: ' + JSON.stringify(tmp).slice(1, -1));
    } 
    
    else {

      //TODO: some backend stuff here?

      toggleFoodOverlay();
      resetFoodInput();
      alert('TODO: send food jio data to backend, create a new jio w sharing link + options');

      //TODO: some more backend stuff here?

    }
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
        onBackdropPress={toggleAddOverlay}
        overlayStyle={overlaystyle}>

        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>    
          <Text style={{color: 'white', fontSize: 23}}>Quick add</Text>
          <MaterialCommunityIcons name="pencil-outline" color='#77DD77' size={30} />
        </View>

        <Text />

        <Input
          label="Date"
          labelStyle={labelstyle}
          placeholder="dd/mm/yyyy"
          placeholderTextColor='grey'
          rightIcon={<DTPicker />} //TODO: datepicker needs to update value in input field
          onPress={() => DTPicker.setShow(true)}
          onChangeText={(text) => onChangeDate(text)}
          value={tmpDate}
        />

        <Input
          label="Title"
          labelStyle={labelstyle}
          placeholder="e.g. Kelly's birthday present"
          placeholderTextColor='grey'
          onChangeText={(text) => onChangeTitle(text)}
          value={tmpTitle}
        />

        <Input
          label="Amount"
          labelStyle={labelstyle}
          placeholder="e.g. $5.50"
          placeholderTextColor='grey'
          keyboardType="numeric"
          onChangeText={(text) => onChangeAmt(text)}
          value={tmpAmt}
        />

        <Input
          label="Category"
          labelStyle={labelstyle}
          placeholder="(optional)"
          placeholderTextColor='grey'
          onChangeText={(text) => onChangeCat(text)}
          value={tmpCat}
        />

        <Input
          label="Description"
          labelStyle={labelstyle}
          placeholder="(optional)"
          placeholderTextColor='grey'
          onChangeText={(text) => onChangeDesc(text)}
          value={tmpDesc}
        />

        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={cancelbuttonstyle} onPress={() => handleCancelAdd()}>
            Cancel
          </Text>
          <Text
            style={confirmbuttonstyle}
            onPress={() => {
              handleConfirmAdd();
            }}>
            Confirm
          </Text>
        </View>
      </Overlay>


      {/* Food Jio overlay */}
      <Overlay
        isVisible={food}
        onBackdropPress={toggleFoodOverlay}
        overlayStyle={overlaystyle}>

        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={{color: 'white', fontSize: 23}}>Create a new Food Jio</Text>
          <MaterialCommunityIcons name="food" color='#77DD77' size={30} />
        </View>

        <Text />

        <Input
          label="Title"
          labelStyle={labelstyle}
          placeholder="Give your jio a name!"
          placeholderTextColor='grey'
          onChangeText={(text) => onChangeTitle2(text)}
          value={tmpTitle2}
        />

        <Input //change this to drop-down menu?
          label="Food Outlet"
          labelStyle={labelstyle}
          placeholder="Where are we eating?"
          placeholderTextColor='grey'
          onChangeText={(text) => onChangeOutlet(text)}
          value={tmpOutlet}
        />

        {/* <Input //add timepicker to this
          label="What time does the jio close?"
          labelStyle={labelstyle}
          placeholder="(optional)"
          placeholderTextColor='grey'
          onChangeText={(text) => onChangeTime(text)}
          value={tmpTime}
        /> */}

        <Input
          label="Any other comments?"
          labelStyle={labelstyle}
          placeholder="(optional)"
          placeholderTextColor='grey'
          onChangeText={(text) => onChangeComm(text)}
          value={tmpComm}
        />

        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text 
            style={cancelbuttonstyle} 
            onPress={() => handleCancelFood()
            }>
            Cancel
          </Text>
          <Text
            style={confirmbuttonstyle}
            onPress={() => handleConfirmFood()
            }>
            Create jio!
          </Text>
        </View>

      </Overlay>

    </Provider>
  );
}
