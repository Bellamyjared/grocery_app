import { StyleSheet, Text, View, Pressable } from "react-native";
import Icon from "../assets/icons/icon";

import React, { useState, useEffect } from "react";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import {
  GetGoogleAuth,
  GetUserData,
  GetToken,
  SaveToken,
} from "../dbRequests/UserData";

WebBrowser.maybeCompleteAuthSession();

// MAIN COMPONENT
export default function Login({ navigation, route }) {
  const [loading, setLoading] = useState(true);
  const [reqError, setReqError] = useState(null);
  const [GoogleAuthIds, setGoogleAuthIds] = useState({
    expoClientId: "temp",
    iosClientId: "temp",
    androidClientId: "temp",
  });

  const getGoogleAuthIds = async () => {
    data = await GetGoogleAuth();
    setGoogleAuthIds(data);
  };

  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: GoogleAuthIds.expoClientId,
    iosClientId: GoogleAuthIds.iosClientId,
    androidClientId: GoogleAuthIds.androidClientId,
  });

  useEffect(() => {
    getGoogleAuthIds();
    CheckUserToken();
    if (response?.type === "success") {
      const { authentication } = response;

      getGoogleUser(authentication.accessToken);
    }
  }, [response]);

  // check to see if there is a token in storage, and see if it is still valid if there is one
  const CheckUserToken = async () => {
    let token = await GetToken();
    if (token != null) {
      let userData = await GetUserData(token);
      if (userData != null) {
        redirect(userData);
      } else {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  };

  // Get users data with google accessToken
  const getGoogleUser = async (accessToken) => {
    let userData = await GetUserData(accessToken);
    if (userData != null) {
      SaveToken(accessToken);
      redirect(userData);
    } else {
      setReqError("Error");
    }
  };

  const redirect = (userData) => {
    setLoading(false);
    navigation.navigate("List", { userData: userData });
  };

  const handleButton = () => {
    setLoading(true);
    promptAsync();
  };

  return loading ? (
    <View>
      <Text>Loading</Text>
    </View>
  ) : (
    <View style={styles.container}>
      <View style={styles.LoginContainer}>
        {/* ~~~~~~~~~ Title ~~~~~~~~~~~~~~~~ */}
        <Text style={styles.Titlte}>Account Login</Text>
        {/* ~~~~~~~~~~~ Error message ~~~~~~~~~~~~~~~~ */}
        {reqError != null && (
          <Text style={styles.ErrorText}>
            An Error has occured. Please try again later
          </Text>
        )}
        {/* ~~~~~~~~~~~~ Google Button ~~~~~~~~~~~~~~~~*/}
        <Pressable onPress={() => handleButton()}>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  LoginContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  Titlte: {
    fontFamily: "Poppins-Regular",
    fontSize: 35,
    marginBottom: 50,
    borderBottomWidth: 2,
    borderColor: "#d3d3d3d3",
  },
  ErrorText: {
    fontSize: 15,
    fontWeight: "bold",
    color: "red",
    marginTop: -15,
    paddingBottom: 15,
  },
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
