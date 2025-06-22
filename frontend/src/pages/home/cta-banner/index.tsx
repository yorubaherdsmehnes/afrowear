import React from "react";
import styles from "./CtaBanner.module.scss";

const CtaBanner = () => {
  return (
    <section className={styles.cta_banner}>
      <h1>Join the movement. Shop now.</h1>
      <p>Explore our latest collection inspired by culture and identity.</p>
      <button className={styles.cta_button}>Shop Now</button>
    </section>
  );
};

export default CtaBanner;