import axios from "axios";
import { customersUrl } from "../endpoints";

export const getAllCustomers = async () => {
  try {
    const response = await axios.get(customersUrl);
    return response;
  } catch (error) {
    console.error("Error al obtener los clientes:", error);
  }
};
