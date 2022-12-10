import React from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme  } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from './components/Login/Login';
import UserProvider from './contexts/UserContext';

const Stack = createNativeStackNavigator();

import {
  StyleSheet,
} from 'react-native';

const MainTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#444441',
    text: 'rgb(255, 255, 255)',
  },
};

const App = () => {
  return (
    <UserProvider>
      <NavigationContainer theme={MainTheme}>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen
            name="Connexion"
            component={Login}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
