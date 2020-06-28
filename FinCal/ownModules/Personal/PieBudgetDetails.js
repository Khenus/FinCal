import * as React from 'react';
import {View, Text, StyleSheet, useWindowDimensions, Button} from 'react-native';
import {connect} from 'react-redux';

import FloatActionButton from '../FloatActionButton';
import PieChartWithDynamicSlices from './PieChartWithDynamicSlices';

import TransactionList from './TransactionList.js';
import {fetchTransact} from '../API';
import {darkTheme, lightTheme} from '../GlobalValues.js';

import {useNavigation} from '@react-navigation/native';




export default function PieBudgetOverview() {
    return (
        <Text>BUDGET OVERVIEW (PIE)</Text>
    )
}