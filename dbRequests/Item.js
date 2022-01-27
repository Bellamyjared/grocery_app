import axios from "axios";

export async function GetItem() {
  const result = await axios("http://172.17.96.170:5000/item");
  return result.data;
}

export async function PostItem(Item) {
  const result = await axios
    .post("http://172.17.96.170:5000/item/add", Item)
    .catch((error) => {
      console.log(error.response);
    });
  console.log(result);
  return result.data;
}

export async function UpdateItem(id, Item) {
  const result = await axios
    .post(`http://localhost:5000/item/update/${id}`, Item)
    .catch((error) => {
      console.log(error.response);
    });
  console.log(result);
  return result;
}

export async function DeleteItem(id) {
  const result = await axios
    .delete(`http://localhost:5000/item/${id}`)
    .catch((error) => {
      console.log(error.response);
    });
  console.log(result.data);
  return result.data;
}
