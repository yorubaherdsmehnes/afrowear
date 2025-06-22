#!/bin/bash

# Exit on error
set -e

FRONTEND_DIR="frontend"
NAVBAR_DIR="$FRONTEND_DIR/src/components/Navbar"

echo "🧹 Consolidating all Navbar-related components into one folder..."

# Create main navbar folder
cd "$NAVBAR_DIR" || exit

# 1. Create SearchBar subcomponent
mkdir -p SearchBar
cat > SearchBar/index.tsx <<'EOL'
import React from 'react';
import styles from './module.scss';

const SearchBar: React.FC = () => {
  return (
    <div className={styles.search}>
      <input type="text" placeholder="Search..." />
      <button className={styles.searchBtn}>🔍</button>
    </div>
  );
};

export default SearchBar;
EOL

cat > SearchBar/module.scss <<'EOL'
@use '../../module.scss' as *;

.search {
  position: relative;
  display: inline-block;
  width: 100%;

  input {
    width: 100%;
    padding: 0.5rem 2rem 0.5rem 1rem;
    border: none;
    background: rgba(black, 0.6);
    color: white;
    font-size: 0.9rem;

    &:focus {
      outline: none;
      border: 1px solid #333;
    }
  }

  .searchBtn {
    position: absolute;
    right: 0;
    top: 0;
    height: 100%;
    width: 2.5rem;
    background: transparent;
    color: white;
    font-size: 1.2rem;
    cursor: pointer;
  }
}
EOL

# 2. Create CartIcon subcomponent
mkdir -p CartIcon
cat > CartIcon/index.tsx <<'EOL'
import React from 'react';
import styles from './module.scss';

const CartIcon: React.FC = () => {
  return (
    <div className={styles.cartWrapper}>
      <svg className={styles.cart} viewBox="0 0 24 24" width="24" height="24">
        <path fill="currentColor" d="M17,18C15.89,18 15,18.89 15,20A2,2 0 0,0 17,22A2,2 0 0,0 19,20C19,18.89 18.1,18 17,18Z M1,6H5L7,12H19L21,6H25V5H1Z M7,18C5.89,18 5,18.89 5,20A2,2 0 0,0 7,22A2,2 0 0,0 9,20C9,18.89 8.1,18 7,18Z" />
      </svg>
      <span className={styles.badge}>2</span>
    </div>
  );
};

export default CartIcon;
EOL

cat > CartIcon/module.scss <<'EOL'
@use '../../module.scss' as *;

.cartWrapper {
  position: relative;
  cursor: pointer;

  .cart {
    width: 24px;
    height: 24px;
    fill: white;
    transition: transform 0.2s ease;

    &:hover {
      transform: scale(1.1);
    }
  }

  .badge {
    position: absolute;
    top: -5px;
    right: -5px;
    background: red;
    color: white;
    border-radius: 50%;
    padding: 2px 6px;
    font-size: 0.6rem;
    font-weight: bold;
  }
}
EOL

# 3. Create main Navbar component
cat > index.tsx <<'EOL'
import React, { useState } from 'react';
import styles from './module.scss';

import SearchBar from './SearchBar';
import CartIcon from './CartIcon';

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className={styles.navbar}>
      <div className={styles.left}>
        <button onClick={() => setMenuOpen(!menuOpen)}>☰</button>
      </div>

      <div className={styles.center}>
        <h1>FD</h1>
      </div>

      <div className={styles.right}>
        <SearchBar />
        <CartIcon />
      </div>

      {/* Mobile Drawer */}
      <div className={`${styles.drawer} ${menuOpen ? styles.active : ''}`}>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/shop">Shop</a></li>
          <li><a href="/about">About</a></li>
          <li><a href="/tribe">Tribe</a></li>
          <li><a href="/journal">Journal</a></li>
          <li><a href="/notify">Notify</a></li>
        </ul>
      </div>

      {/* Overlay click handler */}
      {menuOpen && <div className={styles.overlay} onClick={() => setMenuOpen(false)}></div>}
    </nav>
  );
};

export default Navbar;
EOL

# 4. Create main Navbar SCSS module
cat > module.scss <<'EOL'
@use './CartIcon/module.scss' as cart;
@use './SearchBar/module.scss' as search;
@use '../../styles/variables' as *;
@use '../../styles/mixins' as *;

.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: rgba($black, 0.85);
  backdrop-filter: blur(10px);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  z-index: $z-navbar;
  border-bottom: 1px solid $gray-dark;

  .left,
  .right {
    width: 33%;
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .center {
    flex: 1;
    text-align: center;

    h1 {
      font-size: $text-xl;
      letter-spacing: 2px;
    }
  }

  .drawer {
    position: fixed;
    top: 0;
    left: -300px;
    bottom: 0;
    width: 300px;
    background: $black;
    padding: 2rem 1rem;
    transition: left 0.3s ease;
    z-index: $z-drawer;

    ul {
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
      padding: 1rem;

      li a {
        color: white;
        font-size: $text-base;
        text-decoration: none;
        transition: opacity 0.3s;

        &:hover {
          opacity: 0.7;
        }
      }
    }

    &.active {
      left: 0;
    }
  }

  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba($black, 0.5);
    z-index: $z-overlay;
  }
}

@include respond(md) {
  .navbar {
    .drawer {
      display: none;
    }

    .left {
      display: none;
    }

    .center {
      flex: 0 0 auto;
    }

    .right {
      justify-content: flex-end;
    }
  }
}
EOL

# Done
echo ""
echo "✅ Navbar and subcomponents consolidated!"
echo "📁 Created:"
echo "- Navbar/index.tsx"
echo "- Navbar/module.scss"
echo "- Navbar/SearchBar/index.tsx"
echo "- Navbar/SearchBar/module.scss"
echo "- Navbar/CartIcon/index.tsx"
echo "- Navbar/CartIcon/module.scss"
echo ""
echo "🚀 Next Steps:"
echo "1. Make sure other pages import Navbar like this:"
echo "   import Navbar from '../components/Navbar';"
echo "2. Run frontend: cd fd-streetwear/frontend && npm run dev"