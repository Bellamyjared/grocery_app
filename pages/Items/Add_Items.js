import { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useIsFocused } from "@react-navigation/native";

import AppLoading from "expo-app-loading";

import { useFonts } from "expo-font";

import { GetItem } from "../../dbRequests/Item";
import Header from "../../components/Header";
import SearchBar from "../../components/SearchBar";
import NavBar from "../../components/NavBar";
import ButtonBar from "../../components/ButtonBar";

const Add_Items = ({ navigation }) => {
  let [fontsLoaded, error] = useFonts({
    "Poppins-Regular": require("../../assets/fonts/Poppins-Regular.ttf"),
    "DancingScript-Regular": require("../../assets/fonts/DancingScript-Regular.ttf"),
  });

  const isFocused = useIsFocused();

  const [Items, setItems] = useState([]);

  useEffect(() => {
    handleGetItems();
  }, [isFocused]);

  const handleGetItems = async () => {
    data = await GetItem();
    setItems(data);
  };

  const handleBack = () => navigation.goBack();

  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return (
    <>
      {/* ~~~~~~~ Header ~~~~~~~~~~ */}

      <View style={styles.header}>
        <Header
          navigation={navigation}
          title={["Add Items", 50]}
          icons={[["edit", "edit"]]}
        />
      </View>
      {/* ~~~~~~~ Body ~~~~~~~~~~ */}

      <View style={styles.body}>
        <View style={styles.searchBar}>
          <SearchBar />
          <View>
            {Items.map((item) => (
              <Text>{item.item}</Text>
            ))}
          </View>
        </View>
        <View style={styles.categorySelection}></View>
      </View>

      {/* ~~~~~~~ Footer ~~~~~~~~~~ */}

      <View style={styles.buttonBar}>
        <ButtonBar
          navigation={navigation}
          buttonInfo={[
            ["add-circle-outline", "Create_Item"],
            ["exit-to-app", "buttonFunction", handleBack],
          ]}
        />
      </View>
      <View style={styles.NavBar}>
        <NavBar navigation={navigation} page={"list"} />
      </View>
    </>
  );
};

export default Add_Items;

const styles = StyleSheet.create({
  header: {
    justifyContent: "flex-end",
    backgroundColor: "#fff",
    height: 115,
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
