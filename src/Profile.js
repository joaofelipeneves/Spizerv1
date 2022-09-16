import React, { Component } from "react";
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { createAppContainer, createSwitchNavigator } from "react-navigation";

import LoginScreen from "./Screens/LoginScreen";
import DashBoardScreen from "./Screens/DashboardScreen";
import LoadingScreen from "./Screens/LoadingScreen";

import firebase from "firebase";
import { firebaseConfig } from "../config";
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: "",
    };
  }

  render() {
    return <AppNavigator />;
  }
}

const AppSwitchNavigator = createSwitchNavigator({
  LoadingScreen: LoadingScreen,
  LoginScreen: LoginScreen,
  DashBoardScreen: DashBoardScreen,
});
const AppNavigator = createAppContainer(AppSwitchNavigator);
