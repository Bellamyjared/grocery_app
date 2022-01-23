import { StyleSheet, View, Text } from "react-native";
import { Icon } from "react-native-elements";

const DisplayIcon = (listOfIcons) => {
  return listOfIcons.map((icon) => (
    <View key={icon[1]} style={{ paddingLeft: "15%" }}>
      <Icon
        name={icon[0]}
        type="feather"
        size={30}
        onPress={() => {
          navigation.navigate(icon[1]);
        }}
      />
    </View>
  ));
};

const Header = ({ navigation, title, icons }) => {
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
            width: "75%",
          }}
        >
          <Text style={{ fontFamily: "Meddon-Regular", fontSize: title[1] }}>
            {title[0]}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row-reverse",
            alignItems: "center",
            width: "25%",
          }}
        >
          {DisplayIcon(icons)}
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
