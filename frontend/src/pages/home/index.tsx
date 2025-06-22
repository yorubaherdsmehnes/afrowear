import React, { Suspense } from "react";
import styles from "./home.module.scss";
import MediaLoader from "../../components/shared/lazyLoader/MediaLoader";
import { useDrops } from "../../extras/hooks/useDrops";

// Lazy Load Components
const HeroBanner = React.lazy(
  () => import("../../components/layout/hero-banner")
);
const MagazineBanner = React.lazy(() => import("./magazine-banner"));
const QuoteManifesto = React.lazy(() => import("./quote-manifesto"));
const CtaBanner = React.lazy(() => import("./cta-banner"));
const Catalog = React.lazy(() => import("./catalog"));

const Home = () => {
  // ✅ Now useDrops() is inside the component
  const { drops, loading, error } = useDrops();

  if (loading)
    return (
      <main className="loading">
        <p>Loading...</p>
      </main>
    );
  if (error) return <p>{error}</p>;

  return (
    <main className={styles.home}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <Suspense fallback={<MediaLoader />}>
          <HeroBanner />
        </Suspense>
      </section>

      {/* Loop through drops */}
      {drops.map((item, index) => (
        <React.Fragment key={index}>
          <QuoteManifesto quote={item.quote} quoteAuthor={item.quote_author} />
          <Suspense fallback={<MediaLoader />}>
            <MagazineBanner
              src={item.product_image}
              srcSet={`
                ${item.product_image}?width=375 375w,
                ${item.product_image}?width=750 750w,
                ${item.product_image}?width=1080 1080w,
                ${item.product_image}?width=1440 1440w,
                ${item.product_image}?width=1920 1920w
              `}
              alt={item.product_name}
              heading={item.main_category}
              subtitle={item.subtitle}
              ctaLink="/shop"
            />
          </Suspense>
        </React.Fragment>
      ))}

      {/* CTA Banner */}
      <CtaBanner />

      {/* Product Catalog */}
      <Suspense fallback="Loading catalog...">
        <Catalog />
      </Suspense>
    </main>
  );
};

export default Home;
