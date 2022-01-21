import { StyleSheet, Text, View } from "react-native";
import { Icon } from "react-native-elements/dist/icons/Icon";

import { Inter_900Black } from "expo-font";

import NavBar from "../components/NavBar";

const List = ({ navigation }) => {
  return (
    <>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ fontFamily: "Inter-Black", fontSize: 40 }}>
          Inter Black
        </Text>
        <Text style={{ fontSize: 40 }}>Platform Default</Text>
      </View>
      <View style={styles.main}>
        <Text>test</Text>
      </View>

      <View style={styles.buttonBar}>
        <Icon
          name="add-circle-outline"
          type="materialicons"
          size={55}
          onPress={() => {
            navigation.navigate("Pantry");
          }}
        />
      </View>
      <View style={styles.NavBar}>
        <NavBar navigation={navigation} page={"list"} />
      </View>
    </>
  );
};

export default List;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonBar: {
    height: "12%",
    paddingRight: 20,
    paddingTop: 10,
    alignItems: "flex-end",
    backgroundColor: "#fff",
  },
  NavBar: {
    height: "10%",
  },
});
