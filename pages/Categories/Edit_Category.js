import { useState } from "react";
import { StyleSheet, Text, View, TextInput, Alert } from "react-native";

import { UpdateCategory } from "../../dbRequests/Category";
import Header from "../../components/Header";
import ButtonBar from "../../components/ButtonBar";
import ChangeNavStack from "../../components/ChangeNavStack";

const Edit_Category = ({ route, navigation }) => {
  const { category, id } = route.params; // grab props from route

  const [categoryText, setCategoryText] = useState(category);

  const handleBack = () => navigation.goBack();

  const handleSubmit = async () => {
    // validation ~~~ NEEDS TO BE REPLACES WITH IN-APP ALERT AND UNDERLINE-TEXT ALERT
    if (categoryText === undefined) {
      Alert.alert(
        "Text Input Error",
        "Please fill category text before submitting"
      );
    } else {
      //create new category and send it to dbRequests, if error alert
      let newCategory = {
        category: categoryText,
        categoryOrder: 0,
      };
      if ((await UpdateCategory(id, newCategory)) != undefined) {
        ChangeNavStack(navigation, ["Category", "Edit_Category"]);
        navigation.push("Category");
      } else {
        Alert.alert("ERROR", "format issue sub Item");
      }
    }
  };

  return (
    <>
      {/* ~~~~~~~~~~~~~~~~   HEADER  ~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
      <View style={styles.header}>
        <Header title={["Edit Category", 45]} />
      </View>
      {/* ~~~~~~~~~~~~~~~~   BODY  ~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
      <View style={styles.body}>
        <View>
          <Text style={styles.form_Lable}>Category Name</Text>
          <TextInput
            style={styles.form_Input}
            onChangeText={setCategoryText}
            value={categoryText}
          />
        </View>
      </View>
      {/* ~~~~~~~~~~~~~~~~   BUTTONBAR  ~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
      <View style={styles.buttonBar}>
        <ButtonBar
          navigation={navigation}
          buttonInfo={[
            ["check_mark_circle", "buttonFunction", handleSubmit],
            ["x_circle", "buttonFunction", handleBack],
          ]}
        />
      </View>
    </>
  );
};

export default Edit_Category;

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  header: {
    justifyContent: "flex-end",
    backgroundColor: "#fff",
    height: 115,
  },

  form_Lable: { margin: 10, fontSize: 20 },

  form_Input: {
    fontSize: 24,
    height: 45,
    width: 300,
    borderWidth: 1,
    paddingTop: 10,
    paddingLeft: 25,
    paddingBottom: 8,
    paddingRight: 10,
    borderRadius: 15,
  },
  buttonBar: {
    height: "12%",
    paddingRight: "10%",
    paddingTop: "5%",
    alignItems: "flex-end",
    backgroundColor: "#fff",
  },
  NavBar: {
    height: "10%",
  },
});
