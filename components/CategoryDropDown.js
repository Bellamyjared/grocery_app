import { useState, useEffect } from "react";
import { StyleSheet, Text, Pressable, View } from "react-native";
import Icon from "../assets/icons/icon";

const CategoryDropDown = ({ category, items }) => {
  const [ToggleDropDown, setToggleDropDown] = useState(false);
  const [itemSelectedCount, setItemSelectedCount] = useState(0);

  const handleToggleDropDown = () => {
    ToggleDropDown ? setToggleDropDown(false) : setToggleDropDown(true);
  };

  return (
    <View style={items.length != 0 ? styles.body : styles.Disabled}>
      <Pressable
        onPress={() => {
          handleToggleDropDown(items);
        }}
      >
        <View
          style={
            itemSelectedCount != items.length
              ? styles.CategoryContainer
              : [
                  styles.CategoryContainer,
                  { backgroundColor: "lightgreen", borderRadius: 5 },
                ]
          }
        >
          <Text style={styles.CategoryText}>{category.category}</Text>
          <Icon style={{ paddingLeft: 15 }} name={"drop_down"} size={15} />
          {itemSelectedCount === items.length ? (
            <Icon
              style={{
                paddingLeft: 80,
              }}
              name={"check_box_selected"}
              size={25}
            />
          ) : (
            <></>
          )}
        </View>
      </Pressable>
      <View>
        {items.map((item) => (
          <View
            key={item._id}
            style={
              ToggleDropDown === false
                ? { display: "flex" }
                : { display: "none" }
            }
          >
            <DropDownItem
              item={item}
              itemSelectedCount={itemSelectedCount}
              setItemSelectedCount={setItemSelectedCount}
            />
          </View>
        ))}
      </View>
    </View>
  );
};

export default CategoryDropDown;

const DropDownItem = ({ item, itemSelectedCount, setItemSelectedCount }) => {
  const [selected, setSelected] = useState(false);

  const singleItem = () => {
    return (
      <View style={styles.Item}>
        <Text style={styles.ItemText}>{item.item}</Text>
        <Icon style={styles.ItemX} name={"x"} size={10} />
        <Text style={styles.ItemText}>{item.quantity}</Text>
      </View>
    );
  };
  const mutilpleItems = () => {
    return (
      <View style={styles.Item}>
        <Text style={styles.ItemText}>{item.item}</Text>
        <Icon style={styles.ItemX} name={"x"} size={10} />
        <Text style={styles.ItemText}>{item.quantity}</Text>
      </View>
    );
  };

  const toggleDropDown = () => {
    if (selected) {
      setSelected(false);
      setItemSelectedCount(itemSelectedCount - 1);
    } else {
      setSelected(true);
      setItemSelectedCount(itemSelectedCount + 1);
    }
  };

  return (
    <Pressable
      onPress={() => {
        toggleDropDown();
      }}
    >
      <View
        style={
          selected
            ? [
                styles.ItemContainer,
                { backgroundColor: "lightgreen", borderRadius: 5 },
              ]
            : styles.ItemContainer
        }
      >
        <Icon
          style={styles.ItemCheckBox}
          name={selected ? "check_box_selected" : "Check_box"}
          size={20}
        />
        {item.subItem === null ? singleItem() : mutilpleItems()}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  body: { width: "80%", alignSelf: "center" },
  CategoryContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 0,
    paddingLeft: 15,
    marginTop: 15,
    borderRadius: 5,
  },

  ItemContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 0,
    marginTop: 5,
    marginBottom: 5,
  },
  Item: { flexDirection: "row", alignItems: "center" },
  ItemCheckBox: { paddingLeft: 15, paddingRight: 15 },
  ItemX: { paddingLeft: 15, paddingRight: 10 },
  Disabled: { display: "none" },

  CategoryText: { fontSize: 30, fontFamily: "Poppins-Regular" },
  ItemText: { fontSize: 20, fontFamily: "Poppins-Regular" },
});
