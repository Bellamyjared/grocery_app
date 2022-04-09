// import { useEffect, useState } from "react";
// import { StyleSheet, Text, View, Pressable, Alert } from "react-native";
// import Icon from "../assets/icons/icon";
// import * as WebBrowser from "expo-web-browser";
// import * as Google from "expo-auth-session/providers/google";
// import { GetGoogleAuth, AddUser, UpdateUser } from "../dbRequests/UserData";
// import { GetUserData } from "../dbRequests/UserData";
// import AlertBox from "../components/AlertBox";

// WebBrowser.maybeCompleteAuthSession();

// const Login = ({ navigation, route }) => {
//   const { userData, deviceId } = route.params;
//   const [udata, setudata] = useState(null);

//   const [request, response, promptAsync] = Google.useAuthRequest({
//     expoClientId:
//       "743190281722-p9gtr2203t866jkb0b8lvnfnbjaroo0f.apps.googleusercontent.com",
//     iosClientId:
//       "743190281722-humk6onapotcd7gl2fn1dqf8svoul8im.apps.googleusercontent.com",
//     androidClientId:
//       "743190281722-vnkomjfleidbtfh8ds2sdapag7d8553t.apps.googleusercontent.com",
//   });

//   useEffect(() => {
//     if (response?.type === "success") {
//       getUserData(response.authentication.accessToken);
//     }
//   }, [response]);

//   const getUserData = async (accessToken) => {
//     let data = await GetUserData(accessToken);
//     setudata(data);
//     if (data != undefined) {
//       // pushUser(accessToken, data);
//     } else {
//       Alert.alert("oh nooooo");
//     }
//   };

//   // const pushUser = async (accessToken, data) => {
//   //   if (userData != null) {
//   //     // update user
//   //     const updateUser = {
//   //       _id: userData,
//   //       deviceInfo: deviceId,
//   //       deviceToken: accessToken,
//   //     };
//   //     console.log(updateUser);
//   //     if ((await UpdateUser(updateUser)) != undefined) {
//   //       navigation.navigate("List", { userData: data });
//   //     }
//   //   } else {
//   //     // create new user
//   //     const newUser = {
//   //       deviceInfo: deviceId,
//   //       deviceToken: accessToken,
//   //     };
//   //     if ((await AddUser(newUser)) != undefined) {
//   //       navigation.navigate("List", { userData: data });
//   //     }
//   //   }
//   // };

//   return (
//     <View style={styles.LoginContainer}>
//       {udata !== null && <Text>{JSON.stringify(udata, null, 4)}</Text>}
//       <Text style={styles.Titlte}>Account Login</Text>
//       <Pressable onPress={() => promptAsync({ useProxy: true })}>
//         <View style={styles.LoginButton}>
//           <Icon
//             name={"google_icon"}
//             size={25}
//             style={{ color: "white", paddingBottom: 5, paddingRight: 5 }}
//           />
//           <Text style={styles.Font}> Sign in with Google</Text>
//         </View>
//       </Pressable>
//       {/* redacted for beta launch */}
//       {/* <AlertBox
//         title="title test"
//         message="this is the message sent to the alertbox"
//       /> */}
//     </View>
//   );
// };

// export default Login;

// const styles = StyleSheet.create({
//   LoginContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#fff",
//   },
//   Titlte: {
//     fontFamily: "Poppins-Regular",
//     fontSize: 35,
//     marginBottom: 50,
//     borderBottomWidth: 2,
//     borderColor: "#d3d3d3d3",
//   },
//   LoginButton: {
//     flexDirection: "row",
//     alignItems: "center",
//     paddingLeft: 20,
//     paddingRight: 20,
//     height: 50,
//     borderRadius: 10,
//     backgroundColor: "#157efb",
//   },
//   Font: {
//     fontFamily: "Poppins-Regular",
//     color: "white",
//     fontSize: 16,
//   },
// });
import { StatusBar } from "expo-status-bar";

import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import axios from "axios";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";

WebBrowser.maybeCompleteAuthSession();

export default function Login({ navigation, route }) {
  const [gUser, setGUser] = useState(null);
  const [reqError, setReqError] = useState("");

  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId:
      "743190281722-p9gtr2203t866jkb0b8lvnfnbjaroo0f.apps.googleusercontent.com",
    iosClientId:
      "743190281722-humk6onapotcd7gl2fn1dqf8svoul8im.apps.googleusercontent.com",
    androidClientId:
      "743190281722-vnkomjfleidbtfh8ds2sdapag7d8553t.apps.googleusercontent.com",
  });

  useEffect(() => {
    if (response?.type === "success") {
      const { authentication } = response;

      getGoogleUser(authentication.accessToken);
    }
  }, [response]);

  const getGoogleUser = async (accessToken) => {
    try {
      let gUserReq = await axios.get(
        "https://www.googleapis.com/oauth2/v2/userinfo",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      console.log(gUserReq.data);
      setGUser(gUserReq.data);
      redirect(gUserReq.data);
    } catch (error) {
      console.log("GoogleUserReq error: ", error);
      setReqError(error);
    }
  };

  const redirect = (data) => {
    navigation.navigate("List", { userData: data });
  };

  return (
    <View style={styles.container}>
      {reqError !== "" && (
        <View>
          <Text>There was an error</Text>
          <Text>{JSON.stringify(reqError, "reqEr", 4)}</Text>
        </View>
      )}

      <Text
        style={{
          fontWeight: "bold",
        }}
      >
        Signed user
      </Text>

      {gUser === null && <Text>No user</Text>}

      {gUser !== null && <Text>{JSON.stringify(gUser, null, 4)}</Text>}

      <Button
        disabled={!request}
        title="Sign in"
        onPress={() => promptAsync()}
      />

      <StatusBar style="auto" />
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
});
