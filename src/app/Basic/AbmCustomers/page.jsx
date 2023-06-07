import ButtonComponent from "@/app/components/button/button";
import "./page.css";
function AbmCustomers() {
  return (
    <div className="container">
      <ButtonComponent text="Nuevo cliente" path="/Basic/AbmCustomers/add" />
      <ButtonComponent text="Editar cliente" path="/Basic/AbmCustomers/edit" />
      <ButtonComponent
        text="Eliminar Cliente"
        path="/Basic/AbmCustomers/cancel"
      />
    </div>
  );
}

export default AbmCustomers;
