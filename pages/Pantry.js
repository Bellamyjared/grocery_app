import { StyleSheet, Text, View } from "react-native";
import NavBar from "../components/NavBar";

const Pantry = ({ navigation }) => {
  return (
    <>
      {/* ~~~~~~~~~~~~~~~~   HEADER  ~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
      {/* ~~~~~~~~~~~~~~~~   BODY  ~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
      <View style={styles.main}>
        <Text>test</Text>
      </View>
      {/* ~~~~~~~~~~~~~~~~   NAVBAR  ~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
      <View style={styles.NavBar}>
        <NavBar navigation={navigation} page={"pantry"} />
      </View>
    </>
  );
};

export default Pantry;

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
