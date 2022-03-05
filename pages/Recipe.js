import { useState, useEffect } from "react";
import { StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";

import NavBar from "../components/NavBar";
import Header from "../components/Header";
import ButtonBar from "../components/ButtonBar";

const List = ({ navigation }) => {
  return (
    <>
      {/* ~~~~~~~~~~~~~~~~   HEADER  ~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
      <View style={styles.header}>
        <Header
          navigation={navigation}
          title={["Recipe", 50]}
          icons={[
            ["edit", "Category"],
            ["trash", ""],
          ]}
        />
      </View>
      {/* ~~~~~~~~~~~~~~~~   BODY  ~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
      <View style={styles.container}></View>
      {/* ~~~~~~~~~~~~~~~~   BUTTONBAR  ~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
      <View style={styles.buttonBar}></View>
      {/* ~~~~~~~~~~~~~~~~   NAVBAR  ~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
      <View style={styles.NavBar}>
        <NavBar navigation={navigation} page={"recipe"} />
      </View>
    </>
  );
};

export default List;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  header: {
    height: 100,
    justifyContent: "flex-end",
    backgroundColor: "#fff",
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
