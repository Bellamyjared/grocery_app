import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
  Alert,
} from "react-native";
import { Button } from "react-native-elements";

import Header from "../../components/Header";
import NavBar from "../../components/NavBar";
import ButtonBar from "../../components/ButtonBar";
import { PostItem } from "../../dbRequests/Item";
import SubItemForm from "../../components/SubItemForm";

const Add_Ingredient = ({ navigation }) => {
  const [item, setItem] = useState();
  const [categoryId, setCategoryId] = useState();
  const [subItems, setSubItems] = useState([]);
  const [subItemCount, setSubItemCount] = useState([]);
  const [count, setCount] = useState(0);

  // ************ HANDLE SUBITEM BUTTON ******************

  const handleAddButton = () => {
    setCount(count + 1);
    setSubItemCount([...subItemCount, count]);
    setSubItems([...subItems, null]);
  };

  let final = [];
  const handleSubItemText = (subText, count) => {
    if (subText != undefined) {
      let test = subItems;
      let test2 = [subItems[count]];
      test2 = subText;
      test[count] = test2;
      final = test;
    }
  };

  // this is temp, need to create custom messages in page for validation

  const tempError = () => {
    Alert.alert("ERROR", "Format issue");
  };
  const formValidation = () => {
    if (item === undefined || "") {
      tempError();
    } else if (categoryId === undefined || "") {
      tempError();
    } else {
      handleSubmit();
    }
  };
  //  ************* HANDLE SUBMITE ****************
  const handleSubmit = async () => {
    let newItem = {
      item: item,
      categoryId: categoryId,
    };
    if (subItems.length != 0) {
      // NEED FIXING
      if (final.length != 0 && final != [""]) {
        newItem = { ...newItem, subItems: final };
      } else {
        Alert.alert("ERROR", "format issue sub Item");
      }
    }
    if ((await PostItem(newItem)) === undefined) {
      console.log("test");
      Alert.alert(
        "ERROR",
        "An error occurred while creating your item. Please try again later"
      );
    } else {
      console.log(newItem);
      navigation.goBack();
    }
  };

  const handleBack = () => navigation.goBack();

  return (
    <>
      <ScrollView contentContainerStyle={styles.scrollView}>
        {/* ~~~~~~~ Header ~~~~~~~~~~ */}

        <View style={styles.header}>
          <Header navigation={navigation} title={["Create Item", 50]} />
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
            <Text style={styles.form_Lable}>Sub Item</Text>
            {subItemCount.map((count) => (
              <SubItemForm
                key={Math.floor(Math.random() * 100)}
                subItems={subItems}
                setSubItems={setSubItems}
                subItemCount={subItemCount}
                handleSubItemText={handleSubItemText}
                count={count}
              />
            ))}

            <Button
              style={{ borderRadius: 20 }}
              onPress={() => handleAddButton()}
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
              ["check-circle-outline", "buttonFunction", formValidation],
              ["exit-to-app", "buttonFunction", handleBack],
            ]}
          />
        </View>
      </ScrollView>
      <View style={styles.NavBar}>
        <NavBar navigation={navigation} page={"list"} disabled={true} />
      </View>
    </>
  );
};

export default Add_Ingredient;

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
  },
  header: {
    justifyContent: "flex-end",
    backgroundColor: "#fff",
    height: 115,
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
    height: 95,
    paddingTop: 20,
    paddingRight: 40,
    alignItems: "flex-end",
    backgroundColor: "#fff",
  },
  NavBar: {
    height: "10%",
  },
});
