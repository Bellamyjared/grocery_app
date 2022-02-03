// Need delete confirmation,
// need category order edit
// Need to change submit
import { useState, useEffect } from "react";
import { StyleSheet, Text, View, Alert, ScrollView } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { Icon } from "react-native-elements";

import { GetCategory } from "../../dbRequests/Category";
import { DeleteCategory } from "../../dbRequests/Category";
import Header from "../../components/Header";
import ButtonBar from "../../components/ButtonBar";

const Category = ({ navigation }) => {
  const [categories, setCategories] = useState([]);
  const [categoryOrder, setCategoryOrder] = useState();
  const isFocused = useIsFocused();

  useEffect(() => {
    handleGetItems();
  }, [isFocused]);

  const handleGetItems = async () => {
    data = await GetCategory();
    setCategories(data);
    setCategoryOrder(data.length);
  };
  const handleBack = () => navigation.goBack();
  const handleSubmit = () => {
    console.log("submit");
    console.log(data);
  };
  const handleDelete = async (id) => {
    let deleteStatus = await DeleteCategory(id);
    if ((await deleteStatus) != undefined) {
      handleGetItems();
    } else {
      Alert.alert("ERROR", "format issue sub Item");
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
            icons={[["trash", "trash"]]}
          />
        </View>
        {/* ~~~~~~~~~~~~~~~~   BODY  ~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
        <View style={styles.body}>
          {categories.map((category) => (
            <View style={styles.container}>
              <Text style={styles.categoryText}>{category.category}</Text>
              <View styles={styles.categoryDelete}>
                <Icon
                  key={category.categoryOrder}
                  name="remove-circle-outline"
                  type="materialicons"
                  size={30}
                  onPress={() => {
                    handleDelete(category._id);
                  }}
                />
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
      {/* ~~~~~~~~~~~~~~~~   BUTTONBAR  ~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
      <View style={styles.buttonBar}>
        <ButtonBar
          navigation={navigation}
          buttonInfo={[
            ["check-circle-outline", "buttonFunction", handleSubmit],
            [
              "add-circle-outline",
              "Create_Category",
              "passProps",
              { categoryOrder: categoryOrder },
            ],
            ["exit-to-app", "buttonFunction", handleBack],
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
