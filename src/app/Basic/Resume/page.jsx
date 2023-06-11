"use client";
import "./resume.css";
import { useForm } from "react-hook-form";
import { BiCaretDown, BiCaretUp, BiSearch } from "react-icons/bi";
import moment from "moment";
import { useState } from "react";
import { getAccountByDate } from "@/api/accounts/getAccountByDate";

function Resume() {
  const [ingresos, setIngresos] = useState();
  const [egresos, setEgresos] = useState();
  const [display, setDisplay] = useState(false);
  const [accounts, setAccounts] = useState();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = async (data) => {
    const { desde, hasta } = data;
    const res = await getAccountByDate(desde, hasta);
    setAccounts(res.data);
    console.log(res.data);
    handleIngresos(res.data);
    handleEgresos(res.data);
    setDisplay(true);
  };

  const handleIngresos = (accounts) => {
    const allIngresos = accounts.filter((account) => {
      return account?.nombreproducto;
    });
    const totalIngresos = allIngresos.reduce(
      (total, allIngresos) => total + parseInt(allIngresos?.monto),
      0
    );
    setIngresos(totalIngresos);
  };

  const handleEgresos = (accounts) => {
    const allEgresos = accounts.filter((account) => {
      return account?.nombreservicio;
    });
    const totalEgresos = allEgresos.reduce(
      (total, allEgresos) => total + parseInt(allEgresos?.monto),
      0
    );
    setEgresos(totalEgresos);
  };

  return (
    <div className="container_resume">
      <form className="resume_date">
        <div className="container_date">
          <input
            className="date_input"
            type="date"
            {...register("desde")}
            defaultValue={moment().subtract(1, "day").format("YYYY-MM-DD")}
          />
          <label className="date_label">Desde</label>
        </div>
        <div className="container_date">
          <input
            className="date_input"
            type="date"
            {...register("hasta")}
            defaultValue={moment().format("YYYY-MM-DD")}
          />
          <label className="date_label">Hasta</label>
        </div>
      </form>
      <div className="resume">
        <div className="resume_tab_container">
          {display ? (
            <>
              {accounts.length ? (
                accounts.map((account, key) => (
                  <div className="resume_tabs" key={key}>
                    <div className="rowAccount">
                      {account.monto < 0 ? (
                        <span className="spanAccount">
                          <BiCaretDown color="red" size="32px" />
                          <span style={{ color: "red" }}>{account.monto}</span>
                        </span>
                      ) : (
                        <span className="spanAccount">
                          <BiCaretUp color="green" size="32px" />
                          <span style={{ color: "green" }}>
                            {account.monto}
                          </span>
                        </span>
                      )}
                      <span>{account.metodopago}</span>

                      {account.nombreproducto ? (
                        <p>
                          {" "}
                          <b>Producto: </b>
                          {account.nombreproducto}
                        </p>
                      ) : (
                        <p>
                          {" "}
                          <b>Servcio: </b>
                          {account.nombreservicio}
                        </p>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <p> no hay datos para mostrar</p>
              )}
            </>
          ) : (
            <p>Buscar la fecha de tu resumen </p>
          )}
        </div>
      </div>
      <div className="resume_footer">
        <span className="ingresosSpan">
          <p className="ingresosP">INGRESOS</p>
          <p>{ingresos}</p>
        </span>
        <span className="resume_footer_search" onClick={handleSubmit(onSubmit)}>
          <BiSearch color="#ff9900" size="40px" />
        </span>
        <span className="egresosSpan">
          <p className="egresosP">EGRESOS</p>
          <p>{egresos}</p>
        </span>
      </div>
    </div>
  );
}

export default Resume;
