//  Need to add search and category filter
// need to add submit function
// **************** VERSION 1.2 *****************
// Add cancle function

import { useState, useEffect } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";

import { GetItem } from "../../dbRequests/Item";
import { GetCategory } from "../../dbRequests/Category";
import Header from "../../components/Header";
import SearchBar from "../../components/SearchBar";
import ButtonBar from "../../components/ButtonBar";
import Single_Item from "./Single_Item";

const Add_Items = ({ route, navigation }) => {
  const { OriginRoute } = route.params; // grab oridinal page for DB post

  const [Items, setItems] = useState([]);
  const [categories, setCategories] = useState();
  const [subItems, setSubItems] = useState([]);

  useEffect(() => {
    handleGetItems();
    handleGetCategory();
  }, []);

  const handleGetItems = async () => {
    data = await GetItem();
    setItems(data);
  };

  const handleGetCategory = async () => {
    data = await GetCategory();
    setCategories(data);
  };

  const handleBack = () => navigation.goBack();
  const handleSubmit = () => console.log("Submit");
  // ~~~~~~~~~~~~~~~~~~~~

  const handleSubItemText = (item, count, index) => {
    if (count >= 0) {
      let ItemList = subItems;
      if (count > 0) {
        ItemList[index] = { count, item };
      } else {
        ItemList[index] = null;
      }
      setSubItems([...ItemList]);
    }
    console.log(subItems);
  };

  const ChangeButtonBar = () => {
    if (subItems.every((value) => value === null)) {
      return (
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
      );
    } else {
      return (
        <ButtonBar
          navigation={navigation}
          buttonInfo={[
            ["check_mark_circle", "buttonFunction", handleSubmit],
            ["x_circle", "buttonFunction", handleBack],
          ]}
        />
      );
    }
  };

  // ~~~~~~~~~~~~~~~~~~~~

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
          {Items.map((item, index) => (
            <Single_Item
              key={item._id}
              index={index}
              item={item}
              handleSubItemText={handleSubItemText}
            />
          ))}
        </View>
        <View style={styles.categorySelection}></View>
      </ScrollView>

      {/* ~~~~~~~~~~~~~~~~   BUTTONBAR  ~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
      <View style={styles.buttonBar}>{ChangeButtonBar()}</View>
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
