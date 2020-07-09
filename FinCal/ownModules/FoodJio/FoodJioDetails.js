import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, useWindowDimensions} from 'react-native';
import {Divider, CheckBox} from 'react-native-elements';
// import {connect} from 'react-redux';

import NumericInput from 'react-native-numeric-input';

// import TransactionList from './TransactionList.js';
// import {fetchTransact} from '../API';
import {darkTheme, lightTheme} from '../GlobalValues.js';

import {ScrollView, FlatList} from 'react-native-gesture-handler';

import SectionList from 'react-native-tabs-section-list';
import faker from 'faker';

import MenuDisplay from './MenuDisplay.js';
import AddPeople from './AddPeople.js';

import FakeAllOrderData from './FakeAllOrderData.js';
import FakeMenuData from './FakeMenuData.js';
import FakeOwnOrderData from './FakeOwnOrderData.js';
import FakeFinalOrderData from './FakeFinalOrderData.js';

export default function FoodJioDetails(props) {
  let currUser = props.route.params.currUser;
  let menuIdx = props.route.params.menuIdx;

  const localStyle = StyleSheet.create({
    mainView: {
      flex: 1,
      backgroundColor: '#121212',
    },

    headerStyle: {
      color: 'white',
      fontSize: 25,
      fontWeight: 'bold',
      marginTop: 20,
      marginLeft: 15,
      textAlign: 'center',
    },

    outletStyle: {
      color: 'white',
      fontSize: 20,
      fontWeight: 'bold',
      fontStyle: 'italic',
      marginLeft: 15,
    },

    header: {
      marginBottom: 10,
    },

    subHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },

    viewDetails: {
      color: 'aquamarine',
      marginRight: 15,
    },
  });

  return (
    // <View>
    <View style={localStyle.mainView}>
      <AddPeople currUser={currUser} />
      <MenuDisplay currUser={currUser} menuIdx={menuIdx} />
      
      {/* <Text>Type 1</Text>
        <Temp
          currType={0}
          orderdata={FakeAllOrderData}
          menudata={FakeMenuData}
          finaldata={FakeFinalOrderData}
          currUser={currUser}
        /> */}
      {/* <Text>Type 3</Text>
        <Temp
          currType={2}
          orderdata={FakeAllOrderData}
          menudata={FakeMenuData}
          finaldata={FakeFinalOrderData}
          currUser={currUser}
        />*/}
    </View>
  );
}

// cond rendering
// tmp = 0 is the initial overview screen
// tmp = 1 is the place order screen
// tmp = 2 is the final compiled overview screen
// function Temp(props) {
//   let currType = props.currType;
//   let currUser = props.currUser;
//   let [tmp, updateTmp] = useState(0);

//   useEffect(() => {
//     updateTmp(currType);
//   }, [currType]);

//   const localStyle = StyleSheet.create({
//     title: {
//       color: 'white',
//       fontSize: 18,
//       textDecorationLine: 'underline',
//       marginLeft: 15,
//     },

//     button: {
//       color: '#77DD77',
//       borderColor: '#77DD77',
//       fontSize: 17,
//       textAlign: 'center',
//       borderWidth: 1,
//       borderRadius: 5,
//       marginLeft: 15,
//       marginRight: 15,
//     },

//     cancelbutton: {
//       textAlign: 'center',
//       color: '#FF6961',
//       fontSize: 17,
//       padding: 7,
//       borderWidth: 1,
//       borderColor: '#FF6961',
//       borderRadius: 5,
//     },

//     confirmbutton: {
//       textAlign: 'center',
//       color: '#77DD77',
//       fontSize: 17,
//       padding: 7,
//       borderWidth: 1,
//       borderColor: '#77DD77',
//       borderRadius: 5,
//     },
//   });

//   // ordering view
//   if (tmp === 1) {
//     return (
//       <View>
//         <Text style={{marginLeft: 15, color: 'red'}}>
//           TODO: 1) pull menu data from backend 2) update OwnOrderData when
//           number picker is pressed. 3) make each number picker 'independent'. 4)
//           fix tabs so that they jump to category when pressed.
//         </Text>
//         {/* <View style={{height: 300}}>
//         </View> */}
//         {/* <ScrollView nestedScrollEnabled={true} style={{height: 300}}> */}
//         {/* <View>
//             {(props.menudata).map((item, idx) => (
//               <MenuItem data={item} key={idx} />
//             ))}
//           </View> */}
//         <MenuDisplay currUser={currUser} />
//         {/* </ScrollView> */}

//         <Text />

//         <Text style={{marginLeft: 15, color: 'white'}}>Cart:</Text>
//         <Text style={{marginLeft: 15, color: 'red'}}>
//           TODO: 1) dynamically update OwnOrderData here. 2) when confirm is
//           pressed, data in OwnOrderData is appended to AllOrderData
//         </Text>

//         {/* buttons shld have absolute positioning at the bottom?? */}
//         <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
//           <Text style={localStyle.cancelbutton} onPress={() => updateTmp(0)}>
//             Cancel
//           </Text>
//           <Text
//             style={localStyle.confirmbutton}
//             onPress={() => {
//               updateTmp(2);
//               console.log('order placed');
//             }}>
//             Confirm
//           </Text>
//         </View>

//         <Text />
//       </View>
//     );
//   }

//   // initial overview
//   else if (tmp === 0) {
//     return (
//       <View>
//         <Text style={localStyle.title}>Current orders</Text>
//         <View>
//           {props.orderdata.map((item, idx) => (
//             <OrderItem data={item} key={idx} />
//           ))}
//         </View>
//         <Text />
//         <Text onPress={() => updateTmp(1)} style={localStyle.button}>
//           Add Order
//         </Text>
//         <Text style={{marginLeft: 15, color: 'red'}}>
//           TODO: style Add Order button, style current order list. make this page
//           more presentable in general
//         </Text>
//       </View>
//     );
//   }

//   //final compiled overview
//   else if (tmp === 2) {
//     return (
//       <View>
//         <Text
//           style={{
//             color: 'white',
//             fontWeight: 'bold',
//             fontSize: 22,
//             marginLeft: 15,
//           }}>
//           Compiled Orders
//         </Text>
//         <View>
//           {props.finaldata.map((item, idx) => (
//             <FinalItem data={item} key={idx} />
//           ))}
//         </View>
//         <Text />

//         <Text
//           style={{
//             color: 'white',
//             fontWeight: 'bold',
//             fontSize: 22,
//             marginLeft: 15,
//           }}>
//           Each person pays
//         </Text>
//         <Text style={{marginLeft: 15, color: 'red'}}>
//           TODO: think abt how to restructure the stored order data to include
//           info on who ordered how much, so that debts are more easily
//           calculated.{'\n'}and also do cond rendering in the main
//           JioOverviewScreen component.
//         </Text>

//         <Text />

//         <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
//           <Text style={localStyle.cancelbutton} onPress={() => updateTmp(0)}>
//             back to overview
//           </Text>
//           <Text style={localStyle.confirmbutton} onPress={() => updateTmp(1)}>
//             back to ordering
//           </Text>
//         </View>
//       </View>
//     );
//   }
// }

// // initial order overview item, for tmp = 0
// function OrderItem(props) {
//   let data = props.data;

//   const localStyle = StyleSheet.create({
//     transactionListStyleL: {
//       color: 'white',
//       fontSize: 15,
//       // fontStyle: 'italic',
//       marginLeft: 15,
//     },

//     transactionListStyleR: {
//       color: 'white',
//       fontSize: 15,
//       fontStyle: 'italic',
//       marginRight: 15,
//       textAlign: 'right',
//     },

//     mainStyle: {
//       flexDirection: 'row',
//       justifyContent: 'space-between',
//       marginTop: 8,
//       marginBottom: 5,
//     },

//     divider: {
//       backgroundColor: 'yellow',
//       marginLeft: 15,
//       marginRight: 15,
//     },
//   });

//   return (
//     <View>
//       <View style={localStyle.mainStyle}>
//         <Text style={localStyle.transactionListStyleL}>
//           {data.item} x{data.qty}
//         </Text>
//         <Text style={localStyle.transactionListStyleR}>
//           ${(data.price * data.qty).toFixed(2)}
//         </Text>
//       </View>
//       <Divider style={localStyle.divider} />
//     </View>
//   );
// }

// //final compiled overview item, for tmp = 2
// function FinalItem(props) {
//   let data = props.data;

//   const localStyle = StyleSheet.create({
//     transactionListStyleL: {
//       color: 'white',
//       fontSize: 15,
//       // fontStyle: 'italic',
//       marginLeft: 15,
//     },

//     transactionListStyleR: {
//       color: 'white',
//       fontSize: 15,
//       fontStyle: 'italic',
//       marginRight: 15,
//       textAlign: 'right',
//     },

//     mainStyle: {
//       flexDirection: 'row',
//       justifyContent: 'space-between',
//       marginTop: 8,
//       marginBottom: 5,
//     },

//     divider: {
//       backgroundColor: 'yellow',
//       marginLeft: 15,
//       marginRight: 15,
//     },
//   });

//   return (
//     <View>
//       <View style={localStyle.mainStyle}>
//         <Text style={localStyle.transactionListStyleL}>{data.item}</Text>
//         <Text style={localStyle.transactionListStyleR}>x{data.qty}</Text>
//       </View>
//       <Divider style={localStyle.divider} />
//     </View>
//   );
// }

// // individual menu item
// function MenuItem(props) {
//   let data = props.data
//   let [tmp, updateTmp] = useState('transparent');

//   return (
//     <View style={localStyle.mainStyle}>
//         <NumericInput type='plus-minus'
//                     minValue={0}
//                     onChange={value => handleNum(value)}
//                     rounded
//                     rightButtonBackgroundColor='transparent'
//                     leftButtonBackgroundColor='transparent'
//                     textColor='white'
//                     borderColor='transparent'
//                     // borderColor='grey'
//                     iconStyle={{color:'white'}}
//                     totalWidth={100}
//                     totalHeight={50}
//                     separatorWidth={0}
//                     containerStyle={{backgroundColor:tmp, marginLeft:15,}}
//         />
//         <Text style={localStyle.transactionListStyleL}>
//           {data.item}
//         </Text>
//         <Text style={localStyle.transactionListStyleR}>
//           ${(data.price).toFixed(2)}
//         </Text>
//       </View>
//       <Divider style={localStyle.divider} />
//     </View>
//   );
// }
