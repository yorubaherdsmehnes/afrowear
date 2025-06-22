import React from "react";
import styles from "./Catalog.module.scss";
import maleOutfit1 from "../../../assets/images/Lifestyle card/Female Agba Light.webp";
import maleOutfit2 from "../../../assets/images/Lifestyle card/Female Agba Light 2.webp";
import maleOutfit3 from "../../../assets/images/Lifestyle card/Female Agba Light 3.webp";
import maleOutfit4 from "../../../assets/images/Lifestyle card/Female Agba Light 4.webp";
import maleOutfit5 from "../../../assets/images/Lifestyle card/Female Agba Light 5.webp";
import maleOutfit6 from "../../../assets/images/Lifestyle card/Female Agba Light 6.webp";
import maleOutfit7 from "../../../assets/images/Lifestyle card/Female Agba Light 7.webp";

import femaleOutfit1 from "../../../assets/images/Lifestyle card/Female Ankara Lap Drape.webp";
import femaleOutfit2 from "../../../assets/images/Lifestyle card/Female Ankara Lap Drape 2.webp";
import femaleOutfit3 from "../../../assets/images/Lifestyle card/Female Ankara Lap Drape 3.webp";
import femaleOutfit4 from "../../../assets/images/Lifestyle card/Female Ankara Lap Drape 10.webp";
import femaleOutfit5 from "../../../assets/images/Lifestyle card/Female Ankara Lap Drape 5.webp";
import femaleOutfit6 from "../../../assets/images/Lifestyle card/Female Ankara Lap Drape 6.webp";
import femaleOutfit7 from "../../../assets/images/Lifestyle card/Female Ankara Lap Drape 7.webp";
import femaleOutfit8 from "../../../assets/images/Lifestyle card/Female Ankara Lap Drape 8.webp";
import femaleOutfit9 from "../../../assets/images/Lifestyle card/Female Ankara Lap Drape 9.webp";
import AsyncMedia from "../../../components/shared/lazyLoader/MediaLoader/AsyncMedia";

const Catalog: React.FC = () => {
  const galleryItems = [
    {
      image: maleOutfit1,
      caption: "",
    },
    {
      image: maleOutfit2,
      caption: "",
    },
    {
      image: maleOutfit3,
      caption: "",
    },
    {
      image: maleOutfit4,
      caption: "",
    },
    {
      image: maleOutfit5,
      caption: "",
    },
    {
      image: maleOutfit6,
      caption: "",
    },
    {
      image: maleOutfit7,
      caption: "",
    },
    {
      image: femaleOutfit1,
      caption: "",
    },
    {
      image: femaleOutfit2,
      caption: "",
    },
    {
      image: femaleOutfit3,
      caption: "",
    },
    {
      image: femaleOutfit4,
      caption: "",
    },
    {
      image: femaleOutfit5,
      caption: "",
    },
    {
      image: femaleOutfit6,
      caption: "",
    },
    {
      image: femaleOutfit7,
      caption: "",
    },
    {
      image: femaleOutfit8,
      caption: "",
    },
    // {
    //   image: femaleOutfit9,
    //   caption: ""
    // },
  ];

  return (
    <section id="lifestyle-gallery" className={styles.section}>
      <div className={styles.lifestyleGallery}>
        <h2>#AfrowearStyleGallery</h2>
        <div className={styles.galleryGrid}>
          {galleryItems.map((item, index) => (
            <div key={index} className={styles.galleryItem}>
              <AsyncMedia src={item.image} alt={`UGC ${index + 1}`}  />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Catalog;
