import axios from "axios";
import { GetIp } from "./GetIp";
const ip = GetIp();

export async function CheckIfUserExists(deviceId) {
  const result = await axios.post(`${ip}/LoggedDeviceAndToken/`, {
    deviceId: deviceId,
  });
  if (result.data.length > 0) {
    return result.data;
  } else {
    return undefined;
  }
}
export async function AddUser(userInfo) {
  const result = await axios
    .post(`${ip}/LoggedDeviceAndToken/add`, userInfo)
    .catch((error) => {
      console.log(error);
    });
  return result.data;
}
export async function UpdateUser(userInfo) {
  const result = await axios
    .post(`${ip}/LoggedDeviceAndToken/update`, userInfo)
    .catch((error) => {
      console.log(error);
    });
  return result.data;
}

export async function GetGoogleAuth() {
  const result = await axios(`${ip}/GoogleCredential`);
  return result.data[0];
}

export async function GetUserData(accessToken) {
  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };
  const url = "https://www.googleapis.com/oauth2/v1/userinfo?alt=json";

  const result = await axios(url, config).catch((error) => {});
  if (typeof result === "undefined") {
    return undefined;
  } else {
    return result.data;
  }
}
