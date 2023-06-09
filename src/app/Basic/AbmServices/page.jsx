import ButtonComponent from "@/app/components/button/button";
import "./page.css";
function AbmServices() {
  return (
    <div className="container">
      <ButtonComponent text="Nuevo servicio" path="/Basic/AbmServices/add" />
      <ButtonComponent
        text="Eliminar servicio"
        path="/Basic/AbmServices/cancel"
      />
    </div>
  );
}

export default AbmServices;
