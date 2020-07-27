import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {FAB, Portal, Provider} from 'react-native-paper';

import QuickAdd from './FAB/QuickAdd';
import FoodJio from './FAB/FoodJio';
import AddLedger from './FAB/AddLedger';

export default function FloatActionButton(props) {
  const [open, setOpen] = useState(false);
  const [food, setFood] = useState(false);
  const [add, setAdd] = useState(false);
  const [ledger, setLedger] = useState(false);

  let currUser = props.currUser;
  let pullTransact = props.pullTransact;
  let pullLedger = props.pullLedger;

  const handleOpen = () => {
    setOpen(!open);
  };

  const handleFood = () => {
    setOpen(false);
    setFood(true);
    setLedger(false);
  };

  const handleAdd = () => {
    setOpen(false);
    setAdd(true);
    setLedger(false);
  };

  const handleLedger = () => {
    setOpen(false);
    setAdd(false);
    setLedger(true);
  };

  const styles = StyleSheet.create({
    FABicon: {
      backgroundColor: 'teal',
    },
  });

  function emptyHandler() {
    //Do nth, required
  }

  return (
    <Provider>
      {/* FAB itself */}
      <Portal>
        <FAB.Group
          open={open}
          icon="tooltip-plus-outline"
          fabStyle={styles.FABicon}
          actions={[
            {
              icon: 'credit-card-outline',
              label: 'Add Ledger',
              color: 'white',
              style: {backgroundColor: 'teal'},
              onPress: () => handleLedger(),
            },
            {
              icon: 'food',
              label: 'Create Food Jio',
              color: 'white',
              style: {backgroundColor: 'teal'},
              onPress: () => handleFood(),
            },
            {
              icon: 'pencil-outline',
              label: 'Add Transaction',
              color: 'white',
              style: {backgroundColor: 'teal'},
              onPress: () => handleAdd(),
            },
          ]}
          onStateChange={() => emptyHandler()} //required handler, do NOT remove
          onPress={handleOpen}
        />
      </Portal>

      <QuickAdd
        currUser={currUser}
        visible={add}
        pullTransact={pullTransact}
        setAdd={setAdd}
      />

      <FoodJio currUser={currUser} visible={food} setFood={setFood} />

      <AddLedger
        currUser={currUser}
        visible={ledger}
        setLedger={setLedger}
        pullLedger={pullLedger}
      />
    </Provider>
  );
}
