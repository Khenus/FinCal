import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  ActivityIndicator,
  useWindowDimensions,
  TouchableOpacity,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ScrollView} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {CommonActions} from '@react-navigation/native';
import Toast from 'react-native-simple-toast';
import {connect} from 'react-redux';
import auth from '@react-native-firebase/auth';

import {darkTheme, lightTheme} from '../GlobalValues.js';
import {login} from '../API';

export default function ForgetPassword(props) {
  let currWidth = useWindowDimensions().width;
  let currHeight = useWindowDimensions().height;

  let [smallerVal, changeSmallerValue] = useState(0);
  let [isLoading, updateIsLoading] = useState(false);

  let [localUser, updateLocalUser] = useState('none');

  let [themeDark, updateTheme] = useState(true);
  let [colorScheme, updateColorScheme] = useState(darkTheme);

  let parentDarkTheme = true;

  let navigation = props.navigation;

  useEffect(() => {
    themeDark === true
      ? updateColorScheme(darkTheme)
      : updateColorScheme(lightTheme);
  }, [themeDark]);

  useEffect(() => {
    updateTheme(parentDarkTheme);
  }, [parentDarkTheme]);

  useEffect(() => {
    let temp = currHeight > currWidth ? currWidth : currHeight;
    changeSmallerValue(temp);
  }, [currWidth, currHeight]);

  let [userEmail, changeUserEmail] = useState('');
  let [resetSent, updateResetSent] = useState(false);

  const Styles = StyleSheet.create({
    mainView: {
      flex: 1,
      backgroundColor: colorScheme.backCol,
      alignItems: 'center',
      justifyContent: 'center',
    },

    inputFields: {
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

    welcomeHeader: {
      fontSize: 40,
      fontWeight: 'bold',
      textAlign: 'center',
    },

    welcomeSub: {
      fontSize: 15,
      textAlign: 'center',
      paddingBottom: 15,
    },

    imgWrapper: {
      width: currWidth,
      justifyContent: 'center',
      alignItems: 'center',
      // borderColor: 'black',
      // borderWidth: 1,
      // borderRadius: 5,
    },

    displayPic: {
      marginTop: currHeight * 0.1,
      marginBottom: currHeight * 0.05,
      alignItems: 'center',
      resizeMode: 'contain',
      width: smallerVal * 0.4,
      height: smallerVal * 0.4,
    },

    logBtn: {
      height: 60,
      width: currWidth * 0.8,
      marginLeft: currWidth * 0.1,
      marginRight: currWidth * 0.1,
      marginTop: 10,
      borderRadius: 15,
      backgroundColor: colorScheme.button1,
      borderColor: colorScheme.backCol,
      borderWidth: 2,
    },

    logText: {
      height: 60,
      width: currWidth * 0.8,
      textAlign: 'center',
      textAlignVertical: 'center',
      fontSize: 15,
    },

    btmTextWithoutMargin: {
      width: currWidth,
      textAlign: 'center',
      textAlignVertical: 'center',
      fontSize: 13,
      marginBottom: 10,
      marginTop: 10,
    },

    btmText: {
      width: currWidth,
      textAlign: 'center',
      textAlignVertical: 'center',
      fontSize: 13,
      marginBottom: 20,
    },

    text: {
      color: colorScheme.textCol,
    },

    container: {
      flex: 1,
    },

    scroller: {
      flexGrow: 1,
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
  });

  function sendResetEmail() {
    updateIsLoading(true);
    auth()
      .sendPasswordResetEmail(userEmail)
      .then(() => {
        updateResetSent(true);
        updateIsLoading(false);
      })
      .catch((error) => {
        if (error.code === 'auth/user-not-found') {
          updateResetSent(true);
          updateIsLoading(false);
        } else {
          Toast.show(error.message);
          updateIsLoading(false);
        }
        updateIsLoading(false);
      });
  }

  function back() {
    navigation.pop(1);
  }

  if (isLoading) {
    return (
      <View style={Styles.loadingMain}>
        <ActivityIndicator size="large" color={colorScheme.inputTextWrapper} />
        <Text style={Styles.loadingText}>Loading...</Text>
      </View>
    );
  } else {
    if (resetSent) {
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
              <View>
                <View style={Styles.imgWrapper}>
                  <Image
                    source={require('./Coins.png')}
                    style={Styles.displayPic}
                  />
                </View>
                <Text style={[Styles.welcomeHeader, Styles.text]}>
                  Reset Password
                </Text>
                <Text style={[Styles.welcomeSub, Styles.text]}>
                  The Email has been sent!
                </Text>
                <TouchableOpacity style={Styles.logBtn} onPress={back}>
                  <Text style={[Styles.logText, Styles.text]}>Confirm</Text>
                </TouchableOpacity>
                <Text style={Styles.btmText}>
                  <Text style={Styles.text}>{'  '}</Text>
                </Text>
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
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
              <View>
                <View style={Styles.imgWrapper}>
                  <Image
                    source={require('./Coins.png')}
                    style={Styles.displayPic}
                  />
                </View>
                <Text style={[Styles.welcomeHeader, Styles.text]}>
                  Reset Password
                </Text>
                <Text style={[Styles.welcomeSub, Styles.text]}>
                  Enter your Email
                </Text>
                <TextInput
                  value={userEmail}
                  autoCompleteType="email"
                  placeholder="Email"
                  placeholderTextColor={colorScheme.placeHolderText}
                  style={Styles.inputFields}
                  onChangeText={(newEmail) => changeUserEmail(newEmail)}
                />
                <TouchableOpacity
                  style={Styles.logBtn}
                  onPress={sendResetEmail}>
                  <Text style={[Styles.logText, Styles.text]}>
                    Send Reset Link
                  </Text>
                </TouchableOpacity>
                <Text style={Styles.btmText}>
                  <Text style={Styles.text}>{'  '}</Text>
                </Text>
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      );
    }
  }
}

// const mapStateToProps = (state) => {
//   return {
//     currUser: state.currUser,
//   };
// };

// const mapDispatchToProps = (dispatch) => {
//   return {
//     updateUser: (newUserObj) => {
//       dispatch({type: 'UPDATE_USER', newUserData: newUserObj});
//     },
//   };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
