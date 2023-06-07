import axios from "axios";
import { accountByDateUrl } from "../endpoints";

export const getAccountByDate = async (desde, hasta) => {
  try {
    const headers = {
      "Content-Type": "application/json",
    };

    const body = {
      desde,
      hasta,
    };

    console.log(body);
    const res = await axios.post(accountByDateUrl, body, {
      headers: headers,
    });
    return res;
  } catch (err) {
    console.log(err);
    return false;
  }
};
