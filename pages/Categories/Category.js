// not going to use CatOrder for now, adds to muc complication, add in version 1.2
// *********** 1.2 version ****************
// need category order edit
// Need to change submit
// ****************************************
import { useState, useEffect } from "react";
import { StyleSheet, View, Alert, Text } from "react-native";
import Icon from "../../assets/icons/icon";
import AppLoading from "expo-app-loading";
import { Button } from "react-native-elements";

import { GetCategory } from "../../dbRequests/Category";
import { DeleteCategory } from "../../dbRequests/Category";
import { DeleteValidation } from "../../components/DeleteValidation";
import Header from "../../components/Header";
import ButtonBar from "../../components/ButtonBar";
import MoveAbleList from "../MoveAbleList/MoveAbleList";

const Category = ({ navigation }) => {
  const [categories, setCategories] = useState();
  const [categoryOrder, setCategoryOrder] = useState();
  const [headerIcon, setHeaderIcon] = useState("Blank");
  const [disableHeader, setDisableHeader] = useState(false);
  const [test, setTest] = useState(false);

  useEffect(() => {
    handleGetItems();
  }, []);

  const handleGetItems = async () => {
    data = await GetCategory();
    setCategories([...data]);
    setCategoryOrder(data.length);
  };

  const handleDelete = async (id) => {
    let deleteStatus = await DeleteCategory(id);
    if ((await deleteStatus) != undefined) {
      handleGetItems();
      return true;
    } else {
      Alert.alert("ERROR", "format issue sub Item");
    }
  };
  const handleEdit = (category, id) => {
    navigation.navigate("Edit_Category", { category: category, id: id });
  };

  const handleBack = () => {
    if (disableHeader === true) {
      setHeaderIcon("Blank");
      setDisableHeader(false);
    } else {
      return navigation.goBack();
    }
  };
  const handleButtomBar = () => {
    if (disableHeader === true) {
      return [["x_circle", "buttonFunction", handleBack]];
    } else {
      return [
        // *********** VERSION 1.2 ********
        // ["check_mark_circle", "buttonFunction", handleSubmit],
        [
          "plus_circle",
          "Create_Category",
          "passProps",
          { categoryOrder: categoryOrder },
        ],
        ["back_circle", "buttonFunction", handleBack],
      ];
    }
  };

  const handleEditIcon = () => {
    setHeaderIcon("Edit");
    setDisableHeader(true);
  };
  const handleDeleteIcon = () => {
    setHeaderIcon("Delete");
    setDisableHeader(true);
  };

  //can be made better, but works for now.
  const CategoryItemIcons = (id) => {
    if (headerIcon === "Delete") {
      return <Icon key={id} name="x_circle" size={30} />;
    }

    if (headerIcon === "Edit") {
      return <Icon key={id} name="drop_down" size={30} />;
    }
  };

  const handleCategoryItemIcon = (category, id) => {
    if (headerIcon === "Edit") {
      handleEdit(category, id);
    } else if (headerIcon === "Delete") {
      DeleteValidation(category, id, handleDelete);
    }
  };

  const header = () => {
    return (
      <Header
        navigation={navigation}
        title={["Category", 50]}
        disabled={disableHeader}
        icons={[
          ["edit", "buttonFunction", handleEditIcon],
          ["trash", "buttonFunction", handleDeleteIcon],
        ]}
      />
    );
  };

  if (categories === undefined) {
    return <AppLoading />;
  } else if (categories.length === 0) {
    return (
      <>
        <View style={styles.AddCategoryContainer}>
          <Header title={["Category", 50]} />
          <View style={styles.AddCategoryBody}>
            <Text style={{ fontSize: 25, paddingBottom: 40 }}>
              Please Add A Category
            </Text>
            <Button
              style={{ borderRadius: 20 }}
              onPress={() =>
                navigation.navigate("Create_Category", { categoryOrder: 0 })
              }
              title="Add"
              buttonStyle={{
                backgroundColor: "#97FFDA",
                borderRadius: 15,
                width: 115,
                height: 50,
              }}
              titleStyle={{
                color: "black",
                fontSize: 25,
              }}
            />
          </View>
        </View>
        {/* ~~~~~~~~~~~~~~~~   BUTTONBAR  ~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
        <View style={styles.buttonBar}>
          <ButtonBar
            navigation={navigation}
            buttonInfo={[["back_circle", "buttonFunction", handleBack]]}
          />
        </View>
      </>
    );
  } else {
    return (
      <>
        {/* ~~~~~~~~~~~~~~~~   HEADER  ~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
        {/* header was passed to moveAbleList, too allow for the header to be in the scroll view */}
        {/* ~~~~~~~~~~~~~~~~   BODY  ~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}

        <View style={styles.DefaultContainer}>
          <MoveAbleList
            header={header}
            categories={categories}
            item_Height={80}
            CategoryItemIcons={CategoryItemIcons}
            disabled={disableHeader}
            handleIconPress={handleCategoryItemIcon}
            test={test}
            setTest={setTest}
          />
        </View>

        {/* ~~~~~~~~~~~~~~~~   BUTTONBAR  ~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
        <View style={styles.buttonBar}>
          <ButtonBar navigation={navigation} buttonInfo={handleButtomBar()} />
        </View>
      </>
    );
  }
};

export default Category;

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
  },
  AddCategoryContainer: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 30,
    paddingLeft: 25,
    paddingRight: 25,
  },
  AddCategoryBody: {
    height: "85%",
    justifyContent: "center",
    alignItems: "center",
  },
  DefaultContainer: {
    width: "100%",
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

// ****************** 1.2 version **************
// const handleSubmit = () => {
//   // place holder for editing the order of categories
//   // make the submit button greyd out until the categories have been edited
//   console.log("submit");
// };
