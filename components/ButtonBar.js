import { View } from "react-native";
import { Icon } from "react-native-elements";

const Header = ({ navigation, buttonInfo }) => {
  // passes a function or button to navigation depending on whats in the given array info
  const changeOnPress = (info) => {
    if (info[1] === "buttonFunction") {
      info[2]();
    } else if (info[2] === "passProps") {
      navigation.navigate(info[1], info[3]);
    } else {
      navigation.navigate(info[1]);
    }
  };

  const DisplayIcon = () =>
    buttonInfo.map((info) => (
      <Icon
        key={Math.floor(Math.random() * 100) + info[0]} // just to give a random unique id for now
        name={info[0]}
        type="materialicons"
        size={55}
        onPress={() => {
          changeOnPress(info);
        }}
      />
    ));

  return (
    <View
      style={{
        width: "85%",
        flexDirection: "row-reverse",
        justifyContent: "space-between",
      }}
    >
      {DisplayIcon()}
    </View>
  );
};

export default Header;
