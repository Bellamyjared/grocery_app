// go through and change any % based heights and widths because that was a dumb idea

import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
const Stack = createNativeStackNavigator();

import AppLoading from "expo-app-loading";
import { useFonts } from "expo-font";

import RedirctLoggedInUsers from "./pages/RedirctLoggedInUsers";
import Login from "./pages/Login";
import List from "./pages/List";
import Pantry from "./pages/Pantry";
import Recipe from "./pages/Recipe/Recipe";
import Add_Recipe from "./pages/Recipe/Add_Recipe.js";
import Edit_Recipe from "./pages/Recipe/Edit_Recipe.js";
import Add_Items from "./pages/Items/Add_Items";
import Create_Item from "./pages/Items/Create_Item";
import Edit_Item from "./pages/Items/Edit_Item";
import Category from "./pages/Categories/Category";
import Create_Category from "./pages/Categories/Create_Category";
import Edit_Category from "./pages/Categories/Edit_Category";
import MoveAbleList from "./pages/MoveAbleList/MoveAbleList";

export default function App() {
  let [fontsLoaded, error] = useFonts({
    icomoon: require("./assets/fonts/icomoon.ttf"),
    "Poppins-Regular": require("./assets/fonts/Poppins-Regular.ttf"),
    "DancingScript-Regular": require("./assets/fonts/DancingScript-Regular.ttf"),
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="RedirctLoggedInUsers"
          component={RedirctLoggedInUsers}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
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
          name="Edit_Item"
          component={Edit_Item}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Category"
          component={Category}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Create_Category"
          component={Create_Category}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Edit_Category"
          component={Edit_Category}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MoveAbleList"
          component={MoveAbleList}
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
        <Stack.Screen
          name="Add_Recipe"
          component={Add_Recipe}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Edit_Recipe"
          component={Edit_Recipe}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
