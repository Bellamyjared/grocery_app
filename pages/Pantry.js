import { StyleSheet, View } from "react-native";

import Icon from "../assets/icons/icon";
import AppLoading from "expo-app-loading";
import { useFonts } from "expo-font";

const Pantry = ({ navigation }) => {
  let [fontsLoaded, error] = useFonts({
    icomoon: require("../assets/fonts/icomoon.ttf"),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return (
    <>
      <View></View>
    </>
  );
};

export default Pantry;

const styles = StyleSheet.create({
  main: {
    flex: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  NavBar: {
    height: "10%",
  },
});
