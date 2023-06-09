import axios from "axios";
import { servicesUrl } from "../endpoints";

export const getAllServices = async (user) => {
  try {
    const actualUser = await user;
    const allServices = await axios.get(servicesUrl);
    const servicesFilterd = allServices?.data.filter(
      (service) => service.idusuario === actualUser?.userId
    );
    return servicesFilterd;
  } catch (error) {
    console.error("Error al obtener los servicios:", error);
  }
};
