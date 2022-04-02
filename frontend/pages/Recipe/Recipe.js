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
import AddItemScreen from "../../components/AddItemScreen";
import Icon from "../../assets/icons/icon";

const Recipe = ({ navigation, route }) => {
  const [recipes, setRecipes] = useState([]);
  const [toggleDelete, setToggleDelete] = useState(false);
  const [toggleEdit, setToggleEdit] = useState(false);
  const [disableHeader, setDisableHeader] = useState(false);
  const isFocused = useIsFocused();
  const { userData } = route.params;

  useEffect(() => {
    getRecipes();
  }, [isFocused]);

  const getRecipes = async () => {
    data = await GetRecipe(userData.id);
    setRecipes(data);
    if (data.length === 0) {
      setToggleDelete(false);
      setDisableHeader(false);
    }
  };

  const handleDelete = async (id) => {
    if (await DeleteRecipe(id)) {
      getRecipes();
    } else {
      Alert.alert("something went wrong");
    }
  };
  const handleEdit = (recipe) => {
    navigation.navigate("Edit_Recipe", { recipe: recipe, userData: userData });
    setToggleEdit(false);
    setDisableHeader(false);
  };

  const handleCancle = () => {
    setToggleDelete(false);
    setToggleEdit(false);
    setDisableHeader(false);
  };

  const ToggleHeaderDelete = () => {
    toggleDelete
      ? (setToggleDelete(false), setDisableHeader(false))
      : (setToggleDelete(true), setDisableHeader(true));
  };

  const ToggleHeaderEdit = () => {
    toggleEdit
      ? (setToggleEdit(false), setDisableHeader(false))
      : (setToggleEdit(true), setDisableHeader(true));
  };

  return (
    <>
      {/* ~~~~~~~~~~~~~~~~   HEADER  ~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
      <View style={styles.header}>
        <Header
          navigation={navigation}
          title={["Recipe", 50]}
          disabled={disableHeader}
          icons={
            recipes.length != 0
              ? [
                  ["edit", "buttonFunction", ToggleHeaderEdit],
                  ["trash", "buttonFunction", ToggleHeaderDelete],
                ]
              : []
          }
        />
      </View>

      {/* ~~~~~~~~~~~~~~~~   BODY  ~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}

      {recipes.length === 0 ? (
        <AddItemScreen
          BodyText="Please add a Recipe"
          ButtonNavigation={navigation}
          ButtonNavigate="Add_Recipe"
          ButtonPassProps={{ userData: userData }}
        />
      ) : (
        <>
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
                onPress={() =>
                  navigation.navigate("Add_Recipe", { userData: userData })
                }
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
                  buttonInfo={[
                    [
                      "plus_circle",
                      "Add_Recipe",
                      "passProps",
                      { userData: userData },
                    ],
                  ]}
                />
              )}
            </View>
          </ScrollView>
        </>
      )}
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
          <NavBar navigation={navigation} userData={userData} page={"recipe"} />
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
              name={"edit_arrow"}
              size={25}
              onPress={() => handleEdit(recipe)}
            />
          ) : toggleDelete ? (
            <Icon
              name={"x_circle"}
              size={30}
              onPress={() =>
                DeleteValidation(recipe.title, recipe._id, handleDelete)
              }
            />
          ) : (
            <Icon name={"drop_down"} size={15} />
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
    height: 80,
  },

  RecipeContainer: {
    width: "90%",
    alignSelf: "center",
  },

  TitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    paddingTop: 10,
    paddingBottom: 10,
  },
  TitleAndFavorite: {
    flexDirection: "row",
    alignItems: "center",
    maxWidth: "80%",
  },
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
