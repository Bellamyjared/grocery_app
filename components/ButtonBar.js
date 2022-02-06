import { View } from "react-native";
import Icon from "../assets/icons/icon";
import IconOnPress from "./IconOnPress";

const ButtonBar = ({ navigation, buttonInfo }) => {
  return (
    <View
      style={{
        width: "85%",
        flexDirection: "row-reverse",
        justifyContent: "space-between",
      }}
    >
      {buttonInfo.map((info) => (
        <Icon
          key={Math.floor(Math.random() * 100) + info[0]} // just to give a random unique id for now
          name={info[0]}
          size={55}
          onPress={() => {
            IconOnPress(info, navigation);
          }}
        />
      ))}
    </View>
  );
};

export default ButtonBar;
