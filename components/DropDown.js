import { Inter_100Thin } from "@expo-google-fonts/inter";
import { StyleSheet, Text, View, ScrollView } from "react-native";

const DropDown = ({ list }) => {
  console.log(list);
  if (list != undefined || list != null) {
    return (
      <View style={styles.Container}>
        <View style={styles.Cancle}>
          <Text>test3</Text>
        </View>
        <View style={styles.Temp}>
          <View style={styles.ListContainer}>
            <ScrollView contentContainerStyle={styles.ListScrollView}>
              {list.map((item, index) => (
                <Text key={index} style={styles.Text}>
                  {item.category}
                </Text>
              ))}
            </ScrollView>
          </View>
        </View>
      </View>
    );
  } else {
    return <></>;
  }
};

export default DropDown;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    flexDirection: "column-reverse",
    alignItems: "center",
    position: "absolute",
    height: "100%",
    width: "100%",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  Temp: {
    backgroundColor: "#fff",
    height: 400,
    width: "90%",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 70,
    overflow: "visible",
  },
  ListContainer: {
    backgroundColor: "#fff",
    height: 40,
    width: "85%",
    borderRadius: 15,
    marginTop: 50,
  },
  ListScrollView: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "pink",
  },
  Cancle: {
    backgroundColor: "#fff",
    height: 60,
    width: "85%",
    marginBottom: 70,
    borderRadius: 15,
  },
  Text: {
    fontSize: 30,
  },
});
