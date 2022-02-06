// Need delete confirmation,
// need category order edit
// Need to change submit
import { useState, useEffect } from "react";
import { StyleSheet, Text, View, Alert, ScrollView } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import Icon from "../../assets/icons/icon";

import { GetCategory } from "../../dbRequests/Category";
import { DeleteCategory } from "../../dbRequests/Category";
import { DeleteValidation } from "../../components/DeleteValidation";
import Header from "../../components/Header";
import ButtonBar from "../../components/ButtonBar";

const Category = ({ navigation }) => {
  const [categories, setCategories] = useState([]);
  const [categoryOrder, setCategoryOrder] = useState();
  const [backOrX, setBackOrX] = useState("back_circle");
  const [categoryIcon, setCategoryIcon] = useState("Blank");
  const [disableHeader, setDisableHeader] = useState(false);
  const isFocused = useIsFocused();

  useEffect(() => {
    handleGetItems();
  }, [isFocused]);

  const handleGetItems = async () => {
    data = await GetCategory();
    setCategories(data);
    setCategoryOrder(data.length);
  };

  const handleSubmit = () => {
    // place holder for editing the order of categories
    console.log("submit");
  };

  const handleDelete = async (id) => {
    let deleteStatus = await DeleteCategory(id);
    if ((await deleteStatus) != undefined) {
      handleGetItems();
    } else {
      Alert.alert("ERROR", "format issue sub Item");
    }
  };

  const handleBackOrX = () =>
    backOrX === "back_circle"
      ? navigation.goBack()
      : setBackOrX("back_circle") +
        setCategoryIcon("Blank") +
        setDisableHeader(false);

  const handleEditIcon = () => {
    setBackOrX("x_circle");
    setCategoryIcon("Edit");
    setDisableHeader(true);
  };
  const handleDeleteIcon = () => {
    setBackOrX("x_circle");
    setCategoryIcon("Delete");
    setDisableHeader(true);
  };

  const changeView = (category) => {
    if (categoryIcon === "Delete") {
      return (
        <Icon
          key={category.categoryOrder}
          name="x_circle"
          size={30}
          onPress={() => {
            DeleteValidation(category.category, category._id, handleDelete);
          }}
        />
      );
    }

    if (categoryIcon === "Edit") {
      return (
        <Icon
          key={category.categoryOrder}
          name="drop_down"
          size={30}
          onPress={() => {
            handleEdit();
          }}
        />
      );
    }
  };

  return (
    <>
      <ScrollView contentContainerStyle={styles.scrollView}>
        {/* ~~~~~~~~~~~~~~~~   HEADER  ~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
        <View style={styles.header}>
          <Header
            navigation={navigation}
            title={["Category", 50]}
            disabled={disableHeader}
            icons={[
              ["edit", "buttonFunction", handleEditIcon],
              ["trash", "buttonFunction", handleDeleteIcon],
            ]}
          />
        </View>
        {/* ~~~~~~~~~~~~~~~~   BODY  ~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
        <View style={styles.body}>
          {categories.map((category) => (
            <View key={category._id} style={styles.container}>
              <Text style={styles.categoryText}>{category.category}</Text>
              <View styles={styles.categoryIcon}>{changeView(category)}</View>
            </View>
          ))}
        </View>
      </ScrollView>
      {/* ~~~~~~~~~~~~~~~~   BUTTONBAR  ~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
      <View style={styles.buttonBar}>
        <ButtonBar
          navigation={navigation}
          buttonInfo={[
            ["check_mark_circle", "buttonFunction", handleSubmit],
            [
              "plus_circle",
              "Create_Category",
              "passProps",
              { categoryOrder: categoryOrder },
            ],
            [backOrX, "buttonFunction", handleBackOrX],
          ]}
        />
      </View>
    </>
  );
};

export default Category;

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
  },
  body: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 30,
    paddingLeft: 25,
    paddingRight: 25,
  },

  header: {
    justifyContent: "flex-end",
    backgroundColor: "#fff",
    height: 115,
  },

  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderStyle: "solid",
    borderBottomWidth: 2,
    borderColor: "#DEDEDE",
    paddingTop: 25,
  },
  categoryText: {
    fontFamily: "Poppins-Regular",
    fontSize: 30,
    paddingLeft: 30,
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
});
