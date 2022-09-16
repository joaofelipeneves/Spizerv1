import React, { Component } from "react";
import {
  Text,
  FlatList,
  Image,
  StyleSheet,
  Dimensions,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
var { height, width } = Dimensions.get("window");
import Swiper from "react-native-swiper";
import Icon from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-community/async-storage";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataBanner: [],
      dataCategories: [],
      dataFood: [],
      selectCatg: 0,
    };
  }

  componentDidMount() {
    const url = "http://tutofox.com/foodapp/api.json";
    return fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          dataBanner: responseJson.banner,
          dataCategories: responseJson.categories,
          dataFood: responseJson.food,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    return (
      <ScrollView>
        <View style={{ flex: 1, backgroundColor: "#f2f2f2" }}>
          <View style={{ width: width, alignItems: "center" }}>
            <Image
              style={{ height: 60, width: width / 2, margin: 10 }}
              resizeMode="contain"
              source={require("./images/spiserlogo.png")}
            />
            <Swiper
              style={{ height: width / 2 }}
              showsButtons={false}
              autoplay={true}
              autoplayTimeout={2}
            >
              {this.state.dataBanner.map((itembann) => {
                return (
                  <Image
                    style={styles.imageBanner}
                    resizeMode="contain"
                    source={{ uri: itembann }}
                  />
                );
              })}
            </Swiper>

            <View
              style={{
                width: width,
                borderRadius: 20,
                paddingVertical: 20,
                backgroundColor: "White",
              }}
            >
              <View style={{ height: 10 }} />

              <FlatList
                horizontal={true}
                data={this.state.dataCategories}
                renderItem={({ item }) => this._renderItem(item)}
                keyExtractor={(item, index) => index.toString()}
              />
              <FlatList
                data={this.state.dataFood}
                numColumns={2}
                renderItem={({ item }) => this._renderItemFood(item)}
                keyExtractor={(item, index) => index.toString()}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
  _renderItemFood(item) {
    let catg = this.state.selectCatg;
    if (catg == 0 || catg == item.categorie) {
      return (
        <TouchableOpacity style={styles.divFood}>
          <Image
            style={styles.imageFood}
            resizeMode="contain"
            source={{ uri: item.image }}
          />
          <View
            style={{
              height: width / 2 - 20 - 90,
              width: width / 2 - 20 - 10,
              backgroundColor: "transparent",
            }}
          />
          <Text
            style={{ fontWeight: "bold", fontSize: 22, textAlign: "center" }}
          >
            {item.name}
          </Text>
          <Text>descrição comida e detalhes</Text>
          <Text style={{ fontSize: 20, color: "green" }}>${item.price}</Text>

          <TouchableOpacity
            style={{
              width: width / 2 - 40,
              backgroundColor: "#33c37d",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 5,
              padding: 5,
              flexDirection: "row",
            }}
            onPress={() => this.onClickAddCart(item)}
            style={{
              width: width / 2 - 40,
              backgroundColor: "#33c37d",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 5,
              padding: 4,
            }}
          >
            <Text
              style={{
                fontSize: 12,
                color: "white",
                fontWeight: "bold",
              }}
            >
              Adicionar ao carrinho
            </Text>
            <View style={{ width: 10 }} />
            <Icon name="ios-add-circle" size={30} color={"white"} />
          </TouchableOpacity>
        </TouchableOpacity>
      );
    }
  }

  _renderItem(item) {
    return (
      <TouchableOpacity
        onPress={() => this.setState({ selectCatg: item.id })}
        style={[styles.divCategories, { backgroundColor: item.color }]}
      >
        <Image
          style={{ width: 100, height: 80 }}
          resizeMode="contain"
          source={{ uri: item.image }}
        />
        <Text style={{ fontWeight: "bold", fontSize: 22 }}>{item.name}</Text>
      </TouchableOpacity>
    );
  }
  onClickAddCart(data) {
    const itemCart = {
      food: data,
      quantity: 1,
      price: data.price,
    };
    AsyncStorage.getItem("cart")
      .then((datacart) => {
        if (datacart !== null) {
          const cart = JSON.parse(datacart);
          cart.push(itemCart);
          AsyncStorage.setItem("cart", JSON.stringify(cart));
        } else {
          const cart = [];
          cart.push(itemCart);
          AsyncStorage.setItem("cart", JSON.stringify(cart));
        }
        alert("Adicionado ao carrinho :)");
      })

      .catch((error) => {
        alert(error);
      });
  }
}

const styles = StyleSheet.create({
  imageBanner: {
    height: width / 2,
    width: width - 40,
    borderRadius: 10,
    marginHorizontal: 20,
  },
  titleCatg: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  divCategories: {
    backgroundColor: "red",
    margin: 5,
    alignItems: "center",
    borderRadius: 10,
    padding: 10,
  },
  imageFood: {
    width: width / 2 - 20 - 10,
    height: width / 2 - 20 - 30,
    backgroundColor: "transparent",
    position: "absolute",
    top: -45,
  },
  divFood: {
    width: width / 2 - 20,
    backgroundColor: "red",
    padding: 10,
    borderRadius: 10,
    marginTop: 55,
    marginBottom: 5,
    marginLeft: 10,
    alignItems: "center",
    elevation: 8,
    shadowOpacity: 0.3,
    shadowRadius: 50,
    backgroundColor: "white",
  },
});
