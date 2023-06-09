import axios from "axios";
import { servicesUrl } from "../endpoints";

export async function CreateServices(service, userId) {
  const { concepto } = service;
  try {
    const headers = {
      "Content-Type": "application/json",
    };

    const body = {
      idUsuario: userId,
      concepto,
    };

    await axios.post(servicesUrl, body, {
      headers: headers,
    });
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
}
