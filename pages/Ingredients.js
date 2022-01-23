import { StyleSheet, Text, View } from "react-native";
import AppLoading from "expo-app-loading";

import { useFonts } from "expo-font";

import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import NavBar from "../components/NavBar";
import ButtonBar from "../components/ButtonBar";

const Ingredients = ({ navigation }) => {
  let [fontsLoaded, error] = useFonts({
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Meddon-Regular": require("../assets/fonts/Meddon-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return (
    <>
      {/* ~~~~~~~ Header ~~~~~~~~~~ */}

      <View style={styles.header}>
        <Header
          navigation={navigation}
          title={["Ingredients", 30]}
          icons={[["edit", "edit"]]}
        />
      </View>
      {/* ~~~~~~~ Body ~~~~~~~~~~ */}

      <View style={styles.body}>
        <View style={styles.searchBar}>
          <SearchBar />
        </View>
        <View style={styles.categorySelection}></View>
      </View>

      {/* ~~~~~~~ Footer ~~~~~~~~~~ */}

      <View style={styles.buttonBar}>
        <ButtonBar
          navigation={navigation}
          buttonInfo={[["add-circle-outline", "Ingredients"]]}
        />
      </View>
      <View style={styles.NavBar}>
        <NavBar navigation={navigation} page={"list"} />
      </View>
    </>
  );
};

export default Ingredients;

const styles = StyleSheet.create({
  header: {
    justifyContent: "flex-end",
    backgroundColor: "#fff",
    height: "15%",
  },

  body: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
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
