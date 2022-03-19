import { useEffect, useState } from "react";

import { CheckIfUserExists, GetUserData } from "../dbRequests/UserData";

import * as Device from "expo-device";

const RedirctLoggedInUsers = ({ navigation }) => {
  const [deviceId, setDeviceId] = useState(
    Device.osInternalBuildId + Device.deviceName + 5
  );

  useEffect(() => {
    checkIfUserExists();
    console.log(deviceId);
  }, [deviceId]);

  const checkIfUserExists = async () => {
    let userInfo = await CheckIfUserExists(deviceId);
    // if user does not exist in database
    if (typeof userInfo === "undefined") {
      console.log("user does not exist");
      navigation.navigate("Login", { userData: null, deviceId: deviceId });
    } else {
      // user exists
      console.log("user exists");
      getUserData(userInfo[0]);
    }
  };

  const getUserData = async (userInfo) => {
    console.log(userInfo);
    data = await GetUserData(userInfo.deviceToken);
    if (typeof data != "undefined") {
      console.log("user token is okay");
      navigation.navigate("List", { userData: data });
    } else {
      console.log("user token is not");
      navigation.navigate("Login", {
        userData: userInfo._id,
        deviceId: deviceId,
      });
    }
  };

  return <></>;
};

export default RedirctLoggedInUsers;
