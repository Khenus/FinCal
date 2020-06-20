import React from 'react';

import AppStack from './ownModules/Screens';
import LedgerSummary from './ownModules/Ledger/LedgerSummary';
import LedgerCard from './ownModules/Ledger/LedgerCard';
import LedgerToPay from './ownModules/Ledger/LedgerToPay';
import LedgerStack from './ownModules/Screens';

export default function App() {
  //return <AppStack />;
  return <LedgerStack />;
  //return <LedgerToPay />;
  //return <LedgerSummary />;
  //return <LedgerCard />;
}
