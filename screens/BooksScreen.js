'use strict';

import React from 'react';
import Keys from '../constants/Keys';
import { fetchNYTimesAPI } from '../api/fetcher';
import BooksLayout from './BooksLayout';

export default class BooksScreen extends React.Component {

  static navigationOptions = {
    title: 'Books',
  }

  constructor() {
    super();
    this.state = {
      list: [],
      option: 'e-book-fiction',
      isLoading: false,
      options: [
        {
          dataValue: 'e-book-fiction',
          displayText: 'E-Book Fiction',
          choosen:true
        },
        {
          dataValue: 'hardcover-fiction',
          displayText: 'Hardcover Fiction',
          choosen:false
        }
      ],
    };
  }

  componentDidMount() {
    this._search();
  }

  toggleOption = value => {
    const { searchString, options } = this.state;
    const newOptions = options.map(
      op => op.choosen = (op.dataValue == value)
    );
    this.setState({option: value});
    this._search(value);
  }

  _search = (list = 'e-book-fiction') => {
    const searchEndpoint = "/svc/books/v3/lists.json";
    const params = {
      list,
      'api-key': Keys.NYTimes,
    };
    this.setState({isLoading: true});
    fetchNYTimesAPI(searchEndpoint, params)
      .then(r => this._updateList(r.results))
      .finally( () => this.setState({isLoading: false}) );
  }

  _updateList = list => this.setState({list})

  render() {
    return (
      <BooksLayout
        toggleOption={this.toggleOption}
        {...this.state}
      />
    );
  }
}

