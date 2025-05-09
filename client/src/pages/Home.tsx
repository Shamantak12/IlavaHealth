import React, { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import styles from '../styles/Home.module.css';
import ilavaLogo from '../assets/ilava-logo.svg';
import { FaShoppingCart, FaHeart, FaSearch, FaMicrophone, FaBars, FaPlus, FaHome, FaList, FaUser } from 'react-icons/fa';
import { MdRecycling, MdNaturePeople, MdCompost, MdOutlineEco } from 'react-icons/md';
import { GiWheat, GiPlantRoots, GiFruitTree } from 'react-icons/gi';
import { useQuery } from '@tanstack/react-query';

// Product type definition
interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  wasteType: string;
}

// Sample categories with icons
const categories = [
  { id: 1, name: 'Compost', icon: <MdCompost className={styles.categoryIconInner} /> },
  { id: 2, name: 'Plant Waste', icon: <GiPlantRoots className={styles.categoryIconInner} /> },
  { id: 3, name: 'Crop Residue', icon: <GiWheat className={styles.categoryIconInner} /> },
  { id: 4, name: 'Fruit Waste', icon: <GiFruitTree className={styles.categoryIconInner} /> },
  { id: 5, name: 'Organic Waste', icon: <MdOutlineEco className={styles.categoryIconInner} /> },
  { id: 6, name: 'Bio Fertilizer', icon: <MdNaturePeople className={styles.categoryIconInner} /> },
  { id: 7, name: 'Recycled', icon: <MdRecycling className={styles.categoryIconInner} /> },
];

// Sample mock products (in real app, these would come from API)
const sampleProducts: Product[] = [
  { id: 1, name: 'Organic Compost', price: 1200, imageUrl: '', wasteType: 'Compost' },
  { id: 2, name: 'Rice Husk Ash', price: 800, imageUrl: '', wasteType: 'Crop Residue' },
  { id: 3, name: 'Sugarcane Bagasse', price: 650, imageUrl: '', wasteType: 'Plant Waste' },
  { id: 4, name: 'Fruit Pulp Fertilizer', price: 950, imageUrl: '', wasteType: 'Fruit Waste' },
  { id: 5, name: 'Coconut Coir', price: 550, imageUrl: '', wasteType: 'Plant Waste' },
  { id: 6, name: 'Vermicompost', price: 1500, imageUrl: '', wasteType: 'Organic Waste' },
];

export default function Home() {
  const [, setLocation] = useLocation();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [userType, setUserType] = useState<string>('');
  const [cartCount, setCartCount] = useState(0);
  const [favoritesCount, setFavoritesCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');

  // Get products (in real app, this would fetch from backend)
  const { data: products = sampleProducts, isLoading } = useQuery({
    queryKey: ['/api/products'],
    queryFn: async () => {
      // In a real app, this would fetch from API
      return sampleProducts;
    },
  });

  useEffect(() => {
    // Get user type from localStorage
    const storedUserType = localStorage.getItem('userType');
    if (storedUserType) {
      setUserType(storedUserType);
    } else {
      // If no user type is set, redirect to splash screen
      setLocation('/');
    }

    // Fetch cart and favorites count (in real app, this would come from API)
    setCartCount(2); // Mock data
    setFavoritesCount(3); // Mock data
  }, [setLocation]);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Searching for:', searchTerm);
    // In a real app, we would search the API
  };

  return (
    <div className={styles.container}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.logoContainer}>
          <img src={ilavaLogo} alt="Ilava Logo" className={styles.logo} />
          <span className={styles.brandName}>ILAVA</span>
        </div>
        <div className={styles.actionIcons}>
          <div className={styles.icon}>
            <FaHeart />
            {favoritesCount > 0 && <span className={styles.badge}>{favoritesCount}</span>}
          </div>
          <div className={styles.icon}>
            <FaShoppingCart />
            {cartCount > 0 && <span className={styles.badge}>{cartCount}</span>}
          </div>
        </div>
      </header>

      {/* Search bar */}
      <div className={styles.searchContainer}>
        <form className={styles.searchBar} onSubmit={handleSearch}>
          <FaSearch className={styles.searchIcon} />
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Search for agricultural waste products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FaMicrophone className={styles.micIcon} />
        </form>
        <FaBars className={styles.menuIcon} onClick={toggleDrawer} />
      </div>

      {/* Main content */}
      <main className={styles.content}>
        {/* Categories */}
        <h2 className={styles.sectionTitle}>Categories</h2>
        <div className={styles.categoryCarousel}>
          {categories.map((category) => (
            <div key={category.id} className={styles.categoryCard}>
              <div className={styles.categoryIcon}>
                {category.icon}
              </div>
              <span className={styles.categoryName}>{category.name}</span>
            </div>
          ))}
        </div>

        {/* Featured Products */}
        <h2 className={styles.sectionTitle}>Featured Products</h2>
        {isLoading ? (
          <p>Loading products...</p>
        ) : (
          <div className={styles.productsGrid}>
            {products.map((product) => (
              <div key={product.id} className={styles.productCard}>
                <div className={styles.productImage} />
                <div className={styles.productInfo}>
                  <h3 className={styles.productName}>{product.name}</h3>
                  <p className={styles.productPrice}>₹{product.price}</p>
                  <div className={styles.productMeta}>
                    <span className={styles.productType}>{product.wasteType}</span>
                    <FaPlus className={styles.addToCartIcon} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Promotional Banner */}
        <div className={styles.promotionBanner}>
          <h3 className={styles.promotionTitle}>Turn Waste into Wealth!</h3>
          <p className={styles.promotionDescription}>
            Learn how to convert your agricultural waste into valuable products
          </p>
          <button className={styles.promotionButton}>Learn More</button>
        </div>
      </main>

      {/* Bottom Navigation */}
      <nav className={styles.navbar}>
        <div className={`${styles.navItem} ${styles.activeNavItem}`}>
          <FaHome className={styles.navIcon} />
          <span className={styles.navText}>Home</span>
        </div>
        <div className={styles.navItem}>
          <FaList className={styles.navIcon} />
          <span className={styles.navText}>Categories</span>
        </div>
        <div className={styles.navItem}>
          <FaShoppingCart className={styles.navIcon} />
          <span className={styles.navText}>Cart</span>
        </div>
        <div className={styles.navItem}>
          <FaUser className={styles.navIcon} />
          <span className={styles.navText}>Profile</span>
        </div>
      </nav>

      {/* Drawer Menu */}
      <div className={`${styles.drawer} ${isDrawerOpen ? styles.drawerOpen : ''}`}>
        <div className={styles.drawerHeader}>
          <img src={ilavaLogo} alt="Ilava Logo" className={styles.drawerLogo} />
          <h2 className={styles.drawerTitle}>ILAVA</h2>
        </div>
        <div className={styles.drawerContent}>
          <ul className={styles.drawerMenu}>
            <li className={styles.drawerMenuItem}>
              <FaHome className={styles.drawerMenuIcon} />
              <span className={styles.drawerMenuText}>Home</span>
            </li>
            <li className={styles.drawerMenuItem}>
              <MdNaturePeople className={styles.drawerMenuIcon} />
              <span className={styles.drawerMenuText}>Sell Your Waste</span>
            </li>
            <li className={styles.drawerMenuItem}>
              <FaShoppingCart className={styles.drawerMenuIcon} />
              <span className={styles.drawerMenuText}>My Orders</span>
            </li>
            <li className={styles.drawerMenuItem}>
              <FaHeart className={styles.drawerMenuIcon} />
              <span className={styles.drawerMenuText}>Favorites</span>
            </li>
            <li className={styles.drawerMenuItem}>
              <FaUser className={styles.drawerMenuIcon} />
              <span className={styles.drawerMenuText}>My Profile</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Overlay for drawer */}
      <div 
        className={`${styles.overlay} ${isDrawerOpen ? styles.overlayVisible : ''}`}
        onClick={toggleDrawer}
      />
    </div>
  );
}