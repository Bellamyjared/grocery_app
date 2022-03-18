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
import GetUserData from "../dbRequests/GetUserData";
import {
  GetGoogleAuth,
  CheckIfUserDeviceIsLoggedIn,
} from "../dbRequests/GetUserData";
import * as Device from "expo-device";

WebBrowser.maybeCompleteAuthSession();

const Login = ({ navigation }) => {
  if (false) {
    navigation.navigate("List", { userData: "ljsdbnf" });
  }
  const [deviceId, setDeviceId] = useState(
    Device.osInternalBuildId + Device.deviceName
  );
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
    checkUserDevice();

    if (response?.type === "success") {
      getUserData(response.authentication.accessToken);
    }
  }, [response]);

  const checkUserDevice = async () => {
    getGoogleId();
  };

  const getGoogleId = async () => {
    data = await GetGoogleAuth();
    setGoogleId(data);
  };
  const getUserData = async (accessToken) => {
    data = await GetUserData(accessToken);
    navigation.navigate("List", { userData: data });
  };

  return (
    <View style={styles.LoginContainer}>
      <Text style={styles.Titlte}>Account Login</Text>
      <Button
        disabled={!request}
        title="Login"
        onPress={() => {
          promptAsync({ useProxy: true });
        }}
      />
      {/* <Pressable onPress={() => console.log("test")}>
        <View style={styles.LoginButton}>
          <Icon
          
            name={"google_icon"}
            size={25}
            style={{ color: "white", paddingBottom: 5, paddingRight: 5 }}
          />
          <Text style={styles.Font}> Sign in with Google</Text>
        </View>
      </Pressable> */}
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
