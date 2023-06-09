import axios from "axios";
import { cancelServicesUrl } from "../endpoints";

export async function CancelServiceFunction(prodId) {
  try {
    const headers = {
      "Content-Type": "application/json",
    };

    await axios.put(`${cancelServicesUrl}/${prodId}`, {
      headers: headers,
    });
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
}
