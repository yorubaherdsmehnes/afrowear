import React, { useState } from 'react';
import styles from './cart_offcanvas.module.scss';



interface CartItem {
  id: number;
  image: string;
  name: string;
  price: string;
  quantity: number;
}

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartSidebar: React.FC<CartSidebarProps> = ({ isOpen, onClose }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 1,
      image: 'https://placehold.co/100x100/1a1a1a/white?text=Lagos+Hoodie',
      name: 'Lagos Hoodie',
      price: '₦28,000',
      quantity: 1,
    },
    {
      id: 2,
      image: 'https://placehold.co/100x100/1a1a1a/white?text=City+Lights+Jacket',
      name: 'City Lights Jacket',
      price: '₦34,500',
      quantity: 2,
    },
  ]);

  const handleQuantityChange = (id: number, delta: number) => {
    setCartItems(prev =>
      prev.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + parseFloat(item.price.replace('₦', '')) * item.quantity,
    0
  );

  const isEmpty = cartItems.length === 0;

  return (
    <div className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
      <div className={styles.overlay} onClick={onClose}></div>
      <div className={styles.sidebarContent}>
        <span className={styles.closeBtn} onClick={onClose}>&times;</span>
        <h2>Your Cart</h2>

        {isEmpty ? (
          <div className={styles.emptyState}>
            <p>Your tribe hasn’t picked anything yet.</p>
            <button onClick={onClose}>Start Shopping</button>
          </div>
        ) : (
          <>
            <ul className={styles.cartList}>
              {cartItems.map((item) => (
                <li key={item.id} className={styles.cartItem}>
                  <img src={item.image} alt={item.name} />
                  <div className={styles.itemDetails}>
                    <h3>{item.name}</h3>
                    <p>{item.price}</p>
                    <div className={styles.quantityControls}>
                      <button onClick={() => handleQuantityChange(item.id, -1)}>-</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => handleQuantityChange(item.id, 1)}>+</button>
                    </div>
                    <button className={styles.removeItem} onClick={() => removeItem(item.id)}>✕ Remove</button>
                  </div>
                </li>
              ))}
            </ul>

            <div className={styles.summary}>
              <div className={styles.subtotal}>
                <strong>Subtotal:</strong> ₦{subtotal.toFixed(2)}
              </div>
              <button className={styles.checkoutBtn}>Checkout →</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartSidebar;