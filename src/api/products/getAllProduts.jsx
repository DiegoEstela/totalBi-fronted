import axios from "axios";
import { productsUrl } from "../endpoints";

export const getAllProducts = async (user) => {
  try {
    const actualUser = await user;
    const allProducts = await axios.get(productsUrl);
    const productFiltered = allProducts?.data.filter(
      (product) => product.idusuario === actualUser?.userId
    );
    return productFiltered;
  } catch (error) {
    console.error("Error al obtener los productos:", error);
  }
};
