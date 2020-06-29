import * as React from 'react';
import {View, Text, StyleSheet, useWindowDimensions, Button} from 'react-native';
import {connect} from 'react-redux';

import FloatActionButton from '../FloatActionButton';

import TransactionList from './TransactionList.js';
import {fetchTransact} from '../API';
import {darkTheme, lightTheme} from '../GlobalValues.js';

import {useNavigation} from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';


function AllTransactions(props) {

  navigation = useNavigation();

  let currHeight = useWindowDimensions().height;

  let [transactData, updateTransactData] = React.useState([]);
  let [themeDark, updateTheme] = React.useState(true);
  let [colorScheme, updateColorScheme] = React.useState(darkTheme);

  let currUser = props.currUser;
  let parentDarkTheme = currUser.themeIsDark === 'true';

  React.useEffect(() => {
    themeDark === true
      ? updateColorScheme(darkTheme)
      : updateColorScheme(lightTheme);
  }, [themeDark]);

  React.useEffect(() => {
    updateTheme(parentDarkTheme);
  }, [parentDarkTheme]);

  React.useEffect(() => {
    async function tempHandler() {
      let result = await fetchTransact(currUser.Email, currUser.uuid);
      if (typeof result === 'object') {
        updateTransactData(result);
      }
    }

    tempHandler();
  }, [currUser.Email, currUser.uuid]);

  const localStyle = StyleSheet.create({
    mainView: {
      flex: 1,
      backgroundColor: '#121212',
      // borderColor: 'white',
      // borderWidth: 1,
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
      fontStyle:'italic',
    },

    subtitleStyle: {
      color: colorScheme.textCol,
      fontSize: 18,
      fontWeight: 'bold',
      fontStyle: 'italic',
      marginLeft: 15,
    },

    welcomeStyle: {
      color: colorScheme.textCol,
      fontSize: 25,
      fontWeight: 'bold',
      //backgroundColor: 'grey',
      marginTop: 20,
      marginLeft: 15,
    },

    // transList: {
    //   flexGrow: 1,
    //   marginTop: 20,
    //   height: currHeight * 0.431,
    //   // borderColor: 'white',
    //   // borderWidth: 1,
    // },
  });

  async function updateData() {
    let result = await fetchTransact(currUser.Email, currUser.uuid);
    if (typeof result === 'object') {
      updateTransactData(result);
    }
  }


    return (
        <View style = {localStyle.mainView}>

            <View style={localStyle.header}>
              <Text style={localStyle.welcomeStyle}>Your personal finances.</Text>
            </View>

            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={localStyle.subtitleStyle}>All Transactions</Text>
              <Button title='drop down sort menu here'/>
            </View>
            
            <ScrollView>
            <Text style={{marginLeft:15,color:'red',}}>TODO: fix scrollview, and back to personal button being pushed to the bottom</Text>
              <TransactionList dataArr={transactData} num={100}/>
            </ScrollView>

            <Text />

            <Text onPress={() => navigation.navigate("PersonalScreen")} style={localStyle.back}>Back to Personal</Text>
        </View>
    )
}


const mapStateToProps = (state) => {
    return {
      currUser: state.currUser,
    };
  };
  
  export default connect(mapStateToProps)(AllTransactions);