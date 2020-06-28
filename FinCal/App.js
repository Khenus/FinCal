import React from 'react';

import {createStore} from 'redux';
import {Provider} from 'react-redux';

import AppStack from './ownModules/Screens';
import LedgerSummary from './ownModules/Ledger/LedgerSummary';
import LedgerCard from './ownModules/Ledger/LedgerCard';
import LedgerToPay from './ownModules/Ledger/LedgerToPay';
import LedgerStack from './ownModules/Screens';
import PersonalScreen from './ownModules/Personal/PersonalScreen';

const initState = {
  currUser: {},
};

function newCurrUserRedux(state = initState, action) {
  switch (action.type) {
    case 'UPDATE_USER':
      return {
        currUser: action.newUserData,
      };
    default:
      return state;
  }
}

const store = createStore(newCurrUserRedux);

export default function App() {
  return (
    <Provider store={store}>
      <AppStack />
      {/* <PersonalScreen />
      <LedgerStack />
      <LedgerToPay />
      <LedgerSummary />
      <LedgerCard /> */}
    </Provider>
  );
}
