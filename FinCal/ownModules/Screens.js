import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import LedgerSummary from './Ledger/LedgerSummary';
import LedgerToPay from './Ledger/LedgerToPay';
import LedgerToRecv from './Ledger/LedgerToRecv';

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

export default function LedgerStack() {
  const LedgStack = createStackNavigator();

  return (
    <NavigationContainer>
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
      </LedgStack.Navigator>
    </NavigationContainer>
  );
}

// export default function AppStack() {
//   const MainStack = createBottomTabNavigator();

//   return (
//     <NavigationContainer>
//       <MainStack.Navigator>
//         <MainStack.Screen name="LedgerStack" component={LedgerStack} />
//       </MainStack.Navigator>
//     </NavigationContainer>
//   );
// }
