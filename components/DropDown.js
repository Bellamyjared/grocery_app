import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableHighlight,
  TouchableWithoutFeedback,
} from "react-native";

const DropDown = ({
  list,
  itemText,
  header,
  selected,
  selectedId,
  setToggleDisplay,
  ToggleDisplay,
}) => {
  if (list != undefined || list != null) {
    const ITEM_HEIGHT = 40;

    return (
      <View style={ToggleDisplay ? styles.Container : styles.Disabled}>
        <View style={styles.Body}>
          <View style={styles.Header}>
            <Text style={styles.HeaderText}> Select a {header}</Text>
          </View>
          <View style={{ flex: 1, width: "100%" }}>
            <ScrollView
              style={{
                width: "100%",
              }}
            >
              <View style={{}}>
                {list.map((item) => (
                  <TouchableHighlight
                    key={item._id}
                    activeOpacity={0.6}
                    underlayColor="#DDDDDD"
                    onPress={() => {
                      selected(item[itemText]);
                      selectedId(item._id);
                      setToggleDisplay(false);
                    }}
                  >
                    <View
                      style={{
                        height: ITEM_HEIGHT,
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Text>{item[itemText]}</Text>
                    </View>
                  </TouchableHighlight>
                ))}
              </View>
            </ScrollView>
          </View>
        </View>
        <View
          style={{
            flex: 1,
            width: "100%",
          }}
        >
          <TouchableWithoutFeedback onPress={() => setToggleDisplay(false)}>
            <View
              style={{
                width: "100%",
                height: "100%",
              }}
            ></View>
          </TouchableWithoutFeedback>
        </View>
      </View>
    );
  } else {
    return <></>;
  }
};

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    flexDirection: "column-reverse",
    alignItems: "center",
    position: "absolute",
    height: "100%",
    width: "100%",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  Body: {
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    height: 300,
    width: "100%",
  },
  Header: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: 40,
    borderBottomWidth: 1.5,
    borderBottomColor: "#e6e6e6",
  },
  HeaderText: { fontSize: 16, color: "#bababa" },
  List: { backgroundColor: "black" },
  Disabled: { display: "none" },
});

export default DropDown;
