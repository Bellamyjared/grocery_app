import { useState, useEffect } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { useIsFocused } from "@react-navigation/native";

import NavBar from "../components/NavBar";
import Header from "../components/Header";
import ButtonBar from "../components/ButtonBar";
import { GetCategory } from "../dbRequests/Category";
import { GetList } from "../dbRequests/List";
import CategoryDropDown from "../components/CategoryDropDown";

const List = ({ navigation }) => {
  const [categories, setCategories] = useState([]);
  const [list, setList] = useState([]);
  const isFocused = useIsFocused();
  console.log(list);

  useEffect(() => {
    handleGetCategories();
    handleGetList();
  }, [isFocused]);

  const handleGetCategories = async () => {
    data = await GetCategory();
    setCategories(data);
  };
  const handleGetList = async () => {
    data = await GetList();
    setList(data);
  };

  const sortItems = (categoryId) => {
    const items = list.filter((item) => item.categoryId === categoryId);
    return items;
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
      <ScrollView contentContainerStyle={styles.body}>
        <View style={{ minHeight: "85%" }}>
          {categories.map((c) => (
            <CategoryDropDown
              key={c._id}
              category={c}
              items={sortItems(c._id)}
            />
          ))}
        </View>
        {/* ~~~~~~~~~~~~~~~~   BUTTONBAR  ~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
        <View style={styles.buttonBar}>
          <ButtonBar
            navigation={navigation}
            buttonInfo={[
              [
                "plus_circle",
                "Add_Items",
                "passProps",
                { OriginRoute: "list" },
              ],
            ]}
          />
        </View>
      </ScrollView>
      {/* ~~~~~~~~~~~~~~~~   NAVBAR  ~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
      <View style={styles.NavBar}>
        <NavBar navigation={navigation} page={"list"} />
      </View>
    </>
  );
};

export default List;

const styles = StyleSheet.create({
  body: {
    flexGrow: 1,
    backgroundColor: "#fff",
  },

  header: {
    height: 100,
    justifyContent: "flex-end",
    backgroundColor: "#fff",
  },
  text: { fontFamily: "Poppins-Regular", fontSize: 50 },

  buttonBar: {
    height: 80,
    paddingRight: 40,
    alignItems: "flex-end",
    justifyContent: "center",
  },
  NavBar: {
    height: "10%",
  },
});
