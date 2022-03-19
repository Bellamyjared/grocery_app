import axios from "axios";
import { GetIp } from "./GetIp";

const ip = GetIp();

export async function GetRecipe() {
  const result = await axios(`${ip}/recipe`);
  return result.data;
}

export async function PostRecipe(Recipe) {
  const result = await axios.post(`${ip}/recipe/add`, Recipe).catch((error) => {
    console.log(error.response);
    return undefined;
  });
  return result.data;
}

export async function UpdateRecipe(id, Recipe) {
  const result = await axios
    .post(`${ip}/recipe/update/${id}`, Recipe)
    .catch((error) => {
      console.log(error.response);
      return undefined;
    });
  return result;
}

export async function DeleteRecipe(id) {
  const result = await axios.delete(`${ip}/recipe/${id}`).catch((error) => {
    console.log(error.response);
    return undefined;
  });
  return result.data;
}
