import axios from "axios";
import { revenuesUrl } from "../endpoints";

export async function createRevenue(data, userId) {
  const { idCliente, idProducto, nombreProducto, monto, metodoPago } = data;
  const body = {
    idUsuario: userId,
    idProducto,
    idCliente,
    nombreProducto,
    monto,
    metodoPago,
  };

  try {
    const headers = {
      "Content-Type": "application/json",
    };

    await axios.post(revenuesUrl, body, {
      headers: headers,
    });
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
}
