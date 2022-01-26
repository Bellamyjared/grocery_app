import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
const Stack = createNativeStackNavigator();

import List from "./pages/List";
import Pantry from "./pages/Pantry";
import Recipe from "./pages/Recipe";
import Add_Items from "./pages/Add_Items";
import Create_Item from "./pages/Create_Item";
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
          name="Add_Items"
          component={Add_Items}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Create_Item"
          component={Create_Item}
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
