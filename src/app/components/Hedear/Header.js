"use client";
import styles from "./Header.module.css";
import { useRouter } from "next/navigation";
import { TbSmartHome, TbAdjustmentsFilled } from "react-icons/tb";

export default function Header({ isOpen, setSidebarOpen, setModule, module }) {
  const router = useRouter();
  const hableHome = () => {
    setModule("home");
    router.push("/");
  };
  return (
    <header className={styles.Header}>
      <div className={styles.icon} onClick={() => setSidebarOpen(!isOpen)}>
        <TbAdjustmentsFilled color="#f6f1f1" size="34px" />
      </div>

      <h2 className={styles.Header_title}> {module}</h2>

      <div className={styles.icon} onClick={hableHome}>
        <TbSmartHome color="#f6f1f1" size="34px" />
      </div>
    </header>
  );
}
