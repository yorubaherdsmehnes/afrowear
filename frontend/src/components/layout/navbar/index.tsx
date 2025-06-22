import React, { useState } from "react";
import styles from "./Navbar.module.scss";
import NavbarDrawer from "../navbar_drawer";
import SearchBar from "./Searchbar";
import CartOffcanvas from "./CartOffcanvas";
import logo from "../../../assets/images/afrowear logo.webp"
import {
  FiMenu as FiMenuIcon,
  FiSearch as FiSearchIcon,
  FiShoppingCart as FiShoppingCartIcon,
} from "react-icons/fi";
import { IconBaseProps } from "react-icons";

const MenuIcon = FiMenuIcon as unknown as (props: IconBaseProps) => JSX.Element;
const SearchIcon = FiSearchIcon as unknown as (
  props: IconBaseProps
) => JSX.Element;
const ShoppingCartIcon = FiShoppingCartIcon as unknown as (
  props: IconBaseProps
) => JSX.Element;

const Navbar: React.FC = () => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [isSearchOpen, setSearchOpen] = useState(false);
  const [isCartOpen, setCartOpen] = useState(false);

  return (
    <>
      <header className={styles.navbar}>
        <div className={styles.logo}><span>AfroWear</span>   <img src={logo} alt="" /></div>

        {/* Desktop Nav */}
        <nav className={styles.desktopNav}>
          <a href="/">Home</a>
          <a href="/drop">Drops</a>
          <a href="/journal">Journal</a>
          <a href="/tribe">Tribe</a>
          <span
            className={styles.navIcon}
            onClick={() => setSearchOpen(!isSearchOpen)}
          >
            <SearchIcon />
          </span>
        </nav>
        {/* <span className={styles.cartIcon} onClick={() => setCartOpen(true)}>
          <ShoppingCartIcon />
          <span className={styles.cartBadge}>0</span>
        </span> */}

        {/* Mobile Menu Button */}
        <span className={styles.menuToggle} onClick={() => setDrawerOpen(true)}>
          <MenuIcon />
        </span>
      </header>

      {/* Search Bar - Toggles below navbar */}
      {isSearchOpen && <SearchBar onClose={() => setSearchOpen(false)} />}

      {/* Side Drawer for Mobile Nav */}
      <NavbarDrawer
        isOpen={isDrawerOpen}
        onClose={() => setDrawerOpen(false)}
      />

      {/* Cart Sidebar */}
      <CartOffcanvas isOpen={isCartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
};

export default Navbar;
