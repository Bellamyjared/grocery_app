import { View, TextInput, StyleSheet } from "react-native";

const SearchBar = () => {
  return (
    <View style={styles.body}>
      <TextInput>SEARCH BAR TEMP</TextInput>
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  body: {
    fontSize: 24,
    height: 40,
    width: 300,
    borderWidth: 1,
    paddingTop: 10,
    paddingLeft: 25,
    paddingBottom: 8,
    paddingRight: 10,
    borderRadius: 15,
  },
});
