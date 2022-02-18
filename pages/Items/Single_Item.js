import { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import Icon from "../../assets/icons/icon";

const Single_Item = ({ item, handleSubItemText, index }) => {
  const [itemCount, setItemCount] = useState(0);

  useEffect(() => {
    handleSubItemText(item.item, itemCount, index);
  }, [itemCount]);

  const handlePlus = () => {
    setItemCount(itemCount + 1);
  };

  const handleMinus = () => {
    setItemCount(itemCount - 1);
  };

  const HideAndShow = (styles) => {
    if (itemCount > 0) {
      return styles;
    } else {
      return { display: "none" };
    }
  };

  const ChangeBorderColor = () => {
    if (itemCount === 0) {
      return { borderColor: "#C4C4C4", borderWidth: 1 };
    } else {
      return {
        borderColor: "#66B99B",
        borderWidth: 2,
        backgroundColor: "#fff",
      };
    }
  };

  const ChangePlusBackgound = () => {
    if (itemCount > 0) {
      return {
        borderTopRightRadius: 18,
        borderBottomRightRadius: 18,
        borderColor: "#66B99B",
        borderWidth: 2,
        backgroundColor: "#97FFDA",
      };
    }
  };

  return (
    <View style={[styles.ItemView, ChangeBorderColor()]}>
      <View style={styles.ItemTextContainer}>
        <Text style={{ fontSize: 20 }}>{item.item}</Text>
        <View style={HideAndShow(styles.ItemCountContainer)}>
          <Icon
            style={{ paddingTop: 12, paddingRight: 10 }}
            name="x"
            size={10}
          />
          <Text style={{ fontSize: 20 }}> {itemCount}</Text>
        </View>
      </View>
      <View style={styles.Icons}>
        <View style={[styles.PlusIconContainer, ChangePlusBackgound()]}>
          <Icon name="plus" size={20} onPress={() => handlePlus()} />
        </View>

        <View style={HideAndShow()}>
          <Icon name="minus" size={20} onPress={() => handleMinus()} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  ItemView: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 10,
    fontSize: 24,
    height: 45,
    width: 300,
    paddingLeft: 25,
    borderRadius: 18,
  },
  ItemTextContainer: {
    flexDirection: "row",
    maxHeight: "66%",
    width: "66%",
    justifyContent: "space-between",
    paddingRight: 35,
  },
  ItemCountContainer: {
    flexDirection: "row",
  },
  Icons: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    alignItems: "center",
    width: "30%",
    height: "100%",
  },
  PlusIconContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: 45,
    width: 60,
    marginTop: -1,
    marginRight: -13,
  },
  Line: {
    alignItems: "center",
    borderRightWidth: 2,
    borderColor: "#66B99B",
    height: "100%",
  },
});

export default Single_Item;
