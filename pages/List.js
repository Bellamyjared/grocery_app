import { StyleSheet, Text, View } from "react-native";
import AppLoading from "expo-app-loading";

import { useFonts } from "expo-font";

import NavBar from "../components/NavBar";
import Header from "../components/Header";
import ButtonBar from "../components/ButtonBar";

const List = ({ navigation }) => {
  let [fontsLoaded, error] = useFonts({
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "DancingScript-Regular": require("../assets/fonts/DancingScript-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return (
    <>
      <View style={styles.header}>
        <Header
          navigation={navigation}
          title={["List", 50]}
          icons={[
            ["edit", "edit"],
            ["trash", "trash"],
          ]}
        />
      </View>
      <View style={styles.container}>
        <Text style={styles.text}>test</Text>
      </View>

      <View style={styles.buttonBar}>
        <ButtonBar
          navigation={navigation}
          buttonInfo={[["add-circle-outline", "Add_Items"]]}
        />
      </View>
      <View style={styles.NavBar}>
        <NavBar navigation={navigation} page={"list"} />
      </View>
    </>
  );
};

export default List;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  header: {
    justifyContent: "flex-end",
    backgroundColor: "#fff",
    height: "15%",
  },
  text: { fontFamily: "Poppins-Regular", fontSize: 50 },

  buttonBar: {
    height: "12%",
    paddingRight: "10%",
    paddingTop: "5%",
    alignItems: "flex-end",
    backgroundColor: "#fff",
  },
  NavBar: {
    height: "10%",
  },
});
