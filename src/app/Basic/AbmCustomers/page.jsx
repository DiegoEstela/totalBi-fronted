import ButtonComponent from "@/app/components/button/button";
import "./page.css";
function AbmCustomers() {
  return (
    <div className="container">
      <ButtonComponent text="Nuevo Cliente" />
      <ButtonComponent text="Editar Cliente" />
      <ButtonComponent text="Eliminar Cliente" />
    </div>
  );
}

export default AbmCustomers;
