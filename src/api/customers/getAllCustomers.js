import axios from "axios";
import { customersUrl } from "../endpoints";

export const getAllCustomers = async (user) => {
  try {
    const actualUser = await user;
    const customers = await axios.get(customersUrl);
    const customerFiltered = customers?.data.filter(
      (customer) => customer.idusuario === actualUser?.userId
    );
    return customerFiltered;
  } catch (error) {
    console.error("Error al obtener los clientes:", error);
  }
};
