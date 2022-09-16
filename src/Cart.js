import React, { Component } from "react";
import {
  Text,
  View,
  ScrollView,
  TextInput,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";

var { width } = Dimensions.get("window");

import Icon from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-community/async-storage";

export default class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataCart: [],
    };
  }

  componentDidMount() {
    AsyncStorage.getItem("cart")
      .then((cart) => {
        if (cart !== null) {
          const cartfood = JSON.parse(cart);
          this.setState({ dataCart: cartfood });
        }
      })
      .catch((err) => {
        alert(err);
      });
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <View style={{ height: 20 }} />
        <Text style={{ fontSize: 20, color: "red" }}>Meus pedidos :</Text>
        <View style={{ height: 10 }} />

        <View style={{ backgroundColor: "transparent", flex: 1 }}>
          <ScrollView>
            {this.state.dataCart.map((item, i) => {
              return (
                <View
                  style={{
                    width: width - 60,
                    margin: 10,
                    backgroundColor: "transparent",
                    flexDirection: "row",
                    borderBottomWidth: 2,
                    borderColor: "#cccccc",
                    paddingBottom: 10,
                  }}
                >
                  <Image
                    resizeMode={"contain"}
                    style={{ width: width / 3, height: width / 3 }}
                    source={{
                      uri: item.food.image,
                    }}
                  />
                  <View
                    style={{
                      flex: 1,
                      backgroundColor: "transparent",
                      padding: 10,
                      justifyContent: "space-between",
                    }}
                  >
                    <View>
                      <Text style={{ fontWeight: "bold", fontSize: 20 }}>
                        {item.food.name}
                      </Text>
                      <Text>Descrição do prato :) </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <Text
                        style={{
                          fontWeight: "bold",
                          color: "#9fd236",
                          fontSize: 20,
                        }}
                      >
                        ${item.price * item.quantity}
                      </Text>
                      <View
                        style={{ flexDirection: "row", alignItems: "center" }}
                      >
                        <TouchableOpacity
                          onPress={() => this.onChangeQuat(i, false)}
                        >
                          <Icon
                            name="ios-remove-circle"
                            size={30}
                            color={"#9fd236"}
                          />
                        </TouchableOpacity>
                        <Text
                          style={{ paddingHorizontal: 8, fontWeight: "bold" }}
                        >
                          {item.quantity}
                        </Text>
                        <TouchableOpacity
                          onPress={() => this.onChangeQuat(i, true)}
                        >
                          <Icon
                            name="ios-add-circle"
                            size={30}
                            color={"#9fd236"}
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </View>
              );
            })}
          </ScrollView>
        </View>

        <View style={{ height: 10 }} />

        <Text style={{ fontSize: 28, color: "#33c37d" }}>
          $ {this.onLoadTotal()}
        </Text>

        <View style={{ height: 20 }} />

        <TouchableOpacity
          style={{
            backgroundColor: "#33c37d",
            width: width - 40,
            alignItems: "center",
            padding: 10,
            borderRadius: 5,
          }}
        >
          <Text
            style={{
              fontSize: 24,
              fontWeight: "bold",
              color: "white",
            }}
          >
            finalizar pedido
          </Text>
        </TouchableOpacity>
        <View style={{ height: 20 }} />
      </View>
    );
  }

  onLoadTotal() {
    var total = 0;
    const cart = this.state.dataCart;

    for (var i = 0; i < cart.length; i++) {
      total = total + cart[i].price * cart[i].quantity;
    }
    return total;
  }

  onChangeQuat(i, type) {
    const cart = this.state.dataCart;
    let cant = cart[i].quantity;
    if (type) {
      cant = cant + 1;
      cart[i].quantity = cant;
      this.setState({ dataCart: cart });
    } else if (type == false && cant >= 2) {
      cant = cant - 1;
      cart[i].quantity = cant;
      this.setState({ dataCart: cart });
    } else if (type == false && cant == 1) {
      cart.splice(i, 1);
      this.setState({ dataCart: cart });
    }
  }
}
