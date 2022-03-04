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
import Header from "../../components/Header";
// import SearchBar from "../../components/SearchBar"; deprecatied
import ButtonBar from "../../components/ButtonBar";
import Single_Item from "./Single_Item";
import { DeleteValidation } from "../../components/DeleteValidation";
import DropDown from "../../components/DropDown.js";

const Add_Items = ({ route, navigation }) => {
  const { OriginRoute } = route.params; // grab oridinal page for DB post

  const [Items, setItems] = useState([]);
  const [categories, setCategories] = useState();
  const [subItems, setSubItems] = useState([]);
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
    // noting this as a work around for now, because its a bad way of implementing it
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
  const handleSubmit = () => {
    console.log(subItems);
    // const finalSubItems = subItems.filter((item) => item != null);
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
              <Single_Item
                key={item._id}
                index={index}
                item={item}
                headerStatus={headerStatus}
                handleSubItemText={handleSubItemText}
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
      <DropDown
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
    backgroundColor: "#fff",
  },
  NavBar: {
    height: "10%",
  },
});
