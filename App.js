import React from "react";
import { StyleSheet, View } from "react-native";
import { useFonts } from "expo-font";
import RegistrationScreen from "./Screens/components/RegistrationScreen";
import LoginScreen from "./Screens/components/LoginScreen";

export default function App() {
  const [fontsLoaded] = useFonts({
    robotoBold: require("./assets/fonts/Roboto-Bold.ttf"),
    robotoLight: require("./assets/fonts/Roboto-Light.ttf"),
    robotoRegular: require("./assets/fonts/Roboto-Regular.ttf"),
    robotoMedium: require("./assets/fonts/Roboto-Medium.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }
  return (
    <View style={styles.container}>
      <LoginScreen />
      {/* <RegistrationScreen /> */}
      {/* <LoginScreen /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
