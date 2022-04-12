import { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  TouchableWithoutFeedbackBase,
  View,
} from "react-native";
import Icon from "../../assets/icons/icon";

const Items_Container = ({
  item,
  index,
  headerStatus,
  handleSelectedItemList,
  handleDelete,
  handleEdit,
  filterItems,
}) => {
  const initiateItemCount = () => {
    if (item.subItems.length > 0) {
      let temp = { [item.item]: {}, categoryId: item.categoryId };

      item.subItems.forEach((subItem) => (temp[item.item][subItem] = 0));
      return temp;
    } else {
      return { [item.item]: 0, categoryId: item.categoryId };
    }
  };
  const [itemCount, setItemCount] = useState(initiateItemCount());
  const [toggleSubItemDropDown, setToggleSubItemDropDown] = useState(false);
  const [ChangeMultiItemBorder, setChangeMultiItemBorder] = useState(0);
  const [itemHeight, setItemHeight] = useState(0);
  const [subItemHeight, setSubItemHeight] = useState([]);

  useEffect(() => {
    handleSelectedItemList(item.item, itemCount, index);
  }, [itemCount]);

  const handlePlus = (subItemText, subItemIndex) => {
    // single item
    if (subItemText === item.item) {
      setItemCount({
        [subItemText]: itemCount[subItemText] + 1,
        categoryId: item.categoryId,
      });
    } else {
      // multi Item
      setChangeMultiItemBorder(ChangeMultiItemBorder + 1);
      var temp;
      temp = itemCount[item.item];
      temp[subItemText] = itemCount[item.item][subItemText] + 1;

      setItemCount({ [item.item]: temp, categoryId: item.categoryId });
    }
  };

  const handleMinus = (subItemText, subItemIndex) => {
    if (subItemText === item.item) {
      if (itemCount[subItemText] > 0) {
        setItemCount({
          [subItemText]: itemCount[subItemText] - 1,
          categoryId: item.categoryId,
        });
      }
    } else {
      if (itemCount[item.item][subItemText] > 0) {
        setChangeMultiItemBorder(ChangeMultiItemBorder - 1);
        var temp;
        temp = itemCount[item.item];
        temp[subItemText] = itemCount[item.item][subItemText] - 1;

        setItemCount({ [item.item]: temp, categoryId: item.categoryId });
      }
    }
  };

  const HideAndShow = (styles, subItemText, subItemIndex) => {
    if (subItemText === item.item) {
      if (itemCount[subItemText] > 0) {
        return styles;
      } else {
        return { display: "none" };
      }
    } else {
      // only update if visable
      if (toggleSubItemDropDown) {
        if (itemCount[item.item][subItemText] > 0) {
          return styles;
        } else {
          return { display: "none" };
        }
      }
    }
  };

  const ChangeBorderColor = (subItemText, subItemIndex) => {
    if (subItemText === item.item) {
      if (itemCount[subItemText] === 0) {
        return { borderColor: "#C4C4C4", borderWidth: 1 };
      } else {
        return {
          borderColor: "#66B99B",
          borderWidth: 2,
          backgroundColor: "#fff",
        };
      }
    } else {
      if (toggleSubItemDropDown) {
        if (itemCount[item.item][subItemText] === 0) {
          return { borderColor: "#C4C4C4", borderWidth: 1, borderRadius: 18 };
        } else {
          return {
            borderColor: "#66B99B",
            borderWidth: 2,
            backgroundColor: "#fff",
            borderRadius: 18,
          };
        }
      }
    }
  };

  const ChangePlusBackgound = (ItemText, subItemIndex, subItemHeight) => {
    if (ItemText === item.item) {
      if (itemCount[ItemText] > 0) {
        return {
          borderTopRightRadius: 18,
          borderBottomRightRadius: 18,
          borderColor: "#66B99B",
          borderWidth: 2,
          backgroundColor: "#97FFDA",
        };
      }
    } else {
      if (toggleSubItemDropDown) {
        if (itemCount[item.item][ItemText] > 0) {
          return {
            height: subItemHeight[subItemIndex],
            position: "absolute",
            borderTopRightRadius: 18,
            borderBottomRightRadius: 18,
            borderColor: "#66B99B",
            borderWidth: 2,
            backgroundColor: "#97FFDA",
          };
        } else {
          return {
            width: 50,
          };
        }
      }
    }
  };

  const ChangeItemHeight = (height) => {
    return { height: height, position: "absolute" };
  };

  const handleIcons = (subItem, subIndex, multiItem) => {
    if (headerStatus === "Edit") {
      if (multiItem != "multiItem") {
        return (
          <Icon name="edit_arrow" size={25} onPress={() => handleEdit(item)} />
        );
      } else return <></>;
    } else if (headerStatus === "Delete") {
      if (multiItem != "multiItem") {
        return (
          <Icon
            name="x_circle"
            size={25}
            onPress={() => handleDelete(item._id, item.item)}
          />
        );
      } else return <></>;
    } else {
      return (
        <Icon
          name="plus"
          size={20}
          onPress={() => handlePlus(subItem, subIndex)}
        />
      );
    }
  };

  const showSubItems = () => {
    if (toggleSubItemDropDown) {
      setToggleSubItemDropDown(false);
    } else {
      setToggleSubItemDropDown(true);
    }
  };

  const handleMultiItemIcon = () => {
    if (headerStatus === "Edit") {
      return (
        <Icon name="edit_arrow" size={25} onPress={() => handleEdit(item)} />
      );
    } else if (headerStatus === "Delete") {
      return (
        <Icon
          style={{ marginRight: -3 }}
          name="x_circle"
          size={25}
          onPress={() => handleDelete(item._id, item.item)}
        />
      );
    } else {
      return <Icon name="drop_down" size={15} />;
    }
  };

  const disableFilteredItems = () => {
    const items = filterItems();
    if (items != null) {
      return items.includes(item._id);
    } else return true;
  };

  const onLayout = (event) => {
    const { height } = event.nativeEvent.layout;
    setItemHeight(height);
  };
  const onSubItemLayout = (event, index) => {
    const { height } = event.nativeEvent.layout;
    let tempList = subItemHeight;
    tempList[index] = height;
    setSubItemHeight(tempList);
  };

  const singleItem = () => {
    return (
      <View
        style={[styles.ItemView, ChangeBorderColor(item.item)]}
        onLayout={onLayout}
      >
        <View
          style={
            itemCount[item.item] === 0
              ? styles.ItemTextContainer
              : [styles.ItemTextContainer, { width: "70%" }]
          }
        >
          <View style={itemCount[item.item] != 0 && { width: "70%" }}>
            <Text style={styles.Font}>{item.item}</Text>
          </View>
          <View style={HideAndShow(styles.ItemCountContainer, item.item)}>
            <Icon
              style={{ paddingTop: 12, paddingRight: 10 }}
              name="x"
              size={10}
            />

            <Text style={styles.Font}> {itemCount[item.item]}</Text>
          </View>
        </View>
        <View
          style={
            itemCount[item.item] === 0
              ? styles.Icons
              : [styles.Icons, { width: "30%" }]
          }
        >
          <View
            style={[
              styles.PlusIconContainer,
              ChangePlusBackgound(item.item),
              ChangeItemHeight(itemHeight),
            ]}
          >
            {handleIcons(item.item)}
          </View>

          <View style={HideAndShow(styles.MinusButton, item.item)}>
            <Icon
              name="minus"
              size={20}
              onPress={() => handleMinus(item.item)}
            />
          </View>
        </View>
      </View>
    );
  };

  const itemWithSubItems = () => {
    return (
      <>
        <View
          style={
            ChangeMultiItemBorder != 0
              ? styles.HighLightedMultiItemContainer
              : styles.MultiItemContainer
          }
          onLayout={onLayout}
        >
          <TouchableWithoutFeedback
            style={ChangeItemHeight(itemHeight)}
            onPress={() => showSubItems()}
          >
            <View style={styles.MultiItemTitleContainer}>
              <View style={styles.MultiItemTitle}>
                <Text style={styles.Font}>{item.item}</Text>
              </View>
              {handleMultiItemIcon()}
            </View>
          </TouchableWithoutFeedback>
          <View
            style={
              toggleSubItemDropDown
                ? styles.SubItemContainer
                : { display: "none" }
            }
          >
            {item.subItems.map((subItemText, subIndex) => (
              <View
                key={subIndex + subItemText}
                style={[
                  styles.ItemView,
                  ChangeBorderColor(subItemText, subIndex),
                ]}
                onLayout={(event) => {
                  onSubItemLayout(event, subIndex);
                }}
              >
                <View
                  style={
                    itemCount[item.item][subItemText] > 0
                      ? [
                          styles.ItemTextContainer,
                          {
                            width: "70%",
                          },
                        ]
                      : [styles.ItemTextContainer]
                  }
                >
                  <View
                    style={
                      itemCount[item.item][subItemText] > 0
                        ? { maxWidth: "70%" }
                        : { maxWidth: "100%" }
                    }
                  >
                    <Text style={styles.Font}>{subItemText}</Text>
                  </View>
                  <View
                    style={HideAndShow(
                      styles.ItemCountContainer,
                      subItemText,
                      subIndex
                    )}
                  >
                    <Icon
                      style={{ paddingTop: 12, paddingRight: 10 }}
                      name="x"
                      size={10}
                    />
                    <Text style={styles.Font}>
                      {itemCount[item.item][subItemText]}
                    </Text>
                  </View>
                </View>
                <View
                  style={
                    itemCount[item.item][subItemText] > 0
                      ? [
                          styles.Icons,
                          {
                            width: "30%",
                          },
                        ]
                      : [styles.Icons]
                  }
                >
                  <View
                    style={[
                      styles.PlusIconContainer,
                      ChangePlusBackgound(subItemText, subIndex, subItemHeight),
                    ]}
                  >
                    {handleIcons(subItemText, subIndex, "multiItem")}
                  </View>

                  <View
                    style={HideAndShow(
                      styles.MinusButton,
                      subItemText,
                      subIndex
                    )}
                  >
                    <Icon
                      name="minus"
                      size={20}
                      onPress={() => handleMinus(subItemText, subIndex)}
                    />
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>
      </>
    );
  };

  // return
  if (disableFilteredItems() === true) {
    if (item.subItems.length === 0) {
      return singleItem();
    } else {
      return itemWithSubItems();
    }
  } else {
    return <></>;
  }
};

const styles = StyleSheet.create({
  // Single Item
  ItemView: {
    flexDirection: "row",
    alignItems: "center",
    minHeight: 45,
    marginTop: 10,
    marginBottom: 10,
    paddingLeft: 25,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 18,
    maxWidth: "100%",
  },
  ItemTextContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "80%",
  },
  ItemCountContainer: {
    flexDirection: "row",
    paddingRight: 15,
  },
  Icons: {
    flexDirection: "row-reverse",
    alignItems: "center",
    width: "15%",
  },
  PlusIconContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: "60%",
    marginRight: -2,
    marginLeft: 10,
  },

  MinusButton: {
    width: "100%",
    alignItems: "flex-start",
  },

  Disabled: {
    display: "none",
  },
  Font: {
    fontSize: 20,
  },

  // Multi Items
  HighLightedMultiItemContainer: {
    paddingTop: 5,
    paddingBottom: 5,
    alignItems: "center",
    borderWidth: 2,
    borderRadius: 18,
    borderColor: "#66B99B",
    marginTop: 10,
    marginBottom: 10,
  },
  MultiItemContainer: {
    justifyContent: "center",
    minHeight: 45,
    paddingTop: 5,
    paddingBottom: 5,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#C4C4C4",
    borderRadius: 18,
    marginTop: 10,
    marginBottom: 10,
  },
  MultiItemTitleContainer: {
    paddingLeft: 20,
    paddingRight: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  MultiItemTitle: {
    maxWidth: "85%",
  },
  SubItemContainer: {
    alignItems: "center",
  },
});

export default Items_Container;
