import { useState, useEffect } from "react";
import { StyleSheet, View, ScrollView, Pressable, Alert } from "react-native";
import { useIsFocused } from "@react-navigation/native";

import NavBar from "../components/NavBar";
import Header from "../components/Header";
import ButtonBar from "../components/ButtonBar";
import { GetCategory } from "../dbRequests/Category";
import { GetList, UpdateListItem } from "../dbRequests/List";
import CategoryDropDown from "../components/CategoryDropDown";
import { DeleteValidation } from "../components/DeleteValidation";
import { DeleteListItem } from "../dbRequests/List";

const List = ({ navigation }) => {
  const [categories, setCategories] = useState([]);
  const [list, setList] = useState([]);
  const [disableHeader, setDisableHeader] = useState(false);
  const [toggleDelete, setToggleDelete] = useState(false);
  const isFocused = useIsFocused();

  useEffect(() => {
    handleGetCategories();
    handleGetList();
  }, [isFocused]);

  const headerTrash = () => {
    if (toggleDelete) {
      setToggleDelete(false);
      setDisableHeader(false);
    } else {
      setToggleDelete(true);
      setDisableHeader(true);
    }
  };

  const handleGetCategories = async () => {
    data = await GetCategory();
    setCategories(data);
  };
  const handleGetList = async () => {
    data = await GetList();
    setList(data);
  };

  const handleDelete = (item, itemText) => {
    const deleteItem = async (id) => {
      if ((await DeleteListItem(id)) != undefined) {
        handleGetList();
      } else {
        Alert.alert(
          `An Error occurred when deleting ${item.item}, please try again later`
        );
      }
    };
    const updateItem = async (id) => {
      let templist = item;
      delete templist.subItem[itemText];
      console.log(templist);

      if ((await UpdateListItem(id, templist)) != undefined) {
        handleGetList();
      } else {
        Alert.alert(
          `An Error occurred when deleting ${item.item}. Please try again later`
        );
      }
    };
    // single Item
    if (item.subItem === null) {
      DeleteValidation(item.item, item._id, deleteItem);
    } else {
      // multi Item
      if (Object.keys(item.subItem).length > 1) {
        DeleteValidation(item.item, item._id, updateItem);
      } else {
        DeleteValidation(item.item, item._id, deleteItem);
      }
    }
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
            ["trash", "buttonFunction", headerTrash],
          ]}
          disabled={toggleDelete}
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
              toggleDelete={toggleDelete}
              handleDelete={handleDelete}
            />
          ))}
        </View>
        {/* ~~~~~~~~~~~~~~~~   BUTTONBAR  ~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
        {toggleDelete ? (
          <></>
        ) : (
          <View style={styles.addButton}>
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
        )}
      </ScrollView>
      {/* ~~~~~~~~~~~~~~~~   NAVBAR  ~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
      {toggleDelete ? (
        <View style={styles.buttonBar}>
          <ButtonBar
            navigation={navigation}
            buttonInfo={[["x_circle", "buttonFunction", headerTrash]]}
          />
        </View>
      ) : (
        <View style={styles.NavBar}>
          <NavBar navigation={navigation} page={"list"} />
        </View>
      )}
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

  addButton: {
    height: 80,
    paddingRight: 40,
    alignItems: "flex-end",
    justifyContent: "center",
  },
  buttonBar: {
    borderColor: "#E7E7E7",
    borderStyle: "solid",
    borderTopWidth: 2,
    height: "10%",
    justifyContent: "center",
    alignItems: "flex-start",
    backgroundColor: "#fff",
  },
  NavBar: {
    height: "10%",
  },
});
