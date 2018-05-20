import React from 'react';
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity,
  View, ActivityIndicator, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Keys from '../constants/Keys';

export default class ArticlesScreen extends React.Component {

  static navigationOptions = {
    title: 'Articles',
  }

  constructor() {
    super();
    this.state = {
      searchString: '',
      articles: [],
      sort: 'newest',
      isLoading: false,
    };
    this.onChangeSearch.bind(this);
  }

  componentDidMount() {
    // fetch articles
    this.search();
    //const articles = [{key: 'a'}, {key: 'b'}];
  }

  onChangeSearch = txt => this.setState({searchString:txt})

  toggleSort = () => {
    const { sort, searchString } = this.state;
    const newSortRule = (sort === 'newest') ? 'oldest' : 'newest';
    this.setState({sort: newSortRule});
    this.search(searchString, newSortRule);
  }
  
  onSearch = () => this.search(this.state.searchString)

  search = (q = '', sort = 'newest') => {
    let url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
    const params = {
      q, sort,
      'api-key': Keys.NYTimes,
    };

    const querystring = Object.keys(params)
      .map(key => key + '=' + encodeURIComponent(params[key]))
      .join('&');

    console.log(`${url}?${querystring}`);
    this.setState({isLoading: true});
    fetch(`${url}?${querystring}`)
      .then(response => response.json())
      .then(json => this.updateList(json.response.docs))
      .finally( () => this.setState({isLoading: false}) );
  }

  updateList = articles => this.setState({articles})

  _keyExtractor = (item, index) => index

  _renderItem = ({ item, index }) =>
    <ListItem index={index} item={item} />

  render() {
    console.log(this.state.articles)
    return (
      <View style={styles.container}>

        {/* Search Input */}
        <View style={styles.searchInputContainer}>
          <TextInput
            style={styles.searchInput}
            onChangeText={this.onChangeSearch}
            value={this.state.searchString}
            onSubmitEditing={this.onSearch}
          />
          <TouchableOpacity
            style={styles.searchIcon}
            onPress={this.onSearch}
          >
            <Ionicons name="ios-search" size={32} color="gray" />
          </TouchableOpacity>
        </View>

        {/* Sort / Filter Options */}
        <TouchableOpacity
          style={styles.largeButton}
          onPress={this.toggleSort}
        >
          <Text style={styles.largeButtonText}>
            Sort by: {this.state.sort}
          </Text>
        </TouchableOpacity>
        { this.state.isLoading ?
          <ActivityIndicator size='large'/>
          :
          <FlatList
            data={this.state.articles}
            renderItem={this._renderItem}
            style={styles.container}
            contentContainerStyle={styles.listContainer}
            keyExtractor={this._keyExtractor}
            extraData={this.state}
          />
        }
      </View>
    );
  }
}

class ListItem extends React.PureComponent {
  // <Text>{props.snippet}</Text>
  render() {
    const { item } = this.props;
    return (
      <TouchableOpacity
        onPress={() => Linking.openURL(item.web_url)}
        style={styles.listItemContainer}
      >
        <Text>{item.headline.print_headline}</Text>
        <Text>{item.snippet}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  listContainer: {
    // backgroundColor:'lightgray'
  },
  listItemContainer: {
    backgroundColor: 'white',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray'
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
    padding: 5,
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
    backgroundColor: 'lightgreen',
  },
  largeButtonText: {
    fontSize: 17,
    color: 'black',
    // color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  }
});
