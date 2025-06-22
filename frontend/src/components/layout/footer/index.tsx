import React, { useState } from "react";
import styles from "./Footer.module.scss";

const Footer: React.FC = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  const res = await fetch("http://localhost:8000/api/subscribe/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      full_name: fullName,
      email: email,
    }),
  });

  if (!res.ok) {
    const err = await res.json();
    console.error(err); // See what went wrong
    alert("Something went wrong. Please try again.");
    return;
  }

  const data = await res.json();
  alert(data.message || "Subscribed successfully!");
};

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        {/* About Section */}
        <div className={styles.footerSection}>
          <h3>Afrowear</h3>
          <p>Rooted in Lagos. Worn everywhere.</p>
        </div>

        {/* Shop Section */}
        <div className={styles.footerSection}>
          <h3>Shop</h3>
          <ul>
            <li>
              <a href="/shop">New Drops</a>
            </li>
            <li>
              <a href="/shop">Hoodies</a>
            </li>
            <li>
              <a href="/shop">Tees</a>
            </li>
            <li>
              <a href="/shop">Accessories</a>
            </li>
            <li>
              <a href="/shop">All Products</a>
            </li>
          </ul>
        </div>

        {/* Community Section */}
        <div className={styles.footerSection}>
          <h3>Community</h3>
          <ul>
            <li>
              <a href="/tribe">#AfrowearTribe</a>
            </li>
            <li>
              <a href="/journal">Journal</a>
            </li>
            <li>
              <a href="/collabs">Collabs</a>
            </li>
            <li>
              <a href="/join">Join the Movement</a>
            </li>
          </ul>
        </div>

        {/* Newsletter Section */}
        <div className={`${styles.footerSection} ${styles.newsletter}`}>
          <h3>Stay in the Loop</h3>
          <p>
            Get early access to drops, behind-the-scenes, and exclusive tribe
            content.
          </p>
          <form className={styles.joinForm} onSubmit={handleSubmit}>
            {!success ? (
              <>
                <input
                  type="text"
                  placeholder="Your Name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
                <input
                  type="email"
                  placeholder="Your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button type="submit">Subscribe</button>
                {error && <p className={styles.errorMessage}>{error}</p>}
              </>
            ) : (
              <p>Thanks for joining the tribe. Stay sharp.</p>
            )}
          </form>
          <small>No spam. Just the sauce.</small>
        </div>
      </div>

      {/* Utility Bar */}
      <div className={styles.utilityBar}>
        <div className={styles.copyright}>
          © 2025 Afrowear. All rights reserved.
        </div>
        <div className={styles.socialIcons}>
          <a href="https://www.instagram.com/afrowear.com.ng">Instagram</a>
          <a href="https://www.tiktok.com/@afrowear.com.ng">TikTok</a>
          <a href="https://x.com/afrowear_com_ng">Twitter</a>
          <a href="https://www.threads.com/@afrowear.com.ng">Threads</a>
          <a href="https://www.youtube.com/@afrowear_com_ng">YouTube</a>
          <a href="https://www.pinterest.com/afrowearcomng/">Pinterest</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
