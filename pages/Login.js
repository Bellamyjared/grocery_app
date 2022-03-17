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
WebBrowser.maybeCompleteAuthSession();

const Login = ({ navigation }) => {
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: `743190281722-p9gtr2203t866jkb0b8lvnfnbjaroo0f.apps.googleusercontent.com`,
    iosClientId: `743190281722-humk6onapotcd7gl2fn1dqf8svoul8im.apps.googleusercontent.com`,
    androidClientId: `743190281722-vnkomjfleidbtfh8ds2sdapag7d8553t.apps.googleusercontent.com`,
    scope: ["email, profile"],
  });

  useEffect(() => {
    if (response?.type === "success") {
      getUserData(response.authentication.accessToken);
    }
  }, [response]);

  const getUserData = async (accessToken) => {
    data = await GetUserData(accessToken);
  };

  return (
    <View style={styles.LoginContainer}>
      <Text style={styles.Titlte}>Account Login</Text>
      <Button
        disabled={!request}
        title="Login"
        onPress={() => {
          promptAsync();
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
