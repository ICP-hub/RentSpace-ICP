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

const Stack = createNativeStackNavigator();

const linking = {
  prefixes: ['rentspace://'],
};

const RootComponent: React.FC = () => {
  return (
    <NavigationContainer linking={linking}>
      <Stack.Navigator initialRouteName="Launch">
        <Stack.Screen name="Launch" component={App} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

AppRegistry.registerComponent(appName, () => RootComponent);
