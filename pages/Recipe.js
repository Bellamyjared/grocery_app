import { StatusBar } from "expo-status-bar";
import { StyleSheet, Button, Text, View } from "react-native";
import NavBar from "../components/NavBar";

const Recipe = ({ navigation }) => {
  return (
    <>
      <View style={styles.main}>
        <Text>test</Text>
      </View>
      <View style={styles.NavBar}>
        <NavBar navigation={navigation} page={"recipe"} />
      </View>
    </>
  );
};

export default Recipe;

const styles = StyleSheet.create({
  main: {
    flex: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  NavBar: {
    height: "10%",
  },
});
