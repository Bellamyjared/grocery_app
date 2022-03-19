import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  ScrollView,
  Pressable,
  Alert,
} from "react-native";
import Icon from "../assets/icons/icon";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import { GetGoogleAuth, AddUser, UpdateUser } from "../dbRequests/UserData";
import { GetUserData } from "../dbRequests/UserData";

WebBrowser.maybeCompleteAuthSession();

const Login = ({ navigation, route }) => {
  const { userData, deviceId } = route.params;
  const [GoogleId, setGoogleId] = useState({
    expoClientId: "temp",
    iosClientId: "temp",
    androidClientId: "temp",
  });

  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: GoogleId.expoClientId,
    iosClientId: GoogleId.iosClientId,
    androidClientId: GoogleId.androidClientId,
  });

  useEffect(() => {
    getGoogleId();
    if (response?.type === "success") {
      getUserData(response.authentication.accessToken);
    }
  }, [response]);

  const getGoogleId = async () => {
    data = await GetGoogleAuth();
    setGoogleId(data);
  };

  const getUserData = async (accessToken) => {
    data = await GetUserData(accessToken);
    if (data != undefined) {
      pushUser(accessToken, data);
    } else {
      Alert.alert("oh nooooo");
    }
  };

  const pushUser = async (accessToken, data) => {
    if (userData != null) {
      // update user
      const updateUser = {
        _id: userData,
        deviceInfo: deviceId,
        deviceToken: accessToken,
      };
      console.log(updateUser);
      if ((await UpdateUser(updateUser)) != undefined) {
        navigation.navigate("List", { userData: data });
      }
    } else {
      // create new user
      const newUser = {
        deviceInfo: deviceId,
        deviceToken: accessToken,
      };
      if ((await AddUser(newUser)) != undefined) {
        navigation.navigate("List", { userData: data });
      }
    }
  };

  return (
    <View style={styles.LoginContainer}>
      <Text style={styles.Titlte}>Account Login</Text>
      <Pressable onPress={() => promptAsync({ useProxy: true })}>
        <View style={styles.LoginButton}>
          <Icon
            name={"google_icon"}
            size={25}
            style={{ color: "white", paddingBottom: 5, paddingRight: 5 }}
          />
          <Text style={styles.Font}> Sign in with Google</Text>
        </View>
      </Pressable>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  Titlte: {
    fontFamily: "Poppins-Regular",
    fontSize: 35,
    marginBottom: 50,
    borderBottomWidth: 2,
    borderColor: "#d3d3d3d3",
  },
  LoginContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  LoginButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 20,
    paddingRight: 20,
    height: 50,
    borderRadius: 10,
    backgroundColor: "#157efb",
  },
  Font: {
    fontFamily: "Poppins-Regular",
    color: "white",
    fontSize: 16,
  },
});
