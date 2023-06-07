"use client";
import styles from "./Header.module.css";
import { useRouter } from "next/navigation";
import { BiHomeAlt2, BiMenuAltLeft } from "react-icons/bi";

export default function Header({ isOpen, setSidebarOpen, setModule, module }) {
  const router = useRouter();
  const hableHome = () => {
    setModule("home");
    router.push("/");
  };
  return (
    <header className={styles.Header}>
      <div className={styles.icon} onClick={() => setSidebarOpen(!isOpen)}>
        <BiMenuAltLeft color="#f6f1f1" size="34px" />
      </div>

      <h2 className={styles.Header_title}> {module}</h2>

      <div className={styles.icon} onClick={hableHome}>
        <BiHomeAlt2 color="#f6f1f1" size="34px" />
      </div>
    </header>
  );
}
