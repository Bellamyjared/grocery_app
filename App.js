import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
const Stack = createNativeStackNavigator();

import List from "./pages/List";
import Pantry from "./pages/Pantry";
import Recipe from "./pages/Recipe";
import Ingredients from "./pages/Ingredients";
import Category from "./pages/Category";

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="List"
          component={List}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Ingredients"
          component={Ingredients}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Category"
          component={Category}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Pantry"
          component={Pantry}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Recipe"
          component={Recipe}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
