import axios from "axios";

export async function GetCategory() {
  const result = await axios("http://localhost:5000/category");
  return result.data;
}

export async function PostCategory(category) {
  const result = await axios
    .post("http://localhost:5000/category/add", category)
    .catch((error) => {
      console.log(error.response);
    });
  return result.data;
}

export async function UpdateCategory(id, category) {
  const result = await axios
    .post(`http://localhost:5000/category/update/${id}`, category)
    .catch((error) => {
      console.log(error.response);
    });
  console.log(result);
  return result;
}

export async function DeleteCategory(id) {
  const result = await axios
    .delete(`http://localhost:5000/category/${id}`)
    .catch((error) => {
      console.log(error.response);
    });
  console.log(result.data);
  return result.data;
}
