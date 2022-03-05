import axios from "axios";
import { GetIp } from "./GetIp";

const ip = GetIp();

export async function GetList() {
  const result = await axios(`${ip}/item`);
  return result.data;
}

export async function PostList(List) {
  const result = await axios.post(`${ip}/list/add`, List).catch((error) => {
    console.log(error.response);
  });

  return result.data;
}

export async function DeleteList(id) {
  const result = await axios.delete(`${ip}/list/${id}`).catch((error) => {
    console.log(error.response);
  });
  console.log(result.data);
  return result.data;
}
