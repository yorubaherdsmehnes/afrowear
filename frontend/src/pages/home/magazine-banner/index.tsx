import React from "react";
import styles from "./MagazineBanner.module.scss";
import AsyncMedia from "../../../components/shared/lazyLoader/MediaLoader/AsyncMedia";

interface MagazineBannerProps {
  src: string;
  srcSet?: string;
  alt: string;
  heading: string;
  subtitle?: string;
  ctaText?: string;
  ctaLink?: string;
}

const MagazineBanner: React.FC<MagazineBannerProps> = ({
  src,
  srcSet,
  alt,
  heading,
  subtitle,
  ctaText,
  ctaLink = "/shop",
}) => {
  return (
    <section id="featured-item" className={styles.imageBanner}>
      <div className={styles.mediaWrapper}>
        <AsyncMedia src={src} alt={alt} className={styles.bannerImage} />
      </div>

      <div className={styles.bannerContent}>
        <div className={styles.bannerBox}>
          <h2 className={styles.heading}>
            <span>{heading}</span>
          </h2>

          {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        </div>
      </div>
    </section>
  );
};

export default MagazineBanner;
