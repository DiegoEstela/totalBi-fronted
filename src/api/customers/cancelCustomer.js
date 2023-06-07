import axios from "axios";
import { cancelCustomerUrl } from "../endpoints";

export async function CancelCustomerFunction(userId) {
  try {
    const headers = {
      "Content-Type": "application/json",
    };

    await axios.put(`${cancelCustomerUrl}/${userId}`, {
      headers: headers,
    });
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
}
