import ButtonComponent from "@/app/components/button/button";
import { useRouter } from "next/navigation";
import "./page.css";
function AbmCustomers() {
  return (
    <div className="container">
      <ButtonComponent text="Nuevo Cliente" path="/Basic/AbmCustomers/add" />
      <ButtonComponent text="Editar Cliente" />
      <ButtonComponent text="Eliminar Cliente" />
    </div>
  );
}

export default AbmCustomers;
