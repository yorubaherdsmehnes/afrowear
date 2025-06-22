import React from "react";
import styles from "./UnderConstruction.module.scss";
import graffiti from "../../assets/images/Page Under Construction.svg";

const UnderConstruction = () => {
  const graffitiText = "PAGE UNDER CONSTRUCTION";

  return (
    <section className={styles.construction}>
      <div className={styles.content}>
        <div className={styles.container}>
          <div className={`${styles.svgContainer} ${styles.glitchEffect}`}>
            <div
              className={`${styles.grafittiWrapper} ${styles.glitchWrapper}`}
            >
              <span className={`${styles.grafittiText} ${styles.glitchText}`}>
                {graffitiText}
              </span>
              <span
                className={`${styles.grafittiText} ${styles.glitchText} ${styles.glitchText_blue}`}
              >
                {graffitiText}
              </span>
              <span
                className={`${styles.grafittiText} ${styles.glitchText} ${styles.glitchText_red}`}
              >
                {graffitiText}
              </span>
            </div>
          </div>
        </div>
        <p className={styles.subtitle}>
          🚧 This section is still building culture.
        </p>
      </div>
    </section>
  );
};

export default UnderConstruction;
