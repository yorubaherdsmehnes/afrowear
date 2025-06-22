import React, { useRef, useEffect } from "react";
import styles from "./NavbarDrawer.module.scss";
import {
  FiSearch as FiSearchIcon,
  FiShoppingCart as FiShoppingCartIcon,
  FiX as FiCloseIcon,
} from "react-icons/fi";
import { IconBaseProps } from "react-icons";

const CloseIcon = FiCloseIcon as unknown as (
  props: IconBaseProps
) => JSX.Element;
const SearchIcon = FiSearchIcon as unknown as (
  props: IconBaseProps
) => JSX.Element;
const ShoppingCartIcon = FiShoppingCartIcon as unknown as (
  props: IconBaseProps
) => JSX.Element;

interface NavbarDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const NavbarDrawer: React.FC<NavbarDrawerProps> = ({ isOpen, onClose }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input when rendered
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);
  return (
    <div
      className={`${styles.drawerOverlay} ${isOpen ? styles.open : ""}`}
      onClick={onClose}
    >
      <div
        className={styles.drawerContent}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.drawerHeader}>
          <span className={styles.closeBtn} onClick={onClose}>
            <CloseIcon/>
          </span>
          <span className={styles.cartIcon} onClick={onClose}>
            <ShoppingCartIcon />
          </span>
        </div>
        {/* Drawer Search Bar */}
        <div className={styles.searchBar}>
          <input
            ref={inputRef}
            type="text"
            placeholder="Search drops, products, stories..."
          />
          <span className={styles.searchIcon}>
            <SearchIcon />
          </span>
        </div>

        {/* Mobile Navigation */}
        <nav className={styles.mobileNav}>
          <a href="/" onClick={onClose}>
            Home
          </a>
          <a href="/drop" onClick={onClose}>
            Drops
          </a>
          <a href="/journal" onClick={onClose}>
            Journal
          </a>
          <a href="/tribe" onClick={onClose}>
            Tribe
          </a>
          <a href="/account" onClick={onClose}>
            Account
          </a>
        </nav>
      </div>
    </div>
  );
};

export default NavbarDrawer;
