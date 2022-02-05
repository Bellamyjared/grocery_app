// Need delete confirmation,
// need category order edit
// Need to change submit
import { useState, useEffect } from "react";
import { StyleSheet, Text, View, Alert, ScrollView } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import Icon from "../../assets/icons/icon";

import { GetCategory } from "../../dbRequests/Category";
import { DeleteCategory } from "../../dbRequests/Category";
import Header from "../../components/Header";
import ButtonBar from "../../components/ButtonBar";

const Category = ({ navigation }) => {
  const [categories, setCategories] = useState([]);
  const [categoryOrder, setCategoryOrder] = useState();
  const [backOrX, setBackOrX] = useState("back_circle");
  const [categoryIcon, setCategoryIcon] = useState("Blank");
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
    console.log("submit");
    console.log(data);
  };

  const handleDelete = (category, id) => {
    Alert.alert(
      `Delete ${category}?`,
      `Are you sure you want to delete ${category}`,
      [
        {
          text: "Cancel",
        },
        { text: "OK", onPress: () => OnDelete(id) },
      ]
    );
  };

  const OnDelete = async (id) => {
    let deleteStatus = await DeleteCategory(id);
    if ((await deleteStatus) != undefined) {
      handleGetItems();
    } else {
      Alert.alert("ERROR", "format issue sub Item");
    }
  };

  // back button doesn't work, need to fix
  const handleBackOrX = () =>
    backOrX === "back_circle"
      ? navigation.goBack()
      : setBackOrX("back_circle") + setCategoryIcon("Blank");

  const handleEditIcon = () => {
    setBackOrX("x_circle");
    setCategoryIcon("Edit");
  };
  const handleDeleteIcon = () => {
    setBackOrX("x_circle");
    setCategoryIcon("Delete");
  };

  const changeView = (category) => {
    const handleIcon = () => {
      if (categoryIcon === "Edit") {
        return "drop_down";
      }
      if (categoryIcon === "Delete") {
        return "x_circle";
      }
    };
    const handleOnPress = (category, id) => {
      if (categoryIcon === "Edit") {
        return handleEdit(category, id);
      }
      if (categoryIcon === "Delete") {
        return handleDelete(category, id);
      }
    };
    if (categoryIcon === "Edit" || "Delete") {
      return (
        <Icon
          key={category.categoryOrder}
          name={handleIcon()}
          size={30}
          onPress={() => {
            handleOnPress(category.category, category._id);
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
            icons={[
              ["edit", "buttonFunction", handleEditIcon],
              ["trash", "buttonFunction", handleDeleteIcon],
            ]}
          />
        </View>
        {/* ~~~~~~~~~~~~~~~~   BODY  ~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
        <View style={styles.body}>
          {categories.map((category) => (
            <View style={styles.container}>
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
