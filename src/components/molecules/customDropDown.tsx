import {FlatList, Modal, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {FC, useRef, useState} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

const styles = StyleSheet.create({
  dropdown: {
    // position: 'absolute',
    backgroundColor: 'pink', //'#fff',
    width: '90%',
    alignSelf: 'center',
    marginTop: '94%',
    shadowColor: '#000000',
    shadowRadius: 4,
    shadowOffset: {height: 4, width: 0},
    shadowOpacity: 0.5,
  },
  dropperPresser: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    width: '90%',
    paddingHorizontal: 10,
    zIndex: 1,
  },
  dropperWrap: {
    backgroundColor: 'teal', //'pink',
    margin: 6,
    borderRadius: 8,
  },
  dropperWrapText: {
    flex: 1,
    textAlign: 'center',
    fontSize: 17,
    paddingBottom: 6,
    color: '#FFFFFF',
  },
  item: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderBottomWidth: 1,
    textAlign: 'center',
  },
  modalla: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  renderDropText: {
    position: 'absolute',
    top: 50,
  },
});

interface Props {
  label: string;
  // data: Array<{label: string; value: string}>;
  // onSelect: (item: {label: string; value: string}) => void;
}

//const CustomDropDown: FC<Props> = ({setLabel}) => {
const CustomDropDown = ({setChoice}) => {
  const DropdownButton = useRef();
  const [dropDownTop, setDropDownTop] = useState(0);
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState('Select category');

  const dropdownCategories = [
    {
      label: 'Electronics',
      value: '1',
    },
    {
      label: 'Fashion',
      value: '2',
    },
    {
      label: 'Household',
      value: '3',
    },
  ];

  const categories = ['Electronics', 'Automobiles', 'Household'];

  const toggleDrop = (): void => {
    visible ? setVisible(false) : setVisible(true);
  };

  const renderItem = ({item}) => (
    <Pressable onPress={() => onItemPress(item)} style={styles.item}>
      <Text>{item}</Text>
    </Pressable>
  );

  const renderDrop = () => (
    <Modal
      style={styles.modalla}
      visible={visible}
      transparent
      animationType="slide">
      <Pressable onPress={() => setVisible(false)}>
        <View style={styles.dropdown}>
          <FlatList
            // data={dropdownCategories}
            data={categories}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </Pressable>
    </Modal>
  );

  const onItemPress = (item): void => {
    setSelected(item);
    setChoice(item);
    // onSelect(item);
    setVisible(false);
  };

  return (
    <View style={styles.dropperWrap}>
      <Pressable
        ref={DropdownButton.current}
        onPress={toggleDrop}
        style={styles.dropperPresser}>
        <>
          {/* {renderDrop()} */}
          <Text style={styles.dropperWrapText}>{selected}</Text>
          <Icon
            name={visible ? 'caret-up' : 'caret-down'}
            size={18}
            style={{color: '#FFFFFF'}}
          />
          {renderDrop()}
        </>
      </Pressable>
    </View>
  );
};

export default CustomDropDown;
