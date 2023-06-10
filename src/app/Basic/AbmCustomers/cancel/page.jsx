"use client";
import { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import "./cancel.css";
import Swal from "sweetalert2";
import Loader from "@/app/components/Loader/Loader";
import { getAllCustomers } from "@/api/customers/getAllCustomers";
import { useQuery } from "react-query";
import { CancelCustomerFunction } from "@/api/customers/cancelCustomer";
import { AuthContext } from "@/context/AuthProvider";
import { getUserData } from "@/api/user/getUserData";

function CancelCustomer() {
  const [ClientId, setClientId] = useState();
  const [loader, setLoader] = useState(false);
  const { user } = useContext(AuthContext);
  const userData = getUserData(user?.uid);
  const { data: customers, status } = useQuery(["customers", userData], () =>
    getAllCustomers(userData)
  );
  const router = useRouter();
  const {
    formState: { errors },
    handleSubmit,
    setValue,
    watch,
  } = useForm();

  const onSubmit = async (data) => {
    setLoader(true);
    Swal.fire({
      title: "¿Estás seguro?",
      text: "¿Deseas dar de baja a este cliente?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, dar de baja",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        setLoader(false);
        CancelCustomerFunction(ClientId);
        Swal.fire("¡Cliente dado de baja!", "", "success");
        router.push("/");
      } else {
        setLoader(false);
        Swal.fire("Operación cancelada", "", "info");
        router.push("/");
      }
    });
  };

  const handleValue = (id) => {
    const dataFinded = customers?.find(
      (customer) => customer.idcliente === parseInt(id)
    );

    setClientId(id);
    setValue("nombre", dataFinded?.nombre);
    setValue("apellido", dataFinded?.apellido);
    setValue("telefono", dataFinded?.telefono);
    setValue("fecha_nacimiento", dataFinded?.fecha_nacimiento);
  };

  return (
    <div className="container_customer">
      <form className="formComponent_customer">
        {status === "error" && <div>Error al obtener los clientes</div>}
        <div className="form_container_customer">
          {status === "loading" ? (
            <Loader />
          ) : (
            <div className="input_customer_select">
              <div className="form_group_customer_select">
                <select
                  className="form_input_customer_select"
                  onChange={(e) => handleValue(e.target.value)}
                  placeholder=" "
                >
                  <option>Seleccionar</option>
                  {customers?.map((customer) => (
                    <option
                      key={customer.idcliente}
                      value={`${customer.idcliente}`}
                    >
                      {customer.apellido} {customer.nombre}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}

          <div className="input_customer">
            <div className="form_group_customer">
              <div className="form_input_customer">{watch("nombre")}</div>

              <label className="form_label_customer">Nombre</label>
            </div>
          </div>
          <div className="input_customer">
            <div className="form_group_customer">
              <div className="form_input_customer">{watch("apellido")}</div>
              <label className="form_label_customer">Apellido</label>
              <span className="form_line"></span>
            </div>
          </div>
          <div className="input_customer">
            <div className="form_group_customer">
              <div className="form_input_customer">{watch("telefono")}</div>
              <label className="form_label_customer">Telefono</label>
            </div>
            {errors.telefono?.type === "minLength" && (
              <p className="warning">el numero debe comenzar en 11</p>
            )}
          </div>
          <div className="input_customer">
            <div className="form_group_customer">
              <div className="form_input_customer">
                {watch("fecha_nacimiento")}
              </div>
              <label className="form_label_customer">Nacimiento</label>
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

export default CancelCustomer;
