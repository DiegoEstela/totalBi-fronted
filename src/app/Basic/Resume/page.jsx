"use client";
import "./resume.css";
import { useForm } from "react-hook-form";
import { BiSearch } from "react-icons/bi";
import moment from "moment";
import { useState } from "react";
import { getAccountByDate } from "@/api/accounts/getAccountByDate";

function Resume() {
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
    setDisplay(true);
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
                    {account.monto < 0 ? (
                      <span style={{ color: "red" }}>{account.monto}</span>
                    ) : (
                      <span style={{ color: "green" }}>{account.monto}</span>
                    )}
                    {account.metodopago} {account.nombreproducto}
                  </div>
                ))
              ) : (
                <p> no hay datos para mostrar</p>
              )}
            </>
          ) : (
            <p>buscar la fecha de tu resumen </p>
          )}
        </div>
      </div>
      <div className="resume_footer">
        <span className="resume_footer_search" onClick={handleSubmit(onSubmit)}>
          <BiSearch color="#ff9900" size="40px" />
        </span>
      </div>
    </div>
  );
}

export default Resume;
