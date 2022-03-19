import { useEffect, useState } from "react";

import { CheckIfUserExists, GetUserData } from "../dbRequests/UserData";

import * as Device from "expo-device";

const RedirctLoggedInUsers = ({ navigation }) => {
  const [deviceId, setDeviceId] = useState(
    Device.osInternalBuildId + Device.deviceName
  );

  useEffect(() => {
    console.log(deviceId);
    checkIfUserExists();
  }, [deviceId]);

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
      navigation.navigate("List", { userData: data });
    } else {
      navigation.navigate("Login", {
        userData: userInfo._id,
        deviceId: deviceId,
      });
    }
  };

  return <></>;
};

export default RedirctLoggedInUsers;
