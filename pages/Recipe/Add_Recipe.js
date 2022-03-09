// NEED TO ADD DELETE SUB ITEM BUTTON
import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
  Alert,
  Pressable,
} from "react-native";
import { Button } from "react-native-elements";

import Header from "../../components/Header";
import ButtonBar from "../../components/ButtonBar";
import ChangeNavStack from "../../components/ChangeNavStack";

const Add_Recipe = ({ navigation }) => {
  const [title, setTitle] = useState();
  const [ingredients, setIngredients] = useState();
  const [directions, setDirections] = useState();

  const formValidation = () => {
    if (title === undefined || title === "") {
      Alert.alert("ERROR", "Format issue");
    } else {
      handleSubmit();
    }
  };
  //  ************* HANDLE SUBMITE ****************
  const handleSubmit = async () => {
    console.log("submit");
    const newRecipe = {
      title: title,
      ingredients: ingredients,
      directions: directions,
    };

    // if ((await PostItem(newItem)) === undefined) {
    //   Alert.alert(
    //     "ERROR",
    //     "An error occurred while creating your item. Please try again later"
    //   );
    // } else {
    //   ChangeNavStack(navigation, ["Add_Items", "Create_Item"]);
    //   navigation.push("Add_Items", { OriginRoute: OriginRoute });
    // }
  };

  const handleBack = () => navigation.goBack();

  return (
    <>
      <ScrollView contentContainerStyle={styles.scrollView}>
        {/* ~~~~~~~~~~~~~~~~   HEADER  ~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
        <View style={styles.header}>
          <Header navigation={navigation} title={["Create Recipe", 50]} />
        </View>
        {/* ~~~~~~~~~~~~~~~~   BODY  ~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
        <View style={styles.body}>
          <View style={{ paddingTop: 15 }}>
            <Text style={styles.form_Lable}>Title</Text>
            <TextInput
              style={styles.form_Input}
              onChangeText={setTitle}
              value={title}
            />
          </View>
          <View style={{ paddingTop: 15, width: 300 }}>
            <Text style={styles.form_Lable}>Ingredients</Text>
            <Button
              style={{ borderRadius: 20 }}
              onPress={() =>
                navigation.navigate("Add_Items", { OriginRoute: "recipe" })
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
          <View style={{ paddingTop: 15 }}>
            <Text style={styles.form_Lable}>Directions</Text>
            <TextInput
              multiline={true}
              numberOfLines={4}
              style={styles.Directions_Form_Input}
              onChangeText={setDirections}
              value={directions}
            />
          </View>
        </View>

        {/* ~~~~~~~~~~~~~~~~   BUTTONBAR  ~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
      </ScrollView>
      <View style={styles.buttonBar}>
        <ButtonBar
          navigation={navigation}
          buttonInfo={[
            ["check_mark_circle", "buttonFunction", formValidation],
            ["back_circle", "buttonFunction", handleBack],
          ]}
        />
      </View>
    </>
  );
};

export default Add_Recipe;

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
  },
  header: {
    justifyContent: "flex-end",
    backgroundColor: "#fff",
    height: 115,
  },

  body: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },

  form_Lable: { margin: 10, fontSize: 20 },

  form_Input: {
    fontSize: 24,
    height: 45,
    width: 300,
    borderWidth: 1,
    borderRadius: 15,
    paddingTop: 10,
    paddingLeft: 25,
    paddingBottom: 8,
    paddingRight: 10,
  },
  Directions_Form_Input: {
    fontSize: 24,
    width: 300,
    borderWidth: 1,
    borderRadius: 15,
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
