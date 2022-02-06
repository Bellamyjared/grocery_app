import { Alert } from "react-native";

export const DeleteValidation = (name, id, onDelete) => {
  Alert.alert(`Delete ${name}?`, `Are you sure you want to delete ${name}`, [
    {
      text: "Cancel",
    },
    { text: "OK", onPress: () => onDelete(id) },
  ]);
};
