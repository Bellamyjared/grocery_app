import { useState, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import Icon from "../assets/icons/icon";
import IconOnPress from "./IconOnPress";

const DisplayIcon = (listOfIcons, navigation) => {
  if (listOfIcons != null) {
    return listOfIcons.map((icon) => (
      <View
        key={Math.floor(Math.random() * 100) + icon[0]}
        style={{ paddingLeft: "15%" }}
      >
        <Icon
          name={icon[0]}
          size={30}
          onPress={() => {
            IconOnPress(icon, navigation);
          }}
        />
      </View>
    ));
  }
};

const Header = ({ navigation, title, icons }) => {
  const [widthSize, setWidthSize] = useState();
  const Test = () => {
    if (icons != null) {
      setWidthSize("75%");
    } else {
      setWidthSize("100%");
    }
  };

  useEffect(() => {
    Test();
  }, []);

  return (
    <View style={styles.header}>
      <View
        style={{
          backgroundColor: "#fff",
          flexDirection: "row",
          borderColor: "#E7E7E7",
          borderStyle: "solid",
          borderBottomWidth: 2,
        }}
      >
        <View
          style={{
            flexWrap: "nowrap",
            overflow: "visible",
            justifyContent: "flex-end",
            width: widthSize,
          }}
        >
          <Text
            style={{
              fontFamily: "DancingScript-Regular",
              fontSize: title[1],
            }}
          >
            {/* added space to buffer title padding as the font is to large for the actual font spacing */}
            {" " + title[0]}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row-reverse",
            alignItems: "center",
            width: "25%",
          }}
        >
          {DisplayIcon(icons, navigation)}
        </View>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    paddingLeft: "5%",
    paddingRight: "5%",
  },
});
