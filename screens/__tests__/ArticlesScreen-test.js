import 'react-native';
import React from 'react';
import Screen from '../ArticlesScreen';
import {fetchNYTimesAPI} from '../../api/fetcher';
import renderer from 'react-test-renderer';
import Keys from '../../constants/Keys';

beforeAll(() => {
  //
});

afterAll(() => {
  //
});

const sleep = (ms) => {
	return new Promise( resolve => setTimeout(resolve, ms) );
}

it('should render initial ArticlesScreen', async () => {
  const tree = renderer.create(<Screen />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('should render ArticlesScreen with List after 3s', async () => {
  await sleep(3000);
  const tree = renderer.create(<Screen />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('should return list when fetching articlesearch', async () => {
  const searchEndpoint = "/search/v2/articlesearch.json";
  const params = {
    q: '',
    'api-key': Keys.NYTimes,
  };
  const result = await fetchNYTimesAPI(searchEndpoint, params);
  expect(Array.isArray(result)).toBe(true);
  expect(result.length > 0).toBe(true);
  expect(typeof result[0].web_url).toBe('string');
  expect(typeof result[0].headline).toBe('object');
  expect(Array.isArray(multimedia)).toBe(true);
});