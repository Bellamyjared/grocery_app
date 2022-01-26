import { useState } from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";
import { Button } from "react-native-elements";

import Header from "../components/Header";
import NavBar from "../components/NavBar";
import ButtonBar from "../components/ButtonBar";

const Add_Ingredient = ({ navigation }) => {
  const [ingredient_text, setIngredient_text] = useState("test");

  const onSubmit = () => console.log("submit");

  const onCancel = () => navigation.goBack();

  return (
    <>
      {/* ~~~~~~~ Header ~~~~~~~~~~ */}

      <View style={styles.header}>
        <Header navigation={navigation} title={["Add Ingredient", 30]} />
      </View>
      {/* ~~~~~~~ Body ~~~~~~~~~~ */}

      <View style={styles.body}>
        <View style={{ paddingTop: 15 }}>
          <Text style={styles.form_Lable}>Ingredient</Text>
          <TextInput
            style={styles.form_Input}
            onChangeText={setIngredient_text}
            value={ingredient_text}
          />
        </View>
        <View style={{ paddingTop: 15 }}>
          <Text style={styles.form_Lable}>Ingredient</Text>
          <TextInput
            style={styles.form_Input}
            onChangeText={setIngredient_text}
            value={ingredient_text}
          />
        </View>
        <View style={{ paddingTop: 15, width: 300 }}>
          <Text style={styles.form_Lable}>Subclass</Text>
          <Button
            style={{ borderRadius: 20 }}
            onPress={() => console.log("add")}
            title="Add"
            buttonStyle={{
              backgroundColor: "#97FFDA",
              borderRadius: 15,
              width: 125,
            }}
            titleStyle={{
              color: "black",
              fontSize: 20,
            }}
          />
        </View>
      </View>

      {/* ~~~~~~~ Footer ~~~~~~~~~~ */}

      <View style={styles.buttonBar}>
        <ButtonBar
          navigation={navigation}
          buttonInfo={[
            ["check-circle-outline", "buttonFunction", onSubmit],
            ["exit-to-app", "buttonFunction", onCancel],
          ]}
        />
      </View>
      <View style={styles.NavBar}>
        <NavBar navigation={navigation} page={"list"} disabled={true} />
      </View>
    </>
  );
};

export default Add_Ingredient;

const styles = StyleSheet.create({
  header: {
    justifyContent: "flex-end",
    backgroundColor: "#fff",
    height: "15%",
  },

  body: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
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
