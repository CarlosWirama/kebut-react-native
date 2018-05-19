import React from 'react';
import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import ArticlesScreen from '../screens/ArticlesScreen';
import BooksScreen from '../screens/BooksScreen';

const ArticlesStack = createStackNavigator({
  Articles: ArticlesScreen,
});

ArticlesStack.navigationOptions = {
  tabBarLabel: 'Articles',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-paper${focused ? '' : '-outline'}`
          : 'md-paper'
      }
    />
  ),
};

const BooksStack = createStackNavigator({
  Links: BooksScreen,
});

BooksStack.navigationOptions = {
  tabBarLabel: 'Books',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={ Platform.OS === 'ios'
        ? `ios-book${focused ? '' : '-outline'}`
        : 'md-book'
      }
    />
  ),
};

export default createBottomTabNavigator({
  ArticlesStack,
  BooksStack,
});
