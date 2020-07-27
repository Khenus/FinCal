import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  useWindowDimensions,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ScrollView} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Toast from 'react-native-simple-toast';
import auth from '@react-native-firebase/auth';
import {CommonActions} from '@react-navigation/native';

import {register} from '../API';
import {darkTheme, lightTheme} from '../GlobalValues.js';

function SignupPage({navigation}) {
  let currWidth = useWindowDimensions().width;
  let currHeight = useWindowDimensions().height;

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

  let [validEmail, updateValidEmail] = useState('');
  let [signEmail, updateSignEmail] = useState('');
  let [signPass, updateSignPass] = useState('');
  let [signConPass, updateSignConPass] = useState('');
  let [validPass, updateValidPass] = useState('');
  let [signPhone, updateSignPhone] = useState('');
  let [validPhone, updateValidPhone] = useState('');
  let [signName, updateSignName] = useState('');
  let [validName, updateValidName] = useState('');

  let [isLoading, updateIsLoading] = useState(false);
  let [prevAuthState, updatePrevAuthState] = useState(null);
  let [currAuthState, updateCurrAuthState] = useState(null);

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
    if (/^\w+([\.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(signEmail)) {
      updateValidEmail('');
    } else {
      updateValidEmail('Invalid Email Address');
    }
  }, [signEmail]);

  useEffect(() => {
    let onlyNum = signPhone.replace(/[^0-9]/, '');
    updateSignPhone(onlyNum);

    if (signPhone !== '') {
      updateValidPhone('');
    } else {
      updateValidPhone('Phone Number must be filled');
    }
  }, [signPhone]);

  //Verify Name
  useEffect(() => {
    if (signName !== '') {
      updateValidName('');
    } else {
      updateValidName('Name must be filled');
    }
  }, [signName]);

  // let [localUser, updateLocalUser] = useState({});

  useEffect(() => {
    function onAuthStateChanged(newUser) {
      updatePrevAuthState(currAuthState);
      updateCurrAuthState(newUser);
    }

    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, [currAuthState]);

  useEffect(() => {
    if (prevAuthState !== null && currAuthState === null) {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [
            {
              name: 'LoginPage',
            },
          ],
        }),
      );
    }
  }, [currAuthState, navigation, prevAuthState]);

  async function addDetails(res) {
    var user = auth().currentUser;
    let result = await register(signEmail, res.user.uid, signName, signPhone);
    await auth().currentUser.updateProfile({
      displayName: signName,
      // phoneNumber: `+65${signPhone}`,
    });

    if (result === 'Register successful') {
      // user
      //   .updateProfile({
      //     displayName: signName,
      //     phoneNumber: `+65${signPhone}`,
      //   })
      //   .then(function () {
      user
        .sendEmailVerification()
        .then(function () {
          auth()
            .signOut()
            .then(function () {
              updateIsLoading(false);
            })
            .catch(function (error) {
              Toast.show(error.message + ' (Signup Error: 4)');
              updateIsLoading(false);
            });
        })
        .catch(function (error) {
          Toast.show(error.message + ' (Signup Error: 3)');
          updateIsLoading(false);
        });
      // })
      // .catch(function (error) {
      //   Toast.show(error.message + ' (Signup Error: 2)');
      //   updateIsLoading(false);
      // });
    } else {
      user
        .delete()
        .then(function () {
          Toast.show('Signup Error: 1');
          updateIsLoading(false);
        })
        .catch(function (error) {
          Toast.show(error.message + ' (Signup Error: 4)');
          updateIsLoading(false);
        });
    }

    // }).catch(function(error) {
    //   updateErrMsg(error.message);
    //   updateIsLoading(false);
    // });
  }

  async function callRegister() {
    if (validEmail === '' && validPass === '' && signPass !== '') {
      updateIsLoading(true);
      auth()
        .createUserWithEmailAndPassword(signEmail, signPass)
        .then((res) => addDetails(res))
        .catch((error) => {
          Toast.show(error.message + ' (Signup Error: 5)');
          updateIsLoading(false);
        });
    } else if (validEmail !== '') {
      Toast.show('Invalid Email');
    } else if (validPass === 'Password does not match') {
      Toast.show('Password does not match');
    } else if (validPass === 'Password cannot be empty') {
      Toast.show('Password cannot be empty');
    } else if (validName !== '') {
      Toast.show('Name cannot be empty');
    } else if (validPhone !== '') {
      Toast.show('Phone number cannot be empty');
    }
  }

  function back() {
    // navigation.pop(1);
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [
          {
            name: 'LoginPage',
          },
        ],
      }),
    );
  }

  var seperatorHeight = 40;

  const Styles = StyleSheet.create({
    btmWrapper: {
      width: currWidth,
    },

    detailInput: {
      height: 60,
      paddingLeft: 10,
      color: colorScheme.textCol,
      borderColor: colorScheme.inputTextWrapper,
      borderWidth: 1,
      borderRadius: 5,
      marginLeft: currWidth * 0.1,
      marginRight: currWidth * 0.1,
      marginBottom: 15,
    },

    validator: {
      color: colorScheme.textWarningCol,
      marginTop: -15,
      marginLeft: currWidth * 0.1 + 10,
      marginBottom: 10,
    },

    pickerText: {
      color: colorScheme.textCol,
      marginLeft: currWidth * 0.1 + 10,
      marginBottom: 5,
    },

    mainView: {
      backgroundColor: colorScheme.backCol,
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
      borderBottomColor: colorScheme.inputTextWrapper,
      borderBottomWidth: 1,
      alignContent: 'center',
      justifyContent: 'center',
    },

    details: {
      width: currWidth * 0.15,
      height: seperatorHeight,
      color: colorScheme.textCol,
      marginTop: seperatorHeight * -0.5,
      marginLeft: currWidth * 0.425,
      marginRight: currWidth * 0.425,
      textAlign: 'center',
      textAlignVertical: 'center',
      backgroundColor: colorScheme.backCol,
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
      borderColor: colorScheme.backCol,
      borderWidth: 2,
      borderRadius: 15,
    },

    signText: {
      height: 60,
      width: currWidth * 0.8,
      textAlign: 'center',
      textAlignVertical: 'center',
      fontSize: 15,
      color: colorScheme.textCol,
    },

    btmText: {
      width: currWidth,
      textAlign: 'center',
      textAlignVertical: 'top',
      fontSize: 13,
      height: 100,
      // borderColor: 'black',
      // borderWidth: 1,
      // borderRadius: 5,
    },

    inputFields: {
      color: colorScheme.textCol,
      height: 60,
      paddingLeft: 10,
      borderColor: colorScheme.inputTextWrapper,
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

    text: {
      color: colorScheme.textCol,
    },

    headerBar: {
      flexDirection: 'row',
      paddingLeft: 14,
      height: 60,
      alignItems: 'center',
      backgroundColor: colorScheme.backCol,
    },

    headerPadding: {
      flex: 1,
    },
    loadingMain: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colorScheme.backCol,
    },
    loadingText: {
      color: colorScheme.textCol,
      fontSize: 20,
    },
  });

  if (isLoading) {
    return (
      <View style={Styles.loadingMain}>
        <ActivityIndicator size="large" color={colorScheme.inputTextWrapper} />
        <Text style={Styles.loadingText}>Loading...</Text>
      </View>
    );
  } else {
    return (
      <SafeAreaView style={Styles.container}>
        <View style={Styles.headerBar}>
          <TouchableOpacity onPress={back}>
            <Icon name="arrow-back" size={25} style={Styles.text} />
          </TouchableOpacity>
          <View style={Styles.headerPadding} />
        </View>
        <ScrollView contentContainerStyle={Styles.scroller}>
          <View style={Styles.mainView}>
            <Text style={[Styles.mainHeader, Styles.text]}>Sign Up Now</Text>
            <Text style={[Styles.mainSub, Styles.text]}>
              Please fill in the details
            </Text>

            <TextInput
              placeholder="Email"
              placeholderTextColor={colorScheme.placeHolderText}
              value={signEmail}
              style={Styles.inputFields}
              onChangeText={(newEmail) => updateSignEmail(newEmail)}
            />
            <Text style={Styles.validator}>{validEmail}</Text>

            <TextInput
              secureTextEntry={true}
              value={signPass}
              placeholder="Password"
              placeholderTextColor={colorScheme.placeHolderText}
              onChangeText={(newPass) => updateSignPass(newPass)}
              style={Styles.inputFields}
            />
            <TextInput
              secureTextEntry={true}
              value={signConPass}
              placeholder="Confirm Password"
              placeholderTextColor={colorScheme.placeHolderText}
              onChangeText={(newConPass) => updateSignConPass(newConPass)}
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
              placeholderTextColor={colorScheme.placeHolderText}
              onChangeText={(newName) => updateSignName(newName)}
              style={Styles.detailInput}
            />
            <Text style={Styles.validator}>{validName}</Text>

            <Text style={Styles.pickerText}>Phone</Text>
            <TextInput
              maxLength={8}
              value={signPhone}
              placeholder="Enter Here"
              placeholderTextColor={colorScheme.placeHolderText}
              keyboardType="number-pad"
              onChangeText={(newPhone) => updateSignPhone(newPhone)}
              style={Styles.detailInput}
            />
            <Text style={Styles.validator}>{validPhone}</Text>

            <View style={Styles.btmWrapper}>
              <TouchableOpacity style={Styles.signBtn} onPress={callRegister}>
                <Text style={Styles.signText}>Sign up</Text>
              </TouchableOpacity>
              <Text style={Styles.btmText}>
                <Text style={Styles.text}>
                  By signing up, you agree with the{' '}
                </Text>
                <Text style={[Styles.privatePolicy, Styles.text]}>
                  Private policy
                </Text>
              </Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

export default SignupPage;
