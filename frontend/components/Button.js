import { View, Text, Pressable } from "react-native";

const Button = ({
  text,
  width,
  height,
  fontSize,
  fontColor,
  borderColor,
  backgroundColor,
  navigation,
  navigate,
  passProps,
  buttonFuction,
}) => {
  const FontSize = fontSize ? fontSize : 20;
  const FontColor = fontColor ? fontColor : "black";
  const BorderColor = borderColor ? borderColor : "black";
  const BackgroundColor = backgroundColor ? backgroundColor : "#fff";
  const Width = width ? width : 100;
  const Height = height ? height : 50;

  const buttonPress = () => {
    if (typeof buttonFuction != "undefined") {
      buttonFuction();
    } else {
      navigation.navigate(navigate, passProps);
    }
  };

  return (
    <Pressable style={{ maxWidth: Width }} onPress={() => buttonPress()}>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          width: Width,
          height: Height,
          borderRadius: 15,
          borderWidth: 2,
          borderColor: BorderColor,
          backgroundColor: BackgroundColor,
        }}
      >
        <Text style={{ fontSize: FontSize, color: FontColor }}>{text}</Text>
      </View>
    </Pressable>
  );
};

export default Button;
