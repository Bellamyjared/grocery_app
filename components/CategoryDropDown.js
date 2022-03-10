import { useState, useEffect } from "react";
import { StyleSheet, Text, Pressable, View } from "react-native";
import Icon from "../assets/icons/icon";

const CategoryDropDown = ({
  category,
  items,
  toggleDelete,
  handleDelete,
  handleSelectedItems,
  resetDropDown,
}) => {
  useEffect(() => {
    setItemSelectedCount(0);
  }, [resetDropDown]);
  const [ToggleDropDown, setToggleDropDown] = useState(false);
  const [itemSelectedCount, setItemSelectedCount] = useState(0);

  const handleToggleDropDown = () => {
    ToggleDropDown ? setToggleDropDown(false) : setToggleDropDown(true);
  };

  return (
    <View style={items.length != 0 ? styles.body : styles.Disabled}>
      <Pressable
        onPress={() => {
          handleToggleDropDown();
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
        {items.map((item, index) => (
          <View
            key={item._id}
            style={
              ToggleDropDown === true
                ? { display: "flex" }
                : { display: "none" }
            }
          >
            <DropDownItem
              item={item}
              itemSelectedCount={itemSelectedCount}
              setItemSelectedCount={setItemSelectedCount}
              toggleDelete={toggleDelete}
              handleDelete={handleDelete}
              handleSelectedItems={handleSelectedItems}
              resetDropDown={resetDropDown}
            />
          </View>
        ))}
      </View>
    </View>
  );
};

export default CategoryDropDown;

const DropDownItem = ({
  item,
  itemSelectedCount,
  setItemSelectedCount,
  toggleDelete,
  handleDelete,
  handleSelectedItems,
  resetDropDown,
}) => {
  useEffect(() => {
    setSubItemSelectedCount(0);
  }, [resetDropDown]);
  const [selected, setSelected] = useState(false);
  const [subItemSelectedCount, setSubItemSelectedCount] = useState(0);
  const [test, setTest] = useState(false);

  const toggleSelectedSubItems = () => {
    if (subItemSelectedCount === Object.keys(item.subItem).length - 1) {
      setItemSelectedCount(itemSelectedCount + 1);
      setTest(true);
    } else {
      if (test) {
        setItemSelectedCount(itemSelectedCount - 1);
        setTest(false);
      }
    }
  };

  const toggleSelectedItems = (item) => {
    if (selected) {
      setSelected(false);
      setItemSelectedCount(itemSelectedCount - 1);
      handleSelectedItems(null, item._id);
    } else {
      setSelected(true);
      setItemSelectedCount(itemSelectedCount + 1);
      handleSelectedItems(item);
    }
  };

  if (item.subItem === null) {
    return (
      <Item
        item={item}
        itemText={item.item}
        itemQuantity={item.quantity}
        selected={selected}
        toggleSelectedItems={toggleSelectedItems}
        toggleDelete={toggleDelete}
        handleDelete={handleDelete}
        handleSelectedItems={handleSelectedItems}
      />
    );
  } else {
    return (
      <MultipleItems
        item={item}
        toggleSelectedSubItems={toggleSelectedSubItems}
        subItemSelectedCount={subItemSelectedCount}
        setSubItemSelectedCount={setSubItemSelectedCount}
        toggleDelete={toggleDelete}
        handleDelete={handleDelete}
        handleSelectedItems={handleSelectedItems}
      />
    );
  }
};

const MultipleItems = ({
  item,
  subItemSelectedCount,
  setSubItemSelectedCount,
  toggleSelectedSubItems,
  toggleDelete,
  handleDelete,
  handleSelectedItems,
}) => {
  const handleSubItems = (item) => {
    let tempSubItemList = [];
    for (const property in item.subItem) {
      tempSubItemList = [
        ...tempSubItemList,
        <SubItems
          key={item._id + property}
          item={item}
          subItem={property}
          quantity={item.subItem[property]}
          itemSelectedCount={subItemSelectedCount}
          setItemSelectedCount={setSubItemSelectedCount}
          toggleSelectedSubItems={toggleSelectedSubItems}
          toggleDelete={toggleDelete}
          handleDelete={handleDelete}
          handleSelectedItems={handleSelectedItems}
        />,
      ];
    }
    return tempSubItemList;
  };
  return (
    <View
      style={
        subItemSelectedCount === Object.keys(item.subItem).length
          ? styles.SelectedMultiContainer
          : styles.MultiContainer
      }
    >
      <Text style={styles.ItemText}>{item.item}</Text>
      {handleSubItems(item)}
    </View>
  );
};

const SubItems = ({
  item,
  subItem,
  quantity,
  itemSelectedCount,
  setItemSelectedCount,
  toggleSelectedSubItems,
  toggleDelete,
  handleDelete,
  handleSelectedItems,
}) => {
  const [selected, setSelected] = useState(false);

  const toggleSelectedItems = (item, subItem, quantity) => {
    if (selected) {
      setSelected(false);
      setItemSelectedCount(itemSelectedCount - 1);
      handleSelectedItems(item, item._id, subItem, quantity);
    } else {
      setSelected(true);
      setItemSelectedCount(itemSelectedCount + 1);
      handleSelectedItems(item, item._id, subItem, quantity);
    }
    toggleSelectedSubItems();
  };

  return (
    <Item
      item={item}
      itemText={subItem}
      itemQuantity={quantity}
      selected={selected}
      toggleSelectedItems={toggleSelectedItems}
      toggleDelete={toggleDelete}
      handleDelete={handleDelete}
      handleSelectedItems={handleSelectedItems}
    />
  );
};

const Item = ({
  item,
  itemText,
  itemQuantity,
  selected,
  toggleSelectedItems,
  toggleDelete,
  handleDelete,
}) => {
  return (
    <Pressable
      onPress={() => {
        if (toggleDelete) {
          handleDelete(item, itemText);
        } else {
          toggleSelectedItems(item, itemText, itemQuantity);
        }
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
        <View
          style={
            toggleDelete
              ? [
                  styles.Item,
                  {
                    minWidth: 200,
                    borderBottomWidth: 1,
                    borderColor: "#D0D0D0",
                  },
                ]
              : styles.Item
          }
        >
          {toggleDelete ? (
            <View style={styles.ItemCheckBox}></View>
          ) : (
            <Icon
              style={styles.ItemCheckBox}
              name={selected ? "check_box_selected" : "Check_box"}
              size={20}
            />
          )}

          <Text style={styles.ItemText}>{itemText}</Text>
          <Icon style={styles.ItemX} name={"x"} size={10} />
          <Text style={styles.ItemText}>{itemQuantity}</Text>
          {toggleDelete ? (
            <Icon style={styles.ItemCheckBox} name={"x_circle"} size={20} />
          ) : (
            <></>
          )}
        </View>
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
  MultiContainer: { paddingLeft: 15, borderRadius: 0 },
  SelectedMultiContainer: {
    paddingLeft: 15,
    backgroundColor: "lightgreen",
    borderRadius: 5,
  },
  ItemCheckBox: { paddingLeft: 15, paddingRight: 15 },
  ItemX: { paddingLeft: 15, paddingRight: 10 },
  Disabled: { display: "none" },

  CategoryText: { fontSize: 30, fontFamily: "Poppins-Regular" },
  ItemText: { fontSize: 20, fontFamily: "Poppins-Regular" },
});
