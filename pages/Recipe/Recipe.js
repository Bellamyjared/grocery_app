import { useState, useEffect } from "react";
import { StyleSheet, Text, Pressable, View, ScrollView } from "react-native";

import NavBar from "../../components/NavBar";
import Header from "../../components/Header";
import ButtonBar from "../../components/ButtonBar";
import { GetRecipe } from "../../dbRequests/Recipe";
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

  const handleDelete = (id) => {
    console.log(id);
  };
  const handleEdit = (item) => {
    console.log(item);
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
        <View key={subitem + index} style={styles.MultiIngredientContainer}>
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
    recipe.ingredients.map((item, index) => {
      // single item
      if (item.subItems === null) {
        allItems = [
          ...allItems,
          <View key={item.item + index} style={styles.IngredientContainer}>
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
    <View>
      {toggleDelete ? (
        <Icon
          style={{ paddingLeft: 15 }}
          name={"x_circle"}
          size={15}
          onPress={() =>
            DeleteValidation(recipe.title, recipe._id, handleDelete)
          }
        />
      ) : (
        <></>
      )}
      <Pressable
        onPress={() => {
          handleToggleDropDown();
        }}
      >
        <View style={styles.RecipeContainer}>
          {recipe.favorite ? (
            <Icon style={{ paddingRight: 5 }} name={"star"} />
          ) : (
            <></>
          )}

          <Text style={styles.TitleText}>{recipe.title}</Text>
          {toggleEdit ? (
            <Icon
              style={{ paddingLeft: 15 }}
              name={"edit_arrow"}
              size={15}
              onPress={() => handleEdit(recipe)}
            />
          ) : (
            <Icon style={{ paddingLeft: 15 }} name={"drop_down"} size={15} />
          )}
        </View>
      </Pressable>
      {ToggleDropDown ? (
        <View style={styles.DropDownContainer}>
          {showIngredients()}
          <Text>{recipe.directions}</Text>
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
});
