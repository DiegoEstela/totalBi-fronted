"use client";
import { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import "./cancel.css";
import Swal from "sweetalert2";
import Loader from "@/app/components/Loader/Loader";
import { useQuery } from "react-query";
import { CancelServiceFunction } from "@/api/services/cancelService";
import { getAllServices } from "@/api/services/getAllServices";
import { getUserData } from "@/api/user/getUserData";
import { AuthContext } from "@/context/AuthProvider";

function CancelProduct() {
  const [serviceId, setServiceId] = useState();
  const [loader, setLoader] = useState(false);
  const { user } = useContext(AuthContext);
  const userData = getUserData(user?.uid);
  const { data: services, isLoading } = useQuery(["services", userData], () =>
    getAllServices(userData)
  );
  const router = useRouter();
  const {
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = async (data) => {
    setLoader(true);
    Swal.fire({
      title: "¿Estás seguro?",
      text: "¿Deseas dar de baja a este servicio?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, dar de baja",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        setLoader(false);
        CancelServiceFunction(serviceId);
        Swal.fire("servicio dado de baja!", "", "success");
        router.push("/");
      } else {
        setLoader(false);
        Swal.fire("Operación cancelada", "", "info");
        router.push("/");
      }
    });
  };

  return (
    <div className="container_customer">
      <form className="formComponent_customer">
        {status === "error" && <div>Error al obtener los clientes</div>}
        <div className="form_container_customer">
          <div className="input_customer_select">
            <div className="form_group_customer_select">
              <select
                className="form_input_customer_select"
                onChange={(e) => setServiceId(e.target.value)}
                placeholder=" "
              >
                <option>Seleccionar</option>
                {services?.map((service) => (
                  <option
                    key={service.idservicio}
                    value={`${service.idservicio}`}
                  >
                    {service.concepto}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {loader ? (
            <Loader />
          ) : (
            <input
              className="form_submit_customer_cancel"
              onClick={handleSubmit(onSubmit)}
              value="Dar de baja"
            />
          )}
        </div>
      </form>
    </div>
  );
}

export default CancelProduct;
