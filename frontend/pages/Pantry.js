import { useState, useEffect } from "react";
import { StyleSheet, View, ScrollView, Pressable, Alert } from "react-native";
import { useIsFocused } from "@react-navigation/native";

import NavBar from "../components/NavBar";
import Header from "../components/Header";
import ButtonBar from "../components/ButtonBar";
import { GetCategory } from "../dbRequests/Category";
import {
  GetPantry,
  UpdatePantryItem,
  DeletePantryItem,
} from "../dbRequests/Pantry";
import CategoryDropDown from "../components/CategoryDropDown";
import { DeleteValidation } from "../components/DeleteValidation";
import AddItemScreen from "../components/AddItemScreen";
import AddCategoryScreen from "../components/AddCategoryScreen";

const Pantry = ({ navigation, route }) => {
  const [categories, setCategories] = useState([]);
  const [pantry, setPantry] = useState([]);
  const [disableHeader, setDisableHeader] = useState(false);
  const [toggleDelete, setToggleDelete] = useState(false);
  const [selectedItems, setSelectedItems] = useState({});
  const [resetDropDown, setResetDropDown] = useState(false);
  const isFocused = useIsFocused();
  const { userData } = route.params;

  useEffect(() => {
    handleGetCategories();
    handleGetPantry();
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
    data = await GetCategory(userData.id);
    setCategories(data);
    console.log(data);
  };
  const handleGetPantry = async () => {
    data = await GetPantry(userData.id);
    setPantry(data);
    if (data.length === 0) {
      setToggleDelete(false);
      setDisableHeader(false);
    }
  };

  const handleCancle = () => {
    resetDropDown ? setResetDropDown(false) : setResetDropDown(true);
    setSelectedItems({});
    setDisableHeader(false);
  };

  const handleDelete = (item, itemText) => {
    // single Item
    if (item.subItem === null) {
      DeleteValidation(item.item, item._id, deleteItem);
    } else {
      // multi Item
      if (Object.keys(item.subItem).length > 1) {
        DeleteValidation(itemText, item._id, updateItem, item);
      } else {
        DeleteValidation(item.item, item._id, deleteItem);
      }
    }
  };

  const deleteItem = async (id, item) => {
    if ((await DeletePantryItem(id)) != undefined) {
      handleGetPantry();
    } else {
      Alert.alert(
        `An Error occurred when deleting ${item.item}, please try again later`
      );
    }
  };

  const updateItem = async (id, item, itemText) => {
    let temItem = item;
    delete temItem.subItem[itemText];

    if ((await UpdatePantryItem(id, temItem)) != undefined) {
      handleGetPantry();
    } else {
      Alert.alert(
        `An Error occurred when deleting ${item.item}. Please try again later`
      );
    }
  };

  const sortItemsIntoCategory = (categoryId) => {
    const items = pantry.filter((i) => i.categoryId === categoryId);
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
          userData={userData}
          title={["Pantry", 50]}
          icons={
            categories.length === 0
              ? []
              : pantry.length === 0
              ? [["edit", "Category", "passProps", { userData: userData }]]
              : [
                  ["edit", "Category", "passProps", { userData: userData }],
                  ["trash", "buttonFunction", headerTrash],
                ]
          }
          disabled={disableHeader}
        />
      </View>
      {/* ~~~~~~~~~~~~~~~~   BODY  ~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
      {categories.length === 0 ? (
        <AddCategoryScreen
          navigation={navigation}
          passProps={{ userData: userData, CreateCategoryRoute: "Pantry" }}
        />
      ) : pantry.length === 0 ? (
        <AddItemScreen
          BodyText="Please add an item to your Pantry"
          ButtonNavigation={navigation}
          ButtonNavigate="Add_Items"
          ButtonPassProps={{ OriginRoute: "pantry", userData: userData }}
        />
      ) : (
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
                resetDropDown={resetDropDown}
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
                    { OriginRoute: "pantry", userData: userData },
                  ],
                ]}
              />
            </View>
          )}
        </ScrollView>
      )}
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
            buttonInfo={[["x_circle", "buttonFunction", handleCancle]]}
          />
        </View>
      ) : (
        <View style={styles.NavBar}>
          <NavBar navigation={navigation} userData={userData} page={"pantry"} />
        </View>
      )}
    </>
  );
};

export default Pantry;

const styles = StyleSheet.create({
  body: {
    flexGrow: 1,
    backgroundColor: "#fff",
  },

  header: {},
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
