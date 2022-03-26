import { View, Text, Pressable } from "react-native";

const Button = ({
  text,
  fontSize,
  fontColor,
  borderColor,
  backgroundColor,
  navigation,
  navigate,
  passProps,
}) => {
  const FontSize = fontSize ? fontSize : 20;
  const FontColor = fontColor ? fontColor : "black";
  const BorderColor = borderColor ? borderColor : "black";
  const BackgroundColor = backgroundColor ? backgroundColor : "#fff";

  return (
    <Pressable onPress={() => navigation.navigate(navigate, passProps)}>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          width: 100,
          height: 50,
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
