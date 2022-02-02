import axios from "axios";
import { GetIp } from "./GetIp";

const ip = GetIp();

export async function GetCategory() {
  const result = await axios(`${ip}/category`);
  return result.data;
}

export async function PostCategory(category) {
  const result = await axios
    .post(`${ip}/category/add`, category)
    .catch((error) => {
      console.log(error.response);
    });
  return result.data;
}

export async function UpdateCategory(id, category) {
  const result = await axios
    .post(`${ip}/update/${id}`, category)
    .catch((error) => {
      console.log(error.response);
    });
  console.log(result);
  return result;
}

export async function DeleteCategory(id) {
  const result = await axios.delete(`${ip}/category/${id}`).catch((error) => {
    console.log(error.response);
  });
  console.log(result.data);
  return result.data;
}
