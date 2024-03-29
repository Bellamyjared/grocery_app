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
import Button from "../../components/Button";

import Header from "../../components/Header";
import ButtonBar from "../../components/ButtonBar";
import Icon from "../../assets/icons/icon";
import { useIsFocused } from "@react-navigation/native";
import { PostRecipe } from "../../dbRequests/Recipe";

const Add_Recipe = ({ route, navigation }) => {
  const [title, setTitle] = useState();
  const [favorite, setFavorite] = useState(false);
  const [ingredients, setIngredients] = useState([]);
  const [directions, setDirections] = useState();
  const [oldIngredients, setOldIngredients] = useState();
  const isFocused = useIsFocused();
  const { userData } = route.params;

  useEffect(() => {
    getIngredients();
  }, [isFocused]);

  const getIngredients = () => {
    const { item } = route.params;

    if (typeof item === "object") {
      if (oldIngredients != item) {
        setOldIngredients(item);
        setIngredients(ingredients.concat(item));
      }
    }
  };

  const formValidation = () => {
    if (
      title === undefined ||
      title === "" ||
      directions === undefined ||
      directions === ""
    ) {
      Alert.alert("ERROR", "Format issue");
    } else {
      handleSubmit();
    }
  };
  //  ************* HANDLE SUBMITE ****************
  const handleSubmit = async () => {
    const newRecipe = {
      userId: userData.id,
      title: title,
      favorite: favorite,
      ingredients: ingredients,
      directions: directions,
    };

    console.log(newRecipe);
    if ((await PostRecipe(newRecipe)) === undefined) {
      Alert.alert(
        "ERROR",
        "An error occurred while creating your item. Please try again later"
      );
    } else {
      navigation.goBack();
    }
  };

  const handleBack = () => navigation.goBack();

  const deleteIngredientFromList = (item, subitem) => {
    let newIngredients;
    if (typeof subitem === "undefined") {
      newIngredients = ingredients.filter((i) => item != i);
      setIngredients(newIngredients);
    } else {
      if (Object.keys(item.subItems) > 1) {
        let itemIndex;
        ingredients.forEach((i, index) => {
          if (item === i) {
            itemIndex = index;
          }
        });

        newIngredients = [...ingredients];
        delete newIngredients[itemIndex].subItems[subitem];
        setIngredients(newIngredients);
      } else {
        newIngredients = ingredients.filter((i) => item != i);
        setIngredients(newIngredients);
      }
    }
  };

  const handleMultiItems = (item) => {
    let test = [];

    Object.keys(item.subItems).forEach((subitem, index) => {
      test = [
        ...test,
        <View key={subitem + index} style={styles.MultiIngredientContainer}>
          <Icon
            style={{ paddingRight: 20 }}
            onPress={() => deleteIngredientFromList(item, subitem)}
            name={"minus_circle"}
            size={18}
          />
          <Text style={styles.IngredientText}>
            {subitem} x {item.subItems[subitem]}
          </Text>
        </View>,
      ];
    });
    return test;
  };

  const showIngredients = () => {
    let allItems = [];
    ingredients.map((item, index) => {
      // single item
      if (item.subItems === null) {
        allItems = [
          ...allItems,
          <View key={item.item + index} style={styles.IngredientContainer}>
            <Icon
              style={{ paddingRight: 20 }}
              onPress={() => deleteIngredientFromList(item)}
              name={"minus_circle"}
              size={18}
            />
            <Text style={styles.IngredientText}>
              {item.item} x {item.quantity}
            </Text>
          </View>,
        ];
      } else {
        // multi item
        allItems = [
          ...allItems,
          <View key={item.item + index} style={{ paddingBottom: 15 }}>
            <Text style={styles.IngredientText}>{item.item}</Text>
            <View style={{ paddingLeft: 15 }}>{handleMultiItems(item)}</View>
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
              navigation={navigation}
              navigate={"Add_Items"}
              passProps={{ OriginRoute: "recipe_Add", userData: userData }}
              text="Add"
              width={80}
              height={40}
              fontSize={20}
              fontColor="black"
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
  Text: { fontFamily: "Poppins-Regular", fontSize: 50 },
  scrollView: {
    flexGrow: 1,
  },
  header: {},

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
  IngredientContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  MultiIngredientContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  IngredientText: { fontSize: 20, fontFamily: "Poppins-Regular" },
  form_Lable: { margin: 10, fontSize: 25, fontFamily: "Poppins-Regular" },

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
    marginBottom: 50,
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
