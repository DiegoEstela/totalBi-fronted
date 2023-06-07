import ButtonComponent from "@/app/components/button/button";
import "./page.css";
function AbmProducts() {
  return (
    <div className="container">
      <ButtonComponent text="Nuevo producto" path="/Basic/AbmProducts/add" />
      <ButtonComponent
        text="Eliminar producto"
        path="/Basic/AbmProducts/cancel"
      />
    </div>
  );
}

export default AbmProducts;
