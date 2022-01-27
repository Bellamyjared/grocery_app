//  TO DO
// subclass
// category selection

import { useState } from "react";
import { StyleSheet, Text, View, TextInput, Alert } from "react-native";
import { Button } from "react-native-elements";

import Header from "../components/Header";
import NavBar from "../components/NavBar";
import ButtonBar from "../components/ButtonBar";
import { PostItem } from "../dbRequests/Item";

const Add_Ingredient = ({ navigation }) => {
  const [item, setItem] = useState();
  const [categoryId, setCategoryId] = useState();
  const [subItem, setSubItem] = useState(["test1"]);

  const handleSubmit = async () => {
    let newItem = {
      item: item,
      categoryId: categoryId,
    };

    if (subItem != undefined) {
      newItem = { ...newItem, subItem: subItem };
    }

    const ItemId = PostItem(newItem);
    if ((await ItemId) === undefined) {
      Alert.alert(
        "ERROR",
        "An error occurred while creating your item. Please try again later"
      );
    } else {
      navigation.goBack();
    }
  };

  const onCancel = () => navigation.goBack();

  return (
    <>
      {/* ~~~~~~~ Header ~~~~~~~~~~ */}

      <View style={styles.header}>
        <Header navigation={navigation} title={["Create Item", 30]} />
      </View>
      {/* ~~~~~~~ Body ~~~~~~~~~~ */}

      <View style={styles.body}>
        <View style={{ paddingTop: 15 }}>
          <Text style={styles.form_Lable}>Item</Text>
          <TextInput
            style={styles.form_Input}
            onChangeText={setItem}
            value={item}
          />
        </View>
        <View style={{ paddingTop: 15 }}>
          <Text style={styles.form_Lable}>Category</Text>
          <TextInput
            style={styles.form_Input}
            onChangeText={setCategoryId}
            value={categoryId}
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
              width: 115,
              height: 50,
            }}
            titleStyle={{
              color: "black",
              fontSize: 25,
            }}
          />
        </View>
      </View>

      {/* ~~~~~~~ Footer ~~~~~~~~~~ */}

      <View style={styles.buttonBar}>
        <ButtonBar
          navigation={navigation}
          buttonInfo={[
            ["check-circle-outline", "buttonFunction", handleSubmit],
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
