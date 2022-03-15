// add search bar
// add sub Item display

import { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Alert,
  TouchableWithoutFeedback,
} from "react-native";
import Icon from "../../assets/icons/icon";

import { GetItem, DeleteItem } from "../../dbRequests/Item";
import { GetCategory } from "../../dbRequests/Category";
import { PostList } from "../../dbRequests/List";
import Header from "../../components/Header";
// import SearchBar from "../../components/SearchBar"; deprecatied
import ButtonBar from "../../components/ButtonBar";
import Items_Container from "./Items_Container";
import { DeleteValidation } from "../../components/DeleteValidation";
import Picker from "../../components/Picker";

const Add_Items = ({ route, navigation }) => {
  const { OriginRoute, recipe } = route.params; // grab oridinal page for DB post

  const [Items, setItems] = useState([]);
  const [categories, setCategories] = useState();
  const [ItemList, setItemList] = useState([]);
  const [headerStatus, setHeaderStatus] = useState();
  const [disableHeader, setDisableHeader] = useState();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedCategoryId, setSelectedCategoryId] = useState();
  const [toggleDropDown, setToggleDropDown] = useState(false);
  const [clearSelected, setClearSelected] = useState(false);

  const filterItems = () => {
    if (selectedCategory != "All") {
      var filteredItems = Items.filter(
        (item) => item.categoryId === selectedCategoryId
      );
      const itemIDs = filteredItems.map((item) => item._id);
      return itemIDs;
    } else return null;
  };

  useEffect(() => {
    handleGetItems();
    handleGetCategory();
    // noteing this as a work around for now, because its a bad way of implementing it
    if (clearSelected === true) {
      setClearSelected(false);
    }
  }, [clearSelected]);

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
  const handleSubmit = async () => {
    const finalItemList = ItemList.filter((item) => item != undefined);
    if (finalItemList.length > 0) {
      let listOfFinalItems = [];
      finalItemList.forEach((i) => {
        let quantity;
        let subItems;
        if (typeof Object.values(i)[0] === "number") {
          // single Item
          quantity = Object.values(i)[0];
          subItems = null;
        } else {
          // Multiple Items
          quantity = null;
          subItems = Object.values(i)[0];
        }
        const newItemForList = {
          item: Object.getOwnPropertyNames(i)[0],
          quantity: quantity,
          categoryId: Object.values(i)[1],
          subItems: subItems,
        };
        listOfFinalItems = [...listOfFinalItems, newItemForList];
      });
      if (OriginRoute === "recipe_Add") {
        setItemList([]);
        navigation.navigate("Add_Recipe", {
          item: listOfFinalItems,
        });
      } else if (OriginRoute === "recipe_Edit") {
        setItemList([]);
        navigation.navigate("Edit_Recipe", {
          item: listOfFinalItems,
          recipe: recipe,
        });
      } else {
        if ((await PostList(listOfFinalItems)) === undefined) {
          Alert.alert(
            "ERROR",
            "An error occurred while creating your List. Please try again later"
          );
        } else {
          navigation.navigate("List");
        }
      }
    }
  };
  const handleClear = () => {
    setClearSelected(true);
    setSelectedCategory("All");
  };

  const clearCategoryFilter = () => {
    if (selectedCategory != "All") {
      return (
        <Icon
          name="x_circle"
          size={20}
          onPress={() => {
            setSelectedCategory("All");
          }}
        />
      );
    } else return <></>;
  };

  const handleSelectedItemList = (item, itemValue, index) => {
    if (typeof itemValue[item] === "number") {
      //single item
      if (itemValue[item] > 0) {
        let tempListItem = ItemList;
        tempListItem[index] = [itemValue][0];
        setItemList(tempListItem);
      } else {
        let tempListItem = ItemList;
        tempListItem[index] = undefined;
        setItemList(tempListItem);
      }
    } else {
      // mulitple items
      if (Object.values(itemValue[item]).every((e) => e === 0)) {
        let tempListItem = ItemList;
        tempListItem[index] = undefined;
        setItemList(tempListItem);
      } else {
        let subItemList = {};
        for (const i in itemValue[item]) {
          if (itemValue[item][i] != 0) {
            subItemList[i] = itemValue[item][i];
          }
        }
        let tempItemList = ItemList;
        tempItemList[index] = {
          [item]: subItemList,
          categoryId: itemValue.categoryId,
        };
        setItemList(tempItemList);
      }
    }
    if (ItemList.every((value) => value === undefined)) {
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
    } else if (ItemList.every((value) => value === undefined)) {
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
        {/* being redacted for now */}
        {/* <View style={styles.searchBar}>
          <SearchBar />
        </View> */}
        <View style={styles.categoryFilter}>
          <TouchableWithoutFeedback onPress={() => setToggleDropDown(true)}>
            <Text style={{ fontSize: 20 }}>{selectedCategory}</Text>
          </TouchableWithoutFeedback>
          <View style={styles.CategoryFilterButoon}>
            {clearCategoryFilter()}
          </View>
        </View>
        <View
          style={{
            borderBottomWidth: 1,
            borderBottomColor: "#E7E7E7",
            width: "40%",
            paddingTop: 5,
            marginBottom: 10,
          }}
        ></View>
        <View style={styles.ItemContainer}>
          {clearSelected != true ? (
            Items.map((item, index) => (
              <Items_Container
                key={item._id}
                index={index}
                item={item}
                headerStatus={headerStatus}
                handleSelectedItemList={handleSelectedItemList}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
                filterItems={filterItems}
              />
            ))
          ) : (
            <></>
          )}
        </View>
      </ScrollView>

      {/* ~~~~~~~~~~~~~~~~   BUTTONBAR  ~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
      <View style={styles.buttonBar}>{ChangeButtonBar()}</View>
      <Picker
        list={categories}
        header="Category"
        itemText="category"
        selected={setSelectedCategory}
        selectedId={setSelectedCategoryId}
        ToggleDisplay={toggleDropDown}
        setToggleDisplay={setToggleDropDown}
      />
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
    width: "100%",
    paddingTop: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  CategoryFilterButoon: {
    paddingLeft: 15,
  },

  ItemContainer: {
    width: "85%",
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
  },
  NavBar: {
    height: "10%",
  },
});
