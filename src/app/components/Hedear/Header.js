import styles from "./Header.module.css";
import { BiMenu } from "react-icons/bi";

export default function Header({ isOpen, setSidebarOpen }) {
  return (
    <header className={styles.Header}>
      <div className="icon" onClick={() => setSidebarOpen(!isOpen)}>
        <BiMenu color="#f6f1f1" size="50px" />
      </div>
    </header>
  );
}
