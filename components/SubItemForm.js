import { useState, useEffect } from "react";
import { TextInput, StyleSheet } from "react-native";

const SubItemForm = ({ handleSubItemText, count }) => {
  const [subItemText, setSubItemText] = useState();

  useEffect(() => {
    handleSubItemText(subItemText, count);
  }, [subItemText]);

  return (
    <TextInput
      style={styles.form_Input}
      onChangeText={setSubItemText}
      value={subItemText}
    />
  );
};

const styles = StyleSheet.create({
  form_Input: {
    fontSize: 24,
    height: 45,
    width: 300,
    borderWidth: 1,
    paddingTop: 10,
    paddingLeft: 25,
    paddingBottom: 8,
    paddingRight: 10,
    borderRadius: 15,
    marginBottom: 15,
  },
});

export default SubItemForm;
