import AddItemScreen from "./AddItemScreen";

const AddCategoryScreen = ({ navigation, passProps }) => {
  return (
    <AddItemScreen
      BodyText="Please add a Category"
      ButtonNavigation={navigation}
      ButtonNavigate="Create_Category"
      ButtonPassProps={passProps}
    />
  );
};

export default AddCategoryScreen;
