import React, { useState, useRef, useEffect } from 'react';
import styles from './searchbar.module.scss';

interface SearchBarProps {
  onClose?: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onClose }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input when rendered
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <div className={styles.searchBar}>
      <input ref={inputRef} type="text" placeholder="Search drops, products, stories..." />
      <span className={styles.closeBtn} onClick={onClose}>✕</span>
    </div>
  );
};

export default SearchBar;