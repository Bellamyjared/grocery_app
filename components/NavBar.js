import { StyleSheet, View, Text } from "react-native";
import { Icon } from "react-native-elements";

const NavBar = ({ navigation }) => {
  return (
    <View>
      <Icon
        name="list-ul"
        type="font-awesome"
        onPress={() => {
          navigation.navigate("List");
        }}
      />
    </View>
  );
};

export default NavBar;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
