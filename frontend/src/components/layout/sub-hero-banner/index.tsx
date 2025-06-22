import React, { FC, useEffect, useRef, Suspense } from "react";
import styles from "./SubHeroBanner.module.scss";
import fallback from "../../../assets/images/fallback.webp";

interface SubHeroProps {
  typewriterText?: Array<string>;
  subHeroText: string;
  subtitle: string;
  CTAText: string;
}

const SubHeroBanner: FC<SubHeroProps> = ({
  typewriterText,
  subHeroText,
  subtitle,
  CTAText,
}) => {
  const typewriterRef = useRef<HTMLHeadingElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Typewriter Effect
  useEffect(() => {
    const element = typewriterRef.current;
    if (!element) return;

    let lineIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    const textLines = ["Express Yourself ", "Impress Others "];

    const type = () => {
      const currentLine = textLines[lineIndex];

      if (isDeleting) {
        element.textContent = currentLine.substring(0, charIndex--);
      } else {
        element.textContent = currentLine.substring(0, charIndex++);
      }

      let delay = isDeleting ? 50 : 100;

      if (!isDeleting && charIndex === currentLine.length) {
        delay = 2000; // Pause at end of line
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        lineIndex = (lineIndex + 1) % textLines.length;
        delay = 500; // Pause before typing next line
      }

      setTimeout(type, delay);
    };

    type();
  }, []);

  return (
    <section className={styles.hero}>
      <div className={styles.heroTextHolder}>
        <span className={styles.heroText}>{subHeroText}</span>
      </div>
      <div className={styles.overlay} />
      <div className={styles.heroContent}>
        <h1 className={styles.typewriter} ref={typewriterRef}></h1>
        <p className={styles.heroSubtitle}>AFROWEAR // {subtitle}</p>
        <div className={styles.heroButtons}>
          <button
            onClick={() => {
              const element = document.getElementById("scroll-item");
              element?.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
          >
            🔥 {CTAText}
          </button>
        </div>
        <div className={styles.scrollIndicator}>▼ Scroll to Explore</div>
      </div>
    </section>
  );
};

export default SubHeroBanner;
