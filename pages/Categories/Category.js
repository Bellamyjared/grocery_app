import { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useIsFocused } from "@react-navigation/native";

import { GetCategory } from "../../dbRequests/Category";
import NavBar from "../../components/NavBar";
import Header from "../../components/Header";
import ButtonBar from "../../components/ButtonBar";

const Category = ({ navigation }) => {
  const [categories, setCategories] = useState([]);

  const isFocused = useIsFocused();

  useEffect(() => {
    handleGetItems();
  }, [isFocused]);

  const handleGetItems = async () => {
    data = await GetCategory();
    setCategories(data);
  };

  const handleBack = () => navigation.goBack();

  const handleSubmit = () => {
    console.log("submit");
  };

  return (
    <>
      <View style={styles.header}>
        <Header
          navigation={navigation}
          title={["Category", 50]}
          icons={[["trash", "trash"]]}
        />
      </View>
      <View style={styles.container}>
        {categories.map((category) => (
          <Text>{category.category}</Text>
        ))}
      </View>

      <View style={styles.buttonBar}>
        <ButtonBar
          navigation={navigation}
          buttonInfo={[
            ["check-circle-outline", "buttonFunction", handleSubmit],
            ["add-circle-outline", "Create_Category"],
            ["exit-to-app", "buttonFunction", handleBack],
          ]}
        />
      </View>
      <View style={styles.NavBar}>
        <NavBar navigation={navigation} page={"list"} disabled={true} />
      </View>
    </>
  );
};

export default Category;

const styles = StyleSheet.create({
  container: {
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
  text: { fontFamily: "Poppins-Regular", fontSize: 50 },

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
