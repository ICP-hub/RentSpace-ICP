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
import React from 'react';
import Main from './src/app/Main';
import BottomNav from './src/components/Navigation/BottomNav';
import Profile from './src/app/Profile';
import  Store  from './src/redux/store';
import { Provider } from 'react-redux';
import HostHome from './src/components/TempHost/HostHome/HostHome';
import MenuPage from './src/components/TempHost/MenuPage/MenuPage';
import Listings from './src/components/TempHost/Listings/Listings';
import AllChats from './src/components/TempHost/ChatPage/AllChats/AllChats';

const Stack = createNativeStackNavigator();

const linking = {
  prefixes: ['rentspace://'],
};

const RootComponent: React.FC = () => {
  return (
    <Provider store={Store}>
    <NavigationContainer linking={linking}>
      <Stack.Navigator initialRouteName="Launch">
        <Stack.Screen options={{headerShown:false}} name="Launch" component={Main} />
        <Stack.Screen options={{headerShown:false}} name='profile' component={Profile}/>
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
