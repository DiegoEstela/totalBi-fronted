import styles from "./button.module.css";

function ButtonComponent({ text, onClick }) {
  return (
    <button className={styles.ButtonComponent} onClick={onClick}>
      {text}
    </button>
  );
}

export default ButtonComponent;
