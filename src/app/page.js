"use client";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import styles from "./page.module.css";
import { FcComboChart } from "react-icons/fc";
const Home = ({ children }) => {
  const router = useRouter();
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1.5 } },
  };

  const titleVariants = {
    hidden: { opacity: 0, y: -100 },
    visible: { opacity: 1, y: 0, transition: { duration: 1, delay: 0.5 } },
  };

  const subtitleVariants = {
    hidden: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0, transition: { duration: 1, delay: 1 } },
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, delay: 1.5 },
    },
  };

  return (
    <motion.div
      className={styles.container}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.h1 className={styles.title} variants={titleVariants}>
        <FcComboChart size="90px" />
      </motion.h1>
      <motion.p className={styles.subtitle} variants={subtitleVariants}>
        El negocio en tu bolsillo
      </motion.p>
      <motion.button
        className={styles.button}
        variants={buttonVariants}
        onClick={() => router.push("/Basic/AbmCustomers")}
      >
        Empezar
      </motion.button>
    </motion.div>
  );
};

export default Home;
