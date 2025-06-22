import React, { Suspense, useEffect, useState } from "react";
import { useDrops } from "../../extras/hooks/useDrops";
import styles from "./Drop.module.scss";

import FeaturedItem from "./featured-item";
import FeaturedDrops from "./featured-drops";
import SubHeroBanner from "../../components/layout/sub-hero-banner";

export const Drop = () => {
  const { drops, loading, error } = useDrops();

      <main className="loading">
        <p>Loading...</p>
      </main>
  if (error) return <p>{error}</p>;
  return (
    <main className={styles.drop}>
      <SubHeroBanner
        subHeroText={"DROPS"}
        subtitle={"DROP ZONE"}
        CTAText={"View Our Collection"}
      />
      <FeaturedItem />
      <FeaturedDrops />
    </main>
  );
};
