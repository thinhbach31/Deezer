/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createBottomTabNavigator, createAppContainer, createStackNavigator } from 'react-navigation';
import Search from './Search';
import Radio from './Radio';
import Home from './HomeScreen';
import ListDetail from './detail/ListDetail';
import TrackDetail from './detail/TrackDetail';
import ArtistDetail from './detail/ArtistDetail';
import AlbumDetail from './detail/AlbumDetail';
import ArtistTrack from './detail/artist/ArtistTrack'
import InjectMain from './InjectMain'

const TabNavigator = createBottomTabNavigator({
  Home: { screen: Home },
  Search: { screen: Search },
  Radio: { screen: Radio },
},
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) =>
        getTabBarIcon(navigation, focused, tintColor),
    }),
    tabBarOptions: {
      activeTintColor: 'white',
      inactiveTintColor: 'grey',
      inactiveBackgroundColor: 'black',
      activeBackgroundColor: 'black',
    }
  }
);

const getTabBarIcon = (navigation, focused, tintColor) => {
  const { routeName } = navigation.state;
  let IconComponent = Ionicons;
  let iconName;
  if (routeName === 'Home') {
    iconName = `ios-home`;
  } else if (routeName === 'Search') {
    iconName = `ios-search`;
  } else if (routeName === 'Radio') {
    iconName = `ios-radio`;
  }

  return <IconComponent name={iconName} size={25} color={tintColor} />;
};

const MainNavigator = createStackNavigator(
  {
    Root: { screen: createAppContainer(TabNavigator) },
    HomeScreen: {
      screen: Home,
      navigationOptions: {
        tabBarLabel: 'Home Screen',
        header: null
      }
    },
    ListDetail: { screen: ListDetail },
    TrackDetail: { screen: TrackDetail },
    ArtistDetail: { screen: ArtistDetail },
    AlbumDetail: { screen: AlbumDetail },
    ArtistTrack: {screen: ArtistTrack}
  },
  {
    initialRouteName: 'Root',
    headerMode: "none",
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: 'blue',
        color: 'white'
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
        color: 'white',
      },
    },
  });

const App = createAppContainer(MainNavigator);

export default createAppContainer(MainNavigator);