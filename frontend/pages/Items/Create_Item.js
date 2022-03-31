// NEED TO ADD DELETE SUB ITEM BUTTON
import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
  Alert,
  TouchableWithoutFeedback,
} from "react-native";
import { Button } from "react-native-elements";

import Header from "../../components/Header";
import ButtonBar from "../../components/ButtonBar";
import { PostItem } from "../../dbRequests/Item";
import SubItemForm from "../../components/SubItemForm";
import ChangeNavStack from "../../components/ChangeNavStack";
import Picker from "../../components/Picker";

const Create_Item = ({ route, navigation }) => {
  const { categories, OriginRoute, userData } = route.params; // grab props from route

  const [item, setItem] = useState();
  const [categoryId, setCategoryId] = useState();
  const [categoryText, setCategoryText] = useState();
  const [toggleDropDown, setToggleDropDown] = useState(false);
  const [subItems, setSubItems] = useState([]);
  const [subItemCount, setSubItemCount] = useState([]);
  const [count, setCount] = useState(0);
  console.log(subItemCount);

  // ************ HANDLE SUBITEM BUTTON ******************

  const handleAddButton = () => {
    setCount(count + 1);
    setSubItemCount([...subItemCount, count]);
    setSubItems([...subItems, null]);
  };

  let final = [];
  const handleSubItemText = (subText, count) => {
    if (subText != undefined) {
      let ItemList = subItems;
      let subItem = [subItems[count]];
      subItem = subText;
      ItemList[count] = subItem;
      final = ItemList;
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
      userId: userData.id,
      item: item,
      categoryId: categoryId,
    };
    // need to create actual text handling, but machanics work for now
    if (subItems.length != 0) {
      if (final.length != 0 && final != [""]) {
        newItem = { ...newItem, subItems: final };
      } else {
        Alert.alert("ERROR", "format issue sub Item");
      }
    }
    console.log(newItem);
    if ((await PostItem(newItem)) === undefined) {
      Alert.alert(
        "ERROR",
        "An error occurred while creating your item. Please try again later"
      );
    } else {
      ChangeNavStack(navigation, ["Add_Items", "Create_Item"]);
      navigation.push("Add_Items", {
        categories: categories,
        OriginRoute: OriginRoute,
        userData: userData,
      });
    }
  };

  const handleBack = () => navigation.goBack();

  return (
    <>
      <ScrollView contentContainerStyle={styles.scrollView}>
        {/* ~~~~~~~~~~~~~~~~   HEADER  ~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
        <View style={styles.header}>
          <Header navigation={navigation} title={["Create Item", 50]} />
        </View>
        {/* ~~~~~~~~~~~~~~~~   BODY  ~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
        <View style={styles.body}>
          <View style={{ paddingTop: 15 }}>
            <Text style={styles.form_Lable}>Item</Text>
            <TextInput
              style={styles.form_Input}
              onChangeText={setItem}
              value={item}
            />
          </View>
          <View style={{ paddingTop: 15, width: 300 }}>
            <Text style={styles.form_Lable}>Category</Text>
            <TouchableWithoutFeedback onPress={() => setToggleDropDown(true)}>
              <Text style={styles.form_Input}>{categoryText}</Text>
            </TouchableWithoutFeedback>
          </View>
          <View style={{ paddingTop: 15, paddingBottom: 30, width: 300 }}>
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

        {/* ~~~~~~~~~~~~~~~~   BUTTONBAR  ~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
      </ScrollView>
      <View style={styles.buttonBar}>
        <ButtonBar
          navigation={navigation}
          buttonInfo={[
            ["check_mark_circle", "buttonFunction", formValidation],
            ["back_circle", "buttonFunction", handleBack],
          ]}
        />
      </View>
      <Picker
        list={categories}
        header="Category"
        itemText="category"
        selected={setCategoryText}
        selectedId={setCategoryId}
        ToggleDisplay={toggleDropDown}
        setToggleDisplay={setToggleDropDown}
      />
    </>
  );
};

export default Create_Item;

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
    height: 80,
    paddingTop: 10,
    paddingRight: 40,
    alignItems: "flex-end",
    backgroundColor: "#fff",
    borderColor: "#E7E7E7",
    borderStyle: "solid",
    borderTopWidth: 2,
    backgroundColor: "#fff",
  },
});