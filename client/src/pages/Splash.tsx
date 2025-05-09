import React, { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import styles from '../styles/Splash.module.css';
import ilavaLogo from '../assets/ilava-logo.svg';
import { FaLeaf, FaShoppingBasket } from 'react-icons/fa';

export default function Splash() {
  const [, setLocation] = useLocation();
  const [showButtons, setShowButtons] = useState(false);

  useEffect(() => {
    // Show user type buttons after animation
    const timer = setTimeout(() => {
      setShowButtons(true);
    }, 1500); // Match with animation timing

    return () => clearTimeout(timer);
  }, []);

  const handleUserTypeSelection = (userType: 'farmer' | 'buyer') => {
    // Store user type selection in localStorage
    localStorage.setItem('userType', userType);
    // Navigate to login page
    setLocation('/login');
  };

  return (
    <div className={styles.splashContainer}>
      <div className={styles.logoContainer}>
        <img src={ilavaLogo} alt="Ilava Logo" className={styles.logo} />
        <h1 className={styles.title}>ILAVA</h1>
        <p className={styles.subtitle}>Creating wealth from agricultural waste</p>
      </div>

      {showButtons && (
        <div className={styles.buttonContainer}>
          <button 
            className={`${styles.userTypeButton} ${styles.farmerButton}`}
            onClick={() => handleUserTypeSelection('farmer')}
          >
            <FaLeaf className={styles.buttonIcon} />
            <span className={styles.buttonText}>I'm a Farmer</span>
          </button>
          
          <button 
            className={`${styles.userTypeButton} ${styles.buyerButton}`}
            onClick={() => handleUserTypeSelection('buyer')}
          >
            <FaShoppingBasket className={styles.buttonIcon} />
            <span className={styles.buttonText}>I'm a Buyer</span>
          </button>
        </div>
      )}
    </div>
  );
}