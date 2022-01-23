import { View } from "react-native";
import { Icon } from "react-native-elements";

const Header = ({ navigation, buttonInfo }) => {
  const DisplayIcon = () =>
    buttonInfo.map((info) => (
      <Icon
        key={Math.floor(Math.random() * 100)} // just to give a random unique id for now
        name={info[0]}
        type="materialicons"
        size={55}
        onPress={() => {
          navigation.navigate(info[1]);
        }}
      />
    ));

  return (
    <View style={{ flexDirection: "row", paddingLeft: "15%" }}>
      {DisplayIcon()}
    </View>
  );
};

export default Header;
