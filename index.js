/**
 * @format
 */
import 'react-native-polyfill-globals/auto';
import 'react-native-fetch-api';
import 'fast-text-encoding';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, { useState } from 'react';
import Main from './src/components/NavScreens/UserScreens/HotelsSearch/Main';
import BottomNav from './src/components/Navigation/BottomNav';
import Profile from './src/app/Profile';
import  Store  from './src/redux/store';
import { Provider } from 'react-redux';
import HostHome from './src/components/NavScreens/HostScreens/HostHome/HostHome';
import MenuPage from './src/components/NavScreens/HostScreens/MenuPage/MenuPage';
import Listings from './src/components/NavScreens/HostScreens/Listings/Listings';
import AllChats from './src/components/NavScreens/HostScreens/ChatPage/AllChats/AllChats';
import UserDetailDemo from './src/components/NavScreens/UserScreens/Profile/UserDetailDemo';
import Map from './src/components/NavScreens/UserScreens/Map/Map';
import Reels from './src/components/NavScreens/UserScreens/Reels/Reels';
import { User } from './src/declarations/User';
import { hotel } from './src/declarations/hotel';
import { backend } from './src/declarations/backend';

const Stack = createNativeStackNavigator();

const linking = {
  prefixes: ['rentspace://'],
};

const RootComponent: React.FC = () => {
  const [actors,setActors]=useState({})
  return (
    <Provider store={Store}>
    <NavigationContainer linking={linking}>
      <Stack.Navigator initialRouteName="Launch">
        <Stack.Screen options={{headerShown:false}} name="Launch" component={Main} initialParams={{actors,setActors}}/>
        <Stack.Screen options={{headerShown:false}} name='profile' component={UserDetailDemo} initialParams={{actors,setActors}}/>
        <Stack.Screen options={{headerShown:false}} name='mapSearch' component={Map}/>
        <Stack.Screen options={{headerShown:false}} name='reels' component={Reels}/>
        <Stack.Screen options={{headerShown:false}} name='hostHome' component={HostHome}/>
        <Stack.Screen options={{headerShown:false}} name='hostMenu' component={MenuPage}/>
        <Stack.Screen options={{headerShown:false}} name='hostListing' component={Listings}/>
        <Stack.Screen options={{headerShown:false}} name='hostChat' component={AllChats}/>
      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
  );
};

AppRegistry.registerComponent(appName, () => RootComponent);
