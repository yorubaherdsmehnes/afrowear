

# Write Navbar.tsx
cat << 'EOL' > components/layout/navbar/index.tsx
import React, { useState } from "react";
import styles from "./Navbar.module.scss";

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>FD</div>
      <ul className={`${styles.menu} ${menuOpen ? styles.active : ""}`}>
        <li><a href="/">Home</a></li>
        <li><a href="/shop">Shop</a></li>
        <li><a href="/collab">Collab</a></li>
        <li><a href="/about">About</a></li>
      </ul>
      <button onClick={() => setMenuOpen(!menuOpen)} className={styles.menuToggle}>
        ☰
      </button>
    </nav>
  );
};
EOL

# Write Navbar.module.scss
cat << 'EOL' > components/layout/navbar/Navbar.module.scss
.navbar {
  position: fixed;
  top: 0;
  width: 100%;
  padding: 1rem 2rem;
  background-color: transparent;
  z-index: 999;
}

.logo {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 1.5rem;
  letter-spacing: 1px;
  font-weight: 300;
}

.menu {
  display: flex;
  gap: 2rem;
  list-style: none;
  margin: 0;
  padding: 0;
}

.menu li a {
  font-size: 1rem;
  transition: color 0.3s ease;
}

.menu li a:hover {
  color: #aaa;
}

.menuToggle {
  display: none;
  cursor: pointer;
}

@media (max-width: 768px) {
  .menu {
    position: fixed;
    top: 0;
    left: -100%;
    flex-direction: column;
    background: black;
    width: 100%;
    height: 100%;
    padding-top: 4rem;
    transition: left 0.3s ease-in-out;
  }

  .menu.active {
    left: 0;
  }

  .menu li {
    padding: 1rem;
    text-align: center;
  }

  .menuToggle {
    display: block;
  }
}
EOL

# Write Footer.tsx
cat << 'EOL' > components/layout/footer/index.tsx
import React from "react";
import styles from "./Footer.module.scss";

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p>&copy; 2025 FD x Afrowae. Built in Lagos. Worn everywhere.</p>
    </footer>
  );
};
EOL

# Write Footer.module.scss
cat << 'EOL' > components/layout/footer/Footer.module.scss
.footer {
  text-align: center;
  padding: 2rem;
  border-top: 1px solid #333;
  font-size: 0.9rem;
  color: #555;
  margin-top: 4rem;
}
EOL

# Write Home.tsx
cat << 'EOL' > pages/home/index.tsx
import React from "react";
import styles from "./Home.module.scss";
import { HeroBanner } from "./hero-banner/HeroBanner";
import { FeaturedDrops } from "./featured-drops/FeaturedDrops";
import { LifestyleGallery } from "./lifestyle-gallery/LifestyleGallery";

export const Home = () => {
  return (
    <main className={styles.home}>
      <HeroBanner />
      <FeaturedDrops />
      <LifestyleGallery />
    </main>
  );
};
EOL

# Write Home.module.scss
cat << 'EOL' > pages/home/Home.module.scss
@import "../../styles/variables";
@import "../../styles/mixins";

.home {
  padding-top: 80px;
}
EOL

# Write HeroBanner.tsx
cat << 'EOL' > pages/home/hero-banner/index.tsx
import React from "react";
import styles from "./HeroBanner.module.scss";

export const HeroBanner = () => {
  return (
    <section className={styles.hero}>
      <video autoPlay loop muted>
        <source src="https://cdn.pixabay.com/video/2021/05/11/71709-562961731_large.mp4"  type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className={styles.overlay}></div>
      <div className={styles.content}>
        <h1>FD x Afrowae // Made for the ones who move silent.</h1>
        <button>View the Collab</button>
      </div>
    </section>
  );
};
EOL

# Write HeroBanner.module.scss
cat << 'EOL' > pages/home/hero-banner/HeroBanner.module.scss
.hero {
  position: relative;
  height: 100vh;
  overflow: hidden;
}

.hero video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1;
}

.content {
  position: relative;
  z-index: 2;
  text-align: center;
  color: white;
  padding: 2rem;
}

.content h1 {
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
}

.content button {
  padding: 0.8rem 1.5rem;
  border: 1px solid white;
  background: transparent;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
}

.content button:hover {
  background: white;
  color: black;
}
EOL

# Write FeaturedDrops.tsx
cat << 'EOL' > pages/home/featured-drops/index.tsx
import React from "react";
import styles from "./FeaturedDrops.module.scss";

export const FeaturedDrops = () => {
  return (
    <section className={styles.featured}>
      <div className={styles.product}>
        <img src="https://source.unsplash.com/800x600/?streetwear,man,nigeria" alt="Nightwalker Jacket" />
        <div className={styles.info}>
          <span className={styles.tag}>Limited Edition</span>
          <h3>NIGHTWALKER JACKET</h3>
          <p>Built for the ones who move silent.</p>
          <div className={styles.stock}>Only 3 left — Don't miss out.</div>
          <button>Add to Cart</button>
        </div>
      </div>
    </section>
  );
};
EOL

# Write FeaturedDrops.module.scss 
cat << 'EOL' > pages/home/featured-drops/FeaturedDrops.module.scss
@import "../../../styles/variables";
@import "../../../styles/mixins";

.featured {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  padding: 4rem 2rem;
  max-width: 1200px;
  margin: auto;
}

.product {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  align-items: center;
}

.product img {
  width: 100%;
  height: auto;
  display: block;
}

.info {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.tag {
  text-transform: uppercase;
  font-size: 0.8rem;
  color: #888;
  margin-bottom: 0.5rem;
}

.info h3 {
  font-size: 1.8rem;
  margin-bottom: 1rem;
}

.info p {
  color: #ccc;
  margin-bottom: 1rem;
}

.stock {
  font-size: 0.9rem;
  color: $accent;
  margin-bottom: 1rem;
}

.info button {
  padding: 0.6rem 1rem;
  border: 1px solid white;
  background: transparent;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
}

.info button:hover {
  background: white;
  color: black;
}

@media (min-width: 768px) {
  .product {
    grid-template-columns: 1fr 1fr;
    gap: 3rem;
  }
}
EOL

# Write LifestyleGallery.tsx
cat << 'EOL' > pages/home/lifestyle-gallery/index.tsx
import React from "react";
import styles from "./LifestyleGallery.module.scss";

export const LifestyleGallery = () => {
  return (
    <section className={styles.gallery}>
      <h2>#fdtribe</h2>
      <div className={styles.grid}>
        <img src="https://source.unsplash.com/400x400/?streetwear,women,nigeria" alt="UGC 1" />
        <img src="https://source.unsplash.com/400x400/?streetwear,man,lagos" alt="UGC 2" />
        <img src="https://source.unsplash.com/400x400/?fashion,urban,nigeria" alt="UGC 3" />
        <img src="https://source.unsplash.com/400x400/?casual,stylized,nigeria" alt="UGC 4" />
      </div>
    </section>
  );
};
EOL

# Write LifestyleGallery.module.scss 
cat << 'EOL' > pages/home/lifestyle-gallery/LifestyleGallery.module.scss
@import "../../../styles/variables";
@import "../../../styles/mixins";

.gallery {
  padding: 4rem 2rem;
  max-width: 1200px;
  margin: auto;
}

.gallery h2 {
  font-size: 1.5rem;
  text-align: center;
  margin-bottom: 2rem;
}

.grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

@media (min-width: 768px) {
  .grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

.grid img {
  width: 100%;
  height: auto;
  aspect-ratio: 1 / 1;
  object-fit: cover;
}
EOL