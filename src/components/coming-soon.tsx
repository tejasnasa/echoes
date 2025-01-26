"use client";

import styles from "./coming-soon.module.css";
import { motion } from "framer-motion";

export default function ComingSoon() {
  return (
    <section className={styles.page}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className={styles.motion}
      >
        <div className={styles.box}>COMING SOON</div>
        <div className={styles.box2}>Stay Tuned</div>
      </motion.div>
    </section>
  );
}
