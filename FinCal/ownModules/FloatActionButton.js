import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {FAB, Portal, Provider} from 'react-native-paper';

import QuickAdd from './FAB/QuickAdd';
import FoodJio from './FAB/FoodJio';

export default function FloatActionButton(props) {
  const [open, setOpen] = useState(false);
  const [food, setFood] = useState(false);
  const [add, setAdd] = useState(false);

  let currUser = props.currUser;
  let pullTransact = props.pullTransact;

  const handleOpen = () => {
    setOpen(!open);
  };

  const handleFood = () => {
    setOpen(false);
    setFood(true);
  };

  const handleAdd = () => {
    setOpen(false);
    setAdd(true);
  };

  const styles = StyleSheet.create({
    FABicon: {
      backgroundColor: 'teal',
    },
  });

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
              icon: 'food',
              label: 'Food Jio',
              color: 'white',
              style: {backgroundColor: 'teal'},
              onPress: () => handleFood(),
            },
            {
              icon: 'pencil-outline',
              label: 'Fast Add',
              color: 'white',
              style: {backgroundColor: 'teal'},
              onPress: () => handleAdd(),
            },
          ]}
          onStateChange={() => console.log('state changed')} //required handler, do NOT remove
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
    </Provider>
  );
}
