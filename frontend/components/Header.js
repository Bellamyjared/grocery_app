import { useState, useEffect } from "react";
import { StyleSheet, View, Text, Image, Pressable } from "react-native";
import Icon from "../assets/icons/icon";
import IconOnPress from "./IconOnPress";
import { CommonActions } from "@react-navigation/native";
import { SaveToken } from "../dbRequests/UserData";

const Header = ({ navigation, title, icons, disabled, userData }) => {
  const [SignOutToggle, setSignOutToggle] = useState(false);
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

  const HandleIcon = () => {
    const profilePlaceHolder = require("../assets/Profile_Placeholder.png");

    if (icons != null) {
      // if the icon is disabled change the color or icon
      let iconColor;
      disabled === true
        ? (iconColor = styles.disbaledIcon)
        : (iconColor = styles.icon);

      return (
        <View style={{ flexDirection: "row" }}>
          {icons.map((icon) => (
            <View
              key={Math.floor(Math.random() * 100) + icon[0]}
              style={{ paddingLeft: 30 }}
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
          ))}
          {userData != undefined ? (
            <View style={{ paddingLeft: 30 }}>
              <Pressable
                onPress={() => {
                  if (!disabled) {
                    SignOutToggle
                      ? setSignOutToggle(false)
                      : setSignOutToggle(true);
                  }
                }}
              >
                {/* user profile picture */}
                <Image
                  style={
                    disabled
                      ? {
                          width: 35,
                          height: 35,
                          borderRadius: 15,
                          opacity: 0.5,
                        }
                      : {
                          width: 35,
                          height: 35,
                          borderRadius: 15,
                        }
                  }
                  source={
                    typeof userData.picture === "string"
                      ? { uri: userData.picture }
                      : profilePlaceHolder
                  }
                />
              </Pressable>
            </View>
          ) : (
            <></>
          )}
        </View>
      );
    }
  };

  const signOut = () => {
    SaveToken("null");
    navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [
          {
            name: "Login",
          },
        ],
      })
    );
  };

  return (
    <>
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
            {HandleIcon(icons, navigation, disabled, userData)}
          </View>
          {SignOutToggle ? (
            <Pressable
              onPress={() => setSignOutToggle(false)}
              style={{
                position: "absolute",
                flexDirection: "row-reverse",
                alignItems: "center",
                width: "100%",
                height: "100%",
                paddingLeft: 60,
              }}
            >
              <Pressable onPress={() => signOut()} style={{}}>
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#fff",
                    borderColor: "black",
                    width: 100,
                    height: 40,
                    borderRadius: 15,
                    borderWidth: 2,
                  }}
                >
                  <Text>Sign Out</Text>
                </View>
              </Pressable>
            </Pressable>
          ) : (
            <></>
          )}
        </View>
      </View>
    </>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    justifyContent: "flex-end",
    backgroundColor: "#fff",
    height: 120,
    paddingLeft: 20,
    paddingRight: 20,
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
