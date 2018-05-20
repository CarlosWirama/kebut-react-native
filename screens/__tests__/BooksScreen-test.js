import 'react-native';
import React from 'react';
import Screen from '../BooksScreen';
import {fetchNYTimesAPI} from '../../api/fetcher';
import renderer from 'react-test-renderer';
import Keys from '../../constants/Keys';
import mockedWindowFetch from '../__mocked-data__/windowFetch_Book';

beforeEach(() => {
  window.fetch = jest.fn().mockImplementation(
    () => Promise.resolve(mockedWindowFetch)
  );
});

const sleep = (ms) => {
	return new Promise( resolve => setTimeout(resolve, ms) );
}

it('should render initial BooksScreen', async () => {
  const tree = renderer.create(<Screen />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('should render BooksScreen with List after 3s', async () => {
  await sleep(3000);
  const tree = renderer.create(<Screen />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('should return list when fetching book', async () => {
  const searchEndpoint = "/svc/books/v3/lists.json";
  const params = {
    list: 'e-book-fiction',
    'api-key': Keys.NYTimes,
  };
  let result = await fetchNYTimesAPI(searchEndpoint, params);
  result = result.results;
  expect(Array.isArray(result)).toBe(true);
  expect(result.length > 0).toBe(true);
  expect(typeof result[0].book_details[0].title).toBe('string');
  expect(typeof result[0].book_details[0].description).toBe('string');
  expect(typeof result[0].book_details[0].author).toBe('string');
});