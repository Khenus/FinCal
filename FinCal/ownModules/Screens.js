import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import LoginPage from './Login/LoginPage';
import VerifyEmail from './Login/VerifyEmail';
import ForgetPassword from './Login/ForgetPassword';
import SignupPage from './Login/SignupPage';

import HomeScreen from './Home/HomeScreen';
import MyJioSummary from './Home/MyJioSummary';
import EditMenu from './Home/EditMenu';
import HomeMenuSummary from './Home/HomeMenuSummary';
import FoodJioPeople from './FoodJio/FoodJioPeople';
import FoodJioOrder from './FoodJio/FoodJioOrder';
import FoodJioSummary from './FoodJio/FoodJioSummary';

import PersonalScreen from './Personal/PersonalScreen';
import AllTransactions from './Personal/AllTransactions';
import BudgetDetails from './Personal/BudgetDetails';

import LedgerSummary from './Ledger/LedgerSummary';
import LedgerToPay from './Ledger/LedgerToPay';
import LedgerToRecv from './Ledger/LedgerToRecv';
import TransactHist from './Ledger/TransactHist';

// import SettingsScreen from './Settings/SettingsScreen';

const settings = {
  noHeader: {
    headerShown: false,
    animationEnabled: false,
  },

  hasHeader: {
    title: '',
    animationEnabled: false,
    headerStyle: {
      backgroundColor: 'white',
      elevation: 0,
      shadowOpacity: 0,
      borderBottomWidth: 0,
    },
  },

  noHeaderAnimated: {
    title: '',
    headerShown: false,
    animationEnabled: true,
  },

  hasHeaderAnimated: {
    title: '',
    animationEnabled: true,
    headerStyle: {
      backgroundColor: 'white',
      elevation: 0,
      shadowOpacity: 0,
      borderBottomWidth: 0,
    },
  },
};

function HomeStack() {
  const HomeNavStack = createStackNavigator();

  return (
    <HomeNavStack.Navigator initialRouteName="HomeScreen">
      <HomeNavStack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={settings.noHeader}
      />
      <HomeNavStack.Screen
        name="MyJioSummary"
        component={MyJioSummary}
        options={settings.noHeader}
      />
      <HomeNavStack.Screen
        name="EditMenu"
        component={EditMenu}
        options={settings.noHeader}
      />
      <HomeNavStack.Screen
        name="HomeMenuSummary"
        component={HomeMenuSummary}
        options={settings.noHeader}
      />
      <HomeNavStack.Screen
        name="FoodJioPeople"
        component={FoodJioPeople}
        options={settings.noHeader}
      />
      <HomeNavStack.Screen
        name="FoodJioOrder"
        component={FoodJioOrder}
        options={settings.noHeader}
      />
      <HomeNavStack.Screen
        name="FoodJioSummary"
        component={FoodJioSummary}
        options={settings.noHeader}
      />
    </HomeNavStack.Navigator>
  );
}

function PersonalStack() {
  const PersonalNavStack = createStackNavigator();

  return (
    <PersonalNavStack.Navigator initialRouteName="PersonalScreen">
      <PersonalNavStack.Screen
        name="PersonalScreen"
        component={PersonalScreen}
        options={settings.noHeader}
      />
      <PersonalNavStack.Screen
        name="AllTransactions"
        component={AllTransactions}
        options={settings.noHeader}
      />
      <PersonalNavStack.Screen
        name="BudgetDetails"
        component={BudgetDetails}
        options={settings.noHeader}
      />
    </PersonalNavStack.Navigator>
  );
}

function LedgerStack() {
  const LedgStack = createStackNavigator();

  return (
    <LedgStack.Navigator initialRouteName="LedgerSummary">
      <LedgStack.Screen
        name="LedgerSummary"
        component={LedgerSummary}
        options={settings.noHeader}
      />
      <LedgStack.Screen
        name="LedgerToPay"
        component={LedgerToPay}
        options={settings.noHeader}
      />
      <LedgStack.Screen
        name="LedgerToRecv"
        component={LedgerToRecv}
        options={settings.noHeader}
      />
      <LedgStack.Screen
        name="TransactHist"
        component={TransactHist}
        options={settings.noHeader}
      />
    </LedgStack.Navigator>
  );
}

// function SettingsStack() {
//   const SettingsNavStack = createStackNavigator();

//   return (
//     <SettingsNavStack.Navigator initialRouteName="SettingsScreen">
//       <SettingsNavStack.Screen
//         name="SettingsScreen"
//         component={SettingsScreen}
//         options={settings.noHeader}
//       />
//     </SettingsNavStack.Navigator>
//   );
// }

function MainStack() {
  const Tab = createMaterialBottomTabNavigator();

  return (
    <Tab.Navigator initialRouteName="Home">
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />

      <Tab.Screen
        name="Personal"
        component={PersonalStack}
        options={{
          tabBarLabel: 'Personal',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="rocket" color={color} size={26} />
          ),
        }}
      />

      <Tab.Screen
        name="Ledger"
        component={LedgerStack}
        options={{
          tabBarLabel: 'Ledger',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons
              name="account-group-outline"
              color={color}
              size={26}
            />
          ),
        }}
      />

      {/* <Tab.Screen
        name="Settings"
        component={SettingsStack}
        options={{
          tabBarLabel: 'Settings',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="settings" color={color} size={26} />
          ),
        }}
      /> */}
    </Tab.Navigator>
  );
}

export default function AppStack() {
  const LoginStack = createStackNavigator();
  return (
    <NavigationContainer>
      <LoginStack.Navigator initialRouteName="LoginPage">
        <LoginStack.Screen
          name="LoginPage"
          component={LoginPage}
          options={settings.noHeader}
        />
        <LoginStack.Screen
          name="VerifyEmail"
          component={VerifyEmail}
          options={settings.noHeader}
        />
        <LoginStack.Screen
          name="ForgetPassword"
          component={ForgetPassword}
          options={settings.noHeader}
        />
        <LoginStack.Screen
          name="SignupPage"
          component={SignupPage}
          options={settings.noHeader}
        />
        <LoginStack.Screen
          name="MainStack"
          component={MainStack}
          options={settings.noHeader}
        />
      </LoginStack.Navigator>
    </NavigationContainer>
  );
}
