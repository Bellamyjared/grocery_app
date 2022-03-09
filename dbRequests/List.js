import axios from "axios";
import { GetIp } from "./GetIp";

const ip = GetIp();

export async function GetList() {
  const result = await axios(`${ip}/list`);
  return result.data;
}

export async function PostList(List) {
  console.log("test");
  const result = await axios.post(`${ip}/list/add`, List).catch((error) => {});

  return result.data;
}

export async function UpdateListItem(id, listItem) {
  const result = await axios
    .post(`${ip}/list/update/${id}`, listItem)
    .catch((error) => {
      console.log(error.response);
    });
  return result;
}

export async function DeleteListItem(id) {
  const result = await axios.delete(`${ip}/list/${id}`).catch((error) => {
    console.log(error.response);
  });
  console.log(result.data);
  return result.data;
}
