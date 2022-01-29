import { useState } from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";
import AppLoading from "expo-app-loading";
import { useFonts } from "expo-font";

import NavBar from "../../components/NavBar";
import Header from "../../components/Header";
import ButtonBar from "../../components/ButtonBar";

const Create_Category = ({ navigation }) => {
  let [fontsLoaded, error] = useFonts({
    "Poppins-Regular": require("../../assets/fonts/Poppins-Regular.ttf"),
    "DancingScript-Regular": require("../../assets/fonts/DancingScript-Regular.ttf"),
  });

  const [category, setCategory] = useState();

  const handleSubmit = () => {};

  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return (
    <>
      <View style={styles.header}>
        <Header navigation={navigation} title={["Create Category", 45]} />
      </View>
      <View style={styles.body}>
        <View>
          <Text style={styles.form_Lable}>Category Name</Text>
          <TextInput
            style={styles.form_Input}
            onChangeText={setCategory}
            value={category}
          />
        </View>
      </View>

      <View style={styles.buttonBar}>
        <ButtonBar
          navigation={navigation}
          buttonInfo={[["add-circle-outline", "Category", handleSubmit]]}
        />
      </View>
      <View style={styles.NavBar}>
        <NavBar navigation={navigation} page={"list"} />
      </View>
    </>
  );
};

export default Create_Category;

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  header: {
    justifyContent: "flex-end",
    backgroundColor: "#fff",
    height: 115,
  },

  form_Lable: { margin: 10, fontSize: 20 },

  form_Input: {
    fontSize: 24,
    height: 45,
    width: 300,
    borderWidth: 1,
    paddingTop: 10,
    paddingLeft: 25,
    paddingBottom: 8,
    paddingRight: 10,
    borderRadius: 15,
  },
  buttonBar: {
    height: "12%",
    paddingRight: "10%",
    paddingTop: "5%",
    alignItems: "flex-end",
    backgroundColor: "#fff",
  },
  NavBar: {
    height: "10%",
  },
});
