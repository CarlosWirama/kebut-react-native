'use strict';

import React from 'react';
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity,
  View, ActivityIndicator, Linking, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import OptionBar from '../components/OptionBar';

export default function BooksLayout (props) {

  const _keyExtractor = (item, index) => index

  const _renderItem = ({ item, index }) =>
    <Books index={index} item={item} />
    
  return (
    <View style={styles.container}>

      <View style={{margin: 10, marginBottom: 5}}>
       <OptionBar {...props} />

      </View>

      {/* Result List */}
      { props.isLoading ?
        <ActivityIndicator size='large'/>
        :
        <FlatList
          data={props.list}
          renderItem={_renderItem}
          style={styles.container}
          keyExtractor={_keyExtractor}
          extraData={props}
        />
      }
    </View>
  );
}

class Books extends React.PureComponent {
  render() {
    const { item } = this.props;
    return (
      <TouchableOpacity
        key={this.props.index}
        onPress={() => Linking.openURL(item.amazon_product_url)}
        style={styles.listItemContainer}
      >
        <View style={{flex: 1}}>
          <Text style={{fontWeight: 'bold'}}>{item.book_details[0].title}</Text>
          <Text numberOfLines={4}>{item.book_details[0].description}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  listItemContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
  },
});