import { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  Pressable,
  View,
  ScrollView,
  Alert,
} from "react-native";

import NavBar from "../../components/NavBar";
import Header from "../../components/Header";
import ButtonBar from "../../components/ButtonBar";
import { GetRecipe, DeleteRecipe } from "../../dbRequests/Recipe";
import { useIsFocused } from "@react-navigation/native";
import { DeleteValidation } from "../../components/DeleteValidation";
import Icon from "../../assets/icons/icon";

const Recipe = ({ navigation }) => {
  const [recipes, setRecipes] = useState([]);
  const [toggleDelete, setToggleDelete] = useState(false);
  const [toggleEdit, setToggleEdit] = useState(false);
  const [disableHeader, setDisabledHeader] = useState(false);
  const isFocused = useIsFocused();

  useEffect(() => {
    getRecipes();
  }, [isFocused]);

  const getRecipes = async () => {
    data = await GetRecipe();
    setRecipes(data);
  };

  const handleDelete = async (id) => {
    if (await DeleteRecipe(id)) {
      getRecipes();
    } else {
      Alert.alert("something went wrong");
    }
  };
  const handleEdit = (item) => {
    navigation.navigate("Edit_Recipe", { item: item });
  };

  const handleCancle = () => {
    setToggleDelete(false);
    setToggleEdit(false);
    setDisabledHeader(false);
  };

  const ToggleHeaderDelete = () => {
    toggleDelete
      ? (setToggleDelete(false), setDisabledHeader(false))
      : (setToggleDelete(true), setDisabledHeader(true));
  };

  const ToggleHeaderEdit = () => {
    toggleEdit
      ? (setToggleEdit(false), setDisabledHeader(false))
      : (setToggleEdit(true), setDisabledHeader(true));
  };

  return (
    <>
      {/* ~~~~~~~~~~~~~~~~   HEADER  ~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
      <View style={styles.header}>
        <Header
          navigation={navigation}
          title={["Recipe", 50]}
          disabled={disableHeader}
          icons={[
            ["edit", "buttonFunction", ToggleHeaderEdit],
            ["trash", "buttonFunction", ToggleHeaderDelete],
          ]}
        />

        {/* ~~~~~~~~~~~~~~~~   BODY  ~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
      </View>
      <View
        style={{
          flexDirection: "row-reverse",
          alignItems: "flex-end",
          height: 32,
          width: "100%",
          backgroundColor: "#fff",
          paddingLeft: 25,
        }}
      >
        {disableHeader ? (
          <></>
        ) : recipes.length >= 5 ? (
          <Icon
            name={"plus"}
            size={20}
            onPress={() => navigation.navigate("Add_Recipe")}
          />
        ) : (
          <></>
        )}
      </View>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={{ minHeight: "85%" }}>
          {recipes.map((recipe, index) => (
            <RecipeDropDown
              key={index}
              recipe={recipe}
              toggleDelete={toggleDelete}
              toggleEdit={toggleEdit}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
            />
          ))}
        </View>
        <View style={styles.buttonBar}>
          {disableHeader ? (
            <></>
          ) : (
            <ButtonBar
              navigation={navigation}
              buttonInfo={[["plus_circle", "Add_Recipe"]]}
            />
          )}
        </View>
      </ScrollView>

      {/* ~~~~~~~~~~~~~~~~   NAVBAR  ~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
      {disableHeader ? (
        <View style={styles.buttonBar}>
          <ButtonBar
            navigation={navigation}
            buttonInfo={[["x_circle", "buttonFunction", handleCancle]]}
          />
        </View>
      ) : (
        <View style={styles.NavBar}>
          <NavBar navigation={navigation} page={"recipe"} />
        </View>
      )}
    </>
  );
};

export default Recipe;

const RecipeDropDown = ({
  recipe,
  toggleDelete,
  toggleEdit,
  handleDelete,
  handleEdit,
}) => {
  const [ToggleDropDown, setToggleDropDown] = useState(false);

  const handleToggleDropDown = () => {
    ToggleDropDown ? setToggleDropDown(false) : setToggleDropDown(true);
  };

  const handleMultiItems = (item) => {
    let test = [];

    Object.keys(item.subItems).forEach((subitem, index) => {
      test = [
        ...test,

        <View key={subitem + index} style={styles.Ingredient}>
          <Text style={styles.IngredientText}>{subitem} </Text>
          <Icon name={"x"} size={8} style={styles.Ingredient_X} />
          <Text style={styles.IngredientText}>{item.subItems[subitem]}</Text>
        </View>,
      ];
    });
    return test;
  };

  const showIngredients = () => {
    let allItems = [];
    recipe.ingredients.map((item, index) => {
      // single item
      if (item.subItems === null) {
        allItems = [
          ...allItems,
          <View key={item.item + index} style={styles.IngredientContainer}>
            <View style={styles.Ingredient}>
              <Text style={styles.IngredientText}>{item.item} </Text>
              <Icon name={"x"} size={8} style={styles.Ingredient_X} />
              <Text style={styles.IngredientText}>{item.quantity}</Text>
            </View>
          </View>,
        ];
      } else {
        // multi item
        allItems = [
          ...allItems,
          <View key={item.item + index} style={styles.IngredientContainer}>
            <Text style={styles.IngredientText}>{item.item}</Text>
            <View style={{ paddingLeft: 15 }}>{handleMultiItems(item)}</View>
          </View>,
        ];
      }
    });

    return allItems;
  };

  return (
    <View style={styles.RecipeContainer}>
      <Pressable
        onPress={() => {
          handleToggleDropDown();
        }}
      >
        <View style={styles.TitleContainer}>
          {toggleDelete ? (
            <Icon
              style={{ paddingLeft: 15, paddingRight: 20 }}
              name={"x_circle"}
              size={22}
              onPress={() =>
                DeleteValidation(recipe.title, recipe._id, handleDelete)
              }
            />
          ) : (
            <></>
          )}
          <View style={styles.TitleAndFavorite}>
            {recipe.favorite ? (
              <Icon style={{ paddingRight: 10 }} name={"star"} size={20} />
            ) : (
              <></>
            )}

            <Text style={styles.TitleText}>{recipe.title}</Text>
          </View>
          {toggleEdit ? (
            <Icon
              style={{ paddingLeft: 20 }}
              name={"edit_arrow"}
              size={18}
              onPress={() => handleEdit(recipe)}
            />
          ) : (
            <Icon style={{ paddingLeft: 25 }} name={"drop_down"} size={15} />
          )}
        </View>
      </Pressable>
      {ToggleDropDown ? (
        <View style={styles.DropDownContainer}>
          {showIngredients()}
          <Text style={styles.Directions}>{recipe.directions}</Text>
        </View>
      ) : (
        <></>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
    backgroundColor: "#fff",
  },

  header: {
    height: 100,
    justifyContent: "flex-end",
    backgroundColor: "#fff",
  },
  text: { fontFamily: "Poppins-Regular", fontSize: 50 },

  buttonBar: {
    alignItems: "flex-end",
    justifyContent: "center",
    height: 80,
    paddingRight: 40,
    backgroundColor: "#fff",
  },
  NavBar: {
    height: "10%",
  },

  RecipeContainer: {
    width: "85%",
    alignSelf: "center",
  },
  TitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 5,
    paddingTop: 10,
    width: "100%",
  },
  TitleAndFavorite: { flexDirection: "row", alignItems: "center" },
  TitleText: { fontSize: 25 },
  DropDownContainer: {
    width: "100%",
    paddingTop: 10,
    paddingBottom: 15,
  },

  IngredientContainer: { paddingBottom: 5, width: "90%", alignSelf: "center" },
  Ingredient: { flexDirection: "row", alignItems: "center" },
  Ingredient_X: { paddingLeft: 15, paddingRight: 10 },
  IngredientText: { fontSize: 18 },
  Directions: {
    fontSize: 18,
    paddingTop: 15,
  },
});
