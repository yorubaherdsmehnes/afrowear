import React from "react";
import styles from "./Modal.module.scss";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  image: string;
  price?: string;
  onAddToCart?: () => void;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
  image,
  price,
  onAddToCart
}) => {
  return (
    <>
      {isOpen && (
        <div className={`${styles.modalOverlay}`} onClick={onClose}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button className={styles.closeBtn} onClick={onClose}>✕</button>
            <div className={styles.modalBody}>
              <div className={styles.modalImage}>
                <img src={image} alt={title} />
              </div>
              <div className={styles.modalDetails}>
                <h2>{title}</h2>
                {description && <p>{description}</p>}
                {price && <p className={styles.modalPrice}>{price}</p>}
                <select className={styles.sizeSelect}>
                  <option>Select Size</option>
                  <option>Small</option>
                  <option>Medium</option>
                  <option>Large</option>
                  <option>XL</option>
                </select>
                <button className={styles.addToCartBtn} onClick={onAddToCart || onClose}>
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;