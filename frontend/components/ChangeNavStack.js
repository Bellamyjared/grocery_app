import { CommonActions } from "@react-navigation/native";

const ChangeNavStack = (navigation, remove) => {
  remove.map((item) => {
    navigation.dispatch((state) => {
      // Remove the route from the stack
      const routes = state.routes.filter((r) => r.name !== item);

      return CommonActions.reset({
        ...state,
        routes,
        index: routes.length - 1,
      });
    });
  });
  console.log(navigation.getState());
};
export default ChangeNavStack;
