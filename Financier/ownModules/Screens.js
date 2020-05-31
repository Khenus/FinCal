import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import LoginPage from './Pages/LoginPage.js';
import SignupPage from './Pages/SignupPage.js';

//navigationOptions this is the new navigation options
const settings = {
  loginPage: {
    headerShown: false,
    animationEnabled: false,
  },

  signupPage: {
    title: '',
    animationEnabled: false,
    headerStyle: {
      backgroundColor: 'white',
      elevation: 0,
      shadowOpacity: 0,
      borderBottomWidth: 0,
    },
  },
};

export function RootStack() {
  const mainStack = createStackNavigator();

  return (
    <NavigationContainer>
      <mainStack.Navigator initialRouteName="LoginPage">
        <mainStack.Screen
          name="LoginPage"
          component={LoginPage}
          options={settings.loginPage}
        />
        <mainStack.Screen
          name="SignupPage"
          component={SignupPage}
          options={settings.signupPage}
        />
      </mainStack.Navigator>
    </NavigationContainer>
  );
}
