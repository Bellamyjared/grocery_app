import { useState, useEffect } from "react";
import { StyleSheet, View, Text, StatusBar } from "react-native";
import Icon from "../assets/icons/icon";
import IconOnPress from "./IconOnPress";

const HandleIcon = (listOfIcons, navigation, disabled) => {
  if (listOfIcons != null) {
    // if the icon is disabled change the color or icon
    let iconColor;
    disabled === true
      ? (iconColor = styles.disbaledIcon)
      : (iconColor = styles.icon);

    return listOfIcons.map((icon) => (
      <View
        key={Math.floor(Math.random() * 100) + icon[0]}
        style={{ paddingLeft: "15%" }}
      >
        <Icon
          name={icon[0]}
          style={iconColor}
          size={30}
          onPress={() => {
            if (disabled != true) {
              IconOnPress(icon, navigation);
            }
          }}
        />
      </View>
    ));
  }
};

const Header = ({ navigation, title, icons, disabled }) => {
  const [widthSize, setWidthSize] = useState();
  const handleWidthSize = () => {
    if (icons != null) {
      setWidthSize("75%");
    } else {
      setWidthSize("100%");
    }
  };

  useEffect(() => {
    handleWidthSize();
  }, []);

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
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
            <Text style={handleHeaderText(title[1], disabled)}>
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
            {HandleIcon(icons, navigation, disabled)}
          </View>
        </View>
      </View>
    </>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    marginTop: 0,
    paddingLeft: "5%",
    paddingRight: "5%",
  },

  disbaledIcon: {
    color: "#D0D0D0",
  },
  icon: {
    color: "black",
  },
});

const handleHeaderText = (size, disabled) => {
  if (disabled === true) {
    return {
      fontFamily: "DancingScript-Regular",
      fontSize: size,
      color: "#D0D0D0",
    };
  } else {
    return {
      fontFamily: "DancingScript-Regular",
      fontSize: size,
      color: "black",
    };
  }
};
