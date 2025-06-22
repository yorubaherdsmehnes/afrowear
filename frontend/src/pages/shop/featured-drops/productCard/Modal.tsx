// Modal.tsx
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import styles from "./ProductCard.module.scss";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  const [imageWidth, setImageWidth] = useState<number | null>(null);
  const [imageHeight, setImageHeight] = useState<number | null>(null);

  const handleImageLoad = (
    e: React.SyntheticEvent<HTMLImageElement>
  ) => {
    const img = e.currentTarget;
    setImageWidth(img.naturalWidth);
    setImageHeight(img.naturalHeight);
  };

  useEffect(() => {
    if (!isOpen) {
      setImageWidth(null);
      setImageHeight(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <>
      <div className={styles.modalOverlay} onClick={onClose}>
        <div
          className={styles.modalContent}
          onClick={(e) => e.stopPropagation()}
          style={{
            maxWidth: imageWidth ? `${Math.min(imageWidth, window.innerWidth * 0.7)}px` : "70vw",
            maxHeight: imageHeight ? `${Math.min(imageHeight, window.innerHeight * 0.8)}px` : "80vh",
          }}
        >
          <div className={styles.modalInner}>
            {React.Children.map(children, (child) => {
              if (React.isValidElement(child) && child.type === "img") {
                const imgElement = child as React.ReactElement<
                  React.ImgHTMLAttributes<HTMLImageElement>
                >;

                return React.cloneElement(imgElement, {
                  onLoad: (e: React.SyntheticEvent<HTMLImageElement>) => {
                    handleImageLoad(e);
                    imgElement.props.onLoad?.(e);
                  },
                });
              }
              return child;
            })}
          </div>
        </div>
      </div>
    </>,
    document.body
  );
};

export default Modal;



