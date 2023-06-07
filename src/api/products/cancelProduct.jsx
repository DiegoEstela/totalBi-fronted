import axios from "axios";
import { cancelProductsUrl } from "../endpoints";

export async function CancelProductFunction(prodId) {
  try {
    const headers = {
      "Content-Type": "application/json",
    };

    await axios.put(`${cancelProductsUrl}/${prodId}`, {
      headers: headers,
    });
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
}
