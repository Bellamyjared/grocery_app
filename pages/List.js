import { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import Icon from "../assets/icons/icon";

import NavBar from "../components/NavBar";
import Header from "../components/Header";
import ButtonBar from "../components/ButtonBar";
import { GetCategory } from "../dbRequests/Category";
import DropDown from "../components/DropDown.js";

const List = ({ navigation }) => {
  const [categories, setCategories] = useState();

  useEffect(() => {
    handleGetItems();
  }, []);

  const handleGetItems = async () => {
    data = await GetCategory();
    setCategories(data);
  };

  return (
    <>
      {/* ~~~~~~~~~~~~~~~~   HEADER  ~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
      <View style={styles.header}>
        <Header
          navigation={navigation}
          title={["List", 50]}
          icons={[
            ["edit", "Category"],
            ["trash", ""],
          ]}
        />
      </View>
      {/* ~~~~~~~~~~~~~~~~   BODY  ~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
      <View style={styles.container}>
        <Text style={styles.text}>test 12</Text>
        <Icon name="drop_down" size={50} />
      </View>
      {/* ~~~~~~~~~~~~~~~~   BUTTONBAR  ~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
      <View style={styles.buttonBar}>
        <ButtonBar
          navigation={navigation}
          buttonInfo={[
            ["plus_circle", "Add_Items", "passProps", { OriginRoute: "list" }],
          ]}
        />
      </View>
      {/* ~~~~~~~~~~~~~~~~   NAVBAR  ~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
      <View style={styles.NavBar}>
        <NavBar navigation={navigation} page={"list"} />
      </View>
      <DropDown list={categories} />
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
    height: 100,
    justifyContent: "flex-end",
    backgroundColor: "#fff",
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
