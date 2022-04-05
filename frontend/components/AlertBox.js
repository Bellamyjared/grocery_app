import { View, StyleSheet, Text } from "react-native";
import Button from "./Button";

const AlertBox = ({ title, message, toggleAlert }) => {
  return (
    <View style={styles.Background}>
      <View style={styles.AlertBoxContainer}>
        <View style={styles.AlertTitle}>
          <Text style={styles.TitleFont}>{title}</Text>
        </View>
        <View style={styles.AlertMessage}>
          <Text style={styles.MessageFont}>{message}</Text>
        </View>
        <View style={styles.AlertButtons}>
          <Button text="Cancle" buttonFuction={toggleAlert} />
          <Button text="Okay" buttonFuction={toggleAlert} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  Background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    height: "100%",
    width: "100%",
    backgroundColor: "rgba(0,0,0,0.5)",
  },

  AlertBoxContainer: {
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    height: "30%",
    width: "85%",
  },
  AlertTitle: {
    justifyContent: "center",
    width: "75%",
    height: 50,
  },
  TitleFont: { fontSize: 25 },
  AlertMessage: { width: "85%", height: 100, maxHeight: 100 },
  MessageFont: { fontSize: 18 },
  AlertButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "70%",
  },
});

export default AlertBox;
