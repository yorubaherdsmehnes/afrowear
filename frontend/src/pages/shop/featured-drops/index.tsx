import React, { useState, useEffect } from "react";
import { useDrops, DropCard } from "../../../extras/hooks/useDrops";
import styles from "./FeaturedDrops.module.scss";
import ProductCard from "./productCard";

const FeaturedDrops = () => {
  const { drops, loading, error } = useDrops();
  const [activeFilter, setActiveFilter] = useState("all");

  const filteredDrops =
    activeFilter === "all"
      ? drops
      : drops.filter((drop) => drop.category.includes(activeFilter));


  const openPreOrderModal = (product: DropCard) => {
    // Your modal logic here
    alert(`Requesting pre-order for ${product.product_name}`);
  };

  return (
    <section id="featured-drops" className={styles.featuredDrops}>
      <div className={styles.filterBarContainer}>
        <div className={styles.filterBar}>
          <button
            className={`${styles.filterBtn} ${
              activeFilter === "all" ? styles.active : ""
            }`}
            onClick={() => setActiveFilter("all")}
          >
            All
          </button>
          <button
            className={`${styles.filterBtn} ${
              activeFilter === "all" ? styles.active : ""
            }`}
            onClick={() => setActiveFilter("first")}
          >
            First Drop
          </button>
          <button
            className={`${styles.filterBtn} ${
              activeFilter === "all" ? styles.active : ""
            }`}
            onClick={() => setActiveFilter("dashiki")}
          >
            Dashiki
          </button>
          <button
            className={`${styles.filterBtn} ${
              activeFilter === "all" ? styles.active : ""
            }`}
            onClick={() => setActiveFilter("jacket")}
          >
            Jacket
          </button>
        </div>
      </div>

      <div className={styles.productGrid}>
        {filteredDrops.map((drop) => (
          <ProductCard
            key={drop.id}
            product={drop}
            onCtaClick={() => openPreOrderModal(drop)}
          />
        ))}
      </div>
    </section>
  );
};

export default FeaturedDrops;
