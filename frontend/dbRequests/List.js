import axios from "axios";
import { GetIp } from "./GetIp";

const ip = GetIp();

export async function GetList(userId) {
  const result = await axios.post(`${ip}/list`, { userId: userId });
  return result.data;
}

export async function PostList(List) {
  console.log("test");
  const result = await axios.post(`${ip}/list/add`, List).catch((error) => {
    console.log(error);
    return undefined;
  });

  return result.data;
}

export async function UpdateListItem(id, listItem) {
  const result = await axios
    .post(`${ip}/list/update/${id}`, listItem)
    .catch((error) => {
      console.log(error);
      return undefined;
    });
  return result;
}

export async function DeleteListItem(id) {
  const result = await axios.delete(`${ip}/list/${id}`).catch((error) => {
    console.log(error);
    return undefined;
  });
  console.log(result.data);
  return result.data;
}
