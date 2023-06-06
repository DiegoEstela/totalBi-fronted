"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/db/db";
import "./Login.css";
import Swal from "sweetalert2";
import Loader from "../components/Loader/Loader";

function Login() {
  const router = useRouter();
  const [loader, setLoader] = useState(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      setLoader(true);
      const { email, password } = data;
      const result = await signInWithEmailAndPassword(auth, email, password);
      if (result) {
        setLoader(false);
        const creacionOk = await Swal.fire("Bienvenido", "", "success");
        creacionOk && router.replace("/");
      }
    } catch (err) {
      setLoader(false);
      await Swal.fire(
        "El Usuario no existe",
        "Error al iniciar sesión",
        "error"
      );
    }
  };

  return (
    <div className="container">
      <form className="formComponent">
        <h1 className="form_title">Login</h1>
        <div className="form_container">
          <div className="form_group">
            <input
              className="form_input"
              type="text"
              {...register("email", {
                required: true,
              })}
              placeholder=" "
            />
            <label className="form_label">Email</label>
            <span className="form_line"></span>
            {errors.email?.type === "required" && (
              <p className="warning">El email es requerido</p>
            )}
          </div>
          <div className="form_group">
            <input
              className="form_input"
              type="password"
              {...register("password", {
                required: true,
              })}
              placeholder=" "
            />
            <label className="form_label">Password</label>
            <span className="form_line"></span>
            {errors.password?.type === "required" && (
              <p className="warning">El password es requerido</p>
            )}
          </div>
          {loader ? (
            <Loader />
          ) : (
            <input
              className="form_submit"
              onClick={handleSubmit(onSubmit)}
              value="Iniciar Sesion"
            />
          )}
        </div>
      </form>
    </div>
  );
}

export default Login;
