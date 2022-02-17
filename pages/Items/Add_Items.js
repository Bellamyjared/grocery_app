import { useState, useEffect } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import Icon from "../../assets/icons/icon";

import AppLoading from "expo-app-loading";

import { useFonts } from "expo-font";

import { GetItem } from "../../dbRequests/Item";
import { GetCategory } from "../../dbRequests/Category";
import Header from "../../components/Header";
import SearchBar from "../../components/SearchBar";
import NavBar from "../../components/NavBar";
import ButtonBar from "../../components/ButtonBar";

const Add_Items = ({ route, navigation }) => {
  let [fontsLoaded, error] = useFonts({
    "Poppins-Regular": require("../../assets/fonts/Poppins-Regular.ttf"),
    "DancingScript-Regular": require("../../assets/fonts/DancingScript-Regular.ttf"),
  });

  const { OriginRoute } = route.params; // grab props from route

  const [Items, setItems] = useState([]);
  const [categories, setCategories] = useState();
  const isFocused = useIsFocused();

  useEffect(() => {
    handleGetItems();
    handleGetCategory();
  }, [isFocused]);

  const handleGetItems = async () => {
    data = await GetItem();
    setItems(data);
  };

  const handleGetCategory = async () => {
    data = await GetCategory();
    setCategories(data);
  };

  const handleBack = () => navigation.goBack();

  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return (
    <>
      {/* ~~~~~~~~~~~~~~~~   HEADER  ~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
      <View style={styles.header}>
        <Header
          navigation={navigation}
          title={["Add Items", 50]}
          icons={[
            ["edit", "edit"],
            ["trash", "trash"],
          ]}
        />
      </View>
      {/* ~~~~~~~~~~~~~~~~   BODY  ~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
      <ScrollView contentContainerStyle={styles.body}>
        <View style={styles.searchBar}>
          <SearchBar />
        </View>
        <View style={styles.categoryFilter}>
          <Text>Category placeholder</Text>
        </View>
        <View>
          {Items.map((item) => (
            <View key={item._id} style={styles.ItemView}>
              <Text style={{ fontSize: 20 }}>{item.item}</Text>
              <Icon
                name="plus"
                size={20}
                onPress={() => console.log(item.item)}
              />
            </View>
          ))}
        </View>
        <View style={styles.categorySelection}></View>
      </ScrollView>

      {/* ~~~~~~~~~~~~~~~~   BUTTONBAR  ~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
      <View style={styles.buttonBar}>
        <ButtonBar
          navigation={navigation}
          buttonInfo={[
            [
              "plus_circle",
              "Create_Item",
              "passProps",
              { categories: categories },
            ],

            ["back_circle", "buttonFunction", handleBack],
          ]}
        />
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
    flexGrow: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  searchBar: {
    paddingTop: 20,
  },
  categoryFilter: {
    paddingTop: 20,
  },

  ItemView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    marginTop: 10,
    marginBottom: 10,
    fontSize: 24,
    height: 45,
    width: 300,
    borderWidth: 1,
    paddingRight: 25,
    paddingLeft: 25,
    borderRadius: 15,
  },

  buttonBar: {
    height: 80,
    paddingTop: 10,
    paddingRight: 40,
    alignItems: "flex-end",
    backgroundColor: "#fff",
    borderColor: "#E7E7E7",
    borderStyle: "solid",
    borderTopWidth: 2,
    backgroundColor: "#fff",
  },
  NavBar: {
    height: "10%",
  },
});
