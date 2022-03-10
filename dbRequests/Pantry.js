import axios from "axios";
import { GetIp } from "./GetIp";

const ip = GetIp();

export async function GetList() {
  const result = await axios(`${ip}/pantry`);
  return result.data;
}

export async function PostPantry(Pantry) {
  console.log("test");
  const result = await axios
    .post(`${ip}/pantry/add`, Pantry)
    .catch((error) => {});

  return result.data;
}

export async function UpdatePantryItem(id, pantryItem) {
  const result = await axios
    .post(`${ip}/pantry/update/${id}`, pantryItem)
    .catch((error) => {
      console.log(error.response);
    });
  return result;
}

export async function DeletePantryItem(id) {
  const result = await axios.delete(`${ip}/pantry/${id}`).catch((error) => {
    console.log(error.response);
  });
  console.log(result.data);
  return result.data;
}
