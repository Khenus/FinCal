import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  useWindowDimensions,
  TouchableOpacity,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ScrollView} from 'react-native-gesture-handler';
import {colorScheme} from '../ColorScheme.js';
import {registerUser} from '../APIs/APIs.js';

function SignupPage({navigation}) {
  let currWidth = useWindowDimensions().width;
  let currHeight = useWindowDimensions().height;

  let [validEmail, updateValidEmail] = useState('');
  let [signEmail, updateSignEmail] = useState('');
  let [signPass, updateSignPass] = useState('');
  let [signConPass, updateSignConPass] = useState('');
  let [validPass, updateValidPass] = useState('');
  let [signPhone, updateSignPhone] = useState('');
  let [signName, updateSignName] = useState('');

  //Verifing password
  useEffect(() => {
    if (signPass === signConPass) {
      updateValidPass('');
    } else {
      updateValidPass('Password does not match');
    }
  }, [signPass, signConPass]);

  //Verifying email
  useEffect(() => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(signEmail)) {
      updateValidEmail('');
    } else {
      updateValidEmail('Invalid Email Address');
    }
  }, [signEmail]);

  useEffect(() => {
    let onlyNum = signPhone.replace(/[^0-9]/, '');
    updateSignPhone(onlyNum);
  }, [signPhone]);

  function callRegister() {
    if (validEmail === '' && validPass === '') {
      registerUser(signEmail, signPass, signPhone, signName);
    }
  }

  var seperatorHeight = 40;

  const Styles = StyleSheet.create({
    btmWrapper: {
      width: currWidth,
    },

    detailInput: {
      height: 60,
      paddingLeft: 10,
      borderColor: 'grey',
      borderWidth: 1,
      borderRadius: 5,
      marginLeft: currWidth * 0.1,
      marginRight: currWidth * 0.1,
      marginBottom: 10,
    },

    validator: {
      color: 'red',
      marginTop: -15,
      marginLeft: currWidth * 0.1 + 10,
      marginBottom: 10,
    },

    pickerText: {
      color: 'grey',
      marginLeft: currWidth * 0.1 + 10,
      marginBottom: 5,
    },

    mainView: {
      backgroundColor: 'white',
      flex: 1,
    },

    seperator: {
      height: seperatorHeight,
    },

    line: {
      width: currWidth * 0.8,
      height: seperatorHeight * 0.5,
      marginLeft: currWidth * 0.1,
      marginRight: currWidth * 0.1,
      borderBottomColor: 'grey',
      borderBottomWidth: 1,
      alignContent: 'center',
      justifyContent: 'center',
    },

    details: {
      width: currWidth * 0.15,
      height: seperatorHeight,
      color: 'grey',
      marginTop: seperatorHeight * -0.5,
      marginLeft: currWidth * 0.425,
      marginRight: currWidth * 0.425,
      textAlign: 'center',
      textAlignVertical: 'center',
      backgroundColor: 'white',
    },

    privatePolicy: {
      color: 'black',
      textDecorationLine: 'underline',
      marginBottom: '5',
    },

    signBtn: {
      height: 60,
      width: currWidth * 0.8,
      marginLeft: currWidth * 0.1,
      marginRight: currWidth * 0.1,
      marginTop: 10,
      backgroundColor: colorScheme.button1,
      borderColor: 'white',
      borderWidth: 2,
      borderRadius: 15,
    },

    signText: {
      height: 60,
      width: currWidth * 0.8,
      textAlign: 'center',
      textAlignVertical: 'center',
      fontSize: 15,
      color: 'grey',
    },

    btmText: {
      width: currWidth,
      textAlign: 'center',
      textAlignVertical: 'top',
      fontSize: 13,
      color: 'grey',
      height: 100,
      // borderColor: 'black',
      // borderWidth: 1,
      // borderRadius: 5,
    },

    inputFields: {
      height: 60,
      paddingLeft: 10,
      borderColor: 'grey',
      borderWidth: 1,
      borderRadius: 5,
      marginLeft: currWidth * 0.1,
      marginRight: currWidth * 0.1,
      marginBottom: 15,
    },

    mainHeader: {
      fontSize: 30,
      fontWeight: 'bold',
      textAlign: 'center',
      marginTop: currHeight * 0.02,
      marginBottom: 5,
    },

    mainSub: {
      fontSize: 15,
      textAlign: 'center',
      paddingBottom: 15,
    },

    container: {
      flex: 1,
    },

    scroller: {
      flexGrow: 1,
    },
  });

  return (
    <SafeAreaView style={Styles.container}>
      <ScrollView contentContainerStyle={Styles.scroller}>
        <View style={Styles.mainView}>
          <Text style={Styles.mainHeader}>Sign Up Now</Text>
          <Text style={Styles.mainSub}>Please fill in the details</Text>

          <TextInput
            placeholder="Email"
            value={signEmail}
            style={Styles.inputFields}
            onChangeText={newEmail => updateSignEmail(newEmail)}
          />
          <Text style={Styles.validator}>{validEmail}</Text>

          <TextInput
            secureTextEntry={true}
            value={signPass}
            placeholder="Password"
            onChangeText={newPass => updateSignPass(newPass)}
            style={Styles.inputFields}
          />
          <TextInput
            secureTextEntry={true}
            value={signConPass}
            placeholder="Confirm Password"
            onChangeText={newConPass => updateSignConPass(newConPass)}
            style={Styles.inputFields}
          />
          <Text style={Styles.validator}>{validPass}</Text>

          <View style={Styles.seperator}>
            <View style={Styles.line} />
            <Text style={Styles.details}>Details</Text>
          </View>

          <Text style={Styles.pickerText}>Name</Text>
          <TextInput
            value={signName}
            placeholder="Enter Here"
            onChangeText={newName => updateSignName(newName)}
            style={Styles.detailInput}
          />

          <Text style={Styles.pickerText}>Phone</Text>
          <TextInput
            maxLength={8}
            value={signPhone}
            placeholder="Enter Here"
            keyboardType="number-pad"
            onChangeText={newPhone => updateSignPhone(newPhone)}
            style={Styles.detailInput}
          />

          <View style={Styles.btmWrapper}>
            <TouchableOpacity style={Styles.signBtn} onPress={callRegister}>
              <Text style={Styles.signText}>Sign up</Text>
            </TouchableOpacity>
            <Text style={Styles.btmText}>
              <Text>By signing up, you agree with the </Text>
              <Text style={Styles.privatePolicy}>Private policy</Text>
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default SignupPage;
