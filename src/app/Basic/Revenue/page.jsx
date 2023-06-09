"use client";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useQuery } from "react-query";
import { getAllCustomers } from "@/api/customers/getAllCustomers";
import { getAllProducts } from "@/api/products/getAllProduts";
import Loader from "@/app/components/Loader/Loader";
import Swal from "sweetalert2";
import { AiOutlineUser } from "react-icons/ai";
import "./revenue.css";
import { createRevenue } from "@/api/revenue/createRevenue";
import { AuthContext } from "@/context/AuthProvider";
import { getUserData } from "@/api/user/getUserData";

function Revenue() {
  const [loader, setLoader] = useState(false);
  const { user } = useContext(AuthContext);
  const userData = getUserData(user?.uid);
  const { data: customers, status } = useQuery(["customers", userData], () =>
    getAllCustomers(userData)
  );
  const { data: products, isLoading } = useQuery(["products", userData], () =>
    getAllProducts(userData)
  );
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoader(true);
    const userData = await getUserData(user?.uid);
    const result = await createRevenue(data, userData?.userId);
    if (result) {
      setLoader(false);
      const creacionOk = await Swal.fire("Creacion Exitosa", "", "success");
      creacionOk && router.push("/");
    } else {
      setLoader(false);
      await Swal.fire("Creacion Erronea", "", "error");
    }
  };

  const handleSelectChange = (prodId) => {
    const productSelected = products.find((prod) => prod.idproducto === prodId);
    if (productSelected) {
      setValue("idCliente", customers[0]?.idcliente);
      setValue("idProducto", productSelected?.idproducto);
      setValue("monto", productSelected?.monto);
      setValue("nombreProducto", productSelected?.concepto);
    }
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
                {...register("idCliente")}
                placeholder=" "
              >
                <option>Cliente</option>
                {customers?.map((customer) => (
                  <option
                    key={customer.idcliente}
                    value={`${customer.idcliente}`}
                  >
                    {customer.nombre} {customer.apellido}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="form_group_customer_select">
            <select
              className="form_input_customer_select"
              onChange={(e) => handleSelectChange(parseInt(e.target.value))}
            >
              <option> Producto</option>
              {products?.map((product) => (
                <option
                  key={product.idproducto}
                  value={`${product.idproducto}`}
                >
                  {product.concepto}
                </option>
              ))}
            </select>
          </div>
          <div className="form_group_customer_select">
            <select
              className="form_input_customer_select"
              placeholder=" "
              {...register("metodoPago")}
            >
              <option> Metodo de pago</option>
              <option> Efectivo</option>
              <option> Mercado pago</option>
              <option> Banco</option>
            </select>
          </div>
          <div className="form_group_customer">
            <AiOutlineUser color="#5c6b73" size="24" />
            <input
              className="form_input_customer"
              type="number"
              {...register("monto", {
                required: true,
              })}
              placeholder=" "
            />
            <label className="form_label_customer">Monto</label>
            {errors.monto?.type === "required" && (
              <p className="warning_customer">Elija un producto para guardar</p>
            )}
          </div>
          {loader | isLoading ? (
            <Loader />
          ) : (
            <input
              className="form_submit_customer"
              onClick={handleSubmit(onSubmit)}
              value="Agregar"
            />
          )}
        </div>
      </form>
    </div>
  );
}

export default Revenue;
