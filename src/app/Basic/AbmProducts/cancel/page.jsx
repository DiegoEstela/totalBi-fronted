"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import "./cancel.css";
import Swal from "sweetalert2";
import Loader from "@/app/components/Loader/Loader";
import { useQuery } from "react-query";
import { CancelProductFunction } from "@/api/products/cancelProduct";
import { getAllProducts } from "@/api/products/getAllProduts";

function CancelProduct() {
  const [prodId, setProdId] = useState();
  const [loader, setLoader] = useState(false);
  const { data: products, status } = useQuery("products", getAllProducts);
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
      text: "¿Deseas dar de baja a este producto?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, dar de baja",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        setLoader(false);
        CancelProductFunction(prodId);
        Swal.fire("¡producto dado de baja!", "", "success");
        router.push("/");
      } else {
        setLoader(false);
        Swal.fire("Operación cancelada", "", "info");
        router.push("/");
      }
    });
  };

  const handleValue = (id) => {
    const dataFinded = products?.data.find(
      (customer) => customer.idproducto === parseInt(id)
    );

    console.log(products);
    setProdId(id);
    setValue("concepto", dataFinded?.concepto);
    setValue("monto", dataFinded?.monto);
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
                {products?.data.map((product) => (
                  <option
                    key={product.idproducto}
                    value={`${product.idproducto}`}
                  >
                    {product.concepto}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="input_customer">
            <div className="form_group_customer">
              <div className="form_input_customer">{watch("concepto")}</div>
              <label className="form_label_customer">Producto</label>
            </div>
          </div>
          <div className="input_customer">
            <div className="form_group_customer">
              <div className="form_input_customer">{watch("monto")}</div>
              <label className="form_label_customer">Monto</label>
              <span className="form_line"></span>
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
