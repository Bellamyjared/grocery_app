import { useEffect, useState } from "react";

import { CheckIfUserExists, GetUserData } from "../dbRequests/UserData";

import * as Device from "expo-device";
import { useIsFocused } from "@react-navigation/native";

const RedirectLoggedInUsers = ({ navigation, route }) => {
  const [deviceId, setDeviceId] = useState(
    Device.osInternalBuildId + Device.deviceName
  );
  const isFocused = useIsFocused();

  useEffect(() => {
    console.log(deviceId);
    console.log(route);
    checkIfUserExists();
  }, [isFocused]);

  const checkIfUserExists = async () => {
    let userInfo = await CheckIfUserExists(deviceId);
    // if user does not exist in database
    if (typeof userInfo === "undefined") {
      navigation.navigate("Login", { userData: null, deviceId: deviceId });
    } else {
      // user exists
      getUserData(userInfo[0]);
    }
  };

  const getUserData = async (userInfo) => {
    data = await GetUserData(userInfo.deviceToken);
    if (typeof data != "undefined") {
      if (typeof route.params === "undefined") {
        navigation.navigate("List", { userData: data });
      } else {
        navigation.navigate("Login", {
          userData: userInfo._id,
          deviceId: deviceId,
        });
      }
    } else {
      navigation.navigate("Login", {
        userData: userInfo._id,
        deviceId: deviceId,
      });
    }
  };

  return <></>;
};

export default RedirectLoggedInUsers;
