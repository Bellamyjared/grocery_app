import { useState, useEffect } from "react";

import { StyleSheet, View } from "react-native";
import Icon from "../assets/icons/icon";

const NavBar = ({ navigation, page, disabled }) => {
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

  const disableIcons = () => {
    const infoList = [
      ["list", listUnderLine, "List"],
      ["fridge", pantryUnderLine, "Pantry"],
      ["recipe", recipeUnderLine, "Recipe"],
    ];

    return infoList.map((info) => (
      <Icon
        key={Math.floor(Math.random() * 100) + info[0]}
        name={info[0]}
        size={40}
        containerStyle={info[1]}
        onPress={() => {
          navigation.navigate(info[2]);
        }}
      />
    ));
  };

  return <View style={[styles.container]}>{disableIcons()}</View>;
};

export default NavBar;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
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
