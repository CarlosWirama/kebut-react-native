'use strict';

import React from 'react';
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity,
  View, ActivityIndicator, Linking, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import OptionBar from '../components/OptionBar';

export default function ArticlesLayout (props) {

  const _keyExtractor = (item, index) => index

  const _renderItem = ({ item, index }) =>
    <Article index={index} item={item} />
    
  return (
    <View style={styles.container}>

      <View style={{margin: 10, marginBottom: 5}}>
        {/* Search Input */}
        <TextInput
          style={styles.searchInput}
          onChangeText={props.onChangeSearch}
          value={props.searchString}
          onSubmitEditing={props.onSearch}
          placeholder='Enter search keywords'
        />
        <OptionBar {...props} />

        <TouchableOpacity
          style={styles.largeButton}
          onPress={props.onSearch}
        >
          <Text style={props.isLoading ? styles.largeButtonTextDisabled : styles.largeButtonText}>
            Search&nbsp;
          </Text>
          <Ionicons name="ios-search" size={25} color={props.isLoading ? 'gray' : 'black'} />
        </TouchableOpacity>
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

class Article extends React.PureComponent {
  render() {
    const { item } = this.props;
    const blankImageUrl = 'http://www.wellesleysocietyofartists.org/wp-content/uploads/2015/11/image-not-found.jpg';
    const multimediaObj = item.multimedia.find(o => o.crop_name === 'thumbStandard');
    const { url } = multimediaObj || {};
    const uri = url ? `http://www.nytimes.com/${url}` : blankImageUrl;
    return (
      <TouchableOpacity
        key={this.props.index}
        onPress={() => Linking.openURL(item.web_url)}
        style={styles.listItemContainer}
      >
        <Image style={styles.thumb} source={{ uri }} />
        <View style={{flex: 1}}>
          <Text style={{fontWeight: 'bold'}}>{item.headline.print_headline}</Text>
          <Text numberOfLines={4}>{item.snippet}</Text>
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
  thumb: {
    width: 75,
    height: 75,
    marginRight: 10,
  },
  searchInput: {
    width: '100%',
    height: 40,
    padding: 5,
    borderColor: 'gray',
    borderWidth: 1,
  },
  largeButton: {
    padding: 5,
    backgroundColor: 'lightgreen',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'center'
  },
  largeButtonText: {
    fontSize: 17,
    color: 'black',
    lineHeight: 24,
    fontWeight: 'bold',
  },
  largeButtonTextDisabled: {
    fontSize: 17,
    color: 'gray',
    lineHeight: 24,
    fontWeight: 'bold',
  },
});