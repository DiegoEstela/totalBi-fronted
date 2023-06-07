"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import "./addCustomer.css";
import Swal from "sweetalert2";
import Loader from "@/app/components/Loader/Loader";
import { getAllCustomers } from "@/api/customers/getAllCustomers";
import { EditCustomer } from "@/api/customers/editCustumers";
import {
  AiOutlineUser,
  AiOutlinePhone,
  AiOutlineCalendar,
} from "react-icons/ai";
import { useQuery } from "react-query";

function AddCustomers() {
  const [ClientId, setClientId] = useState();
  const [loader, setLoader] = useState(false);
  const { data: customers, status } = useQuery("customers", getAllCustomers);
  const router = useRouter();
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm();
  const onSubmit = async (data) => {
    setLoader(true);
    const result = await EditCustomer(data, ClientId);
    if (result) {
      setLoader(false);
      const creacionOk = await Swal.fire(
        "Creacion Exitosa",
        "El cliente se creo correctamente",
        "success"
      );
      creacionOk && router.push("/");
    } else {
      setLoader(false);
      await Swal.fire("Creacion Fallida", "Error al crear el usuario", "error");
    }
  };

  const handleValue = (id) => {
    const dataFinded = customers?.data.find(
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
          <div className="input_customer_select">
            <div className="form_group_customer_select">
              <select
                className="form_input_customer_select"
                onChange={(e) => handleValue(e.target.value)}
                placeholder=" "
              >
                <option>Seleccionar</option>
                {customers?.data.map((customer) => (
                  <option
                    key={customer.idcliente}
                    value={`${customer.idcliente}`}
                  >
                    {customer.apellido} {customer.nombre}
                  </option>
                ))}
              </select>
            </div>
            {errors.nombre?.type === "required" && (
              <p className="warning_customer">El nombre es requerido</p>
            )}
          </div>
          <div className="input_customer">
            <div className="form_group_customer">
              <AiOutlineUser color="#5c6b73" size="24" />
              <input
                className="form_input_customer"
                type="text"
                {...register("nombre", {
                  required: true,
                })}
                placeholder=" "
              />
              <label className="form_label_customer">Nombre</label>
            </div>
            {errors.nombre?.type === "required" && (
              <p className="warning_customer">El nombre es requerido</p>
            )}
          </div>
          <div className="input_customer">
            <div className="form_group_customer">
              <AiOutlineUser color="#5c6b73" size="24" />
              <input
                className="form_input_customer"
                type="text"
                {...register("apellido", {
                  required: true,
                })}
                placeholder=" "
              />
              <label className="form_label_customer">Apellido</label>
              <span className="form_line"></span>
            </div>
            {errors.apellido?.type === "required" && (
              <p className="warning_customer">El Apellido es requerido</p>
            )}
          </div>
          <div className="input_customer">
            <div className="form_group_customer">
              <AiOutlinePhone color="#5c6b73" size="24" />
              <input
                className="form_input_customer"
                type="numer"
                {...register("telefono", {
                  required: true,
                  maxLength: 10,
                  minLength: 10,
                })}
                placeholder=" "
              />
              <label className="form_label_customer">Telefono</label>
              {errors.telefono?.type === "maxLength" && (
                <p className="warning">
                  El numero ingresado no puede superar los 10 digitos
                </p>
              )}
            </div>
            {errors.telefono?.type === "minLength" && (
              <p className="warning">el numero debe comenzar en 11</p>
            )}
          </div>
          <div className="input_customer">
            <div className="form_group_customer">
              <AiOutlineCalendar color="#5c6b73" size="24" />
              <input
                className="form_input_customer"
                type="date"
                {...register("fecha_nacimiento", {
                  required: true,
                })}
              />
              <label className="form_label_customer">Nacimiento</label>
            </div>
            {errors.fecha_nacimiento?.type === "required" && (
              <p className="warning_customer">
                Complete la fecha de nacimiento
              </p>
            )}
          </div>
          {loader ? (
            <Loader />
          ) : (
            <input
              className="form_submit_customer"
              onClick={handleSubmit(onSubmit)}
              value="Editar"
            />
          )}
        </div>
      </form>
    </div>
  );
}

export default AddCustomers;
