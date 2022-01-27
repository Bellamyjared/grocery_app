import { View } from "react-native";
import { Icon } from "react-native-elements";

const Header = ({ navigation, buttonInfo }) => {
  const changeOnPress = (info) => {
    info[1] != "buttonFunction" ? navigation.navigate(info[1]) : info[2]();
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
