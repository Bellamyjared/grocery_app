import { useState, useEffect } from "react";
import { StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";

import NavBar from "../components/NavBar";
import Header from "../components/Header";
import ButtonBar from "../components/ButtonBar";
import { GetCategory } from "../dbRequests/Category";
import { GetList } from "../dbRequests/List";

const List = ({ navigation }) => {
  const [categories, setCategories] = useState([]);
  const [list, setList] = useState([]);

  useEffect(() => {
    handleGetCategories();
    handleGetList();
  }, []);

  const handleGetCategories = async () => {
    data = await GetCategory();
    setCategories(data);
  };
  const handleGetList = async () => {
    data = await GetList();
    setList(data);
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
        {categories.map((c) => (
          <TouchableWithoutFeedback
            onPress={() => {
              console.log(c.category);
            }}
          >
            <Text>{c.category}</Text>
          </TouchableWithoutFeedback>
        ))}
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
