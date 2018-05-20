'use strict';

import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function OptionBar (props) {
  return (
    <View style={styles.optionButtonContainer}>

      { props.options.map( (option,index) =>
        <TouchableOpacity
          style={ option.choosen ? styles.optionButtonChoosen : styles.optionButton}
          onPress={ ()=> props.toggleOption(option.dataValue) }
          key={index}
        >
          <Text>
            {option.displayText}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}


const styles = StyleSheet.create({
  optionButtonContainer: {
    flexDirection: 'row',
    marginVertical: 5,
    alignItems: 'center',
    justifyContent:'center',
  },
  optionButton: {
    flex: 1,
    borderWidth: 2,
    borderColor: 'white',
    padding: 10,
  },
  optionButtonChoosen: {
    flex: 1,
    borderWidth: 2,
    borderColor: 'green',
    borderRadius: 5,
    padding: 10,
  },
  optionButtonText: {
    // fontSize: 14,
    // lineHeight: 20,
    textAlign: 'center',
    fontWeight: 'normal',
  },
});