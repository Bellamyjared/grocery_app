import { View, Text, StyleSheet } from "react-native";
import Button from "./Button";

const AddItemScreen = ({
  BodyText,
  buttonNavigation,
  ButtonNavigate,
  ButtonPassProps,
}) => {
  return (
    <View style={styles.AddItemBody}>
      <Text style={styles.AddItemText}>{BodyText}</Text>
      <Button
        navigation={buttonNavigation}
        navigate={ButtonNavigate}
        passProps={ButtonPassProps}
        text="Add"
        fontSize={25}
        fontColor="black"
      />
    </View>
  );
};

export default AddItemScreen;

const styles = StyleSheet.create({
  AddItemBody: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  AddItemText: {
    textAlign: "center",
    fontSize: 30,
    paddingBottom: 20,
  },
});
