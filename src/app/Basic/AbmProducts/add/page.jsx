"use client";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import "./addCustomer.css";
import Swal from "sweetalert2";
import Loader from "@/app/components/Loader/Loader";
import { getUserData } from "@/api/user/getUserData";
import { AuthContext } from "@/context/AuthProvider";
import { BiPackage, BiMoney } from "react-icons/bi";
import { useRouter } from "next/navigation";
import { CreateProduct } from "@/api/products/createProduct";

function AddProducts() {
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
    const result = await CreateProduct(data, userData?.userId);
    if (result) {
      setLoader(false);
      const creacionOk = await Swal.fire("Producto creado", "", "success");
      creacionOk && router.push("/");
    } else {
      setLoader(false);
      await Swal.fire("Creacion Fallida", "", "error");
    }
  };
  return (
    <div className="container_customer">
      <form className="formComponent_customer">
        <div className="form_container_customer">
          <div className="input_customer">
            <div className="form_group_customer">
              <BiPackage color="#5c6b73" size="24px" />
              <input
                className="form_input_customer"
                type="text"
                {...register("concepto", {
                  required: true,
                })}
                placeholder=" "
              />
              <label className="form_label_customer">Producto</label>
            </div>
            {errors.concepto?.type === "required" && (
              <p className="warning_customer">
                El nombre del producto es requerido
              </p>
            )}
          </div>
          <div className="input_customer">
            <div className="form_group_customer">
              <BiMoney color="#5c6b73" size="24" />
              <input
                className="form_input_customer"
                type="number"
                {...register("monto", {
                  required: true,
                })}
                placeholder=" "
              />
              <label className="form_label_customer">Monto</label>
              <span className="form_line"></span>
            </div>
            {errors.monto?.type === "required" && (
              <p className="warning_customer">
                El monto del producto es requerido
              </p>
            )}
          </div>
          {loader ? (
            <Loader />
          ) : (
            <input
              className="form_submit_customer"
              onClick={handleSubmit(onSubmit)}
              value="Agregar producto"
            />
          )}
        </div>
      </form>
    </div>
  );
}

export default AddProducts;
