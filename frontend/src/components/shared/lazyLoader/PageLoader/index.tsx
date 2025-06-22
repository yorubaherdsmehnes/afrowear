import React, { useEffect, useState } from "react";
import styles from "./PageLoader.module.scss";
import graffitiSVG from "../../../../assets/images/Lazyload.svg?url";

const PageLoader: React.FC<{ isVisible: boolean }> = ({ isVisible }) => {
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!isVisible) return;

    // Animate progress bar
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 95) {
          clearInterval(interval);
          return 95;
        }
        return prev + 2; // Adjust animation speed
      });
    }, 30);

    // Minimum loader duration of 2 seconds
    const timer = setTimeout(() => {
      setProgress(100);
      setIsLoaded(true);
    }, 2000);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  const graffitiText = "AFROWEAR.com.ng"

  return (
    <div
      className={`${styles.loaderContainer} ${isLoaded ? styles.fadeOut : ""}`}
    >
      <div className={`${styles.grafittiWrapper} ${styles.glitchWrapper}`}>
        <span className={`${styles.grafittiText} ${styles.glitchText}`}>{graffitiText}</span>
        <span className={`${styles.grafittiText} ${styles.glitchText} ${styles.glitchText_blue}`}>{graffitiText}</span>
        <span className={`${styles.grafittiText} ${styles.glitchText} ${styles.glitchText_red}`}>{graffitiText}</span>
      </div>
      <p className={styles.loadingText}>Loading drops...</p>
      <div className={styles.progressBar}>
        <span
          className={styles.progress}
          style={{ width: `${progress}%` }}
        ></span>
      </div>
    </div>
  );
};

export default PageLoader;
