import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
  Button,
} from 'react-native';
import {connect} from 'react-redux';

import FloatActionButton from '../FloatActionButton';
import PieChartWithDynamicSlices from './Components/PieChartWithDynamicSlices';
import BarChartEx from './Components/BarChart.js';

import {fetchTransact} from '../API';
import {darkTheme, lightTheme} from '../GlobalValues.js';

import {useNavigation} from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import FakeDataPie from './FakeDataPie.js';
import FakeDataBar from './FakeDataBar.js';

function BudgetDetails(props) {
  let currHeight = useWindowDimensions().height;
  var chosenMonth = 'May 2020';

  let navigation = props.navigation;
  let currUser = props.currUser;

  let [transactData, updateTransactData] = useState([]);

  let [themeDark, updateTheme] = useState(true);
  let [colorScheme, updateColorScheme] = useState(darkTheme);

  let parentDarkTheme = currUser.themeIsDark === 'true';

  useEffect(() => {
    themeDark === true
      ? updateColorScheme(darkTheme)
      : updateColorScheme(lightTheme);
  }, [themeDark]);

  useEffect(() => {
    updateTheme(parentDarkTheme);
  }, [parentDarkTheme]);

  useEffect(() => {
    async function tempHandler() {
      let result = await fetchTransact(currUser.Email, currUser.uuid);
      if (typeof result === 'object') {
        updateTransactData(result);
      }
    }
    tempHandler();
  }, [currUser.Email, currUser.uuid]);

  let [pieColor, updatePieColor] = useState('yellow');
  let [barColor, updateBarColor] = useState('white');
  let [view, updateView] = useState(true);

  const localStyle = StyleSheet.create({
    mainView: {
      flex: 1,
      backgroundColor: '#121212',
    },

    header: {
      marginBottom: 10,
    },

    subHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },

    back: {
      color: 'aquamarine',
      marginLeft: 15,
      fontStyle: 'italic',
    },

    subtitleStyle: {
      color: colorScheme.textCol,
      fontSize: 18,
      fontWeight: 'bold',
      fontStyle: 'italic',
      marginLeft: 15,
    },

    monthStyle: {
      color: 'aquamarine',
      fontSize: 18,
      fontWeight: 'bold',
      marginLeft: 15,
    },

    welcomeStyle: {
      color: colorScheme.textCol,
      fontSize: 25,
      fontWeight: 'bold',
      marginTop: 20,
      marginLeft: 15,
    },

    logoView: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      marginRight: 15,
    },

    pieIconStyle: {
      borderColor: pieColor,
      borderWidth: 1,
      borderRadius: 5,
      padding: 2.5,
      marginRight: 5,
    },

    barIconStyle: {
      borderColor: barColor,
      borderWidth: 1,
      borderRadius: 5,
      padding: 2.5,
      marginLeft: 5,
    },
  });

  function handlePiePress() {
    updatePieColor('yellow');
    updateBarColor('white');
    updateView(true);
  }

  function handleBarPress() {
    updatePieColor('white');
    updateBarColor('yellow');
    updateView(false);
  }

  return (
    <View style={localStyle.mainView}>
      <View style={localStyle.header}>
        <Text style={localStyle.welcomeStyle}>Your personal finances.</Text>
      </View>

      <View style={localStyle.subHeader}>
        <Text style={localStyle.subtitleStyle}>Budget Overview</Text>
        <View style={localStyle.logoView}>
          <MaterialCommunityIcons
            name="chart-pie"
            color={pieColor}
            size={25}
            style={localStyle.pieIconStyle}
            onPress={() => handlePiePress()}
          />
          <MaterialCommunityIcons
            name="poll"
            color={barColor}
            size={25}
            style={localStyle.barIconStyle}
            onPress={() => handleBarPress()}
          />
        </View>
      </View>

      {/* This needs to be change into a picker */}
      <Text style={localStyle.monthStyle}>
        {chosenMonth}
        <MaterialCommunityIcons
          name="chevron-down"
          color="white"
          size={25}
          style={{color: 'aquamarine', marginTop: 15}}
        />
      </Text>

      <Text style={{marginLeft: 15, color: 'red'}}>
        TODO: add duration picker (both length and type) to May 2020 onPress.
        also why is the arrow misaligned :(
      </Text>

      {/* Cond rendering for pie/bar view */}
      <Temp flip={view} currUser={currUser} />

      <Text />

      <Text
        onPress={() => navigation.navigate('PersonalScreen')}
        style={localStyle.back}>
        Back to Personal
      </Text>
    </View>
  );
}

function Temp(props) {
  if (props.flip === true) {
    return <PieView currUser={props.currUser} />;
  } else {
    return <BarView />;
  }
}

function PieView(props) {
  var totalAmt = 175;
  var totalPct = 87.5;

  let currUser = props.currUser;

  const localStyle = StyleSheet.create({
    breakdownStyle: {
      color: 'white',
      fontSize: 18,
      fontStyle: 'italic',
      marginLeft: 15,
    },

    tableHeadStyle1: {
      color: 'white',
      fontSize: 18,
      fontWeight: 'bold',
      fontStyle: 'italic',
      marginLeft: 15,
      flex: 3.5,
    },

    tableHeadStyle2: {
      color: 'white',
      fontSize: 18,
      fontWeight: 'bold',
      fontStyle: 'italic',
      flex: 1,
    },
  });

  return (
    <View>
      <PieChartWithDynamicSlices currUser={currUser} />

      <Text style={localStyle.breakdownStyle}>Breakdown</Text>

      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text style={localStyle.tableHeadStyle1}>Total</Text>
        <Text style={localStyle.tableHeadStyle2}>${totalAmt}</Text>
        <Text style={localStyle.tableHeadStyle2}>{totalPct}%</Text>
      </View>

      <View>
        {FakeDataPie.map((item, idx) => (
          <PieListItem data={item} key={idx} />
        ))}
      </View>
    </View>
  );
}

function PieListItem(props) {
  let data = props.data;

  const localStyle = StyleSheet.create({
    catContainerStyle: {
      flex: 3.5,
      flexDirection: 'row',
      justifyContent: 'flex-start',
      marginLeft: 15,
    },

    catTextStyle: {
      color: 'white',
      fontSize: 17,
      marginLeft: 7.5,
      paddingVertical: 7,
    },

    amtPctTextStyle: {
      color: 'white',
      fontSize: 17,
      flex: 1,
      paddingVertical: 7,
    },
  });

  return (
    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
      <View style={localStyle.catContainerStyle}>
        <MaterialCommunityIcons name="rocket" color="white" size={26} />
        <Text style={localStyle.catTextStyle}>{data.cat}</Text>
      </View>

      <Text style={localStyle.amtPctTextStyle}>${data.amt}</Text>
      <Text style={localStyle.amtPctTextStyle}>{data.pct}%</Text>
    </View>
  );
}

function BarView() {
  const localStyle = StyleSheet.create({
    breakdownStyle: {
      color: 'white',
      fontSize: 18,
      fontStyle: 'italic',
      marginLeft: 15,
    },

    tableHeadStyle1: {
      color: 'white',
      fontSize: 18,
      fontWeight: 'bold',
      fontStyle: 'italic',
      marginLeft: 15,
      flex: 3.5,
    },

    tableHeadStyle2: {
      color: 'white',
      fontSize: 18,
      fontWeight: 'bold',
      fontStyle: 'italic',
      flex: 1,
    },
  });

  return (
    <View>
      <BarChartEx />

      <Text style={localStyle.breakdownStyle}>Breakdown</Text>

      <View>
        {FakeDataBar.map((item, idx) => (
          <BarListItem data={item} key={idx} />
        ))}
      </View>
    </View>
  );
}

function BarListItem(props) {
  let data = props.data;

  const localStyle = StyleSheet.create({
    monthContainerStyle: {
      flex: 3.5,
      flexDirection: 'row',
      justifyContent: 'flex-start',
      marginLeft: 15,
    },

    monthTextStyle: {
      color: 'white',
      fontSize: 17,
      marginLeft: 7.5,
      paddingVertical: 7,
    },

    amtTextStyle: {
      color: 'white',
      fontSize: 17,
      flex: 1,
      paddingVertical: 7,
    },
  });

  let icon;
  if (data.tmp == 'more') {
    icon = <MaterialCommunityIcons name="chevron-up" color="red" size={26} />;
  } else if (data.tmp == 'less') {
    icon = (
      <MaterialCommunityIcons name="chevron-down" color="green" size={26} />
    );
  } else {
    icon = <MaterialCommunityIcons name="minus" color="grey" size={26} />;
  }

  return (
    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
      <View style={localStyle.monthContainerStyle}>
        <MaterialCommunityIcons name="rocket" color="white" size={26} />
        <Text style={localStyle.monthTextStyle}>{data.month}</Text>
      </View>

      <Text style={localStyle.amtTextStyle}>${data.amt}</Text>
      <Text style={localStyle.amtTextStyle}>{icon}</Text>
    </View>
  );
}

const mapStateToProps = (state) => {
  return {
    currUser: state.currUser,
  };
};

export default connect(mapStateToProps)(BudgetDetails);
