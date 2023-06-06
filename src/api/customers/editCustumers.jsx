import axios from "axios";
import { customersUrl } from "../endpoints";

export async function EditCostumers(costumer, id) {
  const { nombre, apellido, fecha_nacimiento, telefono } = costumer;
  try {
    const headers = {
      "Content-Type": "application/json",
    };

    const body = {
      nombre,
      apellido,
      fecha_nacimiento,
      telefono,
    };
    await axios.put(`${customersUrl}/${id}`, body, {
      headers: headers,
    });
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
}
