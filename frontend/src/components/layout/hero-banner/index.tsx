import React, { FC, useEffect, useRef ,Suspense } from "react";
import styles from "./HeroBanner.module.scss";
import heroVideoMp4 from "../../../assets/videos/Behind the scenes Photoshoot1.webm";
import fallback from "../../../assets/images/fallback.webp";
import MediaLoader from "../../shared/lazyLoader/MediaLoader";

const HeroBanner: FC = () => {
  const typewriterRef = useRef<HTMLHeadingElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Typewriter Effect
  useEffect(() => {
    const element = typewriterRef.current;
    if (!element) return;

    let lineIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    const textLines = ["Express Yourself! ", "Impress Others! "];

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

  // Lazy Load Video
  // useEffect(() => {
  //   const video = videoRef.current;
  //   if (!video) return;

  //   const observer = new IntersectionObserver((entries) => {
  //     entries.forEach((entry) => {
  //       if (entry.isIntersecting) {
  //         video.src = heroVideoMp4;
  //         video.load();
  //         video.play().catch((err) => console.error("Autoplay failed:", err));
  //         observer.unobserve(video);
  //       }
  //     });
  //   });

  //   observer.observe(video);
  //   return () => {
  //     if (video) observer.unobserve(video);
  //   };
  // }, []);

  return (
    <section className={styles.hero}>
      <Suspense fallback={<MediaLoader />}>
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          poster={fallback} // Make sure this path is correct
          className={styles.heroVideo}
        >
          <source src={heroVideoMp4} type="video/mp4" /> {/* Empty src until loaded */}
          Your browser does not support the video tag.
        </video>
      </Suspense>

      <div className={styles.overlay}></div>
      <div className={styles.heroContent}>
        <h1 className={styles.typewriter} ref={typewriterRef}></h1>
        <p className={styles.heroSubtitle}>AFROWEAR // COVER PAGE</p>
        <div className={styles.heroButtons}>
          <button
            onClick={() => {
              const element = document.getElementById("featured-item");
              element?.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
          >
            🔥 Check the Latest Fit
          </button>
        </div>
        <div className={styles.scrollIndicator}>▼ Scroll to Explore</div>
      </div>
    </section>
  );
};

export default HeroBanner;
