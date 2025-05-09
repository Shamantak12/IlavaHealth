import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'wouter';
import styles from '../styles/Home.module.css';
import ilavaLogo from '../assets/ilava-logo.svg';
import { FaShoppingCart, FaHeart, FaSearch, FaMicrophone, FaBars, FaPlus, FaHome, FaList, FaUser, FaQrcode, FaCamera, FaTimes, FaArrowLeft, FaSync } from 'react-icons/fa';
import { MdRecycling, MdNaturePeople, MdCompost, MdOutlineEco, MdPhotoCamera } from 'react-icons/md';
import { GiWheat, GiPlantRoots, GiFruitTree } from 'react-icons/gi';
import { useQuery } from '@tanstack/react-query';
import Webcam from 'react-webcam';

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

// Sample waste analysis recommendation data
interface Recommendation {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
}

// Waste analyzer states
enum WasteAnalyzerState {
  CAMERA = 'camera',
  ANALYZING = 'analyzing',
  RESULTS = 'results'
}

export default function Home() {
  const [, setLocation] = useLocation();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isWasteAnalyzerOpen, setIsWasteAnalyzerOpen] = useState(false);
  const [wasteAnalyzerState, setWasteAnalyzerState] = useState<WasteAnalyzerState>(WasteAnalyzerState.CAMERA);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [userType, setUserType] = useState<string>('');
  const [cartCount, setCartCount] = useState(0);
  const [favoritesCount, setFavoritesCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const webcamRef = useRef<Webcam>(null);

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

  const captureImage = () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      setCapturedImage(imageSrc);
      setWasteAnalyzerState(WasteAnalyzerState.ANALYZING);
      
      // Simulate API call for waste analysis
      setTimeout(() => {
        analyzeWasteImage(imageSrc);
      }, 2000);
    }
  };

  const analyzeWasteImage = (imageSrc: string | null) => {
    // In a real app, this would call an API to analyze the image
    // For demonstration, we'll simulate the analysis result
    
    // Sample recommendations based on common agricultural waste
    const sampleRecommendations: Recommendation[] = [
      {
        id: 1,
        title: 'Organic Compost',
        description: 'Convert this plant waste into nutrient-rich compost.',
        icon: <MdCompost className={styles.recommendationIcon} />
      },
      {
        id: 2,
        title: 'Biochar Production',
        description: 'Process into biochar to improve soil quality.',
        icon: <GiPlantRoots className={styles.recommendationIcon} />
      },
      {
        id: 3,
        title: 'Animal Feed',
        description: 'This crop residue can be processed into animal feed.',
        icon: <GiWheat className={styles.recommendationIcon} />
      }
    ];
    
    setRecommendations(sampleRecommendations);
    setWasteAnalyzerState(WasteAnalyzerState.RESULTS);
  };

  const resetWasteAnalyzer = () => {
    setCapturedImage(null);
    setWasteAnalyzerState(WasteAnalyzerState.CAMERA);
  };

  const closeWasteAnalyzer = () => {
    setIsWasteAnalyzerOpen(false);
    resetWasteAnalyzer();
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
        <div className={styles.navItem} onClick={() => setIsWasteAnalyzerOpen(true)}>
          <div className={styles.scanButton}>
            <FaQrcode className={styles.scanIcon} />
          </div>
          <span className={styles.navText}>Scan Waste</span>
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

      {/* Waste Analyzer Modal */}
      {isWasteAnalyzerOpen && (
        <div className={styles.wasteAnalyzerModal}>
          <div className={styles.wasteAnalyzerHeader}>
            <button className={styles.closeButton} onClick={closeWasteAnalyzer}>
              <FaTimes />
            </button>
            <h2 className={styles.wasteAnalyzerTitle}>
              {wasteAnalyzerState === WasteAnalyzerState.CAMERA && 'Scan Agricultural Waste'}
              {wasteAnalyzerState === WasteAnalyzerState.ANALYZING && 'Analyzing Your Waste'}
              {wasteAnalyzerState === WasteAnalyzerState.RESULTS && 'Recommended Products'}
            </h2>
          </div>

          {wasteAnalyzerState === WasteAnalyzerState.CAMERA && (
            <div className={styles.cameraContainer}>
              <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                className={styles.webcam}
                videoConstraints={{
                  width: 720,
                  height: 1280,
                  facingMode: "environment"
                }}
              />
              <div className={styles.captureBtnContainer}>
                <div className={styles.captureBtn} onClick={captureImage}>
                  <div className={styles.innerCaptureBtn} />
                </div>
              </div>
            </div>
          )}

          {wasteAnalyzerState === WasteAnalyzerState.ANALYZING && (
            <div className={styles.wasteAnalyzerResults}>
              {capturedImage && (
                <img src={capturedImage} alt="Captured waste" className={styles.wasteImage} />
              )}
              <div className={styles.loadingAnimation}>
                <div style={{ animation: 'spin 1s linear infinite' }}>
                  <FaSync size={32} style={{ color: '#31b43e' }} />
                </div>
                <p className={styles.loadingText}>Analyzing your agricultural waste...</p>
              </div>
            </div>
          )}

          {wasteAnalyzerState === WasteAnalyzerState.RESULTS && (
            <div className={styles.wasteAnalyzerResults}>
              {capturedImage && (
                <img src={capturedImage} alt="Captured waste" className={styles.wasteImage} />
              )}
              <h3 className={styles.analysisTitle}>Recommended Products</h3>
              <ul className={styles.recommendationsList}>
                {recommendations.map((rec) => (
                  <li key={rec.id} className={styles.recommendationItem}>
                    {rec.icon}
                    <div className={styles.recommendationContent}>
                      <h4 className={styles.recommendationTitle}>{rec.title}</h4>
                      <p className={styles.recommendationDescription}>{rec.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <button className={styles.tryAgainBtn} onClick={resetWasteAnalyzer}>
                Scan Again
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}