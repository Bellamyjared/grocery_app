import axios from "axios";
import { GetIp } from "./GetIp";
import * as SecureStore from "expo-secure-store";

const ip = GetIp();

export async function GetGoogleAuth() {
  const result = await axios(`${ip}/googlecredential`);
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
    return null;
  } else {
    return result.data;
  }
}

// STORAGE USER TOKEN
export async function SaveToken(value) {
  await SecureStore.setItemAsync("grocery_app_user", value);
}

export async function GetToken() {
  let result = await SecureStore.getItemAsync("grocery_app_user");
  if (result) {
    return result;
  } else {
    return null;
  }
}
