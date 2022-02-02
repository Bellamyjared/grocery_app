import axios from "axios";
import { GetIp } from "./GetIp";

const ip = GetIp();

export async function GetItem() {
  const result = await axios(`${ip}/item`);
  return result.data;
}

export async function PostItem(Item) {
  const result = await axios.post(`${ip}/item/add`, Item).catch((error) => {
    console.log(error.response);
  });
  return result.data;
}

export async function UpdateItem(id, Item) {
  const result = await axios
    .post(`${ip}/item/update/${id}`, Item)
    .catch((error) => {
      console.log(error.response);
    });
  console.log(result);
  return result;
}

export async function DeleteItem(id) {
  const result = await axios.delete(`${ip}/item/${id}`).catch((error) => {
    console.log(error.response);
  });
  console.log(result.data);
  return result.data;
}
