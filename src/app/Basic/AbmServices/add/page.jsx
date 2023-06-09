"use client";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { CreateServices } from "@/api/services/createService";
import Swal from "sweetalert2";
import Loader from "@/app/components/Loader/Loader";
import "./addServices.css";
import { AuthContext } from "@/context/AuthProvider";
import { getUserData } from "@/api/user/getUserData";
import { BiBulb } from "react-icons/bi";

function AddServices() {
  const [loader, setLoader] = useState(false);
  const { user } = useContext(AuthContext);
  const router = useRouter();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = async (data) => {
    setLoader(true);
    const userData = await getUserData(user?.uid);
    const result = await CreateServices(data, userData?.userId);
    if (result) {
      setLoader(false);
      const creacionOk = await Swal.fire(
        "Creacion Exitosa",
        "El servicio se creo correctamente",
        "success"
      );
      creacionOk && router.push("/");
    } else {
      setLoader(false);
      await Swal.fire("Creacion Fallida", "Error al crear el usuario", "error");
    }
  };
  return (
    <div className="container_customer">
      <form className="formComponent_customer">
        <div className="form_container_customer">
          <div className="input_customer">
            <div className="form_group_customer">
              <BiBulb size="32px" />
              <input
                className="form_input_customer"
                type="text"
                {...register("concepto", {
                  required: true,
                })}
                placeholder=" "
              />
              <label className="form_label_customer">Nombre del servicio</label>
              {errors.concepto?.type === "required" && (
                <p className="warning_customer">El nombre es requerido</p>
              )}
            </div>
          </div>
          {loader ? (
            <Loader />
          ) : (
            <input
              className="form_submit_customer"
              onClick={handleSubmit(onSubmit)}
              value="Agregar servicio"
            />
          )}
        </div>
      </form>
    </div>
  );
}

export default AddServices;
