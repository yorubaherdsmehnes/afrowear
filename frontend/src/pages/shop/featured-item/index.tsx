import React, { useState, useEffect } from "react";
import { useDrops, DropCard } from "../../../extras/hooks/useDrops";
import styles from "./FeaturedItem.module.scss";
import { FiLock as FiLockIcon } from "react-icons/fi";
import { IconBaseProps } from "react-icons";
import AsyncMedia from "../../../components/shared/lazyLoader/MediaLoader/AsyncMedia";

const FeaturedItem: React.FC = () => {
  const LockIcon = FiLockIcon as unknown as (
    props: IconBaseProps
  ) => JSX.Element;

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
    <>
      <h2 className={styles.heading}>Featured Drops</h2>
      {filteredDrops.length > 0 && (
        <section className={styles.featured}>
          <div className={styles.imageWrapper}>
            <span className={styles.badge}>{filteredDrops[0].overlay_tag}</span>

            <AsyncMedia
              src={filteredDrops[0].product_image}
              alt={filteredDrops[0].product_name}
              className={styles.featuredImage}
            />
          </div>

          <div className={styles.productInfo}>
            <h3 className={styles.productName}>
              {filteredDrops[0].product_name}
            </h3>
            <p className={styles.description}>
              {" "}
              {filteredDrops[0].description}
            </p>

            <div className={styles.stock}>
              {/* {filteredDrops[0].availability_text}  */}
            </div>

            <button
              className={styles.addToCartBtn}
              onClick={() => openPreOrderModal(filteredDrops[0])}
            >
              <LockIcon /> {filteredDrops[0].cta_text}
            </button>

            {/* <p className={styles.shippingInfo}>
              Free shipping worldwide | Paystack & Flutterwave supported
            </p> */}
          </div>
        </section>
      )}
    </>
  );
};

export default FeaturedItem;
