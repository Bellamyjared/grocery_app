import axios from "axios";

export async function GetIngredient() {
  const result = await axios("http://localhost:5000/ingredient");
  return result.data;
}

export async function PostIngredient(ingredient) {
  const result = await axios
    .post("http://localhost:5000/ingredient/add", ingredient)
    .catch((error) => {
      console.log(error.response);
    });
  return result.data;
}

export async function UpdateIngredient(id, ingredient) {
  const result = await axios
    .post(`http://localhost:5000/ingredient/update/${id}`, ingredient)
    .catch((error) => {
      console.log(error.response);
    });
  console.log(result);
  return result;
}

export async function DeleteIngredient(id) {
  const result = await axios
    .delete(`http://localhost:5000/ingredient/${id}`)
    .catch((error) => {
      console.log(error.response);
    });
  console.log(result.data);
  return result.data;
}
