"use client";
import styles from "./button.module.css";
import { useRouter } from "next/navigation";

function ButtonComponent({ text, path }) {
  const router = useRouter();
  return (
    <button
      className={styles.ButtonComponent}
      onClick={() => router.push(path)}
    >
      {text}
    </button>
  );
}

export default ButtonComponent;
