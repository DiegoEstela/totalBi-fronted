import "./sidebar.css";
import {
  BiUserPin,
  BiPackage,
  BiBulb,
  BiCalendarPlus,
  BiCalendarMinus,
  BiWindowClose,
  BiAbacus,
} from "react-icons/bi";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { BiMenuAltRight } from "react-icons/bi";
import { useRouter } from "next/navigation";
import { auth } from "@/db/db";
import { useContext, useState } from "react";
import { AuthContext } from "@/context/AuthProvider";
import { getUserData } from "@/api/user/getUserData";
import { useQuery } from "react-query";

export default function Sidebar({ isOpen, setSidebarOpen, setModule }) {
  const [showBox, setShowBox] = useState(true);
  const router = useRouter();
  const { user } = useContext(AuthContext);
  const { data: userData, isSuccess } = useQuery(["userData", user?.uid], () =>
    getUserData(user?.uid)
  );

  const handleLogout = async () => {
    await auth.signOut();
    await setSidebarOpen(!isOpen);
    router.push("/");
  };

  const habldeRoute = (path, module) => {
    router.push(`/Basic/${path}`);
    setModule(module);
    setSidebarOpen(!isOpen);
  };

  return (
    <>
      <div className={`sidebar${isOpen ? "_open" : "_close"}`}>
        <div className={`sidebar_container${isOpen ? "_open" : "_close"}`}>
          <header className="sidebar_header">
            <h1 className="sidebar_title">Total Biz</h1>
            <BiMenuAltRight
              color="white"
              size="40px"
              onClick={() => setSidebarOpen(!isOpen)}
            />
          </header>

          <div className="sidebar_account">
            {isSuccess && <h2>{userData.titleApp}</h2>}
            <div className="sidebar_account_row">
              {showBox ? (
                <>
                  <p className="account_p">
                    {" "}
                    Caja : <span className="account_span"> *** </span>
                  </p>
                  <AiFillEye
                    color="white"
                    size="24px"
                    onClick={() => setShowBox(!showBox)}
                  />
                </>
              ) : (
                <>
                  <p className="account_p">
                    {" "}
                    Caja : <span className="account_span"> $+54.321</span>
                  </p>
                  <AiFillEyeInvisible
                    color="white"
                    size="24px"
                    onClick={() => setShowBox(!showBox)}
                  />
                </>
              )}
            </div>
          </div>
          <ul className="sidebar_nav">
            <li
              className="sidebar_tab"
              onClick={() => habldeRoute("AbmCustomers", "Clientes")}
            >
              <BiUserPin color="#ce7c00" size="32px" />
              <p className="tab_p">CLIENTES</p>
            </li>
            <li
              className="sidebar_tab"
              onClick={() => habldeRoute("AbmProducts", "Productos")}
            >
              <BiPackage color="#ce7c00" size="32px" />
              <p className="tab_p">PRODUCTOS</p>
            </li>
            <li
              className="sidebar_tab"
              onClick={() => habldeRoute("AbmServices", "Servicios")}
            >
              <BiBulb color="#ce7c00" size="32px" />
              <p className="tab_p">SERVICIOS</p>
            </li>
          </ul>
          <span className="sidebar_line" />
          <ul className="sidebar_nav_quick">
            <li
              className="sidebar_tab"
              onClick={() => habldeRoute("Revenue", "Ingreso")}
            >
              <BiCalendarPlus color="#439775" size="32px" />
              <p className="tab_quick_p_ing">INGRESO</p>
            </li>
            <li
              className="sidebar_tab"
              onClick={() => habldeRoute("Expense", "Egreso")}
            >
              <BiCalendarMinus color="#732C2C" size="32px" />
              <p className="tab_quick_p_eg">EGRESO</p>
            </li>
          </ul>
          <span className="sidebar_line" />
          <ul className="sidebar_nav">
            <li
              className="sidebar_tab"
              onClick={() => habldeRoute("Resume", "Resumen")}
            >
              <BiAbacus color="#ce7c00" size="32px" />
              <p className="tab_p">RESUMEN</p>
            </li>
          </ul>
          <button className="sidebar_button" onClick={handleLogout}>
            <BiWindowClose color="#5690f2" size="32px" />
            <p className="sidebar_button_p">CERRAR SESION</p>
          </button>
          <p className="sidebar_signature"> Powered by DEFJFF</p>
        </div>
      </div>
      <div
        className={`overlay${isOpen ? "_open" : ""}`}
        onClick={() => setSidebarOpen(!isOpen)}
      />
    </>
  );
}
