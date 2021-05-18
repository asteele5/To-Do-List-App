import React, { Component } from "react";
import {
  AppRegistry,
  Text,
  View,
  StyleSheet,
  TouchableHighlight,
  TextInput,
  Image,
  Dimensions,
  ScrollView,
  SafeAreaView,
} from "react-native";
import Constants from "expo-constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import ToDoListPage from "./Pages/ToDoListPage.js";
import EditListItemPage from "./Pages/EditListItemPage.js";
import EditFolderPage from "./Pages/EditFolderPage.js";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="ToDoListPage"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="ToDoListPage" component={ToDoListPage} />
        <Stack.Screen name="EditListItemPage" component={EditListItemPage} />
        <Stack.Screen name="EditFolderPage" component={EditFolderPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
