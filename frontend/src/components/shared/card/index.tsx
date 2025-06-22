import React from 'react';
import styles from './Card.module.scss';

interface CardProps {
  image: string;
  title: string;
  description?: string;
  price?: string;
  category?: string;
  badge?: string;
  status?: 'available' | 'sold-out';
}

const Card: React.FC<CardProps> = ({
  image,
  title,
  description,
  price,
  badge,
  status
}) => {
  return (
    <div className={styles.card}>
      {badge && <span className={styles.cardBadge}>{badge}</span>}
      
      <div className={styles.cardImage}>
        <img src={image} alt={title} />
      </div>

      <div className={styles.cardInfo}>
        <h3 className={styles.cardTitle}>{title}</h3>
        
        {description && (
          <p className={styles.cardDescription}>{description}</p>
        )}

        {price && (
          <div className={styles.cardMeta}>
            <span>{price}</span>
            <span className={`status ${status ? styles[status] : ''}`}>
              {status === 'sold-out' ? 'Sold Out' : 'Available'}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;