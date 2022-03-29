// passes a function or button to navigation depending on whats in the given array info
const IconOnPress = (info, navigation) => {
  if (info[1] === "buttonFunction") {
    info[2]();
  } else if (info[2] === "passProps") {
    navigation.navigate(info[1], info[3]);
  } else {
    navigation.navigate(info[1]);
  }
};

export default IconOnPress;
