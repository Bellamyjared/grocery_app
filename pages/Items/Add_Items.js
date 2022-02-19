//  Need to add search and category filter
// need to add submit function
// **************** VERSION 1.2 *****************
// Add clear function

import { useState, useEffect } from "react";
import { StyleSheet, Text, View, ScrollView, Alert } from "react-native";

import { GetItem, DeleteItem } from "../../dbRequests/Item";
import { GetCategory } from "../../dbRequests/Category";
import Header from "../../components/Header";
import SearchBar from "../../components/SearchBar";
import ButtonBar from "../../components/ButtonBar";
import Single_Item from "./Single_Item";
import { DeleteValidation } from "../../components/DeleteValidation";

const Add_Items = ({ route, navigation }) => {
  const { OriginRoute } = route.params; // grab oridinal page for DB post

  const [Items, setItems] = useState([]);
  const [categories, setCategories] = useState();
  const [subItems, setSubItems] = useState([]);
  const [headerStatus, setHeaderStatus] = useState();
  const [disableHeader, setDisableHeader] = useState();

  useEffect(() => {
    handleGetItems();
    handleGetCategory();
  }, []);

  const handleEdit = (item) => {
    navigation.push("Edit_Item", {
      OriginRoute: OriginRoute,
      categories: categories,
      item: item,
    });
  };

  const deleteItem = async (id) => {
    if ((await DeleteItem(id)) != undefined) {
      handleGetItems();
    } else {
      Alert.alert(
        `There was an issue deleting your item. Please try again later`
      );
    }
  };

  const handleDelete = (id, item) => {
    DeleteValidation(item, id, deleteItem);
  };

  const handleHeaderTrash = () => {
    setHeaderStatus("Delete");
    setDisableHeader(true);
  };
  const handleHeaderEdit = () => {
    setHeaderStatus("Edit");
    setDisableHeader(true);
  };

  const handleCancle = () => {
    setHeaderStatus(null);
    setDisableHeader(false);
  };

  const handleGetItems = async () => {
    data = await GetItem();
    setItems(data);
  };

  const handleGetCategory = async () => {
    data = await GetCategory();
    setCategories(data);
  };

  const handleBack = () => navigation.goBack();
  const handleSubmit = () => {
  const finalSubItems = subItems.filter((item) => item != null);
  
  };
  const handleClear = () => {
    navigation.goBack();
  };

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
    if (subItems.every((value) => value === null)) {
      setDisableHeader(false);
    } else {
      setDisableHeader(true);
    }
  };

  const ChangeButtonBar = () => {
    if (headerStatus === "Edit" || headerStatus === "Delete") {
      return (
        <ButtonBar
          navigation={navigation}
          buttonInfo={[["x_circle", "buttonFunction", handleCancle]]}
        />
      );
    } else if (subItems.every((value) => value === null)) {
      return (
        <ButtonBar
          navigation={navigation}
          buttonInfo={[
            [
              "plus_circle",
              "Create_Item",
              "passProps",
              { categories: categories, OriginRoute: OriginRoute },
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
            ["x_circle", "buttonFunction", handleClear],
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
          disabled={disableHeader}
          title={["Add Items", 50]}
          icons={[
            ["edit", "buttonFunction", handleHeaderEdit],
            ["trash", "buttonFunction", handleHeaderTrash],
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
              headerStatus={headerStatus}
              handleSubItemText={handleSubItemText}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
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
