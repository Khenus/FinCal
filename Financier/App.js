/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {RootStack} from './ownModules/Screens.js';
//import PSignupPage from './ownModules/Pages/PSignupPage.js';

const App: () => React$Node = () => {
  return <RootStack />;
  //return <PSignupPage />;
};

export default App;
