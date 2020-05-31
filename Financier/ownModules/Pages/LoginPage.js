import React, {useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  useWindowDimensions,
  TouchableOpacity,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ScrollView} from 'react-native-gesture-handler';
import {colorScheme} from '../ColorScheme.js';
import {loginUser} from '../APIs/APIs.js';

function LoginPage({navigation}) {
  let currWidth = useWindowDimensions().width;
  let currHeight = useWindowDimensions().height;
  const [smallerVal, changeSmallerValue] = React.useState(0);

  useEffect(() => {
    let temp = currHeight > currWidth ? currWidth : currHeight;
    changeSmallerValue(temp);
  }, [currWidth, currHeight]);

  const [userEmail, changeUserEmail] = React.useState('');
  const [userPass, changeUserPass] = React.useState('');

  function loginAction() {
    loginUser(userEmail, userPass);
  }

  function redirSelector() {
    navigation.navigate('SignupPage');
  }

  const Styles = StyleSheet.create({
    mainView: {
      flex: 1,
      //paddingBottom: 0,
      backgroundColor: 'white',
      //height: currHeight - getStatusBarHeight(),
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
      backgroundColor: colorScheme.button1,
      borderColor: 'white',
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
      // borderColor: 'black',
      // borderWidth: 1,
      // borderRadius: 5,
    },

    signUp: {
      color: colorScheme.hyperLink1,
      textDecorationLine: 'underline',
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
      <ScrollView contentContainerStyle={Styles.flexGrow}>
        <View style={Styles.mainView}>
          <View style={Styles.imgWrapper}>
            <Image
              source={require('./trollFace.png')}
              style={Styles.displayPic}
            />
          </View>
          <Text style={Styles.welcomeHeader}>Welcome</Text>
          <Text style={Styles.welcomeSub}>
            Log in to keep track of your finances
          </Text>
          <TextInput
            value={userEmail}
            autoCompleteType="email"
            placeholder="Email"
            style={Styles.inputFields}
            onChangeText={newEmail => changeUserEmail(newEmail)}
          />
          <TextInput
            value={userPass}
            autoCompleteType="password"
            secureTextEntry={true}
            placeholder="Password"
            style={Styles.inputFields}
            onChangeText={newPass => changeUserPass(newPass)}
          />
          <TouchableOpacity style={Styles.logBtn} onPress={loginAction}>
            <Text style={Styles.logText}>Log in </Text>
          </TouchableOpacity>
          <Text style={Styles.btmText}>
            <Text>Don't Have an account?{'  '}</Text>
            <Text style={Styles.signUp} onPress={redirSelector}>
              Sign up
            </Text>
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default LoginPage;
