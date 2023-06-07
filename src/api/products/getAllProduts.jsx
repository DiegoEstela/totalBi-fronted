import axios from "axios";
import { productsUrl } from "../endpoints";

export const getAllProducts = async () => {
  try {
    const response = await axios.get(productsUrl);
    return response;
  } catch (error) {
    console.error("Error al obtener los productos:", error);
  }
};
