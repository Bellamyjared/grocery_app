import axios from "axios";
import { GetIp } from "./GetIp";

const ip = GetIp();

export async function GetCategory(userId) {
  const result = await axios
    .post(`${ip}/category`, { userId: userId })
    .catch((error) => {
      console.log(error);
    });
  return result.data;
}

export async function PostCategory(category) {
  const result = await axios
    .post(`${ip}/category/add`, category)
    .catch((error) => {
      console.log(error);
    });
  return result.data;
}

export async function UpdateCategory(id, category) {
  const result = await axios
    .post(`${ip}/category/update/${id}`, category)
    .catch((error) => {
      console.log(error);
    });
  return result.data;
}

export async function DeleteCategory(id) {
  const result = await axios.delete(`${ip}/category/${id}`).catch((error) => {
    console.log(error);
  });
  return result.data;
}
