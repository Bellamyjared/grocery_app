// NEED TO ADD DELETE SUB ITEM BUTTON
import { useState, useEffect } from "react";
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
import Icon from "../../assets/icons/icon";
import { useIsFocused } from "@react-navigation/native";

const Add_Recipe = ({ route, navigation }) => {
  const [title, setTitle] = useState();
  const [ingredients, setIngredients] = useState([]);
  const [directions, setDirections] = useState();
  const [favorite, setFavorite] = useState(false);
  const [oldIngredients, setOldIngredients] = useState();
  const isFocused = useIsFocused();

  useEffect(() => {
    getIngredients();
  }, [isFocused]);

  const getIngredients = () => {
    if (typeof route.params === "object") {
      const { item } = route.params;
      if (oldIngredients != item) {
        setOldIngredients(item);
        setIngredients(ingredients.concat(item));
      }
    }
  };

  const formValidation = () => {
    if (title === undefined || title === "") {
      Alert.alert("ERROR", "Format issue");
    } else {
      handleSubmit();
    }
  };
  //  ************* HANDLE SUBMITE ****************
  const handleSubmit = async () => {
    console.log(ingredients);
    // const newRecipe = {
    //   title: title,
    //   ingredients: ingredients,
    //   directions: directions,
    // };

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

  const temp = (item) => {
    let test = [];

    Object.keys(item.subItems).forEach((subitem) => {
      test = [
        ...test,
        <Text>
          {subitem} x {item.subItems[subitem]}
        </Text>,
      ];
    });
    return test;
  };

  const showIngredients = () => {
    let allItems = [];
    ingredients.map((item) => {
      // single item
      if (item.subItems === null) {
        allItems = [
          ...allItems,
          <Text>
            {item.item} x {item.quantity}
          </Text>,
        ];
      } else {
        // multi item
        allItems = [
          ...allItems,
          <View>
            <Text>{item.item}</Text>
            <View style={{ paddingLeft: 15 }}>{temp(item)}</View>
          </View>,
        ];
      }
    });

    return allItems;
  };

  return (
    <>
      <ScrollView contentContainerStyle={styles.scrollView}>
        {/* ~~~~~~~~~~~~~~~~   HEADER  ~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
        <View style={styles.header}>
          <Header navigation={navigation} title={["Add Recipe", 50]} />
        </View>
        {/* ~~~~~~~~~~~~~~~~   BODY  ~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
        <View style={styles.body}>
          <View style={{ paddingTop: 15 }}>
            <View style={styles.TitleView}>
              <Text style={styles.form_Lable}>Title</Text>
              <Pressable
                onPress={() =>
                  favorite ? setFavorite(false) : setFavorite(true)
                }
              >
                <Icon
                  style={
                    favorite
                      ? {
                          color: "white",
                          backgroundColor: "lightgreen",
                          borderRadius: 8,
                        }
                      : { color: "black" }
                  }
                  name={"star"}
                  size={30}
                />
              </Pressable>
            </View>
            <TextInput
              style={styles.form_Input}
              onChangeText={setTitle}
              value={title}
            />
          </View>
          <View style={{ paddingTop: 15, width: 300 }}>
            <Text style={styles.form_Lable}>Ingredients</Text>
            {ingredients.length === 0 ? (
              <></>
            ) : (
              <View>{showIngredients()}</View>
            )}

            <Button
              onPress={() =>
                navigation.navigate("Add_Items", {
                  OriginRoute: "recipe",
                })
              }
              title="Add"
              buttonStyle={{
                backgroundColor: "#97FFDA",
                borderRadius: 15,
                width: 100,
                height: 45,
              }}
              titleStyle={{
                color: "black",
                fontSize: 20,
              }}
            />
          </View>
          <View style={{ paddingTop: 15 }}>
            <Text style={styles.form_Lable}>Directions</Text>
            <View style={styles.Directions_Form_Container}>
              <TextInput
                multiline={true}
                textAlignVertical={"top"}
                style={styles.Directions_Form_Input}
                onChangeText={setDirections}
                value={directions}
              />
            </View>
          </View>
        </View>

        {/* ~~~~~~~~~~~~~~~~   BUTTONBAR  ~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
      </ScrollView>
      <View style={styles.buttonBar}>
        <ButtonBar
          navigation={navigation}
          buttonInfo={[
            ["check_mark_circle", "buttonFunction", handleSubmit],
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
  TitleView: {
    flexDirection: "row",
    justifyContent: "space-between",
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
  Directions_Form_Container: {
    borderWidth: 1,
    borderRadius: 15,
    width: 300,
  },
  Directions_Form_Input: {
    fontSize: 20,
    width: "95%",
    minHeight: 200,
    alignSelf: "center",
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
