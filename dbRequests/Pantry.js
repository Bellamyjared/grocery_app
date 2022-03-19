import axios from "axios";
import { GetIp } from "./GetIp";

const ip = GetIp();

export async function GetPantry() {
  const result = await axios(`${ip}/pantry`);
  return result.data;
}

export async function PostPantry(Pantry) {
  console.log("test");
  const result = await axios.post(`${ip}/pantry/add`, Pantry).catch((error) => {
    console.log(error);
    return undefined;
  });

  return result.data;
}

export async function UpdatePantryItem(id, pantryItem) {
  const result = await axios
    .post(`${ip}/pantry/update/${id}`, pantryItem)
    .catch((error) => {
      console.log(error);
      return undefined;
    });
  return result;
}

export async function DeletePantryItem(id) {
  const result = await axios.delete(`${ip}/pantry/${id}`).catch((error) => {
    console.log(error);
    return undefined;
  });
  return result;
}
