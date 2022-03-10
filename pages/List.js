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
import { PostPantry } from "../dbRequests/Pantry";

const List = ({ navigation }) => {
  const [categories, setCategories] = useState([]);
  const [list, setList] = useState([]);
  const [disableHeader, setDisableHeader] = useState(false);
  const [toggleDelete, setToggleDelete] = useState(false);
  const [selectedItems, setSelectedItems] = useState({});
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

  const handleSubmit = async () => {
    let arrayOfSelectedItems = [];
    Object.keys(selectedItems).forEach((i) => {
      let quantity;
      let subItems;
      if (typeof selectedItems[i].subItem === "undefined") {
        // single Item
        quantity = selectedItems[i].quantity;
        subItems = null;
      } else {
        // Multiple Items
        quantity = null;
        subItems = selectedItems[i].subItem;
      }
      const newItemForList = {
        item: selectedItems[i].item,
        quantity: quantity,
        categoryId: selectedItems[i].categoryId,
        subItems: subItems,
      };
      arrayOfSelectedItems = [...arrayOfSelectedItems, newItemForList];
    });
    // post to pantry and then delete from list
    if ((await PostPantry(arrayOfSelectedItems)) === undefined) {
      Alert.alert(
        "ERROR",
        "An error occurred while creating your List. Please try again later"
      );
    } else {
      Object.keys(selectedItems).forEach(async (i) => {
        // need to add update if the multi item is not fully selected
        if ((await DeleteListItem(i)) != undefined) {
          handleGetList();
        } else {
          Alert.alert(
            `An Error occurred when deleting ${selectedItems[i].item}, please try again later`
          );
        }
      });
      setDisableHeader(false);
      setSelectedItems({});
    }
  };

  const handleCancle = () => {
    console.log("Cancle");
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

  const sortItemsIntoCategory = (categoryId) => {
    const items = list.filter((i) => i.categoryId === categoryId);
    return items;
  };

  const DisableOnSelect = () => {
    if (Object.keys(selectedItems).length > 0) {
      setDisableHeader(true);
      console.log("disable");
    } else {
      setDisableHeader(false);
      console.log("re-able");
    }
  };

  const handleSelectedItems = (selectedItem, id, subItem, quantity) => {
    if (selectedItem === null) {
      let tempObject = selectedItems;
      delete tempObject[id];
      setSelectedItems(tempObject);
      console.log(selectedItems);
    } else {
      if (subItem === undefined) {
        // single item
        let tempObject = selectedItems;
        tempObject[selectedItem._id] = {
          item: selectedItem.item,
          categoryId: selectedItem.categoryId,
          quantity: selectedItem.quantity,
        };
        setSelectedItems(tempObject);
        console.log(selectedItems);
      } else {
        // multi item
        if (typeof selectedItems[selectedItem._id] === "undefined") {
          //if multi item doesn't exist yet
          let tempObject = selectedItems;
          tempObject[selectedItem._id] = {
            item: selectedItem.item,
            categoryId: selectedItem.categoryId,
            subItem: { [subItem]: quantity },
          };
          setSelectedItems(tempObject);
          console.log(selectedItems);
        } else {
          //if multi item already exist
          if (
            typeof selectedItems[selectedItem._id].subItem[subItem] ===
            "undefined"
          ) {
            //add item because it hasnt been selected yet
            let tempObject = { ...selectedItems };
            tempObject[selectedItem._id].subItem[subItem] = quantity;
            setSelectedItems(tempObject);
            console.log(selectedItems);
          } else {
            //minus item because its already been selected
            if (
              Object.keys(selectedItems[selectedItem._id].subItem).length > 1
            ) {
              let tempObject = { ...selectedItems };
              delete tempObject[selectedItem._id].subItem[subItem];
              setSelectedItems(tempObject);
              console.log(selectedItems);
            } else {
              let tempObject = selectedItems;
              delete tempObject[selectedItem._id];
              setSelectedItems(tempObject);
              console.log(selectedItems);
            }
          }
        }
      }
    }
    DisableOnSelect();
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
          disabled={disableHeader}
        />
      </View>
      {/* ~~~~~~~~~~~~~~~~   BODY  ~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
      <ScrollView contentContainerStyle={styles.body}>
        <View style={{ minHeight: "85%" }}>
          {categories.map((c, index) => (
            <CategoryDropDown
              key={c._id}
              categoryIndex={index}
              category={c}
              items={sortItemsIntoCategory(c._id)}
              toggleDelete={toggleDelete}
              handleDelete={handleDelete}
              handleSelectedItems={handleSelectedItems}
            />
          ))}
        </View>
        {/* ~~~~~~~~~~~~~~~~   BUTTONBAR  ~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
        {toggleDelete ? (
          <></>
        ) : Object.keys(selectedItems).length > 0 ? (
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
      ) : Object.keys(selectedItems).length > 0 ? (
        <View style={styles.buttonBar}>
          <ButtonBar
            navigation={navigation}
            buttonInfo={[
              ["check_mark_circle", "buttonFunction", handleSubmit],
              ["x_circle", "buttonFunction", handleCancle],
            ]}
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
    alignItems: "flex-end",
    justifyContent: "center",
    height: 80,
    paddingRight: 40,
  },
  buttonBar: {
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    height: 80,
    borderTopWidth: 2,
    borderColor: "#E7E7E7",
    borderStyle: "solid",
  },
  NavBar: {
    height: 80,
  },
});
