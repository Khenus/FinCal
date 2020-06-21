import React from 'react';

import AppStack from './ownModules/Screens';
import LedgerSummary from './ownModules/Ledger/LedgerSummary';
import LedgerCard from './ownModules/Ledger/LedgerCard';
import LedgerToPay from './ownModules/Ledger/LedgerToPay';
import LedgerStack from './ownModules/Screens';
import PersonalScreen from './ownModules/Personal/PersonalScreen';

export default function App() {
  //return <PersonalScreen />;
  return <AppStack />;
  //return <LedgerStack />;
  //return <LedgerToPay />;
  //return <LedgerSummary />;
  //return <LedgerCard />;
}
