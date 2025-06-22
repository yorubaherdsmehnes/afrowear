import React from 'react';
import styles from './Button.module.scss';

interface ButtonProps {
  variant?: 'primary' | 'secondary';
  children: React.ReactNode;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ variant = 'primary', children, onClick }) => {
  return (
    <button className={`${styles.button} ${variant === 'secondary' ? styles.secondary : ''}`} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;