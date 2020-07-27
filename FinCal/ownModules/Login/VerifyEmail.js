import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ActivityIndicator,
  useWindowDimensions,
  TouchableOpacity,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ScrollView} from 'react-native-gesture-handler';
import Toast from 'react-native-simple-toast';
import auth from '@react-native-firebase/auth';

import {darkTheme, lightTheme} from '../GlobalValues.js';

export default function VerifyEmail(props) {
  let currWidth = useWindowDimensions().width;
  let currHeight = useWindowDimensions().height;

  let [smallerVal, changeSmallerValue] = useState(0);
  let [isLoading, updateIsLoading] = useState(false);
  let [emailSent, updateEmailSent] = useState(false);

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

  const Styles = StyleSheet.create({
    mainView: {
      flex: 1,
      backgroundColor: colorScheme.backCol,
      alignItems: 'center',
      justifyContent: 'center',
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
    btmText: {
      width: currWidth,
      textAlign: 'center',
      textAlignVertical: 'center',
      fontSize: 13,
      marginBottom: 60,
    },
    signUp: {
      color: colorScheme.hyperLink1,
      textDecorationLine: 'underline',
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
  });

  function back() {
    navigation.pop(1);
  }

  function backWithoutResend() {
    updateIsLoading(true);
    auth()
      .signOut()
      .then(function () {
        navigation.pop(1);
        updateIsLoading(false);
      })
      .catch(function (error) {
        Toast.show(error.message + ' (Verifying Email Error: 1)');
        updateIsLoading(false);
      });
  }

  function sendVeriEmail() {
    updateIsLoading(true);
    auth()
      .currentUser.sendEmailVerification()
      .then(function () {
        auth()
          .signOut()
          .then(function () {
            updateEmailSent(true);
            updateIsLoading(false);
          })
          .catch(function (error) {
            Toast.show(error.message + ' (Sending Email Error: 2)');
            updateIsLoading(false);
          });
      })
      .catch(function (error) {
        Toast.show(error.message + ' (Sending Email Error: 1)');
        updateIsLoading(false);
      });
  }

  if (isLoading) {
    return (
      <View style={Styles.loadingMain}>
        <ActivityIndicator size="large" color={colorScheme.inputTextWrapper} />
        <Text style={Styles.loadingText}>Loading...</Text>
      </View>
    );
  } else {
    if (emailSent) {
      return (
        <SafeAreaView style={Styles.container}>
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
                  Email Sent!
                </Text>
                <Text style={[Styles.welcomeSub, Styles.text]}>
                  Check your Email for the Verification Link
                </Text>
                <TouchableOpacity style={Styles.logBtn} onPress={back}>
                  <Text style={[Styles.logText, Styles.text]}>
                    Back to Login
                  </Text>
                </TouchableOpacity>
                <Text style={Styles.btmText}>
                  <Text style={Styles.text}> </Text>
                </Text>
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      );
    } else {
      return (
        <SafeAreaView style={Styles.container}>
          <ScrollView contentContainerStyle={Styles.scroller}>
            <View style={Styles.mainView}>
              <View>
                <View style={Styles.imgWrapper}>
                  <Image
                    source={require('./Coins.png')}
                    style={Styles.displayPic}
                  />
                </View>
                <Text style={[Styles.welcomeHeader, Styles.text]}>Oops!</Text>
                <Text style={[Styles.welcomeSub, Styles.text]}>
                  Please verify your Email before continuing
                </Text>
                <TouchableOpacity
                  style={Styles.logBtn}
                  onPress={backWithoutResend}>
                  <Text style={[Styles.logText, Styles.text]}>
                    Back to Login
                  </Text>
                </TouchableOpacity>
                <Text style={Styles.btmText}>
                  <Text style={Styles.text}>
                    Resend Verification Email?{'  '}
                  </Text>
                  <Text
                    style={[Styles.signUp, Styles.text]}
                    onPress={sendVeriEmail}>
                    Click Here
                  </Text>
                </Text>
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      );
    }
  }
}
