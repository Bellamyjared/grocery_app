import { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  TouchableWithoutFeedbackBase,
  View,
} from "react-native";
import Icon from "../../assets/icons/icon";

const Single_Item = ({
  item,
  index,
  headerStatus,
  handleSubItemText,
  handleDelete,
  handleEdit,
  filterItems,
}) => {
  const initiateItemCount = () => {
    if (item.subItems.length > 0) {
      return item.subItems.map((subItem) => ({ [subItem]: 0 }));
    } else {
      return { [item.item]: 0 };
    }
  };
  const [itemCount, setItemCount] = useState(initiateItemCount());
  const [toggleSubItemDropDown, setToggleSubItemDropDown] = useState(false);

  useEffect(() => {
    handleSubItemText(itemCount, index);
    console.log(itemCount);
  }, [itemCount]);

  const handlePlus = (subItemText, subItemIndex) => {
    // single item
    if (subItemText === item.item) {
      setItemCount({ [subItemText]: itemCount[subItemText] + 1 });
    } else {
      // multi Item
      var temp;
      temp = [...itemCount];
      temp[0][subItemText] = itemCount[0][subItemText] + 1;

      setItemCount(temp);
    }
  };

  const handleMinus = (subItemText, subItemIndex) => {
    if (subItemText === item.item) {
      setItemCount({ [subItemText]: itemCount[subItemText] - 1 });
    }
  };

  const HideAndShow = (styles, subItemText, subItemIndex) => {
    if (itemCount[subItemText] > 0) {
      return styles;
    } else {
      return { display: "none" };
    }
  };

  const ChangeBorderColor = (subItemText, subItemIndex) => {
    if (subItemText != item.item) {
      if (itemCount[subItemText] > 0) {
        return { borderColor: "#C4C4C4", borderWidth: 1 };
      } else {
        return {
          borderColor: "#66B99B",
          borderWidth: 2,
          backgroundColor: "#fff",
        };
      }
    } else {
      // if single item
      if (itemCount[subItemText] === 0) {
        return { borderColor: "#C4C4C4", borderWidth: 1 };
      } else {
        return {
          borderColor: "#66B99B",
          borderWidth: 2,
          backgroundColor: "#fff",
        };
      }
    }
  };

  const ChangePlusBackgound = (subItemText, subItemIndex) => {
    if (subItemText != item.item) {
      if (itemCount[subItemText] > 0) {
        return {
          borderTopRightRadius: 18,
          borderBottomRightRadius: 18,
          borderColor: "#66B99B",
          borderWidth: 2,
          backgroundColor: "#97FFDA",
        };
      }
    } else {
      if (itemCount[subItemText] > 0) {
        return {
          borderTopRightRadius: 18,
          borderBottomRightRadius: 18,
          borderColor: "#66B99B",
          borderWidth: 2,
          backgroundColor: "#97FFDA",
        };
      }
    }
  };

  const showSubItems = () => {
    if (toggleSubItemDropDown) {
      setToggleSubItemDropDown(false);
    } else {
      setToggleSubItemDropDown(true);
    }
  };

  const handleIcons = (subItem) => {
    if (headerStatus === "Edit") {
      return (
        <Icon name="edit_arrow" size={25} onPress={() => handleEdit(item)} />
      );
    } else if (headerStatus === "Delete") {
      return (
        <Icon
          name="x_circle"
          size={25}
          onPress={() => handleDelete(item._id, item.item)}
        />
      );
    } else {
      return <Icon name="plus" size={20} onPress={() => handlePlus(subItem)} />;
    }
  };

  const disableFilteredItems = () => {
    const items = filterItems();
    if (items != null) {
      return items.includes(item._id);
    } else return true;
  };

  const singleItem = () => {
    return (
      <View style={[styles.ItemView, ChangeBorderColor(item.item)]}>
        <View style={styles.ItemTextContainer}>
          <Text style={styles.Font}>{item.item}</Text>
          <View style={HideAndShow(styles.ItemCountContainer, item.item)}>
            <Icon
              style={{ paddingTop: 12, paddingRight: 10 }}
              name="x"
              size={10}
            />
            <Text style={{ fontSize: 20 }}> {itemCount[item.item]}</Text>
          </View>
        </View>
        <View style={styles.Icons}>
          <View
            style={[styles.PlusIconContainer, ChangePlusBackgound(item.item)]}
          >
            {handleIcons(item.item)}
          </View>

          <View style={HideAndShow(styles.ItemCountContainer, item.item)}>
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
        <View style={[styles.MultiItemContainer, ChangeBorderColor()]}>
          <TouchableWithoutFeedback onPress={() => showSubItems()}>
            <View style={[styles.MultiItemTitle]}>
              <Text style={styles.Font}>{item.item}</Text>
              <Icon name="drop_down" size={15} />
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
                keys={subIndex}
                style={[
                  styles.ItemView,
                  ChangeBorderColor(subItemText, subIndex),
                ]}
              >
                <View style={styles.ItemTextContainer}>
                  <Text style={styles.Font}>{subItemText}</Text>
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
                    <Text style={styles.Font}>{itemCount[subItemText]}</Text>
                  </View>
                </View>
                <View style={styles.Icons}>
                  <View
                    style={[
                      styles.PlusIconContainer,
                      ChangePlusBackgound(subItemText, subIndex),
                    ]}
                  >
                    {handleIcons(subItemText, subIndex)}
                  </View>

                  <View style={HideAndShow(subItemText, subIndex)}>
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
  ItemView: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 10,
    height: 45,
    paddingLeft: 25,
    borderRadius: 18,
  },
  ItemTextContainer: {
    flex: 2,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  ItemCountContainer: {
    flexDirection: "row",
    paddingRight: 5,
  },
  Icons: {
    flex: 1,
    flexDirection: "row-reverse",
    alignItems: "center",
    height: "100%",
  },
  PlusIconContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: "110%",
    width: "60%",
    marginRight: -2,
    marginLeft: 10,
  },

  Disabled: {
    display: "none",
  },
  Font: {
    fontSize: 20,
  },

  MultiItemContainer: {
    paddingLeft: 20,
    paddingRight: 20,
    alignItems: "center",
    borderWidth: 1.5,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 18,
  },
  MultiItemTitle: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    width: "100%",
    height: 40,
  },
  SubItemContainer: {
    alignItems: "center",
  },
});

export default Single_Item;
