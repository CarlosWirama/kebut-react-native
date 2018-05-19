import React from 'react';
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity,
  View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Articles',
  };

  render() {
    return (
      <View style={styles.container}>

        {/* Search Input */}
        <View style={styles.searchInputContainer}>
          <TextInput
            style={styles.searchInput}
            onChangeText={(text) => this.setState({text})}
            // value={this.state.text}
          />
          <TouchableOpacity style={styles.searchIcon}>
            <Ionicons name="ios-search" size={32} color="gray" />
          </TouchableOpacity>
        </View>

        {/* Sort / Filter Options */}
        <TouchableOpacity style={styles.largeButton}>
          <Text style={styles.largeButtonText}>Sort by: Newest</Text>
        </TouchableOpacity>
        <FlatList
          data={[{key: 'a'}, {key: 'b'}]}
          renderItem={({item}) => <Text>{item.key}</Text>}
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    padding: 20,
    backgroundColor:'gray'
  },
  // h2: {
  //   fontSize: 17,
  //   color: 'rgba(96,100,109, 1)',
  //   lineHeight: 24,
  //   textAlign: 'center',
  // },
  searchInput: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
  },
  searchIcon: {
    position: 'absolute',
    right: 0,
    top: 10,
    padding: 5,
    width: 50,
  },
  searchInputContainer: {
    padding: 10,
    flexDirection: 'row',
  },
  largeButton: {
    padding: 5,
    backgroundColor: 'red',
  },
  largeButtonText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  }
});
