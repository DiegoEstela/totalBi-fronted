import axios from "axios";
import { expensesUrl } from "../endpoints";

export async function createExpense(data, userId) {
  const { idServicio, nombreServicio, monto, metodoPago } = data;
  const body = {
    idUsuario: userId,
    idServicio,
    nombreServicio,
    monto,
    metodoPago,
  };

  try {
    const headers = {
      "Content-Type": "application/json",
    };

    await axios.post(expensesUrl, body, {
      headers: headers,
    });
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
}
