import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, Button, View, Text } from 'react-native';


const Stack = createNativeStackNavigator();

import List from './pages/List'
import Pantry from './pages/Pantry'
import Recipe from './pages/Recipe'

export default function App() {
  return (
  <NavigationContainer>
    <Stack.Navigator>
        <Stack.Screen
          name="List"
          component={List}
          options={{ title: 'List', headerBackVisible: false  }}
        />
        
        <Stack.Screen
          name="Pantry"
          component={Pantry}
          options={{ title: 'Pantry', headerBackVisible: false }}
        />
     
        <Stack.Screen
          name="Recipe"
          component={Recipe}
          options={{ title: 'Recipe', headerBackVisible: false }}
        />

      </Stack.Navigator>
    </NavigationContainer>

  );
}

 




