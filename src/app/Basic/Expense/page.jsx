"use client";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useQuery } from "react-query";
import { getAllServices } from "@/api/services/getAllServices";
import Loader from "@/app/components/Loader/Loader";
import Swal from "sweetalert2";
import "./expense.css";
import { createExpense } from "@/api/expense/createExpense";
import { AuthContext } from "@/context/AuthProvider";
import { getUserData } from "@/api/user/getUserData";
import { BiMoney } from "react-icons/bi";

function Expense() {
  const [loader, setLoader] = useState(false);
  const { user } = useContext(AuthContext);
  const userData = getUserData(user?.uid);
  const { data: services, status } = useQuery(["services", userData], () =>
    getAllServices(userData)
  );
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    setLoader(true);
    const userData = await getUserData(user?.uid);
    const result = await createExpense(data, userData?.userId);
    if (result) {
      setLoader(false);
      const creacionOk = await Swal.fire("Creacion Exitosa", "", "success");
      creacionOk && router.push("/");
    } else {
      setLoader(false);
      await Swal.fire("Creacion Erronea", "", "error");
    }
  };

  const handleSelectChange = (serviceId) => {
    const serviceSelected = services.find(
      (service) => service.idservicio === serviceId
    );
    if (serviceSelected) {
      setValue("idServicio", serviceSelected?.idservicio);
      setValue("monto", serviceSelected?.monto);
      setValue("nombreServicio", serviceSelected?.concepto);
    }
  };

  return (
    <div className="container_revenue">
      <form className="formComponent_revenue">
        {status === "error" && <div>Error al obtener los servicios</div>}
        <div className="form_container_revenue">
          <div className="input_revenue_select">
            <div className="form_group_revenue_select">
              <select
                className="form_input_revenue_select"
                onChange={(e) => handleSelectChange(parseInt(e.target.value))}
                placeholder=" "
              >
                <option>Servcio</option>
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
          <div className="form_group_revenue_select">
            <select
              className="form_input_revenue_select"
              placeholder=" "
              {...register("metodoPago")}
            >
              <option> Metodo de pago</option>
              <option> Efectivo</option>
              <option> Mercado pago</option>
              <option> Banco</option>
            </select>
          </div>
          <div className="form_group_revenue">
            <BiMoney color="#5690f2" size="24" />
            <input
              className="form_input_revenue"
              type="number"
              {...register("monto", {
                required: true,
              })}
              placeholder=" "
            />
            <label className="form_label_revenue">Monto</label>
          </div>
          {errors.monto?.type === "required" && (
            <p className="warning_revenue">Elija un producto para guardar</p>
          )}
          {status === "loading" || loader ? (
            <Loader />
          ) : (
            <input
              className="form_submit_revenue"
              onClick={handleSubmit(onSubmit)}
              value="Agregar"
            />
          )}
        </div>
      </form>
    </div>
  );
}

export default Expense;
