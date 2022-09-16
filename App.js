import React, { Component } from "react";
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";

var { width } = Dimensions.get("window");

//import icons

import Icon from "react-native-vector-icons/Ionicons";

//import Component
import Food from "./src/Food";
import Cart from "./src/Cart";
import Adress from "./src/Adress";
import Profile from "./src/Profile";

console.disableYellowBox = true;

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      module: 1,
    };
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        {this.state.module == 1 ? (
          <Food />
        ) : this.state.module == 2 ? (
          <Cart />
        ) : this.state.module == 3 ? (
          <Adress />
        ) : (
          <Profile />
        )}

        <View
          styles={{
            width: width,
            backgroundColor: "blue",
            flexDirection: "row",
          }}
        >
          <View style={styles.bottomTab}>
            <TouchableOpacity onPress={() => this.setState({ module: 1 })}>
              <View style={styles.itemTab}>
                <Icon
                  name="md-restaurant"
                  size={30}
                  color={this.state.module == 1 ? "#900" : "grey"}
                />
                <Text>Cardápio </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => this.setState({ module: 2 })}>
              <View style={styles.itemTab}>
                <Icon
                  name="md-basket"
                  size={30}
                  color={this.state.module == 2 ? "#900" : "grey"}
                />
                <Text> Meus Pedidos </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => this.setState({ module: 3 })}>
              <View style={styles.itemTab}>
                <Icon
                  name="md-map"
                  size={30}
                  color={this.state.module == 3 ? "#900" : "grey"}
                />
                <Text>Parceiros</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => this.setState({ module: 4 })}>
              <View style={styles.itemTab}>
                <Icon
                  name="ios-contact"
                  size={30}
                  color={this.state.module == 4 ? "#900" : "grey"}
                />
                <Text>Login </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  bottomTab: {
    width: width,
    backgroundColor: "gray",
    height: 60,
    flexDirection: "row",
    elevation: 8,
    shadowOpacity: 0.3,
    shadowRadius: 50,
  },
  itemTab: {
    width: width / 4,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    height: 60,
  },
});
