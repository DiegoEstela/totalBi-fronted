"use client";
import styles from "./Header.module.css";
import { useRouter } from "next/navigation";
import { TbSmartHome, TbAdjustmentsFilled } from "react-icons/tb";

export default function Header({ isOpen, setSidebarOpen, module }) {
  const router = useRouter();
  return (
    <header className={styles.Header}>
      <div className={styles.icon} onClick={() => setSidebarOpen(!isOpen)}>
        <TbAdjustmentsFilled color="#f6f1f1" size="40px" />
      </div>

      <h2 className={styles.Header_title}> {module}</h2>

      <div className={styles.icon} onClick={() => router.push("/")}>
        <TbSmartHome color="#f6f1f1" size="40px" />
      </div>
    </header>
  );
}
