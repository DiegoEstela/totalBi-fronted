import "./sidebar.css";
import {
  BiUserPin,
  BiPackage,
  BiBulb,
  BiCalendarPlus,
  BiCalendarMinus,
  BiWindowClose,
} from "react-icons/bi";

export default function Sidebar({ isOpen, setSidebarOpen }) {
  return (
    <>
      <div className={`sidebar${isOpen ? "_open" : "_close"}`}>
        <div className={`sidebar_container${isOpen ? "_open" : "_close"}`}>
          <h1 className="sidebar_title">TotalBi</h1>
          <div className="sidebar_account">
            <h2> Nombre de empresa </h2>
            <p className="account_p"> Caja : ***</p>
          </div>
          <ul className="sidebar_nav">
            <li className="sidebar_tab">
              <BiUserPin color="#ce7c00" size="32px" />
              <p className="tab_p">CLIENTES</p>
            </li>
            <li className="sidebar_tab">
              <BiPackage color="#ce7c00" size="32px" />
              <p className="tab_p">PRODUCTOS</p>
            </li>
            <li className="sidebar_tab">
              <BiBulb color="#ce7c00" size="32px" />
              <p className="tab_p">SERVICIOS</p>
            </li>
          </ul>
          <span className="sidebar_line" />
          <ul className="sidebar_nav_quick">
            <li className="sidebar_tab">
              <BiCalendarPlus color="#439775" size="32px" />
              <p className="tab_quick_p_ing">INGRESO</p>
            </li>
            <li className="sidebar_tab">
              <BiCalendarMinus color="#732C2C" size="32px" />
              <p className="tab_quick_p_eg">EGRESO</p>
            </li>
          </ul>
          <span className="sidebar_line" />
          <button className="sidebar_button">
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
