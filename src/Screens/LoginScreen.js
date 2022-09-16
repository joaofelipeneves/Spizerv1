import React, { Component } from "react";
import { View, Text, StyleSheet, Button } from "react-native";

class LoginScreen extends Component {
  signInWithGoogleAsync = async () => {
    try {
      const result = await Expo.Google.logInAsync({
        // androidClientId: YOUR_CLIENT_ID_HERE,
        behavior: "web",
        iosClientId:
          "163660764910-8jhe291f0j1q4ivs5oecq9o9j19237at.apps.googleusercontent.com",
        scopes: ["profile", "email"],
      });

      if (result.type == "success") {
        return result.accessToken;
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      return { error: true };
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Button
          title="Faça o login com sua conta do Google :)"
          onPress={() => this.signInWithGoogleAsync()}
        />
      </View>
    );
  }
}
export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
