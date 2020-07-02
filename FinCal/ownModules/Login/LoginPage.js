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
import {CommonActions} from '@react-navigation/native';
import Toast from 'react-native-simple-toast';
import {connect} from 'react-redux';

import {darkTheme, lightTheme} from '../GlobalValues.js';
import {login} from '../API';

function LoginPage(props) {
  let currWidth = useWindowDimensions().width;
  let currHeight = useWindowDimensions().height;
  const [smallerVal, changeSmallerValue] = useState(0);
  const [isLoading, changeIsLoading] = useState(false);

  let [themeDark, updateTheme] = useState(true);
  let [colorScheme, updateColorScheme] = useState(darkTheme);

  let parentDarkTheme = true;

  let navigation = props.navigation;
  // console.log(props);

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

  const [userEmail, changeUserEmail] = useState('');
  const [userPass, changeUserPass] = useState('');

  function redirSelector() {
    navigation.navigate('SignupPage');
  }

  //let currUser = props.currUser;
  // console.log(currUser);

  async function loginAction() {
    changeIsLoading(true);
    var result = await login(userEmail, userPass);

    if (typeof result === 'object') {
      // console.log(result);
      props.updateUser(result[0]);
      changeIsLoading(false);
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [
            {
              name: 'MainStack',
            },
          ],
        }),
      );
    } else {
      changeIsLoading(false);
      Toast.show(result);
    }
  }

  const Styles = StyleSheet.create({
    mainView: {
      flex: 1,
      //paddingBottom: 0,
      backgroundColor: colorScheme.backCol,
      //height: currHeight - getStatusBarHeight(),
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
        <ScrollView contentContainerStyle={Styles.scroller}>
          <View style={Styles.mainView}>
            <View style={Styles.imgWrapper}>
              <Image
                source={require('./Coins.png')}
                style={Styles.displayPic}
              />
            </View>
            <Text style={[Styles.welcomeHeader, Styles.text]}>Welcome</Text>
            <Text style={[Styles.welcomeSub, Styles.text]}>
              Log in to keep track of your finances
            </Text>
            <TextInput
              value={userEmail}
              autoCompleteType="email"
              placeholder="Email"
              placeholderTextColor={colorScheme.placeHolderText}
              style={Styles.inputFields}
              onChangeText={(newEmail) => changeUserEmail(newEmail)}
            />
            <TextInput
              value={userPass}
              autoCompleteType="password"
              secureTextEntry={true}
              placeholder="Password"
              placeholderTextColor={colorScheme.placeHolderText}
              style={Styles.inputFields}
              onChangeText={(newPass) => changeUserPass(newPass)}
            />
            <TouchableOpacity style={Styles.logBtn} onPress={loginAction}>
              <Text style={[Styles.logText, Styles.text]}>Log in</Text>
            </TouchableOpacity>
            <Text style={Styles.btmText}>
              <Text style={Styles.text}>Don't Have an account?{'  '}</Text>
              <Text
                style={[Styles.signUp, Styles.text]}
                onPress={redirSelector}>
                Sign up
              </Text>
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currUser: state.currUser,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateUser: (newUserObj) => {
      dispatch({type: 'UPDATE_USER', newUserData: newUserObj});
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
