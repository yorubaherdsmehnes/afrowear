// src/components/ProductCard/ProductCard.tsx
import React, { useState } from "react";
import ReactDOM from "react-dom";
import styles from "./ProductCard.module.scss";
import Modal from "./Modal";

import { useCountdown } from "../../../../extras/utils/time";
import { FiClock as FiClockIcon, FiLock as FiLockIcon } from "react-icons/fi";
import { IconBaseProps } from "react-icons";
import AsyncMedia from "../../../../components/shared/lazyLoader/MediaLoader/AsyncMedia";

const ClockIcon = FiClockIcon as unknown as (
  props: IconBaseProps
) => JSX.Element;
const LockIcon = FiLockIcon as unknown as (props: IconBaseProps) => JSX.Element;

interface ProductCardProps {
  product: {
    product_name: string;
    drop_date: string;
    overlay_tag: string;
    cta_text: string;
    description?: string;
    product_image: string;
  };
  onCtaClick: () => void;
}

interface FormData {
  full_name: string;
  email: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onCtaClick }) => {
  const timeLeft = useCountdown(product.drop_date);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    full_name: "",
    email: "",
  });

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formErrors, setFormErrors] = useState<Record<string, string[]>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("http://localhost:8000/api/request/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      setSuccess(true);
    } else {
      const err = await res.json();
      setFormErrors(err);
      setError("Something went wrong. Please check your input.");
    }
  };

  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <AsyncMedia src={product.product_image} alt={product.product_name} />
        <span className={styles.badge}>{product.overlay_tag}</span>
      </div>

      {/* Product details */}
      <div className={styles.details}>
        <h3 className={styles.productName}>{product.product_name}</h3>
        {/* <div className={styles.countdown}>
          {" "}
          <ClockIcon /> {timeLeft}
        </div> */}
        <button
          className={styles.ctaButton}
          onClick={() => setIsModalOpen(true)}
        >
          <LockIcon /> Request Pre-Order
        </button>
      </div>

      {/* Modal */}

      {/* Modal using Portal */}
      {/* Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <form className={styles.modalForm} onSubmit={handleSubmit}>
          {!success ? (
            <>
              <h3>🔔 Join the Movement</h3>
              <input
                type="text"
                name="full_name"
                placeholder="Full Name"
                value={formData.full_name}
                onChange={handleChange}
                required
              />
              {formErrors.full_name && (
                <p className={styles.errorMessage}>{formErrors.full_name[0]}</p>
              )}

              <input
                type="email"
                name="email"
                placeholder="Your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              {formErrors.email && (
                <p className={styles.errorMessage}>{formErrors.email[0]}</p>
              )}

              <button type="submit">📩 Submit</button>
              {error && <p className={styles.errorMessage}>{error}</p>}
            </>
          ) : (
            <p className={styles.successMessage}>
              Thanks! We’ll keep you updated.
            </p>
          )}
        </form>
      </Modal>
    </div>
  );
};

export default ProductCard;
