import axios from "axios";
import { productsUrl } from "../endpoints";

export async function CreateProduct(product, userId) {
  const { concepto, monto } = product;
  try {
    const headers = {
      "Content-Type": "application/json",
    };

    const body = {
      idUsuario: userId,
      concepto,
      monto,
    };
    console.log(body);
    await axios.post(productsUrl, body, {
      headers: headers,
    });
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
}
