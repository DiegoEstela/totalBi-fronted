import ButtonComponent from "@/app/components/button/button";
import "./page.css";
function AbmCustomers() {
  return (
    <div className="container">
      <ButtonComponent text="Nuevo Cliente" path="/Basic/AbmCustomers/add" />
      <ButtonComponent text="Editar Cliente" path="/Basic/AbmCustomers/edit" />
      <ButtonComponent text="Eliminar Cliente" />
    </div>
  );
}

export default AbmCustomers;
