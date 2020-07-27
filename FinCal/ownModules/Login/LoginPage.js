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
import auth from '@react-native-firebase/auth';

import {darkTheme, lightTheme} from '../GlobalValues.js';
import {login} from '../API';

function LoginPage(props) {
  let currWidth = useWindowDimensions().width;
  let currHeight = useWindowDimensions().height;

  const [smallerVal, changeSmallerValue] = useState(0);
  const [isLoading, changeIsLoading] = useState(true);

  let [localUser, updateLocalUser] = useState('none');

  let [themeDark, updateTheme] = useState(true);
  let [colorScheme, updateColorScheme] = useState(darkTheme);

  let parentDarkTheme = true;

  let navigation = props.navigation;

  // let fromHome;
  // if (props.route.params === undefined) {
  //   fromHome = false;
  // } else {
  //   fromHome = props.route.params.fromHome;
  // }

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
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [
          {
            name: 'SignupPage',
          },
        ],
      }),
    );
  }

  function redirForget() {
    navigation.navigate('ForgetPassword');
  }

  useEffect(() => {
    function onAuthStateChanged(newUser) {
      updateLocalUser(newUser);
      // console.log(newUser);
    }

    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  useEffect(() => {
    async function fetchUser() {
      var result = await login(localUser.uid);

      if (typeof result[0] === 'object') {
        let tempObj = {
          Email: localUser.email,
          Verified: localUser.emailVerified,
          uuid: localUser.uid,
          Name: result[0].Name,
          Phone: result[0].Phone,
          themeIsDark: result[0].themeIsDark,
        };

        props.updateUser(tempObj); //This is the redux part, add this in to the website
        // updateLocalUser(null);
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

        // changeIsLoading(false);
      } else {
        auth()
          .signOut()
          .then(updateLocalUser(null))
          .catch((err) => Toast.show(err));
        changeIsLoading(false);
      }
    }

    function redirToVeriEmail() {
      navigation.navigate('VerifyEmail');
    }

    if (typeof localUser === 'object') {
      if (localUser) {
        if (localUser.emailVerified === true) {
          fetchUser();
        } else {
          redirToVeriEmail();
        }
      } else {
        changeIsLoading(false);
      }
    }
  }, [localUser, navigation, props]);

  async function loginAction() {
    if (userEmail !== '' && userPass !== '') {
      changeIsLoading(true);
      auth()
        .signInWithEmailAndPassword(userEmail, userPass)
        .then()
        .catch((error) => {
          if (error.code === 'auth/email-already-in-use') {
            Toast.show('That email address is already in use');
          } else if (error.code === 'auth/invalid-email') {
            Toast.show('That email address is invalid');
          } else if (
            error.code === 'auth/user-not-found' ||
            error.code === 'auth/wrong-password'
          ) {
            Toast.show('Invalid email or password');
          } else {
            Toast.show(error.message);
          }
          changeIsLoading(false);
        });
    }
  }

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
      marginBottom: 3,
      marginTop: 10,
    },

    btmText: {
      width: currWidth,
      textAlign: 'center',
      textAlignVertical: 'center',
      fontSize: 13,
      marginBottom: 20,
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
            <View>
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
              <Text style={Styles.btmTextWithoutMargin}>
                <Text style={Styles.text}>Forget Password?{'  '}</Text>
                <Text
                  style={[Styles.signUp, Styles.text]}
                  onPress={redirForget}>
                  Reset Password
                </Text>
              </Text>
              <Text style={Styles.btmText}>
                <Text style={Styles.text}>Don't Have an account?{'  '}</Text>
                <Text
                  style={[Styles.signUp, Styles.text]}
                  onPress={redirSelector}>
                  Sign up
                </Text>
              </Text>
            </View>
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
