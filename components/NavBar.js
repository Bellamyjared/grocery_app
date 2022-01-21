import { useState, useEffect } from "react";

import { StyleSheet, View, Text } from "react-native";
import { Icon } from "react-native-elements";

const NavBar = ({ navigation, page }) => {
  const [listUnderLine, setListUnderLine] = useState();
  const [pantryUnderLine, setPantryUnderLine] = useState();
  const [recipeUnderLine, setRecipeUnderLine] = useState();

  const ChangeFocus = () => {
    if (page == "list") {
      setListUnderLine(styles.underLine);
    }
    if (page == "pantry") {
      setPantryUnderLine(styles.underLine);
    }
    if (page == "recipe") {
      setRecipeUnderLine(styles.underLine);
    }
  };

  useEffect(() => {
    ChangeFocus();
  }, []);
  return (
    <View
      style={[
        styles.container,
        {
          flexDirection: "row",
        },
      ]}
    >
      <Icon
        name="format-list-bulleted"
        type="materialicons"
        size={40}
        containerStyle={[listUnderLine]}
        onPress={() => {
          navigation.navigate("List");
        }}
      />
      <Icon
        name="fastfood"
        type="materialicons"
        size={40}
        containerStyle={[pantryUnderLine]}
        onPress={() => {
          navigation.navigate("Pantry");
        }}
      />
      <Icon
        name="book"
        type="feather"
        size={40}
        containerStyle={[recipeUnderLine]}
        onPress={() => {
          navigation.navigate("Recipe");
        }}
      />
    </View>
  );
};

export default NavBar;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "10%",
    borderColor: "#E7E7E7",
    borderStyle: "solid",
    borderTopWidth: 2,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "space-around",
  },
  underLine: {
    borderStyle: "solid",
    borderBottomWidth: 2,
    borderColor: "#BBBBBB",
  },
});
