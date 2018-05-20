'use strict';

import React from 'react';
import Keys from '../constants/Keys';
import { fetchNYTimesAPI } from '../api/fetcher';
import ArticlesLayout from './ArticlesLayout';

export default class ArticlesScreen extends React.Component {

  static navigationOptions = {
    title: 'Articles',
  }

  constructor() {
    super();
    this.state = {
      searchString: '',
      list: [],
      sort: 'newest',
      isLoading: false,
      options: [
        {
          dataValue: 'newest',
          displayText: 'Newest First',
          choosen:true
        },
        {
          dataValue: 'oldest',
          displayText: 'Oldest First',
          choosen:false
        }
      ],
    };
  }

  componentDidMount() {
    this._search();
  }

  onChangeSearch = txt => this.setState({searchString:txt})

  toggleOption = value => {
    const { searchString, options } = this.state;
    const newOptions = options.map(
      op => op.choosen = (op.dataValue == value)
    );
    this.setState({sort: value});
    // this._search(searchString, value);
  }
  
  onSearch = () => this._search(this.state.searchString, this.state.sort)
  

  _search = (q = '', sort = 'newest') => {
    const searchEndpoint = "/svc/search/v2/articlesearch.json";
    const params = {
      q, sort,
      'api-key': Keys.NYTimes,
    };
    this.setState({isLoading: true});
    fetchNYTimesAPI(searchEndpoint, params)
      .then(r => this._updateList(r.response.docs))
      .finally( () => this.setState({isLoading: false}) );
  }

  _updateList = list => this.setState({list})

  render() {
    return (
      <ArticlesLayout
        onChangeSearch={this.onChangeSearch}
        toggleOption={this.toggleOption}
        onSearch={this.onSearch}
        {...this.state}
      />
    );
  }
}

